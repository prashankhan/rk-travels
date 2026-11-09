import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = { ...pageMetadata({ title: "Privacy policy", description: "How R.K Travels uses the details you send through this website.", path: "/privacy" }), robots: { index: true, follow: true } };

export default function PrivacyPage() {
  return (
    <article className="container-site max-w-narrow py-16 lg:py-24">
      <p className="type-eyebrow text-golden-yellow">Legal</p>
      <h1 className="type-display-lg mt-4 text-navy">Privacy policy</h1>
      <div className="mt-10 flex flex-col gap-5 text-charcoal [&_h2]:type-heading-3 [&_h2]:mt-6 [&_h2]:text-navy">
        <p className="type-lead">This page explains how {site.name} uses the information you share with us through this website.</p>
        <h2>What we collect</h2>
        <p>When you send an enquiry form, we receive the details you enter, such as your name, WhatsApp number, travel dates, locations and any notes. We do not ask for payment details on this website.</p>
        <h2>How we use it</h2>
        <p>We use your details only to reply to your enquiry and to arrange the services you ask about. Your enquiry is delivered to us by email through our email provider.</p>
        <h2>Analytics</h2>
        <p>If you agree, we use Google Analytics to understand how visitors use the site. Analytics cookies are not set unless you accept them, and you can withdraw consent by clearing your browser data.</p>
        <h2>WhatsApp</h2>
        <p>If you contact us on WhatsApp, your messages are handled by WhatsApp under its own privacy policy.</p>
        <h2>Contact</h2>
        <p>Questions about your information? Contact us on WhatsApp or by phone at {site.phone.display}.</p>
      </div>
    </article>
  );
}
