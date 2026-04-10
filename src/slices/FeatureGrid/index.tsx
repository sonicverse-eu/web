import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice } from '@/lib/site-data/types';
import { textValue } from '@/slices/utils';

export default function FeatureGrid({ slice }: SliceRendererProps<CmsSlice>) {
  if (slice.variation === 'project_capabilities') {
    return (
      <section className={`slice slice-features slice-features--${slice.variation}`}>
        <div className="container section-shell">
          <div className="section-heading section-heading--editorial" data-reveal>
            <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
            <h2>{textValue(slice.primary.title)}</h2>
            <p>{textValue(slice.primary.body)}</p>
          </div>

          <div className="project-capability-list" data-reveal-group>
            {slice.items.map((item, index) => (
              <article key={`${slice.id}-${index}`} className="project-capability-row">
                <span className="feature-index">{String(index + 1).padStart(2, '0')}</span>
                <div className="project-capability-copy">
                  <h3>{textValue(item.title)}</h3>
                  <p>{textValue(item.text)}</p>
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
          <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
          <h2>{textValue(slice.primary.title)}</h2>
          <p>{textValue(slice.primary.body)}</p>
        </div>

        <div className="feature-grid" data-reveal-group>
          {slice.items.map((item, index) => (
            <article key={`${slice.id}-${index}`} className="feature-card-v2">
              <span className="feature-index">{String(index + 1).padStart(2, '0')}</span>
              <h3>{textValue(item.title)}</h3>
              <p>{textValue(item.text)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
