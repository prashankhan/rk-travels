import Link from "next/link";
import { Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
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
          <SectionHeading
            id="core-title"
            eyebrow="Core services"
            title="Choose where to start."
            intro="Pickups, vehicles and tours — start with the service you need, or tell us about the whole trip."
          />
          <div className="mt-12 flex flex-col gap-16 lg:mt-16 lg:gap-24">
            {primaryServices.map((s, i) => (
              <article key={s.slug} aria-labelledby={`${s.slug}-title`} className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-20">
                <div className={cn("relative aspect-[4/3] overflow-hidden rounded-card", i % 2 === 1 && "lg:order-2")}>
                  <Photo image={s.image} sizes="(min-width: 1024px) 600px, 100vw" className="rounded-card" />
                </div>
                <div className="relative flex flex-col gap-5">
                  <span aria-hidden className="absolute top-0 left-0 h-0.5 w-12 bg-golden-yellow" />
                  <span className="type-eyebrow pt-4 text-golden-yellow">{s.index}</span>
                  <h2 id={`${s.slug}-title`} className="type-heading-1 text-navy">{s.title}</h2>
                  <p className="type-lead text-charcoal">{s.summary}</p>
                  <ul className="flex flex-col gap-2.5">
                    {s.includes.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[15px] leading-6 text-charcoal">
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

      <section aria-labelledby="support-title" className="section-y border-y border-border bg-warm-white">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-start lg:gap-20">
          <SectionHeading
            id="support-title"
            eyebrow="Supporting services"
            title="Extra help when you need it."
            intro="Alongside transfers and tours, we can help arrange a hotel or a house as part of your enquiry."
            className="lg:sticky lg:top-28"
          />
          <ul className="grid gap-0 sm:grid-cols-2">
            {supportingServices.map((s, i) => (
              <li
                key={s.id}
                id={s.id}
                className={`relative flex flex-col gap-4 border-t border-border pt-8 pb-10 sm:pr-10 ${i % 2 === 1 ? "sm:border-l sm:pl-10" : ""}`}
              >
                <span
                  aria-hidden
                  className={`absolute top-0 h-0.5 w-12 bg-golden-yellow ${i % 2 === 1 ? "left-0 sm:left-10" : "left-0"}`}
                />
                <h3 className="type-heading-3 text-navy">{s.title}</h3>
                <p className="max-w-[36ch] text-[15px] leading-6 text-charcoal">{s.summary}</p>
                <a
                  href={whatsappLink(`Hello R.K Travels, I would like help with ${s.title.toLowerCase()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  className="mt-auto inline-flex items-center gap-2 self-start py-1.5 font-label text-sm font-semibold uppercase tracking-tight text-navy shadow-[inset_0_-2px_0_var(--color-golden-yellow)]"
                >
                  <WhatsAppIcon className="size-4" /> Ask on WhatsApp
                </a>
              </li>
            ))}
          </ul>
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
