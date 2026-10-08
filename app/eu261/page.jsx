import Link from "next/link";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { RULES, VERIFIED } from "@/lib/rules";
import { absoluteUrl } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

const r = RULES.EU261;
export const metadata = {
  title: `EU261 compensation explained (${2026}): amounts, rules & how to claim`,
  description: `EU261 gives ${r.symbol}${r.bands.short}–${r.symbol}${r.bands.long} for delayed or cancelled flights from the EU. Who qualifies, how much, and how to claim for free.`,
  alternates: { canonical: "/eu261/" },
};

const faqs = [
  { q: "What is EU261?", a: "EU Regulation 261/2004 gives air passengers a fixed cash payment when a flight departing the EU (or arriving in the EU on an EU airline) is delayed 3+ hours at arrival, cancelled with under 14 days' notice, or overbooked, and the cause was within the airline's control." },
  { q: "How much is EU261 compensation?", a: `${r.symbol}${r.bands.short} for flights up to 1,500 km, ${r.symbol}${r.bands.medium} for 1,500–3,500 km, and ${r.symbol}${r.bands.long} for over 3,500 km. For 3–4 hour delays on the longest band the amount can be halved. Verified ${VERIFIED}.` },
  { q: "When is EU261 compensation not due?", a: "For extraordinary circumstances outside the airline's control (extreme weather, ATC strikes, security), or cancellations notified 14+ days ahead." },
  { q: "How do I claim EU261 compensation?", a: "Write to the airline citing Regulation 261/2004; if refused, escalate to the national enforcement body in the relevant EU country. Claiming yourself is free; agencies charge a success fee." },
];

export default function EU261() {
  const trail = [{ name: "Home", path: "/" }, { name: "EU261", path: "/eu261/" }];
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">EU261 flight compensation, explained</h1>
      <p className="mt-4 text-lg text-slate-700">
        If your flight departed the EU and was delayed 3+ hours on arrival or cancelled with under 14 days&rsquo; notice,
        EU261 entitles you to {r.symbol}{r.bands.short}–{r.symbol}{r.bands.long}, set by distance, unless the cause was
        outside the airline&rsquo;s control. (As of {VERIFIED}.)
      </p>
      <Faq faqs={faqs} />
      <p className="mt-6 text-sm text-slate-500">
        Compare with <Link href="/uk261" className="underline">UK261</Link> or see <Link href="/uk261-vs-eu261" className="underline">the differences</Link>. Source: <a className="underline" href={r.source} rel="nofollow">EU Reg 261/2004</a>.
      </p>
      <JsonLd data={articleJsonLd({ url: absoluteUrl("/eu261/"), headline: "EU261 flight compensation, explained", description: metadata.description, modified: VERIFIED })} />
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={faqJsonLd(faqs)} />
    </div>
  );
}
