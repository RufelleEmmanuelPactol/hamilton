# Roadmap

Autonomy is earned, not switched on. Each phase widens what agents may do alone, based on measured approval rates.

## Phase 0 — Proof of concept (now)

- Claude Design canvas: admin console + driver app + customer view
- Interactive prototype with a simulated Metro Manila fleet (4 drivers, 13 orders)
- 3 agents behind the autonomy engine; scenario triggers (flat tire, lunch, late, customer replies, refund request)
- Agents wired to Claude (reasoning) and the OpenAI Decisions API (triage, photo checks)

**Exit criteria:** every agent flow demoable end-to-end with real model calls; scoping pack delivered.

## Phase 1 — Design-partner pilot (0–3 months)

- 3–5 SME fleets (florists, F&B distributors, small couriers) in one city
- Integrations: Shopify/WooCommerce, WhatsApp Business, existing tracking/ePOD platform via API/webhooks
- Agents start mostly in **Ask me**; owner approves plans and reassignments
- Baselines: first-attempt success, owner hours on dispatch, inbound "where's my order?" volume

**Exit criteria:** ≥ 80% of agent suggestions approved without edits; failed deliveries measurably down.

## Phase 2 — Earned autonomy (3–6 months)

- Per-action trust scores; suggest moving rules from *Ask me* → *Auto* where approval rates are high
- Ops chat on WhatsApp for owners; voice notes from drivers
- Address book learning across repeat customers; cold-start defaults for new drivers
- Proof checks move fully to the cheap triage tier; dispute packs exportable

**Exit criteria:** owner time on dispatch down ≥ 50%; AI cost per delivery well under the cost of one failed trip.

## Phase 3 — Platform (6–12 months)

- Predictive risk: weather/typhoon and traffic signals feed tomorrow's plan
- Multi-depot, mixed fleets, contractor drivers
- Public MCP server so owners' own assistants can query *and act* (within the same autonomy rules)
- Cross-sell into adjacent SME software (accounting, POS) via integrations
- Benchmarks across the customer base (opt-in) to improve planning defaults

## Not on the roadmap (deliberately)

Freight brokerage, customs, warehouse management — crowded, and far from the SME fleet owner's daily pain.
