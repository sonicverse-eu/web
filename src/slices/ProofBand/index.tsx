import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice } from '@/lib/site-data/types';

export default function ProofBand({ slice }: SliceRendererProps<CmsSlice>) {
  if (slice.variation === 'project_specs') {
    return (
      <section className={`slice slice-proof slice-proof--${slice.variation}`}>
        <div className="container">
          <div className="project-specs-shell">
            <div className="project-specs-heading" data-reveal>
              <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
              <h2>{String(slice.primary.title ?? '')}</h2>
            </div>
            <div className="project-specs-grid" data-reveal-group>
              {slice.items.map((item, index) => (
                <article key={`${slice.id}-${index}`} className="project-specs-card">
                  <span>{String(item.label ?? '')}</span>
                  <strong>{String(item.value ?? '')}</strong>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`slice slice-proof slice-proof--${slice.variation}`}>
      <div className="container">
        <div className="proof-shell" data-reveal>
          <div className="proof-heading">
            <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
            <h2>{String(slice.primary.title ?? '')}</h2>
          </div>
          <div className="proof-grid" data-reveal-group>
            {slice.items.map((item, index) => (
              <article key={`${slice.id}-${index}`} className="proof-card">
                <strong>{String(item.label ?? '')}</strong>
                <p>{String(item.value ?? '')}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
