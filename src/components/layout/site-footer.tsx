import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { footerNav } from "@/data/navigation";
import { site } from "@/lib/site";
import { telLink, whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { Logo } from "./logo";
import { CopyrightYear } from "./copyright-year";

const linkCls = "text-[15px] leading-[22px] text-charcoal hover:text-navy hover:underline hover:decoration-golden-yellow hover:decoration-2 hover:underline-offset-4";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-warm-white">
      <div className="container-site pt-16 pb-8 lg:pt-[72px]">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1.2fr_1.3fr] lg:gap-12">
          <div>
            <Logo className="h-[52px]" />
            <p className="mt-5 max-w-[34ch] text-[15px] leading-6 text-muted">
              Airport transfers, vehicle rentals and tours across Sri Lanka, arranged from Negombo.
            </p>
          </div>
          <nav aria-label="Explore">
            <p className="type-eyebrow mb-4 text-navy">Explore</p>
            <ul className="flex flex-col gap-2.5">
              {footerNav.explore.map((l) => (
                <li key={l.href}><Link className={linkCls} href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Services">
            <p className="type-eyebrow mb-4 text-navy">Services</p>
            <ul className="flex flex-col gap-2.5">
              {footerNav.services.map((l) => (
                <li key={l.href}><Link className={linkCls} href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="type-eyebrow mb-4 text-navy">Contact</p>
            <ul className="flex flex-col gap-3 text-[15px] leading-[22px]">
              <li>
                <a href={whatsappLink(whatsappMessages.general)} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click" className="inline-flex items-center gap-2 font-medium text-navy hover:underline hover:decoration-golden-yellow hover:underline-offset-4">
                  <WhatsAppIcon className="size-[18px]" /> WhatsApp {site.phone.display}
                </a>
              </li>
              <li>
                <a href={telLink()} data-track="phone_click" className="inline-flex items-center gap-2 font-medium text-navy hover:underline hover:decoration-golden-yellow hover:underline-offset-4">
                  <Phone aria-hidden className="size-[18px]" strokeWidth={1.75} /> Call {site.phone.display}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-charcoal">
                <MapPin aria-hidden className="size-[18px] text-navy" strokeWidth={1.75} /> {site.location.display}
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5 text-[13px] leading-[18px] text-muted">
          <p>© <CopyrightYear /> {site.name}</p>
          <ul className="flex gap-5">
            <li><Link href="/privacy" className="underline-offset-4 hover:text-navy hover:underline">Privacy policy</Link></li>
            <li><Link href="/terms" className="underline-offset-4 hover:text-navy hover:underline">Terms</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
