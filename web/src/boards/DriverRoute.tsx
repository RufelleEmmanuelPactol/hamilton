"use client";
// Converted from design/project/DriverRoute.dc.html. The canvas shows Ana's phone after HAM-417 was approved.
// ?d=jun (default) | ana picks whose phone this is. Everything else comes from the scenario store.
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useScenario } from "@/lib/store";
import { useScenarioFacts } from "@/lib/scenario";

export type DriverId = "jun" | "ana";

export function useDriverParam(): DriverId {
  const d = useSearchParams()?.get("d");
  return d === "ana" ? "ana" : "jun";
}

interface Stop {
  order: string;
  name: string;
  address: string;
  item: string;
  window: string;
  eta: string;
  late?: boolean;
}

interface NextItem {
  label: string;
  time: string;
  late?: boolean;
}

const MARK: Stop = {
  order: "#1042",
  name: "Mark Tan",
  address: "Tower 2, Uptown Parksuites, 36th St, BGC",
  item: "Anniversary box",
  window: "Window until 13:00",
  eta: "10:50",
};
const RAFFLES: Stop = {
  order: "#1043",
  name: "Raffles Corporate Ctr",
  address: "Reception, 12th floor, Ortigas Center, Pasig",
  item: "Office desk arrangement",
  window: "Window 13:00–17:00",
  eta: "13:10",
};

const tag: React.CSSProperties = {
  fontSize: "12px",
  color: "var(--ink2)",
  background: "var(--sub)",
  border: "1px solid var(--line)",
  borderRadius: "6px",
  padding: "2px 8px",
  whiteSpace: "nowrap",
};
const actionBtn: React.CSSProperties = {
  font: "inherit",
  fontSize: "12px",
  color: "var(--ink2)",
  background: "none",
  border: "0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  minHeight: "52px",
  cursor: "pointer",
};
const actionRing: React.CSSProperties = {
  width: "36px",
  height: "36px",
  borderRadius: "99px",
  border: "1px solid var(--line2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const primary: React.CSSProperties = {
  font: "inherit",
  width: "100%",
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
  gap: "8px",
  cursor: "pointer",
};
const mono: React.CSSProperties = { fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "nowrap" };

export default function DriverRouteBoard() {
  const driver = useDriverParam();
  const f = useScenarioFacts();
  const backOnRoad = useScenario((s) => s.backOnRoad);
  const [menuOpen, setMenuOpen] = useState(false);

  const isAna = driver === "ana";
  const phase = f.phase;
  const junStopped = !isAna && f.junIncident && !f.junBackOnRoad;

  // ---- What this phone shows -------------------------------------------------------------
  let who: { initials: string; color: string; title: string; sub: string; dot: string };
  let stop: Stop | null = null;
  let stopIndex = "";
  let upNext: NextItem[] = [];
  let instructions: React.ReactNode[] = [];
  let destLabel = "Uptown";
  let routeColor = isAna ? "#E91E63" : "#2E90FA";
  let empty: { title: string; body: string } | null = null;
  let banner: { title: string; body?: string; tone: "ok" | "warn" } | null = null;

  const markInstructions = [
    <>
      <b style={{ color: "var(--ink)" }}>Leave with lobby concierge</b>, confirmed <span style={{ whiteSpace: "nowrap" }}>10:12</span>
    </>,
    "Register at lobby desk. Riders not allowed upstairs.",
    "Get logbook signature. Keep card upright.",
  ];

  if (isAna) {
    if (f.moved) {
      who = { initials: "AV", color: "#E91E63", title: "Ana · 0 of 4 done", sub: "2 stops added from Jun", dot: "#12B76A" };
      stop = { ...MARK, eta: "12:15" };
      stopIndex = "Stop 1 of 4";
      upNext = [
        { label: "2 · Nicole Ramos, Serendra", time: "12:40" },
        { label: "3 · Raffles Corporate, Ortigas", time: "13:25" },
        { label: "4 · Ben Cruz, Pasig", time: "15:20" },
      ];
      instructions = markInstructions;
    } else {
      who = { initials: "AV", color: "#E91E63", title: "Ana · 0 of 2 done", sub: "Sedan · on time", dot: "#12B76A" };
      stop = RAFFLES;
      stopIndex = "Stop 1 of 2";
      destLabel = "Ortigas";
      upNext = [{ label: "2 · Ben Cruz, Pasig", time: "15:20" }];
      instructions = ["Sign in at the lobby, then take the B elevators.", "Ask for Joy at reception. Keep the vase upright."];
    }
  } else {
    // Jun Reyes
    const done = phase === "approved" ? "2 of 2 done" : "2 of 5 done";
    who = {
      initials: "JR",
      color: "#2E90FA",
      title: `Jun · ${done}`,
      sub: junStopped ? "Stopped · flat tire" : phase === "approved" ? "Van · no stops left" : "Van · on time",
      dot: junStopped ? "#F79009" : "#12B76A",
    };
    if (phase === "before") {
      stop = MARK;
      stopIndex = "Stop 3 of 5";
      upNext = [
        { label: "4 · Nicole Ramos, Serendra", time: "11:25" },
        { label: "5 · Sam Ocampo, Makati", time: "12:10" },
      ];
      instructions = markInstructions;
    } else if (phase === "approved") {
      routeColor = "transparent";
      empty = f.junBackOnRoad
        ? {
            title: "You're back on the road",
            body: "No stops left today.",
          }
        : {
            title: "Your 3 stops moved to Ana and Rico",
            body: "Fix the tire, then tap I'm back on the road.",
          };
      upNext = [
        { label: "#1042 Mark Tan → Ana", time: "12:15" },
        { label: "#1050 Nicole Ramos → Ana", time: "12:40" },
        { label: "#1049 Sam Ocampo → Rico", time: "11:05" },
      ];
    } else {
      // incident or rejected: Jun still has his 3 stops, 2 of them now late.
      stop = { ...MARK, eta: "13:40", late: true };
      stopIndex = "Stop 3 of 5";
      upNext = [
        { label: "4 · Sam Ocampo, Makati", time: "13:55", late: true },
        { label: "5 · Nicole Ramos, Serendra", time: "14:20" },
      ];
      instructions = markInstructions;
    }
    if (phase !== "before") {
      if (phase === "approved") {
        banner = f.junBackOnRoad
          ? null
          : { title: "Flat tire reported 10:31", body: "Maria approved the new plan at 10:44.", tone: "ok" };
      } else if (phase === "rejected") {
        banner = {
          title: "Maria kept your stops",
          body: f.junBackOnRoad ? "Customers told you're running late." : "Deliver them when you're back on the road.",
          tone: "warn",
        };
      } else if (!f.junBackOnRoad) {
        banner = {
          title: "Flat tire reported 10:31 · dispatch notified",
          body: f.thinking ? "Dispatch is re-planning your stops…" : "Your 3 stops are waiting for Maria's OK.",
          tone: "ok",
        };
      } else {
        banner = { title: "You're back on the road", body: "Your 3 stops are still waiting for Maria's OK.", tone: "ok" };
      }
    }
  }

  const showRoute = !empty;
  const chip = junStopped ? (
    <>
      <b>Stopped</b> <span style={{ color: "var(--mute)" }}>· EDSA, Guadalupe</span>
    </>
  ) : isAna && !f.moved ? (
    <>
      <b>9 min</b> <span style={{ color: "var(--mute)" }}>· 3.4 km</span>
    </>
  ) : (
    <>
      <b>4 min</b> <span style={{ color: "var(--mute)" }}>· 1.2 km</span>
    </>
  );
  const reportPulse = !isAna && phase === "before";
  // Primary: Jun waiting on the tire → "I'm back on the road". Otherwise complete the next delivery.
  const showBackOnRoad = junStopped;

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        boxSizing: "border-box",
        overflow: "hidden",
        position: "relative",
        fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
        background: "#EEF1F4",
        color: "var(--ink)",
        fontSize: "14px",
      }}
    >
      <style>{`
        @keyframes hamRing{0%{box-shadow:0 0 0 0 rgba(180,35,24,.35)}70%{box-shadow:0 0 0 9px rgba(180,35,24,0)}100%{box-shadow:0 0 0 0 rgba(180,35,24,0)}}
        .ham-report-pulse{animation:hamRing 1.8s ease-out infinite}
      `}</style>
      <svg
        viewBox="0 0 390 420"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", left: "0", top: "0", width: "100%", height: "420px", display: "block" }}
        role="img"
        aria-label={showRoute ? `Map showing route to ${destLabel === "Uptown" ? "Uptown Parksuites" : "Ortigas Center"}` : "Map"}
      >
        <defs>
          <pattern id="g" width="26" height="26" patternUnits="userSpaceOnUse">
            <path d="M26 0H0V26" fill="none" stroke="#E2E6EB" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="390" height="420" fill="#F2F4F6" />
        <rect width="390" height="420" fill="url(#g)" />
        <path d="M240 300 l70 -12 l26 50 l-80 14 z" fill="#E1EBDF" />
        <path d="M-10 250 C 90 230, 190 270, 400 220" fill="none" stroke="#fff" strokeWidth="12" />
        <path d="M150 -10 C 160 120, 140 260, 170 430" fill="none" stroke="#fff" strokeWidth="10" />
        <path d="M150 -10 C 160 120, 140 260, 170 430" fill="none" stroke="#FCD9A3" strokeWidth="3" />
        <path d="M-10 120 L 400 90" fill="none" stroke="#fff" strokeWidth="7" />
        <path d="M290 -10 L 300 430" fill="none" stroke="#fff" strokeWidth="7" />
        {showRoute && (
          <>
            <path
              d="M90 330 C 140 300, 160 270, 165 240 S 230 180, 285 160"
              fill="none"
              stroke={routeColor}
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={junStopped ? "2 10" : undefined}
              opacity={junStopped ? 0.6 : 1}
            />
            <path d="M285 132 c -11 0 -18 8 -18 17 c 0 13 18 29 18 29 s 18 -16 18 -29 c 0 -9 -7 -17 -18 -17 z" fill="#101828" />
            <circle cx="285" cy="149" r="6" fill="#fff" />
          </>
        )}
        <circle cx="90" cy="330" r="11" fill={junStopped ? "#F79009" : isAna ? "#E91E63" : "#2E90FA"} opacity="0.18" />
        <circle cx="90" cy="330" r="7" fill={junStopped ? "#F79009" : isAna ? "#E91E63" : "#2E90FA"} stroke="#fff" strokeWidth="3" />
        <g fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#98A2B3" fontWeight="500">
          <text x="176" y="60">
            {destLabel === "Uptown" ? "32nd St" : "ADB Ave"}
          </text>
          <text x="300" y="250">
            {destLabel}
          </text>
          <text x="20" y="262">
            {destLabel === "Uptown" ? "McKinley Pkwy" : "Ortigas Ave"}
          </text>
        </g>
      </svg>
      <div style={{ position: "absolute", left: "12px", right: "12px", top: "14px", display: "flex", gap: "8px" }}>
        <div
          style={{
            flex: "1",
            minWidth: "0",
            height: "44px",
            background: "var(--panel)",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(16,24,40,0.12)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "0 12px",
          }}
        >
          <span
            style={{
              width: "26px",
              height: "26px",
              flex: "none",
              borderRadius: "99px",
              background: who.color,
              color: "#fff",
              fontSize: "10px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {who.initials}
          </span>
          <div style={{ flex: "1", minWidth: "0" }}>
            <div style={{ fontWeight: "600", fontSize: "13px" }}>{who.title}</div>
            <div style={{ fontSize: "11px", color: "var(--mute)" }}>{who.sub}</div>
          </div>
          <span style={{ width: "8px", height: "8px", borderRadius: "99px", background: who.dot }}></span>
        </div>
        <div style={{ position: "relative" }}>
          <button
            aria-label="Menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((o) => !o)}
            style={{
              width: "44px",
              height: "44px",
              border: "0",
              borderRadius: "10px",
              background: "var(--panel)",
              boxShadow: "0 2px 8px rgba(16,24,40,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#344054" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
          {menuOpen && (
            <div
              role="menu"
              className="ham-in"
              style={{
                position: "absolute",
                right: "0",
                top: "50px",
                zIndex: 5,
                width: "210px",
                background: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "10px",
                boxShadow: "0 8px 24px rgba(16,24,40,0.16)",
                padding: "6px",
                fontSize: "13px",
              }}
            >
              <a role="menuitem" href="/driver/report" onClick={() => setMenuOpen(false)} style={menuItem}>
                Report an issue
              </a>
              <a role="menuitem" href="/driver/proof" onClick={() => setMenuOpen(false)} style={menuItem}>
                Proof of delivery
              </a>
              <div style={{ height: "1px", background: "var(--line)", margin: "4px 2px" }} />
              <a
                role="menuitem"
                href={isAna ? "/driver/?d=jun" : "/driver/?d=ana"}
                onClick={() => setMenuOpen(false)}
                style={{ ...menuItem, color: "var(--mute)" }}
              >
                Switch to {isAna ? "Jun" : "Ana"}&#39;s phone (demo)
              </a>
            </div>
          )}
        </div>
      </div>
      <section
        aria-label={empty ? "Your route" : "Next stop"}
        style={{
          position: "absolute",
          left: "0",
          right: "0",
          bottom: "0",
          maxHeight: "calc(100% - 70px)",
          minHeight: "min(470px, calc(100% - 70px))",
          background: "var(--panel)",
          borderRadius: "16px 16px 0 0",
          boxShadow: "0 -4px 16px rgba(16,24,40,0.10)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {showRoute && (
          <div
            style={{
              position: "absolute",
              right: "12px",
              bottom: "calc(100% + 16px)",
              background: "var(--panel)",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(16,24,40,0.12)",
              padding: "6px 10px",
              fontSize: "12px",
            }}
          >
            {chip}
          </div>
        )}
        <div
          style={{
            width: "36px",
            height: "4px",
            flex: "none",
            borderRadius: "99px",
            background: "var(--line2)",
            alignSelf: "center",
            margin: "8px 0 6px",
          }}
        ></div>
        <div style={{ flex: "1", minHeight: "0", overflowY: "auto", display: "flex", flexDirection: "column" }}>
          {banner && (
            <a
              href="/driver/report"
              className="ham-in"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                margin: "2px 14px 10px",
                padding: "10px 12px",
                borderRadius: "10px",
                textDecoration: "none",
                border: `1px solid var(--${banner.tone === "ok" ? "okLine" : "warnLine"})`,
                background: `var(--${banner.tone === "ok" ? "okBg" : "warnBg"})`,
              }}
            >
              <span style={{ flex: "1", minWidth: "0" }}>
                <span style={{ display: "block", fontWeight: "600", fontSize: "13px", color: `var(--${banner.tone})` }}>
                  {banner.title}
                </span>
                {banner.body && (
                  <span
                    style={{
                      display: "block",
                      fontSize: "12px",
                      color: banner.tone === "ok" ? "#085D3A" : "#93370D",
                      marginTop: "2px",
                    }}
                  >
                    {banner.body}
                  </span>
                )}
              </span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--mute)" strokeWidth="2" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </a>
          )}

          {empty ? (
            <>
              <div style={{ padding: "8px 18px 14px", borderBottom: "1px solid var(--line)" }}>
                <h1 style={{ margin: "0", fontSize: "20px", fontWeight: "600" }}>{empty.title}</h1>
                <div style={{ color: "var(--ink2)", marginTop: "4px", lineHeight: "1.4" }}>{empty.body}</div>
              </div>
              <div style={{ padding: "10px 18px", flex: "1" }}>
                <div style={{ fontSize: "12px", fontWeight: "600", color: "var(--mute)", marginBottom: "6px" }}>Moved by dispatch</div>
                {upNext.map((u) => (
                  <div
                    key={u.label}
                    style={{ display: "flex", justifyContent: "space-between", gap: "8px", padding: "4px 0", color: "var(--ink2)" }}
                  >
                    <span>{u.label}</span>
                    <span style={mono}>{u.time}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            stop && (
              <>
                <div style={{ padding: "4px 18px 12px", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--mute)" }}>
                    <span style={mono}>{stop.order}</span>
                    <span style={{ whiteSpace: "nowrap" }}>· {stopIndex}</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        fontWeight: "600",
                        whiteSpace: "nowrap",
                        color: stop.late ? "var(--err)" : "var(--ok)",
                      }}
                    >
                      ETA {stop.eta} · {stop.late ? "late" : "on time"}
                    </span>
                  </div>
                  <h1 style={{ margin: "6px 0 0", fontSize: "20px", fontWeight: "600" }}>{stop.name}</h1>
                  <div style={{ color: "var(--ink2)", marginTop: "2px" }}>{stop.address}</div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
                    <span style={tag}>{stop.item}</span>
                    <span style={tag}>{stop.window}</span>
                  </div>
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                    padding: "10px 12px",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <button style={actionBtn}>
                    <span style={actionRing}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M3 11l18-8-8 18-2-8z" />
                      </svg>
                    </span>
                    Navigate
                  </button>
                  <button style={actionBtn}>
                    <span style={actionRing}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                      </svg>
                    </span>
                    Call
                  </button>
                  <button style={actionBtn}>
                    <span style={actionRing}>
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M4 5h16v11H9l-5 4z" />
                      </svg>
                    </span>
                    Message
                  </button>
                  <a
                    href="/driver/report"
                    style={{
                      fontSize: "12px",
                      fontWeight: reportPulse ? "600" : undefined,
                      color: "#B42318",
                      textDecoration: "none",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: "4px",
                      minHeight: "52px",
                    }}
                  >
                    <span
                      className={reportPulse ? "ham-report-pulse" : undefined}
                      style={{
                        ...actionRing,
                        border: "1px solid #FECDCA",
                        background: reportPulse ? "#FEF3F2" : undefined,
                      }}
                    >
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <path d="M12 3l9 16H3z" />
                        <path d="M12 10v4M12 17v.5" />
                      </svg>
                    </span>
                    Report
                  </a>
                </div>
                <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      fontWeight: "600",
                      color: "var(--mute)",
                    }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2.2" aria-hidden="true">
                      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                    </svg>
                    Delivery instructions
                    <span style={{ marginLeft: "auto", fontSize: "11px", fontWeight: "400", whiteSpace: "nowrap" }}>
                      Auto-generated from chat
                    </span>
                  </div>
                  <ul
                    style={{
                      margin: "8px 0 0",
                      padding: "0",
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                      color: "var(--ink2)",
                    }}
                  >
                    {instructions.map((x, i) =>
                      typeof x === "string" ? (
                        <li key={i} style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "var(--mute)" }}>•</span>
                          {x}
                        </li>
                      ) : (
                        <li key={i} style={{ display: "flex", gap: "8px" }}>
                          <span style={{ color: "var(--ok)", fontWeight: "700" }}>✓</span>
                          <span>{x}</span>
                        </li>
                      ),
                    )}
                  </ul>
                </div>
                <div style={{ padding: "10px 18px", flex: "1" }}>
                  <div style={{ fontSize: "12px", fontWeight: "600", color: "var(--mute)", marginBottom: "6px" }}>Up next</div>
                  {upNext.map((u) => (
                    <div
                      key={u.label}
                      style={{ display: "flex", justifyContent: "space-between", gap: "8px", padding: "4px 0", color: "var(--ink2)" }}
                    >
                      <span>{u.label}</span>
                      <span style={{ ...mono, color: u.late ? "var(--err)" : undefined }}>{u.time}</span>
                    </div>
                  ))}
                </div>
              </>
            )
          )}
        </div>
        <div style={{ padding: "10px 16px 18px", borderTop: "1px solid var(--line)", flex: "none" }}>
          {showBackOnRoad ? (
            <button style={primary} onClick={backOnRoad}>
              I&#39;m back on the road
            </button>
          ) : empty ? (
            <a
              href="/driver/report"
              style={{ ...primary, background: "var(--panel)", color: "var(--ink2)", border: "1px solid var(--line2)" }}
            >
              See what happened
            </a>
          ) : (
            <a href="/driver/proof" style={primary}>
              Arrived · complete delivery
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

const menuItem: React.CSSProperties = {
  display: "block",
  padding: "9px 10px",
  borderRadius: "6px",
  color: "var(--ink2)",
  textDecoration: "none",
  whiteSpace: "nowrap",
};
