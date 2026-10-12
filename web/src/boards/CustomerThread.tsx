"use client";
// Converted from design/project/CustomerThread.dc.html: Mark Tan's WhatsApp thread for #1042.
// Customers hear nothing new until a person decides on HAM-417. Approved (with notify) → new ETA; rejected → apology.
import { useEffect, useRef, useState } from "react";
import { useScenarioFacts } from "@/lib/scenario";

const DRIVER = {
  ana: { initials: "AV", color: "#E91E63", name: "Ana · Sedan" },
  jun: { initials: "JR", color: "#2E90FA", name: "Jun · Van" },
};

interface Tracking {
  driver: "jun" | "ana";
  arriving: string;
  late: boolean;
  steps: { text: string; time?: string; done: boolean }[];
}

/** "Track delivery": where #1042 is right now, as a sheet over the chat. */
function TrackSheet({ t, onClose }: { t: Tracking; onClose: () => void }) {
  const d = DRIVER[t.driver];
  return (
    <div
      onClick={onClose}
      style={{ position: "absolute", inset: "0", zIndex: 5, background: "rgba(16,24,40,0.4)", display: "flex", alignItems: "flex-end" }}
    >
      <div
        role="dialog"
        aria-label="Track delivery"
        className="ham-in"
        onClick={(e) => e.stopPropagation()}
        style={{ width: "100%", background: "var(--panel)", borderRadius: "16px 16px 0 0", padding: "16px 16px 20px" }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <div style={{ flex: "1", fontSize: "12px", color: "var(--mute)" }}>Order #1042 · Anniversary box</div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: "32px",
              height: "32px",
              border: "0",
              background: "none",
              color: "var(--ink2)",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            ×
          </button>
        </div>
        <div style={{ fontSize: "20px", fontWeight: "600", color: t.late ? "var(--err)" : "var(--ink)" }}>{t.arriving}</div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "8px", fontSize: "13px", color: "var(--ink2)" }}>
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
          <span style={{ marginLeft: "auto", color: "var(--mute)" }}>Uptown Parksuites, BGC</span>
        </div>
        <ol style={{ listStyle: "none", margin: "16px 0 0", padding: "0", display: "flex", flexDirection: "column", gap: "10px" }}>
          {t.steps.map((st) => (
            <li key={st.text} style={{ display: "flex", alignItems: "center", gap: "10px", color: st.done ? "var(--ink)" : "var(--mute)" }}>
              <span
                aria-hidden="true"
                style={{
                  width: "10px",
                  height: "10px",
                  flex: "none",
                  borderRadius: "99px",
                  background: st.done ? "var(--brandInk)" : "var(--panel)",
                  border: st.done ? "0" : "2px solid var(--line2)",
                }}
              />
              <span style={{ flex: "1" }}>{st.text}</span>
              {st.time && <span style={{ fontSize: "12px", color: "var(--mute)" }}>{st.time}</span>}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function OrderCard({
  label,
  title,
  body,
  driver,
  time,
  isNew,
  onTrack,
}: {
  label: string;
  title: string;
  body: string;
  driver: "jun" | "ana";
  time: string;
  isNew?: boolean;
  onTrack: () => void;
}) {
  const d = DRIVER[driver];
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
      <button
        onClick={onTrack}
        style={{
          display: "block",
          width: "100%",
          font: "inherit",
          border: "0",
          borderTop: "1px solid var(--line)",
          background: "none",
          padding: "10px 12px",
          textAlign: "center",
          fontWeight: "600",
          color: "var(--brandInk)",
          cursor: "pointer",
        }}
      >
        Track delivery
      </button>
    </div>
  );
}

export default function CustomerThreadBoard() {
  const f = useScenarioFacts();
  const scroller = useRef<HTMLDivElement>(null);
  const showUpdate = f.phase === "approved" && f.notifyCustomers;
  const showApology = f.phase === "rejected";
  const [tracking, setTracking] = useState(false);
  const [draft, setDraft] = useState("");
  // What Mark types here stays on this screen, with a short automated acknowledgement.
  const [mine, setMine] = useState<{ id: number; text: string; time: string; me: boolean }[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const el = scroller.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [showUpdate, showApology, mine.length]);
  useEffect(() => () => clearTimeout(timer.current), []);

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    const id = Date.now();
    setMine((m) => [...m, { id, text, time: f.clock, me: true }]);
    setDraft("");
    clearTimeout(timer.current);
    timer.current = setTimeout(
      () =>
        setMine((m) => [...m, { id: id + 1, text: "Thanks, Mark. Maria's Flowers will reply here shortly.", time: f.clock, me: false }]),
      900,
    );
  };

  const outForDelivery = { text: "Out for delivery", time: "10:05", done: true };
  const track: Tracking = showUpdate
    ? {
        driver: "ana",
        arriving: "Arriving 12:15 – 12:30",
        late: false,
        steps: [
          outForDelivery,
          { text: "Ana is bringing it instead of Jun", time: "10:44", done: true },
          { text: "Left with the lobby concierge", done: false },
        ],
      }
    : showApology
      ? {
          driver: "jun",
          arriving: "Now arriving 13:40 – 14:00",
          late: true,
          steps: [
            outForDelivery,
            { text: "Running late · flat tire", time: "10:44", done: true },
            { text: "Left with the lobby concierge", done: false },
          ],
        }
      : {
          driver: "jun",
          arriving: "Arriving 10:45 – 11:00",
          late: false,
          steps: [outForDelivery, { text: "Left with the lobby concierge", done: false }],
        };

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
          onTrack={() => setTracking(true)}
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
          Hi, I&#39;m at work until 6. Can you leave it with the concierge?
          <div style={{ fontSize: "11px", color: "#98A2B3", textAlign: "right", marginTop: "3px" }}>10:11</div>
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
          No problem, Mark. We&#39;ll leave it with the concierge and send you a photo when it&#39;s delivered.
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
            onTrack={() => setTracking(true)}
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
            onTrack={() => setTracking(true)}
          />
        )}
        {mine.map((m) => (
          <div
            key={m.id}
            className="ham-in"
            style={
              m.me
                ? {
                    alignSelf: "flex-end",
                    maxWidth: "78%",
                    background: "#101828",
                    color: "#fff",
                    borderRadius: "12px 12px 2px 12px",
                    padding: "9px 12px",
                    lineHeight: "1.45",
                    fontFamily: "system-ui, sans-serif",
                  }
                : {
                    alignSelf: "flex-start",
                    maxWidth: "80%",
                    background: "var(--panel)",
                    border: "1px solid var(--line)",
                    borderRadius: "12px 12px 12px 2px",
                    padding: "9px 12px",
                    lineHeight: "1.45",
                    color: "var(--ink2)",
                  }
            }
          >
            {m.text}
            <div style={{ fontSize: "11px", color: m.me ? "#98A2B3" : "var(--mute)", textAlign: "right", marginTop: "3px" }}>{m.time}</div>
          </div>
        ))}
      </div>
      {tracking && <TrackSheet t={track} onClose={() => setTracking(false)} />}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
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
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
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
          type="submit"
          aria-label="Send"
          disabled={!draft.trim()}
          style={{
            width: "44px",
            height: "44px",
            border: "0",
            borderRadius: "10px",
            background: draft.trim() ? "var(--brandInk)" : "var(--line)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: draft.trim() ? "pointer" : "default",
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 12l16-8-6 16-2-7z" />
          </svg>
        </button>
      </form>
    </div>
  );
}
