/* eslint-disable */
// Converted from design/project/Orders.dc.html. Holes: none
export default function OrdersBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
  return (
    <>
      {" "}
      <main style={{ flex: "999 1 640px", minWidth: "0", display: "flex", flexDirection: "column" }}>
        {" "}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "10px",
            padding: "12px 20px",
            background: "var(--panel)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {" "}
          <h1 style={{ margin: "0", fontSize: "15px", fontWeight: "600" }}>Orders</h1>{" "}
          <span style={{ color: "var(--mute)" }}>Today · 13</span>{" "}
          <div
            role="group"
            aria-label="View"
            style={{
              display: "flex",
              border: "1px solid var(--line2)",
              borderRadius: "6px",
              overflow: "hidden",
              marginLeft: "8px",
            }}
          >
            <button
              aria-pressed="true"
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
              Board
            </button>
            <button
              aria-pressed="false"
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
              List
            </button>
          </div>{" "}
          <div style={{ flex: "1" }}></div>{" "}
          <button
            style={{
              font: "inherit",
              fontSize: "12px",
              height: "28px",
              padding: "0 10px",
              border: "1px dashed var(--line2)",
              borderRadius: "6px",
              background: "var(--panel)",
              color: "var(--ink2)",
              cursor: "pointer",
            }}
          >
            + Filter
          </button>{" "}
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
            Group: Status
          </button>{" "}
          <button
            style={{
              font: "inherit",
              fontSize: "12px",
              fontWeight: "600",
              height: "28px",
              padding: "0 12px",
              border: "0",
              borderRadius: "6px",
              background: "var(--brandInk)",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            New order
          </button>{" "}
        </div>{" "}
        <div style={{ flex: "1", overflowX: "auto", padding: "14px 16px" }}>
          {" "}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(240px, 1fr))",
              gap: "12px",
              minWidth: "1240px",
              alignItems: "start",
            }}
          >
            {" "}
            <section aria-label="Needs review">
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 4px 10px" }}>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#B54708"
                  strokeWidth="2.4"
                  strokeDasharray="3 3"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <span style={{ fontWeight: "600" }}>Needs review</span>
                <span style={{ color: "var(--mute)" }}>1</span>
              </div>{" "}
              <article
                style={{
                  background: "var(--panel)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  boxShadow: "0 1px 2px rgba(16,24,40,0.04)",
                }}
              >
                {" "}
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--mute)", fontSize: "12px" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>WA-0912</span>
                  <span
                    style={{
                      marginLeft: "auto",
                      fontSize: "11px",
                      color: "#1D6B33",
                      background: "#E4F4E8",
                      borderRadius: "4px",
                      padding: "0 6px",
                    }}
                  >
                    WhatsApp
                  </span>
                </div>{" "}
                <div style={{ fontWeight: "500", lineHeight: "1.4" }}>Red roses (12) + chocolates for Rina Bautista</div>{" "}
                <div
                  style={{
                    fontSize: "12px",
                    color: "var(--ink2)",
                    background: "var(--sub)",
                    border: "1px solid var(--line)",
                    borderRadius: "6px",
                    padding: "6px 8px",
                    lineHeight: "1.45",
                  }}
                >
                  &#34;hi po! can i order the red roses 12pcs w/ chocolates… before 4pm pls&#34;
                </div>{" "}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--warn)",
                      background: "var(--warnBg)",
                      border: "1px solid var(--warnLine)",
                      borderRadius: "4px",
                      padding: "0 6px",
                    }}
                  >
                    82% parsed
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--ink2)",
                      border: "1px solid var(--line2)",
                      borderRadius: "4px",
                      padding: "0 6px",
                    }}
                  >
                    Building ambiguous
                  </span>
                  <span
                    style={{
                      fontSize: "11px",
                      color: "var(--ink2)",
                      border: "1px solid var(--line2)",
                      borderRadius: "4px",
                      padding: "0 6px",
                    }}
                  >
                    Unpaid
                  </span>
                </div>{" "}
                <div style={{ display: "flex", gap: "6px", paddingTop: "2px", borderTop: "1px solid var(--line)" }}>
                  <button
                    style={{
                      font: "inherit",
                      fontSize: "12px",
                      fontWeight: "600",
                      height: "28px",
                      padding: "0 10px",
                      marginTop: "8px",
                      border: "0",
                      borderRadius: "6px",
                      background: "var(--brandInk)",
                      color: "#fff",
                      cursor: "pointer",
                    }}
                  >
                    Create
                  </button>
                  <button
                    style={{
                      font: "inherit",
                      fontSize: "12px",
                      height: "28px",
                      padding: "0 10px",
                      marginTop: "8px",
                      border: "1px solid var(--line2)",
                      borderRadius: "6px",
                      background: "var(--panel)",
                      color: "var(--ink2)",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <span
                    style={{
                      marginLeft: "auto",
                      marginTop: "8px",
                      alignSelf: "center",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    Makati · 13–16
                  </span>
                </div>{" "}
              </article>{" "}
            </section>{" "}
            <section aria-label="Scheduled">
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 4px 10px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#667085" strokeWidth="2.4" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <span style={{ fontWeight: "600" }}>Scheduled</span>
                <span style={{ color: "var(--mute)" }}>5</span>
              </div>{" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {" "}
                <article
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--warnLine)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1042</span>
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
                      At risk
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        width: "20px",
                        height: "20px",
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
                  </div>
                  <div style={{ fontWeight: "500" }}>Anniversary box · Mark Tan</div>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>BGC · 10:00–13:00 · ETA 13:40</div>
                </article>{" "}
                <article
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1049</span>
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
                      At risk
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        width: "20px",
                        height: "20px",
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
                  </div>
                  <div style={{ fontWeight: "500" }}>Balloons + roses · Sam Ocampo</div>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>Makati · 09:00–13:00 · ETA 13:55</div>
                </article>{" "}
                <article
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1050</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        width: "20px",
                        height: "20px",
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
                  </div>
                  <div style={{ fontWeight: "500" }}>Orchid pot · Nicole Ramos</div>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>BGC · 11:00–15:00</div>
                </article>{" "}
                <article
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1044</span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--info)",
                        background: "var(--infoBg)",
                        border: "1px solid var(--infoLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                      }}
                    >
                      Rescheduled
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        width: "20px",
                        height: "20px",
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
                  </div>
                  <div style={{ fontWeight: "500" }}>Sunflower bundle · Ben Cruz</div>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>Pasig · 15:00–17:00 · confirmed</div>
                </article>{" "}
                <article
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1048</span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--ok)",
                        background: "var(--okBg)",
                        border: "1px solid var(--okLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                      }}
                    >
                      + #1052
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        width: "20px",
                        height: "20px",
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
                  </div>
                  <div style={{ fontWeight: "500" }}>White lilies + bouquet · Grace Lee</div>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>San Juan · 13:00–18:00</div>
                </article>{" "}
              </div>{" "}
            </section>{" "}
            <section aria-label="Out for delivery">
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 4px 10px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" fill="none" stroke="#2E90FA" strokeWidth="2.4" />
                  <path d="M12 3a9 9 0 0 1 0 18z" fill="#2E90FA" />
                </svg>
                <span style={{ fontWeight: "600" }}>Out for delivery</span>
                <span style={{ color: "var(--mute)" }}>2</span>
              </div>{" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {" "}
                <article
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1051</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        width: "20px",
                        height: "20px",
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
                  </div>
                  <div style={{ fontWeight: "500" }}>Retirement arrangement · Prof. Diaz</div>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>UP Diliman · ETA 11:05 · on time</div>
                </article>{" "}
                <article
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1043</span>
                    <span
                      style={{
                        marginLeft: "auto",
                        width: "20px",
                        height: "20px",
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
                  </div>
                  <div style={{ fontWeight: "500" }}>Office desk arrangement · Raffles</div>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>Ortigas · ETA 13:10 · closes 17:00</div>
                </article>{" "}
              </div>{" "}
            </section>{" "}
            <section aria-label="Delivered">
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 4px 10px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="#12B76A" />
                  <path d="M7.5 12.5l3 3 6-7" fill="none" stroke="#fff" strokeWidth="2.2" />
                </svg>
                <span style={{ fontWeight: "600" }}>Delivered</span>
                <span style={{ color: "var(--mute)" }}>5</span>
              </div>{" "}
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {" "}
                <article
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1046</span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--ok)",
                        background: "var(--okBg)",
                        border: "1px solid var(--okLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                      }}
                    >
                      Proof verified
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        width: "20px",
                        height: "20px",
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
                  </div>
                  <div style={{ fontWeight: "500", color: "var(--ink2)" }}>Get-well basket · Anna Garcia</div>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>10:36</div>
                </article>{" "}
                <article
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1047</span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--ok)",
                        background: "var(--okBg)",
                        border: "1px solid var(--okLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                      }}
                    >
                      Proof verified
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        width: "20px",
                        height: "20px",
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
                  </div>
                  <div style={{ fontWeight: "500", color: "var(--ink2)" }}>Event arch · Shangri-La</div>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>10:08</div>
                </article>{" "}
                <article
                  style={{
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "10px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      fontSize: "12px",
                      color: "var(--mute)",
                    }}
                  >
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1041</span>
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--ok)",
                        background: "var(--okBg)",
                        border: "1px solid var(--okLine)",
                        borderRadius: "4px",
                        padding: "0 6px",
                      }}
                    >
                      Retake passed
                    </span>
                    <span
                      style={{
                        marginLeft: "auto",
                        width: "20px",
                        height: "20px",
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
                  </div>
                  <div style={{ fontWeight: "500", color: "var(--ink2)" }}>Pink roses · Liza Santos</div>
                  <div style={{ fontSize: "12px", color: "var(--mute)" }}>09:24</div>
                </article>{" "}
                <button
                  style={{
                    font: "inherit",
                    fontSize: "12px",
                    height: "30px",
                    border: "0",
                    background: "none",
                    color: "var(--mute)",
                    cursor: "pointer",
                    textAlign: "left",
                    padding: "0 4px",
                  }}
                >
                  Show 2 more
                </button>{" "}
              </div>{" "}
            </section>{" "}
            <section aria-label="Exceptions">
              {" "}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 4px 10px" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
                  <circle cx="12" cy="12" r="10" fill="#F04438" />
                  <path d="M12 7v6M12 16v.5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
                <span style={{ fontWeight: "600" }}>Exceptions</span>
                <span style={{ color: "var(--mute)" }}>1</span>
              </div>{" "}
              <article
                style={{
                  background: "var(--panel)",
                  border: "1px solid var(--errLine)",
                  borderRadius: "8px",
                  padding: "10px 12px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--mute)" }}>
                  <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1045</span>
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
                    Refund request
                  </span>
                  <span
                    style={{
                      marginLeft: "auto",
                      width: "20px",
                      height: "20px",
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
                </div>
                <div style={{ fontWeight: "500" }}>Table posies · Café Morato</div>
                <div style={{ fontSize: "12px", color: "var(--mute)" }}>Delivered 08:58 · proof pack ready</div>
                <a href="/app/approvals" style={{ fontSize: "12px", fontWeight: "600", textDecoration: "none" }}>
                  Handle in Approvals
                </a>
              </article>{" "}
              <div
                style={{
                  marginTop: "10px",
                  border: "1px dashed var(--line2)",
                  borderRadius: "8px",
                  padding: "12px",
                  color: "var(--mute)",
                  fontSize: "12px",
                  lineHeight: "1.5",
                }}
              >
                Failed and disputed orders land here. Drag a card to another column to move it.
              </div>{" "}
            </section>{" "}
          </div>{" "}
        </div>{" "}
      </main>{" "}
    </>
  );
}
