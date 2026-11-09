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
          <SectionHeading
            id="how-title"
            eyebrow="How to request a transfer"
            title="Three steps to a planned arrival."
            intro="Send your flight details, confirm with us on WhatsApp, then travel on the day with a clear plan."
          />
          <Steps
            steps={[
              { title: "Send your details", text: "Use the form below or WhatsApp. Tell us whether it is a pickup or a drop-off." },
              { title: "We confirm with you", text: "We reply on WhatsApp to confirm the details of your transfer before anything is arranged." },
              { title: "Travel on the day", text: "Keep your WhatsApp handy so we can stay in touch around your flight." },
            ]}
          />
        </div>
      </section>

      <section aria-labelledby="include-title" className="section-y border-y border-border bg-warm-white">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-start lg:gap-20">
          <SectionHeading
            id="include-title"
            eyebrow="Before you send"
            title="What to include."
            intro="The more we know, the faster we can confirm your transfer."
            className="lg:sticky lg:top-28"
          />
          <ul className="grid sm:grid-cols-2">
            {checklist.map((c, i) => (
              <li
                key={c.title}
                className={`relative flex gap-4 border-t border-border pt-8 pb-10 sm:pr-10 ${i % 2 === 1 ? "sm:border-l sm:pl-10" : ""}`}
              >
                <span
                  aria-hidden
                  className={`absolute top-0 h-0.5 w-12 bg-golden-yellow ${i % 2 === 1 ? "left-0 sm:left-10" : "left-0"}`}
                />
                <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-white text-navy">
                  <c.icon className="size-5" strokeWidth={1.75} />
                </span>
                <span className="flex flex-col gap-2">
                  <span className="type-heading-3 text-navy">{c.title}</span>
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

      <FaqSection
        faqs={airportFaqs}
        title="Airport transfer questions"
        intro="Common questions about pickups, drop-offs and what happens after you enquire."
      />

      <section className="section-y pt-0">
        <div className="container-site">
          <p className="max-w-[52ch] text-[15px] leading-6 text-charcoal">
            Planning more than a transfer? See{" "}
            <Link href="/vehicle-rentals" className="font-label text-sm font-semibold uppercase tracking-tight text-navy shadow-[inset_0_-2px_0_var(--color-golden-yellow)]">
              vehicle rentals
            </Link>{" "}
            or{" "}
            <Link href="/tours" className="font-label text-sm font-semibold uppercase tracking-tight text-navy shadow-[inset_0_-2px_0_var(--color-golden-yellow)]">
              tours and experiences
            </Link>
            .
          </p>
        </div>
      </section>
      <JsonLd data={serviceJsonLd({ name: "Airport transfers", description, path: "/airport-transfers" })} />
    </>
  );
}
