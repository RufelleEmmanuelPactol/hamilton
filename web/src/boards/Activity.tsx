/* eslint-disable */
// Converted from design/project/Activity.dc.html. Holes: none
export default function ActivityBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
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
          gap: "14px",
        }}
      >
        {" "}
        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px" }}>
          <div style={{ flex: "1 1 320px" }}>
            <h1 style={{ margin: "0", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.01em" }}>Audit log</h1>
            <div style={{ color: "var(--mute)", marginTop: "2px" }}>
              Every action an agent took or proposed, the policy it ran under, and why.
            </div>
          </div>
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
            Export CSV
          </button>
        </div>{" "}
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
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Actions today</div>
            <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "4px" }}>58</div>
          </div>
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Ran alone</div>
            <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "4px" }}>52</div>
          </div>
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Asked you</div>
            <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "4px" }}>5</div>
          </div>
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Blocked by policy</div>
            <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "4px" }}>1</div>
          </div>
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Marked wrong (30d)</div>
            <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "4px" }}>3 of 1,412</div>
          </div>
          <div style={{ padding: "12px 16px" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>AI cost today</div>
            <div style={{ fontSize: "20px", fontWeight: "600", marginTop: "4px" }}>₱11.40</div>
          </div>
        </section>{" "}
        <section
          aria-label="Events"
          style={{
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
              gap: "8px",
              padding: "10px 14px",
              borderBottom: "1px solid var(--line)",
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
              Search events, orders, tickets
            </label>
            <button
              style={{
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
              }}
            >
              Agent: All
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button
              style={{
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
              }}
            >
              Outcome: All
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <button
              style={{
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
              }}
            >
              Today
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <span style={{ flex: "1" }}></span>
            <span style={{ color: "var(--mute)", fontSize: "12px" }}>8 of 58</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", minWidth: "960px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "var(--sub)", textAlign: "left", color: "var(--mute)", fontSize: "12px" }}>
                  <th
                    style={{
                      padding: "8px 10px",
                      fontWeight: "500",
                      borderBottom: "1px solid var(--line)",
                      paddingLeft: "14px",
                    }}
                  >
                    Time
                  </th>
                  <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Event</th>
                  <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Agent</th>
                  <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Outcome</th>
                  <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Policy</th>
                  <th
                    style={{
                      padding: "8px 10px",
                      fontWeight: "500",
                      borderBottom: "1px solid var(--line)",
                      paddingRight: "14px",
                    }}
                  >
                    Ref
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ background: "var(--brandTint)" }}>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingLeft: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                      width: "56px",
                    }}
                  >
                    10:41
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      fontWeight: "500",
                    }}
                  >
                    Moved #1044 Ben Cruz to 15:00–17:00 and re-sequenced Ana
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Messages
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>
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
                      Ran alone
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Move a delivery to a later time today
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingRight: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "var(--brandInk)",
                    }}
                  >
                    HAM-418
                  </td>
                </tr>
                <tr style={{ background: "#FFFAFC" }}>
                  <td style={{ borderBottom: "1px solid var(--line)" }}></td>
                  <td colSpan={5} style={{ padding: "4px 14px 14px 10px", borderBottom: "1px solid var(--line)" }}>
                    <div
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
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            color: "var(--mute)",
                          }}
                        >
                          Input
                        </div>
                        <div style={{ marginTop: "4px", color: "var(--ink2)" }}>
                          Customer reply: &#34;wala pa ako sa bahay, after 3pm pa po&#34;
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>
                          Read as: not home until after 15:00 · Semantic · 0.94
                        </div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            color: "var(--mute)",
                          }}
                        >
                          Decision
                        </div>
                        <div style={{ marginTop: "4px", color: "var(--ink2)" }}>
                          New window 15:00–17:00; Ana&#39;s stops 2 and 3 swapped. No other window affected.
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>Policy mode: Auto · condition met</div>
                      </div>
                      <div>
                        <div
                          style={{
                            fontSize: "11px",
                            fontWeight: "600",
                            letterSpacing: "0.04em",
                            textTransform: "uppercase",
                            color: "var(--mute)",
                          }}
                        >
                          Side effects
                        </div>
                        <div style={{ marginTop: "4px", color: "var(--ink2)" }}>
                          Customer confirmed · Address book: &#34;home after 3pm on weekdays&#34;
                        </div>
                        <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>Cost ₱0.02 · 1.4 s</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
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
                          cursor: "pointer",
                        }}
                      >
                        Undo
                      </button>
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
                          cursor: "pointer",
                        }}
                      >
                        Mark as wrong
                      </button>
                      <a
                        href="/app/messages"
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          textDecoration: "none",
                          display: "flex",
                          alignItems: "center",
                          padding: "0 6px",
                        }}
                      >
                        Open conversation
                      </a>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingLeft: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                      width: "56px",
                    }}
                  >
                    10:38
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      fontWeight: "500",
                    }}
                  >
                    Verified proof photo for #1046
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Proof
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>
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
                      Ran alone
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Verify proof photos
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingRight: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "var(--brandInk)",
                    }}
                  >
                    #1046
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingLeft: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                      width: "56px",
                    }}
                  >
                    10:33
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      fontWeight: "500",
                    }}
                  >
                    Drafted moving 3 of Jun&#39;s stops to Ana and Rico
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Dispatch
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>
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
                      Asked you
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Move stops from one driver to another
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingRight: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "var(--brandInk)",
                    }}
                  >
                    HAM-417
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingLeft: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                      width: "56px",
                    }}
                  >
                    10:31
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      fontWeight: "500",
                    }}
                  >
                    Jun reported a flat tire · marked unavailable
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Dispatch
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>
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
                      Observed
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    n/a
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingRight: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "var(--brandInk)",
                    }}
                  >
                    Jun Reyes
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingLeft: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                      width: "56px",
                    }}
                  >
                    10:27
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      fontWeight: "500",
                    }}
                  >
                    Refund request from Paolo Lim escalated
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Messages
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>
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
                      Blocked by policy
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Refunds, credits and discounts
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingRight: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "var(--brandInk)",
                    }}
                  >
                    HAM-416
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingLeft: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                      width: "56px",
                    }}
                  >
                    10:20
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      fontWeight: "500",
                    }}
                  >
                    Asked Jun to retake a blurry photo at #1041 · retake passed
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Proof
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>
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
                      Ran alone
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Ask the driver to retake a photo
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingRight: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "var(--brandInk)",
                    }}
                  >
                    #1041
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingLeft: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                      width: "56px",
                    }}
                  >
                    09:58
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      fontWeight: "500",
                    }}
                  >
                    Created order draft from WhatsApp message (82% parsed)
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Intake
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>
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
                      Asked you
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Turn WhatsApp and email requests into orders
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingRight: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "var(--brandInk)",
                    }}
                  >
                    HAM-414
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingLeft: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      color: "var(--mute)",
                      width: "56px",
                    }}
                  >
                    07:52
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      fontWeight: "500",
                    }}
                  >
                    Published today&#39;s plan · 12 stops across 4 drivers
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Dispatch
                  </td>
                  <td style={{ padding: "9px 10px", borderBottom: "1px solid var(--line)", verticalAlign: "top" }}>
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
                      Approved by Maria
                    </span>
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      color: "var(--ink2)",
                    }}
                  >
                    Send the morning route plan to drivers
                  </td>
                  <td
                    style={{
                      padding: "9px 10px",
                      borderBottom: "1px solid var(--line)",
                      verticalAlign: "top",
                      paddingRight: "14px",
                      fontFamily: "'IBM Plex Mono', monospace",
                      fontSize: "12px",
                      color: "var(--brandInk)",
                    }}
                  >
                    Plan 12 Oct
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>{" "}
      </main>{" "}
    </>
  );
}
