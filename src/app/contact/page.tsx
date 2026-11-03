import { PageHero } from "@/components/sections/page-hero";
import { ContactPanel } from "@/components/sections/contact-panel";
import { ContactForm } from "@/components/forms/contact-form";
import { whatsappMessages } from "@/lib/whatsapp";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact us",
  description: "Contact R.K Travels in Negombo, Sri Lanka. Call or WhatsApp +94 74 363 8418, or send an enquiry about transfers, vehicle rentals or tours.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let&rsquo;s plan <em className="italic">your journey.</em></>}
        intro="Message us on WhatsApp, give us a call, or send the form below. We will reply to talk through your plans."
        aside={<ContactPanel message={whatsappMessages.contact} note="WhatsApp is usually the easiest way to share details and photos of your plans." />}
      />
      <section id="enquiry" aria-labelledby="enquiry-title" className="section-y">
        <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.7fr] lg:gap-20">
          <div className="flex flex-col gap-4">
            <p className="type-eyebrow flex items-center gap-3 text-muted"><span aria-hidden className="rule-accent" />General enquiry</p>
            <h2 id="enquiry-title" className="type-heading-1 text-navy">Send us a message.</h2>
            <p className="type-lead text-charcoal">Ask a question or tell us about your trip. For a specific service, the forms on the airport transfers, vehicle rentals and tours pages ask for the details we need.</p>
          </div>
          <div className="rounded-card border border-border bg-white p-5 shadow-card sm:p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
