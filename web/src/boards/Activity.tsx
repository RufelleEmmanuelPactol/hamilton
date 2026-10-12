"use client";
// Converted from design/project/Activity.dc.html. Scenario events (scenario.ts) go above the seed rows;
// seed rows later than the scenario clock are hidden so the log never shows the future.
import { Fragment, useMemo, useState } from "react";
import { useScenarioFacts, scenarioEvents, type AuditEvent } from "@/lib/scenario";
import { check, HAM_417 } from "@/lib/policy";

type Outcome = "Ran alone" | "Asked you" | "Blocked by policy" | "Observed" | "Approved by Maria" | "Rejected by Maria";

interface Row {
  id: string;
  time: string;
  event: string;
  agent: string;
  outcome: Outcome;
  policy: string;
  ref: string;
  href: string;
  detail?: {
    input: string;
    inputSub?: string;
    decision: string;
    decisionSub?: string;
    effects: string;
    effectsSub?: string;
    undo?: boolean;
    link?: { label: string; href: string };
  };
}

const SEED: Row[] = [
  {
    id: "seed-418",
    time: "10:41",
    event: "Moved #1044 Ben Cruz to 15:00–17:00 and re-sequenced Ana",
    agent: "Messages",
    outcome: "Ran alone",
    policy: "Move a delivery to a later time today",
    ref: "HAM-418",
    href: "/app/messages",
    detail: {
      input: "Customer reply: “wala pa ako sa bahay, after 3pm pa po”",
      inputSub: "Read as: not home until after 15:00 · Semantic · 0.94",
      decision: "New window 15:00–17:00; Ana’s stops 2 and 3 swapped. No other window affected.",
      decisionSub: "Policy mode: Auto · condition met",
      effects: "Customer confirmed · Address book: “home after 3pm on weekdays”",
      effectsSub: "Cost ₱0.02 · 1.4 s",
      undo: true,
      link: { label: "Open conversation", href: "/app/messages" },
    },
  },
  {
    id: "seed-1046",
    time: "10:38",
    event: "Verified proof photo for #1046",
    agent: "Proof",
    outcome: "Ran alone",
    policy: "Verify proof photos",
    ref: "#1046",
    href: "/app/orders",
  },
  {
    id: "seed-416",
    time: "10:27",
    event: "Refund request from Paolo Lim escalated",
    agent: "Messages",
    outcome: "Blocked by policy",
    policy: "Refunds, credits and discounts",
    ref: "HAM-416",
    href: "/app/approvals",
  },
  {
    id: "seed-1041",
    time: "10:20",
    event: "Asked Jun to retake a blurry photo at #1041 · retake passed",
    agent: "Proof",
    outcome: "Ran alone",
    policy: "Ask the driver to retake a photo",
    ref: "#1041",
    href: "/app/orders",
  },
  {
    id: "seed-1042-note",
    time: "10:12",
    event: "Saved drop-off note for #1042: leave with the lobby concierge",
    agent: "Messages",
    outcome: "Ran alone",
    policy: "Answer customers\u2019 delivery questions",
    ref: "#1042",
    href: "/app/messages",
  },
  {
    id: "seed-414",
    time: "09:58",
    event: "Created order draft from WhatsApp message (82% parsed)",
    agent: "Intake",
    outcome: "Asked you",
    policy: "Turn WhatsApp and email requests into orders",
    ref: "HAM-414",
    href: "/app/approvals",
  },
  {
    id: "seed-plan",
    time: "07:52",
    event: "Published today’s plan · 12 stops across 4 drivers",
    agent: "Dispatch",
    outcome: "Approved by Maria",
    policy: "Send the morning route plan to drivers",
    ref: "Plan 12 Oct",
    href: "/app/dispatch",
  },
  {
    id: "seed-eta",
    time: "07:58",
    event: "Sent arrival windows to 12 customers on WhatsApp",
    agent: "Messages",
    outcome: "Ran alone",
    policy: "Customer ETA updates · Auto",
    ref: "Plan 12 Oct",
    href: "/app/dispatch",
  },
];

/** Actions today that aren't in the table above (the table shows the interesting ones). */
const OFF_TABLE = { total: 48, ranAlone: 47, askedYou: 3, blocked: 0 };

const OUTCOME_OF: Record<AuditEvent["outcome"], Outcome> = {
  Auto: "Ran alone",
  Sent: "Ran alone",
  Held: "Asked you",
  Logged: "Observed",
  Approved: "Approved by Maria",
  Rejected: "Rejected by Maria",
};
const AGENT_OF: Record<string, string> = {
  "Dispatch agent": "Dispatch",
  "Assurance agent": "Messages",
  "Driver app": "Driver app",
  "Maria Santos": "Maria",
};

function hrefFor(ref: string) {
  if (ref.startsWith("HAM-")) return "/app/approvals";
  if (ref.startsWith("#")) return "/app/orders";
  if (ref === "Jun Reyes") return "/app/drivers";
  return "/app/audit";
}

function toRow(e: AuditEvent, i: number): Row {
  const isProposal = e.ref === "HAM-417" && e.outcome === "Held";
  return {
    id: `sc-${i}-${e.time}-${e.ref}`,
    time: e.time,
    event: e.event,
    agent: AGENT_OF[e.agent] ?? e.agent,
    outcome: OUTCOME_OF[e.outcome],
    policy: e.policy,
    ref: e.ref,
    href: hrefFor(e.ref),
    detail: e.detail && {
      input: e.detail.input,
      inputSub: isProposal ? "From Jun’s report in the driver app · 10:31" : undefined,
      decision: e.detail.decision,
      decisionSub: isProposal ? `Policy mode: Ask me · ${check(HAM_417).reason}` : undefined,
      effects: e.detail.effects,
      effectsSub: isProposal ? "Cost ₱0.04 · 2.4 s" : undefined,
      link: isProposal ? { label: "Open ticket", href: "/app/approvals" } : undefined,
    },
  };
}

const PILL: Record<Outcome, React.CSSProperties> = {
  "Ran alone": { color: "var(--ok)", background: "var(--okBg)", border: "1px solid var(--okLine)" },
  "Asked you": { color: "var(--warn)", background: "var(--warnBg)", border: "1px solid var(--warnLine)" },
  "Blocked by policy": { color: "var(--err)", background: "var(--errBg)", border: "1px solid var(--errLine)" },
  Observed: { color: "var(--ink2)", background: "#F2F4F7", border: "1px solid var(--line2)" },
  "Approved by Maria": { color: "var(--info)", background: "var(--infoBg)", border: "1px solid var(--infoLine)" },
  "Rejected by Maria": { color: "var(--ink2)", background: "#F2F4F7", border: "1px solid var(--line2)" },
};

const td: React.CSSProperties = { padding: "9px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top" };
const th: React.CSSProperties = { padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" };
const filterBtn: React.CSSProperties = {
  font: "inherit",
  fontSize: "12px",
  height: "30px",
  padding: "0 10px",
  border: "1px solid var(--line2)",
  borderRadius: "6px",
  background: "var(--panel)",
  color: "var(--ink2)",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  cursor: "pointer",
  whiteSpace: "nowrap",
};
const smallBtn: React.CSSProperties = {
  font: "inherit",
  fontSize: "12px",
  height: "28px",
  padding: "0 10px",
  border: "1px solid var(--line2)",
  borderRadius: "6px",
  background: "var(--panel)",
  color: "var(--ink2)",
  cursor: "pointer",
};
const label: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: "600",
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--mute)",
};
const Chevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

function Menu({
  name,
  value,
  options,
  open,
  onToggle,
  onPick,
}: {
  name: string;
  value: string;
  options: string[];
  open: boolean;
  onToggle: () => void;
  onPick: (v: string) => void;
}) {
  return (
    <div style={{ position: "relative" }}>
      <button style={filterBtn} aria-haspopup="listbox" aria-expanded={open} onClick={onToggle}>
        {name}: {value}
        <Chevron />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label={name}
          style={{
            position: "absolute",
            top: "34px",
            left: "0",
            zIndex: 20,
            minWidth: "100%",
            margin: "0",
            padding: "4px",
            listStyle: "none",
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: "8px",
            boxShadow: "0 8px 24px rgba(16,24,40,0.12)",
          }}
        >
          {["All", ...options].map((o) => (
            <li key={o}>
              <button
                role="option"
                aria-selected={o === value}
                onClick={() => onPick(o)}
                style={{
                  font: "inherit",
                  fontSize: "12px",
                  width: "100%",
                  textAlign: "left",
                  padding: "6px 10px",
                  border: "0",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  background: o === value ? "var(--brandTint)" : "transparent",
                  color: o === value ? "var(--brandInk)" : "var(--ink2)",
                }}
              >
                {o}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ActivityBoard() {
  const f = useScenarioFacts();
  const [query, setQuery] = useState("");
  const [agent, setAgent] = useState("All");
  const [outcome, setOutcome] = useState("All");
  const [menu, setMenu] = useState<"agent" | "outcome" | null>(null);
  const [expanded, setExpanded] = useState<string | null | undefined>(undefined);
  const [wrong, setWrong] = useState<Record<string, boolean>>({});

  const rows = useMemo(() => {
    const scen = scenarioEvents(f.phase, f.notifyCustomers).map(toRow);
    const seed = SEED.filter((r) => r.time <= f.clock);
    // Newest first; scenario rows keep their own order for equal times.
    return [...scen, ...seed]
      .map((r, i) => ({ r, i }))
      .sort((a, b) => b.r.time.localeCompare(a.r.time) || a.i - b.i)
      .map((x) => x.r);
  }, [f.phase, f.notifyCustomers, f.clock]);

  const stats = useMemo(() => {
    const n = (o: Outcome) => rows.filter((r) => r.outcome === o).length;
    return {
      total: OFF_TABLE.total + rows.length,
      ranAlone: OFF_TABLE.ranAlone + n("Ran alone"),
      askedYou: OFF_TABLE.askedYou + n("Asked you"),
      blocked: OFF_TABLE.blocked + n("Blocked by policy"),
    };
  }, [rows]);

  const agents = Array.from(new Set(rows.map((r) => r.agent)));
  const outcomes = Array.from(new Set(rows.map((r) => r.outcome)));
  const q = query.trim().toLowerCase();
  const shown = rows.filter(
    (r) =>
      (agent === "All" || r.agent === agent) &&
      (outcome === "All" || r.outcome === outcome) &&
      (!q || `${r.event} ${r.ref} ${r.policy} ${r.agent}`.toLowerCase().includes(q)),
  );
  // Open the scenario's own explanation first (HAM-417), otherwise the newest row that has one.
  const defaultOpen = (rows.find((r) => r.detail && r.id.startsWith("sc-")) ?? rows.find((r) => r.detail))?.id ?? null;
  const openId = expanded === undefined ? defaultOpen : expanded;

  const exportCsv = () => {
    const esc = (s: string) => `"${s.replace(/"/g, '""')}"`;
    const csv = [
      "Time,Event,Agent,Outcome,Policy,Ref",
      ...shown.map((r) => [r.time, r.event, r.agent, r.outcome, r.policy, r.ref].map(esc).join(",")),
    ].join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit-log-12-oct.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const stat = (k: string, v: string, last = false) => (
    <div style={{ padding: "12px 16px", borderRight: last ? undefined : "1px solid var(--line)" }}>
      <div style={{ color: "var(--mute)", fontWeight: "500" }}>{k}</div>
      <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "4px" }}>{v}</div>
    </div>
  );

  return (
    <main
      style={{
        flex: "999 1 640px",
        minWidth: "0",
        padding: "20px 24px",
        display: "flex",
        flexDirection: "column",
        gap: "14px",
      }}
    >
      {menu && <div aria-hidden="true" onClick={() => setMenu(null)} style={{ position: "fixed", inset: 0, zIndex: 10 }} />}
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
        <div style={{ flex: "1 1 320px" }}>
          <h1 style={{ margin: "0", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.01em" }}>Audit log</h1>
          <div style={{ color: "var(--mute)", marginTop: "2px" }}>
            Every action an agent took or proposed, the policy it ran under, and why.
          </div>
        </div>
        <button
          onClick={exportCsv}
          style={{
            font: "inherit",
            height: "34px",
            padding: "0 12px",
            border: "1px solid var(--line2)",
            borderRadius: "6px",
            background: "var(--panel)",
            color: "var(--ink2)",
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
      </div>
      <section
        aria-label="Today"
        style={{
          background: "var(--panel)",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
        }}
      >
        {stat("Actions today", String(stats.total))}
        {stat("Ran alone", String(stats.ranAlone))}
        {stat("Asked you", String(stats.askedYou))}
        {stat("Blocked by policy", String(stats.blocked))}
        {stat("Marked wrong (30d)", "3 of 1,412")}
        {stat("AI cost today", f.phase === "before" ? "₱11.32" : "₱11.40", true)}
      </section>
      <section
        aria-label="Events"
        style={{
          background: "var(--panel)",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          overflow: "visible",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "8px",
            padding: "10px 14px",
            borderBottom: "1px solid var(--line)",
            position: "relative",
            zIndex: 11,
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              width: "260px",
              height: "30px",
              border: "1px solid var(--line2)",
              borderRadius: "6px",
              padding: "0 10px",
              color: "var(--mute)",
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search events, orders, tickets"
              aria-label="Search events, orders, tickets"
              style={{
                font: "inherit",
                flex: "1",
                minWidth: "0",
                border: "0",
                outline: "none",
                background: "transparent",
                color: "var(--ink)",
              }}
            />
          </label>
          <Menu
            name="Agent"
            value={agent}
            options={agents}
            open={menu === "agent"}
            onToggle={() => setMenu(menu === "agent" ? null : "agent")}
            onPick={(v) => {
              setAgent(v);
              setMenu(null);
            }}
          />
          <Menu
            name="Outcome"
            value={outcome}
            options={outcomes}
            open={menu === "outcome"}
            onToggle={() => setMenu(menu === "outcome" ? null : "outcome")}
            onPick={(v) => {
              setOutcome(v);
              setMenu(null);
            }}
          />
          <button style={filterBtn}>
            Today
            <Chevron />
          </button>
          <span style={{ flex: "1" }}></span>
          <span style={{ color: "var(--mute)", fontSize: "12px", whiteSpace: "nowrap" }}>
            {shown.length} of {stats.total}
          </span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", minWidth: "960px", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--sub)", textAlign: "left", color: "var(--mute)", fontSize: "12px" }}>
                <th style={{ ...th, paddingLeft: "14px" }}>Time</th>
                <th style={th}>Event</th>
                <th style={th}>Agent</th>
                <th style={th}>Outcome</th>
                <th style={th}>Policy</th>
                <th style={{ ...th, paddingRight: "14px" }}>Ref</th>
              </tr>
            </thead>
            <tbody>
              {shown.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ ...td, padding: "20px 14px", color: "var(--mute)", textAlign: "center" }}>
                    No events match these filters.
                  </td>
                </tr>
              )}
              {shown.map((r) => {
                const isOpen = openId === r.id && !!r.detail;
                const isNew = r.id.startsWith("sc-");
                return (
                  <Fragment key={r.id}>
                    <tr
                      className={isNew ? "ham-in" : undefined}
                      onClick={r.detail ? () => setExpanded(isOpen ? null : r.id) : undefined}
                      style={{ background: isOpen ? "var(--brandTint)" : undefined, cursor: r.detail ? "pointer" : undefined }}
                    >
                      <td
                        style={{
                          ...td,
                          paddingLeft: "14px",
                          fontFamily: "'IBM Plex Mono', monospace",
                          color: "var(--mute)",
                          width: "56px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {r.time}
                      </td>
                      <td style={{ ...td, fontWeight: "500" }}>
                        {r.detail ? (
                          <button
                            aria-expanded={isOpen}
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpanded(isOpen ? null : r.id);
                            }}
                            style={{
                              font: "inherit",
                              fontWeight: "500",
                              color: "inherit",
                              background: "none",
                              border: "0",
                              padding: "0",
                              textAlign: "left",
                              cursor: "pointer",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            {r.event}
                            <span
                              style={{ display: "inline-flex", color: "var(--mute)", transform: isOpen ? "rotate(180deg)" : undefined }}
                            >
                              <Chevron />
                            </span>
                          </button>
                        ) : (
                          r.event
                        )}
                      </td>
                      <td style={{ ...td, color: "var(--ink2)", whiteSpace: "nowrap" }}>{r.agent}</td>
                      <td style={td}>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            borderRadius: "4px",
                            padding: "0 6px",
                            whiteSpace: "nowrap",
                            ...PILL[r.outcome],
                          }}
                        >
                          {r.outcome}
                        </span>
                      </td>
                      <td style={{ ...td, color: "var(--ink2)" }}>{r.policy}</td>
                      <td
                        style={{
                          ...td,
                          paddingRight: "14px",
                          fontFamily: "'IBM Plex Mono', monospace",
                          fontSize: "12px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        <a href={r.href} onClick={(e) => e.stopPropagation()} style={{ color: "var(--brandInk)", textDecoration: "none" }}>
                          {r.ref}
                        </a>
                      </td>
                    </tr>
                    {isOpen && r.detail && (
                      <tr style={{ background: "#FFFAFC" }}>
                        <td style={{ borderBottom: "1px solid var(--line)" }}></td>
                        <td colSpan={5} style={{ padding: "4px 14px 14px 10px", borderBottom: "1px solid var(--line)" }}>
                          <div
                            className="ham-in"
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                              gap: "12px",
                              border: "1px solid var(--line)",
                              borderRadius: "6px",
                              background: "var(--panel)",
                              padding: "12px 14px",
                            }}
                          >
                            {(
                              [
                                ["Input", r.detail.input, r.detail.inputSub],
                                ["Decision", r.detail.decision, r.detail.decisionSub],
                                ["Side effects", r.detail.effects, r.detail.effectsSub],
                              ] as const
                            ).map(([k, main, sub]) => (
                              <div key={k}>
                                <div style={label}>{k}</div>
                                <div style={{ marginTop: "4px", color: "var(--ink2)" }}>{main}</div>
                                {sub && <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>{sub}</div>}
                              </div>
                            ))}
                          </div>
                          <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                            {r.detail.undo && <button style={smallBtn}>Undo</button>}
                            <button
                              style={{ ...smallBtn, color: wrong[r.id] ? "var(--err)" : "var(--ink2)" }}
                              aria-pressed={!!wrong[r.id]}
                              onClick={() => setWrong((w) => ({ ...w, [r.id]: !w[r.id] }))}
                            >
                              {wrong[r.id] ? "Marked as wrong" : "Mark as wrong"}
                            </button>
                            {r.detail.link && (
                              <a
                                href={r.detail.link.href}
                                style={{
                                  fontSize: "12px",
                                  fontWeight: "500",
                                  textDecoration: "none",
                                  display: "flex",
                                  alignItems: "center",
                                  padding: "0 6px",
                                }}
                              >
                                {r.detail.link.label}
                              </a>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
