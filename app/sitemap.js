import { absoluteUrl } from "@/lib/site";
import { allAirlinePages } from "@/data/airlines";
import { VERIFIED } from "@/lib/rules";

export const dynamic = "force-static";

export default function sitemap() {
  const lastModified = new Date(VERIFIED);
  const statics = ["/", "/flight-delay-compensation/", "/flight-status/", "/claim-letter/", "/uk261/", "/eu261/", "/uk261-vs-eu261/", "/changelog/", "/about/", "/methodology/", "/privacy/"];
  return [
    ...statics.map((p) => ({ url: absoluteUrl(p), lastModified, changeFrequency: "monthly", priority: p === "/" ? 1 : 0.5 })),
    ...allAirlinePages().map((p) => ({ url: absoluteUrl(`/${p.slug}/`), lastModified, changeFrequency: "monthly", priority: 0.8 })),
  ];
}
