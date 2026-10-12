"use client";
import { useEffect, useRef, useState } from "react";
import { FlaskConical } from "lucide-react";
import { useStore } from "@/lib/store";
import type { Section } from "./AdminApp";

/** One-click events so reviewers can trigger each agent without waiting. */
export default function Scenarios({ onNavigate }: { onNavigate: (s: Section) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const s = useStore();
  const planned = s.orders.some((o) => o.driverId);

  useEffect(() => {
    const h = (e: MouseEvent) => ref.current && !ref.current.contains(e.target as Node) && setOpen(false);
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const replyTo = (orderId: string, text: string) => {
    void s.customerReply(orderId, text);
    onNavigate("messages");
  };
  const items: { label: string; sub: string; run: () => void; needsPlan?: boolean }[] = [
    { label: "Jun gets a flat tire", sub: "Dispatch re-plans & reassigns stops", run: () => { void s.report("d-jun", "flat_tire", "Flat on EDSA near Guadalupe"); onNavigate("approvals"); }, needsPlan: true },
    { label: "Ana takes a lunch break", sub: "ETAs shift, late customers warned", run: () => { void s.report("d-ana", "lunch"); onNavigate("today"); }, needsPlan: true },
    { label: "Carlo is running late", sub: "Re-sequence + delay notices", run: () => { void s.report("d-carlo", "running_late", "Traffic on Katipunan"); onNavigate("activity"); }, needsPlan: true },
    { label: "Ben Cruz: “not home until 3pm”", sub: "Assurance reschedules & learns", run: () => replyTo("o4", "wala pa ako sa bahay, after 3pm pa po"), needsPlan: true },
    { label: "Mark Tan: “leave it with the concierge”", sub: "Customer-confirmed safe drop", run: () => replyTo("o2", "I'm in a meeting, please leave it with the lobby concierge"), needsPlan: true },
    { label: "Mark Tan: “where's my order?”", sub: "Scoped customer answer", run: () => replyTo("o2", "where's my order?"), needsPlan: true },
    { label: "Customer asks for a refund", sub: "Blocked by rules → escalated", run: () => { replyTo("o9", "this is late, I want a refund"); }, needsPlan: true },
  ];

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen((v) => !v)} className="flex h-8 items-center gap-1.5 rounded-lg border border-slate-200 px-2.5 text-[13px] text-slate-700 hover:bg-slate-50">
        <FlaskConical size={14} /> <span className="hidden sm:inline">Scenarios</span>
      </button>
      {open && (
        <div className="absolute right-0 top-10 z-[1500] w-[300px] rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
          <div className="px-2.5 py-1.5 text-[11px] text-slate-400">Trigger a real-world event{!planned && " — approve the plan first"}</div>
          {items.map((i) => (
            <button
              key={i.label}
              disabled={i.needsPlan && !planned}
              onClick={() => {
                i.run();
                setOpen(false);
              }}
              className="flex w-full flex-col rounded-lg px-2.5 py-2 text-left hover:bg-slate-50 disabled:opacity-40"
            >
              <span className="text-[13px] font-medium">{i.label}</span>
              <span className="text-[11px] text-slate-500">{i.sub}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
