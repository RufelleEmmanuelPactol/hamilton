# Rules

These come from real review feedback. Each one exists because breaking it made a screen confusing.

## Copy

1. **Plain sentences beat labels.** Write "Moving 1 stop or fewer. More than that asks you", not "Auto if ≤ 1 stops". Write "2 failed deliveries", not "Delivery risk".
2. **No jargon in the UI.** If a term needs explaining ("cold start", "flags", "assurance"), replace it with what it means.
3. **Say what a number measures.** Write "97% success (30d)", not "97%".
4. **One line per fact.** If a cell needs two lines of qualifiers, cut the qualifiers.
5. **Be honest about uncertainty.** If you don't know a time, say so, show a range and give the source ("Jun said about 1 hour; his last 2 flats took 50 and 70 min").
6. **Counts go in parentheses:** "Needs you (1)".

## Structure

7. **One concept, one place.** If two widgets show the same items (for example "Needs approval" and "Open tickets"), delete one.
8. **Explanations go behind (?)** in a popover, not in a subtitle on every card.
9. **Separate built-in from user-created** (Standard / Yours), with a filter.
10. **Show progress wherever there is a plan.** A plan without status per item ("Delivered / Next / Upcoming") reads as fiction.
11. **Before / after for every decision.** Use a segmented toggle ("If you do nothing / If you approve"), a one-sentence headline per side and a plain table. The trade-off goes in one footnote.
12. **One primary action per view.** Don't repeat "Approve" or "See after" in two places.
13. **Don't bolt features on as separate panels.** Fold them into the existing objects: a plan row, a policy, a ticket.

## AI

14. **Always mark AI output** with a sparkle, the `ai` panel, an "Auto-generated from …" sources line and an Edit button.
15. **AI proposes, people approve** anything involving money, customers' expectations or other people's work. These show as tickets with HAM-style IDs.
16. **Show how a plain-language rule was interpreted**, tagging each part as Static (exact data check) or Semantic (model judgment).

## Visual

17. **No decorative widgets** (clocks, sparkles without meaning, gradients).
18. **No stacked pills.** One tag per row; anything more becomes text.
19. **Text must never wrap** in tabs, tags, times or IDs. Shorten the label instead.
20. **Prefer a real component over a clever one.** If someone stares at a visual and can't explain it, replace it with a table.
