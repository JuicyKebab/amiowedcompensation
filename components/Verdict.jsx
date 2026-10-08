import { AFFILIATE } from "@/lib/site";
import { VERIFIED } from "@/lib/rules";

const REASONS = {
  route_not_covered: "This route isn't covered by UK261 or EU261 (it didn't depart the UK/EU, and wasn't a UK/EU airline arriving into the UK/EU).",
  delay_under_3h: "Arrival delays under 3 hours don't qualify for compensation (you may still be owed care, like meals or a hotel).",
  notice_14d_or_more: "Cancellations with 14+ days' notice don't qualify for compensation.",
  insufficient_input: "Enter the delay length (or mark it cancelled) to get a verdict.",
};

// Presentational; rendered inside client components. Always shows the free DIY route first.
export default function Verdict({ result }) {
  if (!result) return null;
  const { eligible } = result;

  if (eligible === true) {
    return (
      <div className="mt-6 rounded-xl border border-emerald-200 bg-emerald-50 p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">You may be owed</p>
        <p className="mt-1 text-4xl font-bold text-emerald-800 tabular-nums">
          {result.symbol}{result.amount}
        </p>
        <p className="mt-1 text-sm text-emerald-900">
          under {result.label}{result.reduced ? " (reduced 50% — 3–4h delay on the longest band)" : ""}.{" "}
          <span className="text-emerald-700">Amounts verified {VERIFIED}.</span>
        </p>
        <p className="mt-3 text-sm text-slate-700">
          This assumes the {result.trigger === "cancellation" ? "cancellation" : "delay"} was within the airline's
          control. No compensation is due for <strong>extraordinary circumstances</strong> (extreme weather, ATC
          strikes, security). You may be owed this whether or not you also get a refund.
        </p>
        <Routes />
      </div>
    );
  }

  if (eligible === false) {
    return (
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">Likely not eligible</p>
        <p className="mt-2 text-slate-800">{REASONS[result.reasonCode] || "Not eligible on the information given."}</p>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-5">
      <p className="text-slate-700">{REASONS[result.reasonCode] || "Enter a bit more detail for a verdict."}</p>
    </div>
  );
}

function Routes() {
  return (
    <div className="mt-5 grid gap-3 sm:grid-cols-2">
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="font-semibold text-slate-900">Claim it yourself — free</p>
        <p className="mt-1 text-sm text-slate-600">
          Write to the airline citing UK261/EU261 with your flight details. If refused, escalate to the CAA (UK) or the
          national enforcement body (EU). Keeps 100% of the payout.
        </p>
        <a href="/claim-letter/" className="mt-2 inline-block text-sm font-medium text-sky-700 hover:underline">
          Use our free claim letter →
        </a>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <p className="font-semibold text-slate-900">Let an agency handle it</p>
        <p className="mt-1 text-sm text-slate-600">{AFFILIATE.feeNote}</p>
        <a
          href={AFFILIATE.airhelp || AFFILIATE.compensair}
          rel="sponsored nofollow"
          target="_blank"
          className="mt-2 inline-block rounded-md bg-sky-700 px-3 py-1.5 text-sm font-medium text-white hover:bg-sky-800"
        >
          Start a claim with an agency
        </a>
      </div>
      <p className="sm:col-span-2 text-xs text-slate-400">{AFFILIATE.disclosure}</p>
    </div>
  );
}
