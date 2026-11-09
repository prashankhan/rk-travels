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
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-start lg:gap-20">
          <SectionHeading
            id="what-title"
            eyebrow="What we do"
            title="More than a ride provider."
            intro="Airport, vehicles and tours under one contact — so arriving and getting around feel simple."
            className="lg:sticky lg:top-28"
          />
          <div className="flex flex-col gap-5 text-charcoal">
            <p className="type-lead">
              Visitors arriving in Sri Lanka often need several things at once: a pickup from the airport, a way to get around, and help planning where to go. We arrange all three.
            </p>
            <p>
              We work with international tourists, travellers arriving in the country, local customers, and families and groups who need a vehicle or transport. When it helps your trip, we can also assist with hotel bookings and house rentals.
            </p>
            <ul className="mt-4 grid border-t border-border sm:grid-cols-3">
              {primaryServices.map((s, i) => (
                <li
                  key={s.slug}
                  className={`relative border-b border-border py-6 sm:border-b-0 sm:pr-8 ${i > 0 ? "sm:border-l sm:pl-8" : ""}`}
                >
                  <span
                    aria-hidden
                    className={`absolute top-0 h-0.5 w-12 bg-golden-yellow ${i > 0 ? "left-0 sm:left-8" : "left-0"}`}
                  />
                  <Link href={s.href} className="group flex flex-col gap-2">
                    <span className="type-eyebrow text-golden-yellow">{s.index}</span>
                    <span className="type-heading-3 text-navy group-hover:underline group-hover:decoration-golden-yellow group-hover:decoration-2 group-hover:underline-offset-4">
                      {s.title}
                    </span>
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
            <p className="type-eyebrow text-golden-yellow">Our founder</p>
            <h2 id="founder-title" className="type-display-md text-navy">{site.founder.name}</h2>
            <p className="type-heading-4 font-medium text-charcoal">{site.founder.title}, {site.name}</p>
            <p className="text-charcoal">
              {site.name} is led by its founder, {site.founder.name}, from Negombo on Sri Lanka&rsquo;s west coast.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="approach-title" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-start lg:gap-20">
          <SectionHeading
            id="approach-title"
            eyebrow="Our approach"
            title="How we work with you."
            intro="Simple enquiries, clear confirmation, and plans shaped around your trip."
            className="lg:sticky lg:top-28"
          />
          <ol className="grid sm:grid-cols-1">
            {principles.map((p, i) => (
              <li key={p.title} className="relative flex flex-col gap-3 border-t border-border pt-8 pb-10 sm:pr-10">
                <span aria-hidden className="absolute top-0 left-0 h-0.5 w-12 bg-golden-yellow" />
                <span aria-hidden className="font-display text-[40px] leading-none text-navy md:text-[44px]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="type-heading-3 text-navy">{p.title}</h3>
                <p className="max-w-[42ch] text-[15px] leading-6 text-charcoal">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="journey-title" className="section-y border-y border-border bg-warm-white">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-card">
            <Photo image={images.aboutJourney} sizes="(min-width: 1024px) 600px, 100vw" className="rounded-card" />
          </div>
          <div className="flex flex-col gap-5">
            <p className="type-eyebrow text-golden-yellow">Next step</p>
            <h2 id="journey-title" className="type-heading-1 text-navy">Planning a trip to Sri Lanka?</h2>
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
