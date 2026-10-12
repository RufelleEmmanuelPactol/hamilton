/* eslint-disable */
// Converted from design/project/Drivers.dc.html. Holes: none
export default function DriversBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
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
              color: "var(--err)",
              background: "var(--errBg)",
              border: "1px solid var(--errLine)",
              borderRadius: "4px",
              padding: "0 5px",
            }}
          >
            Incident
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
              color: "var(--ink2)",
              background: "#F2F4F7",
              border: "1px solid var(--line2)",
              borderRadius: "4px",
              padding: "0 5px",
            }}
          >
            Available
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
                    color: "var(--err)",
                    background: "var(--errBg)",
                    border: "1px solid var(--errLine)",
                    borderRadius: "99px",
                    padding: "1px 8px",
                  }}
                >
                  Incident · flat tire 10:31
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
              Incidents <span style={{ fontSize: "11px", color: "var(--mute)" }}>2</span>
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
              Notes <span style={{ fontSize: "11px", color: "var(--mute)" }}>5</span>
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
                <span style={{ color: "var(--mute)" }}>2 of 5 delivered</span>
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
                <li style={{ display: "flex", gap: "10px" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--mute)", width: "40px" }}>10:44</span>
                  <span style={{ flex: "1" }}>
                    3 remaining stops proposed to Ana and Rico{" "}
                    <a href="/app/approvals" style={{ textDecoration: "none", fontWeight: "500" }}>
                      Pending
                    </a>
                  </span>
                </li>
                <li style={{ display: "flex", gap: "10px" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--mute)", width: "40px" }}>10:31</span>
                  <span style={{ flex: "1" }}>
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: "600",
                        color: "var(--err)",
                        background: "var(--errBg)",
                        border: "1px solid var(--errLine)",
                        borderRadius: "4px",
                        padding: "0 5px",
                      }}
                    >
                      Report
                    </span>{" "}
                    Flat tire · &#34;EDSA near Guadalupe&#34;
                  </span>
                </li>
                <li style={{ display: "flex", gap: "10px" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--mute)", width: "40px" }}>10:08</span>
                  <span style={{ flex: "1" }}>Delivered #1047 Shangri-La · proof verified</span>
                </li>
                <li style={{ display: "flex", gap: "10px" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--mute)", width: "40px" }}>09:24</span>
                  <span style={{ flex: "1" }}>Delivered #1041 · photo retake requested once</span>
                </li>
                <li style={{ display: "flex", gap: "10px" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace", color: "var(--mute)", width: "40px" }}>08:02</span>
                  <span style={{ flex: "1" }}>Shift started · vehicle check passed</span>
                </li>
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
              Drivers are told what Hamilton records and why: for planning, not for pay or discipline.
            </div>{" "}
          </section>{" "}
        </div>{" "}
      </main>{" "}
    </>
  );
}
