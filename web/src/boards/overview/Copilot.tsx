"use client";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useScenario, type Phase } from "@/lib/store";
import { useScenarioFacts } from "@/lib/scenario";
import { check, HAM_417 } from "@/lib/policy";
import { AgentWorking, btnPrimary, btnSecondary, Sparkle, Tag } from "./ui";

/*
 * The copilot is scripted: no model is called. Chips and the text box append canned answers
 * built from the live scenario state. The proposal card's Approve/Reject call the same store
 * actions as the Approvals page, so a decision made on either page shows up in both.
 */

type Entry =
  | { id: number; k: "greet"; phase: Phase }
  | { id: number; k: "user"; text: string }
  | { id: number; k: "risk"; phase: Phase }
  | { id: number; k: "alert" }
  | { id: number; k: "proposal" }
  | { id: number; k: "decision" }
  | { id: number; k: "carlo" }
  | { id: number; k: "summary"; phase: Phase; approvals: number; atRisk: number }
  | { id: number; k: "fallback" };

type NewEntry = Entry extends infer E ? (E extends { id: number } ? Omit<E, "id"> : never) : never;

const CHIPS = ["What's at risk?", "Where's Carlo?", "Summarize today"] as const;

function seedFor(phase: Phase): NewEntry[] {
  if (phase === "incident")
    return [
      { k: "greet", phase },
      { k: "user", text: "What's at risk right now?" },
      { k: "risk", phase },
    ];
  return [{ k: "greet", phase }];
}

/* ---------- message shells ---------- */

const card: CSSProperties = {
  flex: "none",
  alignSelf: "stretch",
  background: "var(--panel)",
  border: "1px solid var(--line)",
  borderRadius: "8px",
  overflow: "hidden",
};

function Bot({ children }: { children: ReactNode }) {
  return (
    <div
      className="ham-in"
      style={{
        flex: "none",
        alignSelf: "flex-start",
        maxWidth: "92%",
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: "10px 10px 10px 2px",
        padding: "9px 11px",
        lineHeight: "1.5",
        color: "var(--ink2)",
      }}
    >
      {children}
    </div>
  );
}

function User({ children }: { children: ReactNode }) {
  return (
    <div
      className="ham-in"
      style={{
        flex: "none",
        alignSelf: "flex-end",
        maxWidth: "85%",
        background: "var(--ink)",
        color: "#fff",
        borderRadius: "10px 10px 2px 10px",
        padding: "8px 11px",
        lineHeight: "1.45",
      }}
    >
      {children}
    </div>
  );
}

function Sources({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "5px",
        fontSize: "11px",
        color: "var(--mute)",
        marginTop: "4px",
        lineHeight: "1.4",
      }}
    >
      <span style={{ marginTop: "2px", display: "flex" }}>
        <Sparkle size={11} />
      </span>
      {children}
    </div>
  );
}

const check14 = (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
    <path d="M5 12l5 5 9-10" />
  </svg>
);

/* ---------- answers ---------- */

function greeting(phase: Phase, thinking: boolean) {
  const start = "Morning Maria. Plan went out at 7:52.";
  switch (phase) {
    case "before":
      return `${start} All 4 drivers are on time.`;
    case "incident":
      return thinking
        ? `${start} Jun reported a flat tire at 10:31. I'm re-planning his stops now.`
        : `${start} Jun reported a flat tire at 10:31 and I have a fix waiting for you.`;
    case "approved":
      return `${start} Jun had a flat tire at 10:31. You approved moving his 3 stops at 10:44, so every delivery is on time again.`;
    case "rejected":
      return `${start} Jun had a flat tire at 10:31. You kept his 3 stops with him at 10:44, so #1042 and #1049 will be late.`;
  }
}

function RiskRow({ order, eta, where, last }: { order: string; eta: string; where: string; last?: boolean }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr auto",
        gap: "2px 8px",
        padding: "9px 12px",
        borderBottom: last ? undefined : "1px solid var(--line)",
      }}
    >
      <span style={{ fontWeight: 600 }}>{order}</span>
      <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--warn)", whiteSpace: "nowrap" }}>ETA {eta}</span>
      <span style={{ fontSize: "12px", color: "var(--mute)" }}>{where} · window ends 13:00</span>
      <span style={{ fontSize: "12px", color: "var(--mute)" }}>Jun</span>
    </div>
  );
}

function RiskAnswer({ phase, intro, actions }: { phase: Phase; intro?: string; actions: ReactNode }) {
  if (phase === "before" || phase === "approved") {
    return (
      <Bot>
        {phase === "before"
          ? "Nothing right now. All 13 deliveries are on track for their windows."
          : "Nothing right now. With Ana and Rico's new routes, every delivery lands inside its window."}
      </Bot>
    );
  }
  return (
    <>
      <Bot>
        {intro ??
          (phase === "rejected"
            ? "Two deliveries will be late. They stay with Jun, and both customers got an apology:"
            : "Two deliveries, both on Jun's stalled route:")}
      </Bot>
      <div className="ham-in" style={card}>
        <div style={{ padding: "9px 12px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontWeight: 600, flex: "1" }}>At-risk deliveries (2)</span>
        </div>
        <RiskRow order="#1042 Mark Tan" eta="13:40" where="Uptown BGC" />
        <RiskRow order="#1049 Sam Ocampo" eta="13:55" where="Rockwell" last={!actions} />
        {actions && <div style={{ padding: "9px 12px", display: "flex", gap: "6px", alignItems: "center" }}>{actions}</div>}
      </div>
    </>
  );
}

function DecisionResult({ phase, notify }: { phase: Phase; notify: boolean }) {
  if (phase === "approved")
    return (
      <div
        className="ham-in"
        style={{
          flex: "none",
          alignSelf: "stretch",
          background: "var(--okBg)",
          border: "1px solid var(--okLine)",
          borderRadius: "8px",
          padding: "10px 12px",
          color: "var(--ok)",
        }}
      >
        <div style={{ fontWeight: 600 }}>{notify ? "3 stops moved · 3 customers notified" : "3 stops moved · customers not notified"}</div>
        <div style={{ fontSize: "12px", marginTop: "2px", color: "#085D3A" }}>
          Ana and Rico have new routes. Both at-risk windows now land on time.
        </div>
      </div>
    );
  if (phase === "rejected")
    return (
      <div className="ham-in" style={{ ...card, padding: "10px 12px" }}>
        <div style={{ fontWeight: 600 }}>Jun keeps his 3 stops</div>
        <div style={{ fontSize: "12px", marginTop: "2px", color: "var(--ink2)" }}>
          #1042 and #1049 will be late. Both customers got an apology on WhatsApp.
        </div>
      </div>
    );
  return null;
}

function DecisionLine({ phase }: { phase: Phase }) {
  if (phase === "approved")
    return (
      <div style={{ padding: "9px 12px", display: "flex", alignItems: "center", gap: "6px", color: "var(--ok)", fontWeight: 600 }}>
        {check14}
        Approved by Maria
        <span style={{ marginLeft: "auto", fontWeight: 400, fontSize: "12px", color: "var(--mute)" }}>10:44</span>
      </div>
    );
  if (phase === "rejected")
    return (
      <div style={{ padding: "9px 12px", display: "flex", alignItems: "center", gap: "6px", color: "var(--ink2)", fontWeight: 600 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
        Rejected by Maria
        <span style={{ marginLeft: "auto", fontWeight: 400, fontSize: "12px", color: "var(--mute)" }}>10:44</span>
      </div>
    );
  return null;
}

function Proposal() {
  const f = useScenarioFacts();
  const approve = useScenario((s) => s.approve);
  const reject = useScenario((s) => s.reject);
  const verdict = check(HAM_417);
  const row = (order: string, to: string, eta: string) => (
    <div style={{ display: "flex", justifyContent: "space-between", gap: "8px" }}>
      <span>{order}</span>
      <span style={{ color: "var(--ink2)", whiteSpace: "nowrap" }}>
        Jun → <b>{to}</b> · {eta}
      </span>
    </div>
  );
  return (
    <>
      <div className="ham-in" style={card}>
        <div style={{ padding: "9px 12px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center", gap: "8px" }}>
          <span style={{ fontWeight: 600, flex: "1" }}>Proposed reassignment</span>
          <span style={{ fontSize: "11px", color: "var(--mute)", fontFamily: "'IBM Plex Mono', monospace" }}>HAM-417</span>
        </div>
        <div style={{ padding: "8px 12px", display: "flex", flexDirection: "column", gap: "6px", borderBottom: "1px solid var(--line)" }}>
          {row("#1042 Mark Tan", "Ana", "12:15")}
          {row("#1050 Nicole Ramos", "Ana", "12:40")}
          {row("#1049 Sam Ocampo", "Rico", "11:05")}
        </div>
        <div style={{ padding: "8px 12px", fontSize: "12px", color: "var(--mute)", borderBottom: "1px solid var(--line)" }}>
          {f.phase === "incident" ? "Needs approval" : "Held by policy"}: {verdict.reason}{" "}
          {f.phase === "incident" && (f.notifyCustomers ? "Customers are notified on approval." : "Customers won't be notified.")}
          <Sources>Auto-generated by the Dispatch agent from Jun&#39;s report and live ETAs</Sources>
        </div>
        {f.ticketOpen && (
          <div style={{ padding: "9px 12px", display: "flex", gap: "6px" }}>
            <button onClick={approve} style={btnPrimary}>
              Approve
            </button>
            <a href="/app/approvals" style={btnSecondary}>
              Edit
            </a>
            <button onClick={reject} style={btnSecondary}>
              Reject
            </button>
          </div>
        )}
        <DecisionLine phase={f.phase} />
      </div>
      <DecisionResult phase={f.phase} notify={f.notifyCustomers} />
    </>
  );
}

function Carlo() {
  return (
    <div className="ham-in" style={{ ...card, padding: "10px 12px", display: "flex", flexDirection: "column", gap: "8px" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <span
          style={{
            width: "28px",
            height: "28px",
            flex: "none",
            borderRadius: "99px",
            background: "#7A5AF8",
            color: "#fff",
            fontSize: "10px",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          CM
        </span>
        <div style={{ flex: "1", minWidth: 0 }}>
          <div style={{ fontWeight: 600 }}>Carlo Mendoza</div>
          <div style={{ fontSize: "12px", color: "var(--mute)" }}>Katipunan Ave · moving 24 km/h</div>
        </div>
        <Tag tone="info">En route</Tag>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
        <div style={{ flex: "1", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
          <div style={{ width: "50%", height: "6px", background: "#7A5AF8", borderRadius: "3px" }} />
        </div>
        <span style={{ color: "var(--ink2)", whiteSpace: "nowrap" }}>2/4 done</span>
      </div>
      <div style={{ fontSize: "12px", color: "var(--ink2)" }}>Next: #1051 Prof. Diaz, UP Diliman · ETA 11:05 · on time</div>
      <div style={{ display: "flex", gap: "6px" }}>
        <a href="/app/drivers" style={{ fontWeight: 500, textDecoration: "none" }}>
          Profile
        </a>
        <span style={{ color: "var(--line2)" }}>·</span>
        <a href="/app/dispatch" style={{ fontWeight: 500, textDecoration: "none" }}>
          Route
        </a>
      </div>
    </div>
  );
}

function Summary({ phase, approvals, atRisk }: { phase: Phase; approvals: number; atRisk: number }) {
  const line = {
    before: "Quiet morning so far. 5 of 13 delivered and every driver is on time.",
    incident: "One incident: Jun's flat tire. 2 deliveries are at risk until you decide on HAM-417.",
    approved: "Jun's flat tire is handled. His 3 stops moved to Ana and Rico, and everyone is on time.",
    rejected: "Jun kept his 3 stops after his flat tire, so 2 deliveries will be late.",
  }[phase];
  const cell = (label: string, value: ReactNode, color?: string, br?: boolean, bb?: boolean) => (
    <div
      style={{
        padding: "10px 12px",
        borderRight: br ? "1px solid var(--line)" : undefined,
        borderBottom: bb ? "1px solid var(--line)" : undefined,
      }}
    >
      <div style={{ fontSize: "12px", color: "var(--mute)" }}>{label}</div>
      <div style={{ fontSize: "18px", fontWeight: 600, color }}>{value}</div>
    </div>
  );
  return (
    <>
      <Bot>
        {line}
        <Sources>Auto-generated from today&#39;s routes and tickets</Sources>
      </Bot>
      <div className="ham-in" style={{ ...card, display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
        {cell("Delivered", "5 / 13", undefined, true, true)}
        {cell("On time", "100%", undefined, false, true)}
        {cell("At risk", atRisk, atRisk ? "var(--warn)" : undefined, true)}
        {cell("Needs you", approvals, "var(--brandInk)")}
      </div>
    </>
  );
}

/* ---------- the rail ---------- */

export function Copilot() {
  const f = useScenarioFacts();
  const nextId = useRef(0);
  const withIds = (es: NewEntry[]) => es.map((e) => ({ ...e, id: nextId.current++ }) as Entry);
  const [log, setLog] = useState<Entry[]>(() => withIds(seedFor(f.phase)));
  const [draft, setDraft] = useState("");
  const append = (...es: NewEntry[]) => setLog((l) => [...l, ...withIds(es)]);
  const hasProposal = log.some((e) => e.k === "proposal");

  // Follow scenario changes made here, on the Approvals page or in another tab (the driver app).
  const prev = useRef(f.phase);
  useEffect(() => {
    const from = prev.current;
    const to = f.phase;
    prev.current = to;
    if (from === to) return;
    if (from === "before" && to === "incident") append({ k: "alert" });
    else if (from === "incident" && (to === "approved" || to === "rejected")) {
      setLog((l) => (l.some((e) => e.k === "proposal") ? l : [...l, ...withIds([{ k: "decision" }])]));
    } else setLog(withIds(seedFor(to)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [f.phase]);

  // Keep the newest message in view (scrolls the chat only, never the page).
  const scroller = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [log.length, f.thinking, f.phase]);

  const draftFix = () => {
    if (!f.ticketOpen || hasProposal) return;
    append({ k: "user", text: "Draft a fix" }, { k: "proposal" });
  };
  const ask = (q: string) => {
    const t = q.toLowerCase();
    if (t.includes("risk") || t.includes("late")) append({ k: "user", text: q }, { k: "risk", phase: f.phase });
    else if (t.includes("carlo")) append({ k: "user", text: q }, { k: "carlo" });
    else if (t.includes("summar") || t.includes("today"))
      append({ k: "user", text: q }, { k: "summary", phase: f.phase, approvals: f.approvalsCount, atRisk: f.atRisk });
    else if ((t.includes("fix") || t.includes("draft")) && f.ticketOpen && !hasProposal) draftFix();
    else append({ k: "user", text: q }, { k: "fallback" });
  };
  const send = () => {
    const q = draft.trim();
    if (!q) return;
    setDraft("");
    ask(q);
  };

  const riskActions = (phase: Phase) =>
    phase === "incident" ? (
      <>
        {f.ticketOpen && !hasProposal && (
          <button onClick={draftFix} style={btnPrimary}>
            Draft a fix
          </button>
        )}
        <a href="/app/dispatch" style={{ marginLeft: f.ticketOpen && !hasProposal ? "6px" : 0, textDecoration: "none", fontWeight: 500 }}>
          Open in dispatch
        </a>
      </>
    ) : null;

  const render = (e: Entry) => {
    switch (e.k) {
      case "greet":
        return <Bot key={e.id}>{greeting(e.phase, f.thinking)}</Bot>;
      case "user":
        return <User key={e.id}>{e.text}</User>;
      case "risk":
        return <RiskAnswer key={e.id} phase={e.phase} actions={riskActions(e.phase)} />;
      case "alert":
        return f.thinking ? (
          <AgentWorking key={e.id} style={{ alignSelf: "stretch", flex: "none" }} />
        ) : (
          <RiskAnswer
            key={e.id}
            phase="incident"
            intro="Jun just reported a flat tire on EDSA near Guadalupe. Two deliveries are now at risk:"
            actions={riskActions("incident")}
          />
        );
      case "proposal":
        return <Proposal key={e.id} />;
      case "decision":
        return (
          <div key={e.id} style={{ display: "contents" }}>
            <div className="ham-in" style={card}>
              <div style={{ padding: "9px 12px", borderBottom: "1px solid var(--line)", fontWeight: 600 }}>
                HAM-417 · Reassign 3 stops from Jun
              </div>
              <DecisionLine phase={f.phase} />
            </div>
            <DecisionResult phase={f.phase} notify={f.notifyCustomers} />
          </div>
        );
      case "carlo":
        return <Carlo key={e.id} />;
      case "summary":
        return <Summary key={e.id} phase={e.phase} approvals={e.approvals} atRisk={e.atRisk} />;
      case "fallback":
        return (
          <Bot key={e.id}>
            In this demo I can answer: <b>What&#39;s at risk?</b>, <b>Where&#39;s Carlo?</b> and <b>Summarize today</b>. Try one of the
            buttons below.
          </Bot>
        );
    }
  };

  const showWorking = f.thinking && !log.some((e) => e.k === "alert");

  return (
    <aside
      aria-label="Hamilton Copilot"
      style={{
        flex: "1 1 340px",
        maxWidth: "380px",
        minWidth: "0",
        boxSizing: "border-box",
        background: "var(--panel)",
        borderLeft: "1px solid var(--line)",
      }}
    >
      <div style={{ position: "sticky", top: 0, height: "calc(100vh - 52px)", display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            height: "48px",
            flex: "none",
            padding: "0 14px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2" aria-hidden="true">
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          </svg>
          <h2 style={{ margin: "0", fontSize: "14px", fontWeight: 600, flex: "1" }}>Copilot</h2>
          <a
            href="/app/autonomy"
            style={{
              fontSize: "11px",
              color: "var(--mute)",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              padding: "1px 6px",
              textDecoration: "none",
            }}
          >
            Policies on
          </a>
        </div>
        <div
          ref={scroller}
          aria-live="polite"
          style={{
            flex: "1",
            minHeight: 0,
            overflowY: "auto",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "var(--sub)",
          }}
        >
          {log.map(render)}
          {showWorking && <AgentWorking style={{ alignSelf: "stretch", flex: "none" }} />}
        </div>
        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            flex: "none",
          }}
        >
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {CHIPS.map((c) => (
              <button
                key={c}
                onClick={() => ask(c)}
                style={{
                  font: "inherit",
                  fontSize: "12px",
                  height: "28px",
                  padding: "0 10px",
                  border: "1px solid var(--line2)",
                  borderRadius: "6px",
                  background: "var(--panel)",
                  color: "var(--ink2)",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                {c}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
            style={{ display: "flex", gap: "6px" }}
          >
            <input
              aria-label="Ask or instruct Copilot"
              placeholder="Ask or instruct Copilot…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              style={{
                font: "inherit",
                flex: "1",
                minWidth: "0",
                height: "36px",
                border: "1px solid var(--line2)",
                borderRadius: "6px",
                padding: "0 10px",
              }}
            />
            <button
              type="submit"
              aria-label="Send"
              style={{
                width: "36px",
                height: "36px",
                border: "0",
                borderRadius: "6px",
                background: "var(--brandInk)",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 12l16-8-6 16-2-7z" />
              </svg>
            </button>
          </form>
          <button
            onClick={() => setLog(withIds(seedFor(f.phase)))}
            style={{
              font: "inherit",
              fontSize: "11px",
              alignSelf: "flex-start",
              border: "0",
              background: "none",
              color: "var(--mute)",
              padding: "0",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Reset conversation
          </button>
        </div>
      </div>
    </aside>
  );
}
