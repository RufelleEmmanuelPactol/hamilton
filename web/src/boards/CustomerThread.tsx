/* eslint-disable */
// Converted from design/project/CustomerThread.dc.html. Holes: none
export default function CustomerThreadBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
  return (
    <>
      <div
        style={{
          width: "390px",
          height: "844px",
          boxSizing: "border-box",
          overflow: "hidden",
          position: "relative",
          fontFamily: "'IBM Plex Sans', system-ui, sans-serif",
          background: "var(--sub)",
          color: "var(--ink)",
          fontSize: "14px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {" "}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            height: "60px",
            padding: "0 14px",
            background: "var(--panel)",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {" "}
          <div
            style={{
              width: "38px",
              height: "38px",
              borderRadius: "99px",
              background: "#F8BBD0",
              color: "#880E4F",
              fontSize: "13px",
              fontWeight: "700",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            MF
          </div>{" "}
          <div style={{ flex: "1" }}>
            <div style={{ fontWeight: "600" }}>Maria&#39;s Flowers &amp; Gifts</div>
            <div style={{ fontSize: "12px", color: "var(--mute)" }}>Delivery assistant · automated</div>
          </div>{" "}
        </header>{" "}
        <div
          style={{
            flex: "1",
            padding: "14px 12px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            overflow: "hidden",
          }}
        >
          {" "}
          <div style={{ alignSelf: "center", fontSize: "11px", color: "var(--mute)" }}>Today</div>{" "}
          <div
            style={{
              alignSelf: "flex-start",
              width: "86%",
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {" "}
            <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--line)" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  letterSpacing: "0.04em",
                  textTransform: "uppercase",
                  color: "var(--mute)",
                }}
              >
                Order #1042 · on the way
              </div>
              <div style={{ fontWeight: "600", marginTop: "4px" }}>Arriving 12:15 – 12:30</div>
              <div style={{ fontSize: "13px", color: "var(--ink2)", marginTop: "2px" }}>
                Ana is bringing your order. Jun had a flat tire, so we switched drivers to keep you on time.
              </div>
            </div>{" "}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 12px",
                fontSize: "13px",
                color: "var(--ink2)",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "24px",
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
              Ana · Sedan<span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--mute)" }}>10:44</span>
            </div>{" "}
            <a
              href="/customer"
              style={{
                display: "block",
                borderTop: "1px solid var(--line)",
                padding: "10px 12px",
                textAlign: "center",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Track delivery
            </a>{" "}
          </div>{" "}
          <div
            style={{
              alignSelf: "flex-end",
              maxWidth: "78%",
              background: "#101828",
              color: "#fff",
              borderRadius: "12px 12px 2px 12px",
              padding: "9px 12px",
              lineHeight: "1.45",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            I&#39;m in a meeting, please leave it with the lobby concierge
            <div style={{ fontSize: "11px", color: "#98A2B3", textAlign: "right", marginTop: "3px" }}>10:52</div>
          </div>{" "}
          <div
            style={{
              alignSelf: "flex-start",
              maxWidth: "80%",
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: "12px 12px 12px 2px",
              padding: "9px 12px",
              lineHeight: "1.45",
              color: "var(--ink2)",
            }}
          >
            Done. Ana will leave it with the concierge and you&#39;ll get a photo once it&#39;s dropped off.
            <div style={{ fontSize: "11px", color: "var(--mute)", textAlign: "right", marginTop: "3px" }}>10:52</div>
          </div>{" "}
          <div
            style={{
              alignSelf: "flex-start",
              width: "86%",
              background: "var(--panel)",
              border: "1px solid var(--line)",
              borderRadius: "12px",
              overflow: "hidden",
            }}
          >
            {" "}
            <svg
              viewBox="0 0 300 150"
              style={{ display: "block", width: "100%", height: "auto" }}
              role="img"
              aria-label="Photo of the gift box on the lobby desk next to the logbook"
            >
              <rect width="300" height="150" fill="#E3DDD2" />
              <rect y="98" width="300" height="52" fill="#8E6E52" />
              <rect y="92" width="300" height="9" fill="#6E533D" />
              <rect x="108" y="52" width="80" height="44" rx="3" fill="#EFE3CC" stroke="#B49B74" />
              <rect x="141" y="52" width="14" height="44" fill="#C2185B" />
              <rect x="108" y="69" width="80" height="9" fill="#C2185B" />
              <rect x="36" y="70" width="48" height="24" rx="2" fill="#FAF8F3" stroke="#CFC7BA" />
            </svg>{" "}
            <div style={{ padding: "10px 12px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "99px",
                    background: "#12B76A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>
                <b>Delivered 12:19</b>
              </div>
              <div style={{ fontSize: "13px", color: "var(--ink2)", marginTop: "3px" }}>
                Received by the lobby concierge (logbook p. 14).
              </div>
            </div>{" "}
            <div style={{ display: "flex", borderTop: "1px solid var(--line)" }}>
              <a href="/customer" style={{ flex: "1", padding: "10px", textAlign: "center", fontWeight: "600", textDecoration: "none" }}>
                Rate delivery
              </a>
              <a
                href="/customer"
                style={{
                  flex: "1",
                  padding: "10px",
                  textAlign: "center",
                  fontWeight: "600",
                  textDecoration: "none",
                  borderLeft: "1px solid var(--line)",
                }}
              >
                Report a problem
              </a>
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div
          style={{
            padding: "10px 12px 18px",
            background: "var(--panel)",
            borderTop: "1px solid var(--line)",
            display: "flex",
            gap: "8px",
          }}
        >
          {" "}
          <input
            aria-label="Message"
            placeholder="Message"
            style={{
              font: "inherit",
              flex: "1",
              minWidth: "0",
              height: "44px",
              border: "1px solid var(--line2)",
              borderRadius: "10px",
              padding: "0 12px",
            }}
          />{" "}
          <button
            aria-label="Send"
            style={{
              width: "44px",
              height: "44px",
              border: "0",
              borderRadius: "10px",
              background: "var(--brandInk)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 12l16-8-6 16-2-7z" />
            </svg>
          </button>{" "}
        </div>{" "}
      </div>
    </>
  );
}
