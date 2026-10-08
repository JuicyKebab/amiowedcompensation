import { SITE, SAME_AS, absoluteUrl } from "./site.js";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE.url}/#org`,
        name: SITE.name,
        url: SITE.url,
        description:
          "Independent flight-compensation checker for UK261 and EU261. We show the free direct-claim route alongside paid claim agencies, and may earn a fee if you choose an agency.",
        knowsAbout: ["UK261", "EU261", "flight delay compensation", "flight cancellation compensation", "air passenger rights"],
        ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
      },
      { "@type": "WebSite", "@id": `${SITE.url}/#site`, url: SITE.url, name: SITE.name, publisher: { "@id": `${SITE.url}/#org` } },
    ],
  };
}

export function breadcrumbJsonLd(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({ "@type": "ListItem", position: i + 1, name: t.name, item: absoluteUrl(t.path) })),
  };
}

export function articleJsonLd({ url, headline, description, modified, airline }) {
  const node = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline,
    description,
    dateModified: modified,
    datePublished: modified,
    publisher: { "@id": `${SITE.url}/#org` },
    isPartOf: { "@id": `${SITE.url}/#site` },
  };
  if (airline) node.about = { "@type": "Airline", name: airline.name, iataCode: airline.iata };
  return node;
}

// FAQPage: geen rich result meer (Google mei 2026), wel comprehension-signaal. Alleen Q&A's die
// ZICHTBAAR op de pagina staan mogen hierin.
export function faqJsonLd(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
