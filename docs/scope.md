# Scope

## Product statement

**Hamilton is the AI operations layer that runs an SME fleet's day — plans it, protects every delivery promise, proves every drop — and asks the owner only when it matters.**

It sits on top of existing order sources and tracking/ePOD plumbing (Shopify, WooCommerce, WhatsApp, email, driver GPS) rather than replacing them.

## Users

| User | Role | Interface |
|---|---|---|
| Owner / dispatcher ("Maria") | Buyer & primary user | Admin console (web), ops chat (web + WhatsApp) |
| Driver | Field user | Driver app (mobile web) |
| Recipient | Indirect | WhatsApp/SMS messages + tracking link — no app |

## The three agents

### 1. Dispatch & Re-planning Agent
- **Morning plan:** assigns orders using area familiarity, vehicle fit (large florals → van), time-weighted success rate, load, and cold-start rules for new drivers; sequences stops to protect tight windows. Owner approves once.
- **Intake:** turns WhatsApp/email orders into structured jobs with a confidence score and flags (ambiguous building, unpaid, same address as another order today).
- **Live re-planning:** reacts to driver reports — flat tire / vehicle issue → reassign remaining stops; lunch / running late → re-sequence and recompute ETAs; wrong address → put on hold and move on.

### 2. Delivery Assurance Agent
- **Pre-arrival confirmation** for risky addresses (past failures, rarely answers phone).
- **Two-way customer replies:** "not home until 3pm" → reschedule + re-sequence + remember; "leave it with the guard" → customer-confirmed safe drop; "tomorrow" → next-day move (approval); "where's my order?" → scoped answer from that order only.
- **Not-home handling:** uses the address book (e.g. "leave with concierge — 14 past drops, 0 issues") before failing a delivery.
- Presented to customers as the business's own *Delivery Assistant* — never claims to be human.

### 3. Proof & Dispute Agent
- **On-site photo check:** blurry, package not visible, wrong door type → retake request while the driver is still there.
- **Dispute pack:** photo, timestamps, GPS match, who received it, notification trail — ready to send.

## Memory

- **Driver profile** — automated context (time-weighted success & on-time rates, deliveries, avg stop time, area familiarity), today's reports, **AI notes** with cited evidence, **owner notes** (case-management style).
- **Address book** — a delivery CRM, not a sales CRM: leave-with, gate/access, best time, instructions, delivery/failure history, phone responsiveness, notes learned from replies.
- **Override log** — every rejected suggestion is recorded and weighed next time.

## Autonomy rules (defaults)

| Group | Action | Default |
|---|---|---|
| Customers | Send delivery notifications | Auto |
| Customers | Reschedule within today | Auto |
| Customers | Move delivery to another day | Ask me |
| Customers | Leave with guard / concierge / neighbour | Ask me (auto if customer confirmed in writing) |
| Dispatch | Re-sequence a driver's stops | Auto |
| Dispatch | Reassign stops between drivers | Ask me (auto if ≤ 1 stop) |
| Dispatch | Publish the daily plan | Ask me |
| Dispatch | Create orders from WhatsApp/email | Ask me (auto if confidence ≥ 95%) |
| Proof | Ask driver to retake proof photo | Auto |
| Memory | Save notes to address book & driver profiles | Auto |
| Money | Refunds, credits, discounts | **Never** |

## MVP inventory

**Admin console:** Today (KPIs, live map, needs-you, activity, drivers) · Plan & routes · Needs you · Orders inbox · Customer messages (+ dispute pack) · Driver profiles · Address book · Autonomy rules · Agent activity · Ask Hamilton chat.

**Driver app:** next stop with "Hamilton remembers" instructions · start/arrive/complete flow · POD capture with instant check · can't-deliver reasons · quick-report dock · up-next list.

**Plumbing (table stakes, not differentiators):** order sync, notifications, tracking link, maps.

## Out of scope for the MVP

Pricing & quoting, invoicing/billing, warehouse & inventory, line-haul/freight, customs, multi-depot optimisation, native mobile apps, payments, a full sales CRM.

## Success metrics

- First-attempt delivery success rate (target: failed deliveries ↓ 50%)
- Owner time on dispatch & customer calls per day
- "Where's my order?" inbound volume handled without the owner
- On-time rate vs. promised window
- Agent action acceptance rate (approvals vs. rejections) — trust signal for raising autonomy
- Cost of AI per delivery vs. cost of one failed trip

## Key risks

| Risk | Mitigation |
|---|---|
| Agent makes a wrong call at scale | Autonomy rules, thresholds, activity log, override learning |
| Hallucinated status to a customer | Replies grounded in order data only; "let me check" over guessing |
| Drivers feel surveilled → bad data | Owner-first, but a clear data notice to drivers; profiles used for planning, not discipline |
| AI disclosure rules (e.g. EU AI Act transparency, applying from Aug 2026) | Branded assistant that never claims to be human |
| Inference cost on thin margins | Tiered models; cheap triage on every event, reasoning only on decisions |
