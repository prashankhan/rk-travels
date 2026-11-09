import Link from "next/link";
import { Button } from "@/components/ui/button";
import { images } from "@/data/images";
import { Photo } from "./photo";

/** Locked home hero: full-width photograph, navy scrim, approved copy. */
export function HomeHero() {
  return (
    <section aria-labelledby="hero-title" className="relative isolate flex min-h-[calc(100dvh-var(--header-height))] items-end overflow-hidden bg-charcoal text-white">
      <Photo image={images.homeHero} sizes="100vw" priority tone="dark" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(6,39,77,0.78)_0%,rgba(6,39,77,0.62)_45%,rgba(6,39,77,0.18)_100%)] md:bg-[linear-gradient(100deg,rgba(6,39,77,0.74)_0%,rgba(6,39,77,0.66)_32%,rgba(6,39,77,0.16)_85%)]"
      />
      <div className="on-dark relative container-site pb-16 md:pb-24 lg:pb-28">
        <p className="type-eyebrow reveal text-golden-yellow">Negombo · Sri Lanka</p>
        <h1 id="hero-title" className="type-display-hero reveal mt-4 mb-5 max-w-[11ch] text-white [animation-delay:80ms]">
          Your Journey, Our Priority.
        </h1>
        <p className="type-lead reveal max-w-[560px] text-white/92 [animation-delay:160ms]">
          From seamless airport transfers and comfortable vehicle rentals to memorable journeys across Sri Lanka, travel with confidence every step of the way.
        </p>
        <div className="reveal mt-8 flex flex-col gap-3 sm:flex-row [animation-delay:240ms]">
          <Button asChild>
            <Link href="/contact#enquiry">Plan your journey</Link>
          </Button>
          <Button asChild variant="outline-inverse">
            <Link href="/services">Explore our services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
