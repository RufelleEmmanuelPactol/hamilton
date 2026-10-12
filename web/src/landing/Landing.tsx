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

const DRV = {
  j: { name: "Jun", color: "#2E90FA" },
  c: { name: "Carlo", color: "#7A5AF8" },
  a: { name: "Ana", color: "#E91E63" },
  r: { name: "Rico", color: "#F79009" },
} as const;
type D = keyof typeof DRV;

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

/** Where each stop sits: [driver row, slot]. Approving HAM-417 moves Jun's last 3 stops. */
const BEFORE: Record<string, [D, number, "done" | "risk" | "todo"]> = {
  "1041": ["j", 0, "done"],
  "1047": ["j", 1, "done"],
  "1042": ["j", 2, "risk"],
  "1050": ["j", 3, "todo"],
  "1049": ["j", 4, "risk"],
  "1045": ["c", 0, "done"],
  "1046": ["c", 1, "done"],
  "1051": ["c", 2, "todo"],
  "1048": ["c", 3, "todo"],
  "1043": ["a", 0, "todo"],
  "1044": ["a", 1, "todo"],
  "1039": ["r", 0, "done"],
};
const AFTER: Record<string, [D, number, "done" | "risk" | "todo"]> = {
  ...BEFORE,
  "1042": ["a", 0, "todo"],
  "1050": ["a", 1, "todo"],
  "1043": ["a", 2, "todo"],
  "1044": ["a", 3, "todo"],
  "1049": ["r", 1, "todo"],
};
const ROWS: D[] = ["j", "c", "a", "r"];

function HeroDemo() {
  const [approved, setApproved] = useState(false);
  const layout = approved ? AFTER : BEFORE;
  const moved = new Set(["1042", "1050", "1049"]);
  return (
    <div className="lp-hero-card" aria-label="Try it: approve the Dispatch agent's fix">
      <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "12px 16px", borderBottom: "1px solid var(--line)" }}>
        <span style={{ width: 8, height: 8, borderRadius: 99, background: approved ? "#12B76A" : "#F04438" }} />
        <span style={{ fontWeight: 600, fontSize: 13 }}>Today, 10:42</span>
        <span style={{ color: "var(--mute)", fontSize: 13 }}>Maria’s Flowers &amp; Gifts</span>
        <span style={{ flex: 1 }} />
        <span className="lp-chip" style={approved ? { color: "var(--ok)", background: "var(--okBg)", borderColor: "var(--okLine)" } : undefined}>
          {approved ? "0 at risk" : "2 at risk"}
        </span>
      </div>

      <div style={{ position: "relative", height: 4 * 46 + 16, margin: "8px 16px 0" }}>
        {ROWS.map((d, i) => (
          <div
            key={d}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: i * 46 + 8,
              height: 38,
              display: "flex",
              alignItems: "center",
              borderBottom: i < 3 ? "1px dashed var(--line)" : undefined,
            }}
          >
            <span style={{ width: 9, height: 9, borderRadius: 99, background: DRV[d].color, marginRight: 8 }} />
            <span style={{ fontSize: 13, fontWeight: 600, width: 50 }}>{DRV[d].name}</span>
            {d === "j" && (
              <span style={{ fontSize: 11, color: "var(--err)", fontWeight: 600, whiteSpace: "nowrap" }} className="lp-flat">
                Flat tire
              </span>
            )}
          </div>
        ))}
        {Object.entries(layout).map(([id, [d, slot, st]]) => {
          const row = ROWS.indexOf(d);
          const risk = st === "risk" && !approved;
          return (
            <span
              key={id}
              className="lp-stop"
              style={{
                top: row * 46 + 15,
                left: `calc(var(--lp-lane) + ${slot} * var(--lp-slot))`,
                background: st === "done" ? "var(--sub)" : "#fff",
                color: st === "done" ? "var(--mute)" : risk ? "var(--err)" : "var(--ink)",
                borderColor: risk ? "#F04438" : st === "done" ? "var(--line)" : DRV[d].color,
                boxShadow: approved && moved.has(id) ? `0 0 0 3px ${DRV[d].color}33` : undefined,
              }}
            >
              {st === "done" && <span className="lp-tick">✓ </span>}
              {id}
            </span>
          );
        })}
      </div>

      <div className="lp-ai" style={{ margin: "8px 16px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--brandInk)", fontWeight: 600 }}>
          <Spark size={12} /> Dispatch agent · HAM-417
        </div>
        {!approved ? (
          <>
            <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 2px" }}>Move 3 of Jun’s stops to Ana and Rico?</div>
            <div style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5 }}>
              Jun has a flat (about 1 hour). If you do nothing, #1042 and #1049 arrive 40–85 min late. With this change all 3 arrive on time.
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 10, flexWrap: "wrap" }}>
              <button type="button" className="lp-btn lp-btn-primary lp-btn-sm" onClick={() => setApproved(true)}>
                Approve
              </button>
              <span style={{ fontSize: 12, color: "var(--mute)", alignSelf: "center" }}>Held for you: 3 stops is over your 1-stop auto limit.</span>
            </div>
          </>
        ) : (
          <div className="ham-in">
            <div style={{ fontSize: 14, fontWeight: 600, margin: "6px 0 2px", color: "var(--ok)" }}>Done. Everyone is on time again.</div>
            <div style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.5 }}>
              Routes re-sequenced for Ana and Rico. 3 customers got new arrival times on WhatsApp. Logged in the audit trail.
            </div>
            <div style={{ display: "flex", gap: 12, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
              <a className="lp-btn lp-btn-primary lp-btn-sm" href={DEMO}>
                Play the full scenario →
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
    title: "Plans the day. Re-plans it when the day breaks.",
    body: "Builds tomorrow’s routes from your drivers, vans, history and address book. When a tire goes flat or a road closes, it finds the fix in seconds and shows you the before and after.",
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
    title: "Answers “where’s my order?” before you see it.",
    body: "Reads every WhatsApp and SMS reply, understands “not home until 3pm”, reschedules, and answers from that order’s data only. Anything sensitive lands in your inbox instead.",
    bullets: ["Confirms risky deliveries before the driver leaves", "Reschedules from plain-language replies", "Never promises refunds"],
    demo: "/console/messages",
    visual: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div className="lp-bubble">hi! not home until 3pm today, can you come later? 🙏</div>
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
    title: "Checks proof at the door. Builds the case when it’s disputed.",
    body: "Every proof-of-delivery photo is checked while the driver is still there, so a blurry shot gets retaken, not argued about later. Damage claims get an evidence pack, and a person decides.",
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
          This box runs the same policy code as the demo. Agents can’t talk their way past it: the check is in code, not in a prompt.
        </p>
      </div>
    </div>
  );
}

/* ================================================================== page */

const STATS = [
  { n: "8%", t: "of last-mile deliveries fail on the first attempt" },
  { n: "$17", t: "is the cost of each failed delivery" },
  { n: "94%", t: "of customers blame the shop, not the courier" },
  { n: "1.7 h", t: "a day goes to manual dispatch and follow-ups" },
];

const ROADMAP = [
  { phase: "Now", title: "Proof of concept", body: "Admin console, driver app and customer view on one scripted day. Policy engine in code." },
  { phase: "0–3 months", title: "Design-partner pilot", body: "3–5 fleets in one city. Shopify, WhatsApp and tracking-tool integrations. Agents start in “Ask me”." },
  { phase: "3–6 months", title: "Earned autonomy", body: "Approval rates suggest which rules can move from “Ask me” to “Auto”. Driver voice notes." },
  { phase: "6–12 months", title: "Platform", body: "Weather and traffic in tomorrow’s plan, multi-depot fleets, and an MCP server for owners’ own assistants." },
];

export default function Landing() {
  const [menu, setMenu] = useState(false);
  return (
    <div className="lp">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      <header className="lp-nav">
        <div className="lp-wrap lp-nav-in">
          <Link href="/" className="lp-brand">
            <Logo size={26} />
            Hamilton
          </Link>
          <nav aria-label="Sections" className={`lp-nav-links${menu ? " open" : ""}`} onClick={() => setMenu(false)}>
            <a href="#agents">Agents</a>
            <a href="#control">Control</a>
            <a href="#how">How it works</a>
            <a href="#roadmap">Roadmap</a>
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
        {/* ---------------- hero */}
        <section className="lp-hero">
          <div className="lp-wrap lp-hero-grid">
            <div>
              <div className="lp-eyebrow">
                <Spark size={12} /> AI operations for small delivery fleets
              </div>
              <h1 className="lp-h1">
                Your deliveries run themselves. <span className="lp-accent">You stay in charge.</span>
              </h1>
              <p className="lp-lead">
                Hamilton’s agents plan routes, fix them when the day breaks, answer customers and check every proof of delivery. Anything that
                touches money or people waits for your OK.
              </p>
              <div className="lp-cta-row">
                <a className="lp-btn lp-btn-primary" href={DEMO}>
                  Try the live demo
                </a>
                <a className="lp-btn lp-btn-ghost" href="#how">
                  See how it works
                </a>
              </div>
              <ul className="lp-hero-ticks">
                <li>
                  <Check /> No sign-up
                </li>
                <li>
                  <Check /> Runs in your browser
                </li>
                <li>
                  <Check /> 2 minutes
                </li>
              </ul>
            </div>
            <div>
              <HeroDemo />
              <p className="lp-hero-hint">↑ This is live. Approve the fix and watch the routes change.</p>
            </div>
          </div>
        </section>

        {/* ---------------- who it's for */}
        <section className="lp-band">
          <div className="lp-wrap lp-band-in">
            <span className="lp-band-label">Built for fleets of 2–50 drivers</span>
            {["Florists", "Bakeries", "Distributors", "Pharmacies", "Local couriers", "Gift shops"].map((s) => (
              <span key={s} className="lp-band-item">
                {s}
              </span>
            ))}
          </div>
        </section>

        {/* ---------------- problem */}
        <section className="lp-section">
          <div className="lp-wrap">
            <div className="lp-kicker">The problem</div>
            <h2 className="lp-h2">In a small fleet, the owner is the dispatcher, the help desk and the claims team.</h2>
            <p className="lp-p" style={{ maxWidth: 680 }}>
              Routes get rebuilt from memory, “where’s my order?” arrives all day, and a disputed delivery turns into an argument about a blurry
              photo. Enterprise tools are too heavy and too expensive. Tracking apps only track.
            </p>
            <div className="lp-stats">
              {STATS.map((s) => (
                <div key={s.n} className="lp-stat">
                  <div className="lp-stat-n">{s.n}</div>
                  <div className="lp-stat-t">{s.t}</div>
                </div>
              ))}
            </div>
            <p className="lp-source">Sources: OneRail via FreightWaves; Microlise survey of 250 logistics managers. Full notes in the research doc.</p>
          </div>
        </section>

        {/* ---------------- agents */}
        <section id="agents" className="lp-section lp-section-alt">
          <div className="lp-wrap">
            <div className="lp-kicker">Three agents, one team</div>
            <h2 className="lp-h2">They do the legwork. You make the calls.</h2>
            <AgentTabs />
          </div>
        </section>

        {/* ---------------- control */}
        <section id="control" className="lp-section">
          <div className="lp-wrap">
            <div className="lp-kicker">Autonomy you can dial in</div>
            <h2 className="lp-h2">Agents propose. Your policies decide.</h2>
            <p className="lp-p" style={{ maxWidth: 680 }}>
              Every action goes through rules you set in plain language. Start with “Ask me” for everything, then let Hamilton earn more
              autonomy as you approve its work. Try it:
            </p>
            <PolicyPlayground />
          </div>
        </section>

        {/* ---------------- how */}
        <section id="how" className="lp-section lp-section-dark">
          <div className="lp-wrap">
            <div className="lp-kicker" style={{ color: "#F8BBD0" }}>
              How it works
            </div>
            <h2 className="lp-h2" style={{ color: "#fff" }}>
              From a flat tire to a fixed route in under a minute.
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

        {/* ---------------- demo walkthrough */}
        <section className="lp-section">
          <div className="lp-wrap lp-split" style={{ alignItems: "center" }}>
            <div>
              <div className="lp-kicker">The 2-minute demo</div>
              <h2 className="lp-h2">Live a Monday at Maria’s Flowers &amp; Gifts.</h2>
              <p className="lp-p">
                Four drivers, thirteen orders, Metro Manila. At 10:31 Jun gets a flat tire. Be the driver, be the owner, and see what the
                customer sees.
              </p>
              <div className="lp-cta-row">
                <a className="lp-btn lp-btn-primary" href={DEMO}>
                  Start the demo
                </a>
                <Link className="lp-btn lp-btn-outline" href="/app/">
                  Open the driver app
                </Link>
              </div>
            </div>
            <ol className="lp-timeline">
              {[
                ["10:30", "A calm morning", "Everyone on time.", "/console/"],
                ["10:31", "Jun reports a flat tire", "One tap in the driver app.", "/app/report/"],
                ["10:33", "The agent proposes a fix", "Held for you as HAM-417.", "/console/approvals/"],
                ["10:44", "You approve", "Routes, ETAs and customers update.", "/console/audit/"],
              ].map(([t, h, b, href]) => (
                <li key={t}>
                  <span className="lp-time">{t}</span>
                  <div>
                    <div style={{ fontWeight: 600 }}>{h}</div>
                    <div style={{ color: "var(--mute)", fontSize: 14 }}>{b}</div>
                  </div>
                  <Link href={href} className="lp-link-arrow" style={{ marginLeft: "auto", fontSize: 13 }}>
                    Open →
                  </Link>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ---------------- roadmap */}
        <section id="roadmap" className="lp-section lp-section-alt">
          <div className="lp-wrap">
            <div className="lp-kicker">Roadmap</div>
            <h2 className="lp-h2">Autonomy is earned, not switched on.</h2>
            <div className="lp-roadmap">
              {ROADMAP.map((r, i) => (
                <div key={r.title} className={`lp-road${i === 0 ? " now" : ""}`}>
                  <div className="lp-road-phase">{r.phase}</div>
                  <div style={{ fontWeight: 600, fontSize: 16, margin: "6px 0" }}>{r.title}</div>
                  <div style={{ color: "var(--ink2)", fontSize: 14, lineHeight: 1.55 }}>{r.body}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- final CTA */}
        <section className="lp-final">
          <div className="lp-wrap" style={{ textAlign: "center" }}>
            <h2 className="lp-h2" style={{ color: "#fff", margin: "0 auto 12px", maxWidth: 720 }}>
              Watch a morning go wrong, and get fixed, in two minutes.
            </h2>
            <p style={{ color: "#FCE4EC", fontSize: 17, margin: "0 0 24px" }}>No sign-up. No API keys. Nothing to install.</p>
            <a className="lp-btn lp-btn-white" href={DEMO}>
              Try the live demo
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
            <a href={`${DOCS}/roadmap.md`}>Roadmap</a>
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
.lp-nav{position:sticky;top:0;z-index:40;background:rgba(11,18,32,.92);backdrop-filter:saturate(1.4) blur(10px);border-bottom:1px solid rgba(255,255,255,.08)}
.lp-nav-in{height:64px;display:flex;align-items:center;gap:28px}
.lp-brand{display:flex;align-items:center;gap:10px;font-weight:700;font-size:18px;color:#fff!important;letter-spacing:-.01em}
.lp-footer .lp-brand{color:var(--ink)!important}
.lp-nav-links{display:flex;gap:24px}
.lp-nav-links a{color:#D0D5DD;font-size:15px;font-weight:500}
.lp-nav-links a:hover{color:#fff}
.lp-burger{display:none;background:none;border:0;color:#fff;padding:6px;cursor:pointer}

/* buttons */
.lp-btn{display:inline-flex;align-items:center;justify-content:center;height:48px;padding:0 22px;border-radius:8px;font-weight:600;font-size:16px;white-space:nowrap;border:1px solid transparent;cursor:pointer;font-family:inherit;transition:transform .12s,background .12s,box-shadow .12s}
.lp-btn:hover{transform:translateY(-1px)}
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
.lp-hero{background:radial-gradient(1200px 600px at 85% -10%,rgba(233,30,99,.28),transparent 60%),var(--lp-ink);color:#fff;padding:72px 0 88px}
.lp-hero-grid{display:grid;grid-template-columns:1.05fr 1fr;gap:56px;align-items:center}
.lp-eyebrow{display:inline-flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:#F8BBD0;background:rgba(233,30,99,.14);border:1px solid rgba(248,187,208,.25);padding:6px 12px;border-radius:99px}
.lp-h1{font-size:60px;line-height:1.04;letter-spacing:-.035em;font-weight:700;margin:20px 0 20px}
.lp-accent{color:#F48FB1}
.lp-lead{font-size:19px;line-height:1.55;color:#D0D5DD;max-width:560px;margin:0 0 30px}
.lp-cta-row{display:flex;gap:12px;flex-wrap:wrap}
.lp-hero-ticks{list-style:none;display:flex;gap:22px;flex-wrap:wrap;padding:0;margin:26px 0 0;color:#98A2B3;font-size:14px}
.lp-hero-ticks li{display:flex;align-items:center;gap:6px}
.lp-hero-card{--lp-lane:118px;--lp-slot:min(58px,calc((100% - 118px)/6));background:#fff;color:var(--ink);border-radius:14px;box-shadow:0 0 0 1px rgba(255,255,255,.08);overflow:hidden;font-size:13px}
.lp-hero-hint{color:#98A2B3;font-size:13px;margin:12px 0 0;text-align:center}
.lp-chip{font-size:12px;font-weight:600;color:var(--err);background:var(--errBg);border:1px solid var(--errLine);border-radius:99px;padding:2px 10px;transition:all .3s}
.lp-stop{position:absolute;height:24px;min-width:50px;padding:0 6px;display:flex;align-items:center;justify-content:center;border:1.5px solid;border-radius:6px;font-family:var(--mono);font-size:11px;font-weight:500;transition:top .7s cubic-bezier(.2,.8,.2,1),left .7s cubic-bezier(.2,.8,.2,1),border-color .4s,color .4s,box-shadow .4s;white-space:nowrap}
.lp-ai{background:var(--aiBg);border:1px solid var(--aiLine);border-radius:10px;padding:12px 14px}

/* band */
.lp-band{border-bottom:1px solid var(--line);background:#fff}
.lp-band-in{display:flex;align-items:center;gap:12px 36px;flex-wrap:wrap;padding-top:22px;padding-bottom:22px}
.lp-band-label{font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.06em;color:var(--mute)}
.lp-band-item{font-size:18px;font-weight:600;color:#98A2B3;letter-spacing:-.01em}

/* sections */
.lp-section{padding:96px 0}
.lp-section-alt{background:var(--bg)}
.lp-section-dark{background:var(--lp-ink);color:#fff}
.lp-kicker{font-size:14px;font-weight:700;color:var(--brandInk);text-transform:uppercase;letter-spacing:.08em;margin-bottom:12px}
.lp-h2{font-size:42px;line-height:1.12;letter-spacing:-.025em;font-weight:700;margin:0 0 18px;max-width:860px}
.lp-h3{font-size:26px;line-height:1.2;letter-spacing:-.015em;font-weight:700;margin:0 0 12px}
.lp-p{font-size:17px;line-height:1.6;color:var(--ink2);margin:0 0 20px}
.lp-source{font-size:12px;color:var(--mute);margin:16px 0 0}

.lp-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:40px;border-top:1px solid var(--line)}
.lp-stat{padding:28px 24px 0 0}
.lp-stat+.lp-stat{padding-left:24px;border-left:1px solid var(--line)}
.lp-stat-n{font-size:52px;font-weight:700;letter-spacing:-.03em;color:var(--brandInk);line-height:1}
.lp-stat-t{font-size:15px;color:var(--ink2);margin-top:10px;line-height:1.45}

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

/* timeline */
.lp-timeline{list-style:none;margin:0;padding:0;border:1px solid var(--line);border-radius:14px;overflow:hidden}
.lp-timeline li{display:flex;align-items:center;gap:18px;padding:18px 20px;background:#fff}
.lp-timeline li+li{border-top:1px solid var(--line)}
.lp-time{font-family:var(--mono);font-size:14px;font-weight:500;color:var(--brandInk);background:var(--brandTint);border-radius:6px;padding:4px 8px}

/* roadmap */
.lp-roadmap{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-top:36px}
.lp-road{background:#fff;border:1px solid var(--line);border-radius:14px;padding:22px;border-top:4px solid var(--line2)}
.lp-road.now{border-top-color:var(--brand)}
.lp-road-phase{font-size:13px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--mute)}
.lp-road.now .lp-road-phase{color:var(--brandInk)}

/* final */
.lp-final{background:linear-gradient(120deg,#C2185B,#E91E63);padding:88px 0}

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
  .lp-steps,.lp-roadmap{grid-template-columns:repeat(2,1fr)}
  .lp-stats{grid-template-columns:repeat(2,1fr)}
  .lp-stat:nth-child(3){border-left:0;padding-left:0}
}
@media (max-width:760px){
  .lp-nav-links{display:none;position:absolute;top:64px;left:0;right:0;flex-direction:column;gap:0;background:var(--lp-ink);border-bottom:1px solid rgba(255,255,255,.1)}
  .lp-nav-links.open{display:flex}
  .lp-nav-links a{padding:14px 16px;border-top:1px solid rgba(255,255,255,.06)}
  .lp-burger{display:block}
  .lp-hide-sm{display:none}
  .lp-wrap{padding:0 16px}
  .lp-hero{padding:48px 0 64px}
  .lp-h1{font-size:38px}
  .lp-lead{font-size:17px}
  .lp-h2{font-size:30px}
  .lp-section{padding:64px 0}
  .lp-steps,.lp-roadmap,.lp-trust{grid-template-columns:1fr}
  .lp-stat-n{font-size:40px}
  .lp-hero-card{--lp-lane:72px;--lp-slot:46px}
  .lp-hero-card .lp-flat,.lp-tick{display:none}
  .lp-stop{min-width:40px;font-size:10px;padding:0 4px}
  .lp-timeline li{flex-wrap:wrap}
}
`;
