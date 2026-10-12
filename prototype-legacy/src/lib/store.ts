"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  Activity,
  AutonomyRule,
  ChatMsg,
  Driver,
  Message,
  Mode,
  Order,
  Place,
  PlanProposal,
  ProposedAction,
  ReportType,
} from "./types";
import { BUSINESS, START_MIN, seedDrivers, seedOrders, seedPlaces, seedRules } from "./seed";
import {
  AgentResult,
  DraftAction,
  World,
  checkPod,
  computeEtas,
  driverOf,
  handleCustomerReply,
  handleDriverReport,
  opsChat,
  parseOrderMessage,
  planDay,
  preArrivalCheck,
  routeOf,
  sequence,
} from "./agents";
import { SAMPLE_PHOTOS, SampleKind } from "./samples";
import { fmtTime, km, moveToward, uid } from "./util";

export const STORE_KEY = "hamilton-v1";
const KM_PER_SIM_MIN = 0.22;

interface State {
  now: number;
  running: boolean;
  speed: number; // sim minutes per real second
  drivers: Driver[];
  orders: Order[];
  places: Place[];
  rules: AutonomyRule[];
  actions: ProposedAction[];
  activity: Activity[];
  messages: Message[];
  chat: ChatMsg[];
  plan: PlanProposal | null;
  manualDriverId: string | null;
  thinking: Record<string, boolean>;

  reset: () => void;
  setRunning: (r: boolean) => void;
  setSpeed: (s: number) => void;
  tick: () => void;

  runResult: (r: AgentResult) => void;
  decide: (id: string, approve: boolean) => void;
  dismiss: (id: string) => void;

  generatePlan: () => Promise<void>;
  movePlanStop: (orderId: string, toDriverId: string) => void;
  approvePlan: () => void;
  parseOrder: (orderId: string) => Promise<void>;

  headTo: (orderId: string) => void;
  arrive: (orderId: string) => void;
  submitPod: (orderId: string, pod: { photo?: string; receivedBy: string; sample?: SampleKind }) => Promise<void>;
  failStop: (orderId: string, reason: string) => void;
  report: (driverId: string, type: ReportType, text?: string) => Promise<void>;
  resolveReport: (driverId: string, reportId: string) => void;

  customerReply: (orderId: string, text: string) => Promise<void>;
  askOps: (q: string) => Promise<void>;

  addNote: (target: "driver" | "place", id: string, text: string) => void;
  setRuleMode: (id: string, mode: Mode) => void;
  setRuleThreshold: (id: string, value: number) => void;
  setManualDriver: (id: string | null) => void;
}

const initial = () => ({
  now: START_MIN,
  running: false,
  speed: 2,
  drivers: seedDrivers(),
  orders: seedOrders(),
  places: seedPlaces(),
  rules: seedRules(),
  actions: [] as ProposedAction[],
  activity: [
    { id: uid("a"), at: START_MIN, agent: "system" as const, text: "Good morning Maria — 11 Shopify orders synced, 2 new messages to review.", mode: "info" as const },
  ],
  messages: [] as Message[],
  chat: [
    {
      id: uid("c"),
      role: "agent" as const,
      at: START_MIN,
      text: "Morning Maria! 11 orders synced from Shopify and 2 came in by WhatsApp/email. Want me to draft today's plan?",
      chips: ["How's today looking?", "What's at risk?", "Where's Jun?"],
    },
  ] as ChatMsg[],
  plan: null as PlanProposal | null,
  manualDriverId: null as string | null,
  thinking: {} as Record<string, boolean>,
});

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const THINK_MS = 900; // visible "agent working" latency for the UI stage

export const useStore = create<State>()(
  persist(
    (set, get) => {
      const world = (): World => {
        const s = get();
        return { now: s.now, drivers: s.drivers, orders: s.orders, places: s.places };
      };
      const log = (a: Omit<Activity, "id" | "at">) =>
        set((s) => ({ activity: [{ id: uid("a"), at: s.now, ...a }, ...s.activity].slice(0, 200) }));
      const patchOrder = (id: string, p: Partial<Order>) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, ...p } : o)) }));
      const patchDriver = (id: string, p: Partial<Driver> | ((d: Driver) => Partial<Driver>)) =>
        set((s) => ({ drivers: s.drivers.map((d) => (d.id === id ? { ...d, ...(typeof p === "function" ? p(d) : p) } : d)) }));
      const think = async (key: string, fn: () => Promise<void> | void) => {
        set((s) => ({ thinking: { ...s.thinking, [key]: true } }));
        await wait(THINK_MS);
        try {
          await fn();
        } finally {
          set((s) => ({ thinking: { ...s.thinking, [key]: false } }));
        }
      };

      const sendMsg = (orderId: string, text: string, kind: Message["kind"], image?: string, direction: Message["direction"] = "out") =>
        set((s) => ({
          messages: [...s.messages, { id: uid("m"), orderId, direction, channel: "whatsapp", kind, text, at: s.now, image }],
        }));

      const notify = (o: Order, event: "heading" | "arrived" | "delivered" | "failed", eta?: number) => {
        const first = o.customerName.split(" ")[0];
        const d = driverOf(world(), o.driverId);
        const txt = {
          heading: `Hi ${first}! ${d?.name.split(" ")[0] ?? "Your driver"} from ${BUSINESS.name} is on the way with your order ${o.code}. ETA ${eta ? fmtTime(eta) : "soon"}. Track: ham.lt/t/${o.code.replace(/\W/g, "")}`,
          arrived: `${d?.name.split(" ")[0] ?? "Your driver"} has arrived at ${o.address.split(",")[0]}.`,
          delivered: `Delivered ✅ ${o.code} at ${fmtTime(get().now)} — received by ${o.pod?.receivedBy || o.leaveWith || "recipient"}. Photo attached. Thank you for ordering from ${BUSINESS.name}!`,
          failed: `We couldn't complete delivery of ${o.code} today. We'll contact you to rearrange.`,
        }[event];
        if (modeOf("notify_customer") === "auto") sendMsg(o.id, txt, "notification", event === "delivered" ? o.pod?.photo : undefined);
      };

      const modeOf = (t: string) => get().rules.find((r) => r.id === t)?.mode ?? "ask";

      const decideMode = (a: DraftAction): { mode: Mode; why?: string } => {
        const rule = get().rules.find((r) => r.id === a.type);
        const mode = rule?.mode ?? "ask";
        if (mode === "never") return { mode };
        if (a.payload.ownerRequested) return { mode: "auto", why: "requested by owner" };
        if (mode === "ask") {
          if (a.type === "reassign_stops" && rule?.threshold) {
            const n = (a.payload.moves as unknown[]).length;
            if (n <= rule.threshold.value) return { mode: "auto", why: `≤ ${rule.threshold.value} stop threshold` };
          }
          if (a.type === "create_order" && rule?.threshold) {
            const c = Math.round(((a.payload.confidence as number) ?? 0) * 100);
            if (c >= rule.threshold.value) return { mode: "auto", why: `confidence ${c}% ≥ ${rule.threshold.value}%` };
          }
          if (a.type === "leave_with_alternate" && a.payload.confirmedByCustomer) return { mode: "auto", why: "customer confirmed in writing" };
        }
        return { mode };
      };

      const resequence = (driverId: string) => {
        const w = world();
        const d = driverOf(w, driverId);
        if (!d) return;
        const r = routeOf(w, driverId);
        const fixed = r.filter((o) => o.status === "arrived" || o.status === "heading");
        const rest = r.filter((o) => o.status === "assigned");
        const seq = [...fixed, ...sequence(w, d, rest)];
        set((s) => ({ orders: s.orders.map((o) => (o.driverId === driverId && seq.includes(o) ? { ...o, seq: seq.indexOf(o) } : o)) }));
      };

      const execute = (a: ProposedAction | DraftAction) => {
        const p = a.payload as Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
        switch (a.type) {
          case "notify_customer": {
            sendMsg(p.orderId, p.text, p.kind ?? "notification", p.image);
            if (p.hold) patchOrder(p.orderId, { status: "on_hold" });
            if (p.confirm) patchOrder(p.orderId, { confirmRequested: true });
            if (p.confirmed) patchOrder(p.orderId, { confirmed: true });
            break;
          }
          case "reschedule_same_day": {
            const o = get().orders.find((x) => x.id === p.orderId)!;
            patchOrder(p.orderId, { window: p.window, status: o.status === "on_hold" || o.status === "arrived" || o.status === "heading" ? "assigned" : o.status });
            if (o.driverId) {
              patchDriver(o.driverId, (d) => ({ status: d.status === "idle" ? "on_route" : d.status }));
              resequence(o.driverId);
            }
            break;
          }
          case "reschedule_next_day":
            patchOrder(p.orderId, { status: "tomorrow", driverId: undefined, seq: undefined });
            break;
          case "reorder_route":
            set((s) => ({
              orders: s.orders.map((o) => {
                const i = (p.orderIds as string[]).indexOf(o.id);
                if (i < 0) return o;
                return { ...o, seq: i, status: o.status === "on_hold" && i < (p.orderIds as string[]).length - 1 ? "assigned" : o.status };
              }),
            }));
            break;
          case "reassign_stops": {
            const moves = p.moves as { orderId: string; toDriverId: string }[];
            set((s) => ({
              orders: s.orders.map((o) => {
                const m = moves.find((x) => x.orderId === o.id);
                return m ? { ...o, driverId: m.toDriverId, status: "assigned", seq: 999 } : o;
              }),
            }));
            const touched = [...new Set([...moves.map((m) => m.toDriverId), p.fromDriverId as string].filter(Boolean))];
            touched.forEach((id) => {
              patchDriver(id, (d) => ({ status: d.status === "idle" || d.status === "done" ? "on_route" : d.status }));
              resequence(id);
            });
            // updated ETAs to customers
            for (const m of moves) {
              const o = get().orders.find((x) => x.id === m.orderId)!;
              const eta = computeEtas(world(), m.toDriverId)[o.id];
              const nd = driverOf(world(), m.toDriverId);
              if (modeOf("notify_customer") === "auto")
                sendMsg(o.id, `Update on ${o.code}: ${nd?.name.split(" ")[0]} will now deliver your order. New ETA around ${fmtTime(eta)}.`, "notification");
            }
            break;
          }
          case "leave_with_alternate":
            patchOrder(p.orderId, { leaveWith: p.who, status: get().orders.find((o) => o.id === p.orderId)?.status === "on_hold" ? "assigned" : get().orders.find((o) => o.id === p.orderId)!.status });
            break;
          case "save_memory": {
            const note = { id: uid("n"), text: p.text, author: "agent" as const, at: get().now, source: p.source };
            if (p.target === "place")
              set((s) => ({ places: s.places.map((pl) => (pl.id === p.id ? { ...pl, notes: [note, ...pl.notes], prefs: { ...pl.prefs, ...(p.pref ?? {}) } } : pl)) }));
            else patchDriver(p.id, (d) => ({ aiNotes: [note, ...d.aiNotes] }));
            break;
          }
          case "create_order": {
            patchOrder(p.orderId, { ...(p.fields as Partial<Order>), confidence: p.confidence, flags: p.flags, status: "unassigned" });
            // if the day is already planned, slot it into the best route
            const planned = get().orders.some((o) => ["assigned", "heading", "arrived", "delivered"].includes(o.status));
            if (planned) {
              const o = get().orders.find((x) => x.id === p.orderId)!;
              const w = world();
              const twin = w.orders.find((x) => x.placeId === o.placeId && x.id !== o.id && x.driverId && ["assigned", "heading"].includes(x.status));
              const best =
                twin?.driverId ??
                [...w.drivers]
                  .filter((d) => d.status !== "incident")
                  .sort((a, b) => (b.auto.areaFamiliarity[o.area] ?? 0) - (a.auto.areaFamiliarity[o.area] ?? 0))[0]?.id;
              if (best) {
                patchOrder(o.id, { driverId: best, status: "assigned", seq: 999 });
                patchDriver(best, (d) => ({ status: d.status === "idle" || d.status === "done" ? "on_route" : d.status }));
                resequence(best);
                log({ agent: "dispatch", text: `Slotted ${o.code} into ${driverOf(world(), best)?.name.split(" ")[0]}'s route${twin ? ` (same stop as ${twin.code})` : ""}.`, mode: "auto" });
              }
            }
            break;
          }
          case "request_pod_retake":
            break;
          case "approve_plan":
            break;
          case "issue_refund":
            break;
        }
      };

      return {
        ...initial(),

        reset: () => set({ ...initial() }),
        setRunning: (running) => set({ running }),
        setSpeed: (speed) => set({ speed }),

        runResult: (r) => {
          r.log.forEach((l) => log({ agent: l.agent, text: l.text, reasoning: l.reasoning, mode: "info" }));
          for (const a of r.actions) {
            const { mode, why } = decideMode(a);
            const full: ProposedAction = {
              ...a,
              severity: a.severity ?? "low",
              id: uid("act"),
              createdAt: get().now,
              status: mode === "auto" ? "auto" : mode === "never" ? "blocked" : "pending",
            };
            if (mode === "auto") {
              execute(full);
              log({ agent: a.agent, text: `${a.title}${why ? ` (auto: ${why})` : ""}`, reasoning: a.reasoning, mode: "auto" });
            } else if (mode === "never") {
              log({ agent: a.agent, text: `Blocked by your rules: ${a.title} — escalated to you`, reasoning: a.reasoning, mode: "blocked" });
            } else {
              log({ agent: a.agent, text: `Needs your approval: ${a.title}`, reasoning: a.reasoning, mode: "needs_approval" });
            }
            set((s) => ({ actions: [full, ...s.actions] }));
          }
        },

        decide: (id, approve) => {
          const a = get().actions.find((x) => x.id === id);
          if (!a || a.status !== "pending") return;
          if (approve) execute(a);
          set((s) => ({ actions: s.actions.map((x) => (x.id === id ? { ...x, status: approve ? "approved" : "rejected" } : x)) }));
          log({ agent: a.agent, text: `${approve ? "Maria approved" : "Maria rejected"}: ${a.title}`, mode: approve ? "approved" : "rejected" });
          if (!approve) log({ agent: "system", text: `Override recorded — ${a.agent} agent will weigh this next time ("${a.title}").`, mode: "info" });
        },
        dismiss: (id) => set((s) => ({ actions: s.actions.map((x) => (x.id === id ? { ...x, status: "rejected" } : x)) })),

        generatePlan: () =>
          think("plan", () => {
            const plan = planDay(world());
            set({ plan });
            log({ agent: "dispatch", text: `Drafted today's plan: ${plan.routes.length} routes, ${plan.routes.reduce((n, r) => n + r.orderIds.length, 0)} stops.`, reasoning: plan.summary, mode: "needs_approval" });
          }),

        movePlanStop: (orderId, toDriverId) =>
          set((s) => {
            if (!s.plan) return {};
            const routes = s.plan.routes.map((r) => ({ ...r, orderIds: r.orderIds.filter((x) => x !== orderId) }));
            let target = routes.find((r) => r.driverId === toDriverId);
            if (!target) {
              target = { driverId: toDriverId, orderIds: [], rationale: ["Added by Maria"] };
              routes.push(target);
            }
            target.orderIds.push(orderId);
            return { plan: { ...s.plan, routes: routes.filter((r) => r.orderIds.length) } };
          }),

        approvePlan: () => {
          const plan = get().plan;
          if (!plan) return;
          set((s) => ({
            orders: s.orders.map((o) => {
              const r = plan.routes.find((x) => x.orderIds.includes(o.id));
              return r ? { ...o, driverId: r.driverId, status: "assigned", seq: r.orderIds.indexOf(o.id) } : o;
            }),
            drivers: s.drivers.map((d) => (plan.routes.some((r) => r.driverId === d.id) ? { ...d, status: "on_route" } : d)),
            plan: { ...plan, status: "approved" },
          }));
          plan.routes.forEach((r) => resequence(r.driverId));
          log({ agent: "dispatch", text: "Maria approved today's plan — routes sent to drivers.", mode: "approved" });
          // pre-confirm risky addresses right away
          get()
            .orders.filter((o) => o.status === "assigned")
            .forEach((o) => {
              const r = preArrivalCheck(world(), o);
              if (r) get().runResult(r);
            });
        },

        parseOrder: (orderId) =>
          think(`parse-${orderId}`, () => {
            const o = get().orders.find((x) => x.id === orderId)!;
            patchOrder(orderId, { status: "review" });
            get().runResult(parseOrderMessage(world(), o));
          }),

        headTo: (orderId) => {
          const o = get().orders.find((x) => x.id === orderId)!;
          patchOrder(orderId, { status: "heading" });
          if (o.driverId) patchDriver(o.driverId, (d) => ({ status: d.status === "break" ? "break" : "on_route" }));
          const eta = o.driverId ? computeEtas(world(), o.driverId)[orderId] : undefined;
          notify(get().orders.find((x) => x.id === orderId)!, "heading", eta);
          const r = preArrivalCheck(world(), get().orders.find((x) => x.id === orderId)!);
          if (r) get().runResult(r);
        },

        arrive: (orderId) => {
          const o = get().orders.find((x) => x.id === orderId)!;
          if (o.position && o.driverId) patchDriver(o.driverId, { position: o.position });
          patchOrder(orderId, { status: "arrived", arrivedAt: get().now });
          notify(get().orders.find((x) => x.id === orderId)!, "arrived");
        },

        submitPod: (orderId, pod) =>
          think(`pod-${orderId}`, () => {
            const o = get().orders.find((x) => x.id === orderId)!;
            const photo = pod.photo ?? SAMPLE_PHOTOS[pod.sample ?? "good"];
            const check = checkPod(pod.sample, o, world());
            const rec = { photo, receivedBy: pod.receivedBy, at: get().now, check, sample: pod.sample };
            if (check.status === "retake") {
              patchOrder(orderId, { pod: rec });
              get().runResult({
                log: [],
                actions: [
                  {
                    type: "request_pod_retake",
                    agent: "proof",
                    title: `Ask driver to retake photo for ${o.code}`,
                    detail: check.reasons.join("; "),
                    reasoning: [...check.reasons, "Driver is still on site — a retake now costs 20 seconds; a dispute later costs a refund."],
                    payload: { orderId },
                    orderIds: [orderId],
                    severity: "low",
                  },
                ],
              });
              return;
            }
            patchOrder(orderId, { pod: rec, status: "delivered", deliveredAt: get().now });
            log({ agent: "proof", text: `${o.code} proof verified (${Math.round((check.confidence ?? 0) * 100)}%): ${check.reasons.join(", ")}.`, mode: "auto" });
            notify(get().orders.find((x) => x.id === orderId)!, "delivered");
            set((s) => ({ places: s.places.map((p) => (p.id === o.placeId ? { ...p, stats: { ...p.stats, deliveries: p.stats.deliveries + 1 } } : p)) }));
            if (o.driverId && routeOf(world(), o.driverId).length === 0) patchDriver(o.driverId, { status: "done" });
          }),

        failStop: (orderId, reason) => {
          const o = get().orders.find((x) => x.id === orderId)!;
          patchOrder(orderId, { status: "failed", failReason: reason });
          notify(get().orders.find((x) => x.id === orderId)!, "failed");
          set((s) => ({ places: s.places.map((p) => (p.id === o.placeId ? { ...p, stats: { ...p.stats, failed: p.stats.failed + 1 } } : p)) }));
          log({ agent: "assurance", text: `${o.code} marked failed: ${reason}`, mode: "info" });
        },

        report: (driverId, type, text = "") => {
          const rep = { id: uid("r"), type, text, at: get().now };
          patchDriver(driverId, (d) => ({
            reports: [...d.reports, rep],
            status: type === "flat_tire" || type === "vehicle_issue" ? "incident" : type === "lunch" ? "break" : d.status,
            breakUntil: type === "lunch" ? get().now + 30 : d.breakUntil,
          }));
          return think(`report-${driverId}`, () => {
            get().runResult(handleDriverReport(world(), driverId, type, text));
          });
        },

        resolveReport: (driverId, reportId) =>
          patchDriver(driverId, (d) => ({
            reports: d.reports.map((r) => (r.id === reportId ? { ...r, resolved: true } : r)),
            status: d.status === "incident" ? (routeOf(world(), driverId).length ? "on_route" : "idle") : d.status,
          })),

        customerReply: async (orderId, text) => {
          sendMsg(orderId, text, "customer", undefined, "in");
          await think(`reply-${orderId}`, () => {
            const o = get().orders.find((x) => x.id === orderId)!;
            get().runResult(handleCustomerReply(world(), o, text));
          });
        },

        askOps: async (q) => {
          set((s) => ({ chat: [...s.chat, { id: uid("c"), role: "owner", text: q, at: s.now }] }));
          await think("ops", () => {
            const r = opsChat(world(), q);
            get().runResult({ ...r, log: r.log });
            set((s) => ({ chat: [...s.chat, { id: uid("c"), role: "agent", text: r.reply ?? "", at: s.now }] }));
          });
        },

        addNote: (target, id, text) => {
          const note = { id: uid("n"), text, author: "owner" as const, at: get().now };
          if (target === "driver") patchDriver(id, (d) => ({ humanNotes: [note, ...d.humanNotes] }));
          else set((s) => ({ places: s.places.map((p) => (p.id === id ? { ...p, notes: [note, ...p.notes] } : p)) }));
        },
        setRuleMode: (id, mode) => set((s) => ({ rules: s.rules.map((r) => (r.id === id ? { ...r, mode } : r)) })),
        setRuleThreshold: (id, value) =>
          set((s) => ({ rules: s.rules.map((r) => (r.id === id && r.threshold ? { ...r, threshold: { ...r.threshold, value } } : r)) })),
        setManualDriver: (manualDriverId) => set({ manualDriverId }),

        /* ---------------- simulation ---------------- */
        tick: () => {
          const s = get();
          if (!s.running) return;
          const now = s.now + s.speed;
          set({ now });
          for (const d of get().drivers) {
            if (now < d.shiftStart) continue;
            if (d.status === "break" && d.breakUntil && now >= d.breakUntil) patchDriver(d.id, { status: "on_route", breakUntil: undefined });
            const cur = get().drivers.find((x) => x.id === d.id)!;
            if (cur.status === "incident" || cur.status === "break" || cur.status === "done") continue;
            const route = routeOf(world(), d.id);
            if (!route.length) continue;
            const target = route[0];
            const manual = get().manualDriverId === d.id;
            if (!target.position) continue;

            if (target.status === "assigned") {
              if (manual) continue; // waits for the driver to tap "Start"
              get().headTo(target.id);
              continue;
            }
            if (target.status === "heading") {
              const step = KM_PER_SIM_MIN * s.speed;
              const next = moveToward(cur.position, target.position, step);
              patchDriver(d.id, { position: next });
              if (km(next, target.position) < 0.02) get().arrive(target.id);
              continue;
            }
            if (target.status === "arrived" && !manual) {
              if (now - (target.arrivedAt ?? now) >= cur.auto.avgStopMins && !get().thinking[`pod-${target.id}`]) {
                const p = get().places.find((x) => x.id === target.placeId);
                void get().submitPod(target.id, { sample: "good", receivedBy: target.leaveWith ?? p?.prefs.leaveWith ?? target.customerName });
              }
            }
          }
        },
      };
    },
    {
      name: STORE_KEY,
      partialize: (s) => {
        const { thinking, ...rest } = s; // eslint-disable-line @typescript-eslint/no-unused-vars
        return rest;
      },
    }
  )
);

/** keep admin + driver tabs/iframes in sync */
export function startCrossTabSync() {
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORE_KEY) useStore.persist.rehydrate();
  };
  window.addEventListener("storage", onStorage);
  return () => window.removeEventListener("storage", onStorage);
}
