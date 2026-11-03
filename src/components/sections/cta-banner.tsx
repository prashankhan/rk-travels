import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

type Props = {
  eyebrow?: string;
  title?: React.ReactNode;
  text?: React.ReactNode;
  primary?: { label: string; href: string };
  message?: string;
};

/** Closing call to action: warm-white panel, serif statement, yellow rule. Never a navy block. */
export function CTABanner({
  eyebrow = "Plan with us",
  title = (
    <>
      Tell us where you are going. <em className="italic">We will handle the journey.</em>
    </>
  ),
  text = "Share your dates and plans by form or WhatsApp, and we will reply to confirm the details.",
  primary = { label: "Plan your journey", href: "/contact#enquiry" },
  message = whatsappMessages.general,
}: Props) {
  return (
    <section aria-labelledby="cta-title" className="container-site section-y">
      <div className="relative grid gap-8 overflow-hidden rounded-card bg-warm-white px-5 pt-12 pb-6 md:px-12 md:py-14 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-12 lg:p-16">
        <span aria-hidden className="absolute top-0 left-5 h-1 w-16 bg-golden-yellow md:left-12 lg:left-16" />
        <div className="flex flex-col gap-4">
          <p className="type-eyebrow text-muted">{eyebrow}</p>
          <h2 id="cta-title" className="type-display-md text-navy">{title}</h2>
          <p className="max-w-[46ch] text-[17px] leading-7 text-charcoal">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Button asChild>
            <Link href={primary.href}>{primary.label}</Link>
          </Button>
          <Button asChild variant="outline">
            <a href={whatsappLink(message)} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">
              <MessageCircle aria-hidden strokeWidth={1.75} /> WhatsApp us
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
