"use client";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import clsx from "clsx";
import { AlertTriangle, ArrowRight, CheckCircle2, Clock, PackageCheck, Truck, XCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { computeEtas, reportLabel, routeOf } from "@/lib/agents";
import { fmtTime } from "@/lib/util";
import { AgentTag, Avatar, Badge, Button, Card, Empty } from "@/components/ui";
import type { Section } from "./AdminApp";

const FleetMap = dynamic(() => import("@/components/FleetMap"), { ssr: false, loading: () => <div className="h-[420px] animate-pulse rounded-xl bg-slate-100" /> });

export default function Today({ go }: { go: (s: Section) => void }) {
  const s = useStore();
  const world = useMemo(() => ({ now: s.now, drivers: s.drivers, orders: s.orders, places: s.places }), [s.now, s.drivers, s.orders, s.places]);
  const etas = useMemo(() => Object.assign({}, ...s.drivers.map((d) => computeEtas(world, d.id))) as Record<string, number>, [world, s.drivers]);

  const live = s.orders.filter((o) => !["inbox", "review"].includes(o.status));
  const delivered = live.filter((o) => o.status === "delivered");
  const failed = live.filter((o) => o.status === "failed");
  const atRisk = live.filter((o) => etas[o.id] && etas[o.id] > o.window.end);
  const onTime = delivered.filter((o) => (o.deliveredAt ?? 0) <= o.window.end).length;
  const pending = s.actions.filter((a) => a.status === "pending" || a.status === "blocked");
  const planned = s.orders.some((o) => o.driverId);

  return (
    <div className="mx-auto max-w-[1280px] space-y-4">
      {!planned && (
        <Card className="border-indigo-200 bg-gradient-to-r from-indigo-50 to-white">
          <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
            <div className="flex-1">
              <div className="text-[15px] font-semibold">Good morning, Maria. Here&apos;s your morning in three taps.</div>
              <ol className="mt-1.5 flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-slate-600">
                <li>1 · Review 2 orders that came in by WhatsApp & email</li>
                <li>2 · Approve the plan the dispatch agent drafts</li>
                <li>3 · Run the day — Hamilton handles the rest, and asks when it needs you</li>
              </ol>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => go("orders")}>Review orders</Button>
              <Button variant="primary" onClick={() => go("plan")}>
                Draft today&apos;s plan <ArrowRight size={14} />
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Kpi icon={PackageCheck} label="Delivered" value={`${delivered.length}/${live.length}`} sub={`${live.length - delivered.length - failed.length} remaining`} />
        <Kpi icon={Clock} label="On time" value={delivered.length ? `${Math.round((onTime / delivered.length) * 100)}%` : "—"} sub="of completed" />
        <Kpi icon={AlertTriangle} label="At risk" value={String(atRisk.length)} sub="ETA past window" tone={atRisk.length ? "amber" : undefined} />
        <Kpi icon={XCircle} label="Failed" value={String(failed.length)} sub="today" tone={failed.length ? "rose" : undefined} />
        <Kpi icon={CheckCircle2} label="Needs you" value={String(pending.length)} sub="approvals & escalations" tone={pending.length ? "indigo" : undefined} onClick={() => go("approvals")} />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card className="p-1.5">
          <FleetMap height={460} />
        </Card>
        <div className="space-y-4">
          <Card title="Needs you" action={<button className="text-xs text-indigo-600" onClick={() => go("approvals")}>View all</button>}>
            {pending.length === 0 ? (
              <Empty>Nothing waiting. Agents are working within your rules.</Empty>
            ) : (
              <div className="divide-y divide-slate-100">
                {pending.slice(0, 4).map((a) => (
                  <div key={a.id} className="flex items-start gap-3 px-4 py-3">
                    <div className={clsx("mt-1 h-2 w-2 shrink-0 rounded-full", a.severity === "high" ? "bg-rose-500" : a.severity === "medium" ? "bg-amber-500" : "bg-slate-300")} />
                    <div className="min-w-0 flex-1">
                      <div className="text-[13px] font-medium">{a.title}</div>
                      <div className="truncate text-xs text-slate-500">{a.detail}</div>
                    </div>
                    {a.status === "pending" ? (
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" onClick={() => s.decide(a.id, false)}>
                          Reject
                        </Button>
                        <Button size="sm" variant="primary" onClick={() => s.decide(a.id, true)}>
                          Approve
                        </Button>
                      </div>
                    ) : (
                      <Badge tone="rose">Escalated</Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
          <Card title="Live agent activity" action={<button className="text-xs text-indigo-600" onClick={() => go("activity")}>Full log</button>}>
            <div className="scroll-thin max-h-[250px] divide-y divide-slate-50 overflow-y-auto">
              {s.activity.slice(0, 12).map((a) => (
                <div key={a.id} className="px-4 py-2.5">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-slate-400">{fmtTime(a.at)}</span>
                    <AgentTag agent={a.agent} />
                  </div>
                  <div className="mt-1 text-[12.5px] leading-snug text-slate-700">{a.text}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <Card title="Drivers today">
        <div className="grid divide-y divide-slate-100 md:grid-cols-2 md:divide-y-0 xl:grid-cols-4">
          {s.drivers.map((d) => {
            const route = routeOf(world, d.id);
            const next = route[0];
            const done = s.orders.filter((o) => o.driverId === d.id && o.status === "delivered").length;
            const total = s.orders.filter((o) => o.driverId === d.id && !["tomorrow"].includes(o.status)).length;
            const lastRep = [...d.reports].reverse().find((r) => !r.resolved);
            return (
              <div key={d.id} className="space-y-2 p-4 md:border-r md:border-slate-100 last:border-r-0">
                <div className="flex items-center gap-2.5">
                  <Avatar initials={d.initials} color={d.color} />
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-semibold">{d.name}</div>
                    <div className="truncate text-[11px] text-slate-500">{d.vehicle}</div>
                  </div>
                  <DriverStatus status={d.status} />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Truck size={13} /> {done}/{total} delivered
                </div>
                {lastRep && (
                  <div className="rounded-md bg-amber-50 px-2 py-1.5 text-xs text-amber-800">
                    {reportLabel(lastRep.type)} · {fmtTime(lastRep.at)} {lastRep.text && `— “${lastRep.text}”`}
                  </div>
                )}
                {next ? (
                  <div className="rounded-md bg-slate-50 px-2.5 py-2 text-xs">
                    <div className="text-slate-500">Next</div>
                    <div className="font-medium text-slate-800">
                      {next.code} · {next.customerName}
                    </div>
                    <div className={clsx("mt-0.5", etas[next.id] > next.window.end ? "text-amber-700" : "text-slate-500")}>
                      ETA {fmtTime(etas[next.id])} · window ends {fmtTime(next.window.end)}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-md bg-slate-50 px-2.5 py-2 text-xs text-slate-400">No stops {planned ? "remaining" : "yet"}</div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function Kpi({
  icon: Icon,
  label,
  value,
  sub,
  tone,
  onClick,
}: {
  icon: typeof Clock;
  label: string;
  value: string;
  sub: string;
  tone?: "amber" | "rose" | "indigo";
  onClick?: () => void;
}) {
  return (
    <button onClick={onClick} className={clsx("rounded-xl border bg-white p-3.5 text-left", onClick ? "hover:border-indigo-200" : "cursor-default", "border-slate-200")}>
      <div className="flex items-center gap-1.5 text-xs text-slate-500">
        <Icon size={14} className={clsx(tone === "amber" && "text-amber-500", tone === "rose" && "text-rose-500", tone === "indigo" && "text-indigo-500")} />
        {label}
      </div>
      <div className={clsx("mt-1 text-2xl font-semibold tabular-nums", tone === "amber" && "text-amber-600", tone === "rose" && "text-rose-600", tone === "indigo" && "text-indigo-600")}>{value}</div>
      <div className="text-[11px] text-slate-400">{sub}</div>
    </button>
  );
}

export function DriverStatus({ status }: { status: string }) {
  const m: Record<string, [string, "slate" | "indigo" | "amber" | "rose" | "emerald"]> = {
    idle: ["Idle", "slate"],
    on_route: ["On route", "indigo"],
    break: ["On break", "amber"],
    incident: ["Incident", "rose"],
    done: ["Done", "emerald"],
  };
  const [l, t] = m[status] ?? ["—", "slate"];
  return <Badge tone={t}>{l}</Badge>;
}
