// Alles wat bij domein/naamwissel verandert staat hier. Domeinnaam wordt morgen gekozen:
// zet NEXT_PUBLIC_SITE_URL in de env of pas de fallback hier aan.
export const SITE = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "FlightComp",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://flightcomp.example").replace(/\/$/, ""),
  tagline: "Check your flight delay or cancellation compensation",
  market: "UK", // v1 is UK-first (UK261 + EU261)
};

// Entity-profielen (sameAs) voor het Organization-schema: komma-gescheiden URLs in env, na aanmaken socials/Crunchbase/etc.
export const SAME_AS = (process.env.NEXT_PUBLIC_SAME_AS || "").split(",").map((s) => s.trim()).filter(Boolean);

// Affiliate-links (zet de echte tracking-URL in de env na Compensair/AirHelp-approval).
// DIY-route wordt ALTIJD eerst getoond; dit is de betaalde optie met fee erbij.
export const AFFILIATE = {
  compensair: process.env.NEXT_PUBLIC_AFF_COMPENSAIR || "https://compensair.com/",
  airhelp: process.env.NEXT_PUBLIC_AFF_AIRHELP || "",
  feeNote: "Claim agencies charge a success fee, typically 15–35% of the payout.",
  disclosure:
    "We're independent and not a claim agency. Claiming direct is free; if you choose an agency through a link here we may earn a commission, at no extra cost to you. It never changes our verdict.",
};

export function absoluteUrl(pathname = "/") {
  return `${SITE.url}${pathname.startsWith("/") ? pathname : `/${pathname}`}`;
}
