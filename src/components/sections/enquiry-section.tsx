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
    <section id={id} aria-labelledby={`${id}-title`} className="section-y border-y border-border bg-warm-white">
      <div className="container-site">
        <div className="flex max-w-[680px] flex-col gap-4">
          <p className="type-eyebrow text-golden-yellow">{eyebrow}</p>
          <h2 id={`${id}-title`} className="type-heading-1 text-navy">{title}</h2>
          <p className="type-lead text-charcoal">{intro}</p>
        </div>
        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-[1.7fr_1fr] lg:gap-12">
          <div className="rounded-card border border-border bg-white p-5 shadow-card sm:p-8 lg:p-10">{form}</div>
          <div className="flex flex-col gap-8 lg:sticky lg:top-28 lg:self-start">
            <div className="relative flex flex-col gap-3 border-t border-border pt-8">
              <span aria-hidden className="absolute top-0 left-0 h-0.5 w-12 bg-golden-yellow" />
              <h3 className="type-heading-3 text-navy">Prefer to chat?</h3>
              <p className="text-[15px] leading-6 text-charcoal">Message us on WhatsApp with the same details and we will reply there.</p>
            </div>
            <ContactPanel message={whatsappMessage} />
            {notes?.length ? (
              <div className="relative flex flex-col gap-4 border-t border-border pt-8">
                <span aria-hidden className="absolute top-0 left-0 h-0.5 w-12 bg-golden-yellow" />
                <h3 className="type-heading-3 text-navy">What happens next</h3>
                <ol className="flex flex-col gap-4">
                  {notes.map((n, i) => (
                    <li key={n} className="flex gap-3 text-[15px] leading-6 text-charcoal">
                      <span aria-hidden className="font-display text-[22px] leading-none text-navy">
                        {String(i + 1).padStart(2, "0")}
                      </span>
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
