import type { Destination } from "@/data/destinations";
import { Photo } from "./photo";
import { cn } from "@/lib/utils";

/** Editorial inspiration: tall photo with title overlaid. Not a package. */
export function DestinationCard({ destination, size = "md", className }: { destination: Destination; size?: "md" | "lg"; className?: string }) {
  return (
    <article className={cn("group relative overflow-hidden rounded-card", size === "lg" ? "aspect-[4/5] lg:aspect-auto lg:min-h-[560px] lg:h-full" : "aspect-[4/5]", className)}>
      <Photo
        image={destination.image}
        sizes={size === "lg" ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 300px, 50vw"}
        tone="dark"
        className="rounded-card"
        imgClassName="transition-transform duration-500 ease-brand group-hover:scale-[1.04]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(6,39,77,0.82)_0%,rgba(6,39,77,0.35)_42%,rgba(6,39,77,0.08)_100%)]"
      />
      <div className="on-dark relative flex h-full flex-col justify-end gap-1.5 p-5 md:p-6 lg:p-7">
        <p className="type-eyebrow text-golden-yellow">{destination.region}</p>
        <h3 className={cn("text-white", size === "lg" ? "type-display-md" : "type-display-sm")}>{destination.name}</h3>
        <p className={cn("max-w-[44ch] text-white/88", size === "lg" ? "text-[15px] leading-6" : "text-sm leading-5")}>{destination.note}</p>
      </div>
    </article>
  );
}
