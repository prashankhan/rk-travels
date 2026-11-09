import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
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
      className="group fixed right-4 bottom-4 z-30 inline-flex h-[52px] w-[52px] items-center justify-center gap-2 overflow-hidden rounded-control bg-whatsapp font-heading text-sm leading-5 font-semibold text-white shadow-menu transition-[background-color,transform] duration-200 ease-brand hover:-translate-y-0.5 hover:bg-whatsapp-hover md:right-5 md:bottom-5 md:w-auto md:pr-5 md:pl-4"
    >
      <WhatsAppIcon className="size-[22px]" />
      <span className="hidden md:inline">WhatsApp us</span>
    </a>
  );
}
