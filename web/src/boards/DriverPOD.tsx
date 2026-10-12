/* eslint-disable */
// Converted from design/project/DriverPOD.dc.html. Holes: none
export default function DriverPODBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
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
          background: "var(--panel)",
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
            height: "56px",
            padding: "0 12px",
            borderBottom: "1px solid var(--line)",
          }}
        >
          {" "}
          <a
            href="/driver"
            aria-label="Back"
            style={{
              width: "44px",
              height: "44px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ink2)",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </a>{" "}
          <div style={{ flex: "1" }}>
            <div style={{ fontWeight: "600" }}>Complete delivery</div>
            <div style={{ fontSize: "12px", color: "var(--mute)" }}>#1042 · Mark Tan · Uptown Parksuites</div>
          </div>{" "}
        </header>{" "}
        <ol
          aria-label="Steps"
          style={{
            listStyle: "none",
            margin: "0",
            padding: "12px 18px",
            display: "flex",
            gap: "8px",
            borderBottom: "1px solid var(--line)",
            fontSize: "12px",
          }}
        >
          <li style={{ flex: "1" }}>
            <div style={{ height: "4px", borderRadius: "2px", background: "var(--brand)" }}></div>
            <div style={{ marginTop: "6px", fontWeight: "600", color: "var(--brandInk)" }}>1 · Photo</div>
          </li>
          <li style={{ flex: "1" }}>
            <div style={{ height: "4px", borderRadius: "2px", background: "var(--line)" }}></div>
            <div style={{ marginTop: "6px", color: "var(--mute)" }}>2 · Recipient</div>
          </li>
          <li style={{ flex: "1" }}>
            <div style={{ height: "4px", borderRadius: "2px", background: "var(--line)" }}></div>
            <div style={{ marginTop: "6px", color: "var(--mute)" }}>3 · Confirm</div>
          </li>
        </ol>{" "}
        <div style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: "12px", flex: "1" }}>
          {" "}
          <div
            style={{
              position: "relative",
              height: "300px",
              borderRadius: "10px",
              overflow: "hidden",
              background: "#1D2939",
            }}
          >
            {" "}
            <svg
              viewBox="0 0 354 300"
              preserveAspectRatio="xMidYMid slice"
              style={{ display: "block", width: "100%", height: "100%" }}
              role="img"
              aria-label="Blurry photo of a gift box on a lobby desk"
            >
              <defs>
                <filter id="b">
                  <feGaussianBlur stdDeviation="6"></feGaussianBlur>
                </filter>
              </defs>
              <g filter="url(#b)">
                <rect width="354" height="300" fill="#CFC8BC" />
                <rect y="190" width="354" height="110" fill="#8E6E52" />
                <rect y="180" width="354" height="14" fill="#6E533D" />
                <rect x="125" y="120" width="104" height="64" rx="4" fill="#EFE3CC" />
                <rect x="168" y="120" width="18" height="64" fill="#C2185B" />
                <rect x="125" y="146" width="104" height="10" fill="#C2185B" />
                <rect x="40" y="140" width="56" height="38" rx="3" fill="#F7F5F0" />
              </g>
              <rect
                x="22"
                y="22"
                width="310"
                height="256"
                rx="8"
                fill="none"
                stroke="#fff"
                strokeWidth="2"
                strokeDasharray="8 6"
                opacity="0.7"
              />
            </svg>{" "}
            <div
              style={{
                position: "absolute",
                left: "10px",
                top: "10px",
                background: "rgba(16,24,40,0.8)",
                color: "#fff",
                fontSize: "12px",
                borderRadius: "6px",
                padding: "4px 8px",
              }}
            >
              Checked in 1.2s
            </div>{" "}
          </div>{" "}
          <div
            role="alert"
            style={{
              border: "1px solid var(--errLine)",
              background: "var(--errBg)",
              borderRadius: "10px",
              padding: "12px 14px",
            }}
          >
            {" "}
            <div style={{ fontWeight: "600", color: "var(--err)" }}>Retake needed. You&#39;re still on site.</div>{" "}
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                marginTop: "8px",
                fontSize: "13px",
                color: "var(--ink2)",
              }}
            >
              <tr>
                <td style={{ padding: "3px 0" }}>Image sharpness</td>
                <td style={{ padding: "3px 0", textAlign: "right", fontWeight: "600", color: "var(--err)" }}>Fail</td>
              </tr>
              <tr>
                <td style={{ padding: "3px 0" }}>Package visible</td>
                <td style={{ padding: "3px 0", textAlign: "right", fontWeight: "600", color: "var(--warn)" }}>Unclear</td>
              </tr>
              <tr>
                <td style={{ padding: "3px 0" }}>At drop-off point (GPS 12 m)</td>
                <td style={{ padding: "3px 0", textAlign: "right", fontWeight: "600", color: "var(--ok)" }}>Pass</td>
              </tr>
            </table>{" "}
            <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "6px" }}>
              Hold steady. Fit the box and the logbook inside the frame.
            </div>{" "}
          </div>{" "}
        </div>{" "}
        <div
          style={{
            padding: "10px 16px 18px",
            borderTop: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {" "}
          <button
            style={{
              font: "inherit",
              height: "52px",
              border: "0",
              borderRadius: "10px",
              background: "var(--brandInk)",
              color: "#fff",
              fontSize: "16px",
              fontWeight: "600",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
              <circle cx="12" cy="13" r="3.5" />
            </svg>
            Retake photo
          </button>{" "}
          <button
            style={{
              font: "inherit",
              height: "44px",
              border: "1px solid var(--line2)",
              borderRadius: "10px",
              background: "var(--panel)",
              color: "var(--ink2)",
              cursor: "pointer",
            }}
          >
            Can&#39;t take a clear photo
          </button>{" "}
        </div>{" "}
      </div>
    </>
  );
}
