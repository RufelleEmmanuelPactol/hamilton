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
| Scoping pack (PPT) | ❌ **Not started**. It now lives inside the website (§9.2). |
| Basic interactive prototype | ✅ `web/`: the website, deployable on Railway from the repo root. See `web/README.md`. |
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
  4. Put the scripted agents behind a single `decide()` / `act()` interface, with the autonomy policy check in code. **No real model calls** (owner's decision, 12 Oct). The §2 model plan is architecture to describe on the case-study pages, not to implement.
  5. No API keys are needed. If real calls are ever added later, read keys from env and never commit them.

## 6. Repo and git state

- Remote: `https://github.com/RufelleEmmanuelPactol/hamilton` (public).
- **Pushed on Mon 12 Oct** from a Claude Code cloud session, after the earlier Cowork push failed with a 403. All content is on branch **`claude/funny-gates-6b2di5`**. The remote was empty before that, so this branch is the only one and probably GitHub's default. Rename it to `main` in the repo settings before sending the link, if you want.
- `design/project/` mirrors the live canvas: the board files are byte-identical, and `canvas.json` was re-synced on 12 Oct.
- No secrets are in the repo (checked before pushing). Keys belong in env only.

## 7. Open work, in priority order

1. **The website: the only thing handed off** (owner's decision, 12 Oct). Build the flat-tire demo per §9.2, along with the case-study pages that cover the brief's other items.
2. **Scoping pack content:** problem → users → top 3 agents → autonomy model → architecture (Decisions API + Claude) → roadmap → risks → metrics. It lives inside the website (§9.2). Whether there's also a downloadable .pptx is still open.
3. **Share the canvas link** (optional; the owner does this from their account).
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

### 9.2 Deliverable plan

**Decided (12 Oct): the only thing handed off is the website.** It's one deployed URL (e.g. on Vercel), so it has to cover every item in the brief on its own:

| Brief item | Where it lives on the website |
|---|---|
| Interactive prototype | The app itself: the demo flow below |
| Product roadmap | A case-study page, from `docs/roadmap.md` |
| Top 3 agentic functions | A case-study page, from `README.md` / `docs/scope.md` |
| Scoping pack "in PPT format" | A slide-style scoping page in the site. _Open question:_ also offer a downloadable .pptx, since the brief names the format. Recommended: yes, as a "Download deck" link. |
| GitHub repo | A link in the site footer or on the case-study page |

Suggested structure: a landing page ("Hamilton: agentic ops for small delivery fleets", with **Open the demo** and **Read the scoping pack**) → the demo app → case-study pages. A walkthrough video embedded on the landing page is optional but recommended.

The canvas shows the design process, but it isn't the prototype. The brief tests **engineering** as well as PM, so a code-free mockup leaves the engineering half unproven.

**How interactive (decided 12 Oct):** one fully scripted story with **no real model calls**. Every agent output (proposals, drafts, triage tags, evidence packs) is canned seed data. It still has to *feel* agentic, so:

- Agent steps show a brief "thinking" state, then the result, labelled with the agent's name (AI output is always labelled, per `RULES.md`).
- Agents stay behind a `decide()` / `act()` interface, so swapping in real models later means replacing one function. Say so on the architecture page.
- The policy check is real code, not part of the script.

Don't build a general-purpose app.

**The demo flow:**

1. **Overview:** a "Play scenario" button moves the clock to 10:31.
2. **Driver app:** Jun reports a flat tire and picks "about 1 hour".
3. **Dispatch agent** (scripted) proposes reassigning 3 stops. A **policy check in code** blocks it ("3 stops is over the 1-stop auto limit") and turns the proposal into ticket HAM-417.
4. **Approvals:** "If you do nothing" vs "If you approve" → Approve. Routes, ETAs and the At-risk count update, and WhatsApp messages are drafted.
5. **Messages:** pick from a few preset incoming customer messages (e.g. "where's my order?", a reschedule, a damage claim). Each one gets its scripted triage tag. A damage claim goes to "Needs you", and the money action is blocked as Never.
6. **Audit log:** every step above appears in it.

**Rules for a safe demo:**

- There are no network or model dependencies, so the demo can't break on a key or an outage. It can be a static or client-only deploy.
- The autonomy policy is enforced **in code, not in the prompt** ("the AI proposes, the policy decides"). This is the main engineering point.
- **Reset to the start: hidden, never shown in the UI** (owner's decision, 12 Oct). Reviewers must never see a "Reset demo" button. Resetting puts everything back to **10:30, before the flat**: seed orders and routes, HAM-417 not yet created, the At-risk count at 0, the inbox and audit log back to their seed entries.
  - **Hidden triggers:** the URL `?reset=1`, which resets and then removes the param from the URL, plus a keyboard shortcut for the presenter (e.g. `Shift+Alt+R`, ignored while typing in an input).
  - The scenario state lives in one store, rebuilt from `seed.ts` on reset, so there are no partial resets.
  - The state is per browser (localStorage). One reviewer's demo never changes another's, and a refresh doesn't lose a reviewer's progress. A first visit starts at the reset state.
  - A `?step=` URL param can jump to a step (e.g. straight to Approvals) for recording the video.

**Other screens:** Orders, Drivers, Address book and Autonomy are read-only pages with sample data, ported from the canvas.

**Timing:** it's due now. If time runs short, cut the demo to steps 1–4 (flat tire → HAM-417 → approve) and keep the case-study pages.

### 9.3 Definitions settled this session

- **At risk** (Overview metric, caption "ETA past window"): not delivered yet **and** the current ETA is later than the end of the customer's delivery window.
  - The ETA comes from the planned route, live driver position and any reported delay.
  - When a delay is a range (e.g. Jun's "about 1 hour" flat), the order counts if even the earliest end of the range misses the window.
  - Not counted: "tight" stops, failed deliveries (they have their own card) and orders not yet dispatched.
  - In the demo: **#1042 Mark Tan** (ETA 13:40, window ends 13:00) and **#1049 Sam Ocampo** (ETA 13:55, window ends 13:00), both on Jun's route. #1050 is also on Jun's route, but still fits its window.

### 9.4 Starting a new conversation

Open a new session on this repo and say "read HANDOFF.md". Canvas link (private to the owner): https://claude.ai/code/artifact/40339063-e6e3-46ea-b06b-3332386432b2. A new session has to re-watch the canvas before canvas comments will wake it.

### 9.5 Website build (12 Oct, later)

- `web/` is a static Next.js 14 app. The canvas boards were converted to React (`web/scripts/convert-boards.mjs`), then wired to one scenario store (`web/src/lib/store.ts`). The phases are before (10:30) → incident (10:42) → approved/rejected (10:44).
- The policy check is real code (`web/src/lib/policy.ts`); agent outputs are scripted. There are no model calls and no API keys.
- Hidden presenter controls: `?reset=1`, `Shift+Alt+R`, `?step=before|incident|approved|rejected`. The landing page's "Start the demo" link uses `?reset=1`.
- Railway: the repo-root `package.json` + `railway.json` build `web/` and serve `web/out` on `$PORT` (Node 22). Checked with Railpack 0.40.1 locally.
- Plan times everyone agrees on: Jun's planned ETAs are #1042 10:50, #1050 11:25, #1049 12:10. The Mark Tan concierge exchange is at 10:11–10:12.
- End-to-end check: `web/scripts/e2e.cjs` (serve `web/out` on :3123 first).

### 9.6 Landing page and interactive Orders (12 Oct, later)

- **Owner feedback:** the old landing page "should be marketing focused like Camunda", and the demo wasn't interactable ("I cannot drag tickets").
- **Landing page** (`web/src/landing/Landing.tsx`, rendered by `web/src/app/page.tsx`) is now a marketing page: dark hero with a live widget (approve HAM-417 and watch Jun's stops move to Ana and Rico), "built for" band, problem stats (from `docs/problem-research.md`, sources cited), tabbed agent showcase, a **policy playground** that calls the real `check()` from `lib/policy.ts` (`check()` now takes an optional edited policy), how it works, demo timeline, roadmap, final CTA and a footer linking the case-study docs. The landing widgets use local state only; they never touch the saved scenario.
- **Orders board** (`web/src/boards/Orders.tsx`) is interactive: drag cards between columns (pointer events: mouse, pen, long-press on touch), placeholder and drop highlight, toast with Undo, avatar menu to move or reassign (keyboard path), Group by Status or Driver (dropping on a driver reassigns), driver filter, a working List view with Status/Driver selects, and **New order** (the Dispatch agent "assigns" Carlo after a short thinking state). Edits live in the scenario store as `board` and are cleared by the hidden reset.
- **Artifacts (owner's, private):**
  - Scoping deck (slides): https://claude.ai/artifact/P8KM2kMQseL9TCK2YB4GSM
  - Website artifact: https://claude.ai/artifact/8vpLer3NpV1zJ3R3ikUD9j
  - The owner has share links with access keys for both. They are deliberately **not** in this public repo.

### 9.7 Branch: work on `main` (12 Oct, later)

- **Owner's decision: all work happens on `main`.** `main` was created from `claude/funny-gates-6b2di5` and holds everything since (landing page, draggable Orders and Dispatch, profile pop-outs, ⌘K search, header bell and account menu, "Coming soon" dialogs for unbuilt controls, hover effects).
- Still to do in GitHub/Railway settings (owner): make `main` the default branch, and point the Railway service at `main`. Until then the live site may still deploy the old branch.
- Unbuilt controls are caught globally in `web/src/components/Overlays.tsx` (any button/link with no React handler opens "Coming soon"). Person names and avatars are matched against `web/src/lib/people.ts` to open profile cards. Add new people there.
