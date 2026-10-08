import { SITE } from "@/lib/site";
import { RULES, VERIFIED } from "@/lib/rules";

export const metadata = {
  title: "Changelog — rule & amount updates",
  description: "Every change we make to UK261/EU261 amounts, thresholds and sources, with the date verified. We date and re-check every figure.",
  alternates: { canonical: "/changelog/" },
};

// Nieuwste eerst. Voeg een item toe bij elke regel-/bedragwijziging of bronupdate; werk VERIFIED in lib/rules.js bij.
const ENTRIES = [
  {
    date: VERIFIED,
    title: "Amounts verified",
    items: [
      `UK261 bands confirmed at ${RULES.UK261.symbol}${RULES.UK261.bands.short} / ${RULES.UK261.symbol}${RULES.UK261.bands.medium} / ${RULES.UK261.symbol}${RULES.UK261.bands.long} against the ${RULES.UK261.authority}.`,
      `EU261 bands confirmed at ${RULES.EU261.symbol}${RULES.EU261.bands.short} / ${RULES.EU261.symbol}${RULES.EU261.bands.medium} / ${RULES.EU261.symbol}${RULES.EU261.bands.long} against Regulation (EC) 261/2004.`,
      "3-hour arrival-delay threshold and 14-day cancellation-notice rule in effect.",
    ],
  },
  {
    date: "2026-10-05",
    title: `${SITE.name} launched`,
    items: [
      "Live flight-status check (recent flights) plus a manual route calculator for older flights.",
      "Per-airline delay and cancellation guides for UK261 and EU261.",
    ],
  },
];

export default function Changelog() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Changelog</h1>
      <p className="mt-4 text-lg text-slate-700">
        Air passenger rights change, and EU261 is under review. We date every figure on {SITE.name} and log each update
        here so you can see exactly what changed and when.
      </p>
      <div className="mt-8 space-y-8">
        {ENTRIES.map((e) => (
          <section key={e.date + e.title}>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              <time dateTime={e.date}>{e.date}</time> — {e.title}
            </h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
              {e.items.map((it, i) => <li key={i}>{it}</li>)}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
