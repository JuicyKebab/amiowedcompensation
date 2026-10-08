# SEO Audit — flightcomp (pre-launch)

2026-10-05 · Score: **78 → ~86/100 after fixes** · Basis: built static export (`out/`) + source. NOT deployed (placeholder domain) → no live CWV/PSI/backlinks/index data; all scores heuristic.

> **Update (same day): blockers 1 & 2 fixed.** Per-airline pages differentiated (unique lead + carrier-regime section + hubs + airline-specific FAQs; duplicate embedded calculator removed) → full-text similarity **93% → 62-71%** (residual = shared chrome + identical amounts reference table). Cancellation pages no longer orphaned (home + counterpart cross-links); sibling-airline + regime cluster links added. Remaining: real domain (tomorrow), OG image, airlines pillar hub, and post-live per-airline stats.

## The one thing
Technical and on-page SEO are clean — unique titles/descriptions, correct canonicals, Article+FAQPage+BreadcrumbList schema, sitemap, robots, llms.txt, fast static output. But the thing that will actually decide whether this ranks is **content differentiation**: the 20 per-airline pages are **93% identical** (measured, BA vs Ryanair) because they only swap the airline name into the same rules table and the same 6 FAQs. On a new 0-authority domain in a niche Google already distrusts (AirHelp-clone affiliate sites), near-duplicate templated pages are the documented failure mode — Google indexes them and sits on them. Fix that and the site has a real shot; ship it as-is and the pages are a well-built dead end.

## Scorecard (heuristic)
| Category | Weight | Score | Note |
|---|---|---|---|
| Technical SEO | 25% | 82 | Canonical/sitemap/robots/schema/favicon clean; 10 orphaned cancellation pages; placeholder domain |
| Content Quality | 20% | 58 | Answer-first + dated + sourced, but 93% duplication, no per-airline unique data |
| On-Page SEO | 15% | 80 | Unique titles/desc, answer-first lead; generic "Questions" H2 |
| Schema | 15% | 88 | Article+FAQPage+BreadcrumbList+Organization; matches visible content; no fabricated ratings |
| Performance (CWV) | 10% | 90* | Static + minimal JS + CF CDN → very likely green (*not measured, not deployed) |
| Images | 10% | 70 | No content images (fine); **no OG image** → bare social/AI cards |
| GEO / AEO | 5% | 85 | llms.txt, AI bots allowed, dated figures, answer-first; duplication limits citability edge |

## Confirmed strengths
- Metadata: unique `<title>` + meta description per page; canonical correct with consistent trailing slash; OG title + twitter:card (layout); favicon (`app/icon.svg`); `lang="en-GB"`.
- Structured data: airline pages emit `Article` (dated) + `FAQPage` + `BreadcrumbList`; `Organization`+`WebSite` sitewide. FAQ answers match visible page text; no fabricated `AggregateRating`/`Review`.
- Answer-first lead block + dated, sourced amounts table (CAA + EU Reg 261/2004, "verified" date).
- Honest affiliate disclosure + free DIY route shown first (trust + anti-spam signal).
- robots allows all incl. AI crawlers; sitemap 28 URLs; `llms.txt` generated from the registry; fast static export.

## Findings

### 🔴 Near-duplicate airline pages (confidence: Confirmed, 93% measured)
20 pages (10 airlines × delay/cancellation) differ only by airline name + region label; identical rules table + near-verbatim 6 FAQs. **Failure scenario:** on a 0-authority domain Google indexes a few, ranks none ("crawled – not indexed"), and the KD0-9 per-airline opportunity goes unrealised.
**Fix:** give each airline page ≥1 genuinely unique, useful element: the airline's own claims page/contact + exact process, its main hubs/routes, carrier-specific notes (e.g. Ryanair's known EU261 handling), and — once live data exists — that airline's delay/approval stats. Even 3-4 unique sentences + one unique data point per airline breaks the template.

### 🔴 Orphaned cancellation pages (confidence: Confirmed)
Home links only the **delay** variant (`pageSlug(a,"delay")`); airline pages don't link their cancellation counterpart. The 10 cancellation pages have **zero internal inbound links** — discoverable only via sitemap. Thin crawl signal → slow/no indexing.
**Fix:** link each delay page ↔ its cancellation page, and surface cancellation pages on the home grid or an airlines hub.

### ⚠️ Shallow internal linking within the cluster (confidence: Confirmed)
Airline pages link home + regime hubs + trust, but not to sibling airlines. Link equity doesn't flow across the long-tail.
**Fix:** each airline page links 3-5 sibling airlines + both regime hubs contextually (GBScout's rotating-window pattern is reusable).

### ⚠️ No OG/social image (confidence: Confirmed)
No `opengraph-image` → bare cards on social and some AI surfaces, lower CTR.
**Fix:** add `app/opengraph-image.js` (dynamic, 1200×630: "[Airline] delay compensation — up to £520") or one static OG. GBScout's dynamic OG route is a template.

### ⚠️ Missing an airlines hub / `/flight-delay-compensation` pillar (confidence: Likely)
No single hub page linking all airlines + scenarios; home grid is the only index. A `/flight-delay-compensation` pillar would capture the head term and distribute links.
**Fix:** add a pillar hub listing all airlines (delay + cancellation) + regimes.

### ℹ️ Generic "Questions" H2 + FAQ in `<details><summary>` (confidence: Likely)
FAQ questions sit in `<summary>`, not headings; the section H2 is the non-descriptive "Questions". FAQPage schema still conveys them, but heading-level questions extract better.
**Fix:** render each FAQ question as an `<h3>` (keep the `<details>` for UX) or rename the H2 to a question-shaped string.

### ℹ️ Placeholder domain in canonicals/OG (confidence: Confirmed, expected)
`https://flightcomp.example` throughout. Set the real domain (env) before deploy — already on the pre-deploy checklist.

## What I couldn't determine
- CWV/PSI, indexation, AI-citation set — site not deployed; measure post-launch.
- Whether per-airline unique data (routes/stats/contacts) is available to inject — needs a data source decision.
- Real-world duplication penalty severity — inferred from the niche + 93% measure, not observed.
