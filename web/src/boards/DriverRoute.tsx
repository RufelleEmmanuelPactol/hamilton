/* eslint-disable */
// Converted from design/project/DriverRoute.dc.html. Holes: none
export default function DriverRouteBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
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
          background: "#EEF1F4",
          color: "var(--ink)",
          fontSize: "14px",
        }}
      >
        {" "}
        <svg
          viewBox="0 0 390 420"
          style={{ position: "absolute", left: "0", top: "0", width: "390px", height: "420px", display: "block" }}
          role="img"
          aria-label="Map showing route to Uptown Parksuites"
        >
          <defs>
            <pattern id="g" width="26" height="26" patternUnits="userSpaceOnUse">
              <path d="M26 0H0V26" fill="none" stroke="#E2E6EB" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="390" height="420" fill="#F2F4F6" />
          <rect width="390" height="420" fill="url(#g)" />
          <path d="M240 300 l70 -12 l26 50 l-80 14 z" fill="#E1EBDF" />
          <path d="M-10 250 C 90 230, 190 270, 400 220" fill="none" stroke="#fff" strokeWidth="12" />
          <path d="M150 -10 C 160 120, 140 260, 170 430" fill="none" stroke="#fff" strokeWidth="10" />
          <path d="M150 -10 C 160 120, 140 260, 170 430" fill="none" stroke="#FCD9A3" strokeWidth="3" />
          <path d="M-10 120 L 400 90" fill="none" stroke="#fff" strokeWidth="7" />
          <path d="M290 -10 L 300 430" fill="none" stroke="#fff" strokeWidth="7" />
          <path
            d="M90 330 C 140 300, 160 270, 165 240 S 230 180, 285 160"
            fill="none"
            stroke="#E91E63"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="90" cy="330" r="11" fill="#E91E63" opacity="0.18" />
          <circle cx="90" cy="330" r="7" fill="#E91E63" stroke="#fff" strokeWidth="3" />
          <path d="M285 132 c -11 0 -18 8 -18 17 c 0 13 18 29 18 29 s 18 -16 18 -29 c 0 -9 -7 -17 -18 -17 z" fill="#101828" />
          <circle cx="285" cy="149" r="6" fill="#fff" />
          <g fontFamily="IBM Plex Sans, sans-serif" fontSize="11" fill="#98A2B3" fontWeight="500">
            <text x="176" y="60">
              32nd St
            </text>
            <text x="300" y="250">
              Uptown
            </text>
            <text x="20" y="262">
              McKinley Pkwy
            </text>
          </g>
        </svg>{" "}
        <div style={{ position: "absolute", left: "12px", right: "12px", top: "14px", display: "flex", gap: "8px" }}>
          {" "}
          <div
            style={{
              flex: "1",
              height: "44px",
              background: "var(--panel)",
              borderRadius: "10px",
              boxShadow: "0 2px 8px rgba(16,24,40,0.12)",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "0 12px",
            }}
          >
            {" "}
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
            </span>{" "}
            <div style={{ flex: "1" }}>
              <div style={{ fontWeight: "600", fontSize: "13px" }}>Ana · 0 of 4 done</div>
              <div style={{ fontSize: "11px", color: "var(--mute)" }}>2 stops added from Jun</div>
            </div>{" "}
            <span style={{ width: "8px", height: "8px", borderRadius: "99px", background: "#12B76A" }}></span>{" "}
          </div>{" "}
          <button
            aria-label="Menu"
            style={{
              width: "44px",
              height: "44px",
              border: "0",
              borderRadius: "10px",
              background: "var(--panel)",
              boxShadow: "0 2px 8px rgba(16,24,40,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#344054" strokeWidth="2" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>{" "}
        </div>{" "}
        <div
          style={{
            position: "absolute",
            right: "12px",
            top: "330px",
            background: "var(--panel)",
            borderRadius: "10px",
            boxShadow: "0 2px 8px rgba(16,24,40,0.12)",
            padding: "6px 10px",
            fontSize: "12px",
          }}
        >
          <b>4 min</b> <span style={{ color: "var(--mute)" }}>· 1.2 km</span>
        </div>{" "}
        <section
          aria-label="Next stop"
          style={{
            position: "absolute",
            left: "0",
            right: "0",
            bottom: "0",
            height: "470px",
            background: "var(--panel)",
            borderRadius: "16px 16px 0 0",
            boxShadow: "0 -4px 16px rgba(16,24,40,0.10)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <div
            style={{
              width: "36px",
              height: "4px",
              borderRadius: "99px",
              background: "var(--line2)",
              alignSelf: "center",
              margin: "8px 0 6px",
            }}
          ></div>{" "}
          <div style={{ padding: "4px 18px 12px", borderBottom: "1px solid var(--line)" }}>
            {" "}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--mute)" }}>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>#1042</span>
              <span>· Stop 1 of 4</span>
              <span style={{ marginLeft: "auto", fontWeight: "600", color: "var(--ok)" }}>ETA 12:15 · on time</span>
            </div>{" "}
            <h1 style={{ margin: "6px 0 0", fontSize: "20px", fontWeight: "600" }}>Mark Tan</h1>{" "}
            <div style={{ color: "var(--ink2)", marginTop: "2px" }}>Tower 2, Uptown Parksuites, 36th St, BGC</div>{" "}
            <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--ink2)",
                  background: "var(--sub)",
                  border: "1px solid var(--line)",
                  borderRadius: "6px",
                  padding: "2px 8px",
                }}
              >
                Anniversary box
              </span>
              <span
                style={{
                  fontSize: "12px",
                  color: "var(--ink2)",
                  background: "var(--sub)",
                  border: "1px solid var(--line)",
                  borderRadius: "6px",
                  padding: "2px 8px",
                }}
              >
                Window until 13:00
              </span>
            </div>{" "}
          </div>{" "}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
              padding: "10px 12px",
              borderBottom: "1px solid var(--line)",
            }}
          >
            {" "}
            <button
              style={{
                font: "inherit",
                fontSize: "12px",
                color: "var(--ink2)",
                background: "none",
                border: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                minHeight: "52px",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "99px",
                  border: "1px solid var(--line2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M3 11l18-8-8 18-2-8z" />
                </svg>
              </span>
              Navigate
            </button>{" "}
            <button
              style={{
                font: "inherit",
                fontSize: "12px",
                color: "var(--ink2)",
                background: "none",
                border: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                minHeight: "52px",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "99px",
                  border: "1px solid var(--line2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                </svg>
              </span>
              Call
            </button>{" "}
            <button
              style={{
                font: "inherit",
                fontSize: "12px",
                color: "var(--ink2)",
                background: "none",
                border: "0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                minHeight: "52px",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "99px",
                  border: "1px solid var(--line2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M4 5h16v11H9l-5 4z" />
                </svg>
              </span>
              Message
            </button>{" "}
            <a
              href="/driver/report"
              style={{
                fontSize: "12px",
                color: "#B42318",
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "4px",
                minHeight: "52px",
              }}
            >
              <span
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "99px",
                  border: "1px solid #FECDCA",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M12 3l9 16H3z" />
                  <path d="M12 10v4M12 17v.5" />
                </svg>
              </span>
              Report
            </a>{" "}
          </div>{" "}
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)" }}>
            {" "}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                fontSize: "12px",
                fontWeight: "600",
                color: "var(--mute)",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2.2" aria-hidden="true">
                <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
              </svg>
              Delivery instructions
            </div>{" "}
            <ul
              style={{
                margin: "8px 0 0",
                padding: "0",
                listStyle: "none",
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                color: "var(--ink2)",
              }}
            >
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "var(--ok)", fontWeight: "700" }}>✓</span>
                <span>
                  <b style={{ color: "var(--ink)" }}>Leave with lobby concierge</b>, customer confirmed 10:52
                </span>
              </li>
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "var(--mute)" }}>•</span>Register at lobby desk. Riders not allowed upstairs.
              </li>
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "var(--mute)" }}>•</span>Get logbook signature. Keep card upright.
              </li>
            </ul>{" "}
          </div>{" "}
          <div style={{ padding: "10px 18px", flex: "1" }}>
            {" "}
            <div style={{ fontSize: "12px", fontWeight: "600", color: "var(--mute)", marginBottom: "6px" }}>Up next</div>{" "}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "var(--ink2)" }}>
              <span>2 · Nicole Ramos, Serendra</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>12:40</span>
            </div>{" "}
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", color: "var(--ink2)" }}>
              <span>3 · Raffles Corporate, Ortigas</span>
              <span style={{ fontFamily: "'IBM Plex Mono', monospace" }}>13:25</span>
            </div>{" "}
          </div>{" "}
          <div style={{ padding: "10px 16px 18px", borderTop: "1px solid var(--line)" }}>
            {" "}
            <a
              href="/driver/proof"
              style={{
                height: "52px",
                borderRadius: "10px",
                background: "var(--brandInk)",
                color: "#fff",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              Arrived · complete delivery
            </a>{" "}
          </div>{" "}
        </section>{" "}
      </div>
    </>
  );
}
