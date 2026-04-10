interface CtaInlineCardProps {
  title: string;
  summary: string;
  href: string;
  label?: string;
}

export function CtaInlineCard({ title, summary, href, label = 'Open' }: CtaInlineCardProps) {
  return (
    <aside className="cta-inline-card" data-reveal>
      <h3>{title}</h3>
      <p>{summary}</p>
      <a className="btn btn-ghost" href={href}>
        {label}
      </a>
    </aside>
  );
}
