import { cn } from "@/lib/utils";

type Props = {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  as?: "h1" | "h2" | "h3";
  /** "heading" = Montserrat section heading; "display" = Instrument Serif statement. */
  style?: "heading" | "display";
  align?: "left" | "center";
  className?: string;
  id?: string;
};

export function SectionHeading({ eyebrow, title, intro, as: Tag = "h2", style = "heading", align = "left", className, id }: Props) {
  return (
    <div className={cn("flex max-w-[680px] flex-col gap-4", align === "center" && "mx-auto items-center text-center", className)}>
      {eyebrow ? (
        <p className="type-eyebrow flex items-center gap-3 text-muted">
          <span aria-hidden className="rule-accent" />
          {eyebrow}
        </p>
      ) : null}
      <Tag id={id} className={cn("text-navy", style === "display" ? "type-display-lg" : "type-heading-1")}>{title}</Tag>
      {intro ? <div className="type-lead text-charcoal">{intro}</div> : null}
    </div>
  );
}
