"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavigationMenu } from "radix-ui";
import { ChevronDown, ArrowRight } from "lucide-react";
import { mainNav } from "@/data/navigation";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { PlanJourneyButton } from "./plan-journey-button";
import { cn } from "@/lib/utils";

const linkClass =
  "inline-flex items-center gap-1.5 py-3 font-label text-base leading-none font-semibold uppercase tracking-tight text-charcoal transition-colors duration-150 hover:text-navy";
const currentClass = "text-navy shadow-[inset_0_-2px_0_var(--color-golden-yellow)]";

export function isCurrent(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/97 backdrop-blur-[2px]">
      <div className="container-site flex h-[68px] items-center gap-8 lg:h-[84px]">
        <Logo priority className="h-14 lg:h-[70px]" />

        <NavigationMenu.Root aria-label="Main" className="ml-auto hidden lg:block" delayDuration={80}>
          <NavigationMenu.List className="flex items-center gap-7">
            {mainNav.map((item) =>
              item.items ? (
                <NavigationMenu.Item key={item.label} className="relative">
                  <NavigationMenu.Trigger
                    className={cn(linkClass, "group cursor-pointer", item.items.some((i) => isCurrent(pathname, i.href)) || isCurrent(pathname, item.href) ? currentClass : "")}
                  >
                    {item.label}
                    <ChevronDown aria-hidden className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180" strokeWidth={1.75} />
                  </NavigationMenu.Trigger>
                  <NavigationMenu.Content className="absolute top-[calc(100%+8px)] left-[-8px] w-[280px] rounded-control border border-border bg-white p-2 shadow-menu motion-safe:animate-fade-up">
                    <ul>
                      {item.items.map((sub) => (
                        <li key={sub.href}>
                          <NavigationMenu.Link asChild active={isCurrent(pathname, sub.href)}>
                            <Link href={sub.href} className="flex rounded-control px-3.5 py-3 font-label text-base leading-5 font-semibold uppercase tracking-tight text-navy transition-colors hover:bg-warm-white data-[active]:bg-warm-white">
                              {sub.label}
                            </Link>
                          </NavigationMenu.Link>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-2 border-t border-border px-3.5 pt-3 pb-2">
                      <NavigationMenu.Link asChild>
                        <Link href={item.href} className="group/all inline-flex items-center gap-2 py-1.5 font-label text-base font-semibold uppercase tracking-tight text-navy shadow-[inset_0_-2px_0_var(--color-golden-yellow)]">
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

        <PlanJourneyButton className="hidden lg:inline-flex" />

        <MobileNav pathname={pathname} />
      </div>
    </header>
  );
}
