import { MessageCircle } from "lucide-react";
import { whatsappLink, whatsappMessages } from "@/lib/whatsapp";

/** Floating WhatsApp action: compact on phones, labelled from md up. No pop-ups. */
export function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(whatsappMessages.general)}
      target="_blank"
      rel="noopener noreferrer"
      data-track="whatsapp_click"
      aria-label="Chat with R.K Travels on WhatsApp"
      className="group fixed right-4 bottom-4 z-30 inline-flex h-[52px] w-[52px] items-center justify-center gap-2 overflow-hidden rounded-control bg-navy font-heading text-sm leading-5 font-semibold text-white shadow-menu transition-[background-color,transform] duration-200 ease-brand hover:-translate-y-0.5 hover:bg-navy-hover md:right-5 md:bottom-5 md:w-auto md:pr-5 md:pl-4"
    >
      <MessageCircle aria-hidden className="size-[22px] shrink-0" strokeWidth={1.75} />
      <span className="hidden md:inline">WhatsApp us</span>
      <span aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-golden-yellow" />
    </a>
  );
}
