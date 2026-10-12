"use client";
// Converted from design/project/DriverPOD.dc.html. The canvas shows step 1 with a blurry photo the AI check rejected.
// "Retake photo" runs a scripted check that passes; the steps then walk through Recipient and Confirm locally.
import { useEffect, useState } from "react";

type Step = 1 | 2 | 3 | 4;
type Shot = "blurry" | "checking" | "clear";

const primary: React.CSSProperties = {
  font: "inherit",
  height: "52px",
  border: "0",
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
  cursor: "pointer",
};
const secondary: React.CSSProperties = {
  font: "inherit",
  height: "44px",
  border: "1px solid var(--line2)",
  borderRadius: "10px",
  background: "var(--panel)",
  color: "var(--ink2)",
  textDecoration: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
};
const RECIPIENTS = ["Lobby concierge", "Mark Tan", "Building guard"];

function Sparkle() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E91E63" strokeWidth="2.2" aria-hidden="true">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </svg>
  );
}

function Check({ label, result }: { label: string; result: "Pass" | "Fail" | "Unclear" }) {
  const color = result === "Pass" ? "var(--ok)" : result === "Fail" ? "var(--err)" : "var(--warn)";
  return (
    <tr>
      <td style={{ padding: "3px 0" }}>{label}</td>
      <td style={{ padding: "3px 0", textAlign: "right", fontWeight: "600", color }}>{result}</td>
    </tr>
  );
}

export default function DriverPODBoard() {
  const [step, setStep] = useState<Step>(1);
  const [shot, setShot] = useState<Shot>("blurry");
  const [recipient, setRecipient] = useState(RECIPIENTS[0]);
  const [name, setName] = useState("Rommel (concierge)");

  useEffect(() => {
    if (shot !== "checking") return;
    const t = setTimeout(() => setShot("clear"), 1200);
    return () => clearTimeout(t);
  }, [shot]);

  const steps = ["Photo", "Recipient", "Confirm"];

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
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
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          height: "56px",
          flex: "none",
          padding: "0 12px",
          borderBottom: "1px solid var(--line)",
        }}
      >
        {step > 1 && step < 4 ? (
          <button
            aria-label="Back"
            onClick={() => setStep((s) => (s - 1) as Step)}
            style={{
              width: "44px",
              height: "44px",
              border: "0",
              background: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--ink2)",
              cursor: "pointer",
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
        ) : (
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
          </a>
        )}
        <div style={{ flex: "1" }}>
          <div style={{ fontWeight: "600" }}>Complete delivery</div>
          <div style={{ fontSize: "12px", color: "var(--mute)" }}>#1042 · Mark Tan · Uptown Parksuites</div>
        </div>
      </header>
      <ol
        aria-label="Steps"
        style={{
          listStyle: "none",
          margin: "0",
          padding: "12px 18px",
          display: "flex",
          gap: "8px",
          flex: "none",
          borderBottom: "1px solid var(--line)",
          fontSize: "12px",
        }}
      >
        {steps.map((label, i) => {
          const n = i + 1;
          const current = n === step;
          const done = n < step;
          return (
            <li key={label} style={{ flex: "1" }} aria-current={current ? "step" : undefined}>
              <div style={{ height: "4px", borderRadius: "2px", background: current || done ? "var(--brand)" : "var(--line)" }}></div>
              <div
                style={{
                  marginTop: "6px",
                  whiteSpace: "nowrap",
                  fontWeight: current ? "600" : undefined,
                  color: current ? "var(--brandInk)" : done ? "var(--ink2)" : "var(--mute)",
                }}
              >
                {done ? "✓ " : `${n} · `}
                {label}
              </div>
            </li>
          );
        })}
      </ol>

      <div
        style={{
          padding: "14px 18px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          flex: "1",
          minHeight: "0",
          overflowY: "auto",
        }}
      >
        {(step === 1 || step === 3) && (
          <div
            style={{
              position: "relative",
              height: step === 1 ? "300px" : "180px",
              flex: "none",
              borderRadius: "10px",
              overflow: "hidden",
              background: "#1D2939",
            }}
          >
            <svg
              viewBox="0 0 354 300"
              preserveAspectRatio="xMidYMid slice"
              style={{ display: "block", width: "100%", height: "100%" }}
              role="img"
              aria-label={
                shot === "clear"
                  ? "Photo of the gift box on the lobby desk next to the logbook"
                  : "Blurry photo of a gift box on a lobby desk"
              }
            >
              <defs>
                <filter id="b">
                  <feGaussianBlur stdDeviation={shot === "clear" ? "0" : "6"}></feGaussianBlur>
                </filter>
              </defs>
              <g filter="url(#b)" style={{ opacity: shot === "checking" ? 0.6 : 1 }}>
                <rect width="354" height="300" fill="#CFC8BC" />
                <rect y="190" width="354" height="110" fill="#8E6E52" />
                <rect y="180" width="354" height="14" fill="#6E533D" />
                <rect x="125" y="120" width="104" height="64" rx="4" fill="#EFE3CC" stroke={shot === "clear" ? "#B49B74" : "none"} />
                <rect x="168" y="120" width="18" height="64" fill="#C2185B" />
                <rect x="125" y="146" width="104" height="10" fill="#C2185B" />
                <rect x="40" y="140" width="56" height="38" rx="3" fill="#F7F5F0" stroke={shot === "clear" ? "#CFC7BA" : "none"} />
                {shot === "clear" && (
                  <g stroke="#B9B1A3" strokeWidth="1.5">
                    <path d="M48 152h40M48 160h34M48 168h38" />
                  </g>
                )}
              </g>
              {step === 1 && (
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
              )}
            </svg>
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
                whiteSpace: "nowrap",
              }}
            >
              {shot === "checking" ? "Checking…" : shot === "clear" ? "Checked in 0.9s" : "Checked in 1.2s"}
            </div>
          </div>
        )}

        {step === 1 && shot === "blurry" && (
          <div
            role="alert"
            style={{ border: "1px solid var(--errLine)", background: "var(--errBg)", borderRadius: "10px", padding: "12px 14px" }}
          >
            <div style={{ fontWeight: "600", color: "var(--err)" }}>Retake needed. You&#39;re still on site.</div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px", fontSize: "13px", color: "var(--ink2)" }}>
              <tbody>
                <Check label="Image sharpness" result="Fail" />
                <Check label="Package visible" result="Unclear" />
                <Check label="At drop-off point (GPS 12 m)" result="Pass" />
              </tbody>
            </table>
            <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "6px" }}>
              Hold steady. Fit the box and the logbook inside the frame.
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--mute)", marginTop: "6px" }}>
              <Sparkle />
              Auto-generated from the photo and GPS
            </div>
          </div>
        )}
        {step === 1 && shot === "checking" && (
          <div
            role="status"
            style={{
              border: "1px solid var(--aiLine)",
              background: "var(--aiBg)",
              borderRadius: "10px",
              padding: "12px 14px",
              color: "var(--ink2)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: "600" }}>
              <Sparkle />
              Checking the new photo…
            </div>
          </div>
        )}
        {step === 1 && shot === "clear" && (
          <div
            role="status"
            className="ham-in"
            style={{ border: "1px solid var(--okLine)", background: "var(--okBg)", borderRadius: "10px", padding: "12px 14px" }}
          >
            <div style={{ fontWeight: "600", color: "var(--ok)" }}>Photo checked · clear, shows the box and logbook</div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px", fontSize: "13px", color: "var(--ink2)" }}>
              <tbody>
                <Check label="Image sharpness" result="Pass" />
                <Check label="Package visible" result="Pass" />
                <Check label="At drop-off point (GPS 12 m)" result="Pass" />
              </tbody>
            </table>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--mute)", marginTop: "6px" }}>
              <Sparkle />
              Auto-generated from the photo and GPS
            </div>
          </div>
        )}

        {step === 2 && (
          <>
            <div>
              <div style={{ fontSize: "13px", color: "var(--ink2)", marginBottom: "6px" }}>Who received it?</div>
              <div role="radiogroup" aria-label="Who received it?" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {RECIPIENTS.map((r) => {
                  const sel = r === recipient;
                  return (
                    <button
                      key={r}
                      role="radio"
                      aria-checked={sel}
                      onClick={() => setRecipient(r)}
                      style={{
                        font: "inherit",
                        height: "48px",
                        padding: "0 14px",
                        textAlign: "left",
                        borderRadius: "10px",
                        cursor: "pointer",
                        border: sel ? "2px solid var(--brandInk)" : "1px solid var(--line2)",
                        background: sel ? "var(--brandTint)" : "var(--panel)",
                        color: sel ? "var(--brandInk)" : "var(--ink2)",
                        fontWeight: sel ? "600" : undefined,
                      }}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
              <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "6px" }}>
                Mark asked to leave it with the lobby concierge.
              </div>
            </div>
            <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--ink2)" }}>
              Name in the logbook
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={{
                  font: "inherit",
                  height: "44px",
                  border: "1px solid var(--line2)",
                  borderRadius: "10px",
                  padding: "0 12px",
                  color: "var(--ink)",
                }}
              />
            </label>
          </>
        )}

        {step === 3 && (
          <dl style={{ margin: "0", border: "1px solid var(--line)", borderRadius: "10px", fontSize: "13px" }}>
            {[
              ["Order", "#1042 · Anniversary box"],
              ["Received by", `${recipient}${name ? ` · ${name}` : ""}`],
              ["Photo", "Checked · clear"],
              ["Location", "Uptown Parksuites lobby (GPS 12 m)"],
            ].map(([k, val], i) => (
              <div
                key={k}
                style={{ display: "flex", gap: "12px", padding: "10px 14px", borderTop: i ? "1px solid var(--line)" : undefined }}
              >
                <dt style={{ width: "92px", flex: "none", color: "var(--mute)" }}>{k}</dt>
                <dd style={{ margin: "0", color: "var(--ink)" }}>{val}</dd>
              </div>
            ))}
          </dl>
        )}

        {step === 4 && (
          <div
            role="status"
            className="ham-in"
            style={{
              border: "1px solid var(--okLine)",
              background: "var(--okBg)",
              borderRadius: "10px",
              padding: "16px 14px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: "36px",
                height: "36px",
                margin: "0 auto 8px",
                borderRadius: "99px",
                background: "#12B76A",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </div>
            <div style={{ fontWeight: "600", color: "var(--ok)" }}>Delivered</div>
            <div style={{ fontSize: "13px", color: "#085D3A", marginTop: "2px" }}>Photo sent to Mark on WhatsApp</div>
          </div>
        )}
      </div>

      <div
        style={{
          padding: "10px 16px 18px",
          borderTop: "1px solid var(--line)",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          flex: "none",
        }}
      >
        {step === 1 && shot !== "clear" && (
          <>
            <button
              style={{ ...primary, opacity: shot === "checking" ? 0.6 : 1 }}
              disabled={shot === "checking"}
              onClick={() => setShot("checking")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              Retake photo
            </button>
            <button style={secondary}>Can&#39;t take a clear photo</button>
          </>
        )}
        {step === 1 && shot === "clear" && (
          <>
            <button style={primary} onClick={() => setStep(2)}>
              Next · recipient
            </button>
            <button style={secondary} onClick={() => setShot("checking")}>
              Retake photo
            </button>
          </>
        )}
        {step === 2 && (
          <button style={primary} onClick={() => setStep(3)}>
            Next · confirm
          </button>
        )}
        {step === 3 && (
          <button style={primary} onClick={() => setStep(4)}>
            Complete delivery
          </button>
        )}
        {step === 4 && (
          <a href="/driver" style={primary}>
            Back to my route
          </a>
        )}
      </div>
    </div>
  );
}
