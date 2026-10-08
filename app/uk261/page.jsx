import Link from "next/link";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { RULES, VERIFIED } from "@/lib/rules";
import { absoluteUrl } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

const r = RULES.UK261;
export const metadata = {
  title: `UK261 compensation explained (${2026}): amounts, rules & how to claim`,
  description: `UK261 gives ${r.symbol}${r.bands.short}–${r.symbol}${r.bands.long} for delayed or cancelled flights from the UK. Who qualifies, how much, and how to claim for free.`,
  alternates: { canonical: "/uk261/" },
};

const faqs = [
  { q: "What is UK261?", a: "UK261 is the UK's retained version of EU Regulation 261/2004 after Brexit. It gives passengers a fixed cash payment when a flight departing the UK (or arriving in the UK on a UK/EU airline) is delayed 3+ hours, cancelled with under 14 days' notice, or overbooked, and the cause was within the airline's control." },
  { q: `How much is UK261 compensation?`, a: `${r.symbol}${r.bands.short} for flights up to 1,500 km, ${r.symbol}${r.bands.medium} for 1,500–3,500 km, and ${r.symbol}${r.bands.long} for over 3,500 km. For 3–4 hour delays on the longest band the amount can be halved. Verified ${VERIFIED}.` },
  { q: "When do I not get UK261 compensation?", a: "When the delay or cancellation was caused by an extraordinary circumstance outside the airline's control (extreme weather, air traffic control strikes, security risks), or when a cancellation was notified 14+ days ahead." },
  { q: "How do I claim UK261 compensation?", a: "Write to the airline citing UK261 with your flight details; if refused, escalate to the Civil Aviation Authority (CAA) or an alternative dispute resolution body. It's free to claim yourself; agencies will do it for a success fee." },
];

export default function UK261() {
  const trail = [{ name: "Home", path: "/" }, { name: "UK261", path: "/uk261/" }];
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">UK261 flight compensation, explained</h1>
      <p className="mt-4 text-lg text-slate-700">
        If your flight departed the UK and was delayed 3+ hours or cancelled with under 14 days&rsquo; notice, UK261
        entitles you to {r.symbol}{r.bands.short}–{r.symbol}{r.bands.long}, set by distance, unless the cause was outside
        the airline&rsquo;s control. (As of {VERIFIED}.)
      </p>
      <Faq faqs={faqs} />
      <p className="mt-6 text-sm text-slate-500">
        Compare with <Link href="/eu261" className="underline">EU261</Link> or see <Link href="/uk261-vs-eu261" className="underline">the differences</Link>. Source: <a className="underline" href={r.source} rel="nofollow">CAA</a>.
      </p>
      <JsonLd data={articleJsonLd({ url: absoluteUrl("/uk261/"), headline: "UK261 flight compensation, explained", description: metadata.description, modified: VERIFIED })} />
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={faqJsonLd(faqs)} />
    </div>
  );
}
