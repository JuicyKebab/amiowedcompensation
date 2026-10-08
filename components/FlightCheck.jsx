"use client";
import { useState } from "react";
import Link from "next/link";
import { assess } from "@/lib/engine";
import { haversineKm } from "@/lib/distance";
import { AIRPORTS } from "@/data/airports";
import { AIRLINES } from "@/data/airlines";
import Verdict from "@/components/Verdict";

function carrierRegionFromFlight(flight) {
  const code = (flight || "").toUpperCase().slice(0, 2);
  const a = AIRLINES.find((x) => x.iata === code);
  return a ? a.region : "EU"; // conservatieve fallback
}

export default function FlightCheck() {
  const [flight, setFlight] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState(null);
  const [result, setResult] = useState(null);

  async function check(e) {
    e.preventDefault();
    setLoading(true); setMsg(null); setResult(null);
    try {
      const res = await fetch(`/api/flight-status?flight=${encodeURIComponent(flight)}&date=${encodeURIComponent(date)}`);
      const data = await res.json();
      if (!data.found) {
        setMsg("We couldn't fetch that flight (older than ~6 months, or not found). Use the calculator below with your route and delay.");
        return;
      }
      const dep = AIRPORTS[data.departureIata], arr = AIRPORTS[data.arrivalIata];
      if (!dep || !arr) {
        const d = data.delayMinutes != null ? `${Math.round(data.delayMinutes / 60 * 10) / 10}h` : "unknown";
        setMsg(`Found ${data.flight}: status ${data.status || "?"}, delay ${d}. We don't have both airports on file for an automatic verdict — use the calculator below.`);
        return;
      }
      setResult(assess({
        departureRegion: dep.region,
        arrivalRegion: arr.region,
        carrierRegion: carrierRegionFromFlight(data.flight),
        distanceKm: haversineKm(dep, arr),
        cancelled: data.cancelled,
        delayHours: data.delayMinutes != null ? data.delayMinutes / 60 : null,
      }));
    } catch {
      setMsg("Live lookup is unavailable right now. Use the calculator below.");
    } finally {
      setLoading(false);
    }
  }

  const field = "w-full rounded-md border border-slate-300 px-3 py-2 text-base";
  return (
    <form onSubmit={check} className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Flight number</span>
          <input value={flight} onChange={(e) => setFlight(e.target.value)} placeholder="e.g. BA432" required className={field} />
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">Date</span>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className={field} />
        </label>
        <button disabled={loading} className="rounded-md bg-sky-700 px-4 py-2.5 font-medium text-white hover:bg-sky-800 disabled:opacity-60">
          {loading ? "Checking…" : "Check flight"}
        </button>
      </div>
      {msg && (
        <p className="mt-4 rounded-md bg-amber-50 p-3 text-sm text-amber-900">
          {msg} <Link href="/#calculator" className="font-medium underline">Go to calculator</Link>
        </p>
      )}
      <Verdict result={result} />
    </form>
  );
}
