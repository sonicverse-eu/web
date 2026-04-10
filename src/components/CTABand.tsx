export interface CTALink {
  label: string;
  href: string;
}

export interface CTABandProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  primary: CTALink;
  secondary?: CTALink;
}

export default function CTABand({ eyebrow, title, subtitle, primary, secondary }: CTABandProps) {
  return (
    <section className="cta-band" data-reveal>
      <div className="cta-glow" aria-hidden="true" />
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 className="gradient-text">{title}</h2>
      {subtitle && <p>{subtitle}</p>}
      <div className="button-row">
        <a className="btn btn-primary" href={primary.href}>
          {primary.label}
        </a>
        {secondary && (
          <a className="btn btn-ghost" href={secondary.href}>
            {secondary.label}
          </a>
        )}
      </div>
    </section>
  );
}
