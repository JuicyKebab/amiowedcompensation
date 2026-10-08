# FlightComp (MVP v1)

Independent UK261/EU261 flight-compensation checker. Next.js static export → Cloudflare Worker; live flight-status via the Worker (`/api/flight-status`). Deterministic engine in `lib/engine.js` (tested).

## Local
```
npm install
npm test          # engine checks (13)
npm run build     # -> out/  (static export)
npm run preview   # wrangler dev: serves out/ + worker.js (needs .dev.vars)
```
Note: under `next dev` the live-check `/api/flight-status` is NOT served (that's the Worker) — the calculator works offline; use `npm run preview` to test the live-check.

## Before deploy (tomorrow)
1. **Domain/name:** set in Cloudflare env (or `lib/site.js`): `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SITE_NAME`.
2. **AeroDataBox key (RapidAPI):** `wrangler secret put AERODATABOX_KEY`. Local: put it in `.dev.vars` as `AERODATABOX_KEY=...`.
3. **Affiliate:** sign up Compensair (free, no-minimum) → set `NEXT_PUBLIC_AFF_COMPENSAIR`; add AirHelp later via `NEXT_PUBLIC_AFF_AIRHELP`.
4. **Verify figures:** exact current UK261 £ amounts + extraordinary-circumstances list in `lib/rules.js` / `lib/content.js` (`VERIFIED` date).
5. **Bump Next** to latest 15.x (`npm audit` flagged advisories on the pinned build).

## Deploy
```
npm run deploy    # next build && wrangler deploy
```
Then submit `sitemap.xml` in GSC + Bing, and run the launch playbook.

## Add an airline
One row in `data/airlines.js` → both delay + cancellation pages, sitemap, llms.txt update automatically.

## Scope
UK-first, 10 airlines × {delay, cancellation} + UK261/EU261/comparison hubs + calculator + live-check + trust pages. Build spec: `../flightcomp-mvp-v1-buildspec-2026-10-05.md`.
