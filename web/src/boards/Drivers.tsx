"use client";
// Converted from design/project/Drivers.dc.html, then wired to the scenario store.
import { useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useScenarioFacts } from "@/lib/scenario";
import { findPerson } from "@/lib/people";
import { openPerson } from "@/components/Overlays";
import { AgentLink, Chip, OrderLink, PersonLink, TicketLink } from "@/components/Entity";
import { Sparkle } from "@/boards/overview/ui";

type Tone = "ok" | "warn" | "err" | "info" | "neutral";
const toneStyle = (t: Tone): CSSProperties =>
  t === "neutral"
    ? { color: "var(--ink2)", background: "#F2F4F7", border: "1px solid var(--line2)" }
    : { color: `var(--${t})`, background: `var(--${t}Bg)`, border: `1px solid var(--${t}Line)` };
const MONO = "'IBM Plex Mono', monospace";
const pill: CSSProperties = { fontSize: "11px", fontWeight: "500", borderRadius: "4px", padding: "0 5px", whiteSpace: "nowrap" };
const avatar = (color: string): CSSProperties => ({
  width: "26px",
  height: "26px",
  flex: "none",
  borderRadius: "99px",
  background: color,
  color: "#fff",
  fontSize: "10px",
  fontWeight: "600",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

interface Note {
  by: "agent" | "owner";
  text: string;
  evidence?: string;
  when: string;
}
const NOTES: Note[] = [
  { by: "agent", text: "Fastest at BGC condo drop-offs; knows lobby and guard routines at Uptown and Serendra.", evidence: "312 BGC deliveries, 99% success", when: "5 Oct" },
  { by: "agent", text: "On-time drops about 12 pts on Friday afternoons (EDSA). Plan a buffer after 3pm.", evidence: "last 8 Fridays", when: "3 Oct" },
  { by: "owner", text: "Most trusted with fragile arrangements and weddings.", when: "3 Sep" },
  { by: "owner", text: "Prefers to finish by 5pm on Mondays (night class).", when: "28 Sep" },
];

export default function DriversBoard() {
  const f = useScenarioFacts();
  // Jun's status, short (list) and long (profile).
  const jun: { short: string; long: string; tone: Tone } =
    f.phase === "before"
      ? { short: "En route", long: "En route", tone: "info" }
      : f.junBackOnRoad
        ? { short: "Back on road", long: "Back on the road", tone: "ok" }
        : f.phase === "approved"
          ? { short: "Stops moved", long: "Incident · stops moved", tone: "warn" }
          : { short: "Incident", long: "Incident · flat tire 10:31", tone: "err" };
  const rico: { label: string; tone: Tone } = f.moved ? { label: "En route", tone: "info" } : { label: "Available", tone: "neutral" };
  const roster: { name: string; initials: string; color: string; sub: string; status: string; tone: Tone }[] = [
    { name: "Jun Reyes", initials: "JR", color: "#2E90FA", sub: "Van · 97% success (30d)", status: jun.short, tone: jun.tone },
    { name: "Carlo Mendoza", initials: "CM", color: "#7A5AF8", sub: "Motorcycle · 94% success (30d)", status: "En route", tone: "info" },
    { name: "Ana Villanueva", initials: "AV", color: "#E91E63", sub: "Sedan · 95% success (30d)", status: "En route", tone: "info" },
    { name: "Rico Santos", initials: "RS", color: "#F79009", sub: "Motorcycle · new, 3 wks · no score yet", status: rico.label, tone: rico.tone },
  ];
  const [query, setQuery] = useState("");
  const shown = roster.filter((d) => d.name.toLowerCase().includes(query.trim().toLowerCase()));

  const [source, setSource] = useState<"all" | "agent" | "owner">("all");
  const [added, setAdded] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");
  const notesRef = useRef<HTMLElement>(null);
  const notes: Note[] = [
    ...added,
    ...(f.junIncident
      ? [{ by: "agent" as const, text: "Second tire incident in 6 weeks on the L300. Suggest a tire check this week.", evidence: "incidents 31 Aug, 12 Oct", when: "Today 10:32" }]
      : []),
    ...NOTES,
  ];
  const visibleNotes = notes.filter((n) => source === "all" || n.by === source);
  const addNote = () => {
    if (!draft.trim()) return;
    setAdded((a) => [{ by: "owner", text: draft.trim(), when: `Today ${f.clock}` }, ...a]);
    setDraft("");
  };

  // Today's timeline on Jun's profile, newest first.
  const today: { time: string; text: ReactNode }[] = [];
  if (f.phase === "before") {
    today.push({
      time: "Now",
      text: (
        <>
          On the way to <OrderLink id="#1042" /> <PersonLink name="Mark Tan" />, BGC · ETA 10:50
        </>
      ),
    });
  } else {
    if (f.junBackOnRoad) {
      today.push({
        time: "Now",
        text: f.moved ? "Back on the road · tire fixed, no stops left today" : "Back on the road · heading to his 3 remaining stops",
      });
    }
    if (f.phase === "approved") {
      today.push({
        time: "10:44",
        text: (
          <>
            3 remaining stops moved to <PersonLink name="Ana Villanueva">Ana</PersonLink> and <PersonLink name="Rico Santos">Rico</PersonLink> · <TicketLink id="HAM-417" /> approved
          </>
        ),
      });
    } else if (f.phase === "rejected") {
      today.push({
        time: "10:44",
        text: (
          <>
            Keeps his 3 stops; <OrderLink id="#1042" /> and <OrderLink id="#1049" /> will be late · <TicketLink id="HAM-417" /> rejected
          </>
        ),
      });
    }
    if (!f.thinking) {
      today.push({
        time: "10:33",
        text: (
          <>
            <AgentLink name="Dispatch agent" /> proposed moving his 3 remaining stops to <PersonLink name="Ana Villanueva">Ana</PersonLink> and <PersonLink name="Rico Santos">Rico</PersonLink>
            {f.ticketOpen && (
              <>
                {" "}
                · <TicketLink id="HAM-417" /> waiting for you
              </>
            )}
          </>
        ),
      });
    } else {
      today.push({
        time: "Now",
        text: (
          <span style={{ color: "var(--brandInk)" }}>
            <AgentLink name="Dispatch agent" /> is re-planning his 3 stops
            <span aria-hidden="true" style={{ animation: "hamDots 1.2s infinite" }}>
              …
            </span>
          </span>
        ),
      });
    }
    today.push({ time: "10:32", text: "Nearest vulcanizing shop sent to him (600 m, Kalayaan Ave)" });
    const est = f.report?.estimate === "under30" ? "under 30 min" : f.report?.estimate === "unsure" ? "not sure how long" : "about 1 hour";
    today.push({
      time: "10:31",
      text: (
        <>
          <span style={{ fontSize: "11px", fontWeight: "600", borderRadius: "4px", padding: "0 5px", ...toneStyle("err") }}>Report</span>{" "}
          Flat tire · &#34;EDSA near Guadalupe&#34; · {est}
        </>
      ),
    });
  }
  today.push({
    time: "10:08",
    text: (
      <>
        Delivered <OrderLink id="#1047" /> Shangri-La · proof verified
      </>
    ),
  });
  today.push({
    time: "09:24",
    text: (
      <>
        Delivered <OrderLink id="#1041" /> <PersonLink name="Liza Santos" /> · photo retake requested once
      </>
    ),
  });
  today.push({ time: "08:02", text: "Shift started · vehicle check passed" });
  const progress = f.moved ? "2 of 2 delivered · 3 moved" : "2 of 5 delivered";

  return (
    <>
      {" "}
      <section
        aria-label="Driver list"
        style={{
          flex: "1 1 240px",
          maxWidth: "260px",
          background: "var(--panel)",
          borderRight: "1px solid var(--line)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {" "}
        <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)", display: "flex", alignItems: "center" }}>
          <h1 style={{ margin: "0", fontSize: "15px", fontWeight: "600", flex: "1" }}>Drivers</h1>
          <span style={{ color: "var(--mute)" }}>4</span>
        </div>{" "}
        <div style={{ padding: "8px 10px", borderBottom: "1px solid var(--line)" }}>
          <input
            aria-label="Filter drivers"
            placeholder="Filter drivers"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              font: "inherit",
              width: "100%",
              boxSizing: "border-box",
              height: "30px",
              border: "1px solid var(--line2)",
              borderRadius: "6px",
              padding: "0 10px",
            }}
          />
        </div>{" "}
        {shown.map((d) => {
          const selected = d.initials === "JR";
          const row: CSSProperties = {
            font: "inherit",
            width: "100%",
            textAlign: "left",
            color: "inherit",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 14px",
            border: 0,
            borderBottom: "1px solid var(--line)",
            background: selected ? "var(--brandTint)" : "var(--panel)",
            boxShadow: selected ? "inset 3px 0 0 var(--brandInk)" : undefined,
            cursor: selected ? "default" : "pointer",
          };
          const body = (
            <>
              <span style={avatar(d.color)}>{d.initials}</span>
              <span style={{ flex: "1", minWidth: 0, display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: selected ? "600" : "500" }}>{d.name}</span>
                <span style={{ fontSize: "12px", color: "var(--mute)" }}>{d.sub}</span>
              </span>
              <span style={{ ...pill, ...toneStyle(d.tone) }}>{d.status}</span>
            </>
          );
          return selected ? (
            <div key={d.initials} aria-current="true" style={row}>
              {body}
            </div>
          ) : (
            <button
              key={d.initials}
              type="button"
              className="drv-row"
              aria-label={`${d.name}: open profile`}
              onClick={(e) => {
                const p = findPerson(d.name);
                if (p) openPerson(p, e.currentTarget);
              }}
              style={row}
            >
              {body}
            </button>
          );
        })}
        {shown.length === 0 && <div style={{ padding: "12px 14px", color: "var(--mute)" }}>No drivers match</div>}
        <style>{`.drv-row:hover{background:var(--sub)!important}`}</style>
      </section>{" "}
      <main style={{ flex: "999 1 560px", minWidth: "0", display: "flex", flexDirection: "column" }}>
        {" "}
        <div style={{ background: "var(--panel)", borderBottom: "1px solid var(--line)", padding: "16px 24px 0" }}>
          {" "}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "14px" }}>
            {" "}
            <span
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "99px",
                background: "#2E90FA",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              JR
            </span>{" "}
            <div style={{ flex: "1 1 240px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <h2 style={{ margin: "0", fontSize: "18px", fontWeight: "600" }}>Jun Reyes</h2>
                <span
                  style={{
                    fontSize: "12px",
                    fontWeight: "500",
                    borderRadius: "99px",
                    padding: "1px 8px",
                    whiteSpace: "nowrap",
                    ...toneStyle(jun.tone),
                  }}
                >
                  {jun.long}
                </span>
              </div>
              <span className="ham-chips" style={{ marginTop: "8px" }}>
                <Chip k="Vehicle">L300 van · NBC 4412</Chip>
                <Chip k="Phone">+63 917 555 0141</Chip>
                <Chip k="Joined">Sep 2024</Chip>
              </span>
            </div>{" "}
            <a
              href="tel:+639175550141"
              style={{
                display: "inline-flex",
                alignItems: "center",
                textDecoration: "none",
                font: "inherit",
                height: "32px",
                padding: "0 12px",
                border: "1px solid var(--line2)",
                borderRadius: "6px",
                background: "var(--panel)",
                color: "var(--ink2)",
                cursor: "pointer",
              }}
            >
              Call
            </a>{" "}
            <button
              style={{
                font: "inherit",
                height: "32px",
                padding: "0 12px",
                border: "1px solid var(--line2)",
                borderRadius: "6px",
                background: "var(--panel)",
                color: "var(--ink2)",
                cursor: "pointer",
              }}
            >
              Mark available
            </button>{" "}
          </div>{" "}
          <div role="tablist" aria-label="Driver sections" style={{ display: "flex", gap: "20px", marginTop: "14px" }}>
            {" "}
            <button
              role="tab"
              aria-selected="true"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                font: "inherit",
                fontWeight: "600",
                color: "var(--brandInk)",
                background: "none",
                border: "0",
                borderBottom: "2px solid var(--brandInk)",
                padding: "0 2px 10px",
                cursor: "pointer",
              }}
            >
              Overview
            </button>{" "}
            <button
              role="tab"
              aria-selected="false"
              style={{
                font: "inherit",
                color: "var(--ink2)",
                background: "none",
                border: "0",
                borderBottom: "2px solid transparent",
                padding: "0 2px 10px",
                cursor: "pointer",
              }}
            >
              Today&#39;s route
            </button>{" "}
            <button
              role="tab"
              aria-selected="false"
              style={{
                font: "inherit",
                color: "var(--ink2)",
                background: "none",
                border: "0",
                borderBottom: "2px solid transparent",
                padding: "0 2px 10px",
                cursor: "pointer",
              }}
            >
              Incidents <span style={{ fontSize: "11px", color: "var(--mute)" }}>{f.junIncident ? 2 : 1}</span>
            </button>{" "}
            <button
              role="tab"
              aria-selected="false"
              style={{
                font: "inherit",
                color: "var(--ink2)",
                background: "none",
                border: "0",
                borderBottom: "2px solid transparent",
                padding: "0 2px 10px",
                cursor: "pointer",
              }}
              onClick={() => notesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              Notes <span style={{ fontSize: "11px", color: "var(--mute)" }}>{notes.length}</span>
            </button>{" "}
          </div>{" "}
        </div>{" "}
        <div style={{ padding: "20px 24px", display: "flex", flexDirection: "column", gap: "16px" }}>
          {" "}
          <section aria-label="Performance" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "8px" }}>
            {" "}
            <div
              style={{
                padding: "10px 14px",
                borderBottom: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "14px", fontWeight: "600", flex: "1" }}>Performance</h3>
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>
                Last 8 weeks · used by the <AgentLink name="Dispatch agent" />
              </span>
            </div>{" "}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))" }}>
              {" "}
              <div style={{ padding: "12px 14px", borderRight: "1px solid var(--line)" }}>
                <div style={{ color: "var(--mute)" }}>Success rate</div>
                <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "4px" }}>97%</div>
                <div style={{ fontSize: "12px", color: "var(--mute)" }}>fleet 93%</div>
              </div>{" "}
              <div style={{ padding: "12px 14px", borderRight: "1px solid var(--line)" }}>
                <div style={{ color: "var(--mute)" }}>On-time rate</div>
                <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "4px" }}>93%</div>
                <div style={{ fontSize: "12px", color: "var(--warn)" }}>Fri PM 81%</div>
              </div>{" "}
              <div style={{ padding: "12px 14px", borderRight: "1px solid var(--line)" }}>
                <div style={{ color: "var(--mute)" }}>Deliveries (30d)</div>
                <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "4px" }}>412</div>
                <div style={{ fontSize: "12px", color: "var(--mute)" }}>13.7 / day</div>
              </div>{" "}
              <div style={{ padding: "12px 14px" }}>
                <div style={{ color: "var(--mute)" }}>Avg. time at stop</div>
                <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "4px" }}>6.1 min</div>
                <div style={{ fontSize: "12px", color: "var(--mute)" }}>fleet 6.8 min</div>
              </div>{" "}
            </div>{" "}
          </section>{" "}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
            {" "}
            <section
              aria-label="Area familiarity"
              style={{
                flex: "1 1 340px",
                minWidth: "0",
                background: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              {" "}
              <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                <h3 style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>Area familiarity</h3>
              </div>{" "}
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "var(--sub)", textAlign: "left", color: "var(--mute)", fontSize: "12px" }}>
                    <th style={{ padding: "7px 14px", fontWeight: "500" }}>Area</th>
                    <th style={{ padding: "7px 10px", fontWeight: "500" }}>Score</th>
                    <th style={{ padding: "7px 10px", fontWeight: "500", textAlign: "right" }}>Stops (8w)</th>
                    <th style={{ padding: "7px 14px", fontWeight: "500", textAlign: "right" }}>Success</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ padding: "8px 14px" }}>Makati</td>
                    <td style={{ padding: "8px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "90px", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
                          <div style={{ width: "95%", height: "6px", background: "var(--brand)", borderRadius: "3px" }}></div>
                        </div>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>0.95</span>
                      </div>
                    </td>
                    <td style={{ padding: "8px 10px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>288</td>
                    <td style={{ padding: "8px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>98%</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ padding: "8px 14px" }}>BGC</td>
                    <td style={{ padding: "8px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "90px", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
                          <div style={{ width: "92%", height: "6px", background: "var(--brand)", borderRadius: "3px" }}></div>
                        </div>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>0.92</span>
                      </div>
                    </td>
                    <td style={{ padding: "8px 10px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>312</td>
                    <td style={{ padding: "8px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>99%</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ padding: "8px 14px" }}>Mandaluyong</td>
                    <td style={{ padding: "8px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "90px", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
                          <div style={{ width: "60%", height: "6px", background: "#F48FB1", borderRadius: "3px" }}></div>
                        </div>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>0.60</span>
                      </div>
                    </td>
                    <td style={{ padding: "8px 10px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>64</td>
                    <td style={{ padding: "8px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>95%</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ padding: "8px 14px" }}>Pasig</td>
                    <td style={{ padding: "8px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "90px", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
                          <div style={{ width: "55%", height: "6px", background: "#F48FB1", borderRadius: "3px" }}></div>
                        </div>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>0.55</span>
                      </div>
                    </td>
                    <td style={{ padding: "8px 10px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>41</td>
                    <td style={{ padding: "8px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>93%</td>
                  </tr>
                  <tr style={{ borderTop: "1px solid var(--line)" }}>
                    <td style={{ padding: "8px 14px" }}>Quezon City</td>
                    <td style={{ padding: "8px 10px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "90px", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
                          <div style={{ width: "30%", height: "6px", background: "#D0D5DD", borderRadius: "3px" }}></div>
                        </div>
                        <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>0.30</span>
                      </div>
                    </td>
                    <td style={{ padding: "8px 10px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>12</td>
                    <td style={{ padding: "8px 14px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>83%</td>
                  </tr>
                </tbody>
              </table>{" "}
            </section>{" "}
            <section
              aria-label="Today"
              style={{
                flex: "1 1 300px",
                minWidth: "0",
                background: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
              }}
            >
              {" "}
              <div
                style={{
                  padding: "10px 14px",
                  borderBottom: "1px solid var(--line)",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h3 style={{ margin: "0", fontSize: "14px", fontWeight: "600", flex: "1" }}>Today</h3>
                <span style={{ color: "var(--mute)" }}>{progress}</span>
              </div>{" "}
              <ol
                style={{
                  listStyle: "none",
                  margin: "0",
                  padding: "12px 14px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {today.map((e, i) => (
                  <li key={i} style={{ display: "flex", gap: "10px" }}>
                    <span style={{ fontFamily: MONO, color: "var(--mute)", width: "40px", flex: "none" }}>{e.time}</span>
                    <span style={{ flex: "1" }}>{e.text}</span>
                  </li>
                ))}
              </ol>{" "}
            </section>{" "}
          </div>{" "}
          <section
            ref={notesRef}
            aria-label="Notes"
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              overflow: "hidden",
              scrollMarginTop: "16px",
            }}
          >
            {" "}
            <div
              style={{
                padding: "10px 14px",
                borderBottom: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <h3 style={{ margin: "0", fontSize: "14px", fontWeight: "600", flex: "1" }}>Notes</h3>
              <div
                role="group"
                aria-label="Note source"
                style={{ display: "flex", border: "1px solid var(--line2)", borderRadius: "6px", overflow: "hidden" }}
              >
                {(
                  [
                    ["all", "All"],
                    ["agent", "Agent"],
                    ["owner", "Owner"],
                  ] as const
                ).map(([k, label], i) => (
                  <button
                    key={k}
                    type="button"
                    aria-pressed={source === k}
                    onClick={() => setSource(k)}
                    style={{
                    font: "inherit",
                    fontSize: "12px",
                    height: "26px",
                    padding: "0 10px",
                    border: "0",
                    borderLeft: i ? "1px solid var(--line2)" : "0",
                    background: source === k ? "var(--sub)" : "var(--panel)",
                    color: source === k ? "var(--ink)" : "var(--ink2)",
                    fontWeight: source === k ? "600" : undefined,
                    cursor: "pointer",
                  }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>{" "}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addNote();
              }}
              style={{ display: "flex", gap: "8px", padding: "10px 14px", borderBottom: "1px solid var(--line)" }}
            >
              <input
                aria-label="Add a note"
                placeholder="Add a note for agents and dispatchers…"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                style={{
                  font: "inherit",
                  flex: "1",
                  minWidth: "0",
                  height: "32px",
                  border: "1px solid var(--line2)",
                  borderRadius: "6px",
                  padding: "0 10px",
                }}
              />
              <button
                type="submit"
                disabled={!draft.trim()}
                style={{
                  font: "inherit",
                  fontWeight: "600",
                  height: "32px",
                  padding: "0 12px",
                  border: "0",
                  borderRadius: "6px",
                  background: "var(--brandInk)",
                  color: "#fff",
                  cursor: draft.trim() ? "pointer" : "default",
                  opacity: draft.trim() ? 1 : 0.5,
                }}
              >
                Add note
              </button>
            </form>{" "}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {visibleNotes.map((n, i) => {
                  const last = i === visibleNotes.length - 1;
                  const cell: CSSProperties = { borderBottom: last ? undefined : "1px solid var(--line)", verticalAlign: "top" };
                  return (
                    <tr key={`${n.when}-${n.text}`}>
                      <td style={{ ...cell, padding: "10px 14px", width: "70px" }}>
                        {n.by === "agent" ? (
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: "600",
                              color: "var(--brandInk)",
                              background: "var(--brandTint)",
                              borderRadius: "4px",
                              padding: "1px 6px",
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "3px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <Sparkle size={10} color="currentColor" /> Agent
                          </span>
                        ) : (
                          <span
                            style={{
                              fontSize: "11px",
                              fontWeight: "600",
                              color: "var(--ink2)",
                              background: "#F2F4F7",
                              borderRadius: "4px",
                              padding: "1px 6px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <PersonLink name="Maria Santos">Maria</PersonLink>
                          </span>
                        )}
                      </td>
                      <td style={{ ...cell, padding: "10px 6px" }}>
                        <div>{n.text}</div>
                        {n.evidence && (
                          <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>
                            Evidence: {n.evidence} · by the <AgentLink name="Dispatch agent" />
                          </div>
                        )}
                      </td>
                      <td style={{ ...cell, padding: "10px 14px", textAlign: "right", color: "var(--mute)", whiteSpace: "nowrap" }}>{n.when}</td>
                    </tr>
                  );
                })}
                {visibleNotes.length === 0 && (
                  <tr>
                    <td colSpan={3} style={{ padding: "12px 14px", color: "var(--mute)" }}>
                      No notes from this source yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>{" "}
            <div
              style={{
                padding: "8px 14px",
                background: "var(--sub)",
                borderTop: "1px solid var(--line)",
                fontSize: "12px",
                color: "var(--mute)",
              }}
            >
              Shared with drivers · used for planning, not pay or discipline
            </div>{" "}
          </section>{" "}
        </div>{" "}
      </main>{" "}
    </>
  );
}
