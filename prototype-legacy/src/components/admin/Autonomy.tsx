"use client";
import { useStore } from "@/lib/store";
import { Card, Segmented } from "@/components/ui";
import type { AutonomyRule, Mode } from "@/lib/types";

const GROUPS: AutonomyRule["group"][] = ["Customers", "Dispatch", "Proof", "Memory", "Money"];

export default function Autonomy() {
  const s = useStore();
  const counts = { auto: 0, ask: 0, never: 0 } as Record<Mode, number>;
  s.rules.forEach((r) => counts[r.mode]++);

  return (
    <div className="mx-auto max-w-[920px] space-y-4">
      <Card>
        <div className="flex flex-col gap-3 p-4 md:flex-row md:items-center">
          <div className="flex-1">
            <div className="text-[15px] font-semibold">What can Hamilton do without asking?</div>
            <div className="text-[13px] text-slate-500">
              Every agent action goes through these rules. <b className="text-emerald-700">Auto</b> runs and logs, <b className="text-indigo-700">Ask me</b> waits in “Needs you”, <b className="text-rose-700">Never</b> is blocked and escalated.
            </div>
          </div>
          <div className="flex gap-2 text-center">
            <Pill n={counts.auto} label="Auto" cls="bg-emerald-50 text-emerald-700" />
            <Pill n={counts.ask} label="Ask me" cls="bg-indigo-50 text-indigo-700" />
            <Pill n={counts.never} label="Never" cls="bg-rose-50 text-rose-700" />
          </div>
        </div>
      </Card>

      {GROUPS.map((g) => (
        <Card key={g} title={g}>
          <div className="divide-y divide-slate-100">
            {s.rules
              .filter((r) => r.group === g)
              .map((r) => (
                <div key={r.id} className="flex flex-col gap-2 px-4 py-3 md:flex-row md:items-center">
                  <div className="min-w-0 flex-1">
                    <div className="text-[13px] font-medium">{r.label}</div>
                    <div className="text-[12px] text-slate-500">{r.description}</div>
                    {r.threshold && r.mode === "ask" && (
                      <div className="mt-1.5 flex items-center gap-2 text-[12px] text-slate-600">
                        {r.threshold.label}
                        <input
                          type="number"
                          value={r.threshold.value}
                          min={0}
                          max={r.threshold.unit === "%" ? 100 : 20}
                          onChange={(e) => s.setRuleThreshold(r.id, Number(e.target.value))}
                          className="h-7 w-16 rounded-md border border-slate-200 px-2 text-[12px]"
                        />
                        {r.threshold.unit}
                      </div>
                    )}
                  </div>
                  <Segmented<Mode>
                    value={r.mode}
                    onChange={(m) => s.setRuleMode(r.id, m)}
                    options={[
                      { value: "auto", label: "Auto", tone: "text-emerald-700" },
                      { value: "ask", label: "Ask me", tone: "text-indigo-700" },
                      { value: "never", label: "Never", tone: "text-rose-700" },
                    ]}
                  />
                </div>
              ))}
          </div>
        </Card>
      ))}
    </div>
  );
}

function Pill({ n, label, cls }: { n: number; label: string; cls: string }) {
  return (
    <div className={`rounded-lg px-3 py-1.5 ${cls}`}>
      <div className="text-lg font-semibold">{n}</div>
      <div className="text-[10px]">{label}</div>
    </div>
  );
}
