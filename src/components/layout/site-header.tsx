"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";
import { ChevronDown, ArrowRight } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { cn } from "@/lib/utils";

const linkClass =
  "inline-flex h-11 items-center gap-1 rounded-control px-3 text-[15px] leading-5 font-medium text-charcoal transition-colors duration-150 hover:bg-warm-white hover:text-navy";
const currentClass = "text-navy shadow-[inset_0_-2px_0_var(--color-golden-yellow)]";

export function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/97 backdrop-blur-[2px]">
      <div className="container-site flex h-16 items-center gap-8 lg:h-[76px]">
        <Logo priority className="h-[38px] lg:h-[46px]" />

        <NavigationMenu.Root aria-label="Main" className="ml-auto hidden lg:block" delayDuration={80}>
          <NavigationMenu.List className="flex items-center gap-1">
            {mainNav.map((item) =>
              item.items ? (
                <NavigationMenu.Item key={item.label} className="relative">
                  <NavigationMenu.Trigger
                    className={cn(linkClass, "group cursor-pointer", item.items.some((i) => isCurrent(pathname, i.href)) || isCurrent(pathname, item.href) ? currentClass : "")}
                  >
                    {item.label}
                    <ChevronDown aria-hidden className="size-4 transition-transform duration-200 group-data-[state=open]:rotate-180" strokeWidth={1.75} />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute top-[calc(100%+8px)] left-[-8px] w-[340px] rounded-menu border border-border bg-white p-2 shadow-menu motion-safe:animate-fade-up">
                    <ul>
                      {item.items.map((sub) => (
                        <li key={sub.href}>
                          <NavigationMenu.Link asChild active={isCurrent(pathname, sub.href)}>
                            <Link href={sub.href} className="flex flex-col gap-0.5 rounded-sm px-3.5 py-3 transition-colors hover:bg-warm-white data-[active]:bg-warm-white">
                              <span className="font-heading text-[15px] leading-5 font-semibold text-navy">{sub.label}</span>
                              <span className="text-[13px] leading-[18px] text-muted">{sub.description}</span>
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 border-t border-border px-3.5 pt-3 pb-2">
                      <NavigationMenu.Link asChild>
                        <Link href={item.href} className="group/all inline-flex items-center gap-2 py-1.5 font-heading text-[15px] font-semibold text-navy shadow-[inset_0_-2px_0_var(--color-golden-yellow)]">
                          All services <ArrowRight aria-hidden className="size-[18px] transition-transform group-hover/all:translate-x-[3px]" strokeWidth={1.75} />
                        </Link>
                      </NavigationMenu.Link>
                    </div>
                  </NavigationMenu.Content>
                </NavigationMenu.Item>
              ) : (
                <NavigationMenu.Item key={item.label}>
                  <NavigationMenu.Link asChild active={isCurrent(pathname, item.href)}>
                    <Link href={item.href} aria-current={isCurrent(pathname, item.href) ? "page" : undefined} className={cn(linkClass, isCurrent(pathname, item.href) && currentClass)}>
                      {item.label}
                    </Link>
                  </NavigationMenu.Link>
                </NavigationMenu.Item>
              ),
            )}
          </NavigationMenu.List>
        </NavigationMenu.Root>

        <Button asChild size="sm" className="hidden lg:inline-flex">
          <Link href="/contact#enquiry">Plan your journey</Link>
        </Button>

        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}
