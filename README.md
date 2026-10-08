# AmIOwed — flight compensation checker

Live at **[amiowedcompensation.com](https://amiowedcompensation.com)**.

Independent UK261/EU261 flight delay & cancellation compensation checker. Next.js static export → Cloudflare Worker; live flight-status via the Worker (`/api/flight-status`). Deterministic engine in `lib/engine.js` (tested).

## Local
```
npm install
npm test          # engine checks (13)
npm run build     # -> out/  (static export)
npm run preview   # wrangler dev: serves out/ + worker.js (needs .dev.vars)
```
Note: under `next dev` the live-check `/api/flight-status` is NOT served (that's the Worker) — the calculator works offline; use `npm run preview` to test the live-check.

## Config (env)
- **Domain/name:** `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME` (Cloudflare env or `lib/site.js`).
- **AeroDataBox key (RapidAPI):** `wrangler secret put AERODATABOX_KEY`. Local: `.dev.vars` → `AERODATABOX_KEY=...`.
- **Affiliate:** `NEXT_PUBLIC_AFF_AIRHELP` (primary), `NEXT_PUBLIC_AFF_COMPENSAIR` (fallback).
- **Figures:** UK261 £ amounts + extraordinary-circumstances list in `lib/rules.js` / `lib/content.js` (`VERIFIED` date).

## Deploy
```
npm run deploy    # next build && wrangler deploy
```
Then submit `sitemap.xml` in GSC + Bing, and run the launch playbook.

## Add an airline
One row in `data/airlines.js` → both delay + cancellation pages, sitemap, llms.txt update automatically.

## Scope
UK-first, 10 airlines × {delay, cancellation} + UK261/EU261/comparison hubs + calculator + live-check + trust pages. Build spec: `../flightcomp-mvp-v1-buildspec-2026-10-05.md`.
