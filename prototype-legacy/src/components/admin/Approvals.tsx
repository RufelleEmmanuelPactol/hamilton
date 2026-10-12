"use client";
import clsx from "clsx";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import { fmtTime } from "@/lib/util";
import { AgentTag, Badge, Button, Card, Empty } from "@/components/ui";
import type { ProposedAction } from "@/lib/types";
import type { Section } from "./AdminApp";

export default function Approvals({ go }: { go: (s: Section) => void }) {
  const s = useStore();
  const pending = s.actions.filter((a) => a.status === "pending");
  const blocked = s.actions.filter((a) => a.status === "blocked");
  const recent = s.actions.filter((a) => ["approved", "rejected", "auto"].includes(a.status)).slice(0, 20);
  const ruleOf = (a: ProposedAction) => s.rules.find((r) => r.id === a.type);

  return (
    <div className="mx-auto max-w-[920px] space-y-5">
      <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4">
        <ShieldCheck className="mt-0.5 text-indigo-600" size={18} />
        <div className="flex-1 text-[13px] text-slate-600">
          Agents act on their own where your rules say <b>Auto</b>, ask you where they say <b>Ask me</b>, and never touch anything set to <b>Never</b>. Rejections are remembered as overrides.
        </div>
        <Button size="sm" onClick={() => go("autonomy")}>
          Edit rules
        </Button>
      </div>

      {blocked.length > 0 && (
        <section>
          <h3 className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-rose-700">
            <ShieldAlert size={15} /> Escalated to you ({blocked.length})
          </h3>
          <div className="space-y-3">
            {blocked.map((a) => (
              <ActionCard key={a.id} a={a} rule={ruleOf(a)?.label}>
                <Button size="sm" onClick={() => s.dismiss(a.id)}>
                  Mark handled
                </Button>
              </ActionCard>
            ))}
          </div>
        </section>
      )}

      <section>
        <h3 className="mb-2 text-[13px] font-semibold">Waiting for approval ({pending.length})</h3>
        {pending.length === 0 ? (
          <Card>
            <Empty>All clear — nothing needs you right now.</Empty>
          </Card>
        ) : (
          <div className="space-y-3">
            {pending.map((a) => (
              <ActionCard key={a.id} a={a} rule={ruleOf(a)?.label}>
                <Button size="sm" variant="ghost" onClick={() => s.decide(a.id, false)}>
                  Reject
                </Button>
                <Button size="sm" variant="primary" onClick={() => s.decide(a.id, true)}>
                  Approve
                </Button>
              </ActionCard>
            ))}
          </div>
        )}
      </section>

      {recent.length > 0 && (
        <section>
          <h3 className="mb-2 text-[13px] font-semibold text-slate-500">Recently decided</h3>
          <Card>
            <div className="divide-y divide-slate-100">
              {recent.map((a) => (
                <div key={a.id} className="flex items-center gap-3 px-4 py-2.5 text-[13px]">
                  <span className="font-mono text-[11px] text-slate-400">{fmtTime(a.createdAt)}</span>
                  <span className="min-w-0 flex-1 truncate">{a.title}</span>
                  <Badge tone={a.status === "approved" ? "emerald" : a.status === "auto" ? "indigo" : "slate"}>
                    {a.status === "auto" ? "Auto" : a.status === "approved" ? "Approved" : "Rejected"}
                  </Badge>
                </div>
              ))}
            </div>
          </Card>
        </section>
      )}
    </div>
  );
}

function ActionCard({ a, rule, children }: { a: ProposedAction; rule?: string; children: React.ReactNode }) {
  return (
    <Card className={clsx(a.status === "blocked" && "border-rose-200")}>
      <div className="flex items-start gap-3 p-4">
        <div className={clsx("mt-1.5 h-2 w-2 shrink-0 rounded-full", a.severity === "high" ? "bg-rose-500" : a.severity === "medium" ? "bg-amber-500" : "bg-slate-300")} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <AgentTag agent={a.agent} />
            <span className="font-mono text-[11px] text-slate-400">{fmtTime(a.createdAt)}</span>
            {rule && <span className="text-[11px] text-slate-400">· rule: {rule}</span>}
          </div>
          <div className="mt-1.5 text-[14px] font-semibold">{a.title}</div>
          <div className="text-[13px] text-slate-600">{a.detail}</div>
          <div className="mt-2.5 rounded-lg bg-slate-50 px-3 py-2">
            <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-slate-400">Why</div>
            <ul className="space-y-1 text-[12.5px] text-slate-700">
              {a.reasoning.map((r, i) => (
                <li key={i}>• {r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 border-t border-slate-100 px-4 py-2.5">{children}</div>
    </Card>
  );
}
