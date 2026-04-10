import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice } from '@/lib/site-data/types';

export default function FeatureGrid({ slice }: SliceRendererProps<CmsSlice>) {
  if (slice.variation === 'project_capabilities') {
    return (
      <section className={`slice slice-features slice-features--${slice.variation}`}>
        <div className="container section-shell">
          <div className="section-heading section-heading--editorial" data-reveal>
            <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
            <h2>{String(slice.primary.title ?? '')}</h2>
            <p>{String(slice.primary.body ?? '')}</p>
          </div>

          <div className="project-capability-list" data-reveal-group>
            {slice.items.map((item, index) => (
              <article key={`${slice.id}-${index}`} className="project-capability-row">
                <span className="feature-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="project-capability-copy">
                  <h3>{String(item.title ?? '')}</h3>
                  <p>{String(item.text ?? '')}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`slice slice-features slice-features--${slice.variation}`}>
      <div className="container section-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
          <h2>{String(slice.primary.title ?? '')}</h2>
          <p>{String(slice.primary.body ?? '')}</p>
        </div>

        <div className="feature-grid" data-reveal-group>
          {slice.items.map((item, index) => (
            <article key={`${slice.id}-${index}`} className="feature-card-v2">
              <span className="feature-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{String(item.title ?? '')}</h3>
              <p>{String(item.text ?? '')}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
