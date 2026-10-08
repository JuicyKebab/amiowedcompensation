import Link from "next/link";
import FlightCheck from "@/components/FlightCheck";
import Calculator from "@/components/Calculator";
import { AIRLINES, pageSlug } from "@/data/airlines";
import { RULES } from "@/lib/rules";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  const uk = RULES.UK261, eu = RULES.EU261;
  return (
    <div className="mx-auto max-w-5xl px-4">
      <section className="py-12 sm:py-16">
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Was your flight delayed or cancelled? See what you&rsquo;re owed.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-slate-600">
          Check your exact flight against UK261 and EU261. If you qualify you could be owed {uk.symbol}{uk.bands.short}–{uk.symbol}{uk.bands.long} or {eu.symbol}{eu.bands.short}–{eu.symbol}{eu.bands.long}. We show the free do-it-yourself route next to the paid one. No account.
        </p>
      </section>

      <section id="check" className="scroll-mt-4">
        <h2 className="text-xl font-semibold text-slate-900">Check a flight (last ~6 months)</h2>
        <p className="mt-1 text-sm text-slate-500">Enter the flight number and date — we pull the live status.</p>
        <div className="mt-4"><FlightCheck /></div>
      </section>

      <section id="calculator" className="mt-12 scroll-mt-4">
        <h2 className="text-xl font-semibold text-slate-900">Or work it out by route</h2>
        <p className="mt-1 text-sm text-slate-500">For older flights, enter your route and how long you were delayed.</p>
        <div className="mt-4"><Calculator /></div>
      </section>

      <section className="mt-14">
        <h2 className="text-xl font-semibold text-slate-900">Compensation by airline</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {AIRLINES.map((a) => (
            <li key={a.slug} className="rounded-lg border border-slate-200 bg-white p-4">
              <span className="font-medium text-slate-900">{a.name} compensation</span>
              <span className="mt-1.5 flex gap-4 text-sm">
                <Link href={`/${pageSlug(a, "delay")}/`} className="text-sky-700 hover:underline">delay →</Link>
                <Link href={`/${pageSlug(a, "cancellation")}/`} className="text-sky-700 hover:underline">cancellation →</Link>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12 mb-4">
        <h2 className="text-xl font-semibold text-slate-900">Know the rules</h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/uk261" className="rounded-md border border-slate-200 bg-white px-4 py-2 hover:border-sky-600">UK261 explained</Link>
          <Link href="/eu261" className="rounded-md border border-slate-200 bg-white px-4 py-2 hover:border-sky-600">EU261 explained</Link>
          <Link href="/uk261-vs-eu261" className="rounded-md border border-slate-200 bg-white px-4 py-2 hover:border-sky-600">UK261 vs EU261</Link>
        </div>
      </section>
    </div>
  );
}
