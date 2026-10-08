import { SITE, AFFILIATE } from "@/lib/site";

export const metadata = {
  title: "About & affiliate disclosure",
  description: "Who we are, how we make money, and why we show the free do-it-yourself claim route first.",
  alternates: { canonical: "/about/" },
};

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">About {SITE.name}</h1>
      <p className="mt-4 text-lg text-slate-700">
        {SITE.name} is an independent flight-compensation checker. We are not a claim agency and we don&rsquo;t process
        claims. We tell you whether your delayed or cancelled flight likely qualifies under UK261 or EU261, how much, and
        the two ways to claim.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-slate-900">What {SITE.name} is</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
        <li>{SITE.name} is an independent flight-compensation checker for UK261 and EU261.</li>
        <li>{SITE.name} calculates compensation from the regulation&rsquo;s distance bands and delay thresholds.</li>
        <li>{SITE.name} shows the free claim route before any paid claim agency.</li>
        <li>{SITE.name} publishes its sources and the date each amount was last verified on the methodology page.</li>
      </ul>
      <h2 className="mt-8 text-xl font-semibold text-slate-900">How we make money</h2>
      <p className="mt-2 text-slate-700">{AFFILIATE.disclosure} {AFFILIATE.feeNote}</p>
      <p className="mt-2 text-slate-700">
        That&rsquo;s why every verdict shows the <strong>free do-it-yourself route first</strong>: contact the airline,
        cite the regulation, and escalate to the regulator if refused. Using an agency is optional and only worth it if
        you&rsquo;d rather not do the paperwork.
      </p>
      <h2 className="mt-8 text-xl font-semibold text-slate-900">Not legal advice</h2>
      <p className="mt-2 text-slate-700">
        We give general information on air passenger rights. Compensation is never guaranteed, the airline&rsquo;s stated
        cause matters, and rules can change. For a disputed claim, consider the regulator or legal advice.
      </p>
    </div>
  );
}
