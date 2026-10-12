# Pink Console design system

A calm, dense, enterprise-console style for operations tools: Linear and HubSpot structure, with one pink brand accent. It started as Hamilton's UI and is packaged here for reuse.

| File | Use it for |
|---|---|
| `tokens.json` | Source of truth: colors, type, radii, spacing, sizes, shadows |
| `tokens.css` | Drop-in CSS variables plus base `body` styles |
| `tailwind.preset.js` | The same tokens as a Tailwind preset |
| `components.html` | A visual reference of every pattern below. Open it in a browser. |
| `RULES.md` | Copy and UX rules learned the hard way. Read before designing a screen. |

To rebrand, change `brand`, `brandInk`, `brandTint`, `aiBg` and `aiLine`. Everything else is neutral.

---

## 1. Foundations

**Color.** Neutrals do almost all the work: `bg` behind, `panel` for surfaces, `line` for hairlines, `ink / ink2 / mute` for text. Pink appears only for:

- the logo
- primary buttons and links (`brandInk`)
- the active nav item (`brandTint` fill, `brandInk` text)
- AI-generated content (sparkle icon, `aiBg` panel)
- live and "now" indicators

**Status.** Always use the full triple (`fg` text, `bg` fill, `line` border): `ok`, `warn`, `err`, `info`, `neutral`. Never let color alone carry meaning. A status always has a word.

**Series colors.** For people, routes and chart series, assign `series.1–6` in order and keep each one stable per entity across every screen. Jun is always blue.

**Type.** IBM Plex Sans, 13px base.

| Role | Style |
|---|---|
| Page title | 20 / 600 |
| Section title | 14 / 600 |
| Labels and meta | 12 / mute |
| Tags | 11 / 500 |
| Overline | 11 / 600 / uppercase / 0.04em |

Use IBM Plex Mono for IDs (`#1042`, `HAM-417`), times and numbers in tables. Show text a customer wrote in the system font, so it reads as theirs.

**Shape.** Radius 4 for tags, 6 for controls, 8 for cards. Borders are 1px `line`. Avoid shadows, except on popovers and the selected segment.

## 2. Layout shell

- **Header (52px):** logo, breadcrumb (`Org / Section / Page`), ⌘K search, avatar. No clocks or decorative status.
- **Sidebar (220–236px):** grouped nav with 11px uppercase group labels. Items are 32px tall with a 15px icon. Show counts as plain numbers; a count that needs attention gets a pink badge.
- **Main:** 20–24px padding, 14–16px gap between cards. An optional right rail (320–380px) holds a copilot, details or suggestions.

## 3. Components

All of these are drawn in `components.html`.

- **Buttons.**
  - Primary: `brandInk` fill, white label, 34px tall. Use **one per view**.
  - Secondary: white with a `line2` border.
  - Inline actions: 28px.
- **Metric strip.** One bordered card split into 4–6 cells, each with a label, a value and an optional sub-line. Every metric must be actionable or decision-relevant. If you can't act on it, cut it.
- **Table.** A `sub` header row with 12px mute labels, 9–10px cell padding and hairline rows. Group rows use a `#FCFCFD` fill with an avatar and a summary. Mono for IDs and times, with `white-space: nowrap`.
- **Tag / pill.** 11px text with the status triple and radius 4. One tag per row is ideal and two is the maximum. If you need more, write a sentence instead.
- **Segmented toggle.** A `#F2F4F7` track with the selected segment in white plus `shadow.raised`. Use it for views of the same data, such as "If you do nothing / If you approve" or "All / Standard / Yours".
- **Tabs.** Text tabs with a 2px `brandInk` underline for the active one. Use them for different datasets, such as "Today · Live / Tomorrow · Draft".
- **Inbox row.** Line 1 is the name, ID and time. Line 2 is the latest message. Line 3 is a quiet meta line (topic · who handled it). Mark attention with a red dot, not a pill.
- **Kanban card (tickets).** ID, title, one tag and an assignee avatar.
- **AI-generated content.** A sparkle icon in `brand`, an `aiBg` panel with an `aiLine` border, and a sources line at the bottom: "**Auto-generated** from 2 failed attempts, 3 replies · updated 10:41". Always offer Edit. Human edits override the AI version.
- **Help.** A (?) icon button opens a popover (`shadow.pop`, 360–400px wide). Put explanations here instead of in subtitles.
- **Live tracker.** One lane per entity on a shared time axis, with a pink "Now" line. Completed stops are solid, the next stop is a ring, planned stops are grey, proposed stops are pink dashed, and the current position pulses.
- **Map.** A neutral basemap with entity-coloured routes, numbered stops, chip toggles per entity and a compact legend in the top-right corner.

## 4. Mobile (field app)

The phone frame is 390×844. Touch targets are at least 44px, the primary action is 52px and full width at the bottom, and corners are 10px. Keep the same tokens, with fewer words on screen.

## 5. What's not here yet

- dark mode
- a charting spec beyond series colors
- form validation states

Add them to `tokens.json` first, then the reference page.
