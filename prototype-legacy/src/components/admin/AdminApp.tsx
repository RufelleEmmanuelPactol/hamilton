"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";
import {
  LayoutDashboard,
  Route,
  Inbox,
  ShieldCheck,
  MessagesSquare,
  Users,
  BookUser,
  SlidersHorizontal,
  History,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  Zap,
  Smartphone,
} from "lucide-react";
import { startCrossTabSync, useStore } from "@/lib/store";
import { BUSINESS } from "@/lib/seed";
import { fmtTime } from "@/lib/util";
import { Logo } from "@/components/ui";
import Today from "./Today";
import Plan from "./Plan";
import Orders from "./Orders";
import Approvals from "./Approvals";
import Messages from "./Messages";
import Drivers from "./Drivers";
import Places from "./Places";
import Autonomy from "./Autonomy";
import ActivityLog from "./ActivityLog";
import OpsChat from "./OpsChat";
import Scenarios from "./Scenarios";

export type Section = "today" | "plan" | "orders" | "approvals" | "messages" | "drivers" | "places" | "autonomy" | "activity";

const NAV: { id: Section; label: string; icon: typeof Route; group?: string }[] = [
  { id: "today", label: "Today", icon: LayoutDashboard },
  { id: "plan", label: "Plan & routes", icon: Route },
  { id: "orders", label: "Orders inbox", icon: Inbox },
  { id: "approvals", label: "Needs you", icon: ShieldCheck },
  { id: "messages", label: "Customer messages", icon: MessagesSquare },
  { id: "drivers", label: "Drivers", icon: Users, group: "Memory" },
  { id: "places", label: "Address book", icon: BookUser, group: "Memory" },
  { id: "autonomy", label: "Autonomy rules", icon: SlidersHorizontal, group: "Control" },
  { id: "activity", label: "Agent activity", icon: History, group: "Control" },
];

export default function AdminApp({ embedded = false }: { embedded?: boolean }) {
  const [section, setSection] = useState<Section>("today");
  const [chatOpen, setChatOpen] = useState(!embedded);
  const s = useStore();
  const pending = s.actions.filter((a) => a.status === "pending" || a.status === "blocked").length;
  const inbox = s.orders.filter((o) => o.status === "inbox" || o.status === "review").length;
  const unreadIn = s.messages.filter((m) => m.direction === "in").length;

  useEffect(() => {
    const h = window.location.hash.replace("#", "") as Section;
    if (NAV.some((n) => n.id === h)) setSection(h);
    return startCrossTabSync();
  }, []);
  useEffect(() => {
    window.history.replaceState(null, "", `#${section}`);
  }, [section]);

  // the admin tab drives the simulation clock
  useEffect(() => {
    const t = setInterval(() => useStore.getState().tick(), 1000);
    return () => clearInterval(t);
  }, []);

  const go = (x: Section) => setSection(x);

  return (
    <div className="flex h-screen min-h-0 bg-[var(--bg)] text-slate-900">
      {/* sidebar */}
      <aside className="hidden w-[220px] shrink-0 flex-col border-r border-slate-200 bg-white md:flex">
        <div className="flex h-14 items-center gap-2 border-b border-slate-100 px-4">
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight">Hamilton</span>
        </div>
        <div className="px-3 pt-3">
          <div className="rounded-lg bg-slate-50 px-3 py-2">
            <div className="text-[11px] text-slate-500">Workspace</div>
            <div className="truncate text-[13px] font-medium">{BUSINESS.name}</div>
          </div>
        </div>
        <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
          {NAV.map((n, i) => {
            const Icon = n.icon;
            const badge = n.id === "approvals" ? pending : n.id === "orders" ? inbox : n.id === "messages" ? unreadIn : 0;
            return (
              <div key={n.id}>
                {n.group && NAV[i - 1]?.group !== n.group && (
                  <div className="px-2 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-slate-400">{n.group}</div>
                )}
                <button
                  onClick={() => go(n.id)}
                  className={clsx(
                    "flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[13px] transition",
                    section === n.id ? "bg-indigo-50 font-medium text-indigo-700" : "text-slate-600 hover:bg-slate-50"
                  )}
                >
                  <Icon size={16} />
                  <span className="flex-1 text-left">{n.label}</span>
                  {badge > 0 && (
                    <span className={clsx("rounded-full px-1.5 text-[10px] font-semibold", n.id === "approvals" ? "bg-rose-500 text-white" : "bg-slate-200 text-slate-700")}>
                      {badge}
                    </span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>
        {!embedded && (
          <a href="/driver" target="_blank" className="m-3 flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-3 py-2 text-xs text-slate-500 hover:bg-slate-50">
            <Smartphone size={14} /> Open driver app
          </a>
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4">
          <div className="md:hidden">
            <Logo />
          </div>
          <select className="h-8 rounded-md border border-slate-200 px-2 text-sm md:hidden" value={section} onChange={(e) => go(e.target.value as Section)}>
            {NAV.map((n) => (
              <option key={n.id} value={n.id}>
                {n.label}
              </option>
            ))}
          </select>
          <div className="hidden text-[15px] font-semibold md:block">{NAV.find((n) => n.id === section)?.label}</div>
          <div className="flex-1" />
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-slate-50 p-1">
            <span className="px-2 font-mono text-[13px] font-semibold tabular-nums text-slate-800">{fmtTime(s.now)}</span>
            <button
              onClick={() => s.setRunning(!s.running)}
              className={clsx("flex h-7 items-center gap-1 rounded-md px-2 text-xs font-medium", s.running ? "bg-white text-slate-700 shadow-sm" : "bg-indigo-600 text-white")}
              title="Simulation clock"
            >
              {s.running ? <Pause size={13} /> : <Play size={13} />}
              {s.running ? "Pause" : "Run day"}
            </button>
            <select
              value={s.speed}
              onChange={(e) => s.setSpeed(Number(e.target.value))}
              className="h-7 rounded-md bg-transparent px-1 text-xs text-slate-600"
              title="Simulation speed"
            >
              <option value={1}>1×</option>
              <option value={2}>2×</option>
              <option value={5}>5×</option>
              <option value={10}>10×</option>
            </select>
          </div>
          <Scenarios onNavigate={go} />
          <button
            onClick={() => {
              if (confirm("Reset the demo to 7:30am?")) s.reset();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100"
            title="Reset demo"
          >
            <RotateCcw size={15} />
          </button>
          <button
            onClick={() => setChatOpen((v) => !v)}
            className={clsx(
              "flex h-8 items-center gap-1.5 rounded-lg px-3 text-[13px] font-medium",
              chatOpen ? "bg-indigo-50 text-indigo-700" : "bg-slate-900 text-white hover:bg-slate-800"
            )}
          >
            <Sparkles size={14} /> Ask Hamilton
          </button>
        </header>

        <div className="flex min-h-0 flex-1">
          <main className="scroll-thin min-w-0 flex-1 overflow-y-auto p-4 md:p-6">
            {section === "today" && <Today go={go} />}
            {section === "plan" && <Plan />}
            {section === "orders" && <Orders />}
            {section === "approvals" && <Approvals go={go} />}
            {section === "messages" && <Messages />}
            {section === "drivers" && <Drivers />}
            {section === "places" && <Places />}
            {section === "autonomy" && <Autonomy />}
            {section === "activity" && <ActivityLog />}
          </main>
          {chatOpen && (
            <aside className="hidden w-[340px] shrink-0 border-l border-slate-200 bg-white lg:flex">
              <OpsChat onClose={() => setChatOpen(false)} />
            </aside>
          )}
        </div>
      </div>
      {s.thinking && Object.values(s.thinking).some(Boolean) && (
        <div className="pointer-events-none fixed bottom-4 left-1/2 z-[2000] -translate-x-1/2 rounded-full bg-slate-900 px-3 py-1.5 text-xs text-white shadow-lg">
          <Zap size={12} className="mr-1 inline" /> Agents working…
        </div>
      )}
    </div>
  );
}
