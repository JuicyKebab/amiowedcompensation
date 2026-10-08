import "./globals.css";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { organizationJsonLd } from "@/lib/schema";

const DESCRIPTION =
  "Independent UK261 & EU261 flight compensation checker. See if a delayed or cancelled flight owes you up to £520, then claim it free yourself or via an agency — your choice.";

export const metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name}: ${SITE.tagline}`, template: `%s | ${SITE.name}` },
  description: DESCRIPTION,
  openGraph: { type: "website", url: SITE.url, siteName: SITE.name, title: `${SITE.name}: ${SITE.tagline}`, description: DESCRIPTION },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <body className="flex min-h-dvh flex-col bg-slate-50 text-slate-900 antialiased">
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
            <Link href="/" className="text-lg font-bold tracking-tight text-sky-700">{SITE.name}</Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
              <Link href="/#check" className="hover:text-sky-700">Check</Link>
              <Link href="/flight-delay-compensation" className="hidden hover:text-sky-700 sm:inline">By airline</Link>
              <Link href="/uk261" className="hover:text-sky-700">UK261</Link>
              <Link href="/eu261" className="hover:text-sky-700">EU261</Link>
              <Link href="/flight-status" className="hidden hover:text-sky-700 sm:inline">Flight status</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="mt-16 border-t border-slate-200 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-8 text-sm text-slate-500">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Link href="/claim-letter" className="hover:text-sky-700">Free claim letter</Link>
              <Link href="/about" className="hover:text-sky-700">About & affiliate disclosure</Link>
              <Link href="/methodology" className="hover:text-sky-700">Methodology</Link>
              <Link href="/changelog" className="hover:text-sky-700">Changelog</Link>
              <Link href="/privacy" className="hover:text-sky-700">Privacy</Link>
            </div>
            <p className="mt-4 max-w-2xl">
              {SITE.name} gives general information on air passenger rights, not legal advice. Compensation is never
              guaranteed. Always check the airline's stated reason before claiming.
            </p>
          </div>
        </footer>
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
