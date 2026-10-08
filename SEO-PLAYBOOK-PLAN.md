# flightcomp: SEO playbook toegepast (Charles Flo)

2026-10-06. Basis: global skill `seo-playbook`. Aanvulling op `ACTION-PLAN.md` (pre-launch technisch/on-page).

## Bewijs uit SERP-onderzoek (OpenSEO, UK, 10 airline/regime-keywords)
Rankende concurrenten zijn zwak qua links → links zijn hier niet het slot:
- **bottonline.co.uk** (onafhankelijk, geen claimbureau = ons model): #5 TUI, #5 Jet2, #6 "flight delay compensation uk", #7 easyJet. 247 verwijzende domeinen, bijna allemaal rank 0 / spam-directories.
- **flight-delayed.com**: #9 "flight delay compensation uk". 726 ref. domains, vrijwel alle SEO-directory-spam.
- **euflightcompensation.com**: positie 23-64. Per-airline-template, DR30, maar rankt slecht → bewijst: template alleen is niet genoeg, differentiatie telt.
- Sterke bezetters: skycop, flightright, airhelp, euclaim (agencies), easyjet.com, caa.co.uk (officieel).
Conclusie: per-airline longtails zijn te winnen met content/intent/differentiatie (live-status, per-airline cijfers), niet met linkvolume.

## 1. 0-to-100 launch (zodra domein er is)
- Dag 0: alles staat al klaar in static build. Domein + `NEXT_PUBLIC_SITE_URL/NAME` + `NEXT_PUBLIC_SAME_AS` zetten, deploy, alles tegelijk live.
- Dag 1-3: GSC + Bing sitemap, request-index op hub + top 10 airline-pagina's.
- Dag 1-3: 50-100 trust-/entity-links: X, Facebook-page, LinkedIn-company, YouTube, Pinterest, Medium, Crunchbase, Product Hunt, About.me, Trustpilot-profiel (alleen als echt), relevante UK-directories (Yell, Hotfrog, Cylex), AlternativeTo, Github. Voeg elke URL toe aan `NEXT_PUBLIC_SAME_AS` (schema `sameAs`, code klaar). Elk profiel minstens 1 post; autoposter met goedkoop model is ok.
- Links NIET allemaal geforceerd indexeren (footprint). Entity-links wel laten crawlen, content-links natuurlijk laten indexeren.
- Homepage rankt op merknaam; head-term `/flight-delay-compensation` is hub, geen linkdoel in maand 1.

## 2. Wat NIET doen
- Geen SEO-directory-spam links (prlog.ru, *directory.com, pages.dev, oppalerts.com): zitten bij alle drie de concurrenten, toxisch en geen ranking-driver hier.
- Geen 100 links naar 1 pagina. Max ~5-10 content-links in maand 1 spreiden over 5-10 airline-pagina's.
- Geen off-topic content (geen algemeen reisblog, hotels, visa). Site focus = UK261/EU261/claims.
- Geen "beste claimbureaus"-vergelijkpagina in de eerste 60 dagen: wijkt af van onafhankelijk-checker-positie.

## 3. Linkplan (consensus + outliers)
Consensus/legit-domeinen (komen bij meerdere concurrenten terug):
- Aviation/travel-nieuws: aerotime.aero (DR24, 69 links naar euflightcompensation), puretravel.com, vol-retarde.fr (FR, signaal latere FR-markt).
- UK points/reis-blogs: godsavethepoints.com, bestfree.co.uk, MoneySavingExpert-forum, Which?, Reddit r/uktravel + r/delayedflights.
- Eigen asset (copy what works): calculator + live-flight-check als linkable asset. Pitch aan UK-reis/consumentenblogs, journalisten (BA/Ryanair-strikes, zomer-chaos, Heathrow-storing).
Tactiek:
1. Datastory na 30 dagen logs: "Welke UK-airlines vertraagden het meest deze maand" (information gain + linkbaar). Vereist logging live-check.
2. HARO/Qwoted/Featured: UK261-expertquotes (onafhankelijk, geen bureau).
3. Broken-link outreach op CAA-/airline-hulpgidsen en reisblogs met dode claim-calculators.
4. Lijst-pitches: "beste gratis tools voor vluchtcompensatie".

## 4. Topical map en uitrol-volgorde
Nu: 10 airlines x {delay, cancellation} + hub + regels + calculator + live-check (34 pag.).
Volgorde van uitbreiden (elke stap pas als de vorige indexeert/rankt → "unlock topical authority first"):
1. Meer UK-airlines + UK-vertrek-longtails (KD 0-9, CPC $4-8): Wizz, TUI, Jet2, Virgin, Loganair, Aer Lingus, KLM, Air France, Emirates, Qatar, Etihad, Turkish, Norwegian, Vueling. Eerst per keyword checken wat rankt (page-type), dan bouwen.
2. Per-airport (LHR, LGW, MAN, STN, EDI, BHX, BRS, GLA): "delays at X + compensation" met live-data = nieuwe info gain.
3. Scenario-varianten: missed connection, denied boarding, overbooking, strike, "extraordinary circumstances" per oorzaak (weer, staking, technisch).
4. Per-route (hoge-volume) + vlucht-nummer-pagina's als live-moat (gelogde data nodig).
5. Daarna pas: DE-markt (Lufthansa/Condor/Eurowings, `de`), dan FR/ES/IT. Eigen taalversie, geen vertaalde duplicaten.
Per nieuwe pagina: ROI-schatting (volume x CTR pos 1 x EPC; Compensair EUR5, AirHelp EUR16-25) en queue-positie.

## 5. Refresh boven publish
- Maandelijkse refresh-ronde: per pagina `VERIFIED`-datum, regelwijziging-check (UK261-reform: CAA/DfT bedragen + drempel 3u->4u voorstel), 1 nieuwe alinea of datapunt, daarna reindex-request top 10.
- `lastModified` in sitemap pas wijzigen bij echte inhoudelijke wijziging.

## 6. Information gain (5% unieke info)
- Live per-vlucht-status = wedge. Na launch: per-airline stats (gem. vertraging, % annuleringen, laatste 90 dagen) uit gelogde AeroDataBox-calls. Logging in Worker: aggregaten naar KV/D1.
- Elke airline-pagina: 1 datapunt dat concurrenten niet hebben (claimreactie-tijd, bekende weigerpatronen met bron).

## 7. AEO / GEO
- Entity: schema `sameAs` + `knowsAbout` (doorgevoerd), `/about` met korte actieve semantic triples (doorgevoerd).
- Consensus: vermeldingen op 5-10 onafhankelijke plekken (link niet verplicht), consistent: "independent UK261/EU261 compensation checker".
- Corroboratie: methodologiepagina verwijst naar primaire bronnen (CAA, gov.uk, EUR-Lex). Claude-vriendelijk: wiki-stijl, bronnen, changelog → voeg `/changelog` toe met regel-/bedragupdates.
- llms.txt blijft. Meet: baseline-vragen in ChatGPT/Gemini/Claude (30 dagen na launch).
- Mentions boven links; geen betaalde "best of"-plaatsingen.

## 8. CRO en LTV (niet alleen SEO)
- Hoofdwinst = conversie van verdict -> claim-klik, niet meer verkeer. Meet: verdict-view -> affiliate-klik; test DIY-eerst vs fee-note-positie.
- Lead magnet: gratis claimbrief-template (PDF) + "herinner mij" (6-jaar UK / 3-jaar EU verjaring) -> e-mail. Hergebruik Resend, geen extra account.
- Pixel (Meta/Google) op alle pagina's voor retargeting: pay-per-impression ~$10/1000, EPC >= $0.50 break-even; Compensair EUR5 marginaal, AirHelp EUR16-25 beter.
- LTV: reiziger vliegt weer. E-mail-reeks "voor je volgende vlucht".

## 9. Content-overlap kanalen
1 stuk -> X-thread + Reddit-antwoord (r/uktravel, r/delayedflights, MSE-forum: helpvolle antwoorden, geen spam) + korte video (Pinterest/YT Shorts). Reddit/UGC domineert nu de airline-SERP-termen → aanwezig zijn bezet ook de SERP.

## 10. Onpage checks (consensus + over-optimalisatie)
- Per airline: top-3 SERP openen (desktop/mobiel), entiteiten/schema/tabellen/FAQ vergelijken. Match consensus, voeg 1 unieke datapunt toe.
- Broncode checken op keyword-stuffing in schema/meta/TOC (nu clean).
- Intent: top-3 per keyword = vaak guide/calculator/agency-landing. Onze pagina's = gids+tool → goed.

## 11. Technische launch-checks
- Na eerste crawl: "crawled, not indexed" check; zo ja request-index, render-check (RenderDiff), Cloudflare firewall/Bot-fight-mode uit voor Googlebot.
- Redirects: trailing-slash-consistentie (canonicals eindigen op `/`), geen 302 bij domeinwissel.

## 12. Code-acties
- [x] `lib/site.js`: `SAME_AS` uit `NEXT_PUBLIC_SAME_AS`.
- [x] `lib/schema.js`: `knowsAbout` + `sameAs` in Organization.
- [x] `app/about/page.jsx`: "What FlightComp is" semantic-triples-blok.
- [x] `/changelog`: regel-/bedragupdates (AEO + refresh-signaal), in sitemap + footer + llms.txt.
- [x] Lead magnet = `/claim-letter` (gratis UK261/EU261-claimbrief, printbaar via native `window.print` -> PDF, geen lib). Gelinkt vanuit Verdict DIY-kaart, footer, llms.txt, sitemap. `components/PrintButton.jsx`.
- [ ] E-mail "remind me"-capture: UITGESTELD. Vereist KV-namespace + geverifieerd Resend-verzenddomein -> beide geblokkeerd op domeinkeuze. Bouwen na domein: Worker-endpoint `/api/remind` -> KV + Resend verjaring-reminder.
- [ ] Pixel (Meta/Google) retargeting: na domein + consent-keuze.
- [ ] Logging live-check -> per-airline stats (Worker -> KV/D1).

## Meetmomenten
+7d: indexatie (GSC); +30d: eerste longtail-rankings + AI-citation baseline; +60d: eerste datastory/links; +90d: beslis DE-markt.
