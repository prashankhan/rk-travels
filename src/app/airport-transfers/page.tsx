import Link from "next/link";
import { Clock, Luggage, Plane, Users } from "lucide-react";
import { PageHero } from "@/components/sections/page-hero";
import { SectionHeading } from "@/components/sections/section-heading";
import { Steps } from "@/components/sections/steps";
import { EnquirySection } from "@/components/sections/enquiry-section";
import { FaqSection } from "@/components/sections/faq-section";
import { AirportTransferForm } from "@/components/forms/airport-transfer-form";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { airportFaqs } from "@/data/faqs";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { JsonLd, pageMetadata, serviceJsonLd } from "@/lib/seo";

const description = "Request an airport pickup or drop-off in Sri Lanka. R.K Travels arranges airport transfers from Negombo — send your flight details online or on WhatsApp.";
export const metadata = pageMetadata({ title: "Airport transfers in Sri Lanka", description, path: "/airport-transfers" });

const checklist = [
  { icon: Plane, title: "Your flight", text: "Flight number and arrival or departure time, so we can plan around it." },
  { icon: Clock, title: "Date and time", text: "The travel date and the time you would like to be picked up." },
  { icon: Users, title: "Who is travelling", text: "The number of passengers, including children." },
  { icon: Luggage, title: "Anything extra", text: "Luggage, child seats or accessibility needs." },
];

export default function AirportTransfersPage() {
  return (
    <>
      <PageHero
        eyebrow="Airport transfers"
        title={<>From arrivals <em className="italic">to wherever you are going.</em></>}
        intro="Request a pickup when you land or a drop-off for your flight home. Send your details, and we will reply on WhatsApp to confirm your transfer."
        image={images.airportTransfers}
        actions={
          <>
            <Button asChild><a href="#transfer-enquiry">Request a transfer</a></Button>
            <Button asChild variant="outline">
              <a href={whatsappLink(whatsappMessages.airport)} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">WhatsApp us</a>
            </Button>
          </>
        }
      />

      <section aria-labelledby="how-title" className="section-y">
        <div className="container-site flex flex-col gap-12 lg:gap-16">
          <SectionHeading id="how-title" eyebrow="How to request a transfer" title="Three steps to a planned arrival." />
          <Steps
            steps={[
              { title: "Send your details", text: "Use the form below or WhatsApp. Tell us whether it is a pickup or a drop-off." },
              { title: "We confirm with you", text: "We reply on WhatsApp to confirm the details of your transfer before anything is arranged." },
              { title: "Travel on the day", text: "Keep your WhatsApp handy so we can stay in touch around your flight." },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="include-title" className="pb-16 lg:pb-28">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <SectionHeading id="include-title" eyebrow="Before you send" title="What to include." intro="The more we know, the faster we can confirm your transfer." />
          <ul className="grid gap-x-10 sm:grid-cols-2">
            {checklist.map((c) => (
              <li key={c.title} className="flex gap-4 border-t border-border py-6">
                <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-warm-white text-navy">
                  <c.icon className="size-5" strokeWidth={1.75} />
                </span>
                <span className="flex flex-col gap-1">
                  <span className="type-heading-4 text-navy">{c.title}</span>
                  <span className="text-[15px] leading-6 text-charcoal">{c.text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <EnquirySection
        id="transfer-enquiry"
        eyebrow="Airport transfer enquiry"
        title="Request your transfer."
        intro="Fill in your details and we will reply on WhatsApp to confirm. Your transfer is arranged once we have confirmed it with you."
        form={<AirportTransferForm />}
        whatsappMessage={whatsappMessages.airport}
        notes={["We receive your request by email.", "We reply on WhatsApp to confirm details.", "Your transfer is arranged once confirmed."]}
      />

      <FaqSection faqs={airportFaqs} title="Airport transfer questions" />

      <section className="container-site pb-20">
        <p className="text-charcoal">
          Planning more than a transfer? See <Link href="/vehicle-rentals" className="text-navy underline decoration-border-strong underline-offset-[3px] hover:decoration-golden-yellow hover:decoration-2">vehicle rentals</Link> or{" "}
          <Link href="/tours" className="text-navy underline decoration-border-strong underline-offset-[3px] hover:decoration-golden-yellow hover:decoration-2">tours and experiences</Link>.
        </p>
      </section>
      <JsonLd data={serviceJsonLd({ name: "Airport transfers", description, path: "/airport-transfers" })} />
    </>
  );
}
