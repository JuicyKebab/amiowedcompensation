import JsonLd from "@/components/JsonLd";
import { RULES, VERIFIED } from "@/lib/rules";
import { absoluteUrl } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";

const uk = RULES.UK261, eu = RULES.EU261;
export const metadata = {
  title: "UK261 vs EU261: what's the difference?",
  description: "UK261 and EU261 are near-identical post-Brexit, but amounts are in £ vs €, apply to different departure points, and are enforced by different bodies. Side-by-side comparison.",
  alternates: { canonical: "/uk261-vs-eu261/" },
};

export default function Compare() {
  const trail = [{ name: "Home", path: "/" }, { name: "UK261 vs EU261", path: "/uk261-vs-eu261/" }];
  const rows = [
    ["Applies to", "Flights departing the UK; arrivals into the UK on UK/EU airlines", "Flights departing the EU; arrivals into the EU on EU airlines"],
    ["Currency", "Pounds (£)", "Euros (€)"],
    ["Short (≤1,500 km)", `${uk.symbol}${uk.bands.short}`, `${eu.symbol}${eu.bands.short}`],
    ["Medium (1,500–3,500 km)", `${uk.symbol}${uk.bands.medium}`, `${eu.symbol}${eu.bands.medium}`],
    ["Long (>3,500 km)", `${uk.symbol}${uk.bands.long}`, `${eu.symbol}${eu.bands.long}`],
    ["Delay threshold", "3 hours at arrival", "3 hours at arrival"],
    ["Enforcer", "Civil Aviation Authority (CAA)", "National enforcement body per country"],
  ];
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">UK261 vs EU261</h1>
      <p className="mt-4 text-lg text-slate-700">
        After Brexit the UK kept EU261 almost word-for-word as UK261. The rules and thresholds match; the differences are
        which flights each covers, the currency, and who enforces it. (As of {VERIFIED}.)
      </p>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-left text-slate-600">
              <th className="p-2.5"></th><th className="p-2.5">UK261</th><th className="p-2.5">EU261</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {rows.map((row, i) => (
              <tr key={i}><td className="p-2.5 font-medium text-slate-700">{row[0]}</td><td className="p-2.5 tabular-nums">{row[1]}</td><td className="p-2.5 tabular-nums">{row[2]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <JsonLd data={articleJsonLd({ url: absoluteUrl("/uk261-vs-eu261/"), headline: "UK261 vs EU261", description: metadata.description, modified: VERIFIED })} />
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </div>
  );
}
