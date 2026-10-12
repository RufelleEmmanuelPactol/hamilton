/* eslint-disable */
// Converted from design/project/Messages.dc.html. Holes: none
export default function MessagesBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
  return (
    <>
      {" "}
      <main style={{ flex: "999 1 640px", minWidth: "0", display: "flex", flexWrap: "wrap" }}>
        {" "}
        <section
          aria-label="Conversations"
          style={{
            flex: "1 1 280px",
            maxWidth: "320px",
            background: "var(--panel)",
            borderRight: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <div
            style={{
              padding: "12px 14px",
              borderBottom: "1px solid var(--line)",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {" "}
            <div style={{ display: "flex", alignItems: "center" }}>
              <h1 style={{ margin: "0", fontSize: "15px", fontWeight: "600", flex: "1" }}>Conversations</h1>
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>41 sent · 6 replies</span>
            </div>{" "}
            <div role="tablist" aria-label="Filter" style={{ display: "flex", gap: "2px", flexWrap: "nowrap", whiteSpace: "nowrap" }}>
              {" "}
              <button
                role="tab"
                aria-selected="true"
                style={{
                  font: "inherit",
                  fontSize: "12px",
                  fontWeight: "600",
                  height: "26px",
                  padding: "0 7px",
                  border: "1px solid var(--line2)",
                  borderRadius: "6px",
                  background: "var(--sub)",
                  color: "var(--ink)",
                  cursor: "pointer",
                }}
              >
                All
              </button>{" "}
              <button
                role="tab"
                aria-selected="false"
                style={{
                  font: "inherit",
                  fontSize: "12px",
                  height: "26px",
                  padding: "0 7px",
                  border: "1px solid transparent",
                  borderRadius: "6px",
                  background: "none",
                  color: "var(--ink2)",
                  cursor: "pointer",
                }}
              >
                Needs you <span style={{ color: "var(--err)", fontWeight: "600" }}>(1)</span>
              </button>{" "}
              <button
                role="tab"
                aria-selected="false"
                style={{
                  font: "inherit",
                  fontSize: "12px",
                  height: "26px",
                  padding: "0 7px",
                  border: "1px solid transparent",
                  borderRadius: "6px",
                  background: "none",
                  color: "var(--ink2)",
                  cursor: "pointer",
                }}
              >
                Assistant
              </button>{" "}
              <button
                role="tab"
                aria-selected="false"
                style={{
                  font: "inherit",
                  fontSize: "12px",
                  height: "26px",
                  padding: "0 7px",
                  border: "1px solid transparent",
                  borderRadius: "6px",
                  background: "none",
                  color: "var(--ink2)",
                  cursor: "pointer",
                }}
              >
                Automatic
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <a
            href="/app/messages"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: "10px 14px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span
                style={{ width: "7px", height: "7px", borderRadius: "99px", background: "var(--err)", flex: "none" }}
                title="Needs you"
              ></span>
              <span style={{ fontWeight: "600" }}>Paolo Lim</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--mute)" }}>#1045</span>
              <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--mute)" }}>10:27</span>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--ink)",
                marginTop: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              2 of the centerpieces look wilted, can I get a refund?
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "3px",
                fontSize: "12px",
                color: "var(--mute)",
              }}
            >
              <span>Damage claim</span>
              <span>·</span>
              <span style={{ color: "var(--err)", fontWeight: "500" }}>Waiting on you · 18 min</span>
            </div>
          </a>{" "}
          <a
            href="/app/messages"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: "10px 14px",
              borderBottom: "1px solid var(--line)",
              background: "var(--brandTint)",
              boxShadow: "inset 3px 0 0 var(--brandInk)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "600" }}>Ben Cruz</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--mute)" }}>#1044</span>
              <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--mute)" }}>10:41</span>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--ink2)",
                marginTop: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Got it Ben, 3–5pm it is.
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "3px",
                fontSize: "12px",
                color: "var(--mute)",
              }}
            >
              <span>Reschedule</span>
              <span>·</span>
              <span style={{ color: "var(--mute)" }}>Assistant replied</span>
            </div>
          </a>{" "}
          <a
            href="/app/messages"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: "10px 14px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "500" }}>Mark Tan</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--mute)" }}>#1042</span>
              <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--mute)" }}>10:52</span>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--ink2)",
                marginTop: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              We&#39;ll leave it with the concierge.
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "3px",
                fontSize: "12px",
                color: "var(--mute)",
              }}
            >
              <span>Drop-off instructions</span>
              <span>·</span>
              <span style={{ color: "var(--mute)" }}>Assistant replied</span>
            </div>
          </a>{" "}
          <a
            href="/app/messages"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: "10px 14px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "500" }}>Anna Garcia</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--mute)" }}>#1046</span>
              <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--mute)" }}>10:36</span>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--ink2)",
                marginTop: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Delivered · photo sent
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "3px",
                fontSize: "12px",
                color: "var(--mute)",
              }}
            >
              <span>Delivery update</span>
              <span>·</span>
              <span style={{ color: "var(--mute)" }}>Automatic</span>
            </div>
          </a>{" "}
          <a
            href="/app/messages"
            style={{
              display: "block",
              textDecoration: "none",
              color: "inherit",
              padding: "10px 14px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "500" }}>Shangri-La events</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--mute)" }}>#1047</span>
              <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--mute)" }}>10:08</span>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--ink2)",
                marginTop: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Delivered · loading bay B
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "3px",
                fontSize: "12px",
                color: "var(--mute)",
              }}
            >
              <span>Delivery update</span>
              <span>·</span>
              <span style={{ color: "var(--mute)" }}>Automatic</span>
            </div>
          </a>{" "}
          <a href="/app/messages" style={{ display: "block", textDecoration: "none", color: "inherit", padding: "10px 14px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontWeight: "500" }}>Liza Santos</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "11px", color: "var(--mute)" }}>#1041</span>
              <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--mute)" }}>09:24</span>
            </div>
            <div
              style={{
                fontSize: "13px",
                color: "var(--ink2)",
                marginTop: "2px",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              Delivered · received by Ate Nena
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                marginTop: "3px",
                fontSize: "12px",
                color: "var(--mute)",
              }}
            >
              <span>Delivery update</span>
              <span>·</span>
              <span style={{ color: "var(--mute)" }}>Automatic</span>
            </div>
          </a>{" "}
        </section>{" "}
        <section
          aria-label="Conversation with Ben Cruz"
          style={{
            flex: "999 1 420px",
            minWidth: "0",
            background: "var(--panel)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              padding: "10px 16px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            {" "}
            <div style={{ flex: "1 1 200px" }}>
              <div style={{ fontWeight: "600", fontSize: "14px" }}>Ben Cruz</div>
              <div style={{ fontSize: "12px", color: "var(--mute)" }}>+63 917 222 1004 · WhatsApp · #1044 Sunflower bundle</div>
            </div>{" "}
            <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--ink2)" }}>
              <span>Assistant</span>
              <span
                style={{
                  width: "32px",
                  height: "18px",
                  borderRadius: "99px",
                  background: "var(--brandInk)",
                  position: "relative",
                  display: "inline-block",
                }}
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
              <span style={{ fontWeight: "600" }}>On</span>
            </label>{" "}
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
              Take over
            </button>{" "}
          </div>{" "}
          <div
            style={{
              flex: "1",
              padding: "16px 20px",
              display: "flex",
              flexDirection: "column",
              gap: "14px",
              background: "var(--sub)",
            }}
          >
            {" "}
            <div style={{ alignSelf: "center", fontSize: "11px", color: "var(--mute)" }}>Today</div>{" "}
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  flex: "none",
                  borderRadius: "6px",
                  background: "var(--brand)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                </svg>
              </div>
              <div style={{ flex: "1", minWidth: "0" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                  <b>Delivery Assistant</b>
                  <span style={{ fontSize: "11px", color: "var(--mute)" }}>09:12 · Assurance agent</span>
                </div>
                <div
                  style={{
                    marginTop: "3px",
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "8px 11px",
                    lineHeight: "1.5",
                    color: "var(--ink2)",
                  }}
                >
                  Hi Ben! Your Maria&#39;s Flowers delivery arrives around 11:00am. Will someone be home to receive it? Reply YES, a better
                  time, or who can receive it for you.
                </div>
              </div>
            </div>{" "}
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  flex: "none",
                  borderRadius: "99px",
                  background: "#D0D5DD",
                  color: "var(--ink2)",
                  fontSize: "10px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                BC
              </div>
              <div style={{ flex: "1", minWidth: "0" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                  <b>Ben Cruz</b>
                  <span style={{ fontSize: "11px", color: "var(--mute)" }}>10:40</span>
                </div>
                <div
                  style={{
                    marginTop: "3px",
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "8px 11px",
                    lineHeight: "1.5",
                    fontFamily: "system-ui, sans-serif",
                  }}
                >
                  wala pa ako sa bahay, after 3pm pa po
                </div>
                <div style={{ marginTop: "4px", fontSize: "11px", color: "var(--mute)" }}>
                  Detected: Tagalog · intent: not home until 15:00
                </div>
              </div>
            </div>{" "}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--mute)", fontSize: "12px" }}>
              <span style={{ flex: "1", height: "1px", background: "var(--line)" }}></span>
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" />
                </svg>
                #1044 rescheduled to 15:00–17:00 · Ana&#39;s route re-sequenced · <b style={{ color: "var(--ink2)" }}>Auto</b>
              </span>
              <span style={{ flex: "1", height: "1px", background: "var(--line)" }}></span>
            </div>{" "}
            <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
              <div
                style={{
                  width: "26px",
                  height: "26px",
                  flex: "none",
                  borderRadius: "6px",
                  background: "var(--brand)",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                  <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                </svg>
              </div>
              <div style={{ flex: "1", minWidth: "0" }}>
                <div style={{ display: "flex", gap: "8px", alignItems: "baseline" }}>
                  <b>Delivery Assistant</b>
                  <span style={{ fontSize: "11px", color: "var(--mute)" }}>10:41 · Assurance agent</span>
                </div>
                <div
                  style={{
                    marginTop: "3px",
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    padding: "8px 11px",
                    lineHeight: "1.5",
                    color: "var(--ink2)",
                  }}
                >
                  Got it Ben, we&#39;ll deliver between 3:00 and 5:00pm. You&#39;ll get a message when the driver is on the way.
                </div>
              </div>
            </div>{" "}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "var(--mute)", fontSize: "12px" }}>
              <span style={{ flex: "1", height: "1px", background: "var(--line)" }}></span>
              <span>
                Saved to address book: &#34;Home after 3pm on weekdays&#34; · <b style={{ color: "var(--ink2)" }}>Auto</b>
              </span>
              <span style={{ flex: "1", height: "1px", background: "var(--line)" }}></span>
            </div>{" "}
          </div>{" "}
          <div
            style={{
              borderTop: "1px solid var(--line)",
              padding: "10px 16px",
              display: "flex",
              flexDirection: "column",
              gap: "8px",
            }}
          >
            {" "}
            <div style={{ display: "flex", gap: "6px" }}>
              <button
                style={{
                  font: "inherit",
                  fontSize: "12px",
                  height: "26px",
                  padding: "0 7px",
                  border: "1px solid var(--line2)",
                  borderRadius: "6px",
                  background: "var(--panel)",
                  color: "var(--ink2)",
                  cursor: "pointer",
                }}
              >
                Send ETA
              </button>
              <button
                style={{
                  font: "inherit",
                  fontSize: "12px",
                  height: "26px",
                  padding: "0 7px",
                  border: "1px solid var(--line2)",
                  borderRadius: "6px",
                  background: "var(--panel)",
                  color: "var(--ink2)",
                  cursor: "pointer",
                }}
              >
                Offer new time
              </button>
              <button
                style={{
                  font: "inherit",
                  fontSize: "12px",
                  height: "26px",
                  padding: "0 7px",
                  border: "1px solid var(--line2)",
                  borderRadius: "6px",
                  background: "var(--panel)",
                  color: "var(--ink2)",
                  cursor: "pointer",
                }}
              >
                Ask for safe-drop
              </button>
            </div>{" "}
            <div style={{ display: "flex", gap: "8px" }}>
              <input
                aria-label="Reply as Maria"
                placeholder="Reply as Maria (pauses the assistant on this conversation)"
                style={{
                  font: "inherit",
                  flex: "1",
                  minWidth: "0",
                  height: "36px",
                  border: "1px solid var(--line2)",
                  borderRadius: "6px",
                  padding: "0 10px",
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
                Send
              </button>
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <aside
          aria-label="Details"
          style={{
            flex: "1 1 260px",
            maxWidth: "300px",
            background: "var(--panel)",
            borderLeft: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--mute)",
              }}
            >
              Order
            </div>{" "}
            <dl style={{ margin: "8px 0 0", display: "grid", gridTemplateColumns: "76px 1fr", gap: "6px 8px" }}>
              <dt style={{ color: "var(--mute)" }}>Order</dt>
              <dd style={{ margin: "0", fontFamily: "'IBM Plex Mono', monospace" }}>#1044</dd>
              <dt style={{ color: "var(--mute)" }}>Item</dt>
              <dd style={{ margin: "0" }}>Sunflower bundle</dd>
              <dt style={{ color: "var(--mute)" }}>Window</dt>
              <dd style={{ margin: "0" }}>
                15:00–17:00 <span style={{ color: "var(--mute)" }}>(was 11–15)</span>
              </dd>
              <dt style={{ color: "var(--mute)" }}>Driver</dt>
              <dd style={{ margin: "0" }}>Ana Villanueva</dd>
              <dt style={{ color: "var(--mute)" }}>Status</dt>
              <dd style={{ margin: "0" }}>
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
                  Scheduled
                </span>
              </dd>
            </dl>
          </div>{" "}
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                  flex: "1",
                }}
              >
                Address memory
              </div>
              <a href="/app/addresses" style={{ fontSize: "12px", textDecoration: "none", fontWeight: "500" }}>
                Open
              </a>
            </div>{" "}
            <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px", color: "var(--ink2)" }}>
              <div>8 East Capitol Dr, Kapitolyo</div>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
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
                  2 failed attempts
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
                  Rarely answers calls
                </span>
              </div>
              <div style={{ fontSize: "12px" }}>
                Best time: after 3pm on weekdays <span style={{ color: "var(--ok)" }}>(new)</span>
              </div>
            </div>
          </div>{" "}
          <div style={{ padding: "12px 14px" }}>
            <div
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--mute)",
              }}
            >
              Why the assistant messaged
            </div>
            <p style={{ margin: "8px 0 0", color: "var(--ink2)", lineHeight: "1.5" }}>
              Policy: pre-confirm addresses with 2+ failed attempts. A 20-second check prevented a likely failed trip (est. ₱950).
            </p>
            <p style={{ margin: "8px 0 0", fontSize: "12px", color: "var(--mute)" }}>
              The assistant answers only from this order&#39;s data and never claims to be a person.
            </p>
          </div>{" "}
        </aside>{" "}
      </main>{" "}
    </>
  );
}
