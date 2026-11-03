import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { DestinationCard } from "@/components/sections/destination-card";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CTABanner } from "@/components/sections/cta-banner";
import { TourForm } from "@/components/forms/tour-form";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { destinations } from "@/data/destinations";
import { tourFaqs } from "@/data/faqs";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const description = "Private tours, family trips and custom journeys across Sri Lanka, planned around you by R.K Travels in Negombo. Tell us where you would like to go.";
export const metadata = pageMetadata({ title: "Private tours and experiences in Sri Lanka", description, path: "/tours" });

const ways = [
  { title: "Private sightseeing", text: "Day trips and sightseeing at your own pace, with transport arranged." },
  { title: "Family and group tours", text: "Room for everyone, with plans that suit children, grandparents and friends travelling together." },
  { title: "Customised journeys", text: "Multi-day trips shaped around the places you want to see and the time you have." },
  { title: "Sri Lankan experiences", text: "Culture, coast, hill country and wildlife — tell us what interests you." },
];

export default function ToursPage() {
  return (
    <>
      <PageHero
        eyebrow="Tours & experiences"
        title={<>Discover Sri Lanka, <em className="italic">your way.</em></>}
        intro="Ancient cities, tea country, quiet beaches and lively towns. Tell us what you would like to see and how long you have, and we will help you plan the journey."
        image={images.tours}
        actions={
          <>
            <Button asChild><a href="#tour-enquiry">Plan a custom tour</a></Button>
            <Button asChild variant="outline">
              <a href={whatsappLink(whatsappMessages.tour)} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">WhatsApp us</a>
            </Button>
          </>
        }
      />

      <section aria-labelledby="ways-title" className="section-y">
        <div className="container-site grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading id="ways-title" eyebrow="Ways to travel" title="Every trip is planned around you." />
          <ul className="grid sm:grid-cols-2">
            {ways.map((w, i) => (
              <li key={w.title} className={`flex flex-col gap-3 border-t border-border py-8 sm:pr-8 ${i % 2 === 1 ? "sm:border-l sm:pl-8" : ""}`}>
                <h3 className="type-heading-4 text-navy">{w.title}</h3>
                <p className="text-charcoal">{w.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="dest-title" className="pb-16 lg:pb-28">
        <div className="container-site">
          <SectionHeading
            id="dest-title"
            eyebrow="Inspiration"
            style="display"
            title="Places to build a journey around."
            intro="These are ideas, not fixed packages. Mention any of them in your enquiry and we will help you plan."
          />
          <ul className="mt-12 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {destinations.map((d) => (
              <li key={d.slug}><DestinationCard destination={d} /></li>
            ))}
          </ul>
        </div>
      </section>

      <EnquirySection
        id="tour-enquiry"
        eyebrow="Custom tour enquiry"
        title="Tell us about your trip."
        intro="Share where you would like to go, your dates and who is travelling. We will reply on WhatsApp with ideas and to confirm the details."
        form={<TourForm />}
        whatsappMessage={whatsappMessages.tour}
        notes={["We receive your request by email.", "We reply on WhatsApp to shape the plan with you.", "Your tour is arranged once confirmed."]}
      />

      <FaqSection faqs={tourFaqs} title="Tour questions" />
      <CTABanner
        title={<>Arriving soon? <em className="italic">Start with the airport.</em></>}
        text="Combine your tour with an airport pickup so your journey starts the moment you land."
        primary={{ label: "Arrange an airport transfer", href: "/airport-transfers" }}
        message={whatsappMessages.tour}
      />
      <JsonLd data={serviceJsonLd({ name: "Tours and experiences", description, path: "/tours" })} />
    </>
  );
}
