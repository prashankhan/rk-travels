import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/data/services";
import { Photo } from "./photo";

/** Editorial card for the three primary services. The whole card is one link. */
export function ServiceCard({ service, headingLevel: H = "h3" }: { service: Service; headingLevel?: "h2" | "h3" }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-border bg-white shadow-card transition-[box-shadow,transform] duration-200 ease-brand hover:-translate-y-0.5 hover:shadow-card-hover">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Photo image={service.image} sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw" imgClassName="transition-transform duration-500 ease-brand group-hover:scale-[1.04]" className="border-0 border-b" />
      </div>
      <div className="relative flex flex-1 flex-col gap-3 px-6 pt-6 pb-7">
        <span aria-hidden className="absolute top-0 left-6 h-0.5 w-12 bg-golden-yellow" />
        <span className="type-eyebrow text-golden-yellow">{service.index}</span>
        <H className="type-heading-3 text-navy">
          <Link href={service.href} className="after:absolute after:inset-0 after:z-[1] after:content-['']">
            {service.title}
          </Link>
        </H>
        <p className="mb-2 text-[15px] leading-6 text-charcoal">{service.summary}</p>
        <span aria-hidden className="mt-auto inline-flex items-center gap-2 self-start py-1.5 font-label text-sm leading-5 font-semibold uppercase tracking-tight text-navy shadow-[inset_0_-2px_0_var(--color-golden-yellow)]">
          {service.linkLabel}
          <ArrowRight className="size-[18px] transition-transform duration-200 group-hover:translate-x-[3px]" strokeWidth={1.75} />
        </span>
      </div>
    </article>
  );
}
