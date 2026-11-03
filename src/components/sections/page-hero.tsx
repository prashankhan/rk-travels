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

/** Inner-page hero: text-led on white, with a tall photograph (or an aside) on the right. */
export function PageHero({ eyebrow, title, intro, actions, image, aside, className }: Props) {
  return (
    <section className={cn("border-b border-border", className)}>
      <div className="container-site grid items-end gap-10 pt-12 pb-14 md:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-16 lg:pt-20 lg:pb-20">
        <div className="reveal flex flex-col gap-5">
          <p className="type-eyebrow flex items-center gap-3 text-muted">
            <span aria-hidden className="rule-accent" />
            {eyebrow}
          </p>
          <h1 className="type-display-lg max-w-[16ch] text-navy">{title}</h1>
          <div className="type-lead max-w-[56ch] text-charcoal">{intro}</div>
          {actions ? <div className="mt-3 flex flex-col gap-3 sm:flex-row">{actions}</div> : null}
        </div>
        {image ? (
          <div className="relative aspect-[4/3] overflow-hidden rounded-card lg:aspect-[5/4]">
            <Photo image={image} sizes="(min-width: 1024px) 560px, 100vw" priority className="rounded-card" />
          </div>
        ) : aside ? (
          <div>{aside}</div>
        ) : null}
      </div>
    </section>
  );
}
