"use client";
import type { ReactNode } from "react";
import { useScenarioFacts } from "@/lib/scenario";
import { minutesBetween, Tag } from "./ui";

const JUN = "#2E90FA";

function Stop({ x, y, n, stroke, fill = "#fff", ink }: { x: number; y: number; n: number; stroke: string; fill?: string; ink: string }) {
  return (
    <>
      <circle cx={x} cy={y} r="10" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text x={x} y={y + 4} fill={ink}>
        {n}
      </text>
    </>
  );
}

function LegendDot({ color, children }: { color: string; children: ReactNode }) {
  return (
    <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
      <span style={{ width: "8px", height: "8px", borderRadius: "99px", background: color }} />
      {children}
    </span>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div
      className="ham-in"
      style={{
        position: "absolute",
        left: "12px",
        top: "12px",
        width: "240px",
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        padding: "10px 12px",
      }}
    >
      {children}
    </div>
  );
}

export function FleetMap() {
  const f = useScenarioFacts();
  const { phase } = f;
  const stalled = phase === "incident" || phase === "rejected";
  const moved = f.moved;
  const enRoute = phase === "before" ? 3 : moved ? 3 : 2;
  const incident = f.junIncident ? 1 : 0;
  const available = moved ? 0 : 1;

  // Jun's three remaining stops: 1 = #1042, 2 = #1050, 3 = #1049. #1042 and #1049 are the at-risk ones.
  const amber = { stroke: "#F79009", fill: "#FFFAEB", ink: "#B54708" };
  const blue = { stroke: JUN, fill: "#fff", ink: "#175CD3" };

  return (
    <section
      aria-label="Live fleet map"
      style={{
        flex: "2 1 520px",
        minWidth: "0",
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "12px",
          padding: "10px 14px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        <h2 style={{ margin: "0", fontSize: "14px", fontWeight: 600, flex: "1" }}>Live fleet</h2>
        <div style={{ display: "flex", gap: "12px", color: "var(--ink2)", fontSize: "12px" }}>
          <LegendDot color="#2E90FA">En route {enRoute}</LegendDot>
          {incident > 0 && <LegendDot color="#F04438">Incident {incident}</LegendDot>}
          {available > 0 && <LegendDot color="#98A2B3">Available {available}</LegendDot>}
        </div>
        <button
          style={{
            font: "inherit",
            fontSize: "12px",
            height: "28px",
            padding: "0 10px",
            border: "1px solid var(--line2)",
            borderRadius: "6px",
            background: "var(--panel)",
            color: "var(--ink2)",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            cursor: "pointer",
          }}
        >
          All drivers (4)
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>
        <div
          role="group"
          aria-label="Map layers"
          style={{ display: "flex", border: "1px solid var(--line2)", borderRadius: "6px", overflow: "hidden" }}
        >
          <button
            style={{
              font: "inherit",
              fontSize: "12px",
              height: "28px",
              padding: "0 10px",
              border: "0",
              background: "var(--sub)",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Routes
          </button>
          <button
            style={{
              font: "inherit",
              fontSize: "12px",
              height: "28px",
              padding: "0 10px",
              border: "0",
              borderLeft: "1px solid var(--line2)",
              background: "var(--panel)",
              color: "var(--ink2)",
              cursor: "pointer",
            }}
          >
            Traffic
          </button>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <svg
          viewBox="0 0 800 440"
          preserveAspectRatio="xMidYMid slice"
          style={{ display: "block", width: "100%", height: "420px" }}
          role="img"
          aria-label="Map of Metro Manila with four driver routes"
        >
          <defs>
            <pattern id="grid" width="22" height="22" patternUnits="userSpaceOnUse">
              <path d="M22 0H0V22" fill="none" stroke="#E6E9EE" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="800" height="440" fill="#F2F4F6" />
          <rect width="800" height="440" fill="url(#grid)" />
          <path d="M0 0 H70 C 90 120, 60 260, 95 440 H0 Z" fill="#DCE6EE" />
          <path d="M95 330 C 220 300, 320 380, 430 330 S 650 300, 800 360" fill="none" stroke="#DCE6EE" strokeWidth="16" />
          <path d="M600 210 l60 -20 l40 30 l-30 40 l-60 -5 z" fill="#E4EDE2" />
          <path d="M300 40 l70 -10 l20 50 l-80 20 z" fill="#E4EDE2" />
          <path d="M440 405 l60 -10 l15 35 h-80 z" fill="#E4EDE2" />
          <path d="M120 440 C 260 400, 380 380, 430 300 S 470 120, 505 0" fill="none" stroke="#FFFFFF" strokeWidth="10" />
          <path d="M120 440 C 260 400, 380 380, 430 300 S 470 120, 505 0" fill="none" stroke="#FCD9A3" strokeWidth="3" />
          <path d="M730 0 C 690 150, 610 300, 565 440" fill="none" stroke="#FFFFFF" strokeWidth="8" />
          <path d="M280 252 C 420 240, 600 262, 800 272" fill="none" stroke="#FFFFFF" strokeWidth="7" />
          <path d="M95 120 C 260 110, 450 95, 800 70" fill="none" stroke="#FFFFFF" strokeWidth="7" />
          <path d="M210 440 L 300 300 L 330 140 L 345 0" fill="none" stroke="#FFFFFF" strokeWidth="6" />
          <path d="M370 440 L 360 300 L 520 160 L 640 0" fill="none" stroke="#FFFFFF" strokeWidth="5" />
          <g fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fontWeight="500" fill="#98A2B3">
            <text x="200" y="412">
              Makati
            </text>
            <text x="482" y="432">
              BGC
            </text>
            <text x="590" y="320">
              Pasig
            </text>
            <text x="430" y="272">
              Mandaluyong
            </text>
            <text x="392" y="206">
              San Juan
            </text>
            <text x="300" y="72">
              Quezon City
            </text>
            <text x="14" y="240" fill="#8AA4B8">
              Manila Bay
            </text>
            <text x="440" y="292" fontSize="10" fill="#B88A3E">
              EDSA
            </text>
          </g>

          {/* Routes */}
          {!moved && (
            <polyline
              points="391,356 487,396 460,424 331,362"
              fill="none"
              stroke={JUN}
              strokeWidth="3"
              strokeDasharray={stalled ? "6 5" : undefined}
              strokeLinecap="round"
            />
          )}
          <polyline points="640,64 624,30 440,223" fill="none" stroke="#7A5AF8" strokeWidth="3" strokeLinecap="round" />
          {moved ? (
            <polyline
              points="500,320 487,396 460,424 526,338 550,281"
              fill="none"
              stroke="#E91E63"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ) : (
            <polyline points="500,320 550,281 526,338" fill="none" stroke="#E91E63" strokeWidth="3" strokeLinecap="round" />
          )}
          {(f.ticketOpen || moved) && (
            <polyline
              points="300,368 331,362"
              fill="none"
              stroke="#F79009"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={moved ? undefined : "4 4"}
            />
          )}

          <g fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" textAnchor="middle">
            {/* Delivered */}
            <circle cx="252" cy="378" r="9" fill="#ECFDF3" stroke="#12B76A" strokeWidth="1.5" />
            <path d="M248 378l3 3 5-6" fill="none" stroke="#067647" strokeWidth="1.6" />
            <circle cx="476" cy="301" r="9" fill="#ECFDF3" stroke="#12B76A" strokeWidth="1.5" />
            <path d="M472 301l3 3 5-6" fill="none" stroke="#067647" strokeWidth="1.6" />
            <circle cx="313" cy="102" r="9" fill="#ECFDF3" stroke="#12B76A" strokeWidth="1.5" />
            <path d="M309 102l3 3 5-6" fill="none" stroke="#067647" strokeWidth="1.6" />
            <circle cx="662" cy="82" r="9" fill="#ECFDF3" stroke="#12B76A" strokeWidth="1.5" />
            <path d="M658 82l3 3 5-6" fill="none" stroke="#067647" strokeWidth="1.6" />

            {moved ? (
              <>
                {/* Ana's re-sequenced route: #1042, #1050, then her own two */}
                <Stop x={487} y={396} n={1} stroke="#E91E63" ink="#C2185B" />
                <Stop x={460} y={424} n={2} stroke="#E91E63" ink="#C2185B" />
                <Stop x={526} y={338} n={3} stroke="#E91E63" ink="#C2185B" />
                <Stop x={550} y={281} n={4} stroke="#E91E63" ink="#C2185B" />
                {/* Rico: #1049 */}
                <Stop x={331} y={362} n={1} stroke="#F79009" ink="#B54708" />
              </>
            ) : (
              <>
                <Stop x={487} y={396} n={1} {...(stalled ? amber : blue)} />
                <Stop x={460} y={424} n={2} {...blue} />
                <Stop x={331} y={362} n={3} {...(stalled ? amber : blue)} />
                <Stop x={550} y={281} n={1} stroke="#E91E63" ink="#C2185B" />
                <Stop x={526} y={338} n={2} stroke="#E91E63" ink="#C2185B" />
              </>
            )}
            <Stop x={624} y={30} n={1} stroke="#7A5AF8" ink="#5925DC" />
            <Stop x={440} y={223} n={2} stroke="#7A5AF8" ink="#5925DC" />
          </g>
          {/* Hub */}
          <rect x="260" y="350" width="24" height="24" rx="5" fill="#101828" />
          <path d="M266 368 L268 356 L276 355 L278 363 L271 368" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
          {/* Drivers */}
          <g fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" textAnchor="middle" fill="#fff">
            <circle cx="391" cy="356" r="13" fill={JUN} stroke="#fff" strokeWidth="2.5" />
            <text x="391" y="360">
              JR
            </text>
            {f.junIncident && (
              <>
                <circle cx="404" cy="343" r="7" fill="#F04438" stroke="#fff" strokeWidth="1.5" />
                <text x="404" y="346.5" fontSize="9" fontWeight="700">
                  !
                </text>
              </>
            )}
            <circle cx="640" cy="64" r="13" fill="#7A5AF8" stroke="#fff" strokeWidth="2.5" />
            <text x="640" y="68">
              CM
            </text>
            <circle cx="500" cy="320" r="13" fill="#E91E63" stroke="#fff" strokeWidth="2.5" />
            <text x="500" y="324">
              AV
            </text>
            <circle cx="300" cy="368" r="13" fill="#F79009" stroke="#fff" strokeWidth="2.5" />
            <text x="300" y="372">
              RS
            </text>
          </g>
        </svg>

        {phase === "incident" && (
          <Callout>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Tag tone="err">Incident</Tag>
              <span style={{ color: "var(--mute)", fontSize: "12px" }}>10:31 · {minutesBetween("10:31", f.clock)} min</span>
            </div>
            <div style={{ fontWeight: 600, marginTop: "6px" }}>Jun Reyes · flat tire</div>
            <div style={{ color: "var(--ink2)", fontSize: "12px", marginTop: "2px" }}>
              {f.thinking ? "EDSA near Guadalupe · re-planning his 3 stops" : "EDSA near Guadalupe · 3 stops awaiting reassignment"}
            </div>
            {f.ticketOpen && (
              <a href="/app/approvals?t=HAM-417" style={{ display: "inline-block", marginTop: "8px", fontWeight: 600, textDecoration: "none" }}>
                Review reassignment
              </a>
            )}
          </Callout>
        )}
        {phase === "approved" && (
          <Callout>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Tag tone="ok">Resolved</Tag>
              <span style={{ color: "var(--mute)", fontSize: "12px" }}>10:44</span>
            </div>
            <div style={{ fontWeight: 600, marginTop: "6px" }}>
              {f.notifyCustomers ? "Stops moved · 3 customers notified" : "Stops moved"}
            </div>
            <div style={{ color: "var(--ink2)", fontSize: "12px", marginTop: "2px" }}>
              Ana takes #1042 and #1050, Rico takes #1049. All on time.
            </div>
          </Callout>
        )}
        {phase === "rejected" && (
          <Callout>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <Tag tone="err">Incident</Tag>
              <span style={{ color: "var(--mute)", fontSize: "12px" }}>10:31 · {minutesBetween("10:31", f.clock)} min</span>
            </div>
            <div style={{ fontWeight: 600, marginTop: "6px" }}>Jun Reyes · flat tire</div>
            <div style={{ color: "var(--ink2)", fontSize: "12px", marginTop: "2px" }}>
              Jun keeps his 3 stops · #1042 and #1049 late · both customers sent an apology
            </div>
          </Callout>
        )}

        <div
          style={{
            position: "absolute",
            right: "12px",
            bottom: "12px",
            display: "flex",
            flexDirection: "column",
            border: "1px solid var(--line)",
            borderRadius: "6px",
            overflow: "hidden",
            background: "var(--panel)",
          }}
        >
          <button
            aria-label="Zoom in"
            style={{
              width: "30px",
              height: "30px",
              border: "0",
              background: "var(--panel)",
              fontSize: "16px",
              color: "var(--ink2)",
              cursor: "pointer",
            }}
          >
            +
          </button>
          <button
            aria-label="Zoom out"
            style={{
              width: "30px",
              height: "30px",
              border: "0",
              borderTop: "1px solid var(--line)",
              background: "var(--panel)",
              fontSize: "16px",
              color: "var(--ink2)",
              cursor: "pointer",
            }}
          >
            −
          </button>
        </div>
      </div>
    </section>
  );
}
