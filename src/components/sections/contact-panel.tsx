import { MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { telLink, whatsappLink } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Verified contact details only: WhatsApp, phone, location. */
export function ContactPanel({ message, note, className }: { message: string; note?: string; className?: string }) {
  const wa = whatsappLink(message);
  const rows = [
    { icon: MessageCircle, label: "WhatsApp", value: site.phone.display, href: wa, external: true, track: "whatsapp_click" },
    { icon: Phone, label: "Phone", value: site.phone.display, href: telLink(), track: "phone_click" },
    { icon: MapPin, label: "Location", value: site.location.display },
  ];
  return (
    <div className={cn("rounded-card border border-border bg-white shadow-card", className)}>
      <ul>
        {rows.map((r) => (
          <li key={r.label} className="flex items-center gap-4 border-b border-border p-6">
            <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-warm-white text-navy">
              <r.icon className="size-5" strokeWidth={1.75} />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="type-eyebrow text-muted">{r.label}</span>
              {r.href ? (
                <a
                  href={r.href}
                  target={r.external ? "_blank" : undefined}
                  rel={r.external ? "noopener noreferrer" : undefined}
                  data-track={r.track}
                  className="font-heading text-lg leading-[26px] font-semibold text-navy hover:underline hover:decoration-golden-yellow hover:decoration-2 hover:underline-offset-4"
                >
                  {r.value}
                </a>
              ) : (
                <span className="font-heading text-lg leading-[26px] font-semibold text-navy">{r.value}</span>
              )}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-3 p-6">
        <Button asChild className="flex-[1_1_200px]">
          <a href={wa} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">
            <MessageCircle aria-hidden strokeWidth={1.75} /> Chat on WhatsApp
          </a>
        </Button>
        <Button asChild variant="outline" className="flex-[1_1_200px]">
          <a href={telLink()} data-track="phone_click">
            <Phone aria-hidden strokeWidth={1.75} /> Call now
          </a>
        </Button>
      </div>
      {note ? <p className="px-6 pb-6 text-[13px] leading-[18px] text-muted">{note}</p> : null}
    </div>
  );
}
