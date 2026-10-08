# flightcomp SEO — Action Plan (pre-launch)

2026-10-05 · Score 78/100. Technical/on-page clean; the gate is **content differentiation**. Ordered by impact ÷ effort. Do the 🔴s before deploy — launching 93%-duplicate pages wastes the first-index impression.

## Before deploy (blockers)
1. **✅ DONE — Broke the airline-page template.** `data/airlines.js` now carries per-airline `type`/`hubs`/`site`/`note`; `lib/content.js` renders a unique lead, a carrier-specific "Does UK261/EU261 apply to [Airline]?" section (Emirates non-EU nuance etc.), hubs, and airline-specific FAQ answers. Also removed the duplicate embedded calculator (CTA links to it instead). **Full-text similarity 93% → 62-71%**; residual is shared chrome + the identical amounts reference table (legitimate). Post-live: add real per-airline delay/approval stats to push further.
2. **✅ DONE — Linked the orphaned cancellation pages.** Home grid links both delay + cancellation per airline; each airline page cross-links its counterpart scenario. No sitemap-only orphans.
3. **⏳ Domain (tomorrow)** — `NEXT_PUBLIC_SITE_URL`/`NEXT_PUBLIC_SITE_NAME`; already env-wired, 1 value to set. Can't do without the domain.

## Also done
4. **✅ Cluster internal links** — each airline page links 5 sibling airlines + both regime hubs in-body (rotating window). Generic "Questions" H2 renamed to question-shaped.

## Done (⚠️ → ✅)
5. **✅ OG image** — static `app/opengraph-image.png` (1200×630, rasterised from SVG via sharp since `next/og` ImageResponse fails under `output: export`). Regen script: `_genog.mjs`. Sitewide card: "Flight delayed or cancelled? Check what you're owed up to £520/€600". Per-airline OG = possible later but static export can't prerender dynamic per-param images cleanly.
6. **✅ Airlines pillar hub** — `/flight-delay-compensation` (head term): answer-first intro + amounts table + all airlines (delay + cancellation) + regime links. In sitemap (29 URLs), llms.txt, and nav ("By airline").

## Still open
- Real domain (tomorrow, env).
- Post-live: per-airline delay/approval stats (strongest differentiator; needs logged data).

## Polish (post-deploy ok)
7. FAQ questions as `<h3>` (or question-shaped section H2) for extractability (ℹ️, S).
8. After the real domain + first index: submit sitemap (GSC/Bing), request-index the top airline pages, baseline the AI-citation questions, re-run at +30 days.

## Do NOT regress (already correct)
- Dated/sourced amounts with "verified" date; FAQ schema matching visible text; no fabricated ratings.
- Free DIY route shown first + affiliate disclosure (trust + anti-spam).
- robots allowing AI bots; llms.txt from the registry; static/fast output.

## Verification after fixes
- Re-run the duplication check (BA vs Ryanair) → aim <60%.
- `grep -L` every airline slug in the rendered HTML link graph → no orphan (every page has ≥1 internal inbound link besides sitemap).
- Rich Results Test on one airline URL post-deploy → Article + Breadcrumb valid.
