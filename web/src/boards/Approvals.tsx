"use client";
// Converted from design/project/Approvals.dc.html, wired to the scenario store.
import { useState, type CSSProperties, type ReactNode } from "react";
import { useScenario, type Estimate } from "@/lib/store";
import { useScenarioFacts, scenarioEvents } from "@/lib/scenario";
import { check, HAM_417 } from "@/lib/policy";

/* ---------- small helpers ---------- */

const MONO = "'IBM Plex Mono', monospace";
const toMin = (t: string) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};
const fmt = (m: number) => `${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`;
const age = (created: string, clock: string) => `${Math.max(0, toMin(clock) - toMin(created))}m`;

type Tone = "err" | "warn" | "ok" | "info" | "neutral";
const toneStyle = (t: Tone): CSSProperties =>
  t === "neutral"
    ? { color: "var(--ink2)", background: "#F2F4F7", border: "1px solid var(--line2)" }
    : { color: `var(--${t})`, background: `var(--${t}Bg)`, border: `1px solid var(--${t}Line)` };

function Tag({ tone, children, size = "row" }: { tone: Tone; children: ReactNode; size?: "row" | "cell" }) {
  return (
    <span
      style={{
        ...toneStyle(tone),
        fontSize: size === "row" ? "11px" : "12px",
        fontWeight: "600",
        borderRadius: "4px",
        padding: size === "row" ? "0 6px" : "1px 8px",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

const th: CSSProperties = {
  padding: "8px 12px",
  fontWeight: "500",
  fontSize: "12px",
  color: "var(--mute)",
  textAlign: "left",
  background: "var(--sub)",
  whiteSpace: "nowrap",
};
const td: CSSProperties = { padding: "10px 12px", borderTop: "1px solid var(--line)" };
const tdMono: CSSProperties = { ...td, fontFamily: MONO, whiteSpace: "nowrap" };

const btn: CSSProperties = {
  font: "inherit",
  height: "34px",
  padding: "0 12px",
  border: "1px solid var(--line2)",
  borderRadius: "6px",
  background: "var(--panel)",
  color: "var(--ink2)",
  cursor: "pointer",
};
const primary: CSSProperties = {
  font: "inherit",
  height: "34px",
  padding: "0 16px",
  border: "0",
  borderRadius: "6px",
  background: "var(--brandInk)",
  color: "#fff",
  fontWeight: "600",
  cursor: "pointer",
};
const bar: CSSProperties = {
  marginTop: "auto",
  padding: "12px 18px",
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  alignItems: "center",
  background: "var(--sub)",
  borderRadius: "0 0 8px 8px",
};
const section: CSSProperties = { padding: "14px 18px", borderBottom: "1px solid var(--line)" };

function Sparkle({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="#E91E63" aria-hidden="true" style={{ flex: "none" }}>
      <path d="M12 2l2.1 6.3L20.5 10l-6.4 1.9L12 18l-2.1-6.1L3.5 10l6.4-1.7z" />
      <path d="M19 15l.9 2.5 2.6.9-2.6.9L19 22l-.9-2.7-2.6-.9 2.6-.9z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "none" }}>
      <circle cx="12" cy="12" r="10" fill="#12B76A" />
      <path d="M7.5 12.5l3 3 6-7" fill="none" stroke="#fff" strokeWidth="2.2" />
    </svg>
  );
}

/** Result bar shown in place of the action bar once a decision is made. */
function DecidedBar({ tone, children }: { tone: "ok" | "neutral"; children: ReactNode }) {
  return (
    <div
      role="status"
      style={{
        ...bar,
        background: tone === "ok" ? "var(--okBg)" : "var(--sub)",
        borderTop: `1px solid ${tone === "ok" ? "var(--okLine)" : "var(--line)"}`,
        color: "var(--ink)",
      }}
    >
      {tone === "ok" ? (
        <CheckIcon />
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" style={{ flex: "none" }}>
          <circle cx="12" cy="12" r="10" fill="#667085" />
          <path d="M8 8l8 8M16 8l-8 8" stroke="#fff" strokeWidth="2.2" />
        </svg>
      )}
      {children}
    </div>
  );
}

/* ---------- the queue ---------- */

type TicketId = "HAM-417" | "HAM-414" | "HAM-416";
type TabId = "pending" | "escalated" | "auto" | "decided";

const TICKETS: Record<TicketId, { tag: [Tone, string]; agent: string; created: string; title: string; sub: string }> = {
  "HAM-417": {
    tag: ["err", "High"],
    agent: "Dispatch agent",
    created: "10:33",
    title: "Reassign 3 stops from Jun Reyes",
    sub: "Incident: flat tire · 2 windows at risk",
  },
  "HAM-414": {
    tag: ["warn", "Medium"],
    agent: "Dispatch agent",
    created: "09:58",
    title: "Create order WA-0912 from WhatsApp",
    sub: "82% confidence · below 95% policy threshold",
  },
  "HAM-416": {
    tag: ["neutral", "Escalated"],
    agent: "Assurance agent",
    created: "10:27",
    title: "Refund request · Paolo Lim #1045",
    sub: "Blocked by policy: refunds are never automated",
  },
};

const rowBase: CSSProperties = {
  display: "block",
  width: "100%",
  textAlign: "left",
  font: "inherit",
  border: "0",
  borderBottom: "1px solid var(--line)",
  background: "none",
  textDecoration: "none",
  color: "inherit",
  padding: "12px 14px",
  cursor: "pointer",
};
const rowSelected: CSSProperties = { background: "var(--brandTint)", boxShadow: "inset 3px 0 0 var(--brandInk)" };

function QueueRow(p: {
  tag: ReactNode;
  who: string;
  when: string;
  title: string;
  sub: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  href?: string;
}) {
  const inner = (
    <>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        {p.tag}
        <span style={{ fontSize: "12px", color: "var(--mute)", flex: "1", whiteSpace: "nowrap" }}>{p.who}</span>
        <span style={{ fontSize: "12px", color: "var(--mute)", whiteSpace: "nowrap" }}>{p.when}</span>
      </div>
      <div style={{ fontWeight: "600", marginTop: "6px" }}>{p.title}</div>
      <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "2px" }}>{p.sub}</div>
    </>
  );
  if (p.href)
    return (
      <a href={p.href} style={rowBase}>
        {inner}
      </a>
    );
  return (
    <button
      type="button"
      onClick={p.onClick}
      aria-current={p.selected ? "true" : undefined}
      style={{ ...rowBase, ...(p.selected ? rowSelected : {}) }}
    >
      {inner}
    </button>
  );
}

function ThinkingRow() {
  return (
    <div role="status" style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)", background: "#FFF7FA" }}>
      <style>{`@keyframes hamDot{0%,80%,100%{opacity:.2}40%{opacity:1}}`}</style>
      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
        <Sparkle size={13} />
        <span style={{ fontSize: "12px", color: "var(--brandInk)", fontWeight: "500", flex: "1" }}>Auto-generated · working</span>
        <span style={{ fontSize: "12px", color: "var(--mute)" }}>now</span>
      </div>
      <div style={{ fontWeight: "600", marginTop: "6px" }}>
        Dispatch agent is re-planning Jun&#39;s stops
        {[0, 1, 2].map((i) => (
          <span key={i} style={{ animation: `hamDot 1.2s ${i * 0.2}s infinite`, color: "var(--brandInk)" }}>
            .
          </span>
        ))}
      </div>
      <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "2px" }}>Checking who can take his 3 stops</div>
    </div>
  );
}

/* ---------- HAM-417 ---------- */

const JUN_STOPS = [
  { id: "#1042", name: "Mark Tan", area: "BGC", eta: "13:40", due: "13:00", to: "Ana", newEta: "12:15" },
  { id: "#1050", name: "Nicole Ramos", area: "BGC", eta: "14:05", due: "15:00", to: "Ana", newEta: "12:40" },
  { id: "#1049", name: "Sam Ocampo", area: "Makati", eta: "13:55", due: "13:00", to: "Rico", newEta: "11:05" },
];

/** Minutes added to the "about 1 hour" plan (Jun back at 11:30) for the earliest and latest return. */
const RANGE: Record<Estimate, [number, number]> = { hour: [0, 30], under30: [-30, 0], unsure: [-10, 10] };

function UncertaintyNote({ estimate, back }: { estimate: Estimate; back: [string, string] }) {
  const t = (s: string) => <span style={{ fontFamily: MONO }}>{s}</span>;
  const tail = <> If Jun taps &#34;I&#39;m back on the road&#34; sooner, these times update.</>;
  if (estimate === "under30")
    return (
      <div>
        <b style={{ color: "var(--ink)" }}>Jun said under 30 minutes, but his last 2 flats took 50 and 70 min.</b> Times below assume he is
        back between {t(back[0])} and {t(back[1])}. Even if he is back by {t(back[0])}, #1042 and #1049 are still late.{tail}
      </div>
    );
  if (estimate === "unsure")
    return (
      <div>
        <b style={{ color: "var(--ink)" }}>Jun wasn&#39;t sure how long the repair will take.</b> We used <b>his last 2 flats</b> (50 and 70
        min), so times below assume he is back between {t(back[0])} and {t(back[1])}. Even in the best case, #1042 and #1049 are still late.
        {tail}
      </div>
    );
  return (
    <div>
      <b style={{ color: "var(--ink)" }}>We don&#39;t know exactly when the tire will be fixed.</b> Times below assume Jun is back between{" "}
      {t(back[0])} and {t(back[1])}, based on <b>his report</b> (&#34;about 1 hour&#34;) and <b>his last 2 flats</b> (50 and 70 min). Even
      in the best case (back by 11:00), #1042 and #1049 are still late.{tail}
    </div>
  );
}

function Toggle({ value, onChange }: { value: "before" | "after"; onChange: (v: "before" | "after") => void }) {
  const seg = (on: boolean): CSSProperties => ({
    font: "inherit",
    fontSize: "13px",
    fontWeight: on ? "600" : undefined,
    height: "32px",
    padding: "0 14px",
    border: "0",
    background: on ? "var(--panel)" : "none",
    color: on ? "var(--ink)" : "var(--ink2)",
    borderRadius: "5px",
    boxShadow: on ? "0 1px 2px rgba(16,24,40,.12)" : undefined,
    cursor: "pointer",
    whiteSpace: "nowrap",
  });
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
      <div
        role="group"
        aria-label="Compare"
        style={{
          display: "inline-flex",
          gap: "2px",
          padding: "2px",
          background: "#F2F4F7",
          border: "1px solid var(--line)",
          borderRadius: "7px",
        }}
      >
        <button type="button" onClick={() => onChange("before")} aria-pressed={value === "before"} style={seg(value === "before")}>
          If you do nothing
        </button>
        <button type="button" onClick={() => onChange("after")} aria-pressed={value === "after"} style={seg(value === "after")}>
          If you approve
        </button>
      </div>
    </div>
  );
}

function Ham417Detail({
  compare,
  setCompare,
  onApprove,
  onReject,
}: {
  compare: "before" | "after";
  setCompare: (v: "before" | "after") => void;
  onApprove: () => void;
  onReject: () => void;
}) {
  const f = useScenarioFacts();
  const setNotify = useScenario((s) => s.setNotifyCustomers);
  const estimate: Estimate = f.report?.estimate ?? "hour";
  const verdict = check(HAM_417);
  const [lo, hi] = RANGE[estimate];
  const back: [string, string] = [fmt(toMin("11:30") + lo), fmt(toMin("11:30") + hi)];
  const notify = f.notifyCustomers;
  const decided = f.phase === "approved" || f.phase === "rejected";
  const estimateText =
    estimate === "under30"
      ? "He estimates under 30 minutes to get it fixed."
      : estimate === "unsure"
        ? "He isn't sure how long the repair will take."
        : "He estimates about an hour to get it fixed.";

  return (
    <>
      <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", color: "var(--mute)", fontSize: "12px" }}>
          <span style={{ fontFamily: MONO }}>HAM-417</span>
          <span>·</span>
          <span>Created 10:33 by Dispatch agent</span>
          <span>·</span>
          <span>
            Policy: {verdict.policy.label}. {verdict.reason}
          </span>
        </div>
        <h2 style={{ margin: "8px 0 0", fontSize: "18px", fontWeight: "600" }}>Reassign 3 stops from Jun Reyes</h2>
        <p style={{ margin: "6px 0 0", color: "var(--ink2)", lineHeight: "1.55" }}>
          Jun reported a flat tire at 10:31 on EDSA near Guadalupe. {estimateText} That would make 2 of his remaining deliveries late.
        </p>
      </div>
      <div style={section}>
        <div style={{ fontWeight: "600", marginBottom: "10px" }}>What happens to Jun&#39;s 3 remaining deliveries</div>
        <Toggle value={compare} onChange={setCompare} />
        {compare === "before" ? (
          <>
            <div style={{ fontSize: "15px", fontWeight: "600", marginBottom: "10px" }}>
              Jun delivers these 3 once he&#39;s back on the road. <span style={{ color: "var(--err)" }}>2 will be late.</span>
            </div>
            <div
              style={{
                display: "flex",
                gap: "10px",
                alignItems: "flex-start",
                border: "1px solid var(--line)",
                background: "var(--sub)",
                borderRadius: "6px",
                padding: "10px 12px",
                marginBottom: "10px",
                fontSize: "12px",
                color: "var(--ink2)",
                lineHeight: "1.5",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ flex: "none", marginTop: "2px", color: "var(--mute)" }}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4l3 2" />
              </svg>
              <UncertaintyNote estimate={estimate} back={back} />
            </div>
            <div style={{ border: "1px solid var(--line)", borderRadius: "6px", overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "520px", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={th}>Delivery</th>
                    <th style={th}>Driver</th>
                    <th style={th}>Arrives</th>
                    <th style={th}>Must arrive by</th>
                    <th style={th}>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {JUN_STOPS.map((s) => {
                    const a = toMin(s.eta) + lo;
                    const b = toMin(s.eta) + hi;
                    const due = toMin(s.due);
                    return (
                      <tr key={s.id}>
                        <td style={td}>
                          <span style={{ fontFamily: MONO, fontWeight: "600" }}>{s.id}</span> {s.name}
                          <div style={{ fontSize: "12px", color: "var(--mute)" }}>{s.area}</div>
                        </td>
                        <td style={td}>Jun</td>
                        <td style={tdMono}>
                          {fmt(a)}–{fmt(b)}
                        </td>
                        <td style={{ ...tdMono, color: "var(--mute)" }}>{s.due}</td>
                        <td style={td}>
                          {a > due ? (
                            <Tag tone="err" size="cell">
                              {a - due}–{b - due} min late
                            </Tag>
                          ) : b > due ? (
                            <Tag tone="warn" size="cell">
                              Up to {b - due} min late
                            </Tag>
                          ) : (
                            <Tag tone="ok" size="cell">
                              On time
                            </Tag>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "8px" }}>
              No extra driving ·{" "}
              {notify ? "customers #1042 and #1049 get a late-delivery apology" : "customers are not told (notifications off)"}
            </div>
          </>
        ) : (
          <>
            <div style={{ fontSize: "15px", fontWeight: "600", marginBottom: "10px" }}>
              Ana and Rico deliver them instead. <span style={{ color: "var(--ok)" }}>All 3 arrive on time.</span>
            </div>
            <div style={{ border: "1px solid var(--line)", borderRadius: "6px", overflowX: "auto" }}>
              <table style={{ width: "100%", minWidth: "520px", borderCollapse: "collapse" }}>
                <thead>
                  <tr>
                    <th style={th}>Delivery</th>
                    <th style={th}>Driver</th>
                    <th style={th}>Arrives</th>
                    <th style={th}>Must arrive by</th>
                    <th style={th}>Result</th>
                  </tr>
                </thead>
                <tbody>
                  {JUN_STOPS.map((s) => (
                    <tr key={s.id}>
                      <td style={td}>
                        <span style={{ fontFamily: MONO, fontWeight: "600" }}>{s.id}</span> {s.name}
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>{s.area}</div>
                      </td>
                      <td style={td}>
                        <span style={{ color: "var(--mute)", textDecoration: "line-through" }}>Jun</span> <b>{s.to}</b>
                      </td>
                      <td style={tdMono}>{s.newEta}</td>
                      <td style={{ ...tdMono, color: "var(--mute)" }}>{s.due}</td>
                      <td style={td}>
                        <Tag tone="ok" size="cell">
                          On time
                        </Tag>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "8px" }}>
              +9 km extra driving (≈ ₱95) ·{" "}
              {notify ? "all 3 customers get their new arrival time on WhatsApp" : "customers are not told (notifications off)"}
            </div>
          </>
        )}
      </div>
      <div style={{ ...section, display: "flex", flexWrap: "wrap", gap: "24px" }}>
        <div style={{ flex: "1 1 280px" }}>
          <div style={{ fontWeight: "600", marginBottom: "6px", display: "flex", alignItems: "center", gap: "6px" }}>
            <Sparkle /> Agent reasoning
          </div>
          <ul style={{ margin: "0", paddingLeft: "18px", color: "var(--ink2)", lineHeight: "1.65" }}>
            <li>Ana has the lightest load and is 14 min from BGC. Ben Cruz moved to 15:00, freeing her midday.</li>
            <li>Rico is idle in Makati, 6 min from Joya Lofts, which has clear lobby instructions.</li>
            <li>All three windows hold after the move. Added driving: +9 km.</li>
          </ul>
        </div>
        <div style={{ flex: "1 1 200px" }}>
          {f.phase === "rejected" ? (
            <>
              <div style={{ fontWeight: "600", marginBottom: "6px" }}>Done at 10:44</div>
              <ul style={{ margin: "0", paddingLeft: "18px", color: "var(--ink2)", lineHeight: "1.65" }}>
                <li>Jun keeps his 3 stops</li>
                <li>{notify ? "Late-delivery apology sent to #1042 and #1049" : "Customers not told (you turned this off)"}</li>
                <li>Rejection recorded as an override</li>
              </ul>
            </>
          ) : (
            <>
              <div style={{ fontWeight: "600", marginBottom: "6px" }}>{f.phase === "approved" ? "Done at 10:44" : "On approval"}</div>
              <ul style={{ margin: "0", paddingLeft: "18px", color: "var(--ink2)", lineHeight: "1.65" }}>
                <li>Routes re-sequenced for Ana and Rico</li>
                <li>{notify ? "3 customers notified with new ETAs" : "Customers not notified (you turned this off)"}</li>
                <li>Incident logged on Jun&#39;s profile</li>
              </ul>
            </>
          )}
        </div>
      </div>
      <div
        style={{
          padding: "12px 18px",
          borderBottom: decided ? undefined : "1px solid var(--line)",
          display: "flex",
          flexWrap: "wrap",
          gap: "18px",
          color: "var(--mute)",
          fontSize: "12px",
        }}
      >
        <span>
          Similar requests (30 days): <b style={{ color: "var(--ink2)" }}>23 of 24 approved</b>
        </span>
        <span>
          Model confidence: <b style={{ color: "var(--ink2)" }}>0.91</b>
        </span>
        <span>Inputs: GPS, driver report, address book, 8-week driver history</span>
      </div>
      {f.phase === "approved" ? (
        <DecidedBar tone="ok">
          <span style={{ flex: "1 1 320px" }}>
            <b>Approved by Maria at 10:44</b> · Ana and Rico&#39;s routes updated ·{" "}
            {notify ? "3 customers notified" : "customers not notified"}
          </span>
          <a href="/app/dispatch" style={{ fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap" }}>
            See routes
          </a>
          <span style={{ color: "var(--mute)" }}>·</span>
          <a href="/app/audit" style={{ fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap" }}>
            Audit log
          </a>
        </DecidedBar>
      ) : f.phase === "rejected" ? (
        <DecidedBar tone="neutral">
          <span style={{ flex: "1 1 320px" }}>
            <b>Rejected by Maria at 10:44</b> · Jun keeps his 3 stops ·{" "}
            {notify ? "#1042 and #1049 get a late-delivery apology" : "customers not told"}
          </span>
          <a href="/app/dispatch" style={{ fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap" }}>
            See routes
          </a>
          <span style={{ color: "var(--mute)" }}>·</span>
          <a href="/app/audit" style={{ fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap" }}>
            Audit log
          </a>
        </DecidedBar>
      ) : (
        <div style={bar}>
          <label style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--ink2)", flex: "1", whiteSpace: "nowrap" }}>
            <input type="checkbox" checked={notify} onChange={(e) => setNotify(e.target.checked)} />
            Notify affected customers
          </label>
          <button type="button" onClick={onReject} style={btn}>
            Reject
          </button>
          <button type="button" style={btn}>
            Edit assignment
          </button>
          <button type="button" onClick={onApprove} style={primary}>
            Approve
          </button>
        </div>
      )}
    </>
  );
}

/* ---------- HAM-414 ---------- */

type Local414 = null | "approved" | "rejected";
function Ham414Detail({ clock, decision, setDecision }: { clock: string; decision: Local414; setDecision: (d: Local414) => void }) {
  const rows: [string, string, Tone, string][] = [
    ["Items", "Red roses (12) + chocolates", "ok", "Sure"],
    ["Recipient", "Rina Bautista", "ok", "Sure"],
    ["Deliver to", "Makati, building unclear", "warn", "Not sure"],
    ["Window", "Today 13:00–16:00 (“before 4pm”)", "ok", "Sure"],
    ["Payment", "Not paid yet", "ok", "Sure"],
  ];
  return (
    <>
      <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", color: "var(--mute)", fontSize: "12px" }}>
          <span style={{ fontFamily: MONO }}>HAM-414</span>
          <span>·</span>
          <span>Created 09:58 by Dispatch agent</span>
          <span>·</span>
          <span>Policy: Orders from messages. 82% sure is below the 95% auto threshold.</span>
        </div>
        <h2 style={{ margin: "8px 0 0", fontSize: "18px", fontWeight: "600" }}>Create order WA-0912 from WhatsApp</h2>
        <p style={{ margin: "6px 0 0", color: "var(--ink2)", lineHeight: "1.55" }}>
          Rina Bautista ordered on WhatsApp at 09:57. The agent read most of the message but isn&#39;t sure which building in Makati.
        </p>
      </div>
      <div style={section}>
        <div style={{ fontWeight: "600", marginBottom: "8px" }}>Customer message</div>
        <div
          style={{
            fontSize: "13px",
            color: "var(--ink)",
            background: "var(--sub)",
            border: "1px solid var(--line)",
            borderRadius: "6px",
            padding: "8px 10px",
          }}
        >
          &#34;hi po! can i order the red roses 12pcs w/ chocolates… before 4pm pls&#34;
        </div>
      </div>
      <div style={section}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <Sparkle />
          <span style={{ fontWeight: "600", flex: "1" }}>Order draft</span>
          <button type="button" style={{ ...btn, height: "26px", padding: "0 8px", fontSize: "12px" }}>
            Edit
          </button>
        </div>
        <div style={{ border: "1px solid #F8BBD0", background: "#FFF7FA", borderRadius: "6px", padding: "4px 12px 10px" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {rows.map(([k, val, tone, how], i) => (
                <tr key={k}>
                  <td
                    style={{
                      padding: "7px 0",
                      borderTop: i ? "1px solid #FBD5E3" : undefined,
                      color: "var(--mute)",
                      width: "110px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {k}
                  </td>
                  <td style={{ padding: "7px 0", borderTop: i ? "1px solid #FBD5E3" : undefined }}>{val}</td>
                  <td style={{ padding: "7px 0", borderTop: i ? "1px solid #FBD5E3" : undefined, textAlign: "right" }}>
                    {tone === "warn" ? <Tag tone="warn">{how}</Tag> : <span style={{ fontSize: "12px", color: "var(--mute)" }}>{how}</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "6px", paddingTop: "8px", borderTop: "1px solid #FBD5E3" }}>
            <span style={{ color: "var(--brandInk)", fontWeight: "500" }}>Auto-generated</span> from 1 WhatsApp message and the address book
            · updated 09:58
          </div>
        </div>
      </div>
      {decision === "approved" ? (
        <DecidedBar tone="ok">
          <span>
            <b>Approved by Maria at {clock}</b> · order created · the agent will ask Rina which building on WhatsApp
          </span>
        </DecidedBar>
      ) : decision === "rejected" ? (
        <DecidedBar tone="neutral">
          <span>
            <b>Rejected by Maria at {clock}</b> · no order created
          </span>
        </DecidedBar>
      ) : (
        <div style={bar}>
          <span style={{ flex: "1", color: "var(--ink2)" }}>Approving creates the order and asks Rina for the building.</span>
          <button type="button" onClick={() => setDecision("rejected")} style={btn}>
            Reject
          </button>
          <button type="button" onClick={() => setDecision("approved")} style={primary}>
            Approve
          </button>
        </div>
      )}
    </>
  );
}

/* ---------- HAM-416 ---------- */

const OPTIONS = [
  {
    id: "redeliver",
    label: "Re-deliver 2 replacement centerpieces",
    note: "Keeps a regular customer. About ₱1,200 in stock and one extra stop this afternoon.",
  },
  { id: "credit", label: "Partial credit: ₱1,200 off the next order", note: "Covers the 2 wilted pieces. No extra driving." },
  { id: "refund", label: "Full refund: ₱4,800", note: "Refunds all 8 centerpieces, more than the claim covers." },
  { id: "decline", label: "Decline with reason", note: "The proof photo shows fresh flowers at 08:58. Risks losing a regular customer." },
];

function PhotoPlaceholder({ label, meta, wilted }: { label: string; meta: string; wilted?: boolean }) {
  return (
    <figure style={{ margin: "0", flex: "1 1 160px" }}>
      <div
        style={{
          height: "112px",
          borderRadius: "6px",
          border: "1px solid var(--line)",
          background: wilted ? "#F7F3EE" : "#F1F7F2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden="true"
      >
        <svg width="72" height="56" viewBox="0 0 72 56">
          {[14, 36, 58].map((x, i) => (
            <g key={x}>
              <path d={`M${x} 52 V30`} stroke={wilted && i !== 1 ? "#A3A07A" : "#3E8E5A"} strokeWidth="2" />
              <circle
                cx={wilted && i !== 1 ? x + 5 : x}
                cy={wilted && i !== 1 ? 30 : 22}
                r="8"
                fill={wilted && i !== 1 ? "#C9A9A6" : "#E91E63"}
                opacity={wilted && i !== 1 ? 0.7 : 0.85}
              />
            </g>
          ))}
        </svg>
      </div>
      <figcaption style={{ fontSize: "12px", marginTop: "4px" }}>
        <b style={{ fontWeight: "500" }}>{label}</b> <span style={{ color: "var(--mute)" }}>· {meta}</span>
      </figcaption>
    </figure>
  );
}

function Ham416Detail(p: {
  clock: string;
  pick: string;
  setPick: (v: string) => void;
  recorded: string | null;
  setRecorded: (v: string) => void;
}) {
  const { clock, pick, setPick, recorded, setRecorded } = p;
  const verdict = check({ kind: "refund", order: "#1045", amount: 4800 });
  const facts: [string, ReactNode][] = [
    ["Delivered", <>08:58 · window 08:30–11:00 · on time</>],
    ["Time in transit", <>46 min (picked up 08:12)</>],
    ["Driver notes", <>&#34;Handed to staff at the counter. Boxes upright, kept out of the sun.&#34; (Carlo)</>],
    ["Address history", <>Café Morato: 11 deliveries in 90 days, no earlier claims</>],
    ["Photo check", <>Proof photo shows 8 upright, fresh centerpieces</>],
  ];
  const chosen = OPTIONS.find((o) => o.id === (recorded ?? pick))!;
  return (
    <>
      <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px", color: "var(--mute)", fontSize: "12px" }}>
          <span style={{ fontFamily: MONO }}>HAM-416</span>
          <span>·</span>
          <span>Created 10:27 by Assurance agent</span>
          <span>·</span>
          <span>Policy: {verdict.policy.label} · Never</span>
        </div>
        <h2 style={{ margin: "8px 0 0", fontSize: "18px", fontWeight: "600" }}>Refund request · Paolo Lim #1045</h2>
        <p style={{ margin: "6px 0 0", color: "var(--ink2)", lineHeight: "1.55" }}>
          Paolo Lim (Café Morato) says 2 of the 8 table centerpieces arrived wilted and asked for a refund. Carlo delivered order #1045 at
          08:58.
        </p>
        <div
          style={{
            marginTop: "10px",
            display: "flex",
            gap: "8px",
            alignItems: "flex-start",
            ...toneStyle("err"),
            color: "var(--ink)",
            borderRadius: "6px",
            padding: "8px 10px",
            fontSize: "13px",
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--err)"
            strokeWidth="2"
            aria-hidden="true"
            style={{ flex: "none", marginTop: "3px" }}
          >
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          <span>
            <b>Blocked by policy.</b> {verdict.reason}
          </span>
        </div>
        <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "8px" }}>
          Holding reply sent 10:28: &#34;Sorry about this, Paolo. We&#39;re checking your photos and will reply by 11:30.&#34; No refund
          promised.
        </div>
      </div>
      <div style={section}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <Sparkle />
          <span style={{ fontWeight: "600", flex: "1" }}>Evidence pack</span>
          <button type="button" style={{ ...btn, height: "26px", padding: "0 8px", fontSize: "12px" }}>
            Edit
          </button>
        </div>
        <div style={{ border: "1px solid #F8BBD0", background: "#FFF7FA", borderRadius: "6px", padding: "10px 12px" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "8px" }}>
            <PhotoPlaceholder label="Proof photo" meta="08:58 · Carlo" />
            <PhotoPlaceholder label="Paolo's photo" meta="10:27 · 1h 29m later" wilted />
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <tbody>
              {facts.map(([k, val]) => (
                <tr key={k}>
                  <td
                    style={{
                      padding: "6px 0",
                      borderTop: "1px solid #FBD5E3",
                      color: "var(--mute)",
                      width: "130px",
                      whiteSpace: "nowrap",
                      verticalAlign: "top",
                    }}
                  >
                    {k}
                  </td>
                  <td style={{ padding: "6px 0", borderTop: "1px solid #FBD5E3", color: "var(--ink2)" }}>{val}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ fontSize: "12px", color: "var(--mute)", paddingTop: "8px", borderTop: "1px solid #FBD5E3" }}>
            <span style={{ color: "var(--brandInk)", fontWeight: "500" }}>Auto-generated</span> from 2 photos, the driver app log and the
            address book · updated 10:29
          </div>
        </div>
      </div>
      <div style={section}>
        <div style={{ fontWeight: "600", marginBottom: "2px" }}>Options</div>
        <div style={{ fontSize: "12px", color: "var(--mute)", marginBottom: "8px" }}>Ranked by the Assurance agent. You pick.</div>
        <div role="radiogroup" aria-label="Options" style={{ border: "1px solid var(--line)", borderRadius: "6px" }}>
          {OPTIONS.map((o, i) => {
            const on = (recorded ?? pick) === o.id;
            return (
              <label
                key={o.id}
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "flex-start",
                  padding: "10px 12px",
                  borderTop: i ? "1px solid var(--line)" : undefined,
                  background: on ? "var(--brandTint)" : undefined,
                  cursor: recorded ? "default" : "pointer",
                }}
              >
                <input
                  type="radio"
                  name="ham416"
                  checked={on}
                  disabled={!!recorded}
                  onChange={() => setPick(o.id)}
                  style={{ marginTop: "3px" }}
                />
                <span style={{ fontFamily: MONO, color: "var(--mute)", fontSize: "12px", marginTop: "2px" }}>{i + 1}</span>
                <span style={{ flex: "1" }}>
                  <span style={{ fontWeight: "500" }}>{o.label}</span>
                  {i === 0 && (
                    <span style={{ fontSize: "12px", color: "var(--brandInk)", marginLeft: "8px", whiteSpace: "nowrap" }}>
                      Agent&#39;s pick
                    </span>
                  )}
                  <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "2px" }}>{o.note}</div>
                </span>
              </label>
            );
          })}
        </div>
      </div>
      {recorded ? (
        <DecidedBar tone="ok">
          <span style={{ flex: "1 1 320px" }}>
            <b>Decision recorded by Maria at {clock}</b> · {chosen.label}
          </span>
          <a href="/app/messages" style={{ fontWeight: "600", textDecoration: "none", whiteSpace: "nowrap" }}>
            Reply to Paolo
          </a>
        </DecidedBar>
      ) : (
        <div style={bar}>
          <span style={{ flex: "1", color: "var(--ink2)" }}>
            Picked: <b style={{ color: "var(--ink)" }}>{chosen.label}</b>
          </span>
          <button type="button" onClick={() => setRecorded(pick)} style={primary}>
            Record decision
          </button>
        </div>
      )}
    </>
  );
}

/* ---------- board ---------- */

const SEED_AUTO = [
  { time: "10:41", event: "Moved #1044 Ben Cruz to 15:00–17:00 and re-sequenced Ana", agent: "Messages agent", ref: "HAM-418" },
  { time: "10:38", event: "Verified proof photo for #1046", agent: "Proof agent", ref: "#1046" },
  { time: "10:20", event: "Asked Jun to retake a blurry photo at #1041", agent: "Proof agent", ref: "#1041" },
];

export default function ApprovalsBoard() {
  const f = useScenarioFacts();
  const approve = useScenario((s) => s.approve);
  const reject = useScenario((s) => s.reject);
  const [tab, setTab] = useState<TabId>("pending");
  const [selected, setSelected] = useState<TicketId | null>(null);
  const [compare, setCompare] = useState<"before" | "after">("before");
  // HAM-414 and HAM-416 decisions are local to this page (they don't change the scenario).
  const [d414, setD414] = useState<Local414>(null);
  const [pick416, setPick416] = useState("redeliver");
  const [rec416, setRec416] = useState<string | null>(null);

  const decided417 = f.phase === "approved" || f.phase === "rejected";
  const pending: TicketId[] = [...(f.ticketOpen ? (["HAM-417"] as TicketId[]) : []), "HAM-414", "HAM-416"];
  const escalated: TicketId[] = ["HAM-416"];
  const decided: TicketId[] = decided417 ? ["HAM-417"] : [];
  const valid = (id: TicketId | null): id is TicketId => !!id && (id !== "HAM-417" || f.ticketOpen || decided417);
  const current: TicketId = valid(selected) ? selected : pending[0];

  const autoRows = [
    ...scenarioEvents(f.phase, f.notifyCustomers)
      .filter((e) => e.outcome === "Auto" || e.outcome === "Sent")
      .map((e) => ({ time: e.time, event: e.event, agent: e.agent, ref: e.ref })),
    ...SEED_AUTO.filter((e) => toMin(e.time) <= toMin(f.clock)),
  ].sort((a, b) => toMin(b.time) - toMin(a.time));
  // 49 earlier actions today ran on their own before the ones listed here (see the Audit log).
  const autoCount = 49 + autoRows.length;
  const decidedCount = decided.length + 1;

  const tabs: { id: TabId; label: string; count: number }[] = [
    { id: "pending", label: "Pending", count: pending.length },
    { id: "escalated", label: "Escalated", count: escalated.length },
    { id: "auto", label: "Auto-executed", count: autoCount },
    { id: "decided", label: "Decided", count: decidedCount },
  ];
  const openTab = (t: TabId) => {
    setTab(t);
    const first = t === "pending" ? pending[0] : t === "escalated" ? escalated[0] : t === "decided" ? decided[0] : undefined;
    if (first) setSelected(first);
  };
  const onApprove = () => {
    approve();
    setSelected("HAM-417");
    setTab("decided");
    setCompare("after");
  };
  const onReject = () => {
    reject();
    setSelected("HAM-417");
    setTab("decided");
    setCompare("before");
  };

  const ticketRow = (id: TicketId) => {
    const t = TICKETS[id];
    if (id === "HAM-417" && decided417) {
      const ok = f.phase === "approved";
      return (
        <QueueRow
          key={id}
          tag={<Tag tone={ok ? "ok" : "neutral"}>{ok ? "Approved" : "Rejected"}</Tag>}
          who={t.agent}
          when="10:44"
          title={t.title}
          sub={`${ok ? "Approved" : "Rejected"} by Maria 10:44`}
          selected={current === id}
          onClick={() => setSelected(id)}
        />
      );
    }
    return (
      <QueueRow
        key={id}
        tag={<Tag tone={t.tag[0]}>{t.tag[1]}</Tag>}
        who={t.agent}
        when={age(t.created, f.clock)}
        title={t.title}
        sub={t.sub}
        selected={current === id}
        onClick={() => setSelected(id)}
      />
    );
  };

  return (
    <main style={{ flex: "999 1 640px", minWidth: "0", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "14px" }}>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
        <div style={{ flex: "1 1 320px" }}>
          <h1 style={{ margin: "0", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.01em" }}>Approvals</h1>
          <div style={{ color: "var(--mute)", marginTop: "2px" }}>
            Agent actions held by your autonomy policies. Rejections are recorded as overrides.
          </div>
        </div>
        <a
          href="/app/autonomy"
          style={{
            height: "34px",
            padding: "0 12px",
            border: "1px solid var(--line2)",
            borderRadius: "6px",
            background: "var(--panel)",
            color: "var(--ink2)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
          }}
        >
          Manage policies
        </a>
      </div>
      <div
        role="tablist"
        aria-label="Queue"
        style={{ display: "flex", flexWrap: "wrap", gap: "20px", borderBottom: "1px solid var(--line)" }}
      >
        {tabs.map((t) => {
          const on = tab === t.id;
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={on}
              onClick={() => openTab(t.id)}
              style={{
                font: "inherit",
                fontWeight: on ? "600" : undefined,
                color: on ? "var(--brandInk)" : "var(--ink2)",
                background: "none",
                border: "0",
                borderBottom: `2px solid ${on ? "var(--brandInk)" : "transparent"}`,
                padding: "0 2px 10px",
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              {t.label}{" "}
              <span style={{ fontSize: "11px", background: on ? "var(--brandTint)" : "#F2F4F7", borderRadius: "99px", padding: "0 6px" }}>
                {t.count}
              </span>
            </button>
          );
        })}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-start" }}>
        <section
          aria-label="Queue"
          style={{
            flex: "1 1 320px",
            maxWidth: "400px",
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <div style={{ marginBottom: "-1px" }}>
            {tab === "pending" && (
              <>
                {f.thinking && <ThinkingRow />}
                {pending.map(ticketRow)}
              </>
            )}
            {tab === "escalated" && escalated.map(ticketRow)}
            {tab === "decided" && (
              <>
                {decided.map(ticketRow)}
                <QueueRow
                  tag={<Tag tone="ok">Approved</Tag>}
                  who="Dispatch agent"
                  when="07:52"
                  title="Publish today's route plan"
                  sub="Approved by Maria 07:52 · 12 stops across 4 drivers"
                  href="/app/dispatch"
                />
              </>
            )}
            {tab === "auto" && (
              <>
                {autoRows.map((r) => (
                  <QueueRow key={r.time + r.event} tag={null} who={r.agent} when={r.time} title={r.event} sub={r.ref} href="/app/audit" />
                ))}
                <a
                  href="/app/audit"
                  style={{
                    display: "block",
                    padding: "10px 14px",
                    fontSize: "12px",
                    fontWeight: "600",
                    textDecoration: "none",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  See all ({autoCount}) in the Audit log
                </a>
              </>
            )}
          </div>
        </section>
        <section
          aria-label="Request details"
          style={{
            flex: "999 1 460px",
            minWidth: "0",
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {current === "HAM-417" ? (
            <Ham417Detail compare={compare} setCompare={setCompare} onApprove={onApprove} onReject={onReject} />
          ) : current === "HAM-414" ? (
            <Ham414Detail clock={f.clock} decision={d414} setDecision={setD414} />
          ) : (
            <Ham416Detail clock={f.clock} pick={pick416} setPick={setPick416} recorded={rec416} setRecorded={setRec416} />
          )}
        </section>
      </div>
    </main>
  );
}
