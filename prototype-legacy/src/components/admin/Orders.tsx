"use client";
import clsx from "clsx";
import { Mail, MessageCircle, Phone, ShoppingBag, Sparkles } from "lucide-react";
import { useStore } from "@/lib/store";
import { fmtWindow, peso } from "@/lib/util";
import { AgentTag, Avatar, Badge, Button, Card, StatusBadge, Thinking } from "@/components/ui";
import type { OrderSource } from "@/lib/types";

export const SOURCE_META: Record<OrderSource, { label: string; icon: typeof Mail; cls: string }> = {
  shopify: { label: "Shopify", icon: ShoppingBag, cls: "bg-emerald-50 text-emerald-700" },
  whatsapp: { label: "WhatsApp", icon: MessageCircle, cls: "bg-green-50 text-green-700" },
  email: { label: "Email", icon: Mail, cls: "bg-sky-50 text-sky-700" },
  phone: { label: "Phone", icon: Phone, cls: "bg-slate-100 text-slate-700" },
};

export default function Orders() {
  const s = useStore();
  const messy = s.orders.filter((o) => o.source !== "shopify" && (o.status === "inbox" || o.status === "review"));
  const all = s.orders.filter((o) => o.status !== "inbox");

  return (
    <div className="mx-auto max-w-[1280px] space-y-4">
      {messy.length > 0 && (
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="text-[13px] font-semibold">Orders from messages</div>
            <span className="text-xs text-slate-400">Shopify syncs automatically · WhatsApp & email need one skim</span>
          </div>
          <div className="grid gap-4 lg:grid-cols-2">
            {messy.map((o) => {
              const src = SOURCE_META[o.source];
              const Icon = src.icon;
              const act = s.actions.find((a) => a.type === "create_order" && a.orderIds?.includes(o.id) && a.status === "pending");
              const busy = s.thinking[`parse-${o.id}`];
              return (
                <Card key={o.id}>
                  <div className="flex items-center gap-2 border-b border-slate-100 px-4 py-2.5">
                    <span className={clsx("flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium", src.cls)}>
                      <Icon size={12} /> {src.label}
                    </span>
                    <span className="font-mono text-xs text-slate-400">{o.code}</span>
                    <div className="flex-1" />
                    <StatusBadge status={o.status} />
                  </div>
                  <div className="p-4">
                    <div className="whitespace-pre-wrap rounded-lg rounded-tl-none bg-slate-50 px-3 py-2 text-[13px] leading-relaxed text-slate-700">{o.raw}</div>
                    {o.status === "inbox" && !busy && (
                      <Button className="mt-3" variant="primary" onClick={() => s.parseOrder(o.id)}>
                        <Sparkles size={14} /> Turn into order
                      </Button>
                    )}
                    {busy && (
                      <div className="mt-3">
                        <Thinking label="Reading the message, matching the address book…" />
                      </div>
                    )}
                    {act && (
                      <div className="mt-3 rounded-lg border border-slate-200">
                        <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
                          <AgentTag agent="dispatch" />
                          <Badge tone={(act.payload.confidence as number) >= 0.9 ? "emerald" : "amber"}>{Math.round((act.payload.confidence as number) * 100)}% confident</Badge>
                        </div>
                        <dl className="grid grid-cols-[90px_1fr] gap-x-3 gap-y-1.5 px-3 py-2.5 text-[12.5px]">
                          {(() => {
                            const f = act.payload.fields as Record<string, unknown>;
                            const w = f.window as { start: number; end: number };
                            return (
                              <>
                                <dt className="text-slate-400">Recipient</dt>
                                <dd className="font-medium">{String(f.customerName ?? "—")}</dd>
                                <dt className="text-slate-400">Address</dt>
                                <dd>{String(f.address ?? "—")}</dd>
                                <dt className="text-slate-400">Items</dt>
                                <dd>{String(f.items ?? "—")}</dd>
                                <dt className="text-slate-400">Window</dt>
                                <dd>{w ? fmtWindow(w) : "—"}</dd>
                                <dt className="text-slate-400">Notes</dt>
                                <dd>{String(f.notes ?? "—")}</dd>
                              </>
                            );
                          })()}
                        </dl>
                        <ul className="space-y-1 border-t border-slate-100 bg-amber-50/40 px-3 py-2 text-[12px] text-slate-600">
                          {act.reasoning.map((r, i) => (
                            <li key={i}>• {r}</li>
                          ))}
                        </ul>
                        <div className="flex justify-end gap-2 px-3 py-2">
                          <Button size="sm" variant="ghost" onClick={() => s.decide(act.id, false)}>
                            Reject
                          </Button>
                          <Button size="sm" variant="primary" onClick={() => s.decide(act.id, true)}>
                            Create order
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      <Card title={`All orders today (${all.filter((o) => o.status !== "review").length})`}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-[13px]">
            <thead>
              <tr className="border-b border-slate-100 text-left text-[11px] uppercase tracking-wide text-slate-400">
                <th className="px-4 py-2 font-medium">Order</th>
                <th className="px-2 py-2 font-medium">Source</th>
                <th className="px-2 py-2 font-medium">Recipient</th>
                <th className="px-2 py-2 font-medium">Area</th>
                <th className="px-2 py-2 font-medium">Window</th>
                <th className="px-2 py-2 font-medium">Value</th>
                <th className="px-2 py-2 font-medium">Driver</th>
                <th className="px-4 py-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {all
                .filter((o) => o.status !== "review")
                .map((o) => {
                  const d = s.drivers.find((x) => x.id === o.driverId);
                  const src = SOURCE_META[o.source];
                  return (
                    <tr key={o.id} className="hover:bg-slate-50/60">
                      <td className="px-4 py-2.5 font-mono text-xs">{o.code}</td>
                      <td className="px-2 py-2.5">
                        <span className={clsx("rounded px-1.5 py-0.5 text-[11px]", src.cls)}>{src.label}</span>
                      </td>
                      <td className="px-2 py-2.5">
                        <div className="font-medium">{o.customerName}</div>
                        <div className="text-[11px] text-slate-400">{o.items}</div>
                      </td>
                      <td className="px-2 py-2.5 text-slate-600">{o.area}</td>
                      <td className="px-2 py-2.5 text-slate-600">{fmtWindow(o.window)}</td>
                      <td className="px-2 py-2.5 tabular-nums text-slate-600">{peso(o.value)}</td>
                      <td className="px-2 py-2.5">
                        {d ? (
                          <div className="flex items-center gap-1.5">
                            <Avatar initials={d.initials} color={d.color} size={20} />
                            {d.name.split(" ")[0]}
                          </div>
                        ) : (
                          <span className="text-slate-300">—</span>
                        )}
                      </td>
                      <td className="px-4 py-2.5">
                        <StatusBadge status={o.status} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
