"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import clsx from "clsx";
import { CheckCircle2, Sparkles, Wand2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { BUSINESS } from "@/lib/seed";
import { computeEtas, routeOf } from "@/lib/agents";
import { fmtTime, fmtWindow, travelMins } from "@/lib/util";
import { AgentTag, Avatar, Badge, Button, Card, StatusBadge, Thinking } from "@/components/ui";
import type { Order } from "@/lib/types";

const FleetMap = dynamic(() => import("@/components/FleetMap"), { ssr: false });

export default function Plan() {
  const s = useStore();
  const unassigned = s.orders.filter((o) => o.status === "unassigned");
  const review = s.orders.filter((o) => o.status === "review" || o.status === "inbox");
  const thinking = s.thinking["plan"];
  const plan = s.plan;
  const byId = useMemo(() => Object.fromEntries(s.orders.map((o) => [o.id, o])), [s.orders]);

  if (plan?.status === "approved") return <LiveRoutes />;

  return (
    <div className="mx-auto max-w-[1280px] space-y-4">
      {!plan && (
        <Card>
          <div className="flex flex-col items-start gap-4 p-6 md:flex-row md:items-center">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Wand2 size={20} />
            </div>
            <div className="flex-1">
              <div className="text-[15px] font-semibold">Let the dispatch agent draft today&apos;s plan</div>
              <div className="mt-0.5 text-[13px] text-slate-500">
                {unassigned.length} orders ready · uses each driver&apos;s area familiarity, vehicle, success history, and the address book. You review it once.
                {review.length > 0 && <span className="text-amber-700"> {review.length} message order(s) still in the inbox — approve them first to include them.</span>}
              </div>
            </div>
            <Button variant="primary" size="lg" onClick={() => s.generatePlan()} disabled={thinking || !unassigned.length}>
              <Sparkles size={16} /> Draft plan
            </Button>
          </div>
          {thinking && (
            <div className="px-6 pb-6">
              <Thinking label="Dispatch agent is weighing drivers, windows and the address book…" />
            </div>
          )}
        </Card>
      )}

      {plan && (
        <>
          <Card>
            <div className="flex flex-col gap-4 p-4 md:flex-row md:items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <AgentTag agent="dispatch" />
                  <span className="text-xs text-slate-400">drafted at {fmtTime(plan.createdAt)}</span>
                </div>
                <ul className="mt-2 space-y-1 text-[13px] text-slate-700">
                  {plan.summary.map((l, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-indigo-400">•</span>
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex shrink-0 gap-2">
                <Button onClick={() => s.generatePlan()} disabled={thinking}>
                  Redraft
                </Button>
                <Button variant="primary" size="lg" onClick={() => s.approvePlan()}>
                  <CheckCircle2 size={16} /> Approve & send to drivers
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {plan.routes.map((r) => {
              const d = s.drivers.find((x) => x.id === r.driverId)!;
              let t = d.shiftStart;
              let pos = BUSINESS.depot;
              const rows = r.orderIds.map((id) => {
                const o = byId[id] as Order;
                t = Math.max(t + travelMins(pos, o.position!), o.window.start);
                const eta = t;
                t += d.auto.avgStopMins;
                pos = o.position!;
                return { o, eta };
              });
              return (
                <Card key={r.driverId} className="flex flex-col">
                  <div className="flex items-center gap-2.5 border-b border-slate-100 p-3.5">
                    <Avatar initials={d.initials} color={d.color} />
                    <div className="min-w-0">
                      <div className="text-[13px] font-semibold">{d.name}</div>
                      <div className="truncate text-[11px] text-slate-500">{d.vehicle}</div>
                    </div>
                  </div>
                  <div className="space-y-1 bg-slate-50/60 px-3.5 py-2.5">
                    {r.rationale.map((x, i) => (
                      <div key={i} className="text-[11.5px] leading-snug text-slate-600">
                        {i === 0 ? <b className="text-slate-800">{x}</b> : <>↳ {x}</>}
                      </div>
                    ))}
                  </div>
                  <ol className="flex-1 divide-y divide-slate-100">
                    {rows.map(({ o, eta }, i) => (
                      <li key={o.id} className="flex items-start gap-2.5 px-3.5 py-2.5">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border text-[10px] font-semibold" style={{ borderColor: d.color, color: d.color }}>
                          {i + 1}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="truncate text-[12.5px] font-medium">
                            {o.code} · {o.customerName}
                          </div>
                          <div className="truncate text-[11px] text-slate-500">
                            {o.area} · {o.items}
                          </div>
                          <div className={clsx("text-[11px]", eta > o.window.end ? "text-amber-700" : "text-slate-400")}>
                            ETA {fmtTime(eta)} · {fmtWindow(o.window)}
                          </div>
                        </div>
                        <select
                          value={d.id}
                          onChange={(e) => s.movePlanStop(o.id, e.target.value)}
                          className="h-6 max-w-[64px] rounded border border-slate-200 bg-white text-[11px] text-slate-500"
                          title="Move to another driver"
                        >
                          {s.drivers.map((x) => (
                            <option key={x.id} value={x.id}>
                              {x.name.split(" ")[0]}
                            </option>
                          ))}
                        </select>
                      </li>
                    ))}
                  </ol>
                </Card>
              );
            })}
          </div>
          {plan.unassigned.length > 0 && (
            <Card title="Couldn't place">
              {plan.unassigned.map((u) => (
                <div key={u.orderId} className="px-4 py-2 text-[13px]">
                  {byId[u.orderId]?.code} — {u.reason}
                </div>
              ))}
            </Card>
          )}
        </>
      )}
    </div>
  );
}

function LiveRoutes() {
  const s = useStore();
  const world = useMemo(() => ({ now: s.now, drivers: s.drivers, orders: s.orders, places: s.places }), [s.now, s.drivers, s.orders, s.places]);
  return (
    <div className="mx-auto max-w-[1280px] space-y-4">
      <Card className="p-1.5">
        <FleetMap height={380} />
      </Card>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {s.drivers.map((d) => {
          const etas = computeEtas(world, d.id);
          const mine = s.orders.filter((o) => o.driverId === d.id);
          const active = routeOf(world, d.id);
          const finished = mine.filter((o) => ["delivered", "failed"].includes(o.status));
          const hold = mine.filter((o) => o.status === "on_hold");
          return (
            <Card key={d.id}>
              <div className="flex items-center gap-2.5 border-b border-slate-100 p-3.5">
                <Avatar initials={d.initials} color={d.color} />
                <div className="min-w-0 flex-1">
                  <div className="text-[13px] font-semibold">{d.name}</div>
                  <div className="text-[11px] text-slate-500">
                    {finished.length}/{mine.length} done
                  </div>
                </div>
              </div>
              <ol className="divide-y divide-slate-100">
                {[...finished, ...active, ...hold].map((o) => (
                  <li key={o.id} className="flex items-center gap-2 px-3.5 py-2">
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-[12.5px] font-medium">
                        {o.code} · {o.customerName}
                      </div>
                      <div className={clsx("text-[11px]", etas[o.id] > o.window.end ? "text-amber-700" : "text-slate-400")}>
                        {o.status === "delivered" ? `Delivered ${fmtTime(o.deliveredAt!)}` : etas[o.id] ? `ETA ${fmtTime(etas[o.id])} · ${fmtWindow(o.window)}` : fmtWindow(o.window)}
                      </div>
                    </div>
                    {o.leaveWith && o.status !== "delivered" && <Badge tone="emerald">Leave w/ {o.leaveWith.split(" ")[0]}</Badge>}
                    <StatusBadge status={o.status} />
                  </li>
                ))}
                {!mine.length && <li className="px-3.5 py-6 text-center text-xs text-slate-400">No stops</li>}
              </ol>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
