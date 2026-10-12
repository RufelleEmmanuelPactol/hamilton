"use client";
import { useState } from "react";
import clsx from "clsx";
import { Bot, Phone, TrendingDown, TrendingUp, Minus, UserPen, Radio } from "lucide-react";
import { useStore } from "@/lib/store";
import { reportLabel } from "@/lib/agents";
import { fmtTime, pct } from "@/lib/util";
import { Avatar, Badge, Button, Card, Meter, StatusBadge } from "@/components/ui";
import { DriverStatus } from "./Today";
import type { Note } from "@/lib/types";

export default function Drivers() {
  const s = useStore();
  const [sel, setSel] = useState(s.drivers[0].id);
  const d = s.drivers.find((x) => x.id === sel)!;
  const today = s.orders.filter((o) => o.driverId === d.id);
  const Trend = d.auto.trend === "up" ? TrendingUp : d.auto.trend === "down" ? TrendingDown : Minus;

  return (
    <div className="mx-auto grid max-w-[1280px] gap-4 lg:grid-cols-[260px_1fr]">
      <Card className="h-fit">
        {s.drivers.map((x) => (
          <button
            key={x.id}
            onClick={() => setSel(x.id)}
            className={clsx("flex w-full items-center gap-2.5 border-b border-slate-50 px-4 py-3 text-left last:border-0", sel === x.id ? "bg-indigo-50/60" : "hover:bg-slate-50")}
          >
            <Avatar initials={x.initials} color={x.color} />
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-medium">{x.name}</div>
              <div className="text-[11px] text-slate-500">{pct(x.auto.successRate)} success</div>
            </div>
            <DriverStatus status={x.status} />
          </button>
        ))}
      </Card>

      <div className="space-y-4">
        <Card>
          <div className="flex flex-wrap items-center gap-4 p-4">
            <Avatar initials={d.initials} color={d.color} size={52} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div className="text-lg font-semibold">{d.name}</div>
                {d.auto.coldStart && <Badge tone="amber">Cold start · blended with fleet averages</Badge>}
              </div>
              <div className="flex flex-wrap gap-x-4 text-[13px] text-slate-500">
                <span>{d.vehicle}</span>
                <span className="flex items-center gap-1">
                  <Phone size={12} /> {d.phone}
                </span>
              </div>
            </div>
            <DriverStatus status={d.status} />
          </div>
        </Card>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card title={<span className="flex items-center gap-1.5"><Bot size={14} className="text-indigo-500" /> Automated context</span>} action={<span className="text-[11px] text-slate-400">time-weighted · last 8 weeks</span>}>
            <div className="grid grid-cols-2 gap-3 p-4">
              <Stat label="Success rate" value={pct(d.auto.successRate)} />
              <Stat label="On-time rate" value={pct(d.auto.onTimeRate)} />
              <Stat label="Deliveries (30d)" value={String(d.auto.deliveries30d)} />
              <Stat label="Avg. time per stop" value={`${d.auto.avgStopMins} min`} extra={<Trend size={14} className="text-slate-400" />} />
            </div>
            <div className="border-t border-slate-100 px-4 py-3">
              <div className="mb-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">Location familiarity</div>
              <div className="space-y-2">
                {Object.entries(d.auto.areaFamiliarity)
                  .sort((a, b) => b[1] - a[1])
                  .map(([area, v]) => (
                    <div key={area} className="grid grid-cols-[96px_1fr_40px] items-center gap-2 text-[12.5px]">
                      <span className="text-slate-600">{area}</span>
                      <Meter value={v} color={v > 0.8 ? "bg-indigo-500" : v > 0.5 ? "bg-indigo-300" : "bg-slate-300"} />
                      <span className="text-right tabular-nums text-slate-500">{pct(v)}</span>
                    </div>
                  ))}
              </div>
            </div>
          </Card>

          <Card title={<span className="flex items-center gap-1.5"><Radio size={14} className="text-amber-500" /> Today&apos;s context (driver reports)</span>}>
            {d.reports.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-slate-400">No reports yet. Drivers tap Flat tire / Lunch / Running late… in their app.</div>
            ) : (
              <ul className="divide-y divide-slate-100">
                {[...d.reports].reverse().map((r) => (
                  <li key={r.id} className="flex items-center gap-3 px-4 py-2.5 text-[13px]">
                    <span className="font-mono text-[11px] text-slate-400">{fmtTime(r.at)}</span>
                    <span className="flex-1">
                      <b>{reportLabel(r.type)}</b> {r.text && <span className="text-slate-500">— {r.text}</span>}
                    </span>
                    {r.resolved ? (
                      <Badge tone="emerald">Resolved</Badge>
                    ) : (
                      <Button size="sm" onClick={() => s.resolveReport(d.id, r.id)}>
                        Resolve
                      </Button>
                    )}
                  </li>
                ))}
              </ul>
            )}
            <div className="border-t border-slate-100 px-4 py-3">
              <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">Today&apos;s stops</div>
              <div className="flex flex-wrap gap-1.5">
                {today.length ? today.map((o) => (
                  <span key={o.id} className="flex items-center gap-1 rounded-md border border-slate-100 px-1.5 py-0.5 text-[11px]">
                    {o.code} <StatusBadge status={o.status} />
                  </span>
                )) : <span className="text-xs text-slate-400">None assigned</span>}
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <NotesCard title="AI notes" icon={<Bot size={14} className="text-indigo-500" />} notes={d.aiNotes} hint="Written by agents from delivery history. Each note cites its evidence." />
          <NotesCard title="Your notes" icon={<UserPen size={14} className="text-slate-500" />} notes={d.humanNotes} onAdd={(t) => s.addNote("driver", d.id, t)} hint="Case-management notes. Agents read these when planning." />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value, extra }: { label: string; value: string; extra?: React.ReactNode }) {
  return (
    <div className="rounded-lg bg-slate-50 px-3 py-2.5">
      <div className="text-[11px] text-slate-500">{label}</div>
      <div className="flex items-center gap-1.5 text-lg font-semibold tabular-nums">
        {value} {extra}
      </div>
    </div>
  );
}

export function NotesCard({ title, icon, notes, onAdd, hint }: { title: string; icon: React.ReactNode; notes: Note[]; onAdd?: (t: string) => void; hint: string }) {
  const [t, setT] = useState("");
  return (
    <Card title={<span className="flex items-center gap-1.5">{icon} {title}</span>}>
      <div className="px-4 pt-2 text-[11px] text-slate-400">{hint}</div>
      {onAdd && (
        <form
          className="flex gap-2 px-4 pt-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (t.trim()) onAdd(t.trim());
            setT("");
          }}
        >
          <input value={t} onChange={(e) => setT(e.target.value)} placeholder="Add a note…" className="h-8 flex-1 rounded-lg border border-slate-200 px-2.5 text-[13px] outline-none focus:border-indigo-400" />
          <Button size="sm" type="submit">
            Add
          </Button>
        </form>
      )}
      <ul className="divide-y divide-slate-50 px-1 py-1">
        {notes.length === 0 && <li className="px-3 py-4 text-center text-xs text-slate-400">No notes</li>}
        {notes.map((n) => (
          <li key={n.id} className="px-3 py-2.5">
            <div className="text-[13px] leading-snug text-slate-700">{n.text}</div>
            <div className="mt-0.5 text-[11px] text-slate-400">
              {n.author === "agent" ? "Agent" : n.author === "owner" ? "Maria" : "Driver"}
              {n.at ? ` · ${fmtTime(n.at)} today` : " · earlier"}
              {n.source && ` · evidence: ${n.source}`}
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
