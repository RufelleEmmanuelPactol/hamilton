/* eslint-disable */
// Converted from design/project/Autonomy.dc.html. Holes: showStdSec, toggleHelp, f_all, showAll, nf_all, f_std, showStd, nf_std, f_yours, showYours, nf_yours, help, showYoursSec
export default function AutonomyBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
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
            <h1 style={{ margin: "0", fontSize: "20px", fontWeight: "600", letterSpacing: "-0.01em" }}>Autonomy policies</h1>
            <div style={{ color: "var(--mute)", marginTop: "2px" }}>
              What agents may do alone, what needs approval, and what is never automated.
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
            + New trigger
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
            Simulate on last week
          </button>{" "}
          <button
            style={{
              font: "inherit",
              fontWeight: "600",
              height: "34px",
              padding: "0 14px",
              border: "0",
              borderRadius: "6px",
              background: "var(--brandInk)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Save changes
          </button>{" "}
        </div>{" "}
        <section
          aria-label="Policy summary"
          style={{
            background: "var(--panel)",
            border: "1px solid var(--line)",
            borderRadius: "8px",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
          }}
        >
          {" "}
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Auto</div>
            <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px" }}>6</div>
          </div>{" "}
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Auto if…</div>
            <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px" }}>3</div>
          </div>
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Ask me</div>
            <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px" }}>2</div>
          </div>{" "}
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Never</div>
            <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px" }}>1</div>
          </div>{" "}
          <div style={{ padding: "12px 16px", borderRight: "1px solid var(--line)" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Actions (30d)</div>
            <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px" }}>
              1,284 <span style={{ fontSize: "12px", color: "var(--mute)", fontWeight: "400" }}>89% auto</span>
            </div>
          </div>{" "}
          <div style={{ padding: "12px 16px" }}>
            <div style={{ color: "var(--mute)", fontWeight: "500" }}>Approved (30d)</div>
            <div style={{ fontSize: "22px", fontWeight: "600", marginTop: "4px" }}>94%</div>
          </div>{" "}
        </section>{" "}
        {v.showStdSec && (
          <>
            <section
              aria-label="Standard policies"
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
                  position: "relative",
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>Standard policies</h2>
                <button
                  onClick={h.toggleHelp}
                  aria-label="How policies work"
                  title="How policies work"
                  style={{
                    width: "22px",
                    height: "22px",
                    borderRadius: "99px",
                    border: "1px solid var(--line2)",
                    background: "var(--panel)",
                    color: "var(--mute)",
                    font: "inherit",
                    fontSize: "12px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    padding: "0",
                  }}
                >
                  ?
                </button>
                <span style={{ flex: "1" }}></span>
                <div
                  role="group"
                  aria-label="Show"
                  style={{
                    display: "inline-flex",
                    gap: "2px",
                    padding: "2px",
                    background: "#F2F4F7",
                    border: "1px solid var(--line)",
                    borderRadius: "7px",
                  }}
                >
                  {v.f_all && (
                    <>
                      <button
                        onClick={h.showAll}
                        aria-pressed="true"
                        style={{
                          font: "inherit",
                          fontSize: "12px",
                          fontWeight: "600",
                          height: "26px",
                          padding: "0 10px",
                          border: "0",
                          background: "var(--panel)",
                          color: "var(--ink)",
                          borderRadius: "5px",
                          boxShadow: "0 1px 2px rgba(16,24,40,.12)",
                          cursor: "pointer",
                        }}
                      >
                        All <span style={{ color: "var(--mute)", fontWeight: "400" }}>16</span>
                      </button>
                    </>
                  )}
                  {v.nf_all && (
                    <>
                      <button
                        onClick={h.showAll}
                        aria-pressed="false"
                        style={{
                          font: "inherit",
                          fontSize: "12px",
                          height: "26px",
                          padding: "0 10px",
                          border: "0",
                          background: "none",
                          color: "var(--ink2)",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        All <span style={{ color: "var(--mute)" }}>16</span>
                      </button>
                    </>
                  )}
                  {v.f_std && (
                    <>
                      <button
                        onClick={h.showStd}
                        aria-pressed="true"
                        style={{
                          font: "inherit",
                          fontSize: "12px",
                          fontWeight: "600",
                          height: "26px",
                          padding: "0 10px",
                          border: "0",
                          background: "var(--panel)",
                          color: "var(--ink)",
                          borderRadius: "5px",
                          boxShadow: "0 1px 2px rgba(16,24,40,.12)",
                          cursor: "pointer",
                        }}
                      >
                        Standard <span style={{ color: "var(--mute)", fontWeight: "400" }}>12</span>
                      </button>
                    </>
                  )}
                  {v.nf_std && (
                    <>
                      <button
                        onClick={h.showStd}
                        aria-pressed="false"
                        style={{
                          font: "inherit",
                          fontSize: "12px",
                          height: "26px",
                          padding: "0 10px",
                          border: "0",
                          background: "none",
                          color: "var(--ink2)",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Standard <span style={{ color: "var(--mute)" }}>12</span>
                      </button>
                    </>
                  )}
                  {v.f_yours && (
                    <>
                      <button
                        onClick={h.showYours}
                        aria-pressed="true"
                        style={{
                          font: "inherit",
                          fontSize: "12px",
                          fontWeight: "600",
                          height: "26px",
                          padding: "0 10px",
                          border: "0",
                          background: "var(--panel)",
                          color: "var(--ink)",
                          borderRadius: "5px",
                          boxShadow: "0 1px 2px rgba(16,24,40,.12)",
                          cursor: "pointer",
                        }}
                      >
                        Yours <span style={{ color: "var(--mute)", fontWeight: "400" }}>4</span>
                      </button>
                    </>
                  )}
                  {v.nf_yours && (
                    <>
                      <button
                        onClick={h.showYours}
                        aria-pressed="false"
                        style={{
                          font: "inherit",
                          fontSize: "12px",
                          height: "26px",
                          padding: "0 10px",
                          border: "0",
                          background: "none",
                          color: "var(--ink2)",
                          borderRadius: "5px",
                          cursor: "pointer",
                        }}
                      >
                        Yours <span style={{ color: "var(--mute)" }}>4</span>
                      </button>
                    </>
                  )}
                </div>
                {v.help && (
                  <>
                    <div
                      role="dialog"
                      aria-label="How policies work"
                      style={{
                        position: "absolute",
                        top: "40px",
                        left: "14px",
                        zIndex: "5",
                        width: "380px",
                        background: "var(--panel)",
                        border: "1px solid var(--line)",
                        borderRadius: "8px",
                        boxShadow: "0 12px 24px rgba(16,24,40,.14)",
                        padding: "14px 16px",
                        fontSize: "13px",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <b style={{ flex: "1" }}>How policies work</b>
                        <button
                          onClick={h.toggleHelp}
                          aria-label="Close"
                          style={{
                            border: "0",
                            background: "none",
                            color: "var(--mute)",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                        >
                          ×
                        </button>
                      </div>
                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "11px",
                          fontWeight: "600",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "var(--mute)",
                        }}
                      >
                        Modes
                      </div>
                      <div style={{ display: "flex", gap: "10px", padding: "4px 0" }}>
                        <b style={{ flex: "0 0 64px", color: "var(--ok)" }}>Auto</b>
                        <span style={{ color: "var(--ink2)" }}>Runs on its own.</span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", padding: "4px 0" }}>
                        <b style={{ flex: "0 0 64px", color: "var(--info)" }}>Auto if…</b>
                        <span style={{ color: "var(--ink2)" }}>Runs on its own within your limit. Otherwise asks you.</span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", padding: "4px 0" }}>
                        <b style={{ flex: "0 0 64px", color: "var(--ink)" }}>Ask me</b>
                        <span style={{ color: "var(--ink2)" }}>Creates a ticket in Approvals.</span>
                      </div>
                      <div style={{ display: "flex", gap: "10px", padding: "4px 0" }}>
                        <b style={{ flex: "0 0 64px", color: "var(--err)" }}>Never</b>
                        <span style={{ color: "var(--ink2)" }}>Always handled by a person.</span>
                      </div>
                      <div
                        style={{
                          marginTop: "10px",
                          fontSize: "11px",
                          fontWeight: "600",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "var(--mute)",
                        }}
                      >
                        Two kinds
                      </div>
                      <div style={{ color: "var(--ink2)", paddingTop: "4px" }}>
                        <b style={{ color: "var(--ink)" }}>Standard</b> are built into Hamilton. You can change the mode and limits, not
                        delete them.
                      </div>
                      <div style={{ color: "var(--ink2)", paddingTop: "4px" }}>
                        <b style={{ color: "var(--ink)" }}>Yours</b> are triggers your team wrote in plain language. They appear below the
                        standard ones.
                      </div>
                      <div style={{ color: "var(--mute)", paddingTop: "8px", fontSize: "12px" }}>
                        Use the All / Standard / Yours filter to show one kind.
                      </div>
                    </div>
                  </>
                )}
              </div>{" "}
              <div style={{ overflowX: "auto" }}>
                {" "}
                <table style={{ width: "100%", minWidth: "860px", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ background: "var(--sub)", textAlign: "left", color: "var(--mute)", fontSize: "12px" }}>
                      <th style={{ padding: "8px 14px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Action</th>
                      <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Agent</th>
                      <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>Mode</th>
                      <th style={{ padding: "8px 10px", fontWeight: "500", borderBottom: "1px solid var(--line)" }}>
                        Runs alone only when…
                      </th>
                      <th
                        style={{
                          padding: "8px 10px",
                          fontWeight: "500",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                        }}
                      >
                        30d actions
                      </th>
                      <th
                        style={{
                          padding: "8px 14px",
                          fontWeight: "500",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                        }}
                      >
                        Approved
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ background: "#FCFCFD" }}>
                      <td
                        colSpan={6}
                        style={{
                          padding: "7px 14px",
                          borderBottom: "1px solid var(--line)",
                          fontSize: "11px",
                          fontWeight: "600",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "var(--mute)",
                        }}
                      >
                        Customers
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: "500" }}>Text customers delivery updates</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                          WhatsApp or SMS when the driver leaves, arrives, delivers (with photo), or the ETA will miss the window
                        </div>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>Assurance</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--okLine)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--okBg)",
                            color: "var(--ok)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Auto</option>
                          <option>Auto if…</option>
                          <option>Ask me</option>
                          <option>Never</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>Always</td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        812
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          color: "var(--mute)",
                        }}
                      >
                        n/a
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: "500" }}>Move a delivery to a later time today</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                          When the customer asks for a new time, or the current ETA will miss their window
                        </div>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>Assurance</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--okLine)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--okBg)",
                            color: "var(--ok)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Auto</option>
                          <option>Auto if…</option>
                          <option>Ask me</option>
                          <option>Never</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>
                        The new time is before 19:00
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        46
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          color: "var(--mute)",
                        }}
                      >
                        n/a
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: "500" }}>Move a delivery to another date</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                          When the customer asks; checks that date&#39;s driver capacity first
                        </div>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>Assurance</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--line2)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--panel)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Ask me</option>
                          <option>Auto</option>
                          <option>Auto if…</option>
                          <option>Never</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>
                        Never runs alone. Always asks you
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        9
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        100%
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: "500" }}>Leave the parcel with a guard, concierge or neighbour</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>Instead of failing the delivery when nobody is home</div>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>Assurance</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--infoLine)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--infoBg)",
                            color: "var(--info)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Auto if…</option>
                          <option>Auto</option>
                          <option>Ask me</option>
                          <option>Never</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>
                        The customer said yes in writing. Otherwise asks you
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        31
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        97%
                      </td>
                    </tr>
                    <tr style={{ background: "#FCFCFD" }}>
                      <td
                        colSpan={6}
                        style={{
                          padding: "7px 14px",
                          borderBottom: "1px solid var(--line)",
                          fontSize: "11px",
                          fontWeight: "600",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "var(--mute)",
                        }}
                      >
                        Dispatch
                      </td>
                    </tr>
                    <tr style={{ background: "var(--brandTint)" }}>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: "500" }}>Move stops from one driver to another</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                          After a breakdown, break or delay, if every affected window still holds ·{" "}
                          <span style={{ color: "var(--brandInk)" }}>1 suggestion</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>Dispatch</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--infoLine)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--infoBg)",
                            color: "var(--info)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Auto if…</option>
                          <option>Auto</option>
                          <option>Ask me</option>
                          <option>Never</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>
                        Moving{" "}
                        <input
                          aria-label="Stop limit"
                          defaultValue="1"
                          style={{
                            font: "inherit",
                            width: "32px",
                            height: "24px",
                            border: "1px solid var(--line2)",
                            borderRadius: "4px",
                            textAlign: "center",
                          }}
                        />{" "}
                        stop or fewer. More than that asks you
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        24
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        96%
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: "500" }}>Change the order of a driver&#39;s remaining stops</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                          To fit a reschedule or avoid a late arrival; same driver, same stops
                        </div>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>Dispatch</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--okLine)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--okBg)",
                            color: "var(--ok)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Auto</option>
                          <option>Auto if…</option>
                          <option>Ask me</option>
                          <option>Never</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>
                        No stop ends up outside its window
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        138
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          color: "var(--mute)",
                        }}
                      >
                        n/a
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: "500" }}>Add a same-day order to a driver already on the road</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                          Uses the open slot held in the morning plan. Orders after the 14:00 cutoff go to tomorrow
                        </div>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>Dispatch</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--okLine)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--okBg)",
                            color: "var(--ok)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Auto</option>
                          <option>Auto if…</option>
                          <option>Ask me</option>
                          <option>Never</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>
                        It adds 12 min or less, and no other stop ends up late
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        41
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          color: "var(--mute)",
                        }}
                      >
                        n/a
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: "500" }}>Send the morning route plan to drivers</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                          Who delivers what, in which order, published to the driver app
                        </div>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>Dispatch</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--line2)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--panel)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Ask me</option>
                          <option>Auto</option>
                          <option>Auto if…</option>
                          <option>Never</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--mute)" }}>
                        Never runs alone. Always asks you
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        26
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        100%
                      </td>
                    </tr>
                    <tr style={{ background: "var(--brandTint)" }}>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: "500" }}>Turn WhatsApp and email requests into orders</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                          Fills recipient, address, items and window from the message ·{" "}
                          <span style={{ color: "var(--brandInk)" }}>1 suggestion</span>
                        </div>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>Dispatch</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--infoLine)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--infoBg)",
                            color: "var(--info)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Auto if…</option>
                          <option>Auto</option>
                          <option>Ask me</option>
                          <option>Never</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>
                        Hamilton is{" "}
                        <input
                          aria-label="Confidence threshold"
                          defaultValue="95"
                          style={{
                            font: "inherit",
                            width: "36px",
                            height: "24px",
                            border: "1px solid var(--line2)",
                            borderRadius: "4px",
                            textAlign: "center",
                          }}
                        />
                        % or more sure it read the order correctly. Otherwise asks you
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        58
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        91%
                      </td>
                    </tr>
                    <tr style={{ background: "#FCFCFD" }}>
                      <td
                        colSpan={6}
                        style={{
                          padding: "7px 14px",
                          borderBottom: "1px solid var(--line)",
                          fontSize: "11px",
                          fontWeight: "600",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                          color: "var(--mute)",
                        }}
                      >
                        Proof, memory &amp; money
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: "500" }}>Ask the driver to retake a proof photo</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                          When the photo is blurry, the parcel isn&#39;t visible, or it&#39;s the wrong door
                        </div>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>Proof</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--okLine)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--okBg)",
                            color: "var(--ok)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Auto</option>
                          <option>Auto if…</option>
                          <option>Ask me</option>
                          <option>Never</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>
                        The driver is still at the address
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        41
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          color: "var(--mute)",
                        }}
                      >
                        n/a
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)" }}>
                        <div style={{ fontWeight: "500" }}>Record what was learned</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                          Add address notes (best time, gate code, safe-drop) and driver patterns
                        </div>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>All</td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--okLine)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--okBg)",
                            color: "var(--ok)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Auto</option>
                          <option>Auto if…</option>
                          <option>Ask me</option>
                          <option>Never</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", borderBottom: "1px solid var(--line)", color: "var(--ink2)" }}>
                        Each note links to the message or delivery it came from
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          fontFamily: "'IBM Plex Mono', monospace",
                        }}
                      >
                        97
                      </td>
                      <td
                        style={{
                          padding: "10px 14px",
                          borderBottom: "1px solid var(--line)",
                          textAlign: "right",
                          color: "var(--mute)",
                        }}
                      >
                        n/a
                      </td>
                    </tr>
                    <tr>
                      <td style={{ padding: "10px 14px" }}>
                        <div style={{ fontWeight: "500" }}>Issue refunds, credits or discounts</div>
                        <div style={{ fontSize: "12px", color: "var(--mute)" }}>Anything that moves money</div>
                      </td>
                      <td style={{ padding: "10px", color: "var(--ink2)" }}>All</td>
                      <td style={{ padding: "10px" }}>
                        <select
                          aria-label="Mode"
                          style={{
                            font: "inherit",
                            height: "28px",
                            border: "1px solid var(--errLine)",
                            borderRadius: "6px",
                            padding: "0 6px",
                            background: "var(--errBg)",
                            color: "var(--err)",
                            fontWeight: "600",
                          }}
                        >
                          <option>Never</option>
                          <option>Ask me</option>
                          <option>Auto</option>
                        </select>
                      </td>
                      <td style={{ padding: "10px", color: "var(--mute)" }}>Never. Always sent to you</td>
                      <td style={{ padding: "10px", textAlign: "right", fontFamily: "'IBM Plex Mono', monospace" }}>2</td>
                      <td style={{ padding: "10px 14px", textAlign: "right", color: "var(--mute)" }}>n/a</td>
                    </tr>
                  </tbody>
                </table>{" "}
              </div>{" "}
            </section>
          </>
        )}{" "}
        {v.showYoursSec && (
          <>
            <section
              aria-label="Your triggers"
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
                  alignItems: "center",
                  gap: "10px",
                  padding: "10px 14px",
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <div style={{ flex: "1" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <h2 style={{ margin: "0", fontSize: "14px", fontWeight: "600" }}>Your triggers</h2>
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>Written by your team in plain language</div>
                </div>
              </div>{" "}
              <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
                <div style={{ display: "flex", gap: "8px" }}>
                  <input
                    aria-label="Describe a trigger"
                    defaultValue="If a delivery to an office is after 4pm, message reception an hour before"
                    style={{
                      font: "inherit",
                      flex: "1",
                      minWidth: "0",
                      height: "36px",
                      border: "1px solid var(--line2)",
                      borderRadius: "6px",
                      padding: "0 10px",
                      background: "var(--panel)",
                    }}
                  />
                  <button
                    style={{
                      font: "inherit",
                      fontWeight: "600",
                      height: "36px",
                      padding: "0 14px",
                      border: "0",
                      borderRadius: "6px",
                      background: "var(--brandInk)",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Add trigger
                  </button>
                </div>
                <div
                  style={{
                    marginTop: "10px",
                    border: "1px dashed var(--line2)",
                    borderRadius: "6px",
                    padding: "10px 12px",
                    background: "var(--sub)",
                  }}
                >
                  <div style={{ fontSize: "12px", fontWeight: "600", color: "var(--ink2)" }}>Hamilton will read this as</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                    <span
                      title="Judged by the triage model on each message or order"
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "var(--brandInk)",
                        background: "var(--brandTint)",
                        border: "1px solid #F8BBD0",
                        borderRadius: "4px",
                        padding: "0 6px",
                      }}
                    >
                      Semantic
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                      destination is an office ← address notes, building type
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                    <span
                      title="Checked against order data. Exact, instant, free."
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "var(--info)",
                        background: "var(--infoBg)",
                        border: "1px solid var(--infoLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                      }}
                    >
                      Static
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                      window.start &gt;= 16:00
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                    <span
                      title="Checked against order data. Exact, instant, free."
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "var(--info)",
                        background: "var(--infoBg)",
                        border: "1px solid var(--infoLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                      }}
                    >
                      Static
                    </span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                      send WhatsApp to address.reception_contact at ETA − 60 min
                    </span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginTop: "8px",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    <span>Would have fired 6× in the last 30 days</span>
                    <span style={{ flex: "1" }}></span>
                    <a href="/app/autonomy" style={{ fontWeight: "500", textDecoration: "none" }}>
                      See matches
                    </a>
                    <a href="/app/autonomy" style={{ fontWeight: "500", textDecoration: "none" }}>
                      Edit mapping
                    </a>
                  </div>
                </div>
              </div>{" "}
              <div style={{ display: "flex", gap: "12px", padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
                <span
                  style={{
                    width: "32px",
                    height: "18px",
                    borderRadius: "99px",
                    background: "var(--brandInk)",
                    position: "relative",
                    flex: "none",
                    marginTop: "2px",
                  }}
                  aria-label="Enabled"
                >
                  <span
                    style={{
                      position: "absolute",
                      right: "2px",
                      top: "2px",
                      width: "14px",
                      height: "14px",
                      borderRadius: "99px",
                      background: "#fff",
                    }}
                  ></span>
                </span>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ color: "var(--ink)", fontWeight: "500" }}>
                    Orders over ₱5,000 only go to Jun or Ana, and need a signature.
                  </div>
                  <div style={{ marginTop: "6px", paddingLeft: "10px", borderLeft: "2px solid var(--line)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                      <span
                        title="Checked against order data. Exact, instant, free."
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "var(--info)",
                          background: "var(--infoBg)",
                          border: "1px solid var(--infoLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                        }}
                      >
                        Static
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                        order.value &gt; 5000
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                      <span
                        title="Checked against order data. Exact, instant, free."
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "var(--info)",
                          background: "var(--infoBg)",
                          border: "1px solid var(--infoLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                        }}
                      >
                        Static
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                        assign ∈ {"{"}Jun, Ana{"}"} · proof = signature
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "var(--mute)", textAlign: "right", whiteSpace: "nowrap" }}>
                  Fired 14× · 30d
                  <br />
                  by Maria · 2 Sep
                </div>
              </div>{" "}
              <div style={{ display: "flex", gap: "12px", padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
                <span
                  style={{
                    width: "32px",
                    height: "18px",
                    borderRadius: "99px",
                    background: "var(--brandInk)",
                    position: "relative",
                    flex: "none",
                    marginTop: "2px",
                  }}
                  aria-label="Enabled"
                >
                  <span
                    style={{
                      position: "absolute",
                      right: "2px",
                      top: "2px",
                      width: "14px",
                      height: "14px",
                      borderRadius: "99px",
                      background: "#fff",
                    }}
                  ></span>
                </span>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ color: "var(--ink)", fontWeight: "500" }}>
                    When PAGASA issues an orange or red rain warning, add 30 minutes to ETAs and let customers know.
                  </div>
                  <div style={{ marginTop: "6px", paddingLeft: "10px", borderLeft: "2px solid var(--line)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                      <span
                        title="Checked against order data. Exact, instant, free."
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "var(--info)",
                          background: "var(--infoBg)",
                          border: "1px solid var(--infoLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                        }}
                      >
                        Static
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                        weather.pagasa ∈ {"{"}orange, red{"}"}
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                      <span
                        title="Checked against order data. Exact, instant, free."
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "var(--info)",
                          background: "var(--infoBg)",
                          border: "1px solid var(--infoLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                        }}
                      >
                        Static
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                        eta += 30m · notify all open orders
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "var(--mute)", textAlign: "right", whiteSpace: "nowrap" }}>
                  Fired 2× · 30d
                  <br />
                  by Maria · 18 Sep
                </div>
              </div>{" "}
              <div style={{ display: "flex", gap: "12px", padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
                <span
                  style={{
                    width: "32px",
                    height: "18px",
                    borderRadius: "99px",
                    background: "var(--brandInk)",
                    position: "relative",
                    flex: "none",
                    marginTop: "2px",
                  }}
                  aria-label="Enabled"
                >
                  <span
                    style={{
                      position: "absolute",
                      right: "2px",
                      top: "2px",
                      width: "14px",
                      height: "14px",
                      borderRadius: "99px",
                      background: "#fff",
                    }}
                  ></span>
                </span>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ color: "var(--ink)", fontWeight: "500" }}>
                    If a customer sounds upset, or the order is for a funeral or a hospital, a person replies instead of the assistant.
                  </div>
                  <div style={{ marginTop: "6px", paddingLeft: "10px", borderLeft: "2px solid var(--line)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                      <span
                        title="Judged by the triage model on each message or order"
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "var(--brandInk)",
                          background: "var(--brandTint)",
                          border: "1px solid #F8BBD0",
                          borderRadius: "4px",
                          padding: "0 6px",
                        }}
                      >
                        Semantic
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                        message tone = upset · confidence ≥ 0.8, else Ask me
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                      <span
                        title="Judged by the triage model on each message or order"
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "var(--brandInk)",
                          background: "var(--brandTint)",
                          border: "1px solid #F8BBD0",
                          borderRadius: "4px",
                          padding: "0 6px",
                        }}
                      >
                        Semantic
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                        occasion ∈ {"{"}funeral, hospital{"}"} ← order notes, card message
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                      <span
                        title="Checked against order data. Exact, instant, free."
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "var(--info)",
                          background: "var(--infoBg)",
                          border: "1px solid var(--infoLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                        }}
                      >
                        Static
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                        route thread to Needs you
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "var(--mute)", textAlign: "right", whiteSpace: "nowrap" }}>
                  Fired 9× · 30d · 1 corrected
                  <br />
                  by Leo · 5 Oct
                </div>
              </div>{" "}
              <div style={{ display: "flex", gap: "12px", padding: "12px 14px" }}>
                <span
                  style={{
                    width: "32px",
                    height: "18px",
                    borderRadius: "99px",
                    background: "var(--line2)",
                    position: "relative",
                    flex: "none",
                    marginTop: "2px",
                  }}
                  aria-label="Paused"
                >
                  <span
                    style={{
                      position: "absolute",
                      left: "2px",
                      top: "2px",
                      width: "14px",
                      height: "14px",
                      borderRadius: "99px",
                      background: "#fff",
                    }}
                  ></span>
                </span>
                <div style={{ flex: "1", minWidth: "0" }}>
                  <div style={{ color: "var(--mute)", fontWeight: "500" }}>Email corporate customers a PDF of the proof of delivery.</div>
                  <div style={{ marginTop: "6px", paddingLeft: "10px", borderLeft: "2px solid var(--line)" }}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                      <span
                        title="Checked against order data. Exact, instant, free."
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "var(--info)",
                          background: "var(--infoBg)",
                          border: "1px solid var(--infoLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                        }}
                      >
                        Static
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                        customer.tag = Corporate
                      </span>
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginTop: "4px" }}>
                      <span
                        title="Checked against order data. Exact, instant, free."
                        style={{
                          fontSize: "11px",
                          fontWeight: "600",
                          color: "var(--info)",
                          background: "var(--infoBg)",
                          border: "1px solid var(--infoLine)",
                          borderRadius: "4px",
                          padding: "0 6px",
                        }}
                      >
                        Static
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--ink2)" }}>
                        email POD PDF to customer.billing_email
                      </span>
                    </div>
                  </div>
                </div>
                <div style={{ fontSize: "12px", color: "var(--mute)", textAlign: "right", whiteSpace: "nowrap" }}>
                  Paused
                  <br />
                  by Maria · 20 Aug
                </div>
              </div>{" "}
            </section>
          </>
        )}{" "}
      </main>{" "}
      <aside
        aria-label="Suggestions"
        style={{
          flex: "1 1 320px",
          maxWidth: "360px",
          background: "var(--panel)",
          borderLeft: "1px solid var(--line)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {" "}
        <div
          role="tablist"
          aria-label="Side panel"
          style={{ display: "flex", gap: "18px", padding: "0 16px", borderBottom: "1px solid var(--line)" }}
        >
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
              padding: "14px 2px 10px",
              cursor: "pointer",
            }}
          >
            Suggestions <span style={{ fontSize: "11px", background: "var(--brandTint)", borderRadius: "99px", padding: "0 6px" }}>3</span>
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
              padding: "14px 2px 10px",
              cursor: "pointer",
            }}
          >
            Change history
          </button>{" "}
        </div>{" "}
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {" "}
          <div style={{ fontSize: "12px", color: "var(--mute)", lineHeight: "1.5" }}>
            Based on how you approved or rejected agent actions over the last 30 days.
          </div>{" "}
          <article style={{ border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden" }}>
            {" "}
            <div style={{ padding: "12px 14px" }}>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "var(--ok)",
                    background: "var(--okBg)",
                    border: "1px solid var(--okLine)",
                    borderRadius: "4px",
                    padding: "0 6px",
                  }}
                >
                  Loosen
                </span>
                <span style={{ fontSize: "12px", color: "var(--mute)" }}>Reassign stops</span>
              </div>{" "}
              <div style={{ fontWeight: "600", marginTop: "8px" }}>Auto-approve reassignments of up to 2 stops</div>{" "}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
                {" "}
                <div
                  style={{
                    background: "var(--sub)",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    padding: "8px",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "var(--mute)" }}>Evidence</div>
                  <div style={{ fontWeight: "600" }}>23 / 24 approved</div>
                </div>{" "}
                <div
                  style={{
                    background: "var(--sub)",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    padding: "8px",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "var(--mute)" }}>Impact</div>
                  <div style={{ fontWeight: "600" }}>−6 approvals / wk</div>
                </div>{" "}
              </div>{" "}
              <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "8px" }}>
                The one rejection moved a wedding order off Jun. Wedding orders stay Ask me.
              </div>{" "}
            </div>{" "}
            <div
              style={{
                display: "flex",
                gap: "6px",
                padding: "10px 14px",
                background: "var(--sub)",
                borderTop: "1px solid var(--line)",
              }}
            >
              <button
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
                Apply
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
                Preview
              </button>
              <button
                style={{
                  font: "inherit",
                  height: "30px",
                  padding: "0 10px",
                  border: "0",
                  background: "none",
                  color: "var(--mute)",
                  cursor: "pointer",
                  marginLeft: "auto",
                }}
              >
                Dismiss
              </button>
            </div>{" "}
          </article>{" "}
          <article style={{ border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden" }}>
            {" "}
            <div style={{ padding: "12px 14px" }}>
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontWeight: "600",
                    color: "var(--ok)",
                    background: "var(--okBg)",
                    border: "1px solid var(--okLine)",
                    borderRadius: "4px",
                    padding: "0 6px",
                  }}
                >
                  Loosen
                </span>
                <span style={{ fontSize: "12px", color: "var(--mute)" }}>Create orders</span>
              </div>{" "}
              <div style={{ fontWeight: "600", marginTop: "8px" }}>Lower auto-create threshold to 90% for repeat customers</div>{" "}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginTop: "10px" }}>
                {" "}
                <div
                  style={{
                    background: "var(--sub)",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    padding: "8px",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "var(--mute)" }}>Evidence</div>
                  <div style={{ fontWeight: "600" }}>0 edits on 19</div>
                </div>{" "}
                <div
                  style={{
                    background: "var(--sub)",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    padding: "8px",
                  }}
                >
                  <div style={{ fontSize: "11px", color: "var(--mute)" }}>Impact</div>
                  <div style={{ fontWeight: "600" }}>−4 reviews / wk</div>
                </div>{" "}
              </div>{" "}
            </div>{" "}
            <div
              style={{
                display: "flex",
                gap: "6px",
                padding: "10px 14px",
                background: "var(--sub)",
                borderTop: "1px solid var(--line)",
              }}
            >
              <button
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
                Apply
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
                Preview
              </button>
              <button
                style={{
                  font: "inherit",
                  height: "30px",
                  padding: "0 10px",
                  border: "0",
                  background: "none",
                  color: "var(--mute)",
                  cursor: "pointer",
                  marginLeft: "auto",
                }}
              >
                Dismiss
              </button>
            </div>{" "}
          </article>{" "}
          <article style={{ border: "1px solid var(--line)", borderRadius: "8px", overflow: "hidden" }}>
            {" "}
            <div style={{ padding: "12px 14px" }}>
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
                  Tighten
                </span>
                <span style={{ fontSize: "12px", color: "var(--mute)" }}>Safe-drop</span>
              </div>{" "}
              <div style={{ fontWeight: "600", marginTop: "8px" }}>Require approval for safe-drops at condos without a logbook</div>{" "}
              <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "8px" }}>
                1 of 31 safe-drops was disputed this month, at a building with no concierge logbook.
              </div>{" "}
            </div>{" "}
            <div
              style={{
                display: "flex",
                gap: "6px",
                padding: "10px 14px",
                background: "var(--sub)",
                borderTop: "1px solid var(--line)",
              }}
            >
              <button
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
                Apply
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
                Preview
              </button>
              <button
                style={{
                  font: "inherit",
                  height: "30px",
                  padding: "0 10px",
                  border: "0",
                  background: "none",
                  color: "var(--mute)",
                  cursor: "pointer",
                  marginLeft: "auto",
                }}
              >
                Dismiss
              </button>
            </div>{" "}
          </article>{" "}
        </div>{" "}
      </aside>{" "}
    </>
  );
}
