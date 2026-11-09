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
      <section id="enquiry" aria-labelledby="enquiry-title" className="section-y border-y border-border bg-warm-white">
        <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-start lg:gap-20">
          <div className="flex flex-col gap-4 lg:sticky lg:top-28">
            <p className="type-eyebrow text-golden-yellow">General enquiry</p>
            <h2 id="enquiry-title" className="type-heading-1 text-navy">Send us a message.</h2>
            <p className="type-lead max-w-[36ch] text-charcoal">
              Ask a question or tell us about your trip. For a specific service, the forms on the airport transfers, vehicle rentals and tours pages ask for the details we need.
            </p>
          </div>
          <div className="rounded-card border border-border bg-white p-5 shadow-card sm:p-8 lg:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
