import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMetadata({ title: "Terms of use", description: "Terms for using the R.K Travels website and enquiry forms.", path: "/terms" });

export default function TermsPage() {
  return (
    <article className="container-site max-w-narrow py-16 lg:py-24">
      <p className="type-eyebrow text-golden-yellow">Legal</p>
      <h1 className="type-display-lg mt-4 text-navy">Terms of use</h1>
      <div className="mt-10 flex flex-col gap-5 text-charcoal [&_h2]:type-heading-3 [&_h2]:mt-6 [&_h2]:text-navy">
        <p className="type-lead">These terms cover your use of the {site.name} website.</p>
        <h2>Enquiries are not bookings</h2>
        <p>Sending a form or a WhatsApp message is an enquiry. Services, availability, prices and any conditions are confirmed by {site.name} directly before anything is arranged.</p>
        <h2>Website information</h2>
        <p>We aim to keep the information on this site accurate. Destination descriptions are general inspiration and do not describe fixed tour packages.</p>
        <h2>Contact</h2>
        <p>For questions about these terms, contact us on WhatsApp or by phone at {site.phone.display}.</p>
      </div>
    </article>
  );
}
