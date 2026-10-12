"use client";
// Inbox tab (/app/inbox): the driver's thread with dispatch. Dispatch messages follow the scenario;
// anything the driver sends stays on this phone and gets a short acknowledgement.
import { useEffect, useRef, useState } from "react";
import { useDriverStops } from "./data";
import { ScreenHeader, Sparkle, mono } from "./ui";

interface Msg {
  id: string;
  from: "dispatch" | "me";
  time: string;
  text: string;
}

const QUICK = ["On my way", "Running 10 min late", "Customer not answering", "Need help at a stop"];

export default function Inbox() {
  const { driver, facts: f } = useDriverStops();
  const [mine, setMine] = useState<Msg[]>([]);
  const [draft, setDraft] = useState("");
  const end = useRef<HTMLDivElement>(null);

  const base: Msg[] = [{ id: "plan", from: "dispatch", time: "07:45", text: `Morning ${driver.first}! Your route for today is ready. ${driver.id === "jun" ? "5 stops, first pickup at the shop 08:30." : "2 stops this afternoon, Ortigas then Pasig."}` }];
  if (driver.id === "jun") {
    base.push({ id: "1042", from: "dispatch", time: "10:12", text: "Mark Tan (#1042) confirmed: leave it with the lobby concierge. Instructions updated." });
    if (f.junIncident) {
      base.push({ id: "shop", from: "dispatch", time: "10:32", text: "Got your flat tire report. Nearest vulcanizing shop: 600 m, Kalayaan Ave. Take your time." });
      if (f.phase === "incident") base.push({ id: "wait", from: "dispatch", time: "10:33", text: "I've asked Maria to move your 3 remaining stops so they arrive on time. I'll tell you as soon as she decides." });
      if (f.phase === "approved") base.push({ id: "ok", from: "dispatch", time: "10:44", text: "Maria approved: #1042 and #1050 go to Ana, #1049 to Rico. Customers have new ETAs. Nothing left on your route today." });
      if (f.phase === "rejected") base.push({ id: "no", from: "dispatch", time: "10:44", text: "Maria kept your stops with you. Customers for #1042 and #1049 were told you're running late. Deliver them when you're back on the road." });
      if (f.junBackOnRoad) base.push({ id: "back", from: "dispatch", time: "11:20", text: "Thanks for the update. Glad you're back on the road." });
    }
  } else if (f.moved) {
    base.push({ id: "add", from: "dispatch", time: "10:44", text: "Jun has a flat tire. I added 2 of his stops to your route: #1042 Mark Tan (12:15) and #1050 Nicole Ramos (12:40), both in BGC. Delivery notes are on each stop." });
  }
  const msgs = [...base, ...mine];

  useEffect(() => {
    end.current?.scrollIntoView({ block: "end" });
  }, [msgs.length]);

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    const id = String(Date.now());
    setMine((m) => [...m, { id, from: "me", time: f.clock, text: t }]);
    setDraft("");
    setTimeout(() => setMine((m) => [...m, { id: id + "r", from: "dispatch", time: f.clock, text: "Got it, thanks. I'll update your route and the customer if anything changes." }]), 900);
  };

  return (
    <>
      <ScreenHeader
        title="Inbox"
        sub={
          <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
            <Sparkle /> Dispatch · replies in seconds, Maria sees everything
          </span>
        }
      />
      <div style={{ flex: "1", minHeight: "0", overflowY: "auto", padding: "14px 14px 6px", background: "var(--sub)", display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ textAlign: "center", fontSize: "12px", color: "var(--mute)" }}>Today</div>
        {msgs.map((m) => (
          <div key={m.id} className="ham-in" style={{ alignSelf: m.from === "me" ? "flex-end" : "flex-start", maxWidth: "82%" }}>
            <div
              style={{
                padding: "9px 12px",
                borderRadius: m.from === "me" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                background: m.from === "me" ? "var(--brandInk)" : "var(--panel)",
                color: m.from === "me" ? "#fff" : "var(--ink)",
                border: m.from === "me" ? "0" : "1px solid var(--line)",
                lineHeight: 1.4,
              }}
            >
              {m.text}
            </div>
            <div style={{ ...mono, fontSize: "11px", color: "var(--mute)", marginTop: "3px", textAlign: m.from === "me" ? "right" : "left" }}>{m.time}</div>
          </div>
        ))}
        <div ref={end} />
      </div>
      <div style={{ flex: "none", borderTop: "1px solid var(--line)", background: "var(--panel)", padding: "8px 12px 10px" }}>
        <div style={{ display: "flex", gap: "6px", overflowX: "auto", paddingBottom: "8px" }}>
          {QUICK.map((q) => (
            <button
              key={q}
              onClick={() => send(q)}
              style={{ font: "inherit", fontSize: "12px", whiteSpace: "nowrap", height: "30px", padding: "0 10px", borderRadius: "99px", border: "1px solid var(--line2)", background: "var(--panel)", color: "var(--ink2)", cursor: "pointer" }}
            >
              {q}
            </button>
          ))}
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(draft);
          }}
          style={{ display: "flex", gap: "8px" }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Message dispatch"
            aria-label="Message dispatch"
            style={{ font: "inherit", flex: "1", minWidth: "0", height: "42px", border: "1px solid var(--line2)", borderRadius: "99px", padding: "0 14px", color: "var(--ink)" }}
          />
          <button
            type="submit"
            aria-label="Send"
            disabled={!draft.trim()}
            style={{ width: "42px", height: "42px", flex: "none", borderRadius: "99px", border: "0", background: draft.trim() ? "var(--brandInk)" : "var(--line)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: draft.trim() ? "pointer" : "default" }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M4 12l16-8-6 16-2-6z" />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}
