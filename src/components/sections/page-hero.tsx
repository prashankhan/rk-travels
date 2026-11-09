import type { SiteImage } from "@/data/images";
import { Photo } from "./photo";
import { cn } from "@/lib/utils";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro: React.ReactNode;
  actions?: React.ReactNode;
  image?: SiteImage;
  aside?: React.ReactNode;
  className?: string;
};

/** Inner-page hero. A photograph fills the header; the contact page keeps a side panel instead. */
export function PageHero({ eyebrow, title, intro, actions, image, aside, className }: Props) {
  if (image) {
    return (
      <section className={cn("relative isolate flex min-h-[480px] items-end overflow-hidden bg-charcoal text-white md:min-h-[540px] lg:min-h-[600px]", className)}>
        <Photo image={image} sizes="100vw" priority tone="dark" />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(6,39,77,0.82)_0%,rgba(6,39,77,0.62)_48%,rgba(6,39,77,0.28)_100%)] md:bg-[linear-gradient(100deg,rgba(6,39,77,0.78)_0%,rgba(6,39,77,0.62)_38%,rgba(6,39,77,0.22)_88%)]"
        />
        <div className="on-dark relative container-site py-16 md:py-20 lg:py-24">
          <div className="reveal flex max-w-[720px] flex-col gap-5">
            <p className="type-eyebrow text-golden-yellow">{eyebrow}</p>
            <h1 className="type-display-lg max-w-[16ch] text-white">{title}</h1>
            <div className="type-lead max-w-[56ch] text-white/92">{intro}</div>
            {actions ? <div className="mt-3 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("border-b border-border", className)}>
      <div className="container-site grid items-end gap-10 pt-12 pb-14 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-20 lg:pb-20">
        <div className="reveal flex flex-col gap-5">
          <p className="type-eyebrow text-golden-yellow">{eyebrow}</p>
          <h1 className="type-display-lg max-w-[16ch] text-navy">{title}</h1>
          <div className="type-lead max-w-[56ch] text-charcoal">{intro}</div>
          {actions ? <div className="mt-3 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
        </div>
        {aside ? <div>{aside}</div> : null}
      </div>
    </section>
  );
}
