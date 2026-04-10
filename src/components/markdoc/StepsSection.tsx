import type { ReactNode } from 'react';

interface StepsSectionProps {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
}

export function StepsSection({ title, eyebrow = 'Steps', children }: StepsSectionProps) {
  return (
    <section className="steps-section" data-reveal>
      <div className="steps-shell">
        <div className="steps-header">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className="steps-body">{children}</div>
      </div>
    </section>
  );
}
