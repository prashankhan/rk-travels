import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { HomeHero } from "@/components/sections/home-hero";
import { ServiceCard } from "@/components/sections/service-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { DestinationCard } from "@/components/sections/destination-card";
import { Steps } from "@/components/sections/steps";
import { FaqSection } from "@/components/sections/faq-section";
import { CTABanner } from "@/components/sections/cta-banner";
import { Photo } from "@/components/sections/photo";
import { Button } from "@/components/ui/button";
import { primaryServices, supportingServices } from "@/data/services";
import { destinations } from "@/data/destinations";
import { homeFaqs } from "@/data/faqs";
import { images } from "@/data/images";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Airport transfers, vehicle rentals and tours in Sri Lanka",
    description:
      "R.K Travels arranges airport transfers, vehicle rentals and private tours across Sri Lanka from Negombo. Tell us your plans online or on WhatsApp.",
    path: "/",
  }),
  title: { absolute: "R.K Travels | Airport transfers, vehicle rentals and tours in Sri Lanka" },
};

const reasons = [
  { title: "One contact for the whole trip", text: "Transfers, vehicles and tours arranged in one place, so you are not juggling several providers." },
  { title: "Based in Negombo", text: "We are on Sri Lanka's west coast, a short drive from Bandaranaike International Airport." },
  { title: "Plans shaped around you", text: "Tell us your dates, group and pace. We work from your plans rather than a fixed package." },
  { title: "Clear replies on WhatsApp", text: "Ask questions and confirm details in a conversation you can come back to." },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* Services — locked: three equal editorial cards, approved order and copy */}
      <section aria-labelledby="services-title" className="section-y">
        <div className="container-site">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="services-title"
              eyebrow="Our services"
              title="Every journey, made simple."
              intro="From the moment you arrive to every destination you explore, discover transport and travel services tailored to your plans."
            />
            <Link href="/services" className="group inline-flex shrink-0 items-center gap-2 self-start py-1.5 font-heading text-[15px] font-semibold text-navy shadow-[inset_0_-2px_0_var(--color-golden-yellow)] lg:self-auto">
              All services <ArrowRight aria-hidden className="size-[18px] transition-transform group-hover:translate-x-[3px]" strokeWidth={1.75} />
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-8">
            {primaryServices.map((s) => (
              <ServiceCard key={s.slug} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Introduction — editorial split */}
      <section aria-labelledby="intro-title" className="border-y border-border bg-warm-white">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20 lg:py-28">
          <div className="relative order-2 aspect-[4/3] overflow-hidden rounded-card lg:order-1 lg:aspect-[5/6]">
            <Photo image={images.aboutJourney} sizes="(min-width: 1024px) 560px, 100vw" className="rounded-card" />
          </div>
          <div className="order-1 flex flex-col gap-6 lg:order-2">
            <p className="type-eyebrow flex items-center gap-3 text-muted"><span aria-hidden className="rule-accent" />About R.K Travels</p>
            <h2 id="intro-title" className="type-display-lg text-navy">
              More than a ride. <em className="italic">Your travel partner in Sri Lanka.</em>
            </h2>
            <p className="type-lead text-charcoal">
              R.K Travels brings airport transfers, vehicle rentals and travel experiences together under one travel and transport brand.
            </p>
            <p className="text-charcoal">
              Whether you are landing in Sri Lanka for the first time, travelling with family or simply need a vehicle for the week, we help you get where you are going and make the most of the journey in between.
            </p>
            <div>
              <Button asChild variant="outline">
                <Link href="/about">Get to know us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section aria-labelledby="how-title" className="section-y">
        <div className="container-site flex flex-col gap-12 lg:gap-16">
          <SectionHeading id="how-title" eyebrow="How it works" title="Plan in three simple steps." />
          <Steps
            steps={[
              { title: "Tell us your plans", text: "Send an enquiry form or a WhatsApp message with your dates, route and number of travellers." },
              { title: "We confirm the details", text: "We reply on WhatsApp to talk through your request and confirm what we can arrange." },
              { title: "Travel with confidence", text: "Arrive, explore and get around Sri Lanka with your transport and plans in place." },
            ]}
          />
        </div>
      </section>

      {/* Destinations — asymmetric editorial grid */}
      <section aria-labelledby="dest-title" className="pb-16 lg:pb-28">
        <div className="container-site">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              id="dest-title"
              eyebrow="Discover Sri Lanka"
              style="display"
              title="Where will the road take you?"
              intro="A few places travellers often ask about. Every journey is planned around you, so treat these as inspiration."
            />
            <Link href="/tours" className="group inline-flex shrink-0 items-center gap-2 self-start py-1.5 font-heading text-[15px] font-semibold text-navy shadow-[inset_0_-2px_0_var(--color-golden-yellow)] lg:self-auto">
              Tours & experiences <ArrowRight aria-hidden className="size-[18px] transition-transform group-hover:translate-x-[3px]" strokeWidth={1.75} />
            </Link>
          </div>
          <div className="mt-12 grid gap-8 lg:mt-14 lg:grid-cols-2 lg:gap-8">
            <DestinationCard destination={destinations[0]} size="lg" className="lg:h-full" />
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {destinations.slice(1, 3).map((d) => (
                <DestinationCard key={d.slug} destination={d} />
              ))}
              <div className="flex flex-col justify-end gap-4 rounded-card border border-border p-6 sm:col-span-2">
                <p className="type-display-sm text-navy">
                  Galle, Nuwara Eliya, the coast, the hills — <em className="italic">tell us what you would like to see.</em>
                </p>
                <div>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/tours#tour-enquiry">Request a custom journey</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why travel with us */}
      <section aria-labelledby="why-title" className="border-y border-border bg-warm-white">
        <div className="container-site grid gap-12 py-16 lg:grid-cols-[1fr_1.5fr] lg:gap-20 lg:py-28">
          <SectionHeading id="why-title" eyebrow="Why R.K Travels" title="Travel arrangements that keep things simple." className="lg:sticky lg:top-28 lg:self-start" />
          <ul className="grid sm:grid-cols-2">
            {reasons.map((r, i) => (
              <li key={r.title} className={`flex flex-col gap-3 border-t border-border py-8 sm:pr-8 ${i % 2 === 1 ? "sm:pl-8 sm:border-l" : ""}`}>
                <h3 className="type-heading-4 text-navy">{r.title}</h3>
                <p className="text-charcoal">{r.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Supporting services — deliberately secondary */}
      <section aria-labelledby="extra-title" className="section-y pb-0 lg:pb-0">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <div className="flex flex-col gap-4">
            <p className="type-eyebrow flex items-center gap-3 text-muted"><span aria-hidden className="rule-accent" />Also available</p>
            <h2 id="extra-title" className="type-heading-2 text-navy">Help with where you stay.</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {supportingServices.map((s) => (
              <div key={s.id} className="flex flex-col gap-3">
                <h3 className="type-heading-4 text-navy">{s.title}</h3>
                <p className="text-charcoal">{s.summary}</p>
                <a
                  href={whatsappLink(`Hello R.K Travels, I would like help with ${s.title.toLowerCase()}.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-track="whatsapp_click"
                  className="inline-flex items-center gap-2 self-start text-[15px] font-medium text-navy underline decoration-border-strong underline-offset-[3px] hover:decoration-golden-yellow hover:decoration-2"
                >
                  <MessageCircle aria-hidden className="size-4" strokeWidth={1.75} /> Ask on WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FaqSection faqs={homeFaqs} />
      <CTABanner message={whatsappMessages.general} />
    </>
  );
}
