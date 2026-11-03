import Link from "next/link";
import { Check, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { CTABanner } from "@/components/sections/cta-banner";
import { Photo } from "@/components/sections/photo";
import { Button } from "@/components/ui/button";
import { primaryServices, supportingServices } from "@/data/services";
import { images } from "@/data/images";
import { whatsappLink } from "@/lib/whatsapp";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Our services",
  description: "Airport transfers, vehicle rentals and tours across Sri Lanka, plus help with hotel bookings and house rentals. Arranged by R.K Travels in Negombo.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Our services"
        title={<>Sri Lanka travel and transport, <em className="italic">in one place.</em></>}
        intro="Three core services cover most journeys: getting from the airport, getting around, and seeing the country. Choose the one you need, or tell us about the whole trip."
        image={images.servicesHero}
        actions={
          <>
            <Button asChild><Link href="/contact#enquiry">Plan your journey</Link></Button>
            <Button asChild variant="outline"><a href="#core-services">See the services</a></Button>
          </>
        }
      />

      <section id="core-services" aria-labelledby="core-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="core-title" eyebrow="Core services" title="Choose where to start." />
          <div className="mt-12 flex flex-col gap-16 lg:mt-16 lg:gap-24">
            {primaryServices.map((s, i) => (
              <article key={s.slug} aria-labelledby={`${s.slug}-title`} className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
                <div className={cn("relative aspect-[4/3] overflow-hidden rounded-card", i % 2 === 1 && "lg:order-2")}>
                  <Photo image={s.image} sizes="(min-width: 1024px) 600px, 100vw" className="rounded-card" />
                </div>
                <div className="flex flex-col gap-5">
                  <span className="type-eyebrow flex items-center gap-2.5 text-muted">
                    {s.index} <span aria-hidden className="inline-block h-0.5 w-6 bg-golden-yellow" />
                  </span>
                  <h2 id={`${s.slug}-title`} className="type-heading-1 text-navy">{s.title}</h2>
                  <p className="type-lead text-charcoal">{s.summary}</p>
                  <ul className="flex flex-col gap-2.5">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-charcoal">
                        <Check aria-hidden className="size-[18px] shrink-0 text-navy" strokeWidth={1.75} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2">
                    <Button asChild variant={i === 0 ? "primary" : "outline"}>
                      <Link href={s.href}>{s.linkLabel}</Link>
                    </Button>
                  </div>
                </div>
                <JsonLd data={serviceJsonLd({ name: s.title, description: s.summary, path: s.href })} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="support-title" className="border-y border-border bg-warm-white">
        <div className="container-site grid gap-10 py-16 lg:grid-cols-[1fr_2fr] lg:gap-20 lg:py-24">
          <div className="flex flex-col gap-4">
            <p className="type-eyebrow flex items-center gap-3 text-muted"><span aria-hidden className="rule-accent" />Supporting services</p>
            <h2 id="support-title" className="type-heading-2 text-navy">Extra help when you need it.</h2>
            <p className="text-charcoal">Alongside our core services, we can help with where you stay. Ask about these as part of your enquiry.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {supportingServices.map((s) => (
              <div key={s.id} id={s.id} className="flex flex-col gap-3 rounded-card border border-border bg-white p-6">
                <h3 className="type-heading-4 text-navy">{s.title}</h3>
                <p className="text-charcoal">{s.summary}</p>
                <a
                  href={whatsappLink(`Hello R.K Travels, I would like help with ${s.title.toLowerCase()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  className="mt-auto inline-flex items-center gap-2 self-start pt-2 text-[15px] font-medium text-navy underline decoration-border-strong underline-offset-[3px] hover:decoration-golden-yellow hover:decoration-2"
                >
                  <MessageCircle aria-hidden className="size-4" strokeWidth={1.75} /> Ask on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        eyebrow="Not sure where to start?"
        title={<>Tell us about the trip. <em className="italic">We will suggest the rest.</em></>}
        text="Share your arrival date, the places you want to see and who is travelling. We will reply to talk it through."
      />
    </>
  );
}
