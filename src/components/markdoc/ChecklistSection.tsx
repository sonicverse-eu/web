import type { ReactNode } from 'react';

interface ChecklistSectionProps {
  title: string;
  eyebrow?: string;
  children?: ReactNode;
}

export function ChecklistSection({ title, eyebrow = 'Checklist', children }: ChecklistSectionProps) {
  return (
    <section className="checklist-section" data-reveal>
      <div className="checklist-shell">
        <div className="checklist-header">
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <div className="checklist-body">{children}</div>
      </div>
    </section>
  );
}
