import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-site flex min-h-[60vh] flex-col items-start justify-center gap-5 py-20">
      <p className="type-eyebrow flex items-center gap-3 text-muted"><span aria-hidden className="rule-accent" />Page not found</p>
      <h1 className="type-display-lg max-w-[16ch] text-navy">This road does not go anywhere.</h1>
      <p className="type-lead max-w-[52ch] text-charcoal">The page you were looking for has moved or no longer exists.</p>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row">
        <Button asChild><Link href="/">Back to home</Link></Button>
        <Button asChild variant="outline"><Link href="/contact">Contact us</Link></Button>
      </div>
    </section>
  );
}
