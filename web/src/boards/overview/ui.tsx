"use client";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { PEOPLE } from "@/lib/people";
import { AgentLink, OrderLink, PersonLink, TicketLink } from "@/components/Entity";

/** Minutes between two "HH:MM" clock strings (b - a). */
export function minutesBetween(a: string, b: string) {
  const m = (s: string) => {
    const [h, mm] = s.split(":").map(Number);
    return h * 60 + mm;
  };
  return m(b) - m(a);
}

/** Position of a time on the 08:00–14:00 progress axis, in percent. */
export function pct(t: string) {
  return (minutesBetween("08:00", t) / 360) * 100;
}

export function Sparkle({ size = 14, color = "var(--brand)" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      aria-hidden="true"
      style={{ flex: "none" }}
    >
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </svg>
  );
}

/** Three softly blinking dots: the scripted agent is "working". */
export function Dots() {
  const dot: CSSProperties = { width: "4px", height: "4px", borderRadius: "99px", background: "currentColor", display: "inline-block" };
  return (
    <span aria-hidden="true" style={{ display: "inline-flex", gap: "3px", marginLeft: "2px", verticalAlign: "middle" }}>
      <span style={{ ...dot, animation: "hamDots 1.2s infinite" }} />
      <span style={{ ...dot, animation: "hamDots 1.2s .2s infinite" }} />
      <span style={{ ...dot, animation: "hamDots 1.2s .4s infinite" }} />
    </span>
  );
}

/** AI-labelled "agent is working" line, used in the copilot and the tickets card. */
export function AgentWorking({ style }: { style?: CSSProperties }) {
  return (
    <div
      role="status"
      className="ham-in"
      style={{
        background: "var(--aiBg)",
        border: "1px solid var(--aiLine)",
        borderRadius: "8px",
        padding: "9px 11px",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "6px", color: "var(--brandInk)", fontWeight: 600, lineHeight: "1.4" }}>
        <span style={{ marginTop: "2px", display: "flex" }}>
          <Sparkle />
        </span>
        <span>
          {linkify("Dispatch agent is re-planning Jun’s 3 stops")}
          <Dots />
        </span>
      </div>
      <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "3px" }}>
        {linkify("Auto-generated from Jun’s report at 10:31 and live ETAs")}
      </div>
    </div>
  );
}

export const btnPrimary: CSSProperties = {
  font: "inherit",
  fontWeight: 600,
  height: "30px",
  padding: "0 12px",
  border: "0",
  borderRadius: "6px",
  background: "var(--brandInk)",
  color: "#fff",
  cursor: "pointer",
};

export const btnSecondary: CSSProperties = {
  font: "inherit",
  height: "30px",
  padding: "0 12px",
  border: "1px solid var(--line2)",
  borderRadius: "6px",
  background: "var(--panel)",
  color: "var(--ink2)",
  cursor: "pointer",
  display: "inline-flex",
  alignItems: "center",
  textDecoration: "none",
};

export function Tag({ tone, children }: { tone: "err" | "info" | "ok" | "neutral" | "warn"; children: ReactNode }) {
  const c =
    tone === "neutral"
      ? { color: "var(--ink2)", background: "#F2F4F7", border: "1px solid var(--line2)" }
      : { color: `var(--${tone})`, background: `var(--${tone}Bg)`, border: `1px solid var(--${tone}Line)` };
  return (
    <span style={{ fontSize: "11px", fontWeight: 500, borderRadius: "4px", padding: "0 5px", whiteSpace: "nowrap", ...c }}>{children}</span>
  );
}

/* ---------- names and IDs inside sentences ---------- */

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// Staff go by first name in sentences ("Jun", "Ana"); customers by full name.
const FIRST: Record<string, string> = {};
for (const p of PEOPLE) if (p.kind !== "customer") FIRST[p.name.split(" ")[0]] = p.name;
const FULL = PEOPLE.map((p) => p.name).sort((a, b) => b.length - a.length);
const AGENTS = ["Dispatch agent", "Intake agent", "Messages agent", "Proof agent"];
const TOKEN = new RegExp(
  [
    "HAM-\\d{3}",
    "#\\d{4}",
    "WA-\\d{4}",
    ...AGENTS.map(esc),
    ...FULL.map(esc),
    // A first name, but not "Maria’s Flowers" (the shop).
    `\\b(?:${Object.keys(FIRST).map(esc).join("|")})\\b(?!['’]s Flowers)`,
  ].join("|"),
  "g",
);

/**
 * Turns the ticket IDs, order IDs, agents and people in a sentence into links.
 * `agents: false` leaves agent names as text (on the Audit log, where an agent link would point at the same page).
 */
export function linkify(text: string, { agents = true }: { agents?: boolean } = {}): ReactNode {
  const out: ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(TOKEN)) {
    const t = m[0];
    const i = m.index ?? 0;
    let node: ReactNode = null;
    if (t.startsWith("HAM-")) node = <TicketLink id={t} />;
    else if (t.startsWith("#") || t.startsWith("WA-")) node = <OrderLink id={t} />;
    else if (AGENTS.includes(t)) node = agents ? <AgentLink name={t} /> : null;
    else if (FIRST[t]) node = <PersonLink name={FIRST[t]}>{t}</PersonLink>;
    else node = <PersonLink name={t} />;
    if (!node) continue;
    if (i > last) out.push(text.slice(last, i));
    out.push(<Fragment key={i}>{node}</Fragment>);
    last = i + t.length;
  }
  if (last === 0) return text;
  if (last < text.length) out.push(text.slice(last));
  return <>{out}</>;
}
