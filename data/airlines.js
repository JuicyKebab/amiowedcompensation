// v1 airline-registry (UK-markt). region = nationaliteit vervoerder (UK/EU/OTHER), bepaalt mee
// of EU261/UK261 geldt bij aankomst van buiten de EU/UK.
// Per-airline UNIEKE velden (type/hubs/site/note) breken de pSEO-template -> elke pagina
// krijgt eigen, feitelijke content i.p.v. enkel een naam-substitutie. Geen verzonnen cijfers.
export const AIRLINES = [
  {
    slug: "british-airways", name: "British Airways", iata: "BA", region: "UK",
    type: "the UK's full-service flag carrier", hubs: ["London Heathrow", "London Gatwick"],
    site: "https://www.britishairways.com",
    note: "British Airways flies a full-service network, so most BA flights from the UK fall under UK261 and most from the EU under EU261.",
  },
  {
    slug: "ryanair", name: "Ryanair", iata: "FR", region: "EU",
    type: "Ireland's low-cost carrier and Europe's largest airline by passengers", hubs: ["Dublin", "London Stansted"],
    site: "https://www.ryanair.com",
    note: "As an EU (Irish) airline, Ryanair's flights from the EU are covered by EU261 and from the UK by UK261. Ryanair is known for firmly contesting claims it considers extraordinary circumstances, so keep the airline's stated reason.",
  },
  {
    slug: "easyjet", name: "easyJet", iata: "U2", region: "UK",
    type: "a UK-based low-cost carrier", hubs: ["London Gatwick", "London Luton"],
    site: "https://www.easyjet.com",
    note: "easyJet flies short-haul across the UK and Europe; its UK departures fall under UK261 and its EU departures under EU261, almost always in the lower distance bands.",
  },
  {
    slug: "jet2", name: "Jet2", iata: "LS", region: "UK",
    type: "a UK leisure airline flying mainly to holiday destinations", hubs: ["Manchester", "Leeds Bradford"],
    site: "https://www.jet2.com",
    note: "Jet2.com flies UK holidaymakers to the Mediterranean and beyond; UK departures fall under UK261 even when the flight is part of a Jet2holidays package.",
  },
  {
    slug: "tui", name: "TUI Airways", iata: "BY", region: "UK",
    type: "a UK leisure and charter airline", hubs: ["London Gatwick", "Manchester"],
    site: "https://www.tui.co.uk",
    note: "TUI Airways operates charter and package-holiday flights; UK261/EU261 compensation applies on top of any package-travel rights you may also have.",
  },
  {
    slug: "wizz-air", name: "Wizz Air", iata: "W6", region: "EU",
    type: "a Hungarian low-cost carrier", hubs: ["London Luton", "Budapest"],
    site: "https://wizzair.com",
    note: "As an EU (Hungarian) airline, Wizz Air's EU departures are covered by EU261 and its UK departures by UK261.",
  },
  {
    slug: "virgin-atlantic", name: "Virgin Atlantic", iata: "VS", region: "UK",
    type: "a UK long-haul carrier", hubs: ["London Heathrow", "Manchester"],
    site: "https://www.virginatlantic.com",
    note: "Virgin Atlantic flies mostly long-haul, so its routes usually sit in the over-3,500 km band — the highest compensation tier. UK departures fall under UK261.",
  },
  {
    slug: "lufthansa", name: "Lufthansa", iata: "LH", region: "EU",
    type: "Germany's full-service flag carrier", hubs: ["Frankfurt", "Munich"],
    site: "https://www.lufthansa.com",
    note: "As an EU (German) airline, Lufthansa's EU departures are covered by EU261 and its UK departures by UK261.",
  },
  {
    slug: "emirates", name: "Emirates", iata: "EK", region: "OTHER",
    type: "a UAE (non-EU/UK) long-haul carrier", hubs: ["Dubai"],
    site: "https://www.emirates.com",
    note: "This is the key nuance for Emirates: UK261/EU261 apply only when your Emirates flight departs an EU or UK airport. An Emirates flight into the UK or EU from Dubai is not covered, because the rules do not extend to non-EU/UK airlines arriving from outside.",
  },
  {
    slug: "aer-lingus", name: "Aer Lingus", iata: "EI", region: "EU",
    type: "Ireland's flag carrier", hubs: ["Dublin"],
    site: "https://www.aerlingus.com",
    note: "As an EU (Irish) airline, Aer Lingus's EU departures are covered by EU261 and its UK departures by UK261.",
  },
];

export const SCENARIOS = ["delay", "cancellation"];

export function getAirline(slug) {
  return AIRLINES.find((a) => a.slug === slug) || null;
}

export function pageSlug(airline, scenario) {
  return `${airline.slug}-flight-${scenario === "cancellation" ? "cancellation" : "delay"}-compensation`;
}

export function allAirlinePages() {
  const out = [];
  for (const a of AIRLINES) for (const s of SCENARIOS) out.push({ slug: pageSlug(a, s), airline: a, scenario: s });
  return out;
}

export function findAirlinePage(slug) {
  return allAirlinePages().find((p) => p.slug === slug) || null;
}

// Zusterairlines voor interne cross-links (roterend venster, gelijkmatige link-equity).
export function siblingAirlines(slug, n = 5) {
  const i = AIRLINES.findIndex((a) => a.slug === slug);
  if (i < 0) return AIRLINES.slice(0, n);
  return [...AIRLINES.slice(i + 1), ...AIRLINES.slice(0, i)].slice(0, n);
}
