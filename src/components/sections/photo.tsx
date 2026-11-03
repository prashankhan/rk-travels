import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { SiteImage } from "@/data/images";
import { cn } from "@/lib/utils";

type PhotoProps = {
  image: SiteImage;
  sizes: string;
  priority?: boolean;
  tone?: "light" | "dark";
  className?: string;
  imgClassName?: string;
};

/**
 * Fills its (relatively positioned) parent. Renders the real photograph when `image.src` is set,
 * otherwise an honest "Photo pending" slot naming the intended shot.
 */
export function Photo({ image, sizes, priority, tone = "light", className, imgClassName }: PhotoProps) {
  if (image.src) {
    return (
      <div className={cn("absolute inset-0 overflow-hidden bg-warm-white", className)}>
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn("object-cover", imgClassName)}
          style={image.focus ? { objectPosition: image.focus } : undefined}
        />
      </div>
    );
  }
  const dark = tone === "dark";
  return (
    <div
      role="img"
      aria-label={`Photograph pending: ${image.subject}`}
      className={cn(
        "absolute inset-0 flex flex-col justify-between overflow-hidden p-4",
        dark
          ? "items-end bg-[linear-gradient(160deg,#2c3c50_0%,#263445_55%,#1d2a3a_100%)] text-right text-white/75"
          : "border border-dashed border-border-strong/70 bg-warm-white text-muted",
        className,
      )}
    >
      <ImageIcon aria-hidden className="size-5" strokeWidth={1.75} />
      <span className="flex flex-col gap-1 text-[13px] leading-[18px]">
        <span className={cn("type-eyebrow", dark ? "text-white/75" : "text-muted")}>Photo pending</span>
        <span>{image.subject}</span>
      </span>
    </div>
  );
}
