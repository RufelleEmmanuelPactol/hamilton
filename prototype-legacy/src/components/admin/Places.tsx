"use client";
import { useState } from "react";
import clsx from "clsx";
import { Building2, Home, KeyRound, Clock, Hand, Info, Search, Store, Ticket, Phone } from "lucide-react";
import { useStore } from "@/lib/store";
import { Badge, Card, StatusBadge } from "@/components/ui";
import { NotesCard } from "./Drivers";
import type { Place } from "@/lib/types";

const TYPE_ICON: Record<Place["type"], typeof Home> = { home: Home, office: Building2, condo: Building2, venue: Ticket, shop: Store };

export default function Places() {
  const s = useStore();
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(s.places[0].id);
  const list = s.places.filter((p) => (p.label + p.contactName + p.address).toLowerCase().includes(q.toLowerCase()));
  const p = s.places.find((x) => x.id === sel)!;
  const orders = s.orders.filter((o) => o.placeId === p.id && o.status !== "inbox");
  const Icon = TYPE_ICON[p.type];
  const risk = p.stats.failed >= 2 || p.stats.answersPhone === "rarely";

  return (
    <div className="mx-auto grid max-w-[1280px] gap-4 lg:grid-cols-[300px_1fr]">
      <Card className="h-fit">
        <div className="border-b border-slate-100 p-3">
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2.5">
            <Search size={14} className="text-slate-400" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search people & places" className="h-8 flex-1 text-[13px] outline-none" />
          </div>
        </div>
        <div className="scroll-thin max-h-[70vh] overflow-y-auto">
          {list.map((x) => {
            const I = TYPE_ICON[x.type];
            return (
              <button key={x.id} onClick={() => setSel(x.id)} className={clsx("flex w-full items-start gap-2.5 border-b border-slate-50 px-4 py-2.5 text-left", sel === x.id ? "bg-indigo-50/60" : "hover:bg-slate-50")}>
                <I size={15} className="mt-0.5 text-slate-400" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium">{x.label}</div>
                  <div className="truncate text-[11px] text-slate-500">
                    {x.contactName} · {x.area}
                  </div>
                </div>
                {(x.stats.failed >= 2 || x.stats.answersPhone === "rarely") && <span className="mt-1 h-2 w-2 rounded-full bg-amber-400" title="Delivery risk" />}
              </button>
            );
          })}
        </div>
      </Card>

      <div className="space-y-4">
        <Card>
          <div className="flex flex-wrap items-start gap-4 p-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Icon size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <div className="text-lg font-semibold">{p.label}</div>
                <Badge>{p.type}</Badge>
                {risk && <Badge tone="amber">Delivery risk — confirm first</Badge>}
              </div>
              <div className="text-[13px] text-slate-600">{p.address}</div>
              <div className="mt-0.5 flex items-center gap-1 text-[12px] text-slate-500">
                {p.contactName} · <Phone size={11} /> {p.phone}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              <Mini label="Deliveries" value={String(p.stats.deliveries)} />
              <Mini label="Failed" value={String(p.stats.failed)} warn={p.stats.failed > 0} />
              <Mini label="Answers phone" value={p.stats.answersPhone} warn={p.stats.answersPhone === "rarely"} />
            </div>
          </div>
        </Card>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card title="Delivery preferences" action={<span className="text-[11px] text-slate-400">learned + confirmed · used by agents</span>}>
            <div className="divide-y divide-slate-50">
              <Pref icon={Hand} label="Leave with" value={p.prefs.leaveWith} />
              <Pref icon={KeyRound} label="Gate / access" value={p.prefs.gateCode} />
              <Pref icon={Clock} label="Best time" value={p.prefs.window} />
              <Pref icon={Info} label="Instructions" value={p.prefs.instructions} />
            </div>
          </Card>
          <NotesCard title="Notes" icon={<Info size={14} className="text-slate-500" />} notes={p.notes} onAdd={(t) => s.addNote("place", p.id, t)} hint="Agents add what they learn from customer replies; you can add your own." />
        </div>

        <Card title="Orders at this address">
          {orders.length === 0 ? (
            <div className="px-4 py-6 text-center text-xs text-slate-400">No orders today</div>
          ) : (
            <ul className="divide-y divide-slate-50">
              {orders.map((o) => (
                <li key={o.id} className="flex items-center gap-3 px-4 py-2.5 text-[13px]">
                  <span className="font-mono text-xs text-slate-400">{o.code}</span>
                  <span className="flex-1">{o.items}</span>
                  <StatusBadge status={o.status} />
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}

function Mini({ label, value, warn }: { label: string; value: string; warn?: boolean }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-1.5">
      <div className={clsx("text-[15px] font-semibold capitalize", warn && "text-amber-600")}>{value}</div>
      <div className="text-[10px] text-slate-500">{label}</div>
    </div>
  );
}

function Pref({ icon: Icon, label, value }: { icon: typeof Hand; label: string; value?: string }) {
  return (
    <div className="flex items-start gap-3 px-4 py-2.5">
      <Icon size={15} className="mt-0.5 text-slate-400" />
      <div className="w-24 text-[12px] text-slate-500">{label}</div>
      <div className={clsx("flex-1 text-[13px]", value ? "text-slate-800" : "text-slate-300")}>{value ?? "Not known yet"}</div>
    </div>
  );
}
