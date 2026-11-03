"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/data/navigation";
import { site } from "@/lib/site";
import { telLink, whatsappLink, whatsappMessages } from "@/lib/whatsapp";
import { Logo } from "./logo";
import { cn } from "@/lib/utils";

function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

const iconBtn = "inline-flex size-11 items-center justify-center rounded-control border border-border bg-white text-navy";

export function MobileNav({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className={cn(iconBtn, "ml-auto lg:hidden")} aria-label="Open menu">
        <Menu className="size-6" strokeWidth={1.75} aria-hidden />
      </SheetTrigger>
      <SheetContent>
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation and contact options</SheetDescription>
        <div className="flex h-16 shrink-0 items-center border-b border-border px-4">
          <Logo href="/" className="h-[38px]" />
          <SheetClose className={cn(iconBtn, "ml-auto")} aria-label="Close menu">
            <X className="size-6" strokeWidth={1.75} aria-hidden />
          </SheetClose>
        </div>
        <nav aria-label="Main" className="flex-1 px-4 py-3">
          <ul>
            {mainNav.map((item) =>
              item.items ? (
                <li key={item.label} className="border-b border-border pb-3">
                  <p className="type-eyebrow pt-6 pb-2 text-muted">{item.label}</p>
                  <ul>
                    {[...item.items, { label: "All services", href: item.href }].map((sub) => (
                      <li key={sub.href}>
                        <Link
                          href={sub.href}
                          onClick={close}
                          aria-current={pathname === sub.href ? "page" : undefined}
                          className="flex min-h-11 items-center text-[17px] leading-6 text-charcoal aria-[current=page]:font-medium aria-[current=page]:text-navy"
                        >
                          {sub.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={close}
                    aria-current={isCurrent(pathname, item.href) ? "page" : undefined}
                    className="flex min-h-14 items-center border-b border-border text-xl leading-7 font-medium text-navy aria-[current=page]:pl-3 aria-[current=page]:shadow-[inset_3px_0_0_var(--color-golden-yellow)]"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="flex flex-col gap-3 border-t border-border bg-warm-white px-4 pt-6 pb-8">
          <Button asChild fullWidth>
            <Link href="/contact#enquiry" onClick={close}>Plan your journey</Link>
          </Button>
          <Button asChild variant="outline" fullWidth>
            <a href={whatsappLink(whatsappMessages.general)} target="_blank" rel="noopener noreferrer" data-track="whatsapp_click">
              <MessageCircle aria-hidden strokeWidth={1.75} /> Chat on WhatsApp
            </a>
          </Button>
          <a href={telLink()} data-track="phone_click" className="inline-flex min-h-11 items-center justify-center gap-2 text-[15px] text-navy">
            <Phone aria-hidden className="size-4" strokeWidth={1.75} /> Call {site.phone.display}
          </a>
        </div>
      </SheetContent>
    </Sheet>
  );
}
