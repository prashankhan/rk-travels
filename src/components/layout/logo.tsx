import Image from "next/image";
import Link from "next/link";
import { logos } from "@/lib/site";
import { cn } from "@/lib/utils";

/** The approved full-colour logo, unmodified. Height drives the size; proportions are fixed. */
export function Logo({ className, priority, href = "/", label = "R.K Travels home" }: { className?: string; priority?: boolean; href?: string | null; label?: string }) {
  const img = (
    <Image
      src={logos.primary.src}
      width={logos.primary.width}
      height={logos.primary.height}
      alt={href ? label : "R.K Travels"}
      priority={priority}
      sizes="(min-width: 1024px) 180px, 140px"
      className={cn("h-[46px] w-auto", className)}
    />
  );
  if (!href) return img;
  return (
    <Link href={href} className="block shrink-0 rounded-control">
      {img}
    </Link>
  );
}
