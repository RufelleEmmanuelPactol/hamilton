# Design

Hamilton's UI is designed in **Claude Design** as one canvas of linked artboards. In Play mode, the sidebar and buttons navigate between screens.

The `.dc.html` files in [`project/`](project/) are the canvas source (Design Component pages); `canvas.json` lays them out.

## Look

Styled with the Tangerine V2 Design System (Calm register), adapted for desktop. See [`../design-system/`](../design-system/).

- **Typeface:** DM Sans (UI), DM Mono (times, codes)
- **Surfaces:** white panels on `#F7F7F5`, hairline borders `#ECEAE4`, ink text `#221A12`
- **Buttons:** ink-filled pills; never orange
- **Color is for people and state:** colorful driver avatars, tangerine `#CC4A0E` unread badges, semantic success / warning / danger pairs
- **Logo:** a Hamiltonian path through five nodes, in tangerine `#F97316`

## Artboards

### Admin console (1440 px, responsive)

| File | Screen | Shows |
|---|---|---|
| `Main.dc.html` | Today | KPIs, live fleet map, Needs you, drivers, agent activity, Ask Hamilton chat |
| `Plan.dc.html` | Plan & routes | Dispatch agent's draft plan with per-driver rationale, approve once |
| `Approvals.dc.html` | Needs you | Approvals & escalations with the agent's reasoning |
| `Orders.dc.html` | Orders inbox | WhatsApp/email orders parsed into jobs with confidence & flags |
| `Messages.dc.html` | Customer messages | Notification + assistant thread, dispute pack |
| `Drivers.dc.html` | Driver profile | Automated context, area familiarity, today's reports, AI notes, owner notes |
| `AddressBook.dc.html` | Address book | Delivery preferences, history, learned notes |
| `Autonomy.dc.html` | Autonomy rules | Auto / Ask me / Never per action, thresholds |
| `Activity.dc.html` | Agent activity | Every observation, decision and action with reasoning |

### Phone (390 × 844)

| File | Screen |
|---|---|
| `DriverRoute.dc.html` | Driver · next stop, "Hamilton remembers", quick-report dock |
| `DriverPOD.dc.html` | Driver · proof of delivery with instant photo check (retake) |
| `DriverIncident.dc.html` | Driver · flat tire reported, stops re-planned |
| `CustomerThread.dc.html` | Customer · WhatsApp thread with notifications and the delivery assistant |

## Demo scenario (all screens)

Monday 12 October, 10:42am. Maria's Flowers & Gifts, Metro Manila. Four drivers, 13 orders. Jun gets a flat tire on EDSA at 10:31; the dispatch agent drafts moving his three remaining stops; a customer replied "after 3pm"; a WhatsApp order waits for review; a refund request has been escalated.
