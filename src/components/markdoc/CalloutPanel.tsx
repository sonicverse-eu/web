import type { ReactNode } from 'react';

interface CalloutPanelProps {
  title?: string;
  eyebrow?: string;
  tone?: 'default' | 'accent' | 'warm';
  children?: ReactNode;
}

export function CalloutPanel({ title, eyebrow = 'Callout', tone = 'default', children }: CalloutPanelProps) {
  const toneClass = `callout-${tone}`;

  return (
    <section className={`callout-panel ${toneClass}`} data-reveal>
      <div className="callout-shell">
        {(eyebrow || title) && (
          <header className="callout-header">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2>{title}</h2>}
          </header>
        )}
        <div className="callout-body">{children}</div>
      </div>
    </section>
  );
}
