// Genereert per airline x scenario UNIEKE content uit de registry + regels. Dated + bronvermeld.
// Elke pagina heeft airline-specifieke secties (type, hubs, carrier-regime-nuance, eigen claim-link)
// bovenop de gedeelde referentie-tabel -> breekt de pSEO-template (geen 93% duplicatie meer).
import { RULES, VERIFIED } from "./rules.js";

const UK = RULES.UK261, EU = RULES.EU261;
const RANGE_UK = `${UK.symbol}${UK.bands.short}–${UK.symbol}${UK.bands.long}`;
const RANGE_EU = `${EU.symbol}${EU.bands.short}–${EU.symbol}${EU.bands.long}`;

export function scenarioWord(scenario) {
  return scenario === "cancellation" ? "cancelled" : "delayed";
}

function hubsLine(a) {
  if (!a.hubs?.length) return "";
  const h = a.hubs.length === 1 ? a.hubs[0] : `${a.hubs.slice(0, -1).join(", ")} and ${a.hubs[a.hubs.length - 1]}`;
  return `${a.name} mainly flies from ${h}.`;
}

export function buildAirlinePage(airline, scenario) {
  const a = airline.name;
  const delayed = scenarioWord(scenario);
  const trigger =
    scenario === "cancellation" ? "cancelled with less than 14 days' notice" : "delayed 3 hours or more on arrival";
  const noun = scenario === "cancellation" ? "cancellation" : "delay";
  const year = 2026;

  const title = `${a} flight ${noun} compensation (${year}): how much you can claim`;
  const description = `Was your ${a} flight ${delayed}? ${a} is ${airline.type}. Check if you're owed ${RANGE_UK} (UK261) or ${RANGE_EU} (EU261), how much, and how to claim for free.`;
  const h1 = `${a} flight ${noun} compensation`;

  // Airline-specifieke intro (type + hubs + regime-nuance).
  const lead = `${a} is ${airline.type}. If your ${a} flight was ${trigger} and it departed the UK or the EU, you're likely entitled to ${RANGE_UK} under UK261 or ${RANGE_EU} under EU261, set by flight distance, unless the cause was an extraordinary circumstance outside the airline's control. ${hubsLine(airline)} (As of ${VERIFIED}.)`;

  // Grootste differentiator: carrier-specifieke regime-uitleg.
  const regimeNote = airline.note;

  const claimLine = `You can claim from ${a} for free: contact the airline in writing via its customer-service or flight-disruption page (${airline.site}), cite UK261/EU261 and your flight details, and if refused escalate to the CAA (UK) or the relevant national enforcement body (EU). A claim agency can do it for a success fee (typically 15–35%).`;

  const faqs = [
    {
      q: `Am I entitled to compensation for a ${delayed} ${a} flight?`,
      a: `Yes, if your ${a} flight was ${trigger} at your final destination, it departed the UK (UK261) or the EU (EU261), and the cause was within ${a}'s control. ${a} is ${airline.type}, so this covers its typical routes from ${airline.hubs?.[0] || "its hubs"}.`,
    },
    {
      q: `Does UK261 or EU261 apply to ${a}?`,
      a: regimeNote,
    },
    {
      q: `How much compensation can I get for a ${delayed} ${a} flight?`,
      a: `Under UK261: ${UK.symbol}${UK.bands.short} up to 1,500 km, ${UK.symbol}${UK.bands.medium} for 1,500–3,500 km, ${UK.symbol}${UK.bands.long} over 3,500 km. Under EU261: ${EU.symbol}${EU.bands.short} / ${EU.symbol}${EU.bands.medium} / ${EU.symbol}${EU.bands.long} for the same bands. For 3–4 hour delays on the longest band the amount can be halved. Verified ${VERIFIED}.`,
    },
    {
      q: `What if my ${a} ${noun} was caused by weather or a strike?`,
      a: `No compensation is due when the cause was an extraordinary circumstance outside ${a}'s control (extreme weather, air traffic control strikes, security risks). It remains due for causes within the airline's control such as routine technical faults or crew scheduling. Check ${a}'s stated reason first.`,
    },
    {
      q: `Which airports does ${a} fly from?`,
      a: `${hubsLine(airline)} Compensation depends on the flight's distance band and whether it departed the UK or EU, not on the specific airport.`,
    },
    {
      q: `How do I claim compensation from ${a}?`,
      a: claimLine,
    },
  ];

  return { title, description, h1, lead, regimeNote, hubsLine: hubsLine(airline), claimLine, faqs };
}
