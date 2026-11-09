import { cn } from "@/lib/utils";

export type Step = { title: string; text: string };

/** Numbered horizontal process — a timeline, not cards. */
export function Steps({ steps, className }: { steps: Step[]; className?: string }) {
  return (
    <ol className={cn("grid gap-8 md:grid-cols-3 md:gap-0", className)}>
      {steps.map((s, i) => (
        <li key={s.title} className="relative flex flex-col gap-3 border-t border-border pt-6 md:pr-10">
          <span aria-hidden className="absolute -top-px left-0 h-0.5 w-12 bg-golden-yellow" />
          <span className="font-display text-[44px] leading-none text-navy">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="type-heading-3 text-navy">{s.title}</h3>
          <p className="max-w-[36ch] text-[15px] leading-6 text-charcoal">{s.text}</p>
        </li>
      ))}
    </ol>
  );
}
