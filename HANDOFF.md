# Hamilton: handoff

This is a handoff for the next working session (Claude Code or a person). Read this file first, then `README.md`.

---

## 1. What this is

- **Case study:** "AI-First Agentic Logistics App" for **Teoh Capital** (recruiter: Jobail Betinol).
- **Received:** Fri 9 Oct 2026, with a 2–3 day window, so it is **due now**.
- **Likely portfolio fit:** Detrack (SME delivery tracking and proof of delivery). Hamilton is pitched as the agentic layer on top of a tool like that.

| Deliverable | Status |
|---|---|
| Product roadmap | ✅ `docs/roadmap.md` |
| Top 3 agentic functions | ✅ `README.md`, `docs/scope.md` |
| Scoping pack (PPT) | ❌ **Not started** |
| Basic interactive prototype | 🟡 The Claude Design canvas is clickable. The coded prototype is stale (see §5). |
| GitHub repo | 🟡 Exists, but the latest commits are **not pushed** (see §6) |

## 2. Product in one paragraph

Hamilton is an AI operations layer for small delivery fleets (2–50 drivers: florists, distributors, small couriers). It runs as a **ticket system**: anything that needs a human becomes a ticket (`HAM-###`) in Approvals, and everything else runs on its own under **autonomy policies**. It has two interfaces: an **admin console** (web) and a **driver app** (mobile web). Customers only see WhatsApp/SMS. Demo company: *Maria's Flowers & Gifts*, Metro Manila, with drivers **Jun** (van, gets a flat tire), **Carlo**, **Ana** and **Rico** (new driver).

**Top 3 agents**

1. **Dispatch & re-planning:** builds the morning plan, holds a same-day slot, and re-plans live when something breaks.
2. **Delivery assurance / messages:** reads customer replies, reschedules, and answers "where's my order?".
3. **Proof & disputes:** checks proof-of-delivery photos on the spot and builds evidence packs for damage or refund claims.

**Model plan** (agreed, not yet implemented):

- **Triage tier:** OpenAI Decisions API (predicate / choice / score; about $0.10 per 1M input tokens) for message topic tagging, the "needs a human?" check, photo checks and semantic trigger conditions.
- **Reasoning tier:** Claude in a tool-use loop for planning, re-planning, drafting replies and evidence packs.

## 3. Design (the source of truth right now)

**Claude Design canvas (private):** https://claude.ai/code/artifact/40339063-e6e3-46ea-b06b-3332386432b2. The owner must share it before anyone else can open it. A copy of its files is in `design/project/`.

| Board | File | Key ideas |
|---|---|---|
| Overview | `Main.dc.html` | Metrics strip (Delivered / On-time / At risk / Failed) · **Live progress tracker** (one lane per driver, "Now" line, proposed stops dashed pink) · map + Open tickets · **Copilot chat** rail (draft fix → approve, interactive in Play mode) |
| Dispatch | `Plan.dc.html` | Tabs: **Today · Live** / Tomorrow · Draft · per-stop **Status** (Delivered / Next / Upcoming / Moving to Ana · HAM-417) · driver progress bars · route map with per-driver toggles · open same-day slot row · "Instructions for driver" in plain sentences |
| Approvals | `Approvals.dc.html` | HAM-417 "Reassign 3 stops from Jun" · **If you do nothing / If you approve** toggle with a plain table · repair-time uncertainty shown as ranges with sources |
| Orders | `Orders.dc.html` | Linear-style kanban (Needs review / Scheduled / Out for delivery / Delivered / Exceptions) |
| Customer messages | `Messages.dc.html` | Inbox rows (name · latest message · topic · who handled) · filter All / Needs you (1) / Assistant / Automatic |
| Drivers | `Drivers.dc.html` | Profile, "97% success (30d)" style labels, area familiarity |
| Address book | `AddressBook.dc.html` | CRM record · **AI-generated delivery guidance** panel with sources + Edit |
| Autonomy policies | `Autonomy.dc.html` | **Standard policies** (built in) vs **Your triggers** (plain text) · modes Auto / Auto if… / Ask me / Never · (?) help popover · filter All / Standard / Yours · each trigger shows its Static / Semantic mapping |
| Audit log | `Activity.dc.html` | Event table (time, event, agent, outcome, policy, ref) with expandable input → decision → side effects, plus Undo / Mark as wrong |
| Driver app ×3 | `DriverRoute`, `DriverPOD`, `DriverIncident` | 390×844; the incident report asks "About how long will it take?" |
| Customer view | `CustomerThread.dc.html` | Branded WhatsApp-style delivery cards |

**Canvas format notes** (for anyone editing the canvas):

- Boards are `.dc.html` files with `<x-dc>`, `<helmet>` and a `class Component extends DCLogic { renderVals() }` script. Interactivity uses top-level booleans with `<sc-if value="{{x}}" hint-placeholder-val="{{ true|false }}">`.
- **Don't use `sc-for` or per-item holes.** They render as raw `{{…}}` in canvas view.
- `canvas.json` holds board positions. If you make a board taller, shift the boards below it.

**Design system:** `design-system/` (Pink Console). It holds the tokens (JSON, CSS, Tailwind preset), `RULES.md`, and `components.html` (open it in a browser). The owner wants to reuse it across projects. **Read `design-system/RULES.md` before designing anything.** It captures this owner's review feedback: plain sentences, no jargon, one concept in one place, explanations behind (?), before/after for every decision, AI output always labelled, and no stacked pills.

The old Tangerine V2 tokens were removed from the repo. The owner's original Tangerine system is private; never publish its internals (endpoints, internal paths, telemetry, app code).

## 4. Decisions already made (don't relitigate)

- The domain is SME last-mile delivery, not freight or enterprise.
- The full feature set is in the MVP, and trust is company-first (the owner approves, the customer doesn't need to know it's AI).
- There is no driver copilot. Drivers get a one-tap reporting interface only.
- The UI is designed in **Claude Design first**. Code comes after. The owner pushed back when code started early.
- The style is enterprise (Linear / HubSpot / Pendo pink), not "AI-looking".
- Money actions (refunds, credits) are always **Never**. Damage claims follow: detect → holding reply → evidence pack → HAM ticket → a person decides.
- Customer triggers are plain text. Agents map each clause to a **static** check (exact data) or a **semantic** check (Decisions API).

## 5. Code

- **`prototype-legacy/`:** an early Next.js 14 prototype (Tailwind, Zustand-style store, seed data, stub agents in `src/lib/agents.ts`). It was **never built or run**, and it uses the old Tangerine styling. Treat it as reference for types and seed data, not as a base to extend. `npm install` is needed. There are no secrets in it.
- **Suggested path for the real prototype:**
  1. Scaffold fresh (Next.js + `design-system/tailwind.preset.js`).
  2. Port the canvas boards screen by screen, starting with Overview → Approvals → Dispatch.
  3. Use one seed scenario: the 10:31 flat tire → HAM-417 → approve → routes update.
  4. Wire the agents (§2 model plan) behind a single `decide()` / `act()` interface, enforcing autonomy policies server-side.
  5. Read keys from env (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`). Never commit them.

## 6. Repo and git state

- Remote: `https://github.com/RufelleEmmanuelPactol/hamilton` (public).
- **Pushing from the Cowork session failed** (403: the repo isn't in that session's authorized sources). The local commits include the design-system replacement, the canvas sync and this handoff. Push from a machine with access, or download the zip and commit it.

## 7. Open work, in priority order

1. **Scoping pack (PPT).** Problem → users → top 3 agents → autonomy model → architecture (Decisions API + Claude) → roadmap → risks → metrics. Reuse the canvas screenshots.
2. **Push the repo** and share the canvas link with the recruiter.
3. **Coded prototype** of the flat-tire flow (§5), with real model calls if time allows.
4. **Canvas polish backlog:**
   - Orders kanban cards don't use HAM IDs yet.
   - The Overview map and tracker numbers don't exactly match the Dispatch table (sample data drift).
   - Dark mode isn't designed.
   - The Tomorrow · Draft tab has no content yet.
5. **Open comment threads on the canvas:** `4395f51b` ("looks bad and fake") is waiting for the owner's reference screenshot, and `b7276fb0` is still open.

## 8. Where things are

```
README.md            product overview, agents, architecture sketch
HANDOFF.md           this file
docs/                problem-research.md · scope.md · roadmap.md
design/              README.md + project/ (Claude Design canvas source)
design-system/       Pink Console tokens, rules, component reference
prototype-legacy/    early Next.js prototype (reference only)
```
