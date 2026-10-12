"use client";
import clsx from "clsx";
import type { ReactNode } from "react";
import type { AgentName, OrderStatus } from "@/lib/types";

export function Logo({ size = 22, light = false }: { size?: number; light?: boolean }) {
  // a Hamiltonian path through 5 nodes
  const c = light ? "#fff" : "#4f46e5";
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path d="M6 24 L10 8 L22 6 L26 18 L14 26" fill="none" stroke={c} strokeWidth="2.4" strokeLinejoin="round" strokeLinecap="round" />
      {[[6, 24], [10, 8], [22, 6], [26, 18], [14, 26]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i === 0 || i === 4 ? 3.4 : 2.6} fill={i === 0 ? c : light ? "#4f46e5" : "#fff"} stroke={c} strokeWidth="2" />
      ))}
    </svg>
  );
}

export function Card({ children, className, title, action }: { children: ReactNode; className?: string; title?: ReactNode; action?: ReactNode }) {
  return (
    <div className={clsx("rounded-xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]", className)}>
      {title && (
        <div className="flex items-center justify-between gap-2 border-b border-slate-100 px-4 py-3">
          <div className="text-[13px] font-semibold text-slate-800">{title}</div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
}

type BtnVariant = "primary" | "secondary" | "ghost" | "danger" | "success";
export function Button({
  children,
  onClick,
  variant = "secondary",
  size = "md",
  className,
  disabled,
  title,
  type = "button",
}: {
  children: ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  size?: "sm" | "md" | "lg";
  className?: string;
  disabled?: boolean;
  title?: string;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        "inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition disabled:cursor-not-allowed disabled:opacity-50",
        size === "sm" && "h-7 px-2.5 text-xs",
        size === "md" && "h-9 px-3.5 text-[13px]",
        size === "lg" && "h-12 px-5 text-[15px]",
        variant === "primary" && "bg-indigo-600 text-white hover:bg-indigo-700",
        variant === "secondary" && "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
        variant === "ghost" && "text-slate-600 hover:bg-slate-100",
        variant === "danger" && "border border-rose-200 bg-white text-rose-600 hover:bg-rose-50",
        variant === "success" && "bg-emerald-600 text-white hover:bg-emerald-700",
        className
      )}
    >
      {children}
    </button>
  );
}

export function Badge({ children, tone = "slate", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return <span className={clsx("inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[11px] font-medium", TONES[tone], className)}>{children}</span>;
}

type Tone = "slate" | "indigo" | "emerald" | "amber" | "rose" | "sky" | "violet";
const TONES: Record<Tone, string> = {
  slate: "bg-slate-100 text-slate-700",
  indigo: "bg-indigo-50 text-indigo-700",
  emerald: "bg-emerald-50 text-emerald-700",
  amber: "bg-amber-50 text-amber-800",
  rose: "bg-rose-50 text-rose-700",
  sky: "bg-sky-50 text-sky-700",
  violet: "bg-violet-50 text-violet-700",
};

export const STATUS_META: Record<OrderStatus, { label: string; tone: Tone }> = {
  inbox: { label: "New message", tone: "violet" },
  review: { label: "Needs review", tone: "amber" },
  unassigned: { label: "Unassigned", tone: "slate" },
  assigned: { label: "Scheduled", tone: "sky" },
  heading: { label: "On the way", tone: "indigo" },
  arrived: { label: "Arrived", tone: "indigo" },
  delivered: { label: "Delivered", tone: "emerald" },
  failed: { label: "Failed", tone: "rose" },
  on_hold: { label: "On hold", tone: "amber" },
  tomorrow: { label: "Moved to tomorrow", tone: "slate" },
};

export function StatusBadge({ status }: { status: OrderStatus }) {
  const m = STATUS_META[status];
  return <Badge tone={m.tone}>{m.label}</Badge>;
}

export const AGENT_META: Record<AgentName, { label: string; tone: Tone; dot: string }> = {
  dispatch: { label: "Dispatch agent", tone: "indigo", dot: "bg-indigo-500" },
  assurance: { label: "Assurance agent", tone: "emerald", dot: "bg-emerald-500" },
  proof: { label: "Proof agent", tone: "amber", dot: "bg-amber-500" },
  ops: { label: "Ops chat", tone: "violet", dot: "bg-violet-500" },
  system: { label: "Hamilton", tone: "slate", dot: "bg-slate-400" },
};

export function AgentTag({ agent }: { agent: AgentName }) {
  const m = AGENT_META[agent];
  return (
    <Badge tone={m.tone}>
      <span className={clsx("h-1.5 w-1.5 rounded-full", m.dot)} />
      {m.label}
    </Badge>
  );
}

export function Avatar({ initials, color, size = 32, ring }: { initials: string; color: string; size?: number; ring?: boolean }) {
  return (
    <div
      className={clsx("flex shrink-0 items-center justify-center rounded-full font-semibold text-white", ring && "ring-2 ring-white")}
      style={{ background: color, width: size, height: size, fontSize: size * 0.36 }}
    >
      {initials}
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string; tone?: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 bg-slate-50 p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={clsx(
            "h-7 rounded-md px-3 text-xs font-medium transition",
            value === o.value ? clsx("bg-white shadow-sm", o.tone ?? "text-slate-900") : "text-slate-500 hover:text-slate-800"
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function Meter({ value, color = "bg-indigo-500" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={clsx("h-full rounded-full", color)} style={{ width: `${Math.round(value * 100)}%` }} />
    </div>
  );
}

export function Empty({ children }: { children: ReactNode }) {
  return <div className="px-4 py-10 text-center text-[13px] text-slate-400">{children}</div>;
}

export function Thinking({ label }: { label: string }) {
  return (
    <div className="thinking flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium text-indigo-700">
      <span className="relative flex h-2 w-2">
        <span className="pulse-ring absolute inline-flex h-full w-full rounded-full bg-indigo-400" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-600" />
      </span>
      {label}
    </div>
  );
}
