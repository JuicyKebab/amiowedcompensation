import Link from "next/link";
import { notFound } from "next/navigation";
import Faq from "@/components/Faq";
import JsonLd from "@/components/JsonLd";
import { allAirlinePages, findAirlinePage, siblingAirlines, pageSlug } from "@/data/airlines";
import { buildAirlinePage } from "@/lib/content";
import { RULES, VERIFIED } from "@/lib/rules";
import { SITE, absoluteUrl } from "@/lib/site";
import { articleJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/schema";

export const dynamicParams = false;

export function generateStaticParams() {
  return allAirlinePages().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = findAirlinePage(slug);
  if (!page) return {};
  const c = buildAirlinePage(page.airline, page.scenario);
  return { title: c.title, description: c.description, alternates: { canonical: `/${slug}/` } };
}

export default async function AirlinePage({ params }) {
  const { slug } = await params;
  const page = findAirlinePage(slug);
  if (!page) notFound();
  const { airline, scenario } = page;
  const c = buildAirlinePage(airline, scenario);
  const uk = RULES.UK261, eu = RULES.EU261;
  const url = absoluteUrl(`/${slug}/`);
  const trail = [
    { name: "Home", path: "/" },
    { name: c.h1, path: `/${slug}/` },
  ];
  const counterpart = scenario === "delay" ? "cancellation" : "delay";
  const counterpartSlug = pageSlug(airline, counterpart);
  const siblings = siblingAirlines(airline.slug, 5);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <nav className="text-sm text-slate-500">
        <Link href="/" className="hover:text-sky-700">Home</Link> <span>/</span> <span className="text-slate-700">{c.h1}</span>
      </nav>

      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">{c.h1}</h1>
      <p className="mt-4 text-lg text-slate-700">{c.lead}</p>

      <div className="mt-6 flex flex-wrap gap-3 text-sm">
        <Link href="/#check" className="rounded-md bg-sky-700 px-4 py-2 font-medium text-white hover:bg-sky-800">Check this flight</Link>
        <Link href="/#calculator" className="rounded-md border border-slate-300 px-4 py-2 font-medium text-slate-700 hover:border-sky-600">Work it out by route</Link>
      </div>

      <h2 className="mt-10 text-2xl font-semibold text-slate-900">How much can you claim?</h2>
      <div className="mt-3 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-slate-100 text-left text-slate-600">
              <th className="p-2.5">Flight distance</th>
              <th className="p-2.5">UK261</th>
              <th className="p-2.5">EU261</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            <tr><td className="p-2.5">Up to 1,500 km</td><td className="p-2.5 tabular-nums">{uk.symbol}{uk.bands.short}</td><td className="p-2.5 tabular-nums">{eu.symbol}{eu.bands.short}</td></tr>
            <tr><td className="p-2.5">1,500–3,500 km</td><td className="p-2.5 tabular-nums">{uk.symbol}{uk.bands.medium}</td><td className="p-2.5 tabular-nums">{eu.symbol}{eu.bands.medium}</td></tr>
            <tr><td className="p-2.5">Over 3,500 km</td><td className="p-2.5 tabular-nums">{uk.symbol}{uk.bands.long}</td><td className="p-2.5 tabular-nums">{eu.symbol}{eu.bands.long}</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-sm text-slate-500">
        Fixed amounts by distance. For 3–4 hour delays on the longest band the amount can be halved. Amounts verified {VERIFIED} · sources:{" "}
        <a className="underline" href={uk.source} rel="nofollow">CAA</a>, <a className="underline" href={eu.source} rel="nofollow">EU Reg 261/2004</a>.
      </p>

      <h2 className="mt-10 text-2xl font-semibold text-slate-900">Does UK261 or EU261 apply to {airline.name}?</h2>
      <p className="mt-3 text-pretty text-slate-700">{c.regimeNote}</p>

      <h2 className="mt-10 text-2xl font-semibold text-slate-900">Common questions about {airline.name} compensation</h2>
      <Faq faqs={c.faqs} />

      <p className="mt-8 text-sm text-slate-500">
        {SITE.name} gives general information, not legal advice. Check {airline.name}&rsquo;s stated reason before claiming.
      </p>

      <section className="mt-10 rounded-xl border border-sky-200 bg-sky-50 p-5">
        <h2 className="text-xl font-semibold text-slate-900">Check your {airline.name} flight</h2>
        <p className="mt-1 text-sm text-slate-600">See the exact amount for your flight in seconds.</p>
        <div className="mt-3 flex flex-wrap gap-3 text-sm">
          <Link href="/#check" className="rounded-md bg-sky-700 px-4 py-2 font-medium text-white hover:bg-sky-800">Check by flight number</Link>
          <Link href="/#calculator" className="rounded-md border border-slate-300 bg-white px-4 py-2 font-medium text-slate-700 hover:border-sky-600">Work it out by route</Link>
        </div>
      </section>

      <section className="mt-12 border-t border-slate-200 pt-8">
        <h2 className="text-xl font-semibold text-slate-900">Related</h2>
        <p className="mt-3 text-slate-700">
          Also see{" "}
          <Link href={`/${counterpartSlug}/`} className="font-medium text-sky-700 underline">
            {airline.name} flight {counterpart} compensation
          </Link>
          , or the rules: <Link href="/uk261" className="text-sky-700 underline">UK261</Link> and{" "}
          <Link href="/eu261" className="text-sky-700 underline">EU261</Link>.
        </p>
        <h3 className="mt-5 text-sm font-semibold uppercase tracking-wide text-slate-500">Other airlines</h3>
        <ul className="mt-3 flex flex-wrap gap-2">
          {siblings.map((s) => (
            <li key={s.slug}>
              <Link href={`/${pageSlug(s, "delay")}/`} className="inline-block rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-sm hover:border-sky-600">
                {s.name} delay compensation
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <JsonLd data={articleJsonLd({ url, headline: c.h1, description: c.description, modified: VERIFIED, airline })} />
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <JsonLd data={faqJsonLd(c.faqs)} />
    </div>
  );
}
