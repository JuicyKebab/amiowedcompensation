import { SITE } from "@/lib/site";

export const metadata = { title: "Privacy", description: "How we handle data.", alternates: { canonical: "/privacy/" } };

export default function Privacy() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900">Privacy</h1>
      <p className="mt-4 text-slate-700">
        {SITE.name} needs no account and asks for no personal details to give you a verdict. A flight-status check sends
        only the flight number and date to our server to fetch public flight data; we don&rsquo;t store it against you.
        If you follow a link to a claim agency, their own privacy terms apply.
      </p>
      <p className="mt-3 text-slate-700">
        We may use privacy-friendly, aggregate analytics to understand which pages are useful. We don&rsquo;t sell data.
        Questions: see the contact on our About page.
      </p>
    </div>
  );
}
