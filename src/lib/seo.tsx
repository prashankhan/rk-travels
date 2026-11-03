import type { Metadata } from "next";
import { site, siteUrl } from "./site";

export const ogImage = { url: "/og/rk-travels-og.png", width: 1200, height: 630, alt: "R.K Travels — travel and transport in Sri Lanka" };

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title: `${title} | ${site.name}`, description, url: path, siteName: site.name, type: "website", locale: "en_GB", images: [ogImage] },
    twitter: { card: "summary_large_image", title: `${title} | ${site.name}`, description, images: [ogImage.url] },
  };
}

/** Organisation structured data — confirmed facts only (no ratings, prices or street address). */
export function organizationJsonLd() {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    "@id": `${url}/#organization`,
    name: site.name,
    url,
    logo: `${url}/brand/logos/rk-travels-logo-full-colour.png`,
    image: `${url}/brand/marks/rk-travels-social-profile.png`,
    description: site.description,
    telephone: site.phone.e164,
    founder: { "@type": "Person", name: site.founder.name, jobTitle: site.founder.title },
    address: { "@type": "PostalAddress", addressLocality: site.location.locality, addressCountry: site.location.countryCode },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    contactPoint: { "@type": "ContactPoint", telephone: site.phone.e164, contactType: "customer service", availableLanguage: ["English"] },
  };
}

export function serviceJsonLd({ name, description, path }: { name: string; description: string; path: string }) {
  const url = siteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${url}${path}`,
    provider: { "@id": `${url}/#organization` },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
  };
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
