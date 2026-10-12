"use client";
import type { CSSProperties, ReactNode } from "react";

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
          Dispatch agent is re-planning Jun&#39;s 3 stops
          <Dots />
        </span>
      </div>
      <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "3px" }}>
        Auto-generated from Jun&#39;s report at 10:31 and live ETAs
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
