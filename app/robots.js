import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

// Alle crawlers incl. AI search/answer bots toegestaan (citatie = groeikanaal).
export default function robots() {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: absoluteUrl("/sitemap.xml"),
  };
}
