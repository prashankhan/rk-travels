import { ContactPanel } from "./contact-panel";

type Props = {
  id: string;
  eyebrow: string;
  title: string;
  intro: string;
  form: React.ReactNode;
  whatsappMessage: string;
  notes?: string[];
};

/** Form in a card on the left, contact panel and "what happens next" on the right. */
export function EnquirySection({ id, eyebrow, title, intro, form, whatsappMessage, notes }: Props) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="border-y border-border bg-warm-white">
      <div className="container-site py-16 lg:py-24">
        <div className="flex max-w-[680px] flex-col gap-4">
          <p className="type-eyebrow flex items-center gap-3 text-muted"><span aria-hidden className="rule-accent" />{eyebrow}</p>
          <h2 id={`${id}-title`} className="type-heading-1 text-navy">{title}</h2>
          <p className="type-lead text-charcoal">{intro}</p>
        </div>
        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[1.7fr_1fr] lg:gap-10">
          <div className="rounded-card border border-border bg-white p-5 shadow-card sm:p-8 lg:p-10">{form}</div>
          <div className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <div className="flex flex-col gap-2">
              <h3 className="type-heading-4 text-navy">Prefer to chat?</h3>
              <p className="text-[15px] leading-6 text-charcoal">Message us on WhatsApp with the same details and we will reply there.</p>
            </div>
            <ContactPanel message={whatsappMessage} />
            {notes?.length ? (
              <div className="flex flex-col gap-3 border-t border-border pt-6">
                <h3 className="type-heading-4 text-navy">What happens next</h3>
                <ol className="flex flex-col gap-3">
                  {notes.map((n, i) => (
                    <li key={n} className="flex gap-3 text-[15px] leading-6 text-charcoal">
                      <span className="font-heading font-semibold text-navy">{i + 1}.</span>
                      {n}
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
