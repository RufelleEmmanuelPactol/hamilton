"use client";
// Converted from design/project/Drivers.dc.html, then wired to the scenario store.
import type { CSSProperties, ReactNode } from "react";
import { useScenarioFacts } from "@/lib/scenario";

type Tone = "ok" | "warn" | "err" | "info" | "neutral";
const toneStyle = (t: Tone): CSSProperties =>
  t === "neutral"
    ? { color: "var(--ink2)", background: "#F2F4F7", border: "1px solid var(--line2)" }
    : { color: `var(--${t})`, background: `var(--${t}Bg)`, border: `1px solid var(--${t}Line)` };
const MONO = "'IBM Plex Mono', monospace";
const link: CSSProperties = { textDecoration: "none", fontWeight: "500", whiteSpace: "nowrap" };

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

  // Today's timeline on Jun's profile, newest first.
  const today: { time: string; text: ReactNode }[] = [];
  if (f.phase === "before") {
    today.push({ time: "Now", text: "On the way to #1042 Mark Tan, BGC · ETA 10:50" });
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
            3 remaining stops moved to Ana and Rico{" "}
            <a href="/app/approvals" style={link}>
              HAM-417 approved
            </a>
          </>
        ),
      });
    } else if (f.phase === "rejected") {
      today.push({
        time: "10:44",
        text: (
          <>
            Keeps his 3 stops; #1042 and #1049 will be late{" "}
            <a href="/app/approvals" style={link}>
              HAM-417 rejected
            </a>
          </>
        ),
      });
    }
    if (!f.thinking) {
      today.push({
        time: "10:33",
        text: (
          <>
            3 remaining stops proposed to Ana and Rico
            {f.ticketOpen && (
              <>
                {" "}
                <a href="/app/approvals" style={link}>
                  Pending
                </a>
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
            Dispatch agent is re-planning his 3 stops
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
  today.push({ time: "10:08", text: "Delivered #1047 Shangri-La · proof verified" });
  today.push({ time: "09:24", text: "Delivered #1041 · photo retake requested once" });
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
        <a
          href="/app/drivers"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 14px",
            textDecoration: "none",
            color: "inherit",
            borderBottom: "1px solid var(--line)",
            background: "var(--brandTint)",
            boxShadow: "inset 3px 0 0 var(--brandInk)",
          }}
        >
          <span
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "99px",
              background: "#2E90FA",
              color: "#fff",
              fontSize: "10px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            JR
          </span>
          <div style={{ flex: "1" }}>
            <div style={{ fontWeight: "600" }}>Jun Reyes</div>
            <div style={{ fontSize: "12px", color: "var(--mute)" }}>Van · 97% success (30d)</div>
          </div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "500",
              borderRadius: "4px",
              padding: "0 5px",
              whiteSpace: "nowrap",
              ...toneStyle(jun.tone),
            }}
          >
            {jun.short}
          </span>
        </a>{" "}
        <a
          href="/app/drivers"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 14px",
            textDecoration: "none",
            color: "inherit",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <span
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "99px",
              background: "#7A5AF8",
              color: "#fff",
              fontSize: "10px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            CM
          </span>
          <div style={{ flex: "1" }}>
            <div style={{ fontWeight: "500" }}>Carlo Mendoza</div>
            <div style={{ fontSize: "12px", color: "var(--mute)" }}>Motorcycle · 94% success (30d)</div>
          </div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "500",
              color: "var(--info)",
              background: "var(--infoBg)",
              border: "1px solid var(--infoLine)",
              borderRadius: "4px",
              padding: "0 5px",
            }}
          >
            En route
          </span>
        </a>{" "}
        <a
          href="/app/drivers"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 14px",
            textDecoration: "none",
            color: "inherit",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <span
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "99px",
              background: "#E91E63",
              color: "#fff",
              fontSize: "10px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            AV
          </span>
          <div style={{ flex: "1" }}>
            <div style={{ fontWeight: "500" }}>Ana Villanueva</div>
            <div style={{ fontSize: "12px", color: "var(--mute)" }}>Sedan · 95% success (30d)</div>
          </div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "500",
              color: "var(--info)",
              background: "var(--infoBg)",
              border: "1px solid var(--infoLine)",
              borderRadius: "4px",
              padding: "0 5px",
            }}
          >
            En route
          </span>
        </a>{" "}
        <a
          href="/app/drivers"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "10px 14px",
            textDecoration: "none",
            color: "inherit",
            borderBottom: "1px solid var(--line)",
          }}
        >
          <span
            style={{
              width: "26px",
              height: "26px",
              borderRadius: "99px",
              background: "#F79009",
              color: "#fff",
              fontSize: "10px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            RS
          </span>
          <div style={{ flex: "1" }}>
            <div style={{ fontWeight: "500" }}>Rico Santos</div>
            <div style={{ fontSize: "12px", color: "var(--mute)" }}>Motorcycle · new, 3 wks · no score yet</div>
          </div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: "500",
              borderRadius: "4px",
              padding: "0 5px",
              whiteSpace: "nowrap",
              ...toneStyle(rico.tone),
            }}
          >
            {rico.label}
          </span>
        </a>{" "}
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
              <div style={{ color: "var(--mute)", marginTop: "2px" }}>L300 van · NBC 4412 · +63 917 555 0141 · joined Sep 2024</div>
            </div>{" "}
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
              Call
            </button>{" "}
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
            >
              Notes <span style={{ fontSize: "11px", color: "var(--mute)" }}>{f.junIncident ? 5 : 4}</span>
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
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>Time-weighted · last 8 weeks · used by Dispatch agent</span>
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
            aria-label="Notes"
            style={{
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              overflow: "hidden",
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
                <button
                  style={{
                    font: "inherit",
                    fontSize: "12px",
                    height: "26px",
                    padding: "0 10px",
                    border: "0",
                    background: "var(--sub)",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  All
                </button>
                <button
                  style={{
                    font: "inherit",
                    fontSize: "12px",
                    height: "26px",
                    padding: "0 10px",
                    border: "0",
                    borderLeft: "1px solid var(--line2)",
                    background: "var(--panel)",
                    color: "var(--ink2)",
                    cursor: "pointer",
                  }}
                >
                  Agent
                </button>
                <button
                  style={{
                    font: "inherit",
                    fontSize: "12px",
                    height: "26px",
                    padding: "0 10px",
                    border: "0",
                    borderLeft: "1px solid var(--line2)",
                    background: "var(--panel)",
                    color: "var(--ink2)",
                    cursor: "pointer",
                  }}
                >
                  Owner
                </button>
              </div>
            </div>{" "}
            <div style={{ display: "flex", gap: "8px", padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
              <input
                aria-label="Add a note"
                placeholder="Add a note for agents and dispatchers…"
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
                style={{
                  font: "inherit",
                  fontWeight: "600",
                  height: "32px",
                  padding: "0 12px",
                  border: "0",
                  borderRadius: "6px",
                  background: "var(--brandInk)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Add note
              </button>
            </div>{" "}
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <tbody>
                {f.junIncident && (
                  <tr>
                    <td
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid var(--line)",
                        width: "70px",
                        verticalAlign: "top",
                      }}
                    >
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "var(--brandInk)",
                          background: "var(--brandTint)",
                          borderRadius: "4px",
                          padding: "1px 6px",
                        }}
                      >
                        Agent
                      </span>
                    </td>
                    <td style={{ padding: "10px 6px", borderBottom: "1px solid var(--line)" }}>
                      <div>Second tire incident in 6 weeks on the L300. Suggest a tire check this week.</div>
                      <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>Evidence: incidents 31 Aug, 12 Oct</div>
                    </td>
                    <td
                      style={{
                        padding: "10px 14px",
                        borderBottom: "1px solid var(--line)",
                        textAlign: "right",
                        color: "var(--mute)",
                        whiteSpace: "nowrap",
                        verticalAlign: "top",
                      }}
                    >
                      Today 10:32
                    </td>
                  </tr>
                )}
                <tr>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "var(--brandInk)",
                        background: "var(--brandTint)",
                        borderRadius: "4px",
                        padding: "1px 6px",
                      }}
                    >
                      Agent
                    </span>
                  </td>
                  <td style={{ padding: "10px 6px", borderBottom: "1px solid var(--line)" }}>
                    <div>Fastest at BGC condo drop-offs; knows lobby and guard routines at Uptown and Serendra.</div>
                    <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>
                      Evidence: 312 BGC deliveries, 99% success
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid var(--line)",
                      textAlign: "right",
                      color: "var(--mute)",
                      whiteSpace: "nowrap",
                      verticalAlign: "top",
                    }}
                  >
                    5 Oct
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "var(--brandInk)",
                        background: "var(--brandTint)",
                        borderRadius: "4px",
                        padding: "1px 6px",
                      }}
                    >
                      Agent
                    </span>
                  </td>
                  <td style={{ padding: "10px 6px", borderBottom: "1px solid var(--line)" }}>
                    <div>On-time drops about 12 pts on Friday afternoons (EDSA). Plan a buffer after 3pm.</div>
                    <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>Evidence: last 8 Fridays</div>
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid var(--line)",
                      textAlign: "right",
                      color: "var(--mute)",
                      whiteSpace: "nowrap",
                      verticalAlign: "top",
                    }}
                  >
                    3 Oct
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "var(--ink2)",
                        background: "#F2F4F7",
                        borderRadius: "4px",
                        padding: "1px 6px",
                      }}
                    >
                      Maria
                    </span>
                  </td>
                  <td style={{ padding: "10px 6px", borderBottom: "1px solid var(--line)" }}>
                    Most trusted with fragile arrangements and weddings.
                  </td>
                  <td
                    style={{
                      padding: "10px 14px",
                      borderBottom: "1px solid var(--line)",
                      textAlign: "right",
                      color: "var(--mute)",
                      whiteSpace: "nowrap",
                      verticalAlign: "top",
                    }}
                  >
                    3 Sep
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "10px 14px", verticalAlign: "top" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "var(--ink2)",
                        background: "#F2F4F7",
                        borderRadius: "4px",
                        padding: "1px 6px",
                      }}
                    >
                      Maria
                    </span>
                  </td>
                  <td style={{ padding: "10px 6px" }}>Prefers to finish by 5pm on Mondays (night class).</td>
                  <td
                    style={{
                      padding: "10px 14px",
                      textAlign: "right",
                      color: "var(--mute)",
                      whiteSpace: "nowrap",
                      verticalAlign: "top",
                    }}
                  >
                    28 Sep
                  </td>
                </tr>
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
