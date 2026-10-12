"use client";
// Report an issue (/app/report). Converted from design/project/DriverIncident.dc.html.
// Jun's flat tire drives the scenario: "Send report" calls store.reportFlat() and the timeline follows the phase.
// Other reports (and Ana's) go to dispatch as a message and stay on this phone.
import { useState } from "react";
import { useScenario, type Estimate } from "@/lib/store";
import { useScenarioFacts } from "@/lib/scenario";
import { DRIVERS } from "./data";
import { ScreenHeader, secondaryBtn } from "./ui";
import { useBack } from "./StopDetail";

type Issue = "flat" | "vehicle" | "late" | "break" | "nothome" | "address";

const ISSUES: { id: Issue; label: string; icon: React.ReactNode }[] = [
  {
    id: "flat",
    label: "Flat tire",
    icon: (
      <>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
  },
  {
    id: "vehicle",
    label: "Vehicle",
    icon: <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />,
  },
  {
    id: "late",
    label: "Running late",
    icon: (
      <>
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2 2M9 2h6" />
      </>
    ),
  },
  {
    id: "break",
    label: "Break",
    icon: (
      <>
        <path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" />
        <path d="M16 10h2a2 2 0 0 1 0 4h-2" />
      </>
    ),
  },
  {
    id: "nothome",
    label: "Not home",
    icon: (
      <>
        <circle cx="10" cy="8" r="4" />
        <path d="M3 20c1-3.5 3.6-5 7-5" />
        <path d="M16 15l5 5M21 15l-5 5" />
      </>
    ),
  },
  {
    id: "address",
    label: "Address",
    icon: (
      <>
        <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 11-5.7" />
        <path d="M15 9l6 6M21 9l-6 6" />
      </>
    ),
  },
];

const ESTIMATES: { id: Estimate; label: string }[] = [
  { id: "under30", label: "Under 30 min" },
  { id: "hour", label: "About 1 hour" },
  { id: "unsure", label: "Not sure" },
];

const tileBase: React.CSSProperties = {
  font: "inherit",
  fontSize: "13px",
  height: "64px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "4px",
  cursor: "pointer",
};
const on: React.CSSProperties = {
  fontWeight: "600",
  border: "2px solid var(--brandInk)",
  background: "var(--brandTint)",
  color: "var(--brandInk)",
};
const off: React.CSSProperties = { border: "1px solid var(--line2)", background: "var(--panel)", color: "var(--ink2)" };
const primary: React.CSSProperties = {
  font: "inherit",
  height: "52px",
  border: "0",
  borderRadius: "10px",
  background: "var(--brandInk)",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};
const timeCol: React.CSSProperties = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: "12px",
  color: "var(--mute)",
  width: "38px",
  flex: "none",
  whiteSpace: "nowrap",
};
const subLine: React.CSSProperties = { fontSize: "12px", color: "var(--mute)", marginTop: "2px" };

function Dots() {
  return (
    <span aria-hidden="true" style={{ display: "inline-flex", gap: "3px", alignItems: "center", height: "14px" }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "99px",
            background: "var(--brand)",
            animation: `hamDots 1.2s ${i * 0.16}s infinite ease-in-out`,
          }}
        />
      ))}
    </span>
  );
}

export default function Report() {
  const f = useScenarioFacts();
  const account = useScenario((s) => s.driverAccount);
  const me = DRIVERS[account];
  const back = useBack("/app/");
  const [localSent, setLocalSent] = useState(false);
  const reportFlat = useScenario((s) => s.reportFlat);
  const backOnRoad = useScenario((s) => s.backOnRoad);

  // Only Jun's flat tire is part of the shared scenario.
  const scenario = account === "jun";
  const sent = (scenario && f.phase !== "before") || localSent;
  const [issue, setIssue] = useState<Issue>("flat");
  const [estimate, setEstimate] = useState<Estimate | null>(null);
  const [note, setNote] = useState(scenario ? "Flat on EDSA near Guadalupe" : "");

  const shownIssue: Issue = sent && !localSent ? "flat" : issue;
  const shownEstimate = sent && !localSent ? (f.report?.estimate ?? "hour") : estimate;
  const canSend = !sent && estimate !== null;

  // "What happened", newest first.
  type Entry = { time: React.ReactNode; text: React.ReactNode; sub?: string; key: string };
  const entries: Entry[] = [];
  if (localSent) {
    entries.push({ key: "got", time: "now", text: "Dispatch got your report", sub: "They'll message you in Inbox if your route changes" });
  } else if (f.thinking) {
    entries.push({
      key: "thinking",
      time: <Dots />,
      text: (
        <>
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2.2" aria-hidden="true">
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
            </svg>
            Dispatch is re-planning your stops…
          </span>
        </>
      ),
      sub: "Dispatch agent · checking who can take them",
    });
  } else if (sent) {
    if (f.phase === "approved") {
      entries.push({
        key: "approved",
        time: "10:44",
        text: "Maria approved: your 3 stops moved",
        sub: "#1042, #1050 to Ana · #1049 to Rico",
      });
      if (f.notifyCustomers) entries.push({ key: "eta", time: "10:44", text: "3 customers sent new ETAs" });
    }
    if (f.phase === "rejected") {
      entries.push({
        key: "rejected",
        time: "10:44",
        text: "Maria kept your stops. Deliver them when you're back on the road.",
        sub: "#1042 and #1049 customers were told you're running late",
      });
    }
    entries.push({
      key: "asked",
      time: "10:33",
      text: f.phase === "incident" ? "Your 3 stops are waiting for Maria's OK" : "Dispatch asked Maria to move your 3 stops",
      sub: "#1042, #1050 and #1049",
    });
    entries.push({ key: "shop", time: "10:32", text: "Nearest vulcanizing shop: 600 m, Kalayaan Ave" });
  }

  const doneBox = !localSent && scenario && f.junBackOnRoad
    ? {
        title: "You're back on the road",
        body:
          f.phase === "approved"
            ? "No stops left today. Dispatch will message you if anything new comes up."
            : "Dispatch knows. Your route is up to date.",
      }
    : null;

  return (
    <div
      style={{
        flex: "1",
        minHeight: "0",
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        background: "var(--panel)",
        color: "var(--ink)",
        fontSize: "14px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ScreenHeader title="Report an issue" sub={`${me.name} · ${me.vehicle}`} onBack={back} />
      <div
        style={{
          padding: "14px 16px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          flex: "1",
          minHeight: "0",
          overflowY: "auto",
        }}
      >
        <div
          role="group"
          aria-label="What's wrong?"
          style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px" }}
        >
          {ISSUES.map((t) => {
            const selected = shownIssue === t.id;
            return (
              <button
                key={t.id}
                aria-pressed={selected}
                disabled={sent && !selected}
                onClick={() => !sent && setIssue(t.id)}
                style={{
                  ...tileBase,
                  ...(selected ? on : off),
                  opacity: sent && !selected ? 0.45 : 1,
                  cursor: sent ? "default" : "pointer",
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  {t.icon}
                </svg>
                {t.label}
              </button>
            );
          })}
        </div>

        {sent && !doneBox && (
          <div
            className="ham-in"
            role="status"
            style={{ border: "1px solid var(--okLine)", background: "var(--okBg)", borderRadius: "10px", padding: "12px 14px" }}
          >
            <div style={{ fontWeight: "600", color: "var(--ok)" }}>
              {localSent ? "Sent · dispatch is on it" : "Reported 10:31 · dispatch is handling it"}
            </div>
            <div style={{ fontSize: "13px", color: "#085D3A", marginTop: "2px" }}>
              {localSent ? "You don't need to call anyone." : "You don't need to call anyone. Fix the tire at your own pace."}
            </div>
          </div>
        )}
        {doneBox && (
          <div
            className="ham-in"
            role="status"
            style={{ border: "1px solid var(--okLine)", background: "var(--okBg)", borderRadius: "10px", padding: "12px 14px" }}
          >
            <div style={{ fontWeight: "600", color: "var(--ok)" }}>{doneBox.title}</div>
            <div style={{ fontSize: "13px", color: "#085D3A", marginTop: "2px" }}>{doneBox.body}</div>
          </div>
        )}

        {
          <div>
            <div style={{ fontSize: "13px", color: "var(--ink2)", marginBottom: "6px" }}>About how long will it take?</div>
            <div role="group" aria-label="About how long will it take?" style={{ display: "flex", gap: "8px" }}>
              {ESTIMATES.map((e) => {
                const selected = shownEstimate === e.id;
                return (
                  <button
                    key={e.id}
                    aria-pressed={selected}
                    disabled={sent && !selected}
                    onClick={() => !sent && setEstimate(e.id)}
                    style={{
                      font: "inherit",
                      fontSize: "13px",
                      height: "40px",
                      flex: "1",
                      minWidth: "0",
                      whiteSpace: "nowrap",
                      borderRadius: "10px",
                      ...(selected ? on : off),
                      opacity: sent && !selected ? 0.45 : 1,
                      cursor: sent ? "default" : "pointer",
                    }}
                  >
                    {e.label}
                  </button>
                );
              })}
            </div>
            {!sent && (
              <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "6px" }}>
                A rough guess is fine. Dispatch uses it to decide whether to move your stops.
              </div>
            )}
          </div>
        }

        {sent && (
          <section aria-label="What happened" aria-live="polite" style={{ border: "1px solid var(--line)", borderRadius: "10px" }}>
            <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", fontWeight: "600" }}>What happened</div>
            <ol
              style={{
                listStyle: "none",
                margin: "0",
                padding: "10px 14px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              {entries.map((e) => (
                <li key={e.key} className="ham-in" style={{ display: "flex", gap: "10px" }}>
                  <span style={timeCol}>{e.time}</span>
                  <span style={{ flex: "1" }}>
                    {e.text}
                    {e.sub && <div style={subLine}>{e.sub}</div>}
                  </span>
                </li>
              ))}
            </ol>
          </section>
        )}

        <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--ink2)" }}>
          Note for dispatch (optional)
          <input
            value={sent ? (f.report?.note ?? "") : note}
            readOnly={sent}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Where are you? Anything dispatch should know?"
            style={{
              font: "inherit",
              height: "44px",
              border: "1px solid var(--line2)",
              borderRadius: "10px",
              padding: "0 12px",
              color: sent ? "var(--ink2)" : "var(--ink)",
              background: sent ? "var(--sub)" : "var(--panel)",
            }}
          />
        </label>
      </div>
      <div
        style={{
          padding: "10px 16px 18px",
          borderTop: "1px solid var(--line)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flex: "none",
        }}
      >
        {!sent ? (
          <>
            <button
              style={{ ...primary, opacity: canSend ? 1 : 0.45, cursor: canSend ? "pointer" : "not-allowed" }}
              disabled={!canSend}
              onClick={() => {
                if (!estimate) return;
                if (scenario && issue === "flat") reportFlat(estimate, note.trim());
                else setLocalSent(true);
              }}
            >
              Send report
            </button>
            {estimate === null && (
              <div style={{ fontSize: "12px", color: "var(--mute)", textAlign: "center", marginTop: "-2px" }}>
                Choose about how long it will take
              </div>
            )}
          </>
        ) : localSent || f.junBackOnRoad ? (
          <a href="/app/" style={primary}>
            Back to today
          </a>
        ) : (
          <button style={primary} onClick={backOnRoad}>
            I&#39;m back on the road
          </button>
        )}
        <a href="tel:+639175550100" style={secondaryBtn}>
          Call Maria
        </a>
      </div>
    </div>
  );
}
