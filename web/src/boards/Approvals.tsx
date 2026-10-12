/* eslint-disable */
// Converted from design/project/Approvals.dc.html. Holes: showBefore, seeBefore, seeAfter, showAfter
export default function ApprovalsBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
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
          {" "}
          <div style={{ flex: "1 1 320px" }}>
            {" "}
            <h1 style={{ margin: "0", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.01em" }}>Approvals</h1>{" "}
            <div style={{ color: "var(--mute)", marginTop: "2px" }}>
              Agent actions held by your autonomy policies. Rejections are recorded as overrides.
            </div>{" "}
          </div>{" "}
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
          </a>{" "}
        </div>{" "}
        <div role="tablist" aria-label="Queue" style={{ display: "flex", gap: "20px", borderBottom: "1px solid var(--line)" }}>
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
            Pending <span style={{ fontSize: "11px", background: "var(--brandTint)", borderRadius: "99px", padding: "0 6px" }}>2</span>
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
            Escalated <span style={{ fontSize: "11px", background: "#F2F4F7", borderRadius: "99px", padding: "0 6px" }}>1</span>
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
            Auto-executed <span style={{ fontSize: "11px", background: "#F2F4F7", borderRadius: "99px", padding: "0 6px" }}>52</span>
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
            Decided
          </button>{" "}
        </div>{" "}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "flex-start" }}>
          {" "}
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
            {" "}
            <a
              href="/app/approvals"
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                padding: "12px 14px",
                borderBottom: "1px solid var(--line)",
                background: "var(--brandTint)",
                boxShadow: "inset 3px 0 0 var(--brandInk)",
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
                  High
                </span>
                <span style={{ fontSize: "12px", color: "var(--mute)", flex: "1" }}>Dispatch agent</span>
                <span style={{ fontSize: "12px", color: "var(--mute)" }}>9m</span>
              </div>{" "}
              <div style={{ fontWeight: "600", marginTop: "6px" }}>Reassign 3 stops from Jun Reyes</div>{" "}
              <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "2px" }}>Incident: flat tire · 2 windows at risk</div>{" "}
            </a>{" "}
            <a
              href="/app/approvals"
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
                padding: "12px 14px",
                borderBottom: "1px solid var(--line)",
              }}
            >
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
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
                  Medium
                </span>
                <span style={{ fontSize: "12px", color: "var(--mute)", flex: "1" }}>Dispatch agent</span>
                <span style={{ fontSize: "12px", color: "var(--mute)" }}>27m</span>
              </div>{" "}
              <div style={{ fontWeight: "600", marginTop: "6px" }}>Create order WA-0912 from WhatsApp</div>{" "}
              <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "2px" }}>82% confidence · below 95% policy threshold</div>{" "}
            </a>{" "}
            <a href="/app/approvals" style={{ display: "block", textDecoration: "none", color: "inherit", padding: "12px 14px" }}>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "var(--ink2)",
                    background: "#F2F4F7",
                    border: "1px solid var(--line2)",
                    borderRadius: "4px",
                    padding: "0 6px",
                  }}
                >
                  Escalated
                </span>
                <span style={{ fontSize: "12px", color: "var(--mute)", flex: "1" }}>Assurance agent</span>
                <span style={{ fontSize: "12px", color: "var(--mute)" }}>15m</span>
              </div>{" "}
              <div style={{ fontWeight: "600", marginTop: "6px" }}>Refund request · Paolo Lim #1045</div>{" "}
              <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "2px" }}>Blocked by policy: refunds are never automated</div>{" "}
            </a>{" "}
          </section>{" "}
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
            {" "}
            <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--line)" }}>
              {" "}
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "8px",
                  color: "var(--mute)",
                  fontSize: "12px",
                }}
              >
                <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>HAM-417</span>
                <span>·</span>
                <span>Created 10:33 by Dispatch agent</span>
                <span>·</span>
                <span>Policy: Reassign stops (Ask, auto ≤ 1 stop)</span>
              </div>{" "}
              <h2 style={{ margin: "8px 0 0", fontSize: "18px", fontWeight: "600" }}>Reassign 3 stops from Jun Reyes</h2>{" "}
              <p style={{ margin: "6px 0 0", color: "var(--ink2)", lineHeight: "1.55" }}>
                Jun reported a flat tire at 10:31 on EDSA near Guadalupe. He estimates about an hour to get it fixed. That would make 2 of
                his remaining deliveries late.
              </p>{" "}
            </div>{" "}
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)" }}>
              {" "}
              <div style={{ fontWeight: "600", marginBottom: "10px" }}>What happens to Jun&#39;s 3 remaining deliveries</div>{" "}
              {v.showBefore && (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
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
                      <button
                        onClick={h.seeBefore}
                        aria-pressed="true"
                        style={{
                          font: "inherit",
                          fontSize: "13px",
                          fontWeight: "600",
                          height: "32px",
                          padding: "0 14px",
                          border: "0",
                          background: "var(--panel)",
                          color: "var(--ink)",
                          borderRadius: "5px",
                          boxShadow: "0 1px 2px rgba(16,24,40,.12)",
                          cursor: "pointer",
                        }}
                      >
                        If you do nothing
                      </button>
                      <button
                        onClick={h.seeAfter}
                        aria-pressed="false"
                        style={{
                          font: "inherit",
                          fontSize: "13px",
                          height: "32px",
                          padding: "0 14px",
                          border: "0",
                          background: "none",
                          color: "var(--ink2)",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        If you approve
                      </button>
                    </div>
                  </div>
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
                    <div>
                      <b style={{ color: "var(--ink)" }}>We don&#39;t know exactly when the tire will be fixed.</b> Times below assume Jun
                      is back between <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>11:30</span> and{" "}
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>12:00</span>, based on <b>his report</b> (&#34;about 1
                      hour&#34;) and <b>his last 2 flats</b> (50 and 70 min). Even in the best case (back by 11:00), #1042 and #1049 are
                      still late. If Jun taps &#34;I&#39;m back on the road&#34; sooner, these times update.
                    </div>
                  </div>
                  <div style={{ border: "1px solid var(--line)", borderRadius: "6px", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: "520px", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <th
                            style={{
                              padding: "8px 12px",
                              fontWeight: "500",
                              fontSize: "12px",
                              color: "var(--mute)",
                              textAlign: "left",
                              background: "var(--sub)",
                            }}
                          >
                            Delivery
                          </th>
                          <th
                            style={{
                              padding: "8px 12px",
                              fontWeight: "500",
                              fontSize: "12px",
                              color: "var(--mute)",
                              textAlign: "left",
                              background: "var(--sub)",
                            }}
                          >
                            Driver
                          </th>
                          <th
                            style={{
                              padding: "8px 12px",
                              fontWeight: "500",
                              fontSize: "12px",
                              color: "var(--mute)",
                              textAlign: "left",
                              background: "var(--sub)",
                            }}
                          >
                            Arrives
                          </th>
                          <th
                            style={{
                              padding: "8px 12px",
                              fontWeight: "500",
                              fontSize: "12px",
                              color: "var(--mute)",
                              textAlign: "left",
                              background: "var(--sub)",
                            }}
                          >
                            Must arrive by
                          </th>
                          <th
                            style={{
                              padding: "8px 12px",
                              fontWeight: "500",
                              fontSize: "12px",
                              color: "var(--mute)",
                              textAlign: "left",
                              background: "var(--sub)",
                            }}
                          >
                            Result
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: "600" }}>#1042</span> Mark Tan
                            <div style={{ fontSize: "12px", color: "var(--mute)" }}>BGC</div>
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>Jun</td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                            }}
                          >
                            13:40–14:10
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                              color: "var(--mute)",
                            }}
                          >
                            13:00
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "var(--err)",
                                background: "var(--errBg)",
                                border: "1px solid var(--errLine)",
                                borderRadius: "4px",
                                padding: "1px 8px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              40–70 min late
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: "600" }}>#1050</span> Nicole Ramos
                            <div style={{ fontSize: "12px", color: "var(--mute)" }}>BGC</div>
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>Jun</td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                            }}
                          >
                            14:05–14:35
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                              color: "var(--mute)",
                            }}
                          >
                            15:00
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "var(--ok)",
                                background: "var(--okBg)",
                                border: "1px solid var(--okLine)",
                                borderRadius: "4px",
                                padding: "1px 8px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              On time
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: "600" }}>#1049</span> Sam Ocampo
                            <div style={{ fontSize: "12px", color: "var(--mute)" }}>Makati</div>
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>Jun</td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                            }}
                          >
                            13:55–14:25
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                              color: "var(--mute)",
                            }}
                          >
                            13:00
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "var(--err)",
                                background: "var(--errBg)",
                                border: "1px solid var(--errLine)",
                                borderRadius: "4px",
                                padding: "1px 8px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              55–85 min late
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "8px" }}>
                    No extra driving · customers #1042 and #1049 get a late-delivery apology
                  </div>
                </>
              )}{" "}
              {v.showAfter && (
                <>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "12px",
                    }}
                  >
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
                      <button
                        onClick={h.seeBefore}
                        aria-pressed="false"
                        style={{
                          font: "inherit",
                          fontSize: "13px",
                          height: "32px",
                          padding: "0 14px",
                          border: "0",
                          background: "none",
                          color: "var(--ink2)",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        If you do nothing
                      </button>
                      <button
                        onClick={h.seeAfter}
                        aria-pressed="true"
                        style={{
                          font: "inherit",
                          fontSize: "13px",
                          fontWeight: "600",
                          height: "32px",
                          padding: "0 14px",
                          border: "0",
                          background: "var(--panel)",
                          color: "var(--ink)",
                          borderRadius: "5px",
                          boxShadow: "0 1px 2px rgba(16,24,40,.12)",
                          cursor: "pointer",
                        }}
                      >
                        If you approve
                      </button>
                    </div>
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: "600", marginBottom: "10px" }}>
                    Ana and Rico deliver them instead. <span style={{ color: "var(--ok)" }}>All 3 arrive on time.</span>
                  </div>
                  <div style={{ border: "1px solid var(--line)", borderRadius: "6px", overflowX: "auto" }}>
                    <table style={{ width: "100%", minWidth: "520px", borderCollapse: "collapse" }}>
                      <thead>
                        <tr>
                          <th
                            style={{
                              padding: "8px 12px",
                              fontWeight: "500",
                              fontSize: "12px",
                              color: "var(--mute)",
                              textAlign: "left",
                              background: "var(--sub)",
                            }}
                          >
                            Delivery
                          </th>
                          <th
                            style={{
                              padding: "8px 12px",
                              fontWeight: "500",
                              fontSize: "12px",
                              color: "var(--mute)",
                              textAlign: "left",
                              background: "var(--sub)",
                            }}
                          >
                            Driver
                          </th>
                          <th
                            style={{
                              padding: "8px 12px",
                              fontWeight: "500",
                              fontSize: "12px",
                              color: "var(--mute)",
                              textAlign: "left",
                              background: "var(--sub)",
                            }}
                          >
                            Arrives
                          </th>
                          <th
                            style={{
                              padding: "8px 12px",
                              fontWeight: "500",
                              fontSize: "12px",
                              color: "var(--mute)",
                              textAlign: "left",
                              background: "var(--sub)",
                            }}
                          >
                            Must arrive by
                          </th>
                          <th
                            style={{
                              padding: "8px 12px",
                              fontWeight: "500",
                              fontSize: "12px",
                              color: "var(--mute)",
                              textAlign: "left",
                              background: "var(--sub)",
                            }}
                          >
                            Result
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: "600" }}>#1042</span> Mark Tan
                            <div style={{ fontSize: "12px", color: "var(--mute)" }}>BGC</div>
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span style={{ color: "var(--mute)", textDecoration: "line-through" }}>Jun</span> <b>Ana</b>
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                            }}
                          >
                            12:15
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                              color: "var(--mute)",
                            }}
                          >
                            13:00
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "var(--ok)",
                                background: "var(--okBg)",
                                border: "1px solid var(--okLine)",
                                borderRadius: "4px",
                                padding: "1px 8px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              On time
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: "600" }}>#1050</span> Nicole Ramos
                            <div style={{ fontSize: "12px", color: "var(--mute)" }}>BGC</div>
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span style={{ color: "var(--mute)", textDecoration: "line-through" }}>Jun</span> <b>Ana</b>
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                            }}
                          >
                            12:40
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                              color: "var(--mute)",
                            }}
                          >
                            15:00
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "var(--ok)",
                                background: "var(--okBg)",
                                border: "1px solid var(--okLine)",
                                borderRadius: "4px",
                                padding: "1px 8px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              On time
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontWeight: "600" }}>#1049</span> Sam Ocampo
                            <div style={{ fontSize: "12px", color: "var(--mute)" }}>Makati</div>
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span style={{ color: "var(--mute)", textDecoration: "line-through" }}>Jun</span> <b>Rico</b>
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                            }}
                          >
                            11:05
                          </td>
                          <td
                            style={{
                              padding: "10px 12px",
                              borderTop: "1px solid var(--line)",
                              fontFamily: "'IBM Plex Mono', monospace",
                              color: "var(--mute)",
                            }}
                          >
                            13:00
                          </td>
                          <td style={{ padding: "10px 12px", borderTop: "1px solid var(--line)" }}>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "600",
                                color: "var(--ok)",
                                background: "var(--okBg)",
                                border: "1px solid var(--okLine)",
                                borderRadius: "4px",
                                padding: "1px 8px",
                                whiteSpace: "nowrap",
                              }}
                            >
                              On time
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "8px" }}>
                    +9 km extra driving (≈ ₱95) · all 3 customers get their new arrival time on WhatsApp
                  </div>
                </>
              )}{" "}
            </div>{" "}
            <div
              style={{
                padding: "14px 18px",
                borderBottom: "1px solid var(--line)",
                display: "flex",
                flexWrap: "wrap",
                gap: "24px",
              }}
            >
              {" "}
              <div style={{ flex: "1 1 280px" }}>
                {" "}
                <div style={{ fontWeight: "600", marginBottom: "6px" }}>Agent reasoning</div>{" "}
                <ul style={{ margin: "0", paddingLeft: "18px", color: "var(--ink2)", lineHeight: "1.65" }}>
                  <li>Ana has the lightest load and is 14 min from BGC. Ben Cruz moved to 15:00, freeing her midday.</li>
                  <li>Rico is idle in Makati, 6 min from Joya Lofts, which has clear lobby instructions.</li>
                  <li>All three windows hold after the move. Added driving: +9 km.</li>
                </ul>{" "}
              </div>{" "}
              <div style={{ flex: "1 1 200px" }}>
                {" "}
                <div style={{ fontWeight: "600", marginBottom: "6px" }}>On approval</div>{" "}
                <ul style={{ margin: "0", paddingLeft: "18px", color: "var(--ink2)", lineHeight: "1.65" }}>
                  <li>Routes re-sequenced for Ana and Rico</li>
                  <li>3 customers notified with new ETAs</li>
                  <li>Incident logged on Jun&#39;s profile</li>
                </ul>{" "}
              </div>{" "}
            </div>{" "}
            <div
              style={{
                padding: "12px 18px",
                borderBottom: "1px solid var(--line)",
                display: "flex",
                flexWrap: "wrap",
                gap: "18px",
                color: "var(--mute)",
                fontSize: "12px",
              }}
            >
              {" "}
              <span>
                Similar requests (30 days): <b style={{ color: "var(--ink2)" }}>23 of 24 approved</b>
              </span>{" "}
              <span>
                Model confidence: <b style={{ color: "var(--ink2)" }}>0.91</b>
              </span>{" "}
              <span>Inputs: GPS, driver report, address book, 8-week driver history</span>{" "}
            </div>{" "}
            <div
              style={{
                marginTop: "auto",
                padding: "12px 18px",
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                alignItems: "center",
                background: "var(--sub)",
                borderRadius: "0 0 8px 8px",
              }}
            >
              {" "}
              <label style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--ink2)", flex: "1" }}>
                <input type="checkbox" defaultChecked />
                Notify affected customers
              </label>{" "}
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
                Reject
              </button>{" "}
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
                Edit assignment
              </button>{" "}
              <a
                href="/app"
                style={{
                  height: "34px",
                  padding: "0 16px",
                  borderRadius: "6px",
                  background: "var(--brandInk)",
                  color: "#fff",
                  fontWeight: "600",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                Approve
              </a>{" "}
            </div>{" "}
          </section>{" "}
        </div>{" "}
      </main>{" "}
    </>
  );
}
