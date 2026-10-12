/* eslint-disable */
// Converted from design/project/Main.dc.html. Holes: draft, showProposal, pending, approve, approved, showCarlo, showSummary, askCarlo, askSummary, reset
export default function MainBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
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
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: "12px" }}>
          {" "}
          <div style={{ flex: "1 1 300px" }}>
            {" "}
            <h1 style={{ margin: "0", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.01em" }}>Overview</h1>{" "}
            <div style={{ color: "var(--mute)", marginTop: "2px" }}>Monday, 12 October · Metro Manila · updated 10:42</div>{" "}
          </div>{" "}
          <div
            role="group"
            aria-label="Range"
            style={{ display: "flex", border: "1px solid var(--line2)", borderRadius: "6px", overflow: "hidden" }}
          >
            <button
              style={{
                font: "inherit",
                height: "32px",
                padding: "0 12px",
                border: "0",
                background: "var(--sub)",
                fontWeight: "600",
                color: "var(--ink)",
                cursor: "pointer",
              }}
            >
              Today
            </button>
            <button
              style={{
                font: "inherit",
                height: "32px",
                padding: "0 12px",
                border: "0",
                borderLeft: "1px solid var(--line2)",
                background: "var(--panel)",
                color: "var(--ink2)",
                cursor: "pointer",
              }}
            >
              7 days
            </button>
            <button
              style={{
                font: "inherit",
                height: "32px",
                padding: "0 12px",
                border: "0",
                borderLeft: "1px solid var(--line2)",
                background: "var(--panel)",
                color: "var(--ink2)",
                cursor: "pointer",
              }}
            >
              30 days
            </button>
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
            Export
          </button>{" "}
        </div>{" "}
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
          {" "}
          <div style={{ padding: "14px 16px", borderRight: "1px solid var(--line)" }}>
            {" "}
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Delivered</div>{" "}
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "6px" }}>
              <span style={{ fontSize: "24px", fontWeight: "600" }}>5</span>
              <span style={{ color: "var(--mute)" }}>of 13</span>
            </div>{" "}
            <div style={{ height: "4px", background: "#F2F4F7", borderRadius: "2px", marginTop: "10px" }}>
              <div style={{ width: "38%", height: "4px", background: "var(--brand)", borderRadius: "2px" }}></div>
            </div>{" "}
          </div>{" "}
          <div style={{ padding: "14px 16px", borderRight: "1px solid var(--line)" }}>
            {" "}
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>On-time rate</div>{" "}
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "6px" }}>
              <span style={{ fontSize: "24px", fontWeight: "600" }}>100%</span>
              <span style={{ fontSize: "12px", fontWeight: "500", color: "var(--ok)" }}>+6 pts vs last Mon</span>
            </div>{" "}
            <svg width="120" height="22" viewBox="0 0 120 22" style={{ marginTop: "6px" }} aria-hidden="true">
              <polyline points="0,16 15,14 30,15 45,11 60,12 75,8 90,9 105,5 120,4" fill="none" stroke="#12B76A" strokeWidth="1.5" />
            </svg>{" "}
          </div>{" "}
          <div style={{ padding: "14px 16px", borderRight: "1px solid var(--line)" }}>
            {" "}
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>At risk</div>{" "}
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "6px" }}>
              <span style={{ fontSize: "24px", fontWeight: "600", color: "var(--warn)" }}>2</span>
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>ETA past window</span>
            </div>{" "}
            <div
              style={{
                marginTop: "6px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "12px",
                color: "var(--ink2)",
              }}
            >
              <a
                href="/app/approvals"
                style={{
                  fontWeight: "600",
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
            </div>{" "}
          </div>{" "}
          <div style={{ padding: "14px 16px" }}>
            {" "}
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Failed deliveries</div>{" "}
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "6px" }}>
              <span style={{ fontSize: "24px", fontWeight: "600" }}>0</span>
              <span style={{ fontSize: "12px", fontWeight: "500", color: "var(--ok)" }}>1 prevented</span>
            </div>
          </div>{" "}
        </section>{" "}
        <section
          aria-label="Live progress"
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
              gap: "12px",
              padding: "10px 14px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>Live progress</h2>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                color: "var(--ok)",
                fontWeight: "500",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "99px",
                  background: "#12B76A",
                  animation: "hamPulse 1.6s ease-out infinite",
                  "--ring": "rgba(18,183,106,.4)",
                }}
              ></span>
              Live
            </span>
            <span style={{ flex: "1" }}></span>
            <span style={{ display: "flex", flexWrap: "wrap", gap: "12px", fontSize: "12px", color: "var(--mute)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "99px", background: "var(--ink2)" }}></span>
                Delivered
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "99px",
                    border: "2px solid var(--ink2)",
                    boxSizing: "border-box",
                  }}
                ></span>
                Next
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "99px",
                    border: "2px solid #D0D5DD",
                    boxSizing: "border-box",
                  }}
                ></span>
                Planned
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "99px",
                    border: "2px dashed var(--brand)",
                    boxSizing: "border-box",
                  }}
                ></span>
                Proposed
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                <span style={{ width: "9px", height: "9px", borderRadius: "99px", background: "var(--err)" }}></span>
                Incident
              </span>
            </span>
            <a href="/app/dispatch" style={{ fontWeight: "500", textDecoration: "none" }}>
              Open dispatch
            </a>
          </div>{" "}
          <div style={{ overflowX: "auto" }}>
            <div style={{ minWidth: "760px" }}>
              {" "}
              <div style={{ display: "flex", background: "var(--sub)", borderBottom: "1px solid var(--line)" }}>
                <div
                  style={{
                    flex: "0 0 250px",
                    padding: "7px 14px",
                    boxSizing: "border-box",
                    fontSize: "12px",
                    color: "var(--mute)",
                  }}
                >
                  Driver
                </div>
                <div style={{ flex: "1", position: "relative", height: "30px", marginRight: "18px" }}>
                  <div style={{ position: "absolute", inset: "8px 0 0 0" }}>
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        left: "46.7%",
                        transform: "translateX(-50%)",
                        fontSize: "10px",
                        fontWeight: "600",
                        color: "#fff",
                        background: "var(--brand)",
                        borderRadius: "3px",
                        padding: "0 4px",
                      }}
                    >
                      10:48
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        left: "0.0%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "var(--mute)",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      08:00
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        left: "16.7%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "var(--mute)",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      09:00
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        left: "33.3%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "var(--mute)",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      10:00
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        left: "50.0%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "var(--mute)",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      11:00
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        left: "66.7%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "var(--mute)",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      12:00
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        left: "83.3%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "var(--mute)",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      13:00
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        left: "100.0%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        color: "var(--mute)",
                        fontFamily: "'IBM Plex Mono', monospace",
                      }}
                    >
                      14:00
                    </span>
                  </div>
                </div>
              </div>{" "}
              <div style={{ position: "relative" }}>
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    top: "0",
                    bottom: "0",
                    left: "250px",
                    right: "18px",
                    pointerEvents: "none",
                  }}
                >
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      bottom: "0",
                      left: "0.0%",
                      borderLeft: "1px solid #F2F4F7",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      bottom: "0",
                      left: "16.7%",
                      borderLeft: "1px solid #F2F4F7",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      bottom: "0",
                      left: "33.3%",
                      borderLeft: "1px solid #F2F4F7",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      bottom: "0",
                      left: "50.0%",
                      borderLeft: "1px solid #F2F4F7",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      bottom: "0",
                      left: "66.7%",
                      borderLeft: "1px solid #F2F4F7",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      bottom: "0",
                      left: "83.3%",
                      borderLeft: "1px solid #F2F4F7",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      bottom: "0",
                      left: "100.0%",
                      borderLeft: "1px solid #F2F4F7",
                    }}
                  ></span>
                  <span
                    style={{
                      position: "absolute",
                      top: "0",
                      bottom: "0",
                      left: "46.7%",
                      borderLeft: "1.5px solid var(--brand)",
                    }}
                  ></span>
                </div>{" "}
                <div style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid var(--line)" }}>
                  <div
                    style={{
                      flex: "0 0 250px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      style={{
                        width: "26px",
                        height: "26px",
                        flex: "none",
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
                    <div style={{ minWidth: "0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap" }}>Jun Reyes</span>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "var(--err)",
                            background: "var(--errBg)",
                            border: "1px solid var(--errLine)",
                            borderRadius: "4px",
                            padding: "0 5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Incident
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--mute)" }}>Van · 2/5 · flat tire</div>
                    </div>
                  </div>
                  <div style={{ flex: "1", position: "relative", minHeight: "52px", marginRight: "18px" }}>
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "8.3%",
                        width: "33.6%",
                        height: "0",
                        borderTop: "3px solid #2E90FA",
                        transform: "translateY(-50%)",
                      }}
                    ></span>
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "41.9%",
                        width: "26.2%",
                        height: "0",
                        borderTop: "3px dashed #D0D5DD",
                        transform: "translateY(-50%)",
                      }}
                    ></span>
                    <span
                      title="#1041 delivered 09:24"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "23.3%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "12px",
                        height: "12px",
                        background: "#2E90FA",
                        border: "2px solid #fff",
                        boxShadow: "0 0 0 1px #2E90FA",
                      }}
                    ></span>
                    <span
                      title="#1047 delivered 10:08"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "35.6%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "12px",
                        height: "12px",
                        background: "#2E90FA",
                        border: "2px solid #fff",
                        boxShadow: "0 0 0 1px #2E90FA",
                      }}
                    ></span>
                    <span
                      title="#1042 being reassigned"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "44.4%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "10px",
                        height: "10px",
                        background: "#fff",
                        border: "2px dashed #98A2B3",
                      }}
                    ></span>
                    <span
                      title="#1049 being reassigned"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "55.6%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "10px",
                        height: "10px",
                        background: "#fff",
                        border: "2px dashed #98A2B3",
                      }}
                    ></span>
                    <span
                      title="#1050 being reassigned"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "68.1%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "10px",
                        height: "10px",
                        background: "#fff",
                        border: "2px dashed #98A2B3",
                      }}
                    ></span>
                    <span
                      title="Flat tire 10:31"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "41.9%",
                        transform: "translate(-50%, -50%)",
                        width: "18px",
                        height: "18px",
                        borderRadius: "99px",
                        background: "var(--err)",
                        color: "#fff",
                        fontSize: "12px",
                        fontWeight: "700",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "2px solid #fff",
                        boxShadow: "0 0 0 1px var(--err)",
                      }}
                    >
                      !
                    </span>
                    <span
                      style={{
                        position: "absolute",
                        top: "2px",
                        left: "60%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--err)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      3 stops → Approvals
                    </span>
                  </div>
                </div>{" "}
                <div style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid var(--line)" }}>
                  <div
                    style={{
                      flex: "0 0 250px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      style={{
                        width: "26px",
                        height: "26px",
                        flex: "none",
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
                    <div style={{ minWidth: "0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap" }}>Carlo Mendoza</span>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "var(--info)",
                            background: "var(--infoBg)",
                            border: "1px solid var(--infoLine)",
                            borderRadius: "4px",
                            padding: "0 5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          En route
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--mute)" }}>Motorcycle · 2/4 · on time</div>
                    </div>
                  </div>
                  <div style={{ flex: "1", position: "relative", minHeight: "52px", marginRight: "18px" }}>
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "11.1%",
                        width: "35.6%",
                        height: "0",
                        borderTop: "3px solid #7A5AF8",
                        transform: "translateY(-50%)",
                      }}
                    ></span>
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "46.7%",
                        width: "17.2%",
                        height: "0",
                        borderTop: "3px solid #D0D5DD",
                        transform: "translateY(-50%)",
                      }}
                    ></span>
                    <span
                      title="#1039 delivered 09:40"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "27.8%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "12px",
                        height: "12px",
                        background: "#7A5AF8",
                        border: "2px solid #fff",
                        boxShadow: "0 0 0 1px #7A5AF8",
                      }}
                    ></span>
                    <span
                      title="#1040 delivered 10:25"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "40.3%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "12px",
                        height: "12px",
                        background: "#7A5AF8",
                        border: "2px solid #fff",
                        boxShadow: "0 0 0 1px #7A5AF8",
                      }}
                    ></span>
                    <span
                      title="#1051 Prof. Diaz · ETA 11:05"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "51.4%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "12px",
                        height: "12px",
                        background: "#fff",
                        border: "2px solid #7A5AF8",
                      }}
                    ></span>
                    <span
                      title="#1052 · ETA 11:50"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "63.9%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "10px",
                        height: "10px",
                        background: "#fff",
                        border: "2px solid #D0D5DD",
                      }}
                    ></span>
                    <span
                      title="Carlo · on time"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "46.7%",
                        transform: "translate(-50%, -50%)",
                        width: "16px",
                        height: "16px",
                        borderRadius: "99px",
                        background: "#7A5AF8",
                        border: "3px solid #fff",
                        boxShadow: "0 0 0 1px #7A5AF8",
                        animation: "hamPulse 1.6s ease-out infinite",
                        "--ring": "rgba(122,90,248,.35)",
                      }}
                    ></span>
                    <span
                      style={{
                        position: "absolute",
                        top: "2px",
                        left: "51.4%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--ink2)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      #1051 · 11:05
                    </span>
                  </div>
                </div>{" "}
                <div style={{ display: "flex", alignItems: "stretch", borderBottom: "1px solid var(--line)" }}>
                  <div
                    style={{
                      flex: "0 0 250px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      style={{
                        width: "26px",
                        height: "26px",
                        flex: "none",
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
                    <div style={{ minWidth: "0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap" }}>Ana Villanueva</span>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "var(--info)",
                            background: "var(--infoBg)",
                            border: "1px solid var(--infoLine)",
                            borderRadius: "4px",
                            padding: "0 5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          En route
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--mute)" }}>Sedan · 0/2 · on time</div>
                    </div>
                  </div>
                  <div style={{ flex: "1", position: "relative", minHeight: "52px", marginRight: "18px" }}>
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "30.6%",
                        width: "16.1%",
                        height: "0",
                        borderTop: "3px solid #E91E63",
                        transform: "translateY(-50%)",
                      }}
                    ></span>
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "46.7%",
                        width: "47.7%",
                        height: "0",
                        borderTop: "3px solid #D0D5DD",
                        transform: "translateY(-50%)",
                      }}
                    ></span>
                    <span
                      title="Proposed: #1042 from Jun"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "54.2%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "10px",
                        height: "10px",
                        background: "var(--brandTint)",
                        border: "2px dashed var(--brand)",
                      }}
                    ></span>
                    <span
                      title="Proposed: #1050 from Jun"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "72.2%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "10px",
                        height: "10px",
                        background: "var(--brandTint)",
                        border: "2px dashed var(--brand)",
                      }}
                    ></span>
                    <span
                      title="#1043 Raffles · ETA 13:10"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "86.1%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "12px",
                        height: "12px",
                        background: "#fff",
                        border: "2px solid #E91E63",
                      }}
                    ></span>
                    <span
                      title="#1048 · ETA 13:40"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "94.4%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "10px",
                        height: "10px",
                        background: "#fff",
                        border: "2px solid #D0D5DD",
                      }}
                    ></span>
                    <span
                      title="Ana · on time"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "46.7%",
                        transform: "translate(-50%, -50%)",
                        width: "16px",
                        height: "16px",
                        borderRadius: "99px",
                        background: "#E91E63",
                        border: "3px solid #fff",
                        boxShadow: "0 0 0 1px #E91E63",
                        animation: "hamPulse 1.6s ease-out infinite",
                        "--ring": "rgba(233,30,99,.35)",
                      }}
                    ></span>
                    <span
                      style={{
                        position: "absolute",
                        top: "2px",
                        left: "54.2%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--brandInk)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      +2 if approved
                    </span>
                  </div>
                </div>{" "}
                <div style={{ display: "flex", alignItems: "stretch" }}>
                  <div
                    style={{
                      flex: "0 0 250px",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "10px 14px",
                      boxSizing: "border-box",
                    }}
                  >
                    <span
                      style={{
                        width: "26px",
                        height: "26px",
                        flex: "none",
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
                    <div style={{ minWidth: "0" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{ fontWeight: "600", whiteSpace: "nowrap" }}>Rico Santos</span>
                        <span
                          style={{
                            fontSize: "11px",
                            fontWeight: "500",
                            color: "var(--ink2)",
                            background: "#F2F4F7",
                            border: "1px solid var(--line2)",
                            borderRadius: "4px",
                            padding: "0 5px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Available
                        </span>
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--mute)" }}>Motorcycle · 1/1 · at hub</div>
                    </div>
                  </div>
                  <div style={{ flex: "1", position: "relative", minHeight: "52px", marginRight: "18px" }}>
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "25.0%",
                        width: "12.5%",
                        height: "0",
                        borderTop: "3px solid #F79009",
                        transform: "translateY(-50%)",
                      }}
                    ></span>
                    <span
                      title="#1044 delivered 10:15"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "37.5%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "12px",
                        height: "12px",
                        background: "#F79009",
                        border: "2px solid #fff",
                        boxShadow: "0 0 0 1px #F79009",
                      }}
                    ></span>
                    <span
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "37.5%",
                        width: "20.8%",
                        height: "0",
                        borderTop: "3px dashed var(--brand)",
                        transform: "translateY(-50%)",
                      }}
                    ></span>
                    <span
                      title="Proposed: #1049 Rockwell from Jun"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "58.3%",
                        transform: "translate(-50%, -50%)",
                        borderRadius: "99px",
                        boxSizing: "border-box",
                        width: "10px",
                        height: "10px",
                        background: "var(--brandTint)",
                        border: "2px dashed var(--brand)",
                      }}
                    ></span>
                    <span
                      title="Rico · idle at hub"
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "46.7%",
                        transform: "translate(-50%, -50%)",
                        width: "14px",
                        height: "14px",
                        borderRadius: "99px",
                        background: "#fff",
                        border: "3px solid #F79009",
                      }}
                    ></span>
                    <span
                      style={{
                        position: "absolute",
                        top: "2px",
                        left: "58.3%",
                        transform: "translateX(-50%)",
                        fontSize: "11px",
                        fontWeight: "500",
                        color: "var(--brandInk)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      +1 if approved
                    </span>
                  </div>
                </div>
              </div>{" "}
            </div>
          </div>{" "}
        </section>{" "}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
          {" "}
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
            {" "}
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
              {" "}
              <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600", flex: "1" }}>Live fleet</h2>{" "}
              <div style={{ display: "flex", gap: "12px", color: "var(--ink2)", fontSize: "12px" }}>
                {" "}
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "99px", background: "#2E90FA" }}></span>En route 2
                </span>{" "}
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "99px", background: "#F04438" }}></span>
                  Incident 1
                </span>{" "}
                <span style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "99px", background: "#98A2B3" }}></span>
                  Available 1
                </span>{" "}
              </div>{" "}
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
              </button>{" "}
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
                    fontWeight: "600",
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
              </div>{" "}
            </div>{" "}
            <div style={{ position: "relative" }}>
              {" "}
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
                <polyline
                  points="391,356 487,396 460,424 331,362"
                  fill="none"
                  stroke="#2E90FA"
                  strokeWidth="3"
                  strokeDasharray="6 5"
                  strokeLinecap="round"
                />
                <polyline points="640,64 624,30 440,223" fill="none" stroke="#7A5AF8" strokeWidth="3" strokeLinecap="round" />
                <polyline points="500,320 550,281 526,338" fill="none" stroke="#E91E63" strokeWidth="3" strokeLinecap="round" />
                <polyline points="300,368 331,362" fill="none" stroke="#F79009" strokeWidth="3" strokeLinecap="round" />
                <g fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" textAnchor="middle">
                  <circle cx="252" cy="378" r="9" fill="#ECFDF3" stroke="#12B76A" strokeWidth="1.5" />
                  <path d="M248 378l3 3 5-6" fill="none" stroke="#067647" strokeWidth="1.6" />
                  <circle cx="476" cy="301" r="9" fill="#ECFDF3" stroke="#12B76A" strokeWidth="1.5" />
                  <path d="M472 301l3 3 5-6" fill="none" stroke="#067647" strokeWidth="1.6" />
                  <circle cx="313" cy="102" r="9" fill="#ECFDF3" stroke="#12B76A" strokeWidth="1.5" />
                  <path d="M309 102l3 3 5-6" fill="none" stroke="#067647" strokeWidth="1.6" />
                  <circle cx="662" cy="82" r="9" fill="#ECFDF3" stroke="#12B76A" strokeWidth="1.5" />
                  <path d="M658 82l3 3 5-6" fill="none" stroke="#067647" strokeWidth="1.6" />
                  <circle cx="487" cy="396" r="10" fill="#FFFAEB" stroke="#F79009" strokeWidth="1.5" />
                  <text x="487" y="400" fill="#B54708">
                    1
                  </text>
                  <circle cx="460" cy="424" r="10" fill="#fff" stroke="#2E90FA" strokeWidth="1.5" />
                  <text x="460" y="428" fill="#175CD3">
                    2
                  </text>
                  <circle cx="331" cy="362" r="10" fill="#FFFAEB" stroke="#F79009" strokeWidth="1.5" />
                  <text x="331" y="366" fill="#B54708">
                    3
                  </text>
                  <circle cx="624" cy="30" r="10" fill="#fff" stroke="#7A5AF8" strokeWidth="1.5" />
                  <text x="624" y="34" fill="#5925DC">
                    1
                  </text>
                  <circle cx="440" cy="223" r="10" fill="#fff" stroke="#7A5AF8" strokeWidth="1.5" />
                  <text x="440" y="227" fill="#5925DC">
                    2
                  </text>
                  <circle cx="550" cy="281" r="10" fill="#fff" stroke="#E91E63" strokeWidth="1.5" />
                  <text x="550" y="285" fill="#C2185B">
                    1
                  </text>
                  <circle cx="526" cy="338" r="10" fill="#fff" stroke="#E91E63" strokeWidth="1.5" />
                  <text x="526" y="342" fill="#C2185B">
                    2
                  </text>
                </g>
                <rect x="260" y="350" width="24" height="24" rx="5" fill="#101828" />
                <path d="M266 368 L268 356 L276 355 L278 363 L271 368" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round" />
                <g fontFamily="IBM Plex Sans, sans-serif" fontSize="10" fontWeight="600" textAnchor="middle" fill="#fff">
                  <circle cx="391" cy="356" r="13" fill="#2E90FA" stroke="#fff" strokeWidth="2.5" />
                  <text x="391" y="360">
                    JR
                  </text>
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
              </svg>{" "}
              <div
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "12px",
                  width: "230px",
                  background: "var(--panel)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  boxShadow: "0 4px 12px rgba(16,24,40,0.08)",
                  padding: "10px 12px",
                }}
              >
                {" "}
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: "600",
                      color: "var(--err)",
                      background: "var(--errBg)",
                      border: "1px solid var(--errLine)",
                      borderRadius: "4px",
                      padding: "0 6px",
                    }}
                  >
                    Incident
                  </span>
                  <span style={{ color: "var(--mute)", fontSize: "12px" }}>10:31 · 11 min</span>
                </div>{" "}
                <div style={{ fontWeight: "600", marginTop: "6px" }}>Jun Reyes · flat tire</div>{" "}
                <div style={{ color: "var(--ink2)", fontSize: "12px", marginTop: "2px" }}>
                  EDSA near Guadalupe. 3 stops waiting on reassignment.
                </div>{" "}
                <a href="/app/approvals" style={{ display: "inline-block", marginTop: "8px", fontWeight: "600", textDecoration: "none" }}>
                  Review reassignment
                </a>{" "}
              </div>{" "}
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
              </div>{" "}
            </div>{" "}
          </section>{" "}
          <section
            aria-label="Approvals"
            style={{
              flex: "1 1 300px",
              minWidth: "0",
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {" "}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 14px",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>Open tickets</h2>
              <span style={{ color: "var(--mute)" }}>3</span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "500",
                  color: "var(--err)",
                  background: "var(--errBg)",
                  border: "1px solid var(--errLine)",
                  borderRadius: "4px",
                  padding: "0 5px",
                }}
              >
                1 escalated
              </span>
              <span style={{ flex: "1" }}></span>
              <a href="/app/approvals" style={{ fontWeight: "500", textDecoration: "none" }}>
                View queue
              </a>
            </div>{" "}
            <a
              href="/app/approvals"
              style={{
                display: "grid",
                gridTemplateColumns: "16px 1fr auto",
                gap: "4px 10px",
                alignItems: "center",
                padding: "11px 14px",
                borderBottom: "1px solid var(--line)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {" "}
              <svg width="14" height="14" viewBox="0 0 16 16" aria-label="Urgent priority" role="img">
                <rect width="16" height="16" rx="3" fill="#F04438" />
                <path d="M8 4v5M8 11.5v.5" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              </svg>{" "}
              <span style={{ fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Reassign 3 stops from Jun
              </span>{" "}
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "99px",
                  background: "#344054",
                  color: "#fff",
                  fontSize: "9px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Assigned to Maria"
              >
                MS
              </span>{" "}
              <span></span>{" "}
              <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--mute)" }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>HAM-417</span>
                <span>Dispatch</span>
                <span style={{ color: "var(--warn)" }}>SLA 6m</span>
              </span>{" "}
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>9m</span>{" "}
            </a>{" "}
            <a
              href="/app/approvals"
              style={{
                display: "grid",
                gridTemplateColumns: "16px 1fr auto",
                gap: "4px 10px",
                alignItems: "center",
                padding: "11px 14px",
                borderBottom: "1px solid var(--line)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {" "}
              <svg width="14" height="14" viewBox="0 0 16 16" aria-label="Medium priority" role="img">
                <rect x="1" y="9" width="3" height="5" rx="1" fill="#344054" />
                <rect x="6.5" y="5" width="3" height="9" rx="1" fill="#344054" />
                <rect x="12" y="1" width="3" height="13" rx="1" fill="#D0D5DD" />
              </svg>{" "}
              <span style={{ fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Create order from WhatsApp · Rina Bautista
              </span>{" "}
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "99px",
                  background: "#344054",
                  color: "#fff",
                  fontSize: "9px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Assigned to Maria"
              >
                MS
              </span>{" "}
              <span></span>{" "}
              <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--mute)" }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>HAM-414</span>
                <span>Intake</span>
                <span>82% parsed</span>
              </span>{" "}
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>27m</span>{" "}
            </a>{" "}
            <a
              href="/app/approvals"
              style={{
                display: "grid",
                gridTemplateColumns: "16px 1fr auto",
                gap: "4px 10px",
                alignItems: "center",
                padding: "11px 14px",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              {" "}
              <svg width="14" height="14" viewBox="0 0 16 16" aria-label="High priority" role="img">
                <rect x="1" y="9" width="3" height="5" rx="1" fill="#344054" />
                <rect x="6.5" y="5" width="3" height="9" rx="1" fill="#344054" />
                <rect x="12" y="1" width="3" height="13" rx="1" fill="#344054" />
              </svg>{" "}
              <span style={{ fontWeight: "500", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                Refund request · Paolo Lim #1045
              </span>{" "}
              <span
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "99px",
                  background: "#344054",
                  color: "#fff",
                  fontSize: "9px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                title="Assigned to Maria"
              >
                MS
              </span>{" "}
              <span></span>{" "}
              <span style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--mute)" }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>HAM-416</span>
                <span>Escalated</span>
                <span>Refunds never auto</span>
              </span>{" "}
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>15m</span>{" "}
            </a>{" "}
          </section>{" "}
        </div>{" "}
      </main>{" "}
      <aside
        aria-label="Hamilton Copilot"
        style={{
          flex: "1 1 340px",
          maxWidth: "380px",
          minWidth: "0",
          boxSizing: "border-box",
          background: "var(--panel)",
          borderLeft: "1px solid var(--line)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {" "}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            height: "48px",
            padding: "0 14px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {" "}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2" aria-hidden="true">
            <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
          </svg>{" "}
          <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600", flex: "1" }}>Copilot</h2>{" "}
          <span
            style={{
              fontSize: "11px",
              color: "var(--mute)",
              border: "1px solid var(--line)",
              borderRadius: "4px",
              padding: "1px 6px",
            }}
          >
            Policies on
          </span>{" "}
        </div>{" "}
        <div
          style={{
            flex: "1",
            padding: "14px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "var(--sub)",
          }}
        >
          {" "}
          <div
            style={{
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
            Morning Maria. Plan went out at 7:52. Jun reported a flat tire at 10:31 and I have a fix waiting for you.
          </div>{" "}
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: "85%",
              background: "var(--ink)",
              color: "#fff",
              borderRadius: "10px 10px 2px 10px",
              padding: "8px 11px",
              lineHeight: "1.45",
            }}
          >
            What&#39;s at risk right now?
          </div>{" "}
          <div
            style={{
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
            Two deliveries, both on Jun&#39;s stalled route:
          </div>{" "}
          <div
            style={{
              alignSelf: "stretch",
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            {" "}
            <div
              style={{
                padding: "9px 12px",
                borderBottom: "1px solid var(--line)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span style={{ fontWeight: "600", flex: "1" }}>At-risk deliveries</span>
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "var(--warn)",
                  background: "var(--warnBg)",
                  border: "1px solid var(--warnLine)",
                  borderRadius: "4px",
                  padding: "0 6px",
                }}
              >
                2
              </span>
            </div>{" "}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "2px 8px",
                padding: "9px 12px",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <span style={{ fontWeight: "600" }}>#1042 Mark Tan</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--warn)" }}>ETA 13:40</span>
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>Uptown BGC · window ends 13:00</span>
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>Jun</span>
            </div>{" "}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                gap: "2px 8px",
                padding: "9px 12px",
                borderBottom: "1px solid var(--line)",
              }}
            >
              <span style={{ fontWeight: "600" }}>#1049 Sam Ocampo</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--warn)" }}>ETA 13:55</span>
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>Rockwell · window ends 13:00</span>
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>Jun</span>
            </div>{" "}
            <div style={{ padding: "9px 12px", display: "flex", gap: "6px" }}>
              <button
                onClick={h.draft}
                style={{
                  font: "inherit",
                  fontWeight: "600",
                  height: "30px",
                  padding: "0 12px",
                  border: "0",
                  borderRadius: "6px",
                  background: "var(--brandInk)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Draft a fix
              </button>
              <a href="/app/dispatch" style={{ alignSelf: "center", marginLeft: "6px", textDecoration: "none", fontWeight: "500" }}>
                Open in dispatch
              </a>
            </div>{" "}
          </div>{" "}
          {v.showProposal && (
            <>
              {" "}
              <div
                style={{
                  alignSelf: "flex-end",
                  maxWidth: "85%",
                  background: "var(--ink)",
                  color: "#fff",
                  borderRadius: "10px 10px 2px 10px",
                  padding: "8px 11px",
                  lineHeight: "1.45",
                }}
              >
                Draft a fix
              </div>{" "}
              <div
                style={{
                  alignSelf: "stretch",
                  background: "var(--panel)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  overflow: "hidden",
                }}
              >
                {" "}
                <div
                  style={{
                    padding: "9px 12px",
                    borderBottom: "1px solid var(--line)",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <span style={{ fontWeight: "600", flex: "1" }}>Proposed reassignment</span>
                  <span style={{ fontSize: "11px", color: "var(--mute)" }}>Dispatch agent</span>
                </div>{" "}
                <div
                  style={{
                    padding: "8px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  {" "}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>#1042 Mark Tan</span>
                    <span style={{ color: "var(--ink2)" }}>
                      Jun → <b>Ana</b> · 12:15
                    </span>
                  </div>{" "}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>#1050 Nicole Ramos</span>
                    <span style={{ color: "var(--ink2)" }}>
                      Jun → <b>Ana</b> · 12:40
                    </span>
                  </div>{" "}
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>#1049 Sam Ocampo</span>
                    <span style={{ color: "var(--ink2)" }}>
                      Jun → <b>Rico</b> · 11:05
                    </span>
                  </div>{" "}
                </div>{" "}
                <div
                  style={{
                    padding: "8px 12px",
                    fontSize: "12px",
                    color: "var(--mute)",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  Needs approval: 3 stops is above the 1-stop auto limit. Customers are notified on approval.
                </div>{" "}
                {v.pending && (
                  <>
                    {" "}
                    <div style={{ padding: "9px 12px", display: "flex", gap: "6px" }}>
                      <button
                        onClick={h.approve}
                        style={{
                          font: "inherit",
                          fontWeight: "600",
                          height: "30px",
                          padding: "0 12px",
                          border: "0",
                          borderRadius: "6px",
                          background: "var(--brandInk)",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Approve
                      </button>
                      <button
                        style={{
                          font: "inherit",
                          height: "30px",
                          padding: "0 12px",
                          border: "1px solid var(--line2)",
                          borderRadius: "6px",
                          background: "var(--panel)",
                          color: "var(--ink2)",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>
                      <button
                        style={{
                          font: "inherit",
                          height: "30px",
                          padding: "0 12px",
                          border: "1px solid var(--line2)",
                          borderRadius: "6px",
                          background: "var(--panel)",
                          color: "var(--ink2)",
                          cursor: "pointer",
                        }}
                      >
                        Reject
                      </button>
                    </div>{" "}
                  </>
                )}{" "}
                {v.approved && (
                  <>
                    {" "}
                    <div
                      style={{
                        padding: "9px 12px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        color: "var(--ok)",
                        fontWeight: "600",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        aria-hidden="true"
                      >
                        <path d="M5 12l5 5 9-10" />
                      </svg>
                      Approved by Maria
                    </div>{" "}
                  </>
                )}{" "}
              </div>{" "}
              {v.approved && (
                <>
                  {" "}
                  <div
                    style={{
                      alignSelf: "stretch",
                      background: "var(--okBg)",
                      border: "1px solid var(--okLine)",
                      borderRadius: "8px",
                      padding: "10px 12px",
                      color: "var(--ok)",
                    }}
                  >
                    <div style={{ fontWeight: "600" }}>3 stops moved · 3 customers notified</div>
                    <div style={{ fontSize: "12px", marginTop: "2px", color: "#085D3A" }}>
                      Ana and Rico have new routes. Both at-risk windows now land on time.
                    </div>
                  </div>{" "}
                </>
              )}{" "}
            </>
          )}{" "}
          {v.showCarlo && (
            <>
              {" "}
              <div
                style={{
                  alignSelf: "flex-end",
                  maxWidth: "85%",
                  background: "var(--ink)",
                  color: "#fff",
                  borderRadius: "10px 10px 2px 10px",
                  padding: "8px 11px",
                  lineHeight: "1.45",
                }}
              >
                Where&#39;s Carlo?
              </div>{" "}
              <div
                style={{
                  alignSelf: "stretch",
                  background: "var(--panel)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                {" "}
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
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
                    <div style={{ fontWeight: "600" }}>Carlo Mendoza</div>
                    <div style={{ fontSize: "12px", color: "var(--mute)" }}>Katipunan Ave · moving 24 km/h</div>
                  </div>
                  <span
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      color: "var(--info)",
                      background: "var(--infoBg)",
                      border: "1px solid var(--infoLine)",
                      borderRadius: "99px",
                      padding: "1px 8px",
                    }}
                  >
                    En route
                  </span>
                </div>{" "}
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ flex: "1", height: "6px", background: "#F2F4F7", borderRadius: "3px" }}>
                    <div style={{ width: "50%", height: "6px", background: "#7A5AF8", borderRadius: "3px" }}></div>
                  </div>
                  <span style={{ color: "var(--ink2)" }}>2/4 done</span>
                </div>{" "}
                <div style={{ fontSize: "12px", color: "var(--ink2)" }}>Next: #1051 Prof. Diaz, UP Diliman · ETA 11:05 · on time</div>{" "}
                <div style={{ display: "flex", gap: "6px" }}>
                  <a href="/app/drivers" style={{ fontWeight: "500", textDecoration: "none" }}>
                    Profile
                  </a>
                  <span style={{ color: "var(--line2)" }}>·</span>
                  <a href="/app/dispatch" style={{ fontWeight: "500", textDecoration: "none" }}>
                    Route
                  </a>
                </div>{" "}
              </div>{" "}
            </>
          )}{" "}
          {v.showSummary && (
            <>
              {" "}
              <div
                style={{
                  alignSelf: "flex-end",
                  maxWidth: "85%",
                  background: "var(--ink)",
                  color: "#fff",
                  borderRadius: "10px 10px 2px 10px",
                  padding: "8px 11px",
                  lineHeight: "1.45",
                }}
              >
                Summarize today
              </div>{" "}
              <div
                style={{
                  alignSelf: "stretch",
                  background: "var(--panel)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  display: "grid",
                  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                }}
              >
                {" "}
                <div
                  style={{
                    padding: "10px 12px",
                    borderRight: "1px solid var(--line)",
                    borderBottom: "1px solid var(--line)",
                  }}
                >
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>Delivered</div>
                  <div style={{ fontSize: "18px", fontWeight: "600" }}>5 / 13</div>
                </div>{" "}
                <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--line)" }}>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>On time</div>
                  <div style={{ fontSize: "18px", fontWeight: "600" }}>100%</div>
                </div>{" "}
                <div style={{ padding: "10px 12px", borderRight: "1px solid var(--line)" }}>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>Failed</div>
                  <div style={{ fontSize: "18px", fontWeight: "600" }}>0</div>
                </div>{" "}
                <div style={{ padding: "10px 12px" }}>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>Needs you</div>
                  <div style={{ fontSize: "18px", fontWeight: "600", color: "var(--brandInk)" }}>3</div>
                </div>{" "}
              </div>{" "}
            </>
          )}{" "}
        </div>{" "}
        <div
          style={{
            padding: "12px 14px",
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {" "}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {" "}
            <button
              onClick={h.draft}
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
              }}
            >
              What&#39;s at risk?
            </button>{" "}
            <button
              onClick={h.askCarlo}
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
              }}
            >
              Where&#39;s Carlo?
            </button>{" "}
            <button
              onClick={h.askSummary}
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
              }}
            >
              Summarize today
            </button>{" "}
          </div>{" "}
          <div style={{ display: "flex", gap: "6px" }}>
            {" "}
            <input
              aria-label="Ask or instruct Copilot"
              placeholder="Ask or instruct Copilot…"
              style={{
                font: "inherit",
                flex: "1",
                minWidth: "0",
                height: "36px",
                border: "1px solid var(--line2)",
                borderRadius: "6px",
                padding: "0 10px",
              }}
            />{" "}
            <button
              aria-label="Send"
              onClick={h.draft}
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
            </button>{" "}
          </div>{" "}
          <button
            onClick={h.reset}
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
          </button>{" "}
        </div>{" "}
      </aside>{" "}
    </>
  );
}
