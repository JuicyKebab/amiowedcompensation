import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { SITE } from "@/lib/site";
import { RULES } from "@/lib/rules";

export const metadata = {
  title: "Free flight compensation claim letter template (UK261 / EU261)",
  description:
    "A free, ready-to-use claim letter for a delayed or cancelled flight under UK261 or EU261. Fill in the blanks, print or save as PDF, and send it to the airline yourself — keep 100% of the payout.",
  alternates: { canonical: "/claim-letter/" },
};

const uk = RULES.UK261, eu = RULES.EU261;

export default function ClaimLetter() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">
        Free flight-compensation claim letter
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        Claiming direct is free and keeps 100% of the payout. Copy the template below, fill in the{" "}
        <span className="rounded bg-amber-100 px-1">[highlighted]</span> parts, and send it to the airline&rsquo;s
        customer-relations address. No agency, no fee.
      </p>

      <div className="mt-6 flex flex-wrap gap-3 print:hidden">
        <PrintButton />
        <Link href="/#check" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:border-sky-600">
          Check what you&rsquo;re owed first
        </Link>
      </div>

      <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6 text-sm leading-relaxed text-slate-800 print:border-0 print:p-0">
        <p>[Your name]<br />[Your address]<br />[Email] · [Phone]</p>
        <p className="mt-4">[Date]</p>
        <p className="mt-4">[Airline name] — Customer Relations<br />[Airline address or claims email]</p>

        <p className="mt-6"><strong>Re: Compensation claim under {uk.label}/{eu.label} — flight [flight number], [date]</strong></p>

        <p className="mt-4">Dear Sir or Madam,</p>

        <p className="mt-4">
          I was a confirmed passenger on flight <span className="rounded bg-amber-100 px-1">[flight number]</span> from{" "}
          <span className="rounded bg-amber-100 px-1">[departure airport]</span> to{" "}
          <span className="rounded bg-amber-100 px-1">[arrival airport]</span> on{" "}
          <span className="rounded bg-amber-100 px-1">[date]</span>, booking reference{" "}
          <span className="rounded bg-amber-100 px-1">[booking ref]</span>.
        </p>

        <p className="mt-4">
          The flight was <span className="rounded bg-amber-100 px-1">[delayed by X hours on arrival / cancelled with
          less than 14 days&rsquo; notice]</span>. Under{" "}
          Regulation (EC) 261/2004 (as retained in UK law for UK departures), I am entitled to fixed compensation of{" "}
          <span className="rounded bg-amber-100 px-1">[{uk.symbol}{uk.bands.short} / {uk.symbol}{uk.bands.medium} / {uk.symbol}{uk.bands.long} or {eu.symbol}{eu.bands.short} / {eu.symbol}{eu.bands.medium} / {eu.symbol}{eu.bands.long}]</span>{" "}
          for this flight distance and delay.
        </p>

        <p className="mt-4">
          This compensation is separate from any refund or rerouting. To my knowledge the disruption was within your
          control and not caused by extraordinary circumstances. If you consider it was, please provide the specific
          reason and supporting evidence.
        </p>

        <p className="mt-4">
          Please pay <span className="rounded bg-amber-100 px-1">[amount]</span> to{" "}
          <span className="rounded bg-amber-100 px-1">[bank details / preferred method]</span> within 14 days. If I do
          not receive a satisfactory response, I will escalate to{" "}
          <span className="rounded bg-amber-100 px-1">[the UK Civil Aviation Authority / the relevant national
          enforcement body]</span> and, if necessary, pursue the claim further.
        </p>

        <p className="mt-4">Yours faithfully,</p>
        <p className="mt-4">[Your name]</p>
        <p className="mt-6 text-xs text-slate-500">
          Attach: boarding passes / booking confirmation. Keep a copy of this letter and any reply.
        </p>
      </section>

      <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 print:hidden">
        <p className="font-semibold text-slate-900">How to use it</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Check the amount for your flight on the <Link href="/#check" className="text-sky-700 hover:underline">home page</Link> (distance band + delay decide it).</li>
          <li>Fill in every <span className="rounded bg-amber-100 px-1">[highlighted]</span> field.</li>
          <li>Send it to the airline&rsquo;s customer-relations or claims email; keep proof of sending.</li>
          <li>No reply in 14 days, or a refusal you disagree with? Escalate to the regulator.</li>
        </ol>
        <p className="mt-3">
          Rather not do the paperwork? An agency can file it for a success fee — see your options on any{" "}
          <Link href="/flight-delay-compensation" className="text-sky-700 hover:underline">airline page</Link>.
        </p>
      </div>

      <p className="mt-6 text-xs text-slate-400">
        {SITE.name} provides general information on air passenger rights, not legal advice. Compensation is never
        guaranteed.
      </p>
    </div>
  );
}
