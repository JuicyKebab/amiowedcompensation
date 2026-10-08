// UK261 (retained EU261 in UK law) en EU261 regels + bedragen. Bron: Regulation (EC) 261/2004
// en de UK-retained versie. BEDRAGEN VERIFIEREN BIJ BUILD/LAUNCH — hier de gangbare vaste bedragen.
// Toon op elke pagina "last verified" = VERIFIED.
export const VERIFIED = "2026-10-05";

export const RULES = {
  UK261: {
    label: "UK261",
    authority: "Civil Aviation Authority (CAA)",
    currency: "GBP",
    symbol: "£",
    bands: { short: 220, medium: 350, long: 520 }, // [verify] retained EU261 amounts in GBP
    source: "https://www.caa.co.uk/passengers/resolving-travel-problems/delays-cancellations/",
  },
  EU261: {
    label: "EU261",
    authority: "national enforcement body (EU)",
    currency: "EUR",
    symbol: "€",
    bands: { short: 250, medium: 400, long: 600 },
    source: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32004R0261",
  },
};

export const DELAY_THRESHOLD_HOURS = 3;   // arrival delay for compensation
export const CANCELLATION_NOTICE_DAYS = 14; // <14 days notice -> potentially due
export const LONG_BAND_KM = 3500;
export const SHORT_BAND_KM = 1500;

export function bandForDistance(km) {
  if (km <= SHORT_BAND_KM) return "short";
  if (km <= LONG_BAND_KM) return "medium";
  return "long";
}
