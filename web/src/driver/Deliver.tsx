"use client";
// Complete delivery (/app/deliver/?o=1042): photo → recipient → confirm, for any stop on the route.
// The photo check is scripted: #1042's first shot comes back blurry (the proof-check story), every other shot passes.
// Finished steps stay tappable, so the driver can go back and change the photo or the recipient before confirming.
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useScenario } from "@/lib/store";
import { clockFor } from "@/lib/scenario";
import { useDriverStops } from "./data";
import { useBack } from "./StopDetail";
import { ScreenHeader, Sparkle, footer, primaryBtn, scroll, secondaryBtn, stopHref } from "./ui";

type Step = 1 | 2 | 3 | 4;
type Shot = "none" | "checking" | "blurry" | "clear" | "skipped";
const SOMEONE_ELSE = "Someone else";

function Check({ label, result }: { label: string; result: "Pass" | "Fail" | "Unclear" }) {
  const color = result === "Pass" ? "var(--ok)" : result === "Fail" ? "var(--err)" : "var(--warn)";
  return (
    <tr>
      <td style={{ padding: "3px 0" }}>{label}</td>
      <td style={{ padding: "3px 0", textAlign: "right", fontWeight: 600, color }}>{result}</td>
    </tr>
  );
}

export default function Deliver() {
  const o = useSearchParams()?.get("o") ?? "";
  const router = useRouter();
  const back = useBack(`/app/stop/?o=${o}`);
  const { stops, todo, facts } = useDriverStops();
  const completeDelivery = useScenario((s) => s.completeDelivery);
  const stop = stops.find((s) => s.order === `#${o}`);

  const [step, setStep] = useState<Step>(1);
  const [shot, setShot] = useState<Shot>("none");
  const [attempts, setAttempts] = useState(0);
  const [recipient, setRecipient] = useState<string>("");
  const [name, setName] = useState("");
  const [finishedOrder, setFinishedOrder] = useState<string | null>(null);

  useEffect(() => {
    if (stop && !recipient) setRecipient(stop.recipients[0]);
  }, [stop, recipient]);

  useEffect(() => {
    if (shot !== "checking") return;
    const blurry = stop?.order === "#1042" && attempts === 1;
    const t = setTimeout(() => setShot(blurry ? "blurry" : "clear"), 1200);
    return () => clearTimeout(t);
  }, [shot, attempts, stop?.order]);

  if (!stop || (stop.status !== "todo" && finishedOrder !== stop.order))
    return (
      <>
        <ScreenHeader title="Complete delivery" onBack={back} />
        <div style={{ padding: "40px 24px", textAlign: "center", color: "var(--mute)" }}>
          {stop?.status === "done" ? "This stop is already delivered." : stop?.status === "moved" ? `This stop moved to ${stop.movedTo}.` : "This stop isn't on your route today."}{" "}
          <a href="/app/" style={{ color: "var(--brandInk)" }}>
            Back to today
          </a>
        </div>
      </>
    );

  const takePhoto = () => {
    setAttempts((a) => a + 1);
    setShot("checking");
  };
  const isCustomer = recipient === stop.name;
  const needsName = !isCustomer;
  const nameOk = !needsName || name.trim().length > 0;
  const photoOk = shot === "clear" || shot === "skipped";
  const steps = ["Photo", "Recipient", "Confirm"];
  const reachable = (n: number) => n === 1 || (n === 2 && photoOk) || (n === 3 && photoOk && nameOk);
  const receivedBy = needsName ? `${recipient === SOMEONE_ELSE ? name.trim() : `${recipient} · ${name.trim()}`}` : recipient;
  const nextStop = todo.find((s) => s.order !== stop.order) ?? null;

  const finish = () => {
    completeDelivery(stop.order, {
      recipient: recipient === SOMEONE_ELSE ? name.trim() : recipient,
      name: recipient === SOMEONE_ELSE || isCustomer ? "" : name.trim(),
      at: clockFor(facts.phase),
      photo: shot === "skipped" ? "skipped" : "checked",
    });
    setFinishedOrder(stop.order);
    setStep(4);
  };

  return (
    <>
      <ScreenHeader
        title="Complete delivery"
        sub={`${stop.order} · ${stop.name} · ${stop.area}`}
        onBack={step > 1 && step < 4 ? () => setStep((s) => (s - 1) as Step) : step === 4 ? () => router.push("/app/") : back}
      />
      {step < 4 && (
        <ol aria-label="Steps" style={{ listStyle: "none", margin: "0", padding: "10px 16px", display: "flex", gap: "8px", flex: "none", borderBottom: "1px solid var(--line)", fontSize: "12px" }}>
          {steps.map((label, i) => {
            const n = (i + 1) as Step;
            const current = n === step;
            const done = n < step;
            const can = reachable(n) && !current;
            return (
              <li key={label} style={{ flex: "1" }} aria-current={current ? "step" : undefined}>
                <button
                  disabled={!can}
                  onClick={() => setStep(n)}
                  style={{ font: "inherit", width: "100%", padding: "4px 0", border: "0", background: "none", textAlign: "left", cursor: can ? "pointer" : "default" }}
                >
                  <div style={{ height: "4px", borderRadius: "2px", background: current || done ? "var(--brand)" : "var(--line)" }} />
                  <div
                    style={{
                      marginTop: "6px",
                      whiteSpace: "nowrap",
                      fontWeight: current ? 600 : undefined,
                      color: current ? "var(--brandInk)" : done || can ? "var(--ink2)" : "var(--mute)",
                      textDecoration: can ? "underline" : undefined,
                      textUnderlineOffset: "3px",
                      textDecorationColor: "var(--line2)",
                    }}
                  >
                    {done ? "✓ " : `${n} · `}
                    {label}
                  </div>
                </button>
              </li>
            );
          })}
        </ol>
      )}

      <div style={{ ...scroll, padding: "14px 16px", display: "flex", flexDirection: "column", gap: "12px" }}>
        {(step === 1 || step === 3) && shot !== "skipped" && (
          <Photo shot={shot} framed={step === 1} small={step === 3} />
        )}

        {step === 1 && shot === "none" && (
          <div style={{ fontSize: "13px", color: "var(--ink2)", lineHeight: 1.4 }}>
            Take a photo of the {stop.item.toLowerCase()} where you left it. It&#39;s checked on the spot, so you won&#39;t be asked about it later.
          </div>
        )}
        {step === 1 && shot === "blurry" && (
          <div role="alert" style={{ border: "1px solid var(--errLine)", background: "var(--errBg)", borderRadius: "10px", padding: "12px 14px" }}>
            <div style={{ fontWeight: 600, color: "var(--err)" }}>Retake needed. You&#39;re still on site.</div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px", fontSize: "13px", color: "var(--ink2)" }}>
              <tbody>
                <Check label="Image sharpness" result="Fail" />
                <Check label="Package visible" result="Unclear" />
                <Check label="At drop-off point (GPS 12 m)" result="Pass" />
              </tbody>
            </table>
            <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "6px" }}>Hold steady. Fit the box and the logbook inside the frame.</div>
            <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "var(--mute)", marginTop: "6px" }}>
              <Sparkle />
              Auto-generated from the photo and GPS
            </div>
          </div>
        )}
        {step === 1 && shot === "checking" && (
          <div role="status" style={{ border: "1px solid var(--aiLine)", background: "var(--aiBg)", borderRadius: "10px", padding: "12px 14px", color: "var(--ink2)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px", fontWeight: 600 }}>
              <Sparkle />
              Checking the photo…
            </div>
          </div>
        )}
        {step === 1 && shot === "clear" && (
          <div role="status" className="ham-in" style={{ border: "1px solid var(--okLine)", background: "var(--okBg)", borderRadius: "10px", padding: "12px 14px" }}>
            <div style={{ fontWeight: 600, color: "var(--ok)" }}>Photo checked · clear, shows the package</div>
            <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "8px", fontSize: "13px", color: "var(--ink2)" }}>
              <tbody>
                <Check label="Image sharpness" result="Pass" />
                <Check label="Package visible" result="Pass" />
                <Check label="At drop-off point (GPS 12 m)" result="Pass" />
              </tbody>
            </table>
          </div>
        )}
        {step === 1 && shot === "skipped" && (
          <div role="status" style={{ border: "1px solid var(--warnLine)", background: "var(--warnBg)", borderRadius: "10px", padding: "12px 14px" }}>
            <div style={{ fontWeight: 600, color: "var(--warn)" }}>No photo · dispatch will review this delivery</div>
            <div style={{ fontSize: "13px", color: "#93370D", marginTop: "2px" }}>Get a name and, if you can, a logbook signature.</div>
          </div>
        )}

        {step === 2 && (
          <>
            <div>
              <div style={{ fontSize: "13px", color: "var(--ink2)", marginBottom: "6px" }}>Who received it?</div>
              <div role="radiogroup" aria-label="Who received it?" style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {[...stop.recipients, SOMEONE_ELSE].map((r) => {
                  const sel = r === recipient;
                  return (
                    <button
                      key={r}
                      role="radio"
                      aria-checked={sel}
                      onClick={() => {
                        setRecipient(r);
                        if (r === stop.name) setName("");
                      }}
                      style={{
                        font: "inherit",
                        minHeight: "48px",
                        padding: "0 14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        textAlign: "left",
                        borderRadius: "10px",
                        cursor: "pointer",
                        border: sel ? "2px solid var(--brandInk)" : "1px solid var(--line2)",
                        background: sel ? "var(--brandTint)" : "var(--panel)",
                        color: sel ? "var(--brandInk)" : "var(--ink2)",
                        fontWeight: sel ? 600 : undefined,
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: "18px",
                          height: "18px",
                          flex: "none",
                          borderRadius: "99px",
                          border: sel ? "5px solid var(--brandInk)" : "2px solid var(--line2)",
                          background: "var(--panel)",
                        }}
                      />
                      {r}
                      {r === stop.name && <span style={{ marginLeft: "auto", fontSize: "12px", fontWeight: 400, color: "var(--mute)" }}>Customer</span>}
                    </button>
                  );
                })}
              </div>
              {stop.recipientHint && <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "6px" }}>{stop.recipientHint}</div>}
            </div>
            {needsName && (
              <label style={{ display: "flex", flexDirection: "column", gap: "6px", fontSize: "13px", color: "var(--ink2)" }}>
                {recipient === SOMEONE_ELSE ? "Their name and relation to the customer" : "Their name (as written in the logbook)"}
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoFocus
                  placeholder={recipient === SOMEONE_ELSE ? "e.g. Liza, sister" : "e.g. Rommel"}
                  style={{ font: "inherit", height: "44px", border: "1px solid var(--line2)", borderRadius: "10px", padding: "0 12px", color: "var(--ink)" }}
                />
              </label>
            )}
          </>
        )}

        {step === 3 && (
          <dl style={{ margin: "0", border: "1px solid var(--line)", borderRadius: "10px", fontSize: "13px" }}>
            {(
              [
                ["Order", `${stop.order} · ${stop.item}`, null],
                ["Received by", receivedBy, 2],
                ["Photo", shot === "skipped" ? "None · dispatch will review" : "Checked · clear", 1],
                ["Location", `${stop.address} (GPS 12 m)`, null],
              ] as [string, string, Step | null][]
            ).map(([k, val, edit], i) => (
              <div key={k} style={{ display: "flex", gap: "12px", padding: "10px 14px", borderTop: i ? "1px solid var(--line)" : undefined, alignItems: "baseline" }}>
                <dt style={{ width: "92px", flex: "none", color: "var(--mute)" }}>{k}</dt>
                <dd style={{ margin: "0", color: "var(--ink)", flex: "1" }}>{val}</dd>
                {edit && (
                  <button onClick={() => setStep(edit)} style={{ font: "inherit", fontSize: "13px", fontWeight: 600, border: "0", background: "none", color: "var(--brandInk)", cursor: "pointer", padding: "0" }}>
                    Edit
                  </button>
                )}
              </div>
            ))}
          </dl>
        )}

        {step === 4 && (
          <div role="status" className="ham-in" style={{ border: "1px solid var(--okLine)", background: "var(--okBg)", borderRadius: "10px", padding: "20px 14px", textAlign: "center", marginTop: "24px" }}>
            <div style={{ width: "44px", height: "44px", margin: "0 auto 10px", borderRadius: "99px", background: "#12B76A", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" aria-hidden="true">
                <path d="M5 12l5 5 9-10" />
              </svg>
            </div>
            <div style={{ fontWeight: 600, fontSize: "18px", color: "var(--ok)" }}>Delivered</div>
            <div style={{ fontSize: "13px", color: "#085D3A", marginTop: "4px" }}>
              {stop.name.split(" ")[0]} gets the photo on WhatsApp now.
            </div>
          </div>
        )}
      </div>

      <div style={footer}>
        {step === 1 && !photoOk && (
          <>
            <button style={{ ...primaryBtn, opacity: shot === "checking" ? 0.6 : 1 }} disabled={shot === "checking"} onClick={takePhoto}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 8h3l2-3h6l2 3h3v11H4z" />
                <circle cx="12" cy="13" r="3.5" />
              </svg>
              {shot === "none" ? "Take photo" : "Retake photo"}
            </button>
            <button style={secondaryBtn} disabled={shot === "checking"} onClick={() => setShot("skipped")}>
              Can&#39;t take a photo
            </button>
          </>
        )}
        {step === 1 && photoOk && (
          <>
            <button style={primaryBtn} onClick={() => setStep(2)}>
              Next · recipient
            </button>
            <button style={secondaryBtn} onClick={takePhoto}>
              {shot === "skipped" ? "Take a photo after all" : "Retake photo"}
            </button>
          </>
        )}
        {step === 2 && (
          <button style={{ ...primaryBtn, opacity: nameOk ? 1 : 0.45 }} disabled={!nameOk} onClick={() => setStep(3)}>
            Next · confirm
          </button>
        )}
        {step === 3 && (
          <button style={primaryBtn} onClick={finish}>
            Complete delivery
          </button>
        )}
        {step === 4 && (
          <>
            {nextStop ? (
              <a href={stopHref(nextStop.order)} style={primaryBtn}>
                Next stop · {nextStop.name}
              </a>
            ) : (
              <a href="/app/" style={primaryBtn}>
                Back to today
              </a>
            )}
            {nextStop && (
              <a href="/app/" style={secondaryBtn}>
                Back to today
              </a>
            )}
          </>
        )}
      </div>
    </>
  );
}

function Photo({ shot, framed, small }: { shot: Shot; framed: boolean; small: boolean }) {
  const empty = shot === "none";
  return (
    <div style={{ position: "relative", height: small ? "180px" : "300px", flex: "none", borderRadius: "10px", overflow: "hidden", background: "#1D2939" }}>
      <svg
        viewBox="0 0 354 300"
        preserveAspectRatio="xMidYMid slice"
        style={{ display: "block", width: "100%", height: "100%" }}
        role="img"
        aria-label={empty ? "Camera viewfinder" : shot === "clear" ? "Photo of the package at the drop-off point" : "Blurry photo of the package"}
      >
        <defs>
          <filter id="drv-blur">
            <feGaussianBlur stdDeviation={shot === "clear" ? "0" : empty ? "10" : "6"} />
          </filter>
        </defs>
        <g filter="url(#drv-blur)" style={{ opacity: empty ? 0.35 : shot === "checking" ? 0.6 : 1 }}>
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
        {framed && <rect x="22" y="22" width="310" height="256" rx="8" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="8 6" opacity="0.7" />}
      </svg>
      {!empty && (
        <div style={{ position: "absolute", left: "10px", top: "10px", background: "rgba(16,24,40,0.8)", color: "#fff", fontSize: "12px", borderRadius: "6px", padding: "4px 8px", whiteSpace: "nowrap" }}>
          {shot === "checking" ? "Checking…" : shot === "clear" ? "Checked in 0.9s" : "Checked in 1.2s"}
        </div>
      )}
      {empty && (
        <div style={{ position: "absolute", inset: "0", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "13px" }}>
          Fit the package inside the frame
        </div>
      )}
    </div>
  );
}
