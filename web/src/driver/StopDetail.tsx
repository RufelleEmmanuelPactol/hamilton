"use client";
// Stop screen (/app/stop/?o=1042): everything about one delivery, and the way into completing it.
import { useRouter, useSearchParams } from "next/navigation";
import { useDriverStops } from "./data";
import { ScreenHeader, Sparkle, deliverHref, footer, mono, primaryBtn, scroll, secondaryBtn } from "./ui";

const actionBtn: React.CSSProperties = {
  fontSize: "12px",
  color: "var(--ink2)",
  textDecoration: "none",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "4px",
  minHeight: "52px",
};
const ring: React.CSSProperties = {
  width: "40px",
  height: "40px",
  borderRadius: "99px",
  border: "1px solid var(--line2)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const tag: React.CSSProperties = {
  fontSize: "12px",
  color: "var(--ink2)",
  background: "var(--sub)",
  border: "1px solid var(--line)",
  borderRadius: "6px",
  padding: "2px 8px",
  whiteSpace: "nowrap",
};

export function useBack(fallback: string) {
  const router = useRouter();
  return () => (window.history.length > 1 ? router.back() : router.push(fallback));
}

export default function StopDetail() {
  const o = useSearchParams()?.get("o") ?? "";
  const { stops, owned, facts: f, driver } = useDriverStops();
  const back = useBack("/app/stops/");
  const stop = stops.find((s) => s.order === `#${o}`);

  if (!stop)
    return (
      <>
        <ScreenHeader title="Stop not found" onBack={back} />
        <div style={{ padding: "40px 24px", textAlign: "center", color: "var(--mute)" }}>
          This stop isn&#39;t on your route today.{" "}
          <a href="/app/stops/" style={{ color: "var(--brandInk)" }}>
            See your stops
          </a>
        </div>
      </>
    );

  const held = driver.id === "jun" && f.junIncident && !f.junBackOnRoad;
  const n = owned.indexOf(stop) + 1;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(stop.address)}`;

  return (
    <>
      <ScreenHeader title={stop.name} sub={`${stop.order}${n ? ` · Stop ${n} of ${owned.length}` : ""}`} onBack={back} />
      <div style={scroll}>
        {stop.status === "done" && (
          <div style={{ margin: "12px 16px 0", border: "1px solid var(--okLine)", background: "var(--okBg)", borderRadius: "10px", padding: "12px 14px" }}>
            <div style={{ fontWeight: 600, color: "var(--ok)" }}>Delivered {stop.doneAt}</div>
            <div style={{ fontSize: "13px", color: "#085D3A", marginTop: "2px" }}>
              {stop.proof
                ? `Received by ${stop.proof.recipient}${stop.proof.name ? ` · ${stop.proof.name}` : ""} · photo ${stop.proof.photo}`
                : "Photo checked · customer notified"}
            </div>
          </div>
        )}
        {stop.status === "moved" && (
          <div style={{ margin: "12px 16px 0", border: "1px solid var(--line2)", background: "var(--sub)", borderRadius: "10px", padding: "12px 14px" }}>
            <div style={{ fontWeight: 600 }}>Moved to {stop.movedTo}</div>
            <div style={{ fontSize: "13px", color: "var(--ink2)", marginTop: "2px" }}>
              Dispatch moved this stop after your flat tire. You don&#39;t need to do anything.
            </div>
          </div>
        )}
        {stop.status === "todo" && held && (
          <div style={{ margin: "12px 16px 0", border: "1px solid var(--warnLine)", background: "var(--warnBg)", borderRadius: "10px", padding: "12px 14px" }}>
            <div style={{ fontWeight: 600, color: "var(--warn)" }}>On hold while you fix the tire</div>
            <div style={{ fontSize: "13px", color: "#93370D", marginTop: "2px" }}>Dispatch is deciding who delivers this stop.</div>
          </div>
        )}

        <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)" }}>
          {stop.status === "todo" && (
            <div style={{ fontSize: "12px", fontWeight: 600, color: stop.late ? "var(--err)" : "var(--ok)" }}>
              ETA {stop.eta} · {stop.late ? "late" : "on time"}
            </div>
          )}
          <div style={{ fontSize: "16px", marginTop: "4px", lineHeight: 1.35 }}>{stop.address}</div>
          <div style={{ display: "flex", gap: "6px", marginTop: "10px", flexWrap: "wrap" }}>
            <span style={tag}>{stop.item}</span>
            <span style={tag}>Window {stop.window}</span>
            {stop.from && <span style={tag}>From {stop.from}</span>}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", padding: "12px", borderBottom: "1px solid var(--line)" }}>
          <a href={maps} target="_blank" rel="noreferrer" style={actionBtn}>
            <span style={ring}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M3 11l18-8-8 18-2-8z" />
              </svg>
            </span>
            Navigate
          </a>
          <a href={`tel:${stop.phone.replace(/\s/g, "")}`} style={actionBtn}>
            <span style={ring}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
              </svg>
            </span>
            Call
          </a>
          <a href={`sms:${stop.phone.replace(/\s/g, "")}`} style={actionBtn}>
            <span style={ring}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M4 5h16v11H9l-5 4z" />
              </svg>
            </span>
            Message
          </a>
          <a href="/app/report/" style={{ ...actionBtn, color: "var(--err)" }}>
            <span style={{ ...ring, borderColor: "var(--errLine)" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M12 3l9 16H3z" />
                <path d="M12 10v4M12 17v.5" />
              </svg>
            </span>
            Report
          </a>
        </div>

        <section aria-label="Delivery instructions" style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", fontWeight: 600, color: "var(--mute)" }}>
            <Sparkle size={13} />
            Delivery instructions
            <span style={{ marginLeft: "auto", fontSize: "11px", fontWeight: 400 }}>From the customer chat</span>
          </div>
          <ul style={{ margin: "8px 0 0", padding: "0", listStyle: "none", display: "flex", flexDirection: "column", gap: "6px", color: "var(--ink2)" }}>
            {stop.confirmed && (
              <li style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "var(--ok)", fontWeight: 700 }}>✓</span>
                <b style={{ color: "var(--ink)", fontWeight: 600 }}>{stop.confirmed}</b>
              </li>
            )}
            {stop.instructions.map((x) => (
              <li key={x} style={{ display: "flex", gap: "8px" }}>
                <span style={{ color: "var(--mute)" }}>•</span>
                {x}
              </li>
            ))}
          </ul>
        </section>

        <dl style={{ margin: "0", padding: "6px 18px 14px", fontSize: "13px" }}>
          {[
            ["Customer", stop.name],
            ["Phone", stop.phone],
            ["Order", `${stop.order} · ${stop.item}`],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", gap: "12px", padding: "8px 0", borderBottom: "1px solid var(--line)" }}>
              <dt style={{ width: "84px", flex: "none", color: "var(--mute)" }}>{k}</dt>
              <dd style={{ margin: "0", ...(k === "Phone" ? mono : {}) }}>{v}</dd>
            </div>
          ))}
        </dl>
      </div>
      {stop.status === "todo" && (
        <div style={footer}>
          {held ? (
            <a href="/app/report/" style={secondaryBtn}>
              See what dispatch is doing
            </a>
          ) : (
            <a href={deliverHref(stop.order)} style={primaryBtn}>
              Arrived · complete delivery
            </a>
          )}
        </div>
      )}
    </>
  );
}
