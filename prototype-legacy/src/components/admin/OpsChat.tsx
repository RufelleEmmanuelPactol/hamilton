"use client";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Send, Sparkles, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { Thinking } from "@/components/ui";

const SUGGEST = ["How's today looking?", "What's at risk?", "Where's Jun?", "Any failed deliveries?", "Move #1046 to Ana"];

export default function OpsChat({ onClose }: { onClose: () => void }) {
  const chat = useStore((s) => s.chat);
  const ask = useStore((s) => s.askOps);
  const busy = useStore((s) => s.thinking["ops"]);
  const [t, setT] = useState("");
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [chat.length, busy]);

  const send = (q: string) => {
    if (!q.trim() || busy) return;
    void ask(q.trim());
    setT("");
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-12 items-center gap-2 border-b border-slate-100 px-4">
        <Sparkles size={15} className="text-indigo-600" />
        <div className="flex-1 text-[13px] font-semibold">Ask Hamilton</div>
        <span className="text-[10px] text-slate-400">also on WhatsApp</span>
        <button onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-slate-100">
          <X size={15} />
        </button>
      </div>
      <div className="scroll-thin min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {chat.map((m) => (
          <div key={m.id} className={clsx("flex", m.role === "owner" ? "justify-end" : "justify-start")}>
            <div
              className={clsx(
                "max-w-[88%] whitespace-pre-wrap rounded-2xl px-3 py-2 text-[13px] leading-snug",
                m.role === "owner" ? "rounded-br-sm bg-indigo-600 text-white" : "rounded-bl-sm bg-slate-100 text-slate-800"
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
        {busy && <Thinking label="Checking live routes…" />}
        <div ref={end} />
      </div>
      <div className="border-t border-slate-100 p-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {SUGGEST.map((q) => (
            <button key={q} onClick={() => send(q)} className="rounded-full border border-slate-200 px-2.5 py-1 text-[11.5px] text-slate-600 hover:border-indigo-300 hover:text-indigo-700">
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(t);
          }}
          className="flex gap-2"
        >
          <input
            value={t}
            onChange={(e) => setT(e.target.value)}
            placeholder="Ask or instruct…"
            className="h-9 flex-1 rounded-lg border border-slate-200 px-3 text-[13px] outline-none focus:border-indigo-400"
          />
          <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white hover:bg-indigo-700">
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}
