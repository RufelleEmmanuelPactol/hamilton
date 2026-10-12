"use client";
// Converted from design/project/CustomerThread.dc.html: Mark Tan's WhatsApp thread for #1042.
// Customers hear nothing new until a person decides on HAM-417. Approved (with notify) → new ETA; rejected → apology.
import { useEffect, useRef } from "react";
import { useScenarioFacts } from "@/lib/scenario";

function OrderCard({
  label,
  title,
  body,
  driver,
  time,
  isNew,
}: {
  label: string;
  title: string;
  body: string;
  driver: "jun" | "ana";
  time: string;
  isNew?: boolean;
}) {
  const d =
    driver === "ana" ? { initials: "AV", color: "#E91E63", name: "Ana · Sedan" } : { initials: "JR", color: "#2E90FA", name: "Jun · Van" };
  return (
    <div
      className={isNew ? "ham-in" : undefined}
      style={{
        alignSelf: "flex-start",
        width: "86%",
        flex: "none",
        background: "var(--panel)",
        border: "1px solid var(--line)",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >
      <div style={{ padding: "10px 12px", borderBottom: "1px solid var(--line)" }}>
        <div
          style={{
            fontSize: "11px",
            fontWeight: "600",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            color: "var(--mute)",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </div>
        <div style={{ fontWeight: "600", marginTop: "4px" }}>{title}</div>
        <div style={{ fontSize: "13px", color: "var(--ink2)", marginTop: "2px", lineHeight: "1.4" }}>{body}</div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px", fontSize: "13px", color: "var(--ink2)" }}>
        <span
          style={{
            width: "24px",
            height: "24px",
            borderRadius: "99px",
            background: d.color,
            color: "#fff",
            fontSize: "9px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {d.initials}
        </span>
        {d.name}
        <span style={{ marginLeft: "auto", fontSize: "11px", color: "var(--mute)" }}>{time}</span>
      </div>
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
      </a>
    </div>
  );
}

export default function CustomerThreadBoard() {
  const f = useScenarioFacts();
  const scroller = useRef<HTMLDivElement>(null);
  const showUpdate = f.phase === "approved" && f.notifyCustomers;
  const showApology = f.phase === "rejected";

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [showUpdate, showApology]);

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
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
      <header
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          height: "60px",
          flex: "none",
          padding: "0 14px",
          background: "var(--panel)",
          borderBottom: "1px solid var(--line)",
        }}
      >
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
        </div>
        <div style={{ flex: "1" }}>
          <div style={{ fontWeight: "600" }}>Maria&#39;s Flowers &amp; Gifts</div>
          <div style={{ fontSize: "12px", color: "var(--mute)" }}>Delivery assistant · automated</div>
        </div>
      </header>
      <div
        ref={scroller}
        aria-live="polite"
        style={{
          flex: "1",
          minHeight: "0",
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          overflowY: "auto",
        }}
      >
        <div style={{ alignSelf: "center", fontSize: "11px", color: "var(--mute)" }}>Today</div>
        <OrderCard
          label="Order #1042 · on the way"
          title="Arriving 10:45 – 11:00"
          body="Jun is bringing your order."
          driver="jun"
          time="10:05"
        />
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
          <div style={{ fontSize: "11px", color: "#98A2B3", textAlign: "right", marginTop: "3px" }}>10:12</div>
        </div>
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
          Done. Jun will leave it with the concierge and you&#39;ll get a photo once it&#39;s dropped off.
          <div style={{ fontSize: "11px", color: "var(--mute)", textAlign: "right", marginTop: "3px" }}>10:12</div>
        </div>
        {showUpdate && (
          <OrderCard
            isNew
            label="Order #1042 · updated arrival"
            title="Arriving 12:15 – 12:30"
            body="Ana is bringing your order instead of Jun (flat tire). Still on time · leaving it with the lobby concierge."
            driver="ana"
            time="10:44"
          />
        )}
        {showApology && (
          <OrderCard
            isNew
            label="Order #1042 · running late"
            title="Now arriving 13:40 – 14:00"
            body="Sorry, Jun had a flat tire. He'll still leave it with the lobby concierge."
            driver="jun"
            time="10:44"
          />
        )}
      </div>
      <div
        style={{
          padding: "10px 12px 18px",
          flex: "none",
          background: "var(--panel)",
          borderTop: "1px solid var(--line)",
          display: "flex",
          gap: "8px",
        }}
      >
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
        />
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
        </button>
      </div>
    </div>
  );
}
