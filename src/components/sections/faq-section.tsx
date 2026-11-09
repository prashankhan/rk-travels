import type { Faq } from "@/data/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/** FAQ list with matching FAQPage structured data. */
export function FaqSection({
  faqs,
  title = "Questions, answered",
  eyebrow = "FAQs",
  intro,
  className,
}: {
  faqs: Faq[];
  title?: string;
  eyebrow?: string;
  intro?: string;
  className?: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  return (
    <section aria-labelledby="faq-title" className={cn("section-y", className)}>
      <div className="container-site grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] lg:items-start lg:gap-20">
        <div className="flex flex-col gap-4 lg:sticky lg:top-28">
          <p className="type-eyebrow text-golden-yellow">{eyebrow}</p>
          <h2 id="faq-title" className="type-heading-1 text-navy">{title}</h2>
          {intro ? <p className="type-lead max-w-[36ch] text-charcoal">{intro}</p> : null}
        </div>
        <Accordion type="multiple" defaultValue={["item-0"]}>
          {faqs.map((f, i) => (
            <AccordionItem key={f.question} value={`item-${i}`}>
              <AccordionTrigger>{f.question}</AccordionTrigger>
              <AccordionContent><p>{f.answer}</p></AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
    </section>
  );
}
