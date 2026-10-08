import FlightCheck from "@/components/FlightCheck";

export const metadata = {
  title: "Live flight status — is your flight delayed, and can you claim?",
  description: "Check any flight's live status by number and date, and instantly see whether a delay qualifies for UK261/EU261 compensation.",
  alternates: { canonical: "/flight-status/" },
};

export default function FlightStatusPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Is your flight delayed — and can you claim?</h1>
      <p className="mt-4 text-lg text-slate-700">
        Enter a flight number and date to pull its live status, then see instantly whether the delay crosses the 3-hour
        line that triggers UK261/EU261 compensation. Flights within the last six months can be looked up by number; for
        older flights, use the route calculator.
      </p>
      <div className="mt-6"><FlightCheck /></div>
    </div>
  );
}
