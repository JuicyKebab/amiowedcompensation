// Minimale runnable check voor de kernlogica. `npm test`.
import { assess, determineRegime } from "./engine.js";
import { haversineKm } from "./distance.js";
import { AIRPORTS } from "../data/airports.js";

let fails = 0;
const eq = (name, got, want) => {
  const ok = JSON.stringify(got) === JSON.stringify(want);
  if (!ok) { fails++; console.error(`FAIL ${name}: got ${JSON.stringify(got)} want ${JSON.stringify(want)}`); }
  else console.log(`ok   ${name}`);
};

// regime
eq("UK departure -> UK261", determineRegime("UK", "OTHER", "UK"), "UK261");
eq("EU departure -> EU261", determineRegime("EU", "UK", "EU"), "EU261");
eq("OTHER->UK on non-EU carrier not covered", determineRegime("OTHER", "UK", "OTHER"), null);
eq("OTHER->EU on EU carrier -> EU261", determineRegime("OTHER", "EU", "EU"), "EU261");

// BA LHR->JFK, 7h delay -> UK261 long full £520
const lhrJfk = haversineKm(AIRPORTS.LHR, AIRPORTS.JFK);
eq("LHR-JFK is long band (>3500km)", lhrJfk > 3500, true);
const r1 = assess({ departureRegion: "UK", arrivalRegion: "OTHER", carrierRegion: "UK", distanceKm: lhrJfk, delayHours: 7 });
eq("BA LHR-JFK 7h -> UK261 £520", [r1.regime, r1.amount, r1.eligible], ["UK261", 520, true]);

// Same route 3.5h -> 50% rule -> £260
const r2 = assess({ departureRegion: "UK", arrivalRegion: "OTHER", carrierRegion: "UK", distanceKm: lhrJfk, delayHours: 3.5 });
eq("BA LHR-JFK 3.5h -> half £260", [r2.amount, r2.reduced], [260, true]);

// easyJet LGW->BCN 2h -> not eligible
const r3 = assess({ departureRegion: "UK", arrivalRegion: "EU", carrierRegion: "UK", distanceKm: 1100, delayHours: 2 });
eq("2h delay not eligible", [r3.eligible, r3.reasonCode], [false, "delay_under_3h"]);

// Ryanair DUB->CDG 3h short -> EU261 €250
const r4 = assess({ departureRegion: "EU", arrivalRegion: "EU", carrierRegion: "EU", distanceKm: 780, delayHours: 3 });
eq("EU short 3h -> EU261 €250", [r4.regime, r4.amount], ["EU261", 250]);

// Lufthansa JFK->FRA 5h long -> EU261 €600
const jfkFra = haversineKm(AIRPORTS.JFK, AIRPORTS.FRA);
const r5 = assess({ departureRegion: "OTHER", arrivalRegion: "EU", carrierRegion: "EU", distanceKm: jfkFra, delayHours: 5 });
eq("LH JFK-FRA 5h -> EU261 €600", [r5.regime, r5.amount], ["EU261", 600]);

// Emirates DXB->LHR 5h -> not covered (non-EU carrier, arrival UK from outside)
const r6 = assess({ departureRegion: "OTHER", arrivalRegion: "UK", carrierRegion: "OTHER", distanceKm: 5500, delayHours: 5 });
eq("EK DXB-LHR -> route_not_covered", [r6.eligible, r6.reasonCode], [false, "route_not_covered"]);

// Cancellation, UK medium, <14d -> full £350
const r7 = assess({ departureRegion: "UK", arrivalRegion: "EU", carrierRegion: "UK", distanceKm: 2000, cancelled: true, noticeDays: 3 });
eq("UK cancellation medium <14d -> £350", [r7.amount, r7.trigger], [350, "cancellation"]);

// Cancellation with 20d notice -> not eligible
const r8 = assess({ departureRegion: "UK", arrivalRegion: "EU", carrierRegion: "UK", distanceKm: 2000, cancelled: true, noticeDays: 20 });
eq("cancellation 20d notice -> not eligible", [r8.eligible, r8.reasonCode], [false, "notice_14d_or_more"]);

console.log(fails ? `\n${fails} FAIL` : "\nall pass");
process.exit(fails ? 1 : 0);
