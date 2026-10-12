"use client";
// Overview (/app). Converted from design/project/Main.dc.html and driven by the scenario store.
import { useState, type CSSProperties } from "react";
import { useScenarioFacts } from "@/lib/scenario";
import { LiveProgress } from "./overview/Progress";
import { FleetMap } from "./overview/FleetMap";
import { OpenTickets } from "./overview/Tickets";
import { Copilot } from "./overview/Copilot";

const segBtn: CSSProperties = {
  font: "inherit",
  height: "32px",
  padding: "0 12px",
  border: "0",
  borderLeft: "1px solid var(--line2)",
  background: "var(--panel)",
  color: "var(--ink2)",
  cursor: "pointer",
};

/** Shown only before the incident: tells the presenter what to do next. Dismissible, local state. */
function GuideCard({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div
      role="note"
      className="ham-in"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        background: "var(--infoBg)",
        border: "1px solid var(--infoLine)",
        borderRadius: "8px",
        padding: "10px 12px 10px 14px",
        color: "var(--info)",
      }}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        aria-hidden="true"
        style={{ flex: "none" }}
      >
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5M12 8v.5" strokeLinecap="round" />
      </svg>
      <span style={{ flex: "1", color: "var(--ink2)" }}>
        <b style={{ color: "var(--info)" }}>Try the scenario:</b> Jun is about to get a flat tire. Open the driver app and report it.
      </span>
      <a href="/driver" style={{ fontWeight: 600, textDecoration: "none", color: "var(--info)", whiteSpace: "nowrap" }}>
        Open driver app
      </a>
      <button
        onClick={onDismiss}
        aria-label="Dismiss"
        style={{
          width: "26px",
          height: "26px",
          flex: "none",
          border: "0",
          borderRadius: "6px",
          background: "transparent",
          color: "var(--mute)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

function Metrics() {
  const f = useScenarioFacts();
  const cell: CSSProperties = { padding: "14px 16px", borderRight: "1px solid var(--line)" };
  const label: CSSProperties = { color: "var(--mute)", fontWeight: 500 };
  const value: CSSProperties = { display: "flex", alignItems: "baseline", gap: "8px", marginTop: "6px" };
  const note: CSSProperties = {
    marginTop: "6px",
    fontSize: "12px",
    color: "var(--mute)",
    whiteSpace: "nowrap",
    minHeight: "26px",
    display: "flex",
    alignItems: "center",
  };

  let riskNote: React.ReactNode = null;
  if (f.ticketOpen)
    riskNote = (
      <a
        href="/app/approvals?t=HAM-417"
        style={{
          fontWeight: 600,
          textDecoration: "none",
          height: "26px",
          padding: "0 10px",
          borderRadius: "6px",
          background: "var(--brandInk)",
          color: "#fff",
          display: "flex",
          alignItems: "center",
        }}
      >
        Resolve
      </a>
    );
  else if (f.thinking) riskNote = "Dispatch agent is drafting a fix…";
  else if (f.phase === "rejected") riskNote = "Both customers got an apology";
  else if (f.moved) riskNote = "3 stops moved at 10:44";

  return (
    <section
      aria-label="Key metrics"
      style={{
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
      }}
    >
      <div style={cell}>
        <div style={label}>Delivered</div>
        <div style={value}>
          <span style={{ fontSize: "24px", fontWeight: 600 }}>{f.delivered}</span>
          <span style={{ color: "var(--mute)" }}>of {f.totalOrders}</span>
        </div>
        <div style={{ height: "4px", background: "#F2F4F7", borderRadius: "2px", marginTop: "10px" }}>
          <div
            style={{
              width: `${Math.round((f.delivered / f.totalOrders) * 100)}%`,
              height: "4px",
              background: "var(--brand)",
              borderRadius: "2px",
            }}
          />
        </div>
      </div>
      <div style={cell}>
        <div style={label}>On-time rate</div>
        <div style={value}>
          <span style={{ fontSize: "24px", fontWeight: 600 }}>100%</span>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--ok)" }}>+6 pts vs last Mon</span>
        </div>
        <svg width="120" height="22" viewBox="0 0 120 22" style={{ marginTop: "6px" }} aria-hidden="true">
          <polyline points="0,16 15,14 30,15 45,11 60,12 75,8 90,9 105,5 120,4" fill="none" stroke="#12B76A" strokeWidth="1.5" />
        </svg>
      </div>
      <div style={cell}>
        <div style={label}>At risk</div>
        <div style={value}>
          <span style={{ fontSize: "24px", fontWeight: 600, color: f.atRisk ? "var(--warn)" : undefined }}>{f.atRisk}</span>
          {f.atRisk ? (
            <span style={{ fontSize: "12px", color: "var(--mute)" }}>ETA past window</span>
          ) : (
            <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--ok)" }}>All windows on track</span>
          )}
        </div>
        {riskNote && <div style={note}>{riskNote}</div>}
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={label}>Failed deliveries</div>
        <div style={value}>
          <span style={{ fontSize: "24px", fontWeight: 600 }}>0</span>
          <span style={{ fontSize: "12px", fontWeight: 500, color: "var(--ok)" }}>1 prevented</span>
        </div>
      </div>
    </section>
  );
}

export default function MainBoard() {
  const f = useScenarioFacts();
  const [guideDismissed, setGuideDismissed] = useState(false);

  return (
    <>
      <main style={{ flex: "999 1 640px", minWidth: "0", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "12px" }}>
          <div style={{ flex: "1 1 300px" }}>
            <h1 style={{ margin: "0", fontSize: "20px", fontWeight: 600, letterSpacing: "-0.01em" }}>Overview</h1>
            <div style={{ color: "var(--mute)", marginTop: "2px" }}>Monday, 12 October · Metro Manila · updated {f.clock}</div>
          </div>
          <div
            role="group"
            aria-label="Range"
            style={{ display: "flex", border: "1px solid var(--line2)", borderRadius: "6px", overflow: "hidden" }}
          >
            <button
              aria-pressed="true"
              style={{ ...segBtn, borderLeft: "0", background: "var(--sub)", fontWeight: 600, color: "var(--ink)" }}
            >
              Today
            </button>
            <button aria-pressed="false" style={segBtn}>
              7 days
            </button>
            <button aria-pressed="false" style={segBtn}>
              30 days
            </button>
          </div>
          <button style={{ ...segBtn, border: "1px solid var(--line2)", borderRadius: "6px" }}>Export</button>
        </div>
        {f.phase === "before" && !guideDismissed && <GuideCard onDismiss={() => setGuideDismissed(true)} />}
        <Metrics />
        <LiveProgress />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          <FleetMap />
          <OpenTickets />
        </div>
      </main>
      <Copilot />
    </>
  );
}
