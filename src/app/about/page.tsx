import Link from "next/link";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { CTABanner } from "@/components/sections/cta-banner";
import { Photo } from "@/components/sections/photo";
import { Button } from "@/components/ui/button";
import { primaryServices } from "@/data/services";
import { images } from "@/data/images";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About us",
  description: "R.K Travels is a travel and transport company in Negombo, Sri Lanka, bringing airport transfers, vehicle rentals and tours together in one place.",
  path: "/about",
});

const principles = [
  { title: "Convenience first", text: "Travel arrangements should be easy to make. One enquiry, one conversation, and the details handled." },
  { title: "Honest communication", text: "We confirm what we can arrange before anything is booked, and we tell you clearly when something needs checking." },
  { title: "Your plans, your pace", text: "Families, groups, first-time visitors and returning travellers all travel differently. We plan around you." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title={<>Travel and transport, <em className="italic">brought together.</em></>}
        intro="R.K Travels is a Sri Lankan travel and transport company based in Negombo. We bring airport transfers, vehicle rentals and travel experiences together, so getting around Sri Lanka feels simple from the moment you arrive."
        image={images.aboutIntro}
      />

      <section aria-labelledby="what-title" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <SectionHeading id="what-title" eyebrow="What we do" title="More than a ride provider." />
          <div className="flex flex-col gap-5 text-charcoal">
            <p className="type-lead">
              Visitors arriving in Sri Lanka often need several things at once: a pickup from the airport, a way to get around, and help planning where to go. We arrange all three.
            </p>
            <p>
              We work with international tourists, travellers arriving in the country, local customers, and families and groups who need a vehicle or transport. When it helps your trip, we can also assist with hotel bookings and house rentals.
            </p>
            <ul className="mt-4 grid border-t border-border sm:grid-cols-3">
              {primaryServices.map((s) => (
                <li key={s.slug} className="border-b border-border py-5 sm:border-b-0 sm:pr-6">
                  <Link href={s.href} className="group flex flex-col gap-1">
                    <span className="type-eyebrow text-muted">{s.index}</span>
                    <span className="type-heading-4 text-navy group-hover:underline group-hover:decoration-golden-yellow group-hover:decoration-2 group-hover:underline-offset-4">{s.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="founder-title" className="border-y border-border bg-warm-white">
        <div className="container-site grid gap-10 py-16 md:grid-cols-[auto_1fr] md:items-center md:gap-16 lg:py-24">
          <div className="flex size-40 items-center justify-center rounded-full border border-border bg-white md:size-48">
            <span aria-hidden className="font-display text-[64px] leading-none text-navy">S</span>
          </div>
          <div className="flex max-w-[640px] flex-col gap-4">
            <p className="type-eyebrow flex items-center gap-3 text-muted"><span aria-hidden className="rule-accent" />Our founder</p>
            <h2 id="founder-title" className="type-display-md text-navy">{site.founder.name}</h2>
            <p className="type-heading-4 font-medium text-charcoal">{site.founder.title}, {site.name}</p>
            <p className="text-charcoal">
              {site.name} is led by its founder, {site.founder.name}, from Negombo on Sri Lanka&rsquo;s west coast.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="section-y">
        <div className="container-site flex flex-col gap-12">
          <SectionHeading id="approach-title" eyebrow="Our approach" title="How we work with you." />
          <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
            {principles.map((p, i) => (
              <li key={p.title} className="flex flex-col gap-3 border-t-2 border-navy pt-6">
                <span className="type-eyebrow text-muted">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="type-heading-3 text-navy">{p.title}</h3>
                <p className="text-charcoal">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="pb-4">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Photo image={images.aboutJourney} sizes="(min-width: 1024px) 600px, 100vw" className="rounded-card" />
          </div>
          <div className="flex flex-col gap-5">
            <h2 id="journey-title" className="type-display-md text-navy">Planning a trip to Sri Lanka?</h2>
            <p className="type-lead text-charcoal">Tell us when you arrive, where you would like to go and who is travelling. We will reply to talk it through.</p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild><Link href="/contact#enquiry">Plan your journey</Link></Button>
              <Button asChild variant="outline"><Link href="/services">Explore our services</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
