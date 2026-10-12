"use client";
// Converted from design/project/AddressBook.dc.html, then wired: Ben's reply (10:40) only exists after 10:30,
// notes and the AI guidance Edit are local (not saved).
import { useState } from "react";
import { useScenarioFacts } from "@/lib/scenario";

const GUIDANCE_BEFORE = ["Message on WhatsApp before dispatch.", "If missed again, ask for a safe-drop person."];
const GUIDANCE_AFTER = [
  "Message on WhatsApp before dispatch.",
  "Schedule after 15:00 on weekdays.",
  "If missed again, ask for a safe-drop person.",
];

export default function AddressBookBoard() {
  const facts = useScenarioFacts();
  const replied = facts.phase !== "before"; // Ben replies at 10:40; the clock reads 10:30 before the incident.
  const [editing, setEditing] = useState(false);
  const [edited, setEdited] = useState<string | null>(null);
  const [draftGuidance, setDraftGuidance] = useState("");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState<{ time: string; text: string }[]>([]);
  const guidance = edited !== null ? edited.split("\n").filter((l) => l.trim()) : replied ? GUIDANCE_AFTER : GUIDANCE_BEFORE;
  const startEdit = () => {
    setDraftGuidance(guidance.join("\n"));
    setEditing(true);
  };
  const saveNote = () => {
    if (!note.trim()) return;
    setNotes((n) => [{ time: facts.clock, text: note.trim() }, ...n]);
    setNote("");
  };
  return (
    <>
      {" "}
      <main style={{ flex: "999 1 640px", minWidth: "0", display: "flex", flexWrap: "wrap", alignItems: "stretch" }}>
        {" "}
        <aside
          aria-label="Record properties"
          style={{
            flex: "1 1 280px",
            maxWidth: "320px",
            background: "var(--panel)",
            borderRight: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <div style={{ padding: "18px 18px 14px", borderBottom: "1px solid var(--line)" }}>
            {" "}
            <a
              href="/console/addresses"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "12px",
                fontWeight: "500",
                textDecoration: "none",
                marginBottom: "12px",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
              All addresses
            </a>{" "}
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              {" "}
              <span
                style={{
                  width: "44px",
                  height: "44px",
                  borderRadius: "10px",
                  background: "#FEF0C7",
                  color: "#93370D",
                  fontSize: "15px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                BC
              </span>{" "}
              <div>
                <h1 style={{ margin: "0", fontSize: "17px", fontWeight: "600" }}>Cruz home</h1>
                <div style={{ color: "var(--mute)" }}>Ben Cruz · Residential</div>
              </div>{" "}
            </div>{" "}
            <div style={{ display: "flex", gap: "6px", marginTop: "12px", flexWrap: "wrap" }}>
              <span
                title="2 or more failed deliveries in the last 60 days"
                style={{
                  fontSize: "11px",
                  fontWeight: "600",
                  color: "var(--warn)",
                  background: "var(--warnBg)",
                  border: "1px solid var(--warnLine)",
                  borderRadius: "4px",
                  padding: "0 6px",
                }}
              >
                2 failed deliveries
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--ink2)",
                  border: "1px solid var(--line2)",
                  borderRadius: "4px",
                  padding: "0 6px",
                }}
              >
                Orders monthly
              </span>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--ink2)",
                  border: "1px solid var(--line2)",
                  borderRadius: "4px",
                  padding: "0 6px",
                }}
              >
                Message before dispatch
              </span>
            </div>{" "}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
                gap: "6px",
                marginTop: "14px",
              }}
            >
              {" "}
              <button
                style={{
                  font: "inherit",
                  fontSize: "11px",
                  color: "var(--ink2)",
                  background: "none",
                  border: "0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "99px",
                    border: "1px solid var(--line2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 5h16v11H9l-5 4z" />
                  </svg>
                </span>
                Message
              </button>{" "}
              <button
                style={{
                  font: "inherit",
                  fontSize: "11px",
                  color: "var(--ink2)",
                  background: "none",
                  border: "0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "99px",
                    border: "1px solid var(--line2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                  </svg>
                </span>
                Call
              </button>{" "}
              <button
                style={{
                  font: "inherit",
                  fontSize: "11px",
                  color: "var(--ink2)",
                  background: "none",
                  border: "0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "99px",
                    border: "1px solid var(--line2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                Order
              </button>{" "}
              <button
                style={{
                  font: "inherit",
                  fontSize: "11px",
                  color: "var(--ink2)",
                  background: "none",
                  border: "0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "4px",
                  cursor: "pointer",
                }}
              >
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "99px",
                    border: "1px solid var(--line2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 20h4L19 9l-4-4L4 16z" />
                  </svg>
                </span>
                Note
              </button>{" "}
            </div>{" "}
          </div>{" "}
          <div style={{ padding: "12px 18px", borderBottom: "1px solid var(--line)" }}>
            {" "}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontWeight: "600", flex: "1" }}>About this address</span>
              <button
                style={{
                  font: "inherit",
                  fontSize: "12px",
                  border: "0",
                  background: "none",
                  color: "var(--brandInk)",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
            </div>{" "}
            <dl style={{ margin: "0", display: "grid", gridTemplateColumns: "1fr", gap: "10px" }}>
              {" "}
              <div>
                <dt style={{ fontSize: "12px", color: "var(--mute)" }}>Address</dt>
                <dd style={{ margin: "2px 0 0" }}>8 East Capitol Dr, Kapitolyo, Pasig</dd>
              </div>{" "}
              <div>
                <dt style={{ fontSize: "12px", color: "var(--mute)" }}>Primary contact</dt>
                <dd style={{ margin: "2px 0 0" }}>Ben Cruz · +63 917 222 1004</dd>
              </div>{" "}
              <div>
                <dt style={{ fontSize: "12px", color: "var(--mute)" }}>Best delivery time</dt>
                {!replied ? (
                  <dd style={{ margin: "2px 0 0", color: "var(--mute)" }}>Unknown, asked on WhatsApp at 09:12</dd>
                ) : (
                  <dd style={{ margin: "2px 0 0" }}>
                    Weekdays after 15:00{" "}
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--ok)",
                        background: "var(--okBg)",
                        border: "1px solid var(--okLine)",
                        borderRadius: "4px",
                        padding: "0 5px",
                      }}
                    >
                      Learned today
                    </span>
                  </dd>
                )}
              </div>{" "}
              <div>
                <dt style={{ fontSize: "12px", color: "var(--mute)" }}>Safe-drop</dt>
                <dd style={{ margin: "2px 0 0", color: "var(--mute)" }}>Unknown, ask on next miss</dd>
              </div>{" "}
              <div>
                <dt style={{ fontSize: "12px", color: "var(--mute)" }}>Access</dt>
                <dd style={{ margin: "2px 0 0" }}>Green gate, doorbell on left post</dd>
              </div>{" "}
              <div>
                <dt style={{ fontSize: "12px", color: "var(--mute)" }}>Preferred channel</dt>
                <dd style={{ margin: "2px 0 0" }}>WhatsApp (rarely answers calls)</dd>
              </div>{" "}
              <div>
                <dt style={{ fontSize: "12px", color: "var(--mute)" }}>Language</dt>
                <dd style={{ margin: "2px 0 0" }}>Tagalog / English</dd>
              </div>{" "}
            </dl>{" "}
          </div>{" "}
          <div style={{ padding: "12px 18px" }}>
            {" "}
            <div style={{ fontWeight: "600", marginBottom: "8px" }}>Delivery stats</div>{" "}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                border: "1px solid var(--line)",
                borderRadius: "6px",
              }}
            >
              {" "}
              <div style={{ padding: "8px 10px", borderRight: "1px solid var(--line)" }}>
                <div style={{ fontSize: "11px", color: "var(--mute)" }}>Orders</div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>5</div>
              </div>{" "}
              <div style={{ padding: "8px 10px", borderRight: "1px solid var(--line)" }}>
                <div style={{ fontSize: "11px", color: "var(--mute)" }}>Failed</div>
                <div style={{ fontSize: "16px", fontWeight: "600", color: "var(--warn)" }}>2</div>
              </div>{" "}
              <div style={{ padding: "8px 10px" }}>
                <div style={{ fontSize: "11px", color: "var(--mute)" }}>Lifetime</div>
                <div style={{ fontSize: "16px", fontWeight: "600" }}>₱7,250</div>
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </aside>{" "}
        <section aria-label="Activity" style={{ flex: "999 1 420px", minWidth: "0", display: "flex", flexDirection: "column" }}>
          {" "}
          <div
            role="tablist"
            aria-label="Record tabs"
            style={{
              display: "flex",
              gap: "20px",
              padding: "0 20px",
              background: "var(--panel)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            {" "}
            <button
              role="tab"
              aria-selected="true"
              style={{
                font: "inherit",
                fontWeight: "600",
                color: "var(--brandInk)",
                background: "none",
                border: "0",
                borderBottom: "2px solid var(--brandInk)",
                padding: "12px 2px 10px",
                cursor: "pointer",
              }}
            >
              Activity
            </button>{" "}
            <button
              role="tab"
              aria-selected="false"
              style={{
                font: "inherit",
                color: "var(--ink2)",
                background: "none",
                border: "0",
                borderBottom: "2px solid transparent",
                padding: "12px 2px 10px",
                cursor: "pointer",
              }}
            >
              Orders <span style={{ color: "var(--mute)" }}>5</span>
            </button>{" "}
            <button
              role="tab"
              aria-selected="false"
              style={{
                font: "inherit",
                color: "var(--ink2)",
                background: "none",
                border: "0",
                borderBottom: "2px solid transparent",
                padding: "12px 2px 10px",
                cursor: "pointer",
              }}
            >
              Messages <span style={{ color: "var(--mute)" }}>8</span>
            </button>{" "}
            <button
              role="tab"
              aria-selected="false"
              style={{
                font: "inherit",
                color: "var(--ink2)",
                background: "none",
                border: "0",
                borderBottom: "2px solid transparent",
                padding: "12px 2px 10px",
                cursor: "pointer",
              }}
            >
              Notes <span style={{ color: "var(--mute)" }}>3</span>
            </button>{" "}
          </div>{" "}
          <div style={{ padding: "16px 20px", display: "flex", flexDirection: "column", gap: "14px" }}>
            {" "}
            <div
              style={{
                background: "var(--panel)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                padding: "10px 12px",
                display: "flex",
                gap: "8px",
              }}
            >
              <input
                aria-label="Add a note"
                placeholder="Add a note about this address…"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveNote();
                }}
                style={{ font: "inherit", flex: "1", minWidth: "0", border: "0", outline: "0" }}
              />
              <button
                onClick={saveNote}
                style={{
                  font: "inherit",
                  fontWeight: "600",
                  height: "30px",
                  padding: "0 12px",
                  border: "0",
                  borderRadius: "6px",
                  background: "var(--brandInk)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>{" "}
            <div
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--mute)",
              }}
            >
              Today
            </div>{" "}
            <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "8px" }}>
              {notes.map((n, i) => (
                <div
                  key={i}
                  className="ham-in"
                  style={{ display: "flex", gap: "12px", padding: "12px 14px", borderBottom: "1px solid var(--line)" }}
                >
                  <span
                    style={{
                      width: "28px",
                      height: "28px",
                      flex: "none",
                      borderRadius: "99px",
                      background: "#344054",
                      color: "#fff",
                      fontSize: "10px",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    MS
                  </span>
                  <div style={{ flex: "1" }}>
                    <div>
                      <b>Maria Santos</b> added a note
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--ink2)", marginTop: "2px" }}>{n.text}</div>
                  </div>
                  <span style={{ fontSize: "12px", color: "var(--mute)" }}>{n.time}</span>
                </div>
              ))}
              {replied && (
                <>
                  <div style={{ display: "flex", gap: "12px", padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        flex: "none",
                        borderRadius: "6px",
                        background: "var(--brandTint)",
                        color: "var(--brandInk)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        aria-hidden="true"
                      >
                        <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
                      </svg>
                    </span>
                    <div style={{ flex: "1" }}>
                      <div>
                        <b>Assurance agent</b> updated <b>Best delivery time</b> to weekdays after 15:00
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>
                        From reply &#34;wala pa ako sa bahay, after 3pm pa po&#34; · policy: save memory (Auto)
                      </div>
                    </div>
                    <span style={{ fontSize: "12px", color: "var(--mute)" }}>10:41</span>
                  </div>{" "}
                  <div style={{ display: "flex", gap: "12px", padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
                    <span
                      style={{
                        width: "28px",
                        height: "28px",
                        flex: "none",
                        borderRadius: "6px",
                        background: "var(--infoBg)",
                        color: "var(--info)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 7v5l3 2" />
                      </svg>
                    </span>
                    <div style={{ flex: "1" }}>
                      <div>
                        Order <b>#1044</b> rescheduled 11:00–15:00 → <b>15:00–17:00</b>
                      </div>
                      <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>
                        Driver: Ana Villanueva · route re-sequenced
                      </div>
                    </div>
                    <span style={{ fontSize: "12px", color: "var(--mute)" }}>10:41</span>
                  </div>
                </>
              )}
              <div style={{ display: "flex", gap: "12px", padding: "12px 14px" }}>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    flex: "none",
                    borderRadius: "6px",
                    background: "#F2F4F7",
                    color: "var(--ink2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M4 5h16v11H9l-5 4z" />
                  </svg>
                </span>
                <div style={{ flex: "1" }}>
                  <div>
                    {replied
                      ? "WhatsApp pre-confirmation sent, Ben replied in 88 min"
                      : "WhatsApp pre-confirmation sent, waiting for Ben's reply"}
                  </div>
                  <a href="/console/messages" style={{ fontSize: "12px", textDecoration: "none", fontWeight: "500" }}>
                    View conversation
                  </a>
                </div>
                <span style={{ fontSize: "12px", color: "var(--mute)" }}>09:12</span>
              </div>{" "}
            </div>{" "}
            <div
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--mute)",
              }}
            >
              September
            </div>{" "}
            <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "8px" }}>
              {" "}
              <div style={{ display: "flex", gap: "12px", padding: "12px 14px", borderBottom: "1px solid var(--line)" }}>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    flex: "none",
                    borderRadius: "6px",
                    background: "var(--okBg)",
                    color: "var(--ok)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M5 12l5 5 9-10" />
                  </svg>
                </span>
                <div style={{ flex: "1" }}>
                  <div>
                    Order <b>#0972</b> delivered on retry, 16:20
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>Received by Ben · proof verified</div>
                </div>
                <span style={{ fontSize: "12px", color: "var(--mute)" }}>14 Sep</span>
              </div>{" "}
              <div style={{ display: "flex", gap: "12px", padding: "12px 14px" }}>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    flex: "none",
                    borderRadius: "6px",
                    background: "var(--errBg)",
                    color: "var(--err)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                <div style={{ flex: "1" }}>
                  <div>
                    Order <b>#0972</b> failed, nobody home, no answer
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>Attempt 1 at 11:05 · Driver: Carlo</div>
                </div>
                <span style={{ fontSize: "12px", color: "var(--mute)" }}>14 Sep</span>
              </div>{" "}
            </div>{" "}
            <div
              style={{
                fontSize: "11px",
                fontWeight: "600",
                letterSpacing: "0.04em",
                textTransform: "uppercase",
                color: "var(--mute)",
              }}
            >
              August
            </div>{" "}
            <div style={{ background: "var(--panel)", border: "1px solid var(--line)", borderRadius: "8px" }}>
              {" "}
              <div style={{ display: "flex", gap: "12px", padding: "12px 14px" }}>
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    flex: "none",
                    borderRadius: "6px",
                    background: "var(--errBg)",
                    color: "var(--err)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </span>
                <div style={{ flex: "1" }}>
                  <div>
                    Order <b>#0881</b> failed, nobody home
                  </div>
                  <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "2px" }}>10:40 · refunded ₱1,450 by Maria</div>
                </div>
                <span style={{ fontSize: "12px", color: "var(--mute)" }}>12 Aug</span>
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </section>{" "}
        <aside
          aria-label="Associations"
          style={{
            flex: "1 1 260px",
            maxWidth: "300px",
            background: "var(--panel)",
            borderLeft: "1px solid var(--line)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {" "}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)" }}>
            {" "}
            <div style={{ display: "flex", alignItems: "center", marginBottom: "8px" }}>
              <span style={{ fontWeight: "600", flex: "1" }}>Open orders</span>
              <span style={{ color: "var(--mute)" }}>1</span>
            </div>{" "}
            <div style={{ border: "1px solid var(--line)", borderRadius: "6px", padding: "8px 10px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: "12px", color: "var(--mute)" }}>#1044</span>
                <span
                  style={{
                    fontSize: "11px",
                    color: "var(--info)",
                    background: "var(--infoBg)",
                    border: "1px solid var(--infoLine)",
                    borderRadius: "4px",
                    padding: "0 5px",
                  }}
                >
                  Scheduled
                </span>
              </div>
              <div style={{ fontWeight: "500", marginTop: "4px" }}>Sunflower bundle</div>
              <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                {replied ? "Today 15:00–17:00 · Ana" : "Today 11:00–15:00 · Ana"}
              </div>
            </div>{" "}
          </div>{" "}
          <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--line)" }}>
            {" "}
            <div style={{ fontWeight: "600", marginBottom: "8px" }}>Drivers who&#39;ve been here</div>{" "}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}>
              <span
                style={{
                  width: "22px",
                  height: "22px",
                  borderRadius: "99px",
                  background: "#7A5AF8",
                  color: "#fff",
                  fontSize: "9px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                CM
              </span>
              <span style={{ flex: "1" }}>Carlo Mendoza</span>
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>3 visits</span>
            </div>{" "}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 0" }}>
              <span
                style={{
                  width: "22px",
                  height: "22px",
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
              <span style={{ flex: "1" }}>Ana Villanueva</span>
              <span style={{ fontSize: "12px", color: "var(--mute)" }}>1 visit</span>
            </div>{" "}
          </div>{" "}
          <div style={{ padding: "12px 16px" }}>
            {" "}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#E91E63" aria-hidden="true">
                <path d="M12 2l2.1 6.3L20.5 10l-6.4 1.9L12 18l-2.1-6.1L3.5 10l6.4-1.7z" />
                <path d="M19 15l.9 2.5 2.6.9-2.6.9L19 22l-.9-2.7-2.6-.9 2.6-.9z" />
              </svg>
              <span style={{ fontWeight: "600" }}>Delivery guidance</span>
              <span style={{ flex: "1" }}></span>
              <button
                onClick={() => {
                  if (editing) {
                    setEdited(draftGuidance);
                    setEditing(false);
                  } else startEdit();
                }}
                aria-pressed={editing}
                style={{
                  font: "inherit",
                  fontSize: "12px",
                  height: "26px",
                  padding: "0 8px",
                  border: "1px solid var(--line2)",
                  borderRadius: "6px",
                  background: "var(--panel)",
                  color: "var(--ink2)",
                  cursor: "pointer",
                }}
              >
                {editing ? "Done" : "Edit"}
              </button>
            </div>
            <div style={{ border: "1px solid #F8BBD0", background: "#FFF7FA", borderRadius: "6px", padding: "10px 12px" }}>
              {editing ? (
                <textarea
                  aria-label="Delivery guidance, one line per instruction"
                  value={draftGuidance}
                  onChange={(e) => setDraftGuidance(e.target.value)}
                  rows={Math.max(5, draftGuidance.split("\n").length * 2)}
                  autoFocus
                  style={{
                    font: "inherit",
                    width: "100%",
                    boxSizing: "border-box",
                    border: "1px solid var(--line2)",
                    borderRadius: "6px",
                    padding: "6px 8px",
                    lineHeight: "1.6",
                    color: "var(--ink)",
                    background: "var(--panel)",
                    resize: "vertical",
                  }}
                />
              ) : (
                <ul style={{ margin: "0", paddingLeft: "18px", color: "var(--ink2)", lineHeight: "1.6" }}>
                  {guidance.map((g, i) => (
                    <li key={i}>{g}</li>
                  ))}
                </ul>
              )}
              <div
                style={{
                  fontSize: "12px",
                  color: "var(--mute)",
                  marginTop: "8px",
                  paddingTop: "8px",
                  borderTop: "1px solid #FBD5E3",
                }}
              >
                {edited !== null ? (
                  <>
                    <span style={{ color: "var(--ink)", fontWeight: "500" }}>Edited by Maria</span> at {facts.clock} · overrides the summary{" "}
                    <button
                      onClick={() => setEdited(null)}
                      style={{
                        font: "inherit",
                        border: "0",
                        background: "none",
                        padding: "0",
                        color: "var(--brandInk)",
                        cursor: "pointer",
                      }}
                    >
                      Restore summary
                    </button>
                  </>
                ) : (
                  <>
                    <span style={{ color: "var(--brandInk)", fontWeight: "500" }}>Auto-generated</span> from{" "}
                    <a href="/console/addresses" style={{ textDecoration: "none" }}>
                      2 failed attempts
                    </a>
                    ,{" "}
                    <a href="/console/messages" style={{ textDecoration: "none" }}>
                      {replied ? "3 WhatsApp replies" : "2 WhatsApp replies"}
                    </a>{" "}
                    and{" "}
                    <a href="/console/drivers" style={{ textDecoration: "none" }}>
                      1 driver note
                    </a>{" "}
                    · updated today {replied ? "10:41" : "09:12"}
                  </>
                )}
              </div>
            </div>
            <div style={{ fontSize: "12px", color: "var(--mute)", marginTop: "8px" }}>
              Used by the Dispatch and Messages agents
            </div>{" "}
          </div>{" "}
        </aside>{" "}
      </main>{" "}
    </>
  );
}
