"use client";
// Marketing landing page. Interactive pieces are self-contained (local state only), so playing with them
// never changes the demo's saved scenario. The policy playground calls the real check() from lib/policy.ts.
import { useState, type CSSProperties, type ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/Shell";
import { check, HAM_417, type Mode, type Proposal } from "@/lib/policy";

const REPO = "https://github.com/RufelleEmmanuelPactol/hamilton";
const DOCS = `${REPO}/blob/HEAD/docs`;
const DEMO = "/console/?reset=1";


function Spark({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color} aria-hidden="true" style={{ flex: "none" }}>
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" />
    </svg>
  );
}
function Check({ color = "currentColor" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" aria-hidden="true" style={{ flex: "none" }}>
      <path d="M5 12.5l4.5 4.5L19 7.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ================================================================== hero demo */

const FONT = "IBM Plex Sans, sans-serif";

/** A small map of the flat-tire morning. Approving moves Jun's 3 remaining stops to Ana and Rico; routes cross-fade. */
function HeroDemo() {
  const [approved, setApproved] = useState(false);
  const show = (on: boolean): CSSProperties => ({ opacity: on ? 1 : 0, transition: "opacity .6s" });
  const fill = (c: string): CSSProperties => ({ fill: c, transition: "fill .5s" });
  const late = "#B42318";
  const ok = "#067647";
  return (
    <div className="lp-card" aria-label="Live example: a flat tire, and Hamilton's fix">
      <div style={{ padding: "14px 16px 12px", borderBottom: "1px solid var(--line)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: "var(--mute)" }}>Live example</span>
          <span style={{ color: "var(--mute)", fontSize: 12 }}>Maria’s Flowers &amp; Gifts · Monday 10:42</span>
          <span style={{ flex: 1 }} />
          <span
            className="lp-chip"
            style={approved ? { color: "var(--ok)", background: "var(--okBg)", borderColor: "var(--okLine)" } : undefined}
          >
            {approved ? "All on time" : "2 late"}
          </span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 600, lineHeight: 1.4, marginTop: 8 }} aria-live="polite">
          {approved
            ? "Fixed: Ana and Rico took Jun’s 3 deliveries. Nobody is late."
            : "10:31: Jun’s van got a flat tire. He still has 3 deliveries, and 2 will now be late."}
        </div>
      </div>

      <svg
        viewBox="0 0 520 250"
        width="100%"
        role="img"
        aria-label={
          approved
            ? "Map: Jun’s 3 remaining deliveries now on Ana’s and Rico’s routes, all on time"
            : "Map: Jun stopped by a flat tire with 3 deliveries left, 2 of them late"
        }
        style={{ display: "block", background: "#F2F4F7" }}
      >
        <path d="M0 150 C 90 130, 150 170, 240 150 S 400 120, 520 140 L 520 158 C 400 140, 330 170, 240 168 S 90 150, 0 168 Z" fill="#D1E9FF" />
        <text x="455" y="133" fontSize="10" fill="#175CD3" fontFamily={FONT}>
          Pasig River
        </text>
        <path d="M195 0 L 230 250" stroke="#fff" strokeWidth="10" />
        <path d="M0 60 L 520 85" stroke="#fff" strokeWidth="7" />
        <path d="M0 225 L 520 200" stroke="#fff" strokeWidth="7" />
        <text x="236" y="244" fontSize="10" fill="#667085" fontFamily={FONT} fontWeight="600">
          EDSA
        </text>

        <g fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="70,205 110,175 165,118 212,104" stroke="#2E90FA" />
          <polyline points="212,104 300,92 360,70 262,40" stroke="#F04438" strokeDasharray="6 6" style={show(!approved)} />
          <polyline points="70,205 300,92 360,70 380,182 450,212" stroke="#E91E63" style={show(approved)} />
          <polyline points="70,205 380,182 450,212" stroke="#E91E63" style={show(!approved)} />
          <polyline points="70,205 110,236 262,40" stroke="#F79009" style={show(approved)} />
          <polyline points="70,205 110,236" stroke="#F79009" style={show(!approved)} />
          <polyline points="70,205 150,226 222,236 420,128 478,96" stroke="#7A5AF8" />
        </g>

        <g stroke="#fff" strokeWidth="2">
          {[
            [110, 175],
            [165, 118],
            [150, 226],
            [222, 236],
            [110, 236],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="6" fill="#98A2B3" />
          ))}
          <circle cx="420" cy="128" r="6" fill="#7A5AF8" />
          <circle cx="478" cy="96" r="6" fill="#7A5AF8" />
          <circle cx="380" cy="182" r="6" fill="#E91E63" />
          <circle cx="450" cy="212" r="6" fill="#E91E63" />
          <circle cx="300" cy="92" r="8" style={fill(approved ? "#E91E63" : "#F04438")} />
          <circle cx="360" cy="70" r="8" style={fill(approved ? "#E91E63" : "#2E90FA")} />
          <circle cx="262" cy="40" r="8" style={fill(approved ? "#F79009" : "#F04438")} />
        </g>
        <g fontFamily={FONT} fontSize="11" fontWeight="600" fill="#101828">
          <text x="312" y="104">Mark Tan</text>
          <text x="312" y="117" fontWeight="500" style={fill(approved ? ok : late)}>
            {approved ? "12:15 with Ana · on time" : "13:40 · 40 min late"}
          </text>
          <text x="372" y="66">Nicole Ramos</text>
          <text x="372" y="79" fontWeight="500" fill="#344054">
            {approved ? "12:40 with Ana · on time" : "14:05 · still on time"}
          </text>
          <text x="274" y="36">Sam Ocampo</text>
          <text x="274" y="49" fontWeight="500" style={fill(approved ? ok : late)}>
            {approved ? "11:05 with Rico · on time" : "13:55 · 55 min late"}
          </text>
        </g>

        <rect x="60" y="195" width="20" height="20" rx="4" fill="#101828" />
        <path d="M65 209 v-6 l5 -4 l5 4 v6 z" fill="#fff" />
        <text x="50" y="232" fontSize="11" fontWeight="600" fill="#101828" fontFamily={FONT}>
          Shop
        </text>

        <circle cx="212" cy="104" r="11" fill="#F04438" stroke="#fff" strokeWidth="2" />
        <path d="M212 98 v7 M212 109 v1" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
        <text x="128" y="96" fontSize="11" fontWeight="600" fill={late} fontFamily={FONT}>
          Jun’s flat tire
        </text>
      </svg>

      <div className="lp-legend">
        {[
          ["Jun", "#2E90FA"],
          ["Ana", "#E91E63"],
          ["Rico", "#F79009"],
          ["Carlo", "#7A5AF8"],
        ].map(([n, c]) => (
          <span key={n}>
            <span style={{ width: 14, height: 3, borderRadius: 2, background: c }} />
            {n}
          </span>
        ))}
        <span>
          <span style={{ width: 9, height: 9, borderRadius: 99, background: "#98A2B3" }} />
          Delivered
        </span>
        <span>
          <span style={{ width: 9, height: 9, borderRadius: 99, background: "#F04438" }} />
          Will be late
        </span>
      </div>

      <div style={{ padding: "14px 16px 16px" }}>
        {!approved ? (
          <div className="ham-in">
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--brandInk)", fontWeight: 600 }}>
              <Spark size={12} /> Hamilton suggests
            </div>
            <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 2px" }}>Give Jun’s 3 remaining deliveries to Ana and Rico.</div>
            <div style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5 }}>
              Ana takes Mark and Nicole, Rico takes Sam. All 3 arrive on time. It waits for you because it changes 3 drivers’ routes.
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
              <button type="button" className="lp-btn lp-btn-primary lp-btn-sm" onClick={() => setApproved(true)}>
                Approve the fix
              </button>
              <span style={{ fontSize: 12, color: "var(--mute)" }}>Try it. The map updates.</span>
            </div>
          </div>
        ) : (
          <div className="ham-in">
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ok)" }}>Approved. All 3 customers get their flowers on time.</div>
            <div style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5, marginTop: 2 }}>
              Ana and Rico got new routes. Mark, Nicole and Sam got new arrival times on WhatsApp.
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 12, flexWrap: "wrap", alignItems: "center" }}>
              <a className="lp-btn lp-btn-primary lp-btn-sm" href={DEMO}>
                Play the full day →
              </a>
              <button type="button" className="lp-link" onClick={() => setApproved(false)}>
                Replay
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ================================================================== agents */

const AGENTS: { id: string; tab: string; title: string; body: string; bullets: string[]; demo: string; visual: ReactNode }[] = [
  {
    id: "dispatch",
    tab: "Dispatch",
    title: "Plans routes, and fixes them.",
    body: "Tomorrow’s routes, built from your drivers and orders. When a tire goes flat, it finds a fix in seconds.",
    bullets: ["Morning plan in one click", "Live re-planning with arrival times you can trust", "Holds a slot open for same-day orders"],
    demo: "/console/dispatch",
    visual: (
      <table className="lp-table">
        <thead>
          <tr>
            <th>Stop</th>
            <th>If you do nothing</th>
            <th>If you approve</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["#1042 Mark Tan", "13:40 · late", "12:15 · Ana"],
            ["#1050 Nicole Ramos", "14:05", "12:40 · Ana"],
            ["#1049 Sam Ocampo", "13:55 · late", "11:05 · Rico"],
          ].map(([a, b, c]) => (
            <tr key={a}>
              <td>{a}</td>
              <td style={{ color: b.includes("late") ? "var(--err)" : undefined }}>{b}</td>
              <td style={{ color: "var(--ok)", fontWeight: 600 }}>{c}</td>
            </tr>
          ))}
        </tbody>
      </table>
    ),
  },
  {
    id: "messages",
    tab: "Customer messages",
    title: "Answers your customers.",
    body: "Replies on WhatsApp and SMS, and reschedules when someone isn’t home. Anything sensitive comes to you.",
    bullets: ["Confirms risky deliveries before the driver leaves", "Reschedules from plain-language replies", "Never promises refunds"],
    demo: "/console/messages",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="lp-bubble">hi! not home until 3pm today, can you come later?</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--brandInk)", fontWeight: 600 }}>
          <Spark size={12} /> Assistant · reschedule · handled on its own
        </div>
        <div className="lp-bubble lp-bubble-out">
          No problem, Ben! Your sunflowers will now arrive between 15:00 and 17:00. We’ll message you when Ana is on her way.
        </div>
      </div>
    ),
  },
  {
    id: "proof",
    tab: "Proof & disputes",
    title: "Checks every delivery photo.",
    body: "A blurry photo gets retaken while the driver is still there. If a delivery is disputed, you get the evidence.",
    bullets: ["Instant photo checks: blur, house number, package in frame", "Evidence packs with timestamps and GPS", "Money decisions are always yours"],
    demo: "/app/deliver/?o=1042",
    visual: (
      <div style={{ display: "flex", gap: 14, alignItems: "stretch", flexWrap: "wrap" }}>
        <svg viewBox="0 0 160 120" width="160" height="120" role="img" aria-label="Proof photo: a parcel at a door" style={{ borderRadius: 8, background: "#EEF2F6", flex: "none" }}>
          <rect x="52" y="14" width="56" height="96" rx="3" fill="#D0D5DD" />
          <circle cx="98" cy="64" r="3" fill="#98A2B3" />
          <rect x="66" y="22" width="28" height="10" rx="2" fill="#fff" />
          <text x="80" y="30" fontSize="8" textAnchor="middle" fill="#344054" fontFamily="monospace">
            12B
          </text>
          <rect x="28" y="80" width="40" height="30" rx="3" fill="#F8BBD0" stroke="#C2185B" />
          <path d="M28 90h40M48 80v30" stroke="#C2185B" />
        </svg>
        <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, flex: "1 1 160px" }}>
          {["House number visible", "Parcel in frame", "Photo is sharp", "Taken at the address (GPS)"].map((t) => (
            <li key={t} style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Check color="#12B76A" /> {t}
            </li>
          ))}
          <li style={{ display: "flex", gap: 6, alignItems: "center", color: "var(--brandInk)", fontSize: 12, fontWeight: 600 }}>
            <Spark size={12} /> Checked in 1.2 s, driver still at the door
          </li>
        </ul>
      </div>
    ),
  },
];

function AgentTabs() {
  const [tab, setTab] = useState(0);
  const a = AGENTS[tab];
  return (
    <div>
      <div role="tablist" aria-label="Agents" className="lp-tabs">
        {AGENTS.map((x, i) => (
          <button
            key={x.id}
            role="tab"
            type="button"
            aria-selected={i === tab}
            className="lp-tab"
            onClick={() => setTab(i)}
          >
            <span className="lp-tab-n">0{i + 1}</span>
            {x.tab}
          </button>
        ))}
      </div>
      <div role="tabpanel" className="lp-split ham-in" key={a.id}>
        <div>
          <h3 className="lp-h3">{a.title}</h3>
          <p className="lp-p">{a.body}</p>
          <ul className="lp-bullets">
            {a.bullets.map((b) => (
              <li key={b}>
                <Check color="var(--brandInk)" /> {b}
              </li>
            ))}
          </ul>
          <Link href={a.demo} className="lp-link-arrow">
            See it in the demo →
          </Link>
        </div>
        <div className="lp-visual">{a.visual}</div>
      </div>
    </div>
  );
}

/* ================================================================== policy playground */

const ACTIONS: { id: string; label: string; proposal: Proposal; money?: boolean }[] = [
  { id: "ham417", label: "Move 3 of Jun’s stops to Ana and Rico", proposal: HAM_417 },
  {
    id: "one",
    label: "Move 1 stop from Carlo to Rico",
    proposal: { kind: "reassign_stops", from: "Carlo", stops: ["#1048"], to: { "#1048": "Rico" } },
  },
  { id: "refund", label: "Refund ₱850 to Café Morato", proposal: { kind: "refund", order: "#1045", amount: 850 }, money: true },
];
const MODES: { id: Mode; label: string }[] = [
  { id: "auto", label: "Auto" },
  { id: "auto_if", label: "Auto if…" },
  { id: "ask", label: "Ask me" },
  { id: "never", label: "Never" },
];

function PolicyPlayground() {
  const [action, setAction] = useState(0);
  const [mode, setMode] = useState<Mode>("auto_if");
  const [limit, setLimit] = useState(1);
  const a = ACTIONS[action];
  // Money is locked to Never in Hamilton, whatever the owner picks.
  const effective: Mode = a.money ? "never" : mode;
  const v = check(a.proposal, { id: "play", label: a.money ? "Refunds, credits or discounts" : "Reassign stops", mode: effective, autoLimit: limit });
  const result =
    v.outcome === "run"
      ? { tone: "ok", head: "Runs on its own", sub: "The agent acts and logs what it did. You can undo it from the audit log." }
      : v.outcome === "ask"
        ? { tone: "warn", head: "Becomes a ticket for you", sub: "Opened as a HAM ticket with the before and after. Nothing changes until you approve." }
        : { tone: "err", head: "Blocked", sub: "The agent prepares the evidence. A person makes the call." };

  return (
    <div className="lp-play">
      <div className="lp-play-controls">
        <div className="lp-label">1 · An agent proposes</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {ACTIONS.map((x, i) => (
            <label key={x.id} className={`lp-radio${i === action ? " on" : ""}`}>
              <input type="radio" name="lp-action" checked={i === action} onChange={() => setAction(i)} />
              {x.label}
            </label>
          ))}
        </div>

        <div className="lp-label" style={{ marginTop: 18 }}>
          2 · Your policy for {a.money ? "refunds" : "reassigning stops"}
        </div>
        <div role="radiogroup" aria-label="Policy mode" className="lp-seg">
          {MODES.map((m) => (
            <button
              key={m.id}
              type="button"
              role="radio"
              aria-checked={effective === m.id}
              disabled={a.money}
              onClick={() => setMode(m.id)}
              className={effective === m.id ? "on" : undefined}
            >
              {m.label}
            </button>
          ))}
        </div>
        {a.money ? (
          <p style={{ fontSize: 13, color: "var(--mute)", margin: "8px 0 0" }}>Money is always “Never”. No setting can change that.</p>
        ) : (
          mode === "auto_if" && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10, fontSize: 14 }}>
              <span>Auto if moving</span>
              <div className="lp-stepper">
                <button type="button" aria-label="Fewer" onClick={() => setLimit((n) => Math.max(0, n - 1))}>
                  −
                </button>
                <span aria-live="polite">{limit}</span>
                <button type="button" aria-label="More" onClick={() => setLimit((n) => Math.min(5, n + 1))}>
                  +
                </button>
              </div>
              <span>stop{limit === 1 ? "" : "s"} or fewer</span>
            </div>
          )
        )}
      </div>

      <div className="lp-play-result" data-tone={result.tone} aria-live="polite">
        <div className="lp-label">3 · What happens</div>
        <div className="lp-verdict" key={`${action}-${effective}-${limit}`}>
          <div className="lp-verdict-head">{result.head}</div>
          <div style={{ fontSize: 15, lineHeight: 1.5, color: "var(--ink2)" }}>{result.sub}</div>
          <div className="lp-reason">
            <span style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--mute)" }}>policy.check()</span>
            <span>{v.reason}</span>
          </div>
        </div>
        <p style={{ fontSize: 12, color: "var(--mute)", margin: "14px 0 0", lineHeight: 1.5 }}>
          Same rules as the demo.
        </p>
      </div>
    </div>
  );
}


/* ================================================================== page */

const BRANDS: { name: string; style: CSSProperties }[] = [
  { name: "Maria’s Flowers", style: { fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 26, fontWeight: 600, color: "#9F1239" } },
  { name: "Dela Cruz Bakery", style: { fontFamily: "'Fraunces', serif", fontSize: 25, fontWeight: 800, color: "#92400E", letterSpacing: "-0.01em" } },
  { name: "Café Morato", style: { fontFamily: "'DM Serif Display', serif", fontSize: 27, color: "#3F2A1E" } },
  { name: "botika+lola", style: { fontFamily: "'Nunito', sans-serif", fontSize: 25, fontWeight: 800, color: "#047857" } },
  { name: "KILOS EXPRESS", style: { fontFamily: "'Archivo Black', sans-serif", fontStyle: "italic", fontSize: 23, color: "#1D4ED8", letterSpacing: "-0.02em" } },
  { name: "sari/supply", style: { fontFamily: "'Space Grotesk', sans-serif", fontSize: 25, fontWeight: 700, color: "#334155" } },
];
const BRAND_FONTS =
  "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&family=Fraunces:opsz,wght@9..144,800&family=DM+Serif+Display&family=Nunito:wght@800&family=Archivo+Black&family=Space+Grotesk:wght@700&display=swap";

const DAY: [string, string, string][] = [
  ["6:00", "Orders from Shopify, WhatsApp and email", "One list, ready to go"],
  ["6:30", "Routes from memory", "Planned before you open"],
  ["9:00", "“Where are my flowers?”", "Answered on WhatsApp"],
  ["11:00", "Nobody home", "Confirmed before the van leaves"],
  ["14:00", "“It never came.”", "Photo checked at the door"],
  ["18:00", "Planning tomorrow", "Already done"],
];

const FEATURES: { t: string; b: string; icon: ReactNode }[] = [
  { t: "Live map", b: "See every van, and every delivery at risk.", icon: <><path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2z" /><path d="M9 4v14M15 6v14" /></> },
  { t: "Route planning", b: "Tomorrow’s routes, drafted for you to approve.", icon: <><circle cx="6" cy="18" r="2" /><circle cx="18" cy="6" r="2" /><path d="M8 18h6a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h6" /></> },
  { t: "Live re-routing", b: "A van breaks down. Its stops move to free drivers.", icon: <path d="M4 7h11l-3-3M20 17H9l3 3" /> },
  { t: "Decision inbox", b: "Everything that needs you, in one place.", icon: <><path d="M4 13l2-8h12l2 8v6H4z" /><path d="M4 13h5l1 2h4l1-2h5" /></> },
  { t: "Orders from anywhere", b: "Shopify, WhatsApp and email orders become jobs.", icon: <><path d="M5 8h14l-1.5 11h-11z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></> },
  { t: "Customer replies", b: "WhatsApp and SMS questions, answered for you.", icon: <path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z" /> },
  { t: "Arrival updates", b: "Customers get live delivery times.", icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></> },
  { t: "Driver app", b: "Next stop and one-tap reports. Nothing to install.", icon: <><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></> },
  { t: "Photo proof", b: "Checked at the door. Retaken if blurry.", icon: <><rect x="3" y="6" width="18" height="13" rx="2" /><circle cx="12" cy="12.5" r="3.5" /><path d="M8 6l1.5-2h5L16 6" /></> },
  { t: "Address book", b: "Gate codes, best times, who can receive.", icon: <><path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" /><circle cx="12" cy="10" r="2.5" /></> },
  { t: "Driver profiles", b: "Who knows which area, and how they’re doing.", icon: <><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></> },
  { t: "Rules and audit log", b: "Choose what runs alone. Undo anything.", icon: <><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z" /><path d="M9 12l2 2 4-4" /></> },
];

export default function Landing() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="lp">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <link rel="stylesheet" href={BRAND_FONTS} />

      <header className="lp-nav">
        <div className="lp-wrap lp-nav-in">
          <Link href="/" className="lp-brand">
            <Logo size={26} />
            Hamilton
          </Link>
          <nav aria-label="Sections" className={`lp-nav-links${menu ? " open" : ""}`} onClick={() => setMenu(false)}>
            <a href="#features">Features</a>
            <a href="#agents">Agents</a>
            <a href="#control">Control</a>
            <a href="#how">How it works</a>
            <a href={REPO}>GitHub</a>
          </nav>
          <span style={{ flex: 1 }} />
          <a className="lp-btn lp-btn-primary lp-btn-sm lp-hide-sm" href={DEMO}>
            Try the live demo
          </a>
          <button type="button" className="lp-burger" aria-label="Menu" aria-expanded={menu} onClick={() => setMenu((m) => !m)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d={menu ? "M6 6l12 12M18 6L6 18" : "M4 7h16M4 12h16M4 17h16"} strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </header>

      <main>
        <section className="lp-hero">
          <div className="lp-wrap lp-hero-grid">
            <div>
              <h1 className="lp-h1">
                Deliveries that run themselves. <span className="lp-accent">You stay in charge.</span>
              </h1>
              <p className="lp-lead">
                Hamilton plans your routes, fixes them when something goes wrong, and keeps customers updated. You approve what matters.
              </p>
              <div className="lp-cta-row">
                <a className="lp-btn lp-btn-primary" href={DEMO}>
                  Try the live demo
                </a>
                <a className="lp-btn lp-btn-ghost" href="#how">
                  See how it works
                </a>
              </div>
              <p className="lp-hero-note">No sign-up · Runs in your browser · 2 minutes</p>
            </div>
            <HeroDemo />
          </div>
        </section>

        <section className="lp-band">
          <div className="lp-wrap lp-band-label">For shops with 2–50 drivers</div>
          <div className="lp-marquee" role="img" aria-label="Example shops (fictional): Maria’s Flowers, Dela Cruz Bakery, Café Morato, botika+lola, Kilos Express, sari/supply">
            <div className="lp-marquee-track" aria-hidden="true">
              {[...BRANDS, ...BRANDS].map((b, i) => (
                <span key={i} style={{ ...b.style, whiteSpace: "nowrap", lineHeight: 1 }}>
                  {b.name}
                </span>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-section lp-section-alt">
          <div className="lp-wrap">
            <h2 className="lp-h2">Your day, handled.</h2>
            <ol className="lp-hd">
              {DAY.map(([t, was, now]) => (
                <li key={t}>
                  <span className="lp-hd-t">{t}</span>
                  <span className="lp-hd-was">{was}</span>
                  <span className="lp-hd-now">
                    <Check color="#067647" /> {now}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="features" className="lp-section">
          <div className="lp-wrap">
            <h2 className="lp-h2">Everything you need to run deliveries.</h2>
            <div className="lp-feats">
              {FEATURES.map((x) => (
                <div key={x.t} className="lp-feat">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C2185B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    {x.icon}
                  </svg>
                  <div style={{ fontSize: 16, fontWeight: 600, marginTop: 14 }}>{x.t}</div>
                  <div style={{ fontSize: 14, color: "var(--ink2)", lineHeight: 1.5, marginTop: 4 }}>{x.b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="agents" className="lp-section lp-section-alt">
          <div className="lp-wrap">
            <h2 className="lp-h2" style={{ marginBottom: 0 }}>
              Three assistants. One team.
            </h2>
            <AgentTabs />
          </div>
        </section>

        <section id="control" className="lp-section">
          <div className="lp-wrap">
            <h2 className="lp-h2">You decide what runs on its own.</h2>
            <p className="lp-p" style={{ maxWidth: 680 }}>
              Set a rule for each kind of action. Start with “Ask me”. Try it:
            </p>
            <PolicyPlayground />
          </div>
        </section>

        <section id="how" className="lp-section lp-section-dark">
          <div className="lp-wrap">
            <h2 className="lp-h2" style={{ color: "#fff" }}>
              A flat tire, fixed in under a minute.
            </h2>
            <ol className="lp-steps">
              {[
                { t: "Something happens", b: "A driver taps “Flat tire”, a customer replies, an order lands from Shopify or WhatsApp." },
                { t: "Triage sorts it", b: "Fast, low-cost checks: what is this about, is it urgent, does it need a person?" },
                { t: "An agent drafts the fix", b: "A reasoning model with tools re-plans routes, writes the reply or builds the evidence pack." },
                { t: "Your policy decides", b: "Auto runs and is logged. Ask me becomes a ticket. Never is blocked. Every step is in the audit log." },
              ].map((s, i) => (
                <li key={s.t} className="lp-step">
                  <span className="lp-step-n">{i + 1}</span>
                  <div className="lp-step-t">{s.t}</div>
                  <div className="lp-step-b">{s.b}</div>
                </li>
              ))}
            </ol>
            <div className="lp-trust">
              {[
                ["Every action is logged", "Input, decision and side effects, with Undo."],
                ["AI output is always labelled", "You always know what a person did and what an agent did."],
                ["Money is never automated", "Refunds and credits always go to a person."],
              ].map(([h, b]) => (
                <div key={h}>
                  <div style={{ fontWeight: 600, color: "#fff", marginBottom: 4 }}>{h}</div>
                  <div style={{ color: "#98A2B3", fontSize: 14, lineHeight: 1.5 }}>{b}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="lp-final">
          <div className="lp-wrap" style={{ textAlign: "center" }}>
            <h2 className="lp-h2" style={{ color: "#fff", margin: "0 auto 12px" }}>
              Get your day back.
            </h2>
            <p style={{ color: "#FCE4EC", fontSize: 17, margin: "0 0 24px" }}>No sign-up. Runs in your browser.</p>
            <a className="lp-btn lp-btn-white" href={DEMO}>
              Start the demo
            </a>
          </div>
        </section>
      </main>

      <footer className="lp-footer">
        <div className="lp-wrap lp-footer-in">
          <div>
            <div className="lp-brand" style={{ marginBottom: 8 }}>
              <Logo size={22} />
              Hamilton
            </div>
            <div style={{ maxWidth: 320, lineHeight: 1.5 }}>
              A product and engineering case study by Rufelle Emmanuel Pactol. Business names, people and orders are fictional.
            </div>
          </div>
          <div className="lp-footer-col">
            <div className="lp-footer-h">Product</div>
            <a href={DEMO}>Live demo</a>
            <Link href="/app/">Driver app</Link>
            <Link href="/customer/">Customer view</Link>
          </div>
          <div className="lp-footer-col">
            <div className="lp-footer-h">Case study</div>
            <a href={`${DOCS}/scope.md`}>Scope and top 3 agents</a>
            <a href={`${DOCS}/problem-research.md`}>Problem research</a>
            <a href={REPO}>Source on GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const CSS = `
.lp{--lp-ink:#0B1220;font-size:16px;line-height:1.5;background:#fff;color:var(--ink);overflow-x:hidden}
.lp *{box-sizing:border-box}
.lp-wrap{max-width:1200px;margin:0 auto;padding:0 24px}
.lp a{text-decoration:none}

/* nav */
.lp-nav{position:sticky;top:0;z-index:40;background:rgba(11,18,32,.92);border-bottom:1px solid rgba(255,255,255,.08)}
.lp-nav-in{height:64px;display:flex;align-items:center;gap:28px}
.lp-brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:18px;color:#fff!important;letter-spacing:-.01em}
.lp-footer .lp-brand{color:var(--ink)!important}
.lp-nav-links{display:flex;gap:24px}
.lp-nav-links a{color:#D0D5DD;font-size:15px;font-weight:500}
.lp-nav-links a:hover{color:#fff}
.lp-burger{display:none;background:none;border:0;color:#fff;width:44px;height:44px;align-items:center;justify-content:center;cursor:pointer}

/* buttons */
.lp-btn{display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 22px;border-radius:8px;font-weight:600;font-size:16px;white-space:nowrap;border:1px solid transparent;cursor:pointer;font-family:inherit;transition:transform .12s,background .12s,box-shadow .12s}
.lp-btn:active{transform:translateY(1px)}
.lp-btn-sm{height:36px;padding:0 14px;font-size:14px}
.lp-btn-primary{background:var(--brand);color:#fff!important}
.lp-btn-primary:hover{background:#D81B60}
.lp-btn-ghost{background:rgba(255,255,255,.06);color:#fff!important;border-color:rgba(255,255,255,.22)}
.lp-btn-ghost:hover{background:rgba(255,255,255,.12)}
.lp-btn-outline{background:#fff;color:var(--ink)!important;border-color:var(--line2)}
.lp-btn-white{background:#fff;color:var(--brandInk)!important}
.lp-link{background:none;border:0;padding:0;font:inherit;font-size:14px;font-weight:600;color:var(--brandInk);cursor:pointer}
.lp-link-arrow{font-weight:600;color:var(--brandInk)!important}
.lp-link-arrow:hover{text-decoration:underline}

/* hero */
.lp-hero{background:var(--lp-ink);color:#fff;padding:72px 0 88px}
.lp-hero-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:56px;align-items:center}
.lp-h1{font-size:60px;line-height:1.04;letter-spacing:-.035em;font-weight:700;margin:0 0 20px}
.lp-accent{color:#F48FB1}
.lp-lead{font-size:19px;line-height:1.55;color:#D0D5DD;max-width:560px;margin:0 0 30px}
.lp-cta-row{display:flex;gap:12px;flex-wrap:wrap}
.lp-hero-note{margin:22px 0 0;color:#98A2B3;font-size:14px}
.lp-card{background:#fff;color:var(--ink);border:1px solid #D0D5DD;border-radius:14px;overflow:hidden;font-size:13px}
.lp-chip{font-size:12px;font-weight:600;color:var(--err);background:var(--errBg);border:1px solid var(--errLine);border-radius:99px;padding:2px 10px;transition:all .3s}
.lp-legend{display:flex;flex-wrap:wrap;gap:6px 14px;padding:10px 16px;border-bottom:1px solid var(--line);font-size:12px;color:var(--ink2)}
.lp-legend>span{display:flex;align-items:center;gap:6px}

/* band */
.lp-band{border-bottom:1px solid var(--line);background:#fff;padding:28px 0}
.lp-band-label{font-size:14px;color:var(--mute);margin-bottom:18px}
.lp-marquee{overflow:hidden;-webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent)}
.lp-marquee-track{display:flex;align-items:center;gap:72px;width:max-content;padding-right:72px;animation:lpMarquee 36s linear infinite}
.lp-marquee:hover .lp-marquee-track{animation-play-state:paused}
@keyframes lpMarquee{from{transform:translateX(-50%)}to{transform:translateX(0)}}
@media (prefers-reduced-motion:reduce){.lp-marquee-track{animation:none}}

/* day + features */
.lp-hd{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:12px}
.lp-hd li{background:#fff;border:1px solid var(--line);border-radius:12px;padding:18px;display:flex;flex-direction:column;gap:10px}
.lp-hd-t{font-family:var(--mono);font-size:13px;color:var(--mute)}
.lp-hd-was{font-size:14px;color:var(--mute);text-decoration:line-through;text-decoration-color:#98A2B3;line-height:1.4}
.lp-hd-now{font-size:16px;font-weight:600;line-height:1.35;display:flex;gap:6px;align-items:flex-start}
.lp-hd-now svg{margin-top:3px}
.lp-feats{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));border-top:1px solid var(--line);border-left:1px solid var(--line)}
.lp-feat{padding:24px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);transition:background .15s}
.lp-feat:hover{background:var(--sub)}

/* sections */
.lp-section{padding:96px 0}
.lp-section-alt{background:var(--bg)}
.lp-section-dark{background:var(--lp-ink);color:#fff}
.lp-h2{font-size:42px;line-height:1.12;letter-spacing:-.025em;font-weight:700;margin:0 0 36px;max-width:860px}
.lp-h3{font-size:26px;line-height:1.2;letter-spacing:-.015em;font-weight:700;margin:0 0 12px}
.lp-p{font-size:17px;line-height:1.6;color:var(--ink2);margin:0 0 20px}


/* agents tabs */
.lp-tabs{display:flex;gap:8px;margin:36px 0 28px;border-bottom:1px solid var(--line);overflow-x:auto}
.lp-tab{font:inherit;font-size:16px;font-weight:600;background:none;border:0;border-bottom:3px solid transparent;padding:12px 6px 14px;margin-right:22px;color:var(--mute);cursor:pointer;display:flex;align-items:center;gap:10px;white-space:nowrap}
.lp-tab[aria-selected=true]{color:var(--ink);border-bottom-color:var(--brand)}
.lp-tab:hover{color:var(--ink)}
.lp-tab-n{font-family:var(--mono);font-size:12px;color:var(--brandInk)}
.lp-split{display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:start}
.lp-bullets{list-style:none;padding:0;margin:0 0 24px;display:flex;flex-direction:column;gap:10px;font-size:16px}
.lp-bullets li{display:flex;gap:10px;align-items:center}
.lp-visual{background:#fff;border:1px solid var(--line);border-radius:14px;padding:24px}
.lp-table{width:100%;border-collapse:collapse;font-size:14px}
.lp-table th{text-align:left;font-weight:500;color:var(--mute);font-size:12px;padding:0 8px 10px 0;border-bottom:1px solid var(--line)}
.lp-table td{padding:12px 8px 12px 0;border-bottom:1px solid var(--line);white-space:nowrap}
.lp-bubble{background:var(--sub);border:1px solid var(--line);border-radius:14px 14px 14px 4px;padding:10px 14px;font-size:15px;max-width:85%}
.lp-bubble-out{align-self:flex-end;background:#DCF8C6;border-color:#C5E8AE;border-radius:14px 14px 4px 14px}

/* policy playground */
.lp-play{display:grid;grid-template-columns:1fr 1fr;gap:0;margin-top:36px;border:1px solid var(--line);border-radius:16px;overflow:hidden}
.lp-play-controls{padding:28px;background:#fff}
.lp-play-result{padding:28px;background:var(--bg);border-left:1px solid var(--line);transition:background .3s}
.lp-play-result[data-tone=ok]{background:var(--okBg)}
.lp-play-result[data-tone=warn]{background:var(--warnBg)}
.lp-play-result[data-tone=err]{background:var(--errBg)}
.lp-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--mute);margin-bottom:10px}
.lp-radio{display:flex;align-items:center;gap:10px;padding:12px 14px;border:1px solid var(--line);border-radius:10px;cursor:pointer;font-size:15px;transition:border-color .12s,background .12s}
.lp-radio.on{border-color:var(--brand);background:var(--brandTint)}
.lp-radio input{accent-color:var(--brand)}
.lp-seg{display:inline-flex;border:1px solid var(--line2);border-radius:10px;overflow:hidden;flex-wrap:wrap}
.lp-seg button{font:inherit;font-size:14px;font-weight:600;height:40px;padding:0 16px;border:0;background:#fff;color:var(--ink2);cursor:pointer}
.lp-seg button+button{border-left:1px solid var(--line2)}
.lp-seg button.on{background:var(--ink);color:#fff}
.lp-seg button:disabled{cursor:not-allowed;opacity:.55}
.lp-seg button.on:disabled{opacity:1;background:var(--err)}
.lp-stepper{display:inline-flex;align-items:center;border:1px solid var(--line2);border-radius:8px;overflow:hidden;background:#fff}
.lp-stepper button{font:inherit;width:32px;height:32px;border:0;background:#fff;cursor:pointer;font-size:16px}
.lp-stepper span{min-width:28px;text-align:center;font-weight:700}
.lp-verdict{animation:hamFade .25s ease-out both}
.lp-verdict-head{font-size:30px;font-weight:700;letter-spacing:-.02em;margin-bottom:8px}
[data-tone=ok] .lp-verdict-head{color:var(--ok)}
[data-tone=warn] .lp-verdict-head{color:var(--warn)}
[data-tone=err] .lp-verdict-head{color:var(--err)}
.lp-reason{display:flex;flex-direction:column;gap:4px;margin-top:18px;padding:12px 14px;background:rgba(255,255,255,.7);border:1px solid var(--line);border-radius:10px;font-size:14px}

/* how */
.lp-steps{list-style:none;padding:0;margin:44px 0 0;display:grid;grid-template-columns:repeat(4,1fr);gap:20px;counter-reset:s}
.lp-step{position:relative;padding:24px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(255,255,255,.03)}
.lp-step:last-child{border-color:rgba(248,187,208,.4);background:rgba(233,30,99,.1)}
.lp-step-n{display:inline-flex;width:30px;height:30px;border-radius:99px;align-items:center;justify-content:center;background:var(--brand);color:#fff;font-weight:700;font-size:14px}
.lp-step-t{font-weight:700;font-size:18px;margin:16px 0 8px}
.lp-step-b{color:#98A2B3;font-size:15px;line-height:1.55}
.lp-trust{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;margin-top:48px;padding-top:36px;border-top:1px solid rgba(255,255,255,.1)}



/* final */
.lp-final{background:#C2185B;padding:88px 0}

/* footer */
.lp-footer{background:#fff;border-top:1px solid var(--line);color:var(--mute);font-size:14px}
.lp-footer-in{display:flex;gap:48px;flex-wrap:wrap;padding-top:48px;padding-bottom:48px}
.lp-footer-in>div:first-child{flex:1 1 280px}
.lp-footer-col{display:flex;flex-direction:column;gap:10px;min-width:160px}
.lp-footer-col a{color:var(--ink2)}
.lp-footer-col a:hover{color:var(--brandInk)}
.lp-footer-h{font-weight:700;color:var(--ink);font-size:13px;text-transform:uppercase;letter-spacing:.06em}

@media (max-width:1000px){
  .lp-hero-grid,.lp-split,.lp-play{grid-template-columns:1fr}
  .lp-play-result{border-left:0;border-top:1px solid var(--line)}
  .lp-h1{font-size:48px}
  .lp-steps{grid-template-columns:repeat(2,1fr)}
  .lp-hd{grid-template-columns:repeat(3,minmax(0,1fr))}
  .lp-feats{grid-template-columns:repeat(2,minmax(0,1fr))}
}
@media (max-width:760px){
  .lp-nav-links{display:none;position:absolute;top:64px;left:0;right:0;flex-direction:column;gap:0;background:var(--lp-ink);border-bottom:1px solid rgba(255,255,255,.1)}
  .lp-nav-links.open{display:flex}
  .lp-nav-links a{padding:14px 16px;border-top:1px solid rgba(255,255,255,.06)}
  .lp-burger{display:inline-flex}
  .lp-hide-sm{display:none}
  .lp-wrap{padding:0 16px}
  .lp-hero{padding:48px 0 64px}
  .lp-h1{font-size:38px}
  .lp-lead{font-size:17px}
  .lp-h2{font-size:30px}
  .lp-section{padding:64px 0}
  .lp-steps,.lp-trust{grid-template-columns:1fr}
  .lp-hd,.lp-feats{grid-template-columns:1fr 1fr}
  .lp-feat{padding:18px}
}
`;
