# Hamilton: handoff

This is a handoff for the next working session (Claude Code or a person). Read this file first, then `README.md`.

_Last updated: Mon 12 Oct 2026. See §9 for the session log and the agreed deliverable plan._

---

## 1. What this is

- **Case study:** "AI-First Agentic Logistics App" for **Teoh Capital** (recruiter: Jobail Betinol).
- **Received:** Fri 9 Oct 2026, with a 2–3 day window, so it is **due now** (as of Mon 12 Oct).
- **Likely portfolio fit:** Detrack (SME delivery tracking and proof of delivery). Hamilton is pitched as the agentic layer on top of a tool like that.

**The brief, verbatim (from Jobail's email, Fri 9 Oct 10:29):**

> AI-First Agentic Logistics App
>
> The goal is to assess your Product Management and Engineering capabilities.
>
> Please scope and create a POC of an AI-first, agentic logistics app. We'd like you to:
> - Define the product roadmap.
> - Identify the top 3 agentic functions the app should have.
> - Provide a scoping pack in PPT format.
> - Create a basic prototype, ideally interactive.
> - Include a GitHub repository if applicable.

| Deliverable | Status |
|---|---|
| Product roadmap | ✅ `docs/roadmap.md` |
| Top 3 agentic functions | ✅ `README.md`, `docs/scope.md` |
| Scoping pack (PPT) | ❌ **Not started** |
| Basic interactive prototype | 🟡 The Claude Design canvas is clickable. The coded website is not started (plan in §9.2). |
| GitHub repo | ✅ Pushed on Mon 12 Oct to branch `claude/funny-gates-6b2di5` (see §6) |

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
- **Pushed on Mon 12 Oct** from a Claude Code cloud session, after the earlier Cowork push failed with a 403. All content is on branch **`claude/funny-gates-6b2di5`**. The remote was empty before that, so this branch is the only one and probably GitHub's default. Rename it to `main` in the repo settings before sending the link, if you want.
- `design/project/` mirrors the live canvas: the board files are byte-identical, and `canvas.json` was re-synced on 12 Oct.
- No secrets are in the repo (checked before pushing). Keys belong in env only.

## 7. Open work, in priority order

1. **Scoping pack (PPT).** Problem → users → top 3 agents → autonomy model → architecture (Decisions API + Claude) → roadmap → risks → metrics. Reuse the canvas screenshots. It must be an actual .pptx, because the brief names the format.
2. **Coded website prototype:** the flat-tire flow, per the plan in §9.2.
3. **Share the canvas link** with the recruiter. The owner has to do this from their account.
4. **Submission email:** links to the deck, the website, the repo and the walkthrough video.
5. **Canvas polish backlog:**
   - Orders kanban cards don't use HAM IDs yet.
   - The Overview map and tracker numbers don't exactly match the Dispatch table (sample data drift).
   - Dark mode isn't designed.
   - The Tomorrow · Draft tab has no content yet.
   - _Offered, not yet approved:_ put the "at risk" definition (§9.3) behind a (?) on the Overview "At risk" card, and maybe add a "tight" threshold (under 15 min to spare).
6. **Open comment threads on the canvas:**
   - `4395f51b` ("looks bad and fake") is waiting for the owner's reference screenshot.
   - `b7276fb0` is still open.
   - `ac427828` ("what constitutes as at risk") was answered on 12 Oct and left open because it ends with the offer above.

## 8. Where things are

```
README.md            product overview, agents, architecture sketch
HANDOFF.md           this file
docs/                problem-research.md · scope.md · roadmap.md
design/              README.md + project/ (Claude Design canvas source)
design-system/       Pink Console tokens, rules, component reference
prototype-legacy/    early Next.js prototype (reference only)
```

## 9. Session log and memory (Mon 12 Oct 2026)

### 9.1 What happened this session

- The repo zip was imported and pushed (see §6).
- The Claude Code session can read and edit the canvas because it's under the owner's account. Comments the owner sends to Claude from the canvas wake the session. Claude makes the change, replies in the thread, and resolves it.
- The canvas has 48 comment threads so far, nearly all resolved. Past feedback themes, which are already in `design-system/RULES.md`:
  - copy too dense
  - duplicate controls
  - abstract KPI and timeline visuals instead of a plain before/after table
  - pills used as explanations instead of a (?) popover
  - be realistic about uncertainty (e.g. tire-repair time shown as a range from the driver's estimate plus history)
- Answered: "how do we handle damage claims?" The answer is the flow in §4: detect → one holding reply (no refund promise) → evidence pack → HAM-416 blocked by the Never policy → a person picks the outcome.

### 9.2 Agreed deliverable plan (recommended to the owner, not yet confirmed)

Send four things, with the website as the centerpiece:

1. **The PPT scoping pack.** The brief names the format, so it has to be a real .pptx.
2. **A deployed website** (e.g. on Vercel) that runs the prototype, linked from the deck and the README.
3. **The GitHub repo:** code, a README with the architecture and run steps, plus the existing docs.
4. **A 2–3 minute walkthrough video**, because reviewers often won't click through the site.

The canvas shows the design process, but it isn't the prototype. The brief tests **engineering** as well as PM, so a code-free mockup leaves the engineering half unproven.

**How interactive:** one scripted story, with real model calls at two or three agent steps. Don't build a general-purpose app.

| Level | Verdict |
|---|---|
| Clickable mockup (the canvas) | Already have it. It shows nothing about engineering. |
| Scripted, all canned AI | Weak, because "agentic" is the point. |
| **Scripted plus real agents at decision points** | **Recommended.** |
| Full app (auth, real maps, general routing) | Too big for the time left. |

**The demo flow:**

1. **Overview:** a "Play scenario" button moves the clock to 10:31.
2. **Driver app:** Jun reports a flat tire and picks "about 1 hour".
3. **Dispatch agent:** Claude, in a tool-use loop, proposes reassigning 3 stops. A **server-side policy check** blocks it ("3 stops is over the 1-stop auto limit") and turns the proposal into ticket HAM-417.
4. **Approvals:** "If you do nothing" vs "If you approve" → Approve. Routes, ETAs and the At-risk count update, and WhatsApp messages are drafted.
5. **Messages:** type any customer message, and triage (Decisions API) tags it live. A damage claim goes to "Needs you", and the money action is blocked as Never.
6. **Audit log:** every step above appears in it.

**Rules for a safe demo:**

- Every live model call falls back to a **cached response**, so the demo works without keys or if a call fails.
- The autonomy policy is enforced **in code, not in the prompt** ("the AI proposes, the policy decides"). This is the main engineering point.
- Keys stay server-side in env vars.

**Other screens:** Orders, Drivers, Address book and Autonomy are read-only pages with sample data, ported from the canvas.

**Timing:**

- Option A: send the deck, the repo and the canvas link today, with a note that the live prototype follows within about a day.
- Option B: if everything has to go at once, cut the site to steps 1–4.

The owner hasn't chosen yet, and also hasn't chosen whether the deck or the website comes first.

### 9.3 Definitions settled this session

- **At risk** (Overview metric, caption "ETA past window"): not delivered yet **and** the current ETA is later than the end of the customer's delivery window.
  - The ETA comes from the planned route, live driver position and any reported delay.
  - When a delay is a range (e.g. Jun's "about 1 hour" flat), the order counts if even the earliest end of the range misses the window.
  - Not counted: "tight" stops, failed deliveries (they have their own card) and orders not yet dispatched.
  - In the demo: **#1042 Mark Tan** (ETA 13:40, window ends 13:00) and **#1049 Sam Ocampo** (ETA 13:55, window ends 13:00), both on Jun's route. #1050 is also on Jun's route, but still fits its window.

### 9.4 Starting a new conversation

Open a new session on this repo and say "read HANDOFF.md". Canvas link (private to the owner): https://claude.ai/code/artifact/40339063-e6e3-46ea-b06b-3332386432b2. A new session has to re-watch the canvas before canvas comments will wake it.
