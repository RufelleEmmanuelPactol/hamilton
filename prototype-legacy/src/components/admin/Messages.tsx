"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { FileCheck2, Send, Bot } from "lucide-react";
import { useStore } from "@/lib/store";
import { disputePack } from "@/lib/agents";
import { fmtTime, fmtWindow } from "@/lib/util";
import { Badge, Button, Card, Empty, StatusBadge, Thinking } from "@/components/ui";

const QUICK = ["Where's my order?", "Not home until 3pm", "Please leave it with the guard", "Can we do tomorrow instead?", "Yes, someone's home", "I want a refund"];

export default function Messages() {
  const s = useStore();
  const threads = useMemo(() => {
    const ids = [...new Set(s.messages.map((m) => m.orderId))];
    const withMsgs = ids.map((id) => s.orders.find((o) => o.id === id)!).filter(Boolean);
    const rest = s.orders.filter((o) => !ids.includes(o.id) && o.driverId);
    const last = (id: string) => [...s.messages].reverse().find((m) => m.orderId === id)?.at ?? 0;
    return [...withMsgs.sort((a, b) => last(b.id) - last(a.id)), ...rest];
  }, [s.messages, s.orders]);
  const [sel, setSel] = useState<string | null>(null);
  const current = s.orders.find((o) => o.id === (sel ?? threads[0]?.id));
  const msgs = s.messages.filter((m) => m.orderId === current?.id);
  const [text, setText] = useState("");
  const [showPack, setShowPack] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => end.current?.scrollIntoView({ behavior: "smooth" }), [msgs.length]);

  const send = (t: string) => {
    if (!current || !t.trim()) return;
    void s.customerReply(current.id, t.trim());
    setText("");
  };

  return (
    <div className="mx-auto grid h-[calc(100vh-7.5rem)] max-w-[1280px] gap-4 lg:grid-cols-[320px_1fr]">
      <Card className="flex min-h-0 flex-col">
        <div className="border-b border-slate-100 px-4 py-3">
          <div className="text-[13px] font-semibold">Customer threads</div>
          <div className="text-[11px] text-slate-400">Sent as {"“"}Maria&apos;s Flowers Delivery Assistant{"”"} via WhatsApp/SMS</div>
        </div>
        <div className="scroll-thin min-h-0 flex-1 overflow-y-auto">
          {threads.length === 0 && <Empty>No threads yet — approve the plan and run the day.</Empty>}
          {threads.map((o) => {
            const last = [...s.messages].reverse().find((m) => m.orderId === o.id);
            const unread = last?.direction === "in";
            return (
              <button
                key={o.id}
                onClick={() => {
                  setSel(o.id);
                  setShowPack(false);
                }}
                className={clsx("flex w-full flex-col gap-0.5 border-b border-slate-50 px-4 py-2.5 text-left", current?.id === o.id ? "bg-indigo-50/60" : "hover:bg-slate-50")}
              >
                <div className="flex items-center gap-2">
                  <span className="truncate text-[13px] font-medium">{o.customerName}</span>
                  <span className="font-mono text-[10px] text-slate-400">{o.code}</span>
                  <div className="flex-1" />
                  {unread && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
                </div>
                <div className="truncate text-xs text-slate-500">{last ? last.text : "No messages yet"}</div>
              </button>
            );
          })}
        </div>
      </Card>

      {current ? (
        <Card className="flex min-h-0 flex-col">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
            <div className="min-w-0 flex-1">
              <div className="text-[13px] font-semibold">
                {current.customerName} <span className="font-mono text-xs font-normal text-slate-400">{current.code}</span>
              </div>
              <div className="truncate text-xs text-slate-500">
                {current.items} · {fmtWindow(current.window)} · {current.phone}
              </div>
            </div>
            <StatusBadge status={current.status} />
            {current.status === "delivered" && (
              <Button size="sm" onClick={() => setShowPack((v) => !v)}>
                <FileCheck2 size={13} /> Dispute pack
              </Button>
            )}
          </div>

          {showPack && current.status === "delivered" && (
            <div className="border-b border-amber-100 bg-amber-50/50 px-4 py-3">
              <div className="mb-1.5 flex items-center gap-2 text-xs font-semibold text-amber-800">
                <FileCheck2 size={13} /> Proof agent · evidence pack (ready to send)
              </div>
              <div className="flex gap-3">
                {current.pod?.photo && <img src={current.pod.photo} alt="proof" className="h-20 w-28 rounded-md border object-cover" />}
                <ul className="space-y-0.5 text-[12px] text-slate-700">
                  {disputePack({ now: s.now, drivers: s.drivers, orders: s.orders, places: s.places }, current).map((l, i) => (
                    <li key={i}>• {l}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          <div className="scroll-thin min-h-0 flex-1 space-y-2.5 overflow-y-auto bg-[#f3f4f1] px-4 py-4">
            {msgs.length === 0 && <div className="py-10 text-center text-xs text-slate-400">Notifications appear here as the delivery progresses.</div>}
            {msgs.map((m) => (
              <div key={m.id} className={clsx("flex", m.direction === "in" ? "justify-start" : "justify-end")}>
                <div
                  className={clsx(
                    "max-w-[78%] rounded-2xl px-3 py-2 text-[13px] leading-snug shadow-sm",
                    m.direction === "in" ? "rounded-tl-sm bg-white text-slate-800" : m.kind === "assistant" ? "rounded-tr-sm bg-indigo-600 text-white" : "rounded-tr-sm bg-[#dcf8c6] text-slate-800"
                  )}
                >
                  {m.image && <img src={m.image} alt="" className="mb-1.5 w-56 rounded-lg" />}
                  {m.text}
                  <div className={clsx("mt-1 flex items-center justify-end gap-1 text-[10px]", m.direction === "out" && m.kind === "assistant" ? "text-indigo-200" : "text-slate-400")}>
                    {m.direction === "out" && (m.kind === "assistant" ? <><Bot size={10} /> assistant</> : "automated")} · {fmtTime(m.at)}
                  </div>
                </div>
              </div>
            ))}
            {s.thinking[`reply-${current.id}`] && (
              <div className="flex justify-end">
                <div className="w-48">
                  <Thinking label="Assurance agent replying…" />
                </div>
              </div>
            )}
            <div ref={end} />
          </div>

          <div className="border-t border-slate-100 p-3">
            <div className="mb-2 flex items-center gap-2">
              <Badge tone="violet">Demo</Badge>
              <span className="text-[11px] text-slate-500">Reply as the customer to see the Assurance agent react</span>
            </div>
            <div className="mb-2 flex flex-wrap gap-1.5">
              {QUICK.map((q) => (
                <button key={q} onClick={() => send(q)} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11.5px] text-slate-600 hover:border-indigo-300 hover:text-indigo-700">
                  {q}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(text);
              }}
              className="flex gap-2"
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder={`Message as ${current.customerName.split(" ")[0]}…`}
                className="h-9 flex-1 rounded-lg border border-slate-200 px-3 text-[13px] outline-none focus:border-indigo-400"
              />
              <Button type="submit" variant="primary">
                <Send size={14} />
              </Button>
            </form>
          </div>
        </Card>
      ) : (
        <Card>
          <Empty>Select a thread</Empty>
        </Card>
      )}
    </div>
  );
}
