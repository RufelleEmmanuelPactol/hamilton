# Hamilton web prototype

The interactive prototype: a landing page, the admin console, the driver app and the customer's WhatsApp view, all running one scripted day for *Maria's Flowers & Gifts*.

It's a static Next.js 14 site (`output: 'export'`). There's no server or database, and it makes no model calls. Demo state lives in the browser's `localStorage`, so each viewer gets their own copy of the demo.

## Run it

```bash
cd web
npm install
npm run dev          # http://localhost:3000
```

Production build: `npm run build` writes the static site to `web/out/`. `npm start` serves it on port 3000.

## Deploy

On any static host, the build output is `web/out/`.

- **Railway:** create a service from the GitHub repo and set **Root Directory** to `/web`. `web/railway.json` sets the build (`npm run build`) and start (`npm start`, which serves `out/` on Railway's `$PORT`). Under Settings → Networking → **Generate Domain** for a public URL. Every push to the watched branch redeploys.
- **Vercel:** import the GitHub repo and set **Root Directory** to `web`. The framework is detected as Next.js, and the default settings work.
- **Netlify / Cloudflare Pages:** set the base directory to `web`, the build command to `npm run build`, and the publish directory to `out`.

## The demo

| Time | What happens | Where |
|---|---|---|
| 10:30 | A calm morning. 4 drivers, 13 orders, all on time. | `/app` |
| 10:31 | Jun reports a flat tire and says it'll take about 1 hour. | `/driver/report` |
| 10:33 | The Dispatch agent proposes moving 3 stops. The policy holds it ("3 stops is above the 1-stop auto limit") and opens **HAM-417**. | `/app/approvals` |
| 10:44 | Maria approves. Routes, ETAs and the at-risk count update, and customers get new times. | `/app`, `/app/dispatch`, `/customer`, `/app/audit` |

Tabs stay in sync, so you can keep the driver app open in one tab and the admin console in another.

### Presenter controls (hidden on purpose)

| Control | Effect |
|---|---|
| `?reset=1` on any URL | Back to 10:30, before the flat tire. The landing page's **Start the demo** link uses this. |
| `Shift + Alt + R` | Same reset, from the keyboard. |
| `?step=before` · `incident` · `approved` · `rejected` | Jump straight to a phase (useful for recording). |

## Code map

```
src/app/            routes (landing, /app/*, /driver/*, /customer)
src/boards/         one component per Claude Design canvas board
src/lib/store.ts    the scenario state (phase, Jun's report, decision), persisted and synced across tabs
src/lib/scenario.ts derived facts every screen shares (clock, at-risk count, approvals count), audit events
src/lib/policy.ts   the autonomy policy check: real code that decides Auto / Ask me / Never
src/components/     the admin shell, the phone frame, the runtime for the hidden controls
scripts/            the one-off canvas → JSX converter and a screenshot helper
```

The boards were converted from `design/project/*.dc.html` by `scripts/convert-boards.mjs`, then edited by hand. Don't run the converter again over the edited files.

**Real vs scripted.** The UI, the scenario state machine and the policy check are real. Agent outputs (proposals, drafts, triage tags, evidence packs) are scripted. Swapping in real models means replacing the scripted outputs behind the same proposal → `check()` → ticket flow. The policy layer doesn't change.
