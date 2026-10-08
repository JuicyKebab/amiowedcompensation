import { RULES, VERIFIED } from "@/lib/rules";

export const metadata = {
  title: "Methodology — how we calculate compensation",
  description: "How our checker decides eligibility and amounts under UK261/EU261, our data sources, and the honest limits.",
  alternates: { canonical: "/methodology/" },
};

export default function Methodology() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Methodology</h1>
      <p className="mt-4 text-lg text-slate-700">How the verdict is produced, and where its limits are. (As of {VERIFIED}.)</p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Eligibility</h2>
      <p className="mt-2 text-slate-700">
        We apply the rule for the departure region: flights from the UK fall under UK261, flights from the EU under EU261,
        and flights into the UK/EU on a UK/EU airline are covered too. A claim is likely when arrival delay is 3 hours or
        more (or the flight was cancelled with under 14 days&rsquo; notice) and the cause was within the airline&rsquo;s
        control.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Amounts</h2>
      <p className="mt-2 text-slate-700">
        Fixed by great-circle flight distance: {RULES.UK261.symbol}{RULES.UK261.bands.short}/{RULES.UK261.symbol}{RULES.UK261.bands.medium}/{RULES.UK261.symbol}{RULES.UK261.bands.long} (UK261) and {RULES.EU261.symbol}{RULES.EU261.bands.short}/{RULES.EU261.symbol}{RULES.EU261.bands.medium}/{RULES.EU261.symbol}{RULES.EU261.bands.long} (EU261) for the up-to-1,500 km, 1,500–3,500 km and over-3,500 km bands. Delays of 3–4 hours on the longest band can be halved.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Data sources</h2>
      <p className="mt-2 text-slate-700">
        Rules from the UK CAA and EU Regulation 261/2004. Live flight status from a third-party aviation data provider
        (recent flights). Distances computed from published airport coordinates.
      </p>

      <h2 className="mt-8 text-xl font-semibold text-slate-900">Honest limits</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
        <li>Live lookup covers roughly the last 6 months; older flights use the manual calculator.</li>
        <li>We cannot see the airline&rsquo;s reason, so &ldquo;extraordinary circumstances&rdquo; can void an otherwise-eligible claim. Our verdict is a likelihood, not a guarantee.</li>
        <li>Amounts and rules can change (EU261 is under review); we date every figure and re-verify it.</li>
      </ul>
    </div>
  );
}
