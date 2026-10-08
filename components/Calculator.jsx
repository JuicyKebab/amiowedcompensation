"use client";
import { useState } from "react";
import { assess } from "@/lib/engine";
import { haversineKm } from "@/lib/distance";
import { AIRPORTS, AIRPORT_LIST } from "@/data/airports";
import Verdict from "@/components/Verdict";

export default function Calculator() {
  const [dep, setDep] = useState("LHR");
  const [arr, setArr] = useState("JFK");
  const [carrier, setCarrier] = useState("UK");
  const [mode, setMode] = useState("delay");
  const [delay, setDelay] = useState("3");
  const [notice, setNotice] = useState("0");
  const [result, setResult] = useState(null);

  function compute(e) {
    e.preventDefault();
    const a = AIRPORTS[dep], b = AIRPORTS[arr];
    if (!a || !b || dep === arr) { setResult({ eligible: "unknown", reasonCode: "insufficient_input" }); return; }
    const distanceKm = haversineKm(a, b);
    const input = { departureRegion: a.region, arrivalRegion: b.region, carrierRegion: carrier, distanceKm };
    if (mode === "cancellation") { input.cancelled = true; input.noticeDays = Number(notice) || 0; }
    else input.delayHours = Number(delay) || 0;
    setResult(assess(input));
  }

  const field = "w-full rounded-md border border-slate-300 px-3 py-2 text-base";
  return (
    <form onSubmit={compute} className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="font-medium text-slate-700">From</span>
          <select value={dep} onChange={(e) => setDep(e.target.value)} className={field}>
            {AIRPORT_LIST.map((p) => <option key={p.iata} value={p.iata}>{p.city} ({p.iata})</option>)}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">To</span>
          <select value={arr} onChange={(e) => setArr(e.target.value)} className={field}>
            {AIRPORT_LIST.map((p) => <option key={p.iata} value={p.iata}>{p.city} ({p.iata})</option>)}
          </select>
        </label>
        <label className="block text-sm">
          <span className="font-medium text-slate-700">What happened</span>
          <select value={mode} onChange={(e) => setMode(e.target.value)} className={field}>
            <option value="delay">Delayed on arrival</option>
            <option value="cancellation">Cancelled</option>
          </select>
        </label>
        {mode === "delay" ? (
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Delay (hours)</span>
            <input type="number" min="0" step="0.5" value={delay} onChange={(e) => setDelay(e.target.value)} className={field} />
          </label>
        ) : (
          <label className="block text-sm">
            <span className="font-medium text-slate-700">Days' notice given</span>
            <input type="number" min="0" value={notice} onChange={(e) => setNotice(e.target.value)} className={field} />
          </label>
        )}
        <label className="block text-sm sm:col-span-2">
          <span className="font-medium text-slate-700">Airline based in</span>
          <select value={carrier} onChange={(e) => setCarrier(e.target.value)} className={field}>
            <option value="UK">UK</option>
            <option value="EU">EU</option>
            <option value="OTHER">Outside UK/EU</option>
          </select>
          <span className="mt-1 block text-xs text-slate-400">Only matters for flights into the UK/EU from elsewhere.</span>
        </label>
      </div>
      <button className="mt-4 w-full rounded-md bg-sky-700 px-4 py-2.5 font-medium text-white hover:bg-sky-800">
        Check compensation
      </button>
      <Verdict result={result} />
    </form>
  );
}
