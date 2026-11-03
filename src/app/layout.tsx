import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { WhatsAppFloat } from "@/components/layout/whatsapp-float";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { site, siteUrl } from "@/lib/site";
import { JsonLd, ogImage, organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const instrument = localFont({
  src: [
    { path: "../fonts/instrument-serif-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/instrument-serif-latin-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-instrument",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const montserrat = localFont({
  src: "../fonts/montserrat-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

const inter = localFont({
  src: "../fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "Segoe UI", "sans-serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: "R.K Travels | Airport transfers, vehicle rentals and tours in Sri Lanka", template: "%s | R.K Travels" },
  description:
    "Airport transfers, vehicle rentals and private tours across Sri Lanka, arranged by R.K Travels in Negombo. Enquire online or on WhatsApp.",
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: { siteName: site.name, type: "website", locale: "en_GB", images: [ogImage] },
  twitter: { card: "summary_large_image", images: [ogImage.url] },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = { themeColor: "#ffffff", colorScheme: "light" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${instrument.variable} ${montserrat.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 rounded-control bg-golden-yellow px-4 py-3 font-heading text-sm font-semibold text-navy focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <aside aria-label="Quick contact">
          <WhatsAppFloat />
        </aside>
        <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || undefined} />
        <JsonLd data={organizationJsonLd()} />
      </body>
    </html>
  );
}
