import { Info } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CTABanner } from "@/components/sections/cta-banner";
import { Photo } from "@/components/sections/photo";
import { VehicleRentalForm } from "@/components/forms/vehicle-rental-form";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { vehicleCategories } from "@/data/vehicles";
import { rentalFaqs } from "@/data/faqs";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const description = "Rent a car, van, motorcycle or tuk-tuk in Sri Lanka. Tell R.K Travels in Negombo your dates and we will confirm what is available.";
export const metadata = pageMetadata({ title: "Vehicle rentals in Sri Lanka", description, path: "/vehicle-rentals" });

export default function VehicleRentalsPage() {
  return (
    <>
      <PageHero
        eyebrow="Vehicle rentals"
        title={<>Get around Sri Lanka <em className="italic">at your own pace.</em></>}
        intro="Cars, vans, motorcycles and tuk-tuks for exploring the coast, the hills and everywhere in between. Tell us your dates and what you need, and we will confirm what is available."
        image={images.vehicleRentals}
        actions={
          <>
            <Button asChild><a href="#rental-enquiry">Request a vehicle</a></Button>
            <Button asChild variant="outline">
              <a href={whatsappLink(whatsappMessages.rental)} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">WhatsApp us</a>
            </Button>
          </>
        }
      />

      <section aria-labelledby="cat-title" className="section-y">
        <div className="container-site">
          <SectionHeading id="cat-title" eyebrow="Vehicle categories" title="Choose the right vehicle for the trip." />
          <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4 lg:gap-6">
            {vehicleCategories.map((v) => (
              <li key={v.id}>
                <article aria-labelledby={`veh-${v.id}`} className="flex h-full flex-col overflow-hidden rounded-card border border-border bg-white shadow-card">
                  <div className="relative aspect-[4/3]">
                    <Photo image={v.image} sizes="(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw" className="border-0 border-b" />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <h3 id={`veh-${v.id}`} className="type-heading-3 text-navy">{v.title}</h3>
                    <p className="text-[15px] leading-6 text-charcoal">{v.description}</p>
                    <p className="type-caption mt-auto pt-2 text-muted"><span className="font-medium text-charcoal">Good for:</span> {v.goodFor}</p>
                    {v.listings.length > 0 ? (
                      <ul className="mt-2 border-t border-border pt-3 text-[15px]">
                        {v.listings.map((l) => <li key={l.name}>{l.name}</li>)}
                      </ul>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <div className="mt-10 flex gap-3 rounded-menu border border-border bg-warm-white p-4 text-[15px] leading-[22px] text-charcoal">
            <Info aria-hidden className="mt-px size-5 shrink-0 text-navy" strokeWidth={1.75} />
            <p>
              Availability, vehicle details and driver options depend on your dates. We confirm them when we reply to your enquiry.
            </p>
          </div>
        </div>
      </section>

      <EnquirySection
        id="rental-enquiry"
        eyebrow="Vehicle rental enquiry"
        title="Request a vehicle."
        intro="Tell us the type of vehicle, your dates and where you would like to collect it. We will reply on WhatsApp to confirm availability and details."
        form={<VehicleRentalForm />}
        whatsappMessage={whatsappMessages.rental}
        notes={["We receive your request by email.", "We reply on WhatsApp with availability.", "Your rental is arranged once confirmed."]}
      />

      <FaqSection faqs={rentalFaqs} title="Rental questions" />
      <CTABanner
        title={<>Need a pickup too? <em className="italic">We can arrange the whole trip.</em></>}
        text="Combine your rental with an airport transfer or a planned tour. Mention it in your enquiry."
        message={whatsappMessages.rental}
      />
      <JsonLd data={serviceJsonLd({ name: "Vehicle rentals", description, path: "/vehicle-rentals" })} />
    </>
  );
}
