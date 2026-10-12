/* eslint-disable */
// Converted from design/project/Plan.dc.html. Holes: show_r, show_a, show_c, show_j, t_j, hide_j, t_c, hide_c, t_a, hide_a, t_r, hide_r
export default function PlanBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
  return (
    <>
      {" "}
      <main
        style={{
          flex: "999 1 640px",
          minWidth: "0",
          padding: "20px 24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}
      >
        {" "}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
          {" "}
          <div style={{ flex: "1 1 320px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <h1 style={{ margin: "0", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.01em" }}>Dispatch</h1>
            </div>
            <div style={{ color: "var(--mute)", marginTop: "2px" }}>
              Today&#39;s plan was published at 07:52 after you approved it. Stops update live as drivers deliver.
            </div>
          </div>{" "}
          <button
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
            Re-plan remaining stops
          </button>{" "}
          <a
            href="/app/approvals"
            style={{
              height: "34px",
              padding: "0 14px",
              borderRadius: "6px",
              background: "var(--brandInk)",
              color: "#fff",
              fontWeight: "600",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            Review HAM-417
          </a>{" "}
        </div>{" "}
        <div
          role="tablist"
          aria-label="Plan day"
          style={{ display: "flex", gap: "4px", borderBottom: "1px solid var(--line)", marginTop: "-6px" }}
        >
          <button
            role="tab"
            aria-selected="true"
            style={{
              font: "inherit",
              height: "32px",
              padding: "0 12px",
              border: "0",
              borderBottom: "2px solid var(--brandInk)",
              background: "none",
              color: "var(--ink)",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            <span style={{ width: "7px", height: "7px", borderRadius: "99px", background: "#12B76A" }}></span>Today · Mon 12 Oct
            <span style={{ fontSize: "11px", color: "var(--ok)", fontWeight: "500" }}>Live</span>
          </button>
          <button
            role="tab"
            aria-selected="false"
            style={{
              font: "inherit",
              height: "32px",
              padding: "0 12px",
              border: "0",
              borderBottom: "2px solid transparent",
              background: "none",
              color: "var(--ink2)",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              cursor: "pointer",
            }}
          >
            Tomorrow · Tue 13 Oct{" "}
            <span
              style={{
                fontSize: "11px",
                fontWeight: "500",
                color: "var(--warn)",
                background: "var(--warnBg)",
                border: "1px solid var(--warnLine)",
                borderRadius: "4px",
                padding: "0 6px",
                whiteSpace: "nowrap",
              }}
            >
              Draft · awaiting approval
            </span>
          </button>
        </div>{" "}
        <section
          aria-label="Progress summary"
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: "8px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          }}
        >
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Delivered</div>
            <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px" }}>
              5 <span style={{ fontSize: "13px", color: "var(--mute)", fontWeight: "400" }}>of 13</span>
            </div>
          </div>
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>On time</div>
            <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px" }}>
              100% <span style={{ fontSize: "13px", color: "var(--mute)", fontWeight: "400" }}>5 of 5</span>
            </div>
          </div>
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Being reassigned</div>
            <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px", color: "var(--warn)" }}>
              3 <span style={{ fontSize: "13px", color: "var(--mute)", fontWeight: "400" }}>Jun · flat tire</span>
            </div>
          </div>
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Distance</div>
            <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px" }}>
              24 km <span style={{ fontSize: "13px", color: "var(--mute)", fontWeight: "400" }}>of 61 planned</span>
            </div>
          </div>
          <div style={{ padding: "12px 16px" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Window conflicts</div>
            <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px", color: "var(--ok)" }}>
              0 <span style={{ fontSize: "13px", color: "var(--mute)", fontWeight: "400" }}></span>
            </div>
          </div>
        </section>{" "}
        <section aria-label="Agent notes" style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "8px" }}>
          {" "}
          <div
            style={{
              padding: "10px 14px",
              borderBottom: "1px solid var(--line)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2" aria-hidden="true">
              <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
            </svg>
            <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>Why this plan</h2>
            <span style={{ fontSize: "12px", color: "var(--mute)" }}>from the 07:48 draft</span>
          </div>{" "}
          <ul style={{ margin: "0", padding: "10px 14px 12px 32px", color: "var(--ink2)", lineHeight: "1.7" }}>
            <li>
              <b>#1047 event arch</b> is oversized, so it stays on the only van (Jun).
            </li>
            <li>
              <b>#1044 Ben Cruz</b> has 2 failed attempts on record. A confirmation message goes out before Ana is dispatched.
            </li>
            <li>
              <b>Rico</b> is in cold-start (3 weeks). He gets one compact Makati stop with clear access notes.
            </li>
            <li>
              <b>1 open slot</b> is left on Carlo&#39;s Quezon City afternoon for same-day orders (you average 1.4 a day). If nothing comes
              in by 14:00, the slot is released.
            </li>
            <li>
              <b>WA-0912</b> (WhatsApp) is in review. Approving it adds it to Rico&#39;s afternoon.
            </li>
          </ul>{" "}
        </section>{" "}
        <section
          aria-label="Routes"
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
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              padding: "10px 14px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600", flex: "1" }}>Routes</h2>
            <div
              role="group"
              aria-label="View"
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
                  fontWeight: "600",
                  cursor: "pointer",
                }}
              >
                Map + table
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
                Table only
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
                Timeline
              </button>
            </div>
          </div>{" "}
          <div style={{ position: "relative", height: "540px", borderBottom: "1px solid var(--line)", overflow: "hidden" }}>
            <svg
              viewBox="0 0 800 440"
              preserveAspectRatio="xMidYMid slice"
              style={{ position: "absolute", inset: "0", width: "100%", height: "100%" }}
              role="img"
              aria-label="Planned routes for each driver from the Makati hub"
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
            </svg>
            {v.show_r && (
              <>
                <svg
                  viewBox="0 0 800 440"
                  preserveAspectRatio="xMidYMid slice"
                  style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }}
                  aria-hidden="true"
                >
                  <g style={{ pointerEvents: "auto" }}>
                    <polyline
                      points="260,368 232,346"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="6"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <polyline
                      points="260,368 232,346"
                      fill="none"
                      stroke="#F79009"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <g>
                      <title>Rico · stop 1 · #1039</title>
                      <circle cx="232" cy="346" r="9" fill="#F79009" stroke="#fff" strokeWidth="2" />
                      <text
                        x="232"
                        y="349.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        1
                      </text>
                    </g>
                  </g>
                </svg>
              </>
            )}
            {v.show_a && (
              <>
                <svg
                  viewBox="0 0 800 440"
                  preserveAspectRatio="xMidYMid slice"
                  style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }}
                  aria-hidden="true"
                >
                  <g style={{ pointerEvents: "auto" }}>
                    <polyline
                      points="260,368 592,302 636,334"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="6"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <polyline
                      points="260,368 592,302 636,334"
                      fill="none"
                      stroke="#E91E63"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <g>
                      <title>Ana · stop 1 · #1044</title>
                      <circle cx="592" cy="302" r="9" fill="#E91E63" stroke="#fff" strokeWidth="2" />
                      <text
                        x="592"
                        y="305.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        1
                      </text>
                    </g>
                    <g>
                      <title>Ana · stop 2 · #1043</title>
                      <circle cx="636" cy="334" r="9" fill="#E91E63" stroke="#fff" strokeWidth="2" />
                      <text
                        x="636"
                        y="337.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        2
                      </text>
                    </g>
                  </g>
                </svg>
              </>
            )}
            {v.show_c && (
              <>
                <svg
                  viewBox="0 0 800 440"
                  preserveAspectRatio="xMidYMid slice"
                  style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }}
                  aria-hidden="true"
                >
                  <g style={{ pointerEvents: "auto" }}>
                    <polyline
                      points="260,368 290,96 352,58 384,112 408,196"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="6"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <polyline
                      points="260,368 290,96 352,58 384,112 408,196"
                      fill="none"
                      stroke="#7A5AF8"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <g>
                      <title>Carlo · stop 1 · #1045</title>
                      <circle cx="290" cy="96" r="9" fill="#7A5AF8" stroke="#fff" strokeWidth="2" />
                      <text
                        x="290"
                        y="99.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        1
                      </text>
                    </g>
                    <g>
                      <title>Carlo · stop 2 · #1046</title>
                      <circle cx="352" cy="58" r="9" fill="#7A5AF8" stroke="#fff" strokeWidth="2" />
                      <text
                        x="352"
                        y="61.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        2
                      </text>
                    </g>
                    <g>
                      <title>Carlo · stop 3 · #1051</title>
                      <circle cx="384" cy="112" r="9" fill="#7A5AF8" stroke="#fff" strokeWidth="2" />
                      <text
                        x="384"
                        y="115.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        3
                      </text>
                    </g>
                    <g>
                      <title>Carlo · stop 4 · #1048</title>
                      <circle cx="408" cy="196" r="9" fill="#7A5AF8" stroke="#fff" strokeWidth="2" />
                      <text
                        x="408"
                        y="199.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        4
                      </text>
                    </g>
                    <g>
                      <title>Open slot held for same-day orders</title>
                      <circle cx="372" cy="172" r="9" fill="#fff" stroke="#7A5AF8" strokeWidth="2" strokeDasharray="3 2" />
                      <text
                        x="372"
                        y="175.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="11"
                        fontWeight="600"
                        fill="#7A5AF8"
                      >
                        +
                      </text>
                    </g>
                  </g>
                </svg>
              </>
            )}
            {v.show_j && (
              <>
                <svg
                  viewBox="0 0 800 440"
                  preserveAspectRatio="xMidYMid slice"
                  style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }}
                  aria-hidden="true"
                >
                  <g style={{ pointerEvents: "auto" }}>
                    <polyline
                      points="260,368 215,388 455,282 482,398 528,410 305,398"
                      fill="none"
                      stroke="#fff"
                      strokeWidth="6"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <polyline
                      points="260,368 215,388 455,282 482,398 528,410 305,398"
                      fill="none"
                      stroke="#2E90FA"
                      strokeWidth="3"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    <g>
                      <title>Jun · stop 1 · #1041</title>
                      <circle cx="215" cy="388" r="9" fill="#2E90FA" stroke="#fff" strokeWidth="2" />
                      <text
                        x="215"
                        y="391.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        1
                      </text>
                    </g>
                    <g>
                      <title>Jun · stop 2 · #1047</title>
                      <circle cx="455" cy="282" r="9" fill="#2E90FA" stroke="#fff" strokeWidth="2" />
                      <text
                        x="455"
                        y="285.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        2
                      </text>
                    </g>
                    <g>
                      <title>Jun · stop 3 · #1042</title>
                      <circle cx="482" cy="398" r="9" fill="#2E90FA" stroke="#fff" strokeWidth="2" />
                      <text
                        x="482"
                        y="401.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        3
                      </text>
                    </g>
                    <g>
                      <title>Jun · stop 4 · #1050</title>
                      <circle cx="528" cy="410" r="9" fill="#2E90FA" stroke="#fff" strokeWidth="2" />
                      <text
                        x="528"
                        y="413.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        4
                      </text>
                    </g>
                    <g>
                      <title>Jun · stop 5 · #1049</title>
                      <circle cx="305" cy="398" r="9" fill="#2E90FA" stroke="#fff" strokeWidth="2" />
                      <text
                        x="305"
                        y="401.5"
                        textAnchor="middle"
                        fontFamily="IBM Plex Sans, sans-serif"
                        fontSize="10"
                        fontWeight="600"
                        fill="#fff"
                      >
                        5
                      </text>
                    </g>
                  </g>
                </svg>
              </>
            )}
            <svg
              viewBox="0 0 800 440"
              preserveAspectRatio="xMidYMid slice"
              style={{ position: "absolute", inset: "0", width: "100%", height: "100%", pointerEvents: "none" }}
              aria-hidden="true"
            >
              <rect x="251" y="359" width="18" height="18" rx="4" fill="#101828" stroke="#fff" strokeWidth="2" />
              <path d="M255 369l5 -4 5 4v5h-10z" fill="#fff" />
              <text x="274" y="360" fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fontWeight="600" fill="#101828">
                Hub
              </text>
            </svg>
            <div
              style={{
                position: "absolute",
                top: "12px",
                left: "12px",
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                maxWidth: "75%",
              }}
            >
              {v.show_j && (
                <>
                  <button
                    onClick={h.t_j}
                    aria-pressed="true"
                    style={{
                      font: "inherit",
                      fontSize: "12px",
                      height: "28px",
                      padding: "0 10px",
                      border: "1px solid var(--line2)",
                      borderRadius: "6px",
                      background: "var(--panel)",
                      color: "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                      boxShadow: "0 1px 2px rgba(16,24,40,.06)",
                    }}
                  >
                    <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#2E90FA" }}></span>
                    <b style={{ fontWeight: "600" }}>Jun</b>
                    <span style={{ color: "var(--mute)" }}>5 stops · 19 km</span>
                  </button>
                </>
              )}
              {v.hide_j && (
                <>
                  <button
                    onClick={h.t_j}
                    aria-pressed="false"
                    style={{
                      font: "inherit",
                      fontSize: "12px",
                      height: "28px",
                      padding: "0 10px",
                      border: "1px dashed var(--line2)",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,.75)",
                      color: "var(--mute)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "3px",
                        border: "1.5px solid #2E90FA",
                        boxSizing: "border-box",
                      }}
                    ></span>
                    Jun · hidden
                  </button>
                </>
              )}
              {v.show_c && (
                <>
                  <button
                    onClick={h.t_c}
                    aria-pressed="true"
                    style={{
                      font: "inherit",
                      fontSize: "12px",
                      height: "28px",
                      padding: "0 10px",
                      border: "1px solid var(--line2)",
                      borderRadius: "6px",
                      background: "var(--panel)",
                      color: "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                      boxShadow: "0 1px 2px rgba(16,24,40,.06)",
                    }}
                  >
                    <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#7A5AF8" }}></span>
                    <b style={{ fontWeight: "600" }}>Carlo</b>
                    <span style={{ color: "var(--mute)" }}>4 + slot · 22 km</span>
                  </button>
                </>
              )}
              {v.hide_c && (
                <>
                  <button
                    onClick={h.t_c}
                    aria-pressed="false"
                    style={{
                      font: "inherit",
                      fontSize: "12px",
                      height: "28px",
                      padding: "0 10px",
                      border: "1px dashed var(--line2)",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,.75)",
                      color: "var(--mute)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "3px",
                        border: "1.5px solid #7A5AF8",
                        boxSizing: "border-box",
                      }}
                    ></span>
                    Carlo · hidden
                  </button>
                </>
              )}
              {v.show_a && (
                <>
                  <button
                    onClick={h.t_a}
                    aria-pressed="true"
                    style={{
                      font: "inherit",
                      fontSize: "12px",
                      height: "28px",
                      padding: "0 10px",
                      border: "1px solid var(--line2)",
                      borderRadius: "6px",
                      background: "var(--panel)",
                      color: "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                      boxShadow: "0 1px 2px rgba(16,24,40,.06)",
                    }}
                  >
                    <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#E91E63" }}></span>
                    <b style={{ fontWeight: "600" }}>Ana</b>
                    <span style={{ color: "var(--mute)" }}>2 stops · 14 km</span>
                  </button>
                </>
              )}
              {v.hide_a && (
                <>
                  <button
                    onClick={h.t_a}
                    aria-pressed="false"
                    style={{
                      font: "inherit",
                      fontSize: "12px",
                      height: "28px",
                      padding: "0 10px",
                      border: "1px dashed var(--line2)",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,.75)",
                      color: "var(--mute)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "3px",
                        border: "1.5px solid #E91E63",
                        boxSizing: "border-box",
                      }}
                    ></span>
                    Ana · hidden
                  </button>
                </>
              )}
              {v.show_r && (
                <>
                  <button
                    onClick={h.t_r}
                    aria-pressed="true"
                    style={{
                      font: "inherit",
                      fontSize: "12px",
                      height: "28px",
                      padding: "0 10px",
                      border: "1px solid var(--line2)",
                      borderRadius: "6px",
                      background: "var(--panel)",
                      color: "var(--ink)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                      boxShadow: "0 1px 2px rgba(16,24,40,.06)",
                    }}
                  >
                    <span style={{ width: "10px", height: "10px", borderRadius: "3px", background: "#F79009" }}></span>
                    <b style={{ fontWeight: "600" }}>Rico</b>
                    <span style={{ color: "var(--mute)" }}>1 stop · 3 km</span>
                  </button>
                </>
              )}
              {v.hide_r && (
                <>
                  <button
                    onClick={h.t_r}
                    aria-pressed="false"
                    style={{
                      font: "inherit",
                      fontSize: "12px",
                      height: "28px",
                      padding: "0 10px",
                      border: "1px dashed var(--line2)",
                      borderRadius: "6px",
                      background: "rgba(255,255,255,.75)",
                      color: "var(--mute)",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      cursor: "pointer",
                    }}
                  >
                    <span
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "3px",
                        border: "1.5px solid #F79009",
                        boxSizing: "border-box",
                      }}
                    ></span>
                    Rico · hidden
                  </button>
                </>
              )}
            </div>
            <div
              style={{
                position: "absolute",
                top: "12px",
                right: "12px",
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                alignItems: "center",
                background: "rgba(255,255,255,.92)",
                border: "1px solid var(--line)",
                borderRadius: "6px",
                padding: "5px 10px",
                fontSize: "12px",
                color: "var(--ink2)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "14px",
                    height: "14px",
                    borderRadius: "99px",
                    background: "var(--ink2)",
                    color: "#fff",
                    fontSize: "9px",
                    fontWeight: "600",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  1
                </span>
                Stop order
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "12px",
                    height: "12px",
                    borderRadius: "99px",
                    border: "1.5px dashed var(--ink2)",
                    boxSizing: "border-box",
                  }}
                ></span>
                Same-day slot
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "12px", height: "12px", borderRadius: "3px", background: "#101828" }}></span>Hub
              </span>
            </div>
          </div>{" "}
          <div style={{ overflowX: "auto" }}>
            {" "}
            <table style={{ width: "100%", minWidth: "1000px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--sub)", textAlign: "left", color: "var(--mute)", fontSize: "12px" }}>
                  <th
                    style={{
                      padding: "8px 10px",
                      fontWeight: "500",
                      borderBottom: "1px solid var(--line)",
                      paddingLeft: "14px",
                      width: "30px",
                    }}
                  >
                    #
                  </th>
                  <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Status</th>
                  <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Order</th>
                  <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Recipient</th>
                  <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Area</th>
                  <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Window</th>
                  <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Time</th>
                  <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Instructions for driver</th>
                  <th
                    style={{
                      padding: "8px 10px",
                      fontWeight: "500",
                      borderBottom: "1px solid var(--line)",
                      paddingRight: "14px",
                    }}
                  >
                    Driver
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "#FCFCFD" }}>
                  <td colSpan={9} style={{ padding: "8px 14px", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "99px",
                          background: "#2E90FA",
                          color: "#fff",
                          fontSize: "9px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        JR
                      </span>
                      <b>Jun Reyes</b>
                      <span style={{ color: "var(--mute)" }}>L300 van</span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                          color: "var(--err)",
                          background: "var(--errBg)",
                          border: "1px solid var(--errLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Incident · flat tire 10:31
                      </span>
                      <span style={{ flex: "1" }}></span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "120px", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
                          <div style={{ width: "40%", height: "6px", background: "#2E90FA", borderRadius: "3px" }}></div>
                        </div>
                        <span style={{ color: "var(--ink2)", fontWeight: "500" }}>2 of 5 delivered</span>
                        <span style={{ color: "var(--mute)" }}>· 19 km planned</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>1</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--ok)",
                        background: "var(--okBg)",
                        border: "1px solid var(--okLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Delivered
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                    }}
                  >
                    #1041
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>Liza Santos</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>Makati</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                    }}
                  >
                    09:00–12:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--mute)" }}>09:24</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "var(--line2)" }}>—</span>
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ color: "var(--mute)" }}>Jun</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>2</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--ok)",
                        background: "var(--okBg)",
                        border: "1px solid var(--okLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Delivered
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                    }}
                  >
                    #1047
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>Shangri-La events</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>Mandaluyong</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                    }}
                  >
                    10:00–12:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--mute)" }}>10:08</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    Oversized, needs the van · loading bay B
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ color: "var(--mute)" }}>Jun</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>3</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <a href="/app/approvals" style={{ textDecoration: "none" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                          color: "var(--warn)",
                          background: "var(--warnBg)",
                          border: "1px solid var(--warnLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Moving to Ana · HAM-417
                      </span>
                    </a>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    #1042
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>Mark Tan</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>BGC</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    10:00–13:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ color: "var(--mute)" }}>—</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    Can leave with the lobby concierge
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <select
                      aria-label="Driver for #1042"
                      style={{
                        font: "inherit",
                        height: "28px",
                        border: "1px solid var(--line2)",
                        borderRadius: "6px",
                        padding: "0 6px",
                        background: "var(--panel)",
                      }}
                    >
                      <option selected>Jun</option>
                      <option>Carlo</option>
                      <option>Ana</option>
                      <option>Rico</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>4</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <a href="/app/approvals" style={{ textDecoration: "none" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                          color: "var(--warn)",
                          background: "var(--warnBg)",
                          border: "1px solid var(--warnLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Moving to Ana · HAM-417
                      </span>
                    </a>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    #1050
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>Nicole Ramos</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>BGC</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    11:00–15:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ color: "var(--mute)" }}>—</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "var(--line2)" }}>—</span>
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <select
                      aria-label="Driver for #1050"
                      style={{
                        font: "inherit",
                        height: "28px",
                        border: "1px solid var(--line2)",
                        borderRadius: "6px",
                        padding: "0 6px",
                        background: "var(--panel)",
                      }}
                    >
                      <option selected>Jun</option>
                      <option>Carlo</option>
                      <option>Ana</option>
                      <option>Rico</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>5</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <a href="/app/approvals" style={{ textDecoration: "none" }}>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                          color: "var(--warn)",
                          background: "var(--warnBg)",
                          border: "1px solid var(--warnLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Moving to Rico · HAM-417
                      </span>
                    </a>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    #1049
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>Sam Ocampo</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>Makati</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    09:00–13:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ color: "var(--mute)" }}>—</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "var(--line2)" }}>—</span>
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <select
                      aria-label="Driver for #1049"
                      style={{
                        font: "inherit",
                        height: "28px",
                        border: "1px solid var(--line2)",
                        borderRadius: "6px",
                        padding: "0 6px",
                        background: "var(--panel)",
                      }}
                    >
                      <option selected>Jun</option>
                      <option>Carlo</option>
                      <option>Ana</option>
                      <option>Rico</option>
                    </select>
                  </td>
                </tr>
                <tr style={{ background: "#FCFCFD" }}>
                  <td colSpan={9} style={{ padding: "8px 14px", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "99px",
                          background: "#7A5AF8",
                          color: "#fff",
                          fontSize: "9px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        CM
                      </span>
                      <b>Carlo Mendoza</b>
                      <span style={{ color: "var(--mute)" }}>Motorcycle</span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                          color: "var(--info)",
                          background: "var(--infoBg)",
                          border: "1px solid var(--infoLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        En route
                      </span>
                      <span style={{ flex: "1" }}></span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "120px", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
                          <div style={{ width: "50%", height: "6px", background: "#7A5AF8", borderRadius: "3px" }}></div>
                        </div>
                        <span style={{ color: "var(--ink2)", fontWeight: "500" }}>2 of 4 delivered</span>
                        <span style={{ color: "var(--mute)" }}>· 22 km planned</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>1</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--ok)",
                        background: "var(--okBg)",
                        border: "1px solid var(--okLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Delivered
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                    }}
                  >
                    #1045
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>Café Morato</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>Quezon City</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                    }}
                  >
                    08:30–11:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--mute)" }}>08:52</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "var(--line2)" }}>—</span>
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ color: "var(--mute)" }}>Carlo</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>2</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--ok)",
                        background: "var(--okBg)",
                        border: "1px solid var(--okLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Delivered
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                    }}
                  >
                    #1046
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>Anna Garcia</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>Quezon City</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                    }}
                  >
                    10:00–16:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--mute)" }}>10:36</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    <span style={{ color: "var(--line2)" }}>—</span>
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ color: "var(--mute)" }}>Carlo</span>
                  </td>
                </tr>
                <tr style={{ background: "#F5F8FF" }}>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>3</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--info)",
                        background: "var(--infoBg)",
                        border: "1px solid var(--infoLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Next stop
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    #1051
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>Prof. Diaz</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>Quezon City</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    11:00–15:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "nowrap" }}>ETA 11:05</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    Call the recipient when you arrive
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <select
                      aria-label="Driver for #1051"
                      style={{
                        font: "inherit",
                        height: "28px",
                        border: "1px solid var(--line2)",
                        borderRadius: "6px",
                        padding: "0 6px",
                        background: "var(--panel)",
                      }}
                    >
                      <option>Jun</option>
                      <option selected>Carlo</option>
                      <option>Ana</option>
                      <option>Rico</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>4</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--ink2)",
                        background: "#F2F4F7",
                        border: "1px solid var(--line2)",
                        borderRadius: "4px",
                        padding: "0 6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Upcoming
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    #1048
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>Grace Lee</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>San Juan</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    13:00–18:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "nowrap" }}>ETA 13:45</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    Same building as #1052, deliver both together
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <select
                      aria-label="Driver for #1048"
                      style={{
                        font: "inherit",
                        height: "28px",
                        border: "1px solid var(--line2)",
                        borderRadius: "6px",
                        padding: "0 6px",
                        background: "var(--panel)",
                      }}
                    >
                      <option>Jun</option>
                      <option selected>Carlo</option>
                      <option>Ana</option>
                      <option>Rico</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>5</td>
                  <td colSpan={8} style={{ padding: "7px 10px", borderBottom: "1px solid var(--line)" }}>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        alignItems: "center",
                        gap: "10px",
                        border: "1px dashed var(--line2)",
                        borderRadius: "6px",
                        padding: "6px 10px",
                        color: "var(--mute)",
                      }}
                    >
                      <span style={{ fontWeight: "500", color: "var(--ink2)" }}>Open slot</span>
                      <span>Held for same-day orders · Quezon City / San Juan · 14:00–16:00</span>
                      <span style={{ marginLeft: "auto", fontSize: "12px" }}>Released at 14:00 if unused</span>
                    </div>
                  </td>
                </tr>
                <tr style={{ background: "#FCFCFD" }}>
                  <td colSpan={9} style={{ padding: "8px 14px", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "99px",
                          background: "#E91E63",
                          color: "#fff",
                          fontSize: "9px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        AV
                      </span>
                      <b>Ana Villanueva</b>
                      <span style={{ color: "var(--mute)" }}>Sedan</span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                          color: "var(--info)",
                          background: "var(--infoBg)",
                          border: "1px solid var(--infoLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        En route
                      </span>
                      <span style={{ flex: "1" }}></span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "120px", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
                          <div style={{ width: "0%", height: "6px", background: "#E91E63", borderRadius: "3px" }}></div>
                        </div>
                        <span style={{ color: "var(--ink2)", fontWeight: "500" }}>0 of 2 delivered</span>
                        <span style={{ color: "var(--mute)" }}>· 14 km planned</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr style={{ background: "#F5F8FF" }}>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>1</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--info)",
                        background: "var(--infoBg)",
                        border: "1px solid var(--infoLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Next stop
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    #1043
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>Raffles Corporate Ctr</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>Pasig</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    13:00–17:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "nowrap" }}>ETA 13:10</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    Office closes 17:00, use lobby reception
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <select
                      aria-label="Driver for #1043"
                      style={{
                        font: "inherit",
                        height: "28px",
                        border: "1px solid var(--line2)",
                        borderRadius: "6px",
                        padding: "0 6px",
                        background: "var(--panel)",
                      }}
                    >
                      <option>Jun</option>
                      <option>Carlo</option>
                      <option selected>Ana</option>
                      <option>Rico</option>
                    </select>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>2</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--ink2)",
                        background: "#F2F4F7",
                        border: "1px solid var(--line2)",
                        borderRadius: "4px",
                        padding: "0 6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Upcoming
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    #1044
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>Ben Cruz</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>Pasig</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                    }}
                  >
                    15:00–17:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", whiteSpace: "nowrap" }}>ETA 15:10</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    2 failed attempts before · customer confirmed 15:00–17:00 today
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <select
                      aria-label="Driver for #1044"
                      style={{
                        font: "inherit",
                        height: "28px",
                        border: "1px solid var(--line2)",
                        borderRadius: "6px",
                        padding: "0 6px",
                        background: "var(--panel)",
                      }}
                    >
                      <option>Jun</option>
                      <option>Carlo</option>
                      <option selected>Ana</option>
                      <option>Rico</option>
                    </select>
                  </td>
                </tr>
                <tr style={{ background: "#FCFCFD" }}>
                  <td colSpan={9} style={{ padding: "8px 14px", borderBottom: "1px solid var(--line)" }}>
                    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "10px" }}>
                      <span
                        style={{
                          width: "22px",
                          height: "22px",
                          borderRadius: "99px",
                          background: "#F79009",
                          color: "#fff",
                          fontSize: "9px",
                          fontWeight: "600",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        RS
                      </span>
                      <b>Rico Santos</b>
                      <span style={{ color: "var(--mute)" }}>Motorcycle · new</span>
                      <span
                        style={{
                          fontSize: "11px",
                          fontWeight: "500",
                          color: "var(--ink2)",
                          background: "#F2F4F7",
                          border: "1px solid var(--line2)",
                          borderRadius: "4px",
                          padding: "0 6px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        Available
                      </span>
                      <span style={{ flex: "1" }}></span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "120px", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
                          <div style={{ width: "100%", height: "6px", background: "#F79009", borderRadius: "3px" }}></div>
                        </div>
                        <span style={{ color: "var(--ink2)", fontWeight: "500" }}>1 of 1 delivered</span>
                        <span style={{ color: "var(--mute)" }}>· 3 km planned</span>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>1</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--ok)",
                        background: "var(--okBg)",
                        border: "1px solid var(--okLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      Delivered
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                    }}
                  >
                    #1039
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>Dela Cruz Bakery</td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>Makati</td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      whiteSpace: "nowrap",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                    }}
                  >
                    08:00–11:00
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--mute)" }}>08:31</span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      color: "var(--ink2)",
                      fontSize: "12px",
                    }}
                  >
                    Access notes attached for new driver
                  </td>
                  <td style={{ padding: "9px 14px", borderBottom: "1px solid var(--line)" }}>
                    <span style={{ color: "var(--mute)" }}>Rico</span>
                  </td>
                </tr>
              </tbody>
            </table>{" "}
          </div>{" "}
        </section>{" "}
      </main>{" "}
    </>
  );
}
