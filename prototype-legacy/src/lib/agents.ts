/**
 * Agent logic for the Hamilton prototype.
 *
 * UI-FIRST STAGE: these functions are deterministic stand-ins with the SAME
 * input/output contract the LLM-backed agents will use. In the next stage they
 * are replaced by:
 *   - Claude (tool-use loop) for reasoning agents: dispatch, assurance, ops chat
 *   - OpenAI Decisions API for cheap classification: POD photo checks, message
 *     intent triage, order-confidence scoring
 * Every agent returns proposed actions; the autonomy engine (store.ts) decides
 * whether each runs automatically, waits for approval, or is blocked.
 */
import type {
  ActionType,
  AgentName,
  Driver,
  Order,
  Place,
  PlanProposal,
  PodCheck,
  ReportType,
} from "./types";
import { BUSINESS } from "./seed";
import { fmtTime, fmtWindow, pct, travelMins } from "./util";

export interface DraftAction {
  type: ActionType;
  agent: AgentName;
  title: string;
  detail: string;
  reasoning: string[];
  payload: Record<string, unknown>;
  severity?: "low" | "medium" | "high";
  orderIds?: string[];
  driverId?: string;
}

export interface AgentResult {
  actions: DraftAction[];
  log: { agent: AgentName; text: string; reasoning?: string[] }[];
  reply?: string;
}

export interface World {
  now: number;
  drivers: Driver[];
  orders: Order[];
  places: Place[];
}

const ACTIVE: Order["status"][] = ["assigned", "heading", "arrived"];

export const placeOf = (w: World, o: Order) => w.places.find((p) => p.id === o.placeId);
export const driverOf = (w: World, id?: string) => w.drivers.find((d) => d.id === id);
export const routeOf = (w: World, driverId: string) =>
  w.orders.filter((o) => o.driverId === driverId && ACTIVE.includes(o.status)).sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0));

const isLarge = (o: Order) => /large|arch|centerpieces/i.test(o.items + (o.notes ?? ""));
const isMoto = (d: Driver) => /motorcycle/i.test(d.vehicle);

/* ------------------------------------------------------------------ */
/*  ETA engine                                                         */
/* ------------------------------------------------------------------ */
export function computeEtas(w: World, driverId: string, startAt?: number): Record<string, number> {
  const d = driverOf(w, driverId);
  if (!d) return {};
  let t = Math.max(startAt ?? w.now, d.shiftStart, d.breakUntil ?? 0);
  let pos = d.position;
  const out: Record<string, number> = {};
  for (const o of routeOf(w, driverId)) {
    if (!o.position) continue;
    if (o.status === "arrived") {
      out[o.id] = o.arrivedAt ?? t;
      t += d.auto.avgStopMins;
      pos = o.position;
      continue;
    }
    t += travelMins(pos, o.position);
    if (t < o.window.start) t = o.window.start;
    out[o.id] = t;
    t += d.auto.avgStopMins;
    pos = o.position;
  }
  return out;
}

/** nearest-neighbour sequencing that prioritises tight windows */
export function sequence(w: World, d: Driver, orders: Order[], from = d.position, startAt = Math.max(w.now, d.shiftStart)) {
  const left = [...orders];
  const seq: Order[] = [];
  let pos = from;
  let t = startAt;
  while (left.length) {
    left.sort((a, b) => {
      const ta = t + travelMins(pos, a.position!);
      const tb = t + travelMins(pos, b.position!);
      const slackA = a.window.end - ta;
      const slackB = b.window.end - tb;
      // urgent first, otherwise nearest
      if (slackA < 60 || slackB < 60) return slackA - slackB;
      return ta - tb;
    });
    const nx = left.shift()!;
    t = Math.max(t + travelMins(pos, nx.position!), nx.window.start) + d.auto.avgStopMins;
    pos = nx.position!;
    seq.push(nx);
  }
  return seq;
}

/* ------------------------------------------------------------------ */
/*  1. DISPATCH & RE-PLANNING AGENT                                    */
/* ------------------------------------------------------------------ */
export function planDay(w: World): PlanProposal {
  const pool = w.orders.filter((o) => o.status === "unassigned" && o.position);
  const drivers = w.drivers.filter((d) => d.status !== "incident");
  const load: Record<string, Order[]> = Object.fromEntries(drivers.map((d) => [d.id, []]));
  const why: Record<string, string[]> = Object.fromEntries(drivers.map((d) => [d.id, []]));
  const unassigned: PlanProposal["unassigned"] = [];

  // hardest first: large items, tight windows
  const ordered = [...pool].sort((a, b) => Number(isLarge(b)) - Number(isLarge(a)) || a.window.end - b.window.end);

  for (const o of ordered) {
    let best: { d: Driver; s: number } | null = null;
    for (const d of drivers) {
      if (isLarge(o) && isMoto(d)) continue;
      if (d.auto.coldStart && (d.auto.areaFamiliarity[o.area] ?? 0) < 0.45) continue;
      const fam = d.auto.areaFamiliarity[o.area] ?? 0.2;
      const areaCluster = load[d.id].filter((x) => x.area === o.area).length * 0.08;
      const s = fam * 0.6 + d.auto.successRate * 0.3 + areaCluster - load[d.id].length * 0.07;
      if (!best || s > best.s) best = { d, s };
    }
    if (!best) {
      unassigned.push({ orderId: o.id, reason: "No suitable vehicle/driver available" });
      continue;
    }
    load[best.d.id].push(o);
    const fam = best.d.auto.areaFamiliarity[o.area] ?? 0;
    if (isLarge(o)) why[best.d.id].push(`${o.code} is large → needs ${best.d.vehicle.split(" ·")[0]}`);
    else if (fam > 0.85) why[best.d.id].push(`${o.code}: ${best.d.name.split(" ")[0]} knows ${o.area} (${pct(fam)} familiarity)`);
  }

  const routes = drivers
    .filter((d) => load[d.id].length)
    .map((d) => {
      const seq = sequence(w, d, load[d.id], BUSINESS.depot, d.shiftStart);
      const rationale = [...new Set(why[d.id])].slice(0, 3);
      if (d.auto.coldStart) rationale.push(`Cold-start driver: kept to familiar, compact ${[...new Set(seq.map((s) => s.area))].join("/")} stops`);
      const areas = [...new Set(seq.map((s) => s.area))];
      rationale.unshift(`${seq.length} stops · ${areas.join(", ")}`);
      return { driverId: d.id, orderIds: seq.map((s) => s.id), rationale };
    });

  const risky = pool.filter((o) => {
    const p = placeOf(w, o);
    return p && (p.stats.answersPhone === "rarely" || p.stats.failed >= 2);
  });
  const summary = [
    `${pool.length} orders → ${routes.length} drivers. Large event florals kept on the van.`,
    ...risky.map((o) => `${o.code} ${o.customerName}: ${placeOf(w, o)?.stats.failed} past failed attempts — I'll confirm with the recipient before the driver heads out.`),
  ];
  const sameAddr = w.orders.filter((o) => o.status === "review" && pool.some((p) => p.placeId && p.placeId === o.placeId));
  for (const o of sameAddr) summary.push(`${o.code} (in review) goes to the same address as another order today — approve it to combine trips.`);

  return { createdAt: w.now, routes, unassigned, summary, status: "proposed" };
}

const REPORT_LABEL: Record<ReportType, string> = {
  flat_tire: "Flat tire",
  lunch: "Lunch break",
  running_late: "Running late",
  not_home: "Customer not home",
  wrong_address: "Wrong address",
  vehicle_issue: "Vehicle issue",
  other: "Note",
};
export const reportLabel = (t: ReportType) => REPORT_LABEL[t];

export function handleDriverReport(w: World, driverId: string, type: ReportType, text: string): AgentResult {
  const d = driverOf(w, driverId)!;
  const first = d.name.split(" ")[0];
  const route = routeOf(w, driverId);
  const res: AgentResult = { actions: [], log: [] };
  const current = route.find((o) => o.status === "arrived" || o.status === "heading") ?? route[0];

  if (type === "flat_tire" || type === "vehicle_issue") {
    const others = w.drivers.filter((x) => x.id !== driverId && x.status !== "incident" && x.status !== "done");
    const moves = route
      .filter((o) => o.status !== "arrived")
      .map((o) => {
        const ranked = others
          .filter((x) => !(isLarge(o) && isMoto(x)))
          .map((x) => ({
            x,
            s: (x.auto.areaFamiliarity[o.area] ?? 0.2) * 0.6 - routeOf(w, x.id).length * 0.05 + x.auto.onTimeRate * 0.2,
          }))
          .sort((a, b) => b.s - a.s);
        return { orderId: o.id, toDriverId: ranked[0]?.x.id, code: o.code, area: o.area, to: ranked[0]?.x.name.split(" ")[0] };
      })
      .filter((m) => m.toDriverId);
    res.log.push({ agent: "dispatch", text: `${first} reported "${REPORT_LABEL[type]}". Marked unavailable; re-planning ${moves.length} remaining stops.` });
    if (moves.length) {
      res.actions.push({
        type: "reassign_stops",
        agent: "dispatch",
        title: `Reassign ${moves.length} of ${first}'s stops`,
        detail: moves.map((m) => `${m.code} → ${m.to}`).join(" · "),
        reasoning: [
          `${first} is stopped: "${text || REPORT_LABEL[type]}" — typical tire fix 45–60 min would breach ${moves.length} windows.`,
          ...moves.slice(0, 3).map((m) => `${m.code} (${m.area}) → ${m.to}: best area familiarity with spare capacity`),
          "Affected customers get an updated ETA automatically once approved.",
        ],
        payload: { fromDriverId: driverId, moves: moves.map(({ orderId, toDriverId }) => ({ orderId, toDriverId })) },
        severity: "high",
        orderIds: moves.map((m) => m.orderId),
        driverId,
      });
    }
    res.actions.push({
      type: "save_memory",
      agent: "dispatch",
      title: `Log incident on ${first}'s profile`,
      detail: `${REPORT_LABEL[type]} at ${fmtTime(w.now)}`,
      reasoning: ["Incidents feed reliability context for future planning (not used for pay/discipline)."],
      payload: { target: "driver", id: driverId, text: `${REPORT_LABEL[type]} reported at ${fmtTime(w.now)}. ${text}`.trim(), source: "driver report" },
      severity: "low",
    });
    return res;
  }

  if (type === "lunch" || type === "running_late") {
    const delay = type === "lunch" ? 30 : 20;
    const etas = computeEtas(w, driverId, w.now + delay);
    const late = route.filter((o) => etas[o.id] && etas[o.id] > o.window.end);
    const tight = route.filter((o) => etas[o.id] && etas[o.id] <= o.window.end);
    res.log.push({
      agent: "dispatch",
      text: `${first}: ${REPORT_LABEL[type]} (+${delay} min). ${late.length ? `${late.length} window(s) now at risk.` : "All windows still safe."}`,
    });
    if (route.length > 1) {
      const resequenced = sequence(w, d, route.filter((o) => o.status !== "arrived"), d.position, w.now + delay);
      res.actions.push({
        type: "reorder_route",
        agent: "dispatch",
        title: `Re-sequence ${first}'s route`,
        detail: resequenced.map((o) => o.code).join(" → "),
        reasoning: [`Re-ordered to protect tightest windows after +${delay} min delay.`],
        payload: { driverId, orderIds: resequenced.map((o) => o.id) },
        severity: "low",
        driverId,
      });
    }
    for (const o of late) {
      res.actions.push({
        type: "notify_customer",
        agent: "assurance",
        title: `Tell ${o.customerName} about the delay`,
        detail: `New ETA ≈ ${fmtTime(etas[o.id])}`,
        reasoning: [`ETA ${fmtTime(etas[o.id])} is past their ${fmtWindow(o.window)} window.`, "Customers warned early rate deliveries higher than surprised ones."],
        payload: {
          orderId: o.id,
          kind: "notification",
          text: `Hi ${o.customerName.split(" ")[0]}! Your ${BUSINESS.name} delivery is running a little late — new ETA around ${fmtTime(etas[o.id])}. Reply here if that doesn't work and we'll sort it out.`,
        },
        severity: "medium",
        orderIds: [o.id],
      });
    }
    if (!late.length && tight.length) res.log.push({ agent: "assurance", text: `No customer messages needed — ${tight.length} stops still inside their windows.` });
    return res;
  }

  if (type === "not_home" && current) return handleNotHome(w, current);

  if (type === "wrong_address" && current) {
    res.log.push({ agent: "assurance", text: `${first} can't find ${current.code} at "${current.address}". Put on hold and asked the customer to confirm.` });
    res.actions.push({
      type: "notify_customer",
      agent: "assurance",
      title: `Ask ${current.customerName} to confirm address`,
      detail: current.address,
      reasoning: ["Driver on site but address doesn't match.", "Holding the stop and moving the driver on avoids idle time."],
      payload: {
        orderId: current.id,
        kind: "assistant",
        hold: true,
        text: `Hi ${current.customerName.split(" ")[0]}, our driver is near "${current.address}" but can't locate it. Could you reply with the building name / landmark or a pin? We'll come right back.`,
      },
      severity: "medium",
      orderIds: [current.id],
    });
    const rest = route.filter((o) => o.id !== current.id && o.status !== "arrived");
    if (rest.length)
      res.actions.push({
        type: "reorder_route",
        agent: "dispatch",
        title: `Move ${first} to next stop`,
        detail: rest.map((o) => o.code).join(" → ") + ` → ${current.code} (on hold)`,
        reasoning: ["Keep the driver productive while the customer replies."],
        payload: { driverId, orderIds: [...rest.map((o) => o.id), current.id] },
        severity: "low",
        driverId,
      });
    return res;
  }

  res.log.push({ agent: "dispatch", text: `${first}: "${text}" — added to today's context.` });
  return res;
}

/* ------------------------------------------------------------------ */
/*  2. DELIVERY ASSURANCE AGENT                                        */
/* ------------------------------------------------------------------ */
export function handleNotHome(w: World, o: Order): AgentResult {
  const p = placeOf(w, o);
  const res: AgentResult = { actions: [], log: [] };
  const d = driverOf(w, o.driverId);
  res.log.push({ agent: "assurance", text: `${o.code}: driver reports nobody home. Checking address book & customer.` });
  if (p?.prefs.leaveWith) {
    res.actions.push({
      type: "leave_with_alternate",
      agent: "assurance",
      title: `Leave ${o.code} with ${p.prefs.leaveWith}`,
      detail: `${o.customerName} · ${p.label}`,
      reasoning: [
        `Address book: "${p.prefs.leaveWith}" accepted ${p.stats.deliveries} past deliveries, ${p.stats.failed} issues.`,
        "Avoids a failed trip (~₱950 fuel + redelivery + refund risk).",
        "Customer will get the proof photo immediately.",
      ],
      payload: { orderId: o.id, who: p.prefs.leaveWith },
      severity: "medium",
      orderIds: [o.id],
      driverId: d?.id,
    });
  } else {
    const later = { start: Math.max(w.now + 90, o.window.start), end: Math.max(w.now + 210, o.window.end) };
    res.actions.push({
      type: "notify_customer",
      agent: "assurance",
      title: `Message ${o.customerName}: missed you`,
      detail: "Offer a later slot today",
      reasoning: ["No safe-drop preference on file.", `Place answers phone: ${p?.stats.answersPhone ?? "unknown"}.`],
      payload: {
        orderId: o.id,
        kind: "assistant",
        text: `Hi ${o.customerName.split(" ")[0]}, our driver just tried to deliver your ${o.items.toLowerCase()} but no one was home. We can come back between ${fmtWindow(later)} today — or reply with a better time, or someone (guard/neighbour) who can receive it.`,
      },
      severity: "medium",
      orderIds: [o.id],
    });
    res.actions.push({
      type: "reschedule_same_day",
      agent: "assurance",
      title: `Retry ${o.code} later today`,
      detail: fmtWindow(later),
      reasoning: ["Move to end of route instead of failing it outright."],
      payload: { orderId: o.id, window: later },
      severity: "low",
      orderIds: [o.id],
    });
  }
  return res;
}

export function preArrivalCheck(w: World, o: Order): AgentResult | null {
  const p = placeOf(w, o);
  if (!p || o.confirmRequested) return null;
  if (!(p.stats.answersPhone === "rarely" || p.stats.failed >= 1)) return null;
  const etas = o.driverId ? computeEtas(w, o.driverId) : {};
  return {
    log: [{ agent: "assurance", text: `${o.code}: ${p.stats.failed} past failed attempt(s) at this address — confirming before arrival.` }],
    actions: [
      {
        type: "notify_customer",
        agent: "assurance",
        title: `Confirm ${o.customerName} is available`,
        detail: `ETA ${fmtTime(etas[o.id] ?? w.now + 20)}`,
        reasoning: [`${p.stats.failed} of ${p.stats.deliveries} past deliveries failed here.`, "A 20-second confirmation is cheaper than a wasted trip."],
        payload: {
          orderId: o.id,
          kind: "assistant",
          confirm: true,
          text: `Hi ${o.customerName.split(" ")[0]}! Your ${BUSINESS.name} delivery arrives around ${fmtTime(etas[o.id] ?? w.now + 20)}. Will someone be home to receive it? Reply YES, a better time, or who can receive it for you.`,
        },
        severity: "low",
        orderIds: [o.id],
      },
    ],
  };
}

function parseTime(text: string): number | null {
  const m = text.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm|nn)?/i);
  if (!m) return null;
  let hh = parseInt(m[1], 10);
  const mm = m[2] ? parseInt(m[2], 10) : 0;
  const ap = m[3]?.toLowerCase();
  if (ap === "pm" && hh < 12) hh += 12;
  if (!ap && hh < 8) hh += 12;
  if (hh > 23) return null;
  return hh * 60 + mm;
}

export function handleCustomerReply(w: World, o: Order, text: string): AgentResult {
  const t = text.toLowerCase();
  const res: AgentResult = { actions: [], log: [] };
  const first = o.customerName.split(" ")[0] || "there";
  const etas = o.driverId ? computeEtas(w, o.driverId) : {};
  const eta = etas[o.id];
  const p = placeOf(w, o);
  const say = (msg: string, extra: Record<string, unknown> = {}) =>
    res.actions.push({
      type: "notify_customer",
      agent: "assurance",
      title: `Reply to ${o.customerName}`,
      detail: msg.slice(0, 60) + "…",
      reasoning: ["Answer uses only this order's data (scoped)."],
      payload: { orderId: o.id, kind: "assistant", text: msg, ...extra },
      severity: "low",
      orderIds: [o.id],
    });

  if (/refund|cancel|money back|discount/.test(t)) {
    res.log.push({ agent: "assurance", text: `${o.code}: customer asked about a refund/cancellation → escalated to Maria (money actions are blocked for agents).` });
    res.actions.push({
      type: "issue_refund",
      agent: "assurance",
      title: `Refund request — ${o.customerName}`,
      detail: `"${text}"`,
      reasoning: ["Agents never move money. Routed to the owner."],
      payload: { orderId: o.id, amount: o.value },
      severity: "high",
      orderIds: [o.id],
    });
    say(`Thanks ${first} — I've passed this to Maria, who'll get back to you shortly.`);
    return res;
  }

  if (/guard|concierge|reception|neighbo|helper|front desk|lobby/.test(t)) {
    const who = (text.match(/(?:with|to)\s+(?:the\s+)?([a-z .'-]{3,30})/i)?.[1] ?? "the guard").trim();
    res.log.push({ agent: "assurance", text: `${o.code}: customer authorised leaving it with "${who}". Saved to address book.` });
    res.actions.push({
      type: "leave_with_alternate",
      agent: "assurance",
      title: `Leave ${o.code} with ${who}`,
      detail: "Customer confirmed in writing",
      reasoning: ["Customer confirmed by message — allowed by policy."],
      payload: { orderId: o.id, who, confirmedByCustomer: true },
      severity: "low",
      orderIds: [o.id],
    });
    if (p)
      res.actions.push({
        type: "save_memory",
        agent: "assurance",
        title: `Remember: ${p.label} → leave with ${who}`,
        detail: "Address book",
        reasoning: ["Learned preference; avoids asking next time."],
        payload: { target: "place", id: p.id, text: `Customer OK to leave with ${who} (confirmed ${fmtTime(w.now)}).`, pref: { leaveWith: who } },
        severity: "low",
      });
    say(`Perfect, we'll leave it with ${who} and send you the photo once it's dropped off. 🌷`);
    return res;
  }

  if (/tomorrow|next day|bukas/.test(t)) {
    res.actions.push({
      type: "reschedule_next_day",
      agent: "assurance",
      title: `Move ${o.code} to tomorrow`,
      detail: `${o.customerName} requested`,
      reasoning: ["Customer asked for tomorrow.", "Next-day moves need approval (stock & tomorrow's capacity)."],
      payload: { orderId: o.id },
      severity: "medium",
      orderIds: [o.id],
    });
    say(`No problem ${first} — I'm moving your delivery to tomorrow and will confirm the time shortly.`);
    return res;
  }

  const time = /after|later|by|before|around|not home|out|wala|\d/.test(t) ? parseTime(t) : null;
  if (time && /after|later|not home|out|wala|around|\d/.test(t) && !/^yes|^ok/.test(t)) {
    const start = /before|by/.test(t) ? Math.max(w.now + 30, o.window.start) : time;
    const end = /before|by/.test(t) ? time : Math.max(time + 120, o.window.end);
    res.log.push({ agent: "assurance", text: `${o.code}: customer available ${fmtWindow({ start, end })}. Rescheduled & re-sequenced.` });
    res.actions.push({
      type: "reschedule_same_day",
      agent: "assurance",
      title: `Reschedule ${o.code} to ${fmtWindow({ start, end })}`,
      detail: `${o.customerName} replied: "${text}"`,
      reasoning: ["Customer gave a new time today.", "Driver's route re-sequenced to fit."],
      payload: { orderId: o.id, window: { start, end } },
      severity: "low",
      orderIds: [o.id],
    });
    if (p && /after|not home|out|work/.test(t))
      res.actions.push({
        type: "save_memory",
        agent: "assurance",
        title: `Remember ${p.label} availability`,
        detail: `Available ${fmtWindow({ start, end })}`,
        reasoning: ["Pattern to reuse when planning future deliveries here."],
        payload: { target: "place", id: p.id, text: `Customer said: "${text}" — prefers ${fmtWindow({ start, end })}.`, pref: { window: `Prefers ${fmtWindow({ start, end })}` } },
        severity: "low",
      });
    say(`Got it ${first} — we'll deliver between ${fmtWindow({ start, end })}. You'll get a message when the driver is on the way.`);
    return res;
  }

  if (/^(yes|yep|oo|opo|sige|ok|okay|sure|y)\b/.test(t)) {
    res.log.push({ agent: "assurance", text: `${o.code}: recipient confirmed availability.` });
    say(`Thanks ${first}! See you around ${eta ? fmtTime(eta) : "the scheduled time"}.`, { confirmed: true });
    return res;
  }

  if (/where|when|eta|status|update|how long|asan|kailan/.test(t)) {
    const st = o.status;
    const msg =
      st === "delivered"
        ? `Your order was delivered at ${fmtTime(o.deliveredAt!)} — received by ${o.pod?.receivedBy ?? "the recipient"}. Photo attached above.`
        : st === "heading"
        ? `Your driver is on the way — arriving around ${eta ? fmtTime(eta) : "soon"}.`
        : eta
        ? `Your delivery is scheduled for ${fmtWindow(o.window)}; current ETA is ${fmtTime(eta)}.`
        : `Your delivery is scheduled for ${fmtWindow(o.window)} today.`;
    say(`Hi ${first}! ${msg}`);
    return res;
  }

  res.log.push({ agent: "assurance", text: `${o.code}: couldn't confidently interpret "${text}" — flagged for Maria.` });
  say(`Thanks ${first}, I've noted that and Maria will follow up if needed.`);
  return res;
}

/* ------------------------------------------------------------------ */
/*  3. PROOF & DISPUTE AGENT                                           */
/* ------------------------------------------------------------------ */
export function checkPod(sample: "good" | "blurry" | "nopackage" | undefined, o: Order, w: World): PodCheck {
  // Decisions API (next stage): predicates — is_blurry, package_visible, matches_door_type, damaged
  const p = placeOf(w, o);
  if (sample === "blurry") return { status: "retake", reasons: ["Photo is too blurry to identify the package or door"], confidence: 0.91 };
  if (sample === "nopackage") return { status: "retake", reasons: ["Package not visible in the frame", `Expected: ${p?.type === "condo" ? "lobby desk / logbook" : "front door or recipient"}`], confidence: 0.88 };
  return { status: "pass", reasons: ["Package clearly visible", "Location consistent with drop-off point", "Not damaged"], confidence: 0.94 };
}

export function disputePack(w: World, o: Order) {
  const d = driverOf(w, o.driverId);
  return [
    `Order ${o.code} · ${o.items} · ${o.customerName}`,
    `Delivered ${o.deliveredAt ? fmtTime(o.deliveredAt) : "—"} by ${d?.name ?? "—"} · received by ${o.pod?.receivedBy ?? "—"}`,
    `GPS at drop matched address within 25m`,
    `Photo check: ${o.pod?.check.status === "pass" ? "PASS" : o.pod?.check.status} (${o.pod?.check.reasons.join("; ")})`,
    `Customer was notified on the way, on arrival and on delivery (with photo).`,
  ];
}

/* ------------------------------------------------------------------ */
/*  Intake (part of dispatch): messy orders → structured jobs          */
/* ------------------------------------------------------------------ */
export function parseOrderMessage(w: World, o: Order): AgentResult {
  const raw = o.raw ?? "";
  const lower = raw.toLowerCase();
  const place = w.places.find((p) => lower.includes(p.contactName.toLowerCase().split(" ")[0].toLowerCase()) && (lower.includes(p.area.toLowerCase()) || lower.includes(p.address.split(",")[0].toLowerCase().split(" ").slice(-2).join(" "))))
    ?? w.places.find((p) => lower.includes(p.label.toLowerCase().split(" ")[0].toLowerCase()) && lower.includes(p.area.toLowerCase()));
  const fields: Partial<Order> = {};
  const flags: string[] = [];
  let confidence = 0.8;
  if (place) {
    Object.assign(fields, {
      placeId: place.id,
      customerName: place.contactName,
      phone: place.phone,
      address: place.address,
      area: place.area,
      position: place.position,
    });
    confidence += 0.08;
    flags.push(`Matched address book: ${place.label} (${place.stats.deliveries} past deliveries)`);
  } else flags.push("Address not in address book — please verify");

  if (o.source === "whatsapp") {
    Object.assign(fields, { items: "Red roses (12) + chocolates", value: 2400, window: { start: 13 * 60, end: 16 * 60 }, notes: "Card: 'sorry na 😅'" });
    flags.push("“Legaspi Towers” — matched Tower 300; there's also a Tower 200 nearby");
    flags.push("Payment not yet confirmed — send GCash link?");
    confidence -= 0.06;
  } else {
    Object.assign(fields, { items: "Medium mixed bouquet", value: 1800, window: { start: 13 * 60, end: 18 * 60 }, notes: "Sender: Daniel Lee (son). Recipient naps until 1pm." });
    const twin = w.orders.find((x) => x.placeId === place?.id && x.id !== o.id && x.status !== "inbox");
    if (twin) flags.push(`Same address as ${twin.code} today (${twin.items}) — deliver together`);
    confidence += 0.05;
  }
  return {
    log: [{ agent: "dispatch", text: `Parsed ${o.source === "whatsapp" ? "WhatsApp" : "email"} order ${o.code} (${Math.round(confidence * 100)}% confidence).` }],
    actions: [
      {
        type: "create_order",
        agent: "dispatch",
        title: `Create order ${o.code} for ${fields.customerName ?? "unknown"}`,
        detail: `${fields.items} · ${fields.window ? fmtWindow(fields.window) : ""}`,
        reasoning: flags,
        payload: { orderId: o.id, fields, confidence, flags },
        severity: confidence < 0.9 ? "medium" : "low",
        orderIds: [o.id],
      },
    ],
  };
}

/* ------------------------------------------------------------------ */
/*  Ops chat (owner ↔ agent).  Next stage: Claude with the same tools. */
/* ------------------------------------------------------------------ */
export function opsChat(w: World, q: string): AgentResult {
  const t = q.toLowerCase();
  const res: AgentResult = { actions: [], log: [] };
  const named = w.drivers.find((d) => t.includes(d.name.split(" ")[0].toLowerCase()));
  const delivered = w.orders.filter((o) => o.status === "delivered").length;
  const total = w.orders.filter((o) => !["inbox", "review"].includes(o.status)).length;

  const atRisk = w.drivers.flatMap((d) => {
    const e = computeEtas(w, d.id);
    return routeOf(w, d.id).filter((o) => e[o.id] > o.window.end).map((o) => ({ o, eta: e[o.id], d }));
  });

  if (/reassign|move|give/.test(t) && named) {
    const to = w.drivers.find((d) => d !== named && t.includes(d.name.split(" ")[0].toLowerCase()));
    const code = q.match(/#?\d{4}/)?.[0];
    const ord = w.orders.find((o) => code && o.code.includes(code.replace("#", "")));
    if (ord && to) {
      res.actions.push({
        type: "reassign_stops",
        agent: "ops",
        title: `Move ${ord.code} to ${to.name.split(" ")[0]}`,
        detail: "Requested by Maria",
        reasoning: ["Owner instruction."],
        payload: { fromDriverId: ord.driverId, moves: [{ orderId: ord.id, toDriverId: to.id }], ownerRequested: true },
        severity: "low",
        orderIds: [ord.id],
      });
      res.reply = `Done — ${ord.code} (${ord.customerName}) moved to ${to.name.split(" ")[0]}. I've re-sequenced both routes and updated the customer's ETA.`;
      return res;
    }
  }

  if (named) {
    const r = routeOf(w, named.id);
    const e = computeEtas(w, named.id);
    const next = r[0];
    const last = named.reports[named.reports.length - 1];
    res.reply =
      `${named.name.split(" ")[0]} is ${named.status.replace("_", " ")}` +
      (last ? ` (last report: ${reportLabel(last.type)} at ${fmtTime(last.at)})` : "") +
      `. ${r.length ? `Next: ${next.code} ${next.customerName} in ${next.area}, ETA ${fmtTime(e[next.id])}. ${r.length - 1} more after that.` : "No remaining stops."}` +
      ` Today: ${w.orders.filter((o) => o.driverId === named.id && o.status === "delivered").length} delivered.`;
    return res;
  }

  if (/risk|late|problem|issue|attention/.test(t)) {
    res.reply = atRisk.length
      ? `${atRisk.length} deliveries are at risk:\n` + atRisk.map(({ o, eta, d }) => `• ${o.code} ${o.customerName} — ETA ${fmtTime(eta)} vs window ends ${fmtTime(o.window.end)} (${d.name.split(" ")[0]})`).join("\n")
      : "Nothing at risk right now — every remaining stop is inside its window.";
    return res;
  }

  if (/fail|missed/.test(t)) {
    const f = w.orders.filter((o) => o.status === "failed");
    res.reply = f.length ? f.map((o) => `• ${o.code} ${o.customerName}: ${o.failReason}`).join("\n") : "No failed deliveries today. 🎉";
    return res;
  }

  if (/today|status|how|summary|update|overview/.test(t)) {
    const active = w.drivers.filter((d) => d.status === "on_route").length;
    res.reply = `It's ${fmtTime(w.now)}. ${delivered}/${total} delivered, ${active} drivers on the road, ${atRisk.length} at risk, ${w.orders.filter((o) => o.status === "failed").length} failed.` +
      (atRisk.length ? ` Biggest risk: ${atRisk[0].o.code} ${atRisk[0].o.customerName}.` : "");
    return res;
  }

  res.reply = `I can check on a driver ("where's Jun?"), list what's at risk, summarise today, or move a stop ("move #1046 to Ana"). Anything I do follows your autonomy rules.`;
  return res;
}
