// Cloudflare Worker. Alleen /api/flight-status draait hier; al het andere valt door naar
// de statische assets (out/). De AeroDataBox-key staat als Worker-secret (env.AERODATABOX_KEY)
// en verlaat de server nooit richting de client.
const ADB_HOST = "aerodatabox.p.rapidapi.com";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/flight-status") {
      return flightStatus(url, env);
    }
    return env.ASSETS.fetch(request);
  },
};

// GET /api/flight-status?flight=BA432&date=2026-10-01
// Geeft een genormaliseerd statusobject terug; de eligibility-rekenlogica zit client/SSG-side
// in lib/engine.js (zelfde functie als de handmatige calculator).
async function flightStatus(url, env) {
  const flight = (url.searchParams.get("flight") || "").trim().toUpperCase().replace(/\s+/g, "");
  const date = (url.searchParams.get("date") || "").trim(); // YYYY-MM-DD
  const json = (body, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "content-type": "application/json", "cache-control": "public, max-age=300" },
    });

  if (!/^[A-Z0-9]{2,8}$/.test(flight) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return json({ error: "bad_request", message: "flight (e.g. BA432) and date (YYYY-MM-DD) required" }, 400);
  }
  if (!env.AERODATABOX_KEY) return json({ error: "not_configured" }, 503);

  // AeroDataBox bewaart ~180 dagen historie; oudere datums kunnen leeg terugkomen -> client valt
  // dan terug op handmatige invoer.
  const api = `https://${ADB_HOST}/flights/number/${encodeURIComponent(flight)}/${date}?withAircraftImage=false&withLocation=false`;
  let res;
  try {
    res = await fetch(api, { headers: { "x-rapidapi-key": env.AERODATABOX_KEY, "x-rapidapi-host": ADB_HOST } });
  } catch {
    return json({ error: "upstream_unreachable" }, 502);
  }
  if (res.status === 204 || res.status === 404) return json({ found: false });
  if (!res.ok) return json({ error: "upstream_error", status: res.status }, 502);

  const data = await res.json().catch(() => null);
  const leg = Array.isArray(data) ? data[0] : data?.[0] || data;
  if (!leg) return json({ found: false });

  const dep = leg.departure || {};
  const arr = leg.arrival || {};
  // AeroDataBox-tijden zien er uit als "2026-09-01 14:30Z" (spatie i.p.v. 'T') -> normaliseren.
  const parse = (t) => (t ? new Date(String(t).replace(" ", "T")) : null);
  const schedRaw = arr.scheduledTime?.utc || null;
  // Werkelijke aankomst: runwayTime (geland) voor revisedTime (schatting). Er is GEEN actualTime.
  const actualRaw = arr.runwayTime?.utc || arr.revisedTime?.utc || null;
  const sched = parse(schedRaw);
  const actual = parse(actualRaw);
  let delayMinutes = null;
  if (sched && actual && !isNaN(sched) && !isNaN(actual)) {
    delayMinutes = Math.round((actual - sched) / 60000);
  }

  return json({
    found: true,
    flight,
    date,
    status: leg.status || null,
    cancelled: /cancel/i.test(leg.status || ""),
    departureIata: dep.airport?.iata || null,
    arrivalIata: arr.airport?.iata || null,
    scheduledArrivalUtc: schedRaw,
    actualArrivalUtc: actualRaw,
    delayMinutes,
  });
}
