# Problem research

How we got to the problem Hamilton solves, and the evidence behind it.

## 1. Who the customer is

Delivery-management software for **businesses that run their own fleets**. Reviews of SME delivery/ePOD tools show who actually buys:

- **Industries:** retail (florists, gift shops), food & beverage, construction & electrical, waste collection, printing, furniture, small couriers and 3PLs.
- **Size:** mostly **2–50 employees**, some 51–200.
- **Before software:** paper routes ("before, we planned the routes on paper and it was a mess"), paper proof-of-delivery slips, Excel reports.
- **Price sensitivity:** ~$29–39 per driver per month is "a bit high for a single delivery van".

Delivery isn't their business — but it's where their business keeps or breaks its promise to the customer.

## 2. A day in their shoes (composite persona)

**Maria runs a flower & gift business with 4–6 vans. She's the owner — and on busy days, the dispatcher.**

| Time | What happens | How it feels |
|---|---|---|
| 6:30am | Orders from Shopify, email, WhatsApp, a few calls. She plans routes from memory. A van is in the shop — half the plan redone. | Rushed, error-prone |
| 9:00am | The phone starts. "Where are the arch flowers?" She calls the driver, who is driving. She guesses "around 10". | In the dark |
| 11:00am | Customer not home; anniversary bouquet. Two calls, no answer. Driver leaves. | A failed trip: fuel, time, redelivery, refund risk |
| 2:00pm | "You never delivered." The photo is blurry. | Defensive — and blamed either way |
| 6:00pm | Reconcile, re-run, bill, plan tomorrow. | Never working *on* the business |

## 3. What the evidence says

### Customers of SME delivery tools (reviews)

- Love: going paperless, live tracking, photo proof that "reduced disputes", looking more professional.
- Still frustrated by: confusing recurring jobs, routing as a separate add-on, setup "intimidating" for non-technical owners, basic reporting, slow support.

### Drivers (trucker & courier forums)

- Calls and texts at all hours; tracking apps on personal phones ("it only tracks my phone").
- Apps that say "you may not be close to the location" while standing at the door; no support after hours.
- Fear of being blamed — proof protects them, GPS can feel like surveillance.

### Recipients (courier reviews)

- "Lied and said no one was in, when they were."
- "The delivery address they tried was not even my front door."
- "No response, just getting ticket numbers."

They want to know **when** — and to change plans **before** the driver arrives.

### Industry data

- ~**8%** of last-mile deliveries fail on the first attempt; ~**$17** per failed delivery (OneRail via FreightWaves).
- Customers **warned early** about a delay rate the retailer higher than surprised ones.
- **94%** of consumers blame the retailer, not the courier.
- Logistics managers spend ~**1.7 hours/day** on manual tasks; **70%** of customer complaints stem from manual errors (Microlise survey, 250 UK managers).

### Where AI agents already work in logistics (2025–26)

Mostly freight-brokerage back offices: email triage (80%+ auto-response), quoting in seconds, check calls (completion 55% → 92%), document parsing (12 min → <1 min per load). The same sources agree **pricing exceptions, claims, disputes and new relationships stay human** — and warn that a wrong automated decision repeats at scale. (Figures are mostly vendor-reported; treat as best case.)

## 4. The insight

> Tools record what happened. Nobody acts in the moment.

At 10:45, the system could already know the recipient is unreachable, the driver is stuck, or the photo is unusable. Hamilton turns those moments into actions — within rules the owner sets.

## Sources

- Capterra — SME delivery/ePOD software reviews
- Software Advice — SME delivery/ePOD software reviews
- TheTruckersReport forums — "Broker calls and texts", "Ya know… I just hate brokers"
- FreightWaves — "Failure is not a winning strategy in the last mile"; "AI booking agent aims to give freight brokers an 'Iron Man suit'"; "A day in the life of a dispatcher"
- SMMT / Microlise — "Logistics and transport managers bogged down in costly manual tasks"
- Inbound Logistics — "The High Cost of Hidden Workarounds"
- Tenfold — "AI Agents in Freight Brokerage: What's Actually Changing in 2026"
- reviews.io — courier recipient reviews
- OpenAI — Decisions API guide (cost model for the triage layer)
