import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { AIRLINES, pageSlug } from "@/data/airlines";
import { RULES, VERIFIED } from "@/lib/rules";
import { absoluteUrl } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/schema";

const uk = RULES.UK261, eu = RULES.EU261;

export const metadata = {
  title: `Flight delay & cancellation compensation (${2026}): UK261 & EU261 by airline`,
  description: `If your flight was delayed 3+ hours or cancelled, you could be owed ${uk.symbol}${uk.bands.short}–${uk.symbol}${uk.bands.long} (UK261) or ${eu.symbol}${eu.bands.short}–${eu.symbol}${eu.bands.long} (EU261). Check your flight and claim it free.`,
  alternates: { canonical: "/flight-delay-compensation/" },
};

export default function Pillar() {
  const trail = [{ name: "Home", path: "/" }, { name: "Flight delay compensation", path: "/flight-delay-compensation/" }];
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
        Flight delay &amp; cancellation compensation
      </h1>
      <p className="mt-4 text-lg text-slate-700">
        If your flight departed the UK or EU and was delayed 3 hours or more on arrival, or cancelled with less than 14
        days&rsquo; notice, you&rsquo;re likely owed a fixed cash payment — {uk.symbol}{uk.bands.short}–{uk.symbol}{uk.bands.long} under UK261 or {eu.symbol}{eu.bands.short}–{eu.symbol}{eu.bands.long} under EU261, by distance — unless the cause was outside the airline&rsquo;s control. (As of {VERIFIED}.)
      </p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/#check" className="rounded-md bg-sky-700 px-4 py-2 font-medium text-white hover:bg-sky-800">Check your flight</Link>
        <Link href="/uk261" className="rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:border-sky-600">UK261 rules</Link>
        <Link href="/eu261" className="rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:border-sky-600">EU261 rules</Link>
      </div>

      <h2 className="mt-10 text-2xl font-semibold text-slate-900">How much by flight distance</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-left text-slate-600">
              <th className="p-2.5">Distance</th><th className="p-2.5">UK261</th><th className="p-2.5">EU261</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr><td className="p-2.5">Up to 1,500 km</td><td className="p-2.5 tabular-nums">{uk.symbol}{uk.bands.short}</td><td className="p-2.5 tabular-nums">{eu.symbol}{eu.bands.short}</td></tr>
            <tr><td className="p-2.5">1,500–3,500 km</td><td className="p-2.5 tabular-nums">{uk.symbol}{uk.bands.medium}</td><td className="p-2.5 tabular-nums">{eu.symbol}{eu.bands.medium}</td></tr>
            <tr><td className="p-2.5">Over 3,500 km</td><td className="p-2.5 tabular-nums">{uk.symbol}{uk.bands.long}</td><td className="p-2.5 tabular-nums">{eu.symbol}{eu.bands.long}</td></tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-semibold text-slate-900">Compensation by airline</h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {AIRLINES.map((a) => (
          <li key={a.slug} className="rounded-lg border border-slate-200 bg-white p-4">
            <span className="font-medium text-slate-900">{a.name}</span>
            <span className="mt-1.5 flex gap-4 text-sm">
              <Link href={`/${pageSlug(a, "delay")}/`} className="text-sky-700 hover:underline">delay →</Link>
              <Link href={`/${pageSlug(a, "cancellation")}/`} className="text-sky-700 hover:underline">cancellation →</Link>
            </span>
          </li>
        ))}
      </ul>

      <JsonLd data={articleJsonLd({ url: absoluteUrl("/flight-delay-compensation/"), headline: "Flight delay & cancellation compensation", description: metadata.description, modified: VERIFIED })} />
      <JsonLd data={breadcrumbJsonLd(trail)} />
    </div>
  );
}
