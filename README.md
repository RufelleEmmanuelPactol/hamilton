# Hamilton

**An AI-first, agentic operations layer for small and mid-size delivery fleets.**

> A *Hamiltonian path* visits every node in a graph exactly once — which is exactly what a good delivery route does. Hamilton finds the path, keeps it on track when the day goes sideways, and only asks the owner when it matters.

---

## The problem

The businesses that run their own delivery fleets — florists, food distributors, electrical suppliers, small couriers and 3PLs with 2–50 drivers — **didn't sign up to run a logistics operation, but they spend their day firefighting one, and get blamed when it fails.**

Tracking and electronic proof-of-delivery tools moved them from paper to digital. But the owner is still the human glue:

- **Planning by memory** — who goes where, rebuilt every morning in a spreadsheet.
- **The phone never stops** — customers asking "where's my order?", calls to drivers who are driving.
- **Failed deliveries** — ~8% fail on the first attempt, at roughly **$17 each**, mostly because nobody was home.
- **Disputes** — "you never delivered". 94% of consumers blame the seller, not the courier.
- **Software records what happened; it doesn't act in the moment.**

Full research and sources: [`docs/problem-research.md`](docs/problem-research.md).

## The product

Two interfaces, three agents, one shared memory, one rulebook.

| Interface | Who | What |
|---|---|---|
| **Admin console** (web) | Owner / dispatcher | Today dashboard, plan approval, "Needs you" inbox, ops chat, orders inbox, driver profiles, address book, autonomy rules, agent activity log |
| **Driver app** (mobile web) | Drivers | Next stop with remembered instructions, one-tap quick reports (flat tire, lunch, running late, not home, wrong address), proof-of-delivery capture with an instant photo check |

Customers never install anything: they get WhatsApp/SMS notifications and can reply in plain language.

### The top 3 agentic functions

1. **Dispatch & Re-planning Agent** — drafts the morning plan from driver familiarity, vehicle, history and the address book; re-plans live when a driver reports a problem (reassigns stops, re-sequences routes, updates ETAs).
2. **Delivery Assurance Agent** — prevents failed deliveries: confirms with high-risk recipients before arrival, understands replies ("not home until 3pm", "leave it with the guard"), reschedules, and answers customer questions from scoped order data.
3. **Proof & Dispute Agent** — checks every proof-of-delivery photo on the spot (blurry? package visible? right door?), asks for a retake while the driver is still there, and assembles an evidence pack when a customer disputes a delivery.

Underneath:

- **Memory** — driver profiles (automated, time-weighted context + AI notes + owner notes), a delivery address book (gate codes, preferred times, who can receive), and an override log so rejections teach the agents.
- **Autonomy rules** — every agent action is *Auto*, *Ask me*, or *Never*, with thresholds (e.g. "auto-reassign if ≤ 1 stop"). Money actions are never automated.

Details: [`docs/scope.md`](docs/scope.md) · Roadmap: [`docs/roadmap.md`](docs/roadmap.md)

## Design

The UI is designed in **Claude Design** as a clickable canvas — 9 admin screens and 4 phone screens (driver app + the customer's WhatsApp view).

- Canvas source files: [`design/project/`](design/project/) (`.dc.html` artboards + `canvas.json`)
- How the screens map to the product: [`design/README.md`](design/README.md)
- Design system (Pink Console: tokens, CSS, Tailwind preset, rules, component reference): [`design-system/`](design-system/)
- Handoff for the next build phase: [`HANDOFF.md`](HANDOFF.md)

## Architecture (target)

```
 Shopify / WooCommerce / WhatsApp / email ─┐
                                           ▼
                           ┌────────────────────────────┐
 Driver app (quick reports,│  Triage layer (cheap)      │  OpenAI Decisions API:
 POD photos, GPS) ───────▶ │  classify · score · check  │  predicates / choice / score
                           └─────────────┬──────────────┘  at ~$0.10 per 1M input tokens
                                         ▼
                           ┌────────────────────────────┐
                           │  Reasoning agents (Claude) │  tool-use loop:
                           │  Dispatch · Assurance ·    │  plan, re-plan, message,
                           │  Proof · Ops chat          │  reschedule, save memory
                           └─────────────┬──────────────┘
                                         ▼
                           ┌────────────────────────────┐
                           │  Autonomy engine           │  Auto → execute + log
                           │  (owner's rules)           │  Ask  → "Needs you"
                           └─────────────┬──────────────┘  Never → block + escalate
                                         ▼
               Routes · customer messages · memory · activity log
```

Design choices:

- **Tiered inference.** Cheap, always-on classification (message intent, photo checks, order confidence) runs on every event; the expensive reasoning model is called only when something needs deciding. A typical inbound message is ~1,000 tokens, so triaging 10,000 a day costs about $1.
- **Agents propose, rules decide.** No agent executes directly; every action passes through the autonomy engine and is logged with its reasoning.
- **Grounded answers only.** Customer-facing replies are generated from that order's data alone and never guess a status.
- **Provider-agnostic.** The triage and reasoning layers sit behind interfaces so models can be swapped.

## Status

| Piece | Status |
|---|---|
| Problem research & scoping | ✅ |
| UI design (Claude Design canvas, 13 screens) | ✅ |
| Interactive prototype (Next.js + TypeScript, simulated Metro Manila fleet) | 🟡 in progress |
| Agent wiring (Claude + OpenAI Decisions API) | ⏳ next |
| Scoping pack (PPT) | ⏳ next |

---

*Built as a product & engineering case study. Business names, people and orders in the designs are fictional.*
