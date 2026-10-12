import Link from "next/link";
import { Logo } from "@/components/Shell";

const REPO = "https://github.com/RufelleEmmanuelPactol/hamilton";

const card: React.CSSProperties = {
  background: "var(--panel)",
  border: "1px solid var(--line)",
  borderRadius: "8px",
  padding: "18px 20px",
};
const overline: React.CSSProperties = {
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.04em",
  textTransform: "uppercase",
  color: "var(--mute)",
};
const h2: React.CSSProperties = { fontSize: "20px", fontWeight: 600, margin: "0 0 4px" };
const sub: React.CSSProperties = { color: "var(--mute)", margin: "0 0 18px", fontSize: "14px" };

const steps = [
  {
    n: "1",
    title: "Look at the calm morning",
    body: "It is 10:30. Four drivers are out and every delivery is on time.",
    href: "/app",
    link: "Overview",
  },
  {
    n: "2",
    title: "Be Jun: report a flat tire",
    body: "In the driver app, tap Report, pick Flat tire and say how long it will take.",
    href: "/driver/report",
    link: "Driver app",
  },
  {
    n: "3",
    title: "Watch the Dispatch agent re-plan",
    body: "2 deliveries would be late. The agent proposes moving 3 stops; the policy holds it for Maria as HAM-417.",
    href: "/app/approvals",
    link: "Approvals",
  },
  {
    n: "4",
    title: "Approve, and see what changed",
    body: "Routes, arrival times and the at-risk count update. Customers get new times. Every step is in the audit log.",
    href: "/app/audit",
    link: "Audit log",
  },
];

const agents = [
  {
    name: "Dispatch & re-planning",
    body: "Builds the morning plan from drivers, vehicles, history and the address book. Re-plans live when something breaks: reassigns stops, re-sequences routes, updates arrival times.",
    demo: "Jun’s flat tire → HAM-417",
  },
  {
    name: "Delivery assurance",
    body: "Prevents failed trips. Confirms with risky recipients before the driver leaves, understands replies like “not home until 3pm”, reschedules, and answers “where’s my order?” from that order’s data only.",
    demo: "Customer messages",
  },
  {
    name: "Proof & disputes",
    body: "Checks every proof-of-delivery photo while the driver is still at the door, and builds an evidence pack when a customer disputes a delivery. A person always decides on money.",
    demo: "Paolo’s damage claim → HAM-416",
  },
];

const roadmap = [
  {
    phase: "Now",
    title: "Proof of concept",
    body: "This prototype: admin console, driver app and customer view on one scripted day. Policy engine in code.",
  },
  {
    phase: "0–3 months",
    title: "Design-partner pilot",
    body: "3–5 fleets in one city. Shopify, WhatsApp and tracking-tool integrations. Agents start in “Ask me”.",
  },
  {
    phase: "3–6 months",
    title: "Earned autonomy",
    body: "Approval rates per action suggest moving rules from “Ask me” to “Auto”. Driver voice notes, owner chat on WhatsApp.",
  },
  {
    phase: "6–12 months",
    title: "Platform",
    body: "Weather and traffic in tomorrow’s plan, multi-depot fleets, and an MCP server so owners’ own assistants can act within the same rules.",
  },
];

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
      <style>{`
        .lp-wrap{max-width:1080px;margin:0 auto;padding:0 24px}
        .lp-grid4{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
        .lp-grid3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}
        .lp-flow{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px;align-items:stretch}
        .lp-btn{display:inline-flex;align-items:center;height:40px;padding:0 16px;border-radius:6px;font-weight:600;text-decoration:none;white-space:nowrap}
        .lp-btn.primary{background:var(--brandInk);color:#fff}.lp-btn.primary:hover{background:#AD1457;color:#fff}
        .lp-btn.secondary{background:var(--panel);color:var(--ink2);border:1px solid var(--line2)}.lp-btn.secondary:hover{color:var(--ink)}
        @media (max-width:900px){.lp-grid4,.lp-flow{grid-template-columns:repeat(2,minmax(0,1fr))}.lp-grid3{grid-template-columns:1fr}}
        @media (max-width:560px){.lp-wrap{padding:0 16px}.lp-grid4,.lp-flow{grid-template-columns:1fr}.lp-hero h1{font-size:28px!important}}
      `}</style>

      <header style={{ background: "var(--panel)", borderBottom: "1px solid var(--line)" }}>
        <div className="lp-wrap" style={{ height: "52px", display: "flex", alignItems: "center", gap: "10px" }}>
          <Logo />
          <span style={{ fontSize: "15px", fontWeight: 700, letterSpacing: "-0.01em" }}>Hamilton</span>
          <span style={{ flex: 1 }} />
          <a href={REPO} style={{ color: "var(--ink2)", textDecoration: "none" }}>
            GitHub
          </a>
        </div>
      </header>

      <main>
        <section className="lp-wrap lp-hero" style={{ padding: "56px 24px 40px" }}>
          <div style={{ ...overline, color: "var(--brandInk)" }}>Case study · AI-first agentic logistics</div>
          <h1
            style={{
              fontSize: "36px",
              lineHeight: 1.15,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              margin: "10px 0 12px",
              maxWidth: "760px",
            }}
          >
            The operations layer for small delivery fleets that keeps the day on track, and asks the owner only when it matters.
          </h1>
          <p style={{ fontSize: "16px", color: "var(--ink2)", maxWidth: "680px", margin: "0 0 24px", lineHeight: 1.5 }}>
            Florists, distributors and small couriers with 2–50 drivers spend their day firefighting: rebuilding routes by memory, answering
            “where’s my order?”, and arguing about deliveries. Hamilton’s agents handle the routine work on their own. Anything that needs a
            person becomes a ticket.
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <a className="lp-btn primary" href="/app/?reset=1">
              Start the demo
            </a>
            <a className="lp-btn secondary" href="#how-it-works">
              How it works
            </a>
          </div>
          <p style={{ color: "var(--mute)", fontSize: "12px", margin: "14px 0 0" }}>
            Demo company: Maria’s Flowers &amp; Gifts, Metro Manila · Monday 12 October · 4 drivers, 13 orders
          </p>
        </section>

        <section className="lp-wrap" style={{ paddingBottom: "48px" }}>
          <h2 style={h2}>Try it in two minutes</h2>
          <p style={sub}>One scripted day. Start at the overview, then follow the flat tire.</p>
          <ol className="lp-grid4" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {steps.map((s) => (
              <li key={s.n} style={{ ...card, display: "flex", flexDirection: "column", gap: "8px" }}>
                <span
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "99px",
                    background: "var(--brandTint)",
                    color: "var(--brandInk)",
                    fontWeight: 600,
                    fontSize: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {s.n}
                </span>
                <div style={{ fontWeight: 600, fontSize: "14px" }}>{s.title}</div>
                <div style={{ color: "var(--ink2)", lineHeight: 1.5, flex: 1 }}>{s.body}</div>
                <Link href={s.href} style={{ fontWeight: 600, textDecoration: "none" }}>
                  {s.link} →
                </Link>
              </li>
            ))}
          </ol>
        </section>

        <section className="lp-wrap" style={{ paddingBottom: "48px" }}>
          <h2 style={h2}>The top 3 agents</h2>
          <p style={sub}>Each one does the legwork. None of them can spend money or overrule the owner.</p>
          <div className="lp-grid3">
            {agents.map((a, i) => (
              <div key={a.name} style={{ ...card, display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={overline}>Agent {i + 1}</div>
                <div style={{ fontWeight: 600, fontSize: "15px" }}>{a.name}</div>
                <div style={{ color: "var(--ink2)", lineHeight: 1.55, flex: 1 }}>{a.body}</div>
                <div style={{ fontSize: "12px", color: "var(--mute)" }}>
                  In the demo: <span style={{ color: "var(--ink2)" }}>{a.demo}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="how-it-works" className="lp-wrap" style={{ paddingBottom: "48px" }}>
          <h2 style={h2}>How it works: agents propose, policies decide</h2>
          <p style={sub}>
            No agent acts directly. Every proposed action goes through the owner’s autonomy policies and is logged with its reasoning.
          </p>
          <div className="lp-flow">
            {[
              { t: "Events", b: "Driver reports, GPS, orders from Shopify and WhatsApp, customer replies, proof photos." },
              { t: "Triage", b: "Cheap, always-on checks: what is this message about, does it need a person, is this photo usable." },
              { t: "Agents", b: "A reasoning model with tools plans, re-plans, drafts replies and builds evidence packs." },
              { t: "Autonomy policies", b: "Auto → runs and is logged. Ask me → becomes a HAM ticket. Never → blocked; a person decides." },
            ].map((x, i) => (
              <div
                key={x.t}
                style={{
                  ...card,
                  background: i === 3 ? "var(--aiBg)" : "var(--panel)",
                  borderColor: i === 3 ? "var(--aiLine)" : "var(--line)",
                }}
              >
                <div style={{ fontFamily: "var(--mono)", fontSize: "11px", color: "var(--mute)" }}>{i + 1} →</div>
                <div style={{ fontWeight: 600, margin: "4px 0 6px" }}>{x.t}</div>
                <div style={{ color: "var(--ink2)", lineHeight: 1.5 }}>{x.b}</div>
              </div>
            ))}
          </div>
          <div style={{ ...card, marginTop: "14px", display: "flex", gap: "24px", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ fontWeight: 600, marginBottom: "6px" }}>Example from the demo</div>
              <div style={{ color: "var(--ink2)", lineHeight: 1.55 }}>
                The Dispatch agent proposes moving 3 of Jun’s stops. The policy for reassigning stops is “Ask me, auto if 1 stop or fewer”,
                so it is held and opened as HAM-417. Refunds are “Never”: Paolo’s damage claim gets an evidence pack, and Maria decides.
              </div>
            </div>
            <div style={{ flex: "1 1 300px" }}>
              <div style={{ fontWeight: 600, marginBottom: "6px" }}>What is real in this prototype</div>
              <div style={{ color: "var(--ink2)", lineHeight: 1.55 }}>
                The screens, the scenario state and the policy check are real code. Agent outputs are scripted, so the demo runs without API
                keys. The planned models are Claude for reasoning and a low-cost classifier tier for triage.
              </div>
            </div>
          </div>
        </section>

        <section className="lp-wrap" style={{ paddingBottom: "56px" }}>
          <h2 style={h2}>Roadmap</h2>
          <p style={sub}>
            Autonomy is earned, not switched on. Each phase widens what agents may do alone, based on measured approval rates.
          </p>
          <div className="lp-grid4">
            {roadmap.map((r) => (
              <div key={r.title} style={card}>
                <div style={overline}>{r.phase}</div>
                <div style={{ fontWeight: 600, fontSize: "14px", margin: "6px 0" }}>{r.title}</div>
                <div style={{ color: "var(--ink2)", lineHeight: 1.5 }}>{r.body}</div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer style={{ borderTop: "1px solid var(--line)", background: "var(--panel)" }}>
        <div
          className="lp-wrap"
          style={{ padding: "18px 24px", color: "var(--mute)", fontSize: "12px", display: "flex", gap: "16px", flexWrap: "wrap" }}
        >
          <span>Hamilton · a product and engineering case study by Rufelle Emmanuel Pactol</span>
          <span style={{ flex: 1 }} />
          <a href={REPO}>Source on GitHub</a>
          <span>Business names, people and orders are fictional.</span>
        </div>
      </footer>
    </div>
  );
}
