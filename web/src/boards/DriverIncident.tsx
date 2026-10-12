/* eslint-disable */
// Converted from design/project/DriverIncident.dc.html. Holes: none
export default function DriverIncidentBoard({ v = {} as any, h = {} as any }: { v?: any; h?: any }) {
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
            <div style={{ fontWeight: "600" }}>Report an issue</div>
            <div style={{ fontSize: "12px", color: "var(--mute)" }}>Jun Reyes · L300 van</div>
          </div>{" "}
        </header>{" "}
        <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: "14px", flex: "1" }}>
          {" "}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "8px" }}>
            {" "}
            <button
              aria-pressed="true"
              style={{
                font: "inherit",
                fontSize: "13px",
                fontWeight: "600",
                height: "64px",
                border: "2px solid var(--brandInk)",
                borderRadius: "10px",
                background: "var(--brandTint)",
                color: "var(--brandInk)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="8" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Flat tire
            </button>{" "}
            <button
              aria-pressed="false"
              style={{
                font: "inherit",
                fontSize: "13px",
                height: "64px",
                border: "1px solid var(--line2)",
                borderRadius: "10px",
                background: "var(--panel)",
                color: "var(--ink2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z" />
              </svg>
              Vehicle
            </button>{" "}
            <button
              aria-pressed="false"
              style={{
                font: "inherit",
                fontSize: "13px",
                height: "64px",
                border: "1px solid var(--line2)",
                borderRadius: "10px",
                background: "var(--panel)",
                color: "var(--ink2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="13" r="8" />
                <path d="M12 9v4l2 2M9 2h6" />
              </svg>
              Running late
            </button>{" "}
            <button
              aria-pressed="false"
              style={{
                font: "inherit",
                fontSize: "13px",
                height: "64px",
                border: "1px solid var(--line2)",
                borderRadius: "10px",
                background: "var(--panel)",
                color: "var(--ink2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5z" />
                <path d="M16 10h2a2 2 0 0 1 0 4h-2" />
              </svg>
              Break
            </button>{" "}
            <button
              aria-pressed="false"
              style={{
                font: "inherit",
                fontSize: "13px",
                height: "64px",
                border: "1px solid var(--line2)",
                borderRadius: "10px",
                background: "var(--panel)",
                color: "var(--ink2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="10" cy="8" r="4" />
                <path d="M3 20c1-3.5 3.6-5 7-5" />
                <path d="M16 15l5 5M21 15l-5 5" />
              </svg>
              Not home
            </button>{" "}
            <button
              aria-pressed="false"
              style={{
                font: "inherit",
                fontSize: "13px",
                height: "64px",
                border: "1px solid var(--line2)",
                borderRadius: "10px",
                background: "var(--panel)",
                color: "var(--ink2)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "4px",
                cursor: "pointer",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 11-5.7" />
                <path d="M15 9l6 6M21 9l-6 6" />
              </svg>
              Address
            </button>{" "}
          </div>{" "}
          <div
            style={{
              border: "1px solid var(--okLine)",
              background: "var(--okBg)",
              borderRadius: "10px",
              padding: "12px 14px",
            }}
          >
            {" "}
            <div style={{ fontWeight: "600", color: "var(--ok)" }}>Reported 10:31 · dispatch is handling it</div>{" "}
            <div style={{ fontSize: "13px", color: "#085D3A", marginTop: "2px" }}>
              You don&#39;t need to call anyone. Fix the tire at your own pace.
            </div>{" "}
          </div>{" "}
          <div>
            <div style={{ fontSize: "13px", color: "var(--ink2)", marginBottom: "6px" }}>About how long will it take?</div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                aria-pressed="false"
                style={{
                  font: "inherit",
                  fontSize: "13px",
                  height: "40px",
                  flex: "1",
                  border: "1px solid var(--line2)",
                  borderRadius: "10px",
                  background: "var(--panel)",
                  color: "var(--ink2)",
                  cursor: "pointer",
                }}
              >
                Under 30 min
              </button>
              <button
                aria-pressed="true"
                style={{
                  font: "inherit",
                  fontSize: "13px",
                  fontWeight: "600",
                  height: "40px",
                  flex: "1",
                  border: "2px solid var(--brandInk)",
                  borderRadius: "10px",
                  background: "var(--brandTint)",
                  color: "var(--brandInk)",
                  cursor: "pointer",
                }}
              >
                About 1 hour
              </button>
              <button
                aria-pressed="false"
                style={{
                  font: "inherit",
                  fontSize: "13px",
                  height: "40px",
                  flex: "1",
                  border: "1px solid var(--line2)",
                  borderRadius: "10px",
                  background: "var(--panel)",
                  color: "var(--ink2)",
                  cursor: "pointer",
                }}
              >
                Not sure
              </button>
            </div>
            <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "6px" }}>
              A rough guess is fine. Dispatch uses it to decide whether to move your stops.
            </div>
          </div>{" "}
          <section aria-label="What happened" style={{ border: "1px solid var(--line)", borderRadius: "10px" }}>
            {" "}
            <div style={{ padding: "10px 14px", borderBottom: "1px solid var(--line)", fontWeight: "600" }}>What happened</div>{" "}
            <ol
              style={{
                listStyle: "none",
                margin: "0",
                padding: "10px 14px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <li style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "12px",
                    color: "var(--mute)",
                    width: "38px",
                  }}
                >
                  10:44
                </span>
                <span style={{ flex: "1" }}>
                  Maria approved: your 3 stops moved
                  <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>#1042, #1050 to Ana · #1049 to Rico</div>
                </span>
              </li>
              <li style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "12px",
                    color: "var(--mute)",
                    width: "38px",
                  }}
                >
                  10:44
                </span>
                <span style={{ flex: "1" }}>3 customers sent new ETAs</span>
              </li>
              <li style={{ display: "flex", gap: "10px" }}>
                <span
                  style={{
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: "12px",
                    color: "var(--mute)",
                    width: "38px",
                  }}
                >
                  10:32
                </span>
                <span style={{ flex: "1" }}>Nearest vulcanizing shop: 600 m, Kalayaan Ave</span>
              </li>
            </ol>{" "}
          </section>{" "}
          <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--ink2)" }}>
            Note for dispatch (optional)
            <input
              defaultValue="Flat on EDSA near Guadalupe"
              style={{
                font: "inherit",
                height: "44px",
                border: "1px solid var(--line2)",
                borderRadius: "10px",
                padding: "0 12px",
                color: "var(--ink)",
              }}
            />
          </label>{" "}
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
          <a
            href="/driver"
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
            }}
          >
            I&#39;m back on the road
          </a>{" "}
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
            Call Maria
          </button>{" "}
        </div>{" "}
      </div>
    </>
  );
}
