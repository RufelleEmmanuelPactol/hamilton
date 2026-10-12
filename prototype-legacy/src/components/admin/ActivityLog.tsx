"use client";
import { useState } from "react";
import clsx from "clsx";
import { useStore } from "@/lib/store";
import { fmtTime } from "@/lib/util";
import { AgentTag, Badge, Card, Segmented } from "@/components/ui";
import type { Activity } from "@/lib/types";

const MODE: Record<Activity["mode"], { label: string; tone: "slate" | "indigo" | "emerald" | "rose" | "amber" }> = {
  auto: { label: "Auto", tone: "indigo" },
  approved: { label: "Approved", tone: "emerald" },
  rejected: { label: "Rejected", tone: "slate" },
  blocked: { label: "Blocked", tone: "rose" },
  info: { label: "Observed", tone: "slate" },
  needs_approval: { label: "Asked you", tone: "amber" },
};

export default function ActivityLog() {
  const s = useStore();
  const [f, setF] = useState<"all" | "actions">("all");
  const items = s.activity.filter((a) => f === "all" || a.mode !== "info");
  return (
    <div className="mx-auto max-w-[920px] space-y-3">
      <div className="flex items-center justify-between">
        <div className="text-[13px] text-slate-500">Every observation, decision and action — with the reasoning behind it.</div>
        <Segmented value={f} onChange={setF} options={[{ value: "all", label: "All" }, { value: "actions", label: "Actions only" }]} />
      </div>
      <Card>
        <ol className="divide-y divide-slate-100">
          {items.map((a) => (
            <li key={a.id} className="flex gap-3 px-4 py-3">
              <span className="w-14 shrink-0 pt-0.5 font-mono text-[11px] text-slate-400">{fmtTime(a.at)}</span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <AgentTag agent={a.agent} />
                  <Badge tone={MODE[a.mode].tone}>{MODE[a.mode].label}</Badge>
                </div>
                <div className={clsx("mt-1 text-[13px]", a.mode === "blocked" ? "text-rose-700" : "text-slate-800")}>{a.text}</div>
                {a.reasoning && a.reasoning.length > 0 && (
                  <ul className="mt-1 space-y-0.5 border-l-2 border-slate-100 pl-2.5 text-[12px] text-slate-500">
                    {a.reasoning.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
