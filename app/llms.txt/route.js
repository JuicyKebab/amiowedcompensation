import { SITE, absoluteUrl } from "@/lib/site";
import { AIRLINES, pageSlug } from "@/data/airlines";
import { RULES, VERIFIED } from "@/lib/rules";

export const dynamic = "force-static";

export function GET() {
  const uk = RULES.UK261, eu = RULES.EU261;
  const L = [];
  L.push(`# ${SITE.name}`, "");
  L.push(`> Independent UK261 & EU261 flight-compensation checker. Fixed amounts: UK261 ${uk.symbol}${uk.bands.short}/${uk.symbol}${uk.bands.medium}/${uk.symbol}${uk.bands.long}, EU261 ${eu.symbol}${eu.bands.short}/${eu.symbol}${eu.bands.medium}/${eu.symbol}${eu.bands.long} by flight distance for delays of 3+ hours or cancellations with under 14 days' notice. We show the free direct-claim route alongside paid agencies. Amounts verified ${VERIFIED}.`, "");
  L.push("## Guides", `- [Flight delay & cancellation compensation (all airlines, amounts)](${absoluteUrl("/flight-delay-compensation/")})`, "");
  L.push("## Rules", `- [UK261 explained](${absoluteUrl("/uk261/")})`, `- [EU261 explained](${absoluteUrl("/eu261/")})`, `- [UK261 vs EU261](${absoluteUrl("/uk261-vs-eu261/")})`, "");
  L.push("## Tools", `- [Live flight-status checker](${absoluteUrl("/flight-status/")})`, `- [Compensation calculator](${absoluteUrl("/#calculator")})`, `- [Free claim letter template (UK261/EU261)](${absoluteUrl("/claim-letter/")})`, "");
  L.push("## Airlines (delay & cancellation)");
  for (const a of AIRLINES) {
    L.push(`- [${a.name} delay compensation](${absoluteUrl(`/${pageSlug(a, "delay")}/`)})`);
    L.push(`- [${a.name} cancellation compensation](${absoluteUrl(`/${pageSlug(a, "cancellation")}/`)})`);
  }
  L.push("", "## About", `- [How we make money & independence](${absoluteUrl("/about/")})`, `- [Methodology](${absoluteUrl("/methodology/")})`, `- [Changelog (rule & amount updates)](${absoluteUrl("/changelog/")})`, "");
  return new Response(L.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
