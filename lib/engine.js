// Deterministische EU261/UK261 eligibility + bedrag. ZELFDE functie voor de live-check
// (worker geeft status -> hier omgezet) en de handmatige calculator.
// Geen verzonnen zekerheid: "extraordinary circumstances" (weer/ATC-staking) kan niet uit
// data worden afgeleid, dus het verdict is een WAARSCHIJNLIJKHEID met caveat.
import { RULES, bandForDistance, DELAY_THRESHOLD_HOURS, CANCELLATION_NOTICE_DAYS, LONG_BAND_KM } from "./rules.js";

export function determineRegime(departureRegion, arrivalRegion, carrierRegion) {
  if (departureRegion === "UK") return "UK261";
  if (departureRegion === "EU") return "EU261";
  const euOrUk = carrierRegion === "UK" || carrierRegion === "EU";
  if (arrivalRegion === "UK" && euOrUk) return "UK261";
  if (arrivalRegion === "EU" && euOrUk) return "EU261";
  return null;
}

/**
 * @param {object} i
 * @param {string} i.departureRegion 'UK'|'EU'|'OTHER'
 * @param {string} i.arrivalRegion
 * @param {string} i.carrierRegion
 * @param {number} i.distanceKm
 * @param {number|null} [i.delayHours]   arrival delay, hours
 * @param {boolean} [i.cancelled]
 * @param {number|null} [i.noticeDays]   days notice of cancellation
 */
export function assess(i) {
  const regime = determineRegime(i.departureRegion, i.arrivalRegion, i.carrierRegion);
  if (!regime) {
    return { eligible: false, regime: null, reasonCode: "route_not_covered" };
  }
  const r = RULES[regime];
  const band = bandForDistance(i.distanceKm);
  const base = { regime, label: r.label, currency: r.currency, symbol: r.symbol, band, source: r.source, caveat: "extraordinary_circumstances" };

  // Cancellation path
  if (i.cancelled) {
    if (i.noticeDays != null && i.noticeDays >= CANCELLATION_NOTICE_DAYS) {
      return { ...base, eligible: false, reasonCode: "notice_14d_or_more" };
    }
    return { ...base, eligible: true, trigger: "cancellation", amount: r.bands[band] };
  }

  // Delay path
  if (i.delayHours == null) {
    return { ...base, eligible: "unknown", reasonCode: "insufficient_input" };
  }
  if (i.delayHours < DELAY_THRESHOLD_HOURS) {
    return { ...base, eligible: false, reasonCode: "delay_under_3h" };
  }
  // 50%-regel: lange band (>3500km) met vertraging 3-<4u => half bedrag
  let amount = r.bands[band];
  let reduced = false;
  if (band === "long" && i.distanceKm > LONG_BAND_KM && i.delayHours < 4) {
    amount = Math.round(amount / 2);
    reduced = true;
  }
  return { ...base, eligible: true, trigger: "delay", amount, reduced };
}
