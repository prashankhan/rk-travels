import type { Destination } from "@/data/destinations";
import { Photo } from "./photo";
import { cn } from "@/lib/utils";

/** Editorial inspiration: tall photo, region eyebrow, serif name. Not a package. */
export function DestinationCard({ destination, size = "md", className }: { destination: Destination; size?: "md" | "lg"; className?: string }) {
  return (
    <article className={cn("group flex flex-col gap-4", className)}>
      <div className={cn("relative overflow-hidden rounded-card", size === "lg" ? "aspect-[4/5] lg:aspect-auto lg:min-h-[560px] lg:flex-1" : "aspect-[4/5]")}>
        <Photo
          image={destination.image}
          sizes={size === "lg" ? "(min-width: 1024px) 600px, 100vw" : "(min-width: 1024px) 300px, 50vw"}
          className="rounded-card"
          imgClassName="transition-transform duration-500 ease-brand group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <p className="type-eyebrow text-muted">{destination.region}</p>
        <h3 className={cn("text-navy", size === "lg" ? "type-display-md" : "type-display-sm")}>{destination.name}</h3>
        <p className="max-w-[44ch] text-[15px] leading-6 text-muted">{destination.note}</p>
      </div>
    </article>
  );
}
