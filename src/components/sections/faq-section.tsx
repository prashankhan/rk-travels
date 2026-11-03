import type { Faq } from "@/data/faqs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

/** FAQ list with matching FAQPage structured data. */
export function FaqSection({ faqs, title = "Questions, answered", eyebrow = "FAQs", className }: { faqs: Faq[]; title?: string; eyebrow?: string; className?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
  return (
    <section aria-labelledby="faq-title" className={cn("section-y", className)}>
      <div className="container-site grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-16">
        <div className="flex flex-col gap-4">
          <p className="type-eyebrow flex items-center gap-3 text-muted">
            <span aria-hidden className="rule-accent" />
            {eyebrow}
          </p>
          <h2 id="faq-title" className="type-heading-1 text-navy">{title}</h2>
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
