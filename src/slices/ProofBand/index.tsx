import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice } from '@/lib/site-data/types';
import { textValue } from '@/slices/utils';

export default function ProofBand({ slice }: SliceRendererProps<CmsSlice>) {
  if (slice.variation === 'project_specs') {
    return (
      <section className={`slice slice-proof slice-proof--${slice.variation}`}>
        <div className="container">
          <div className="project-specs-shell">
            <div className="project-specs-heading" data-reveal>
              <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
              <h2>{textValue(slice.primary.title)}</h2>
            </div>
            <div className="project-specs-grid" data-reveal-group>
              {slice.items.map((item, index) => (
                <article key={`${slice.id}-${index}`} className="project-specs-card">
                  <span>{textValue(item.label)}</span>
                  <strong>{textValue(item.value)}</strong>
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
            <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
            <h2>{textValue(slice.primary.title)}</h2>
          </div>
          <div className="proof-grid" data-reveal-group>
            {slice.items.map((item, index) => (
              <article key={`${slice.id}-${index}`} className="proof-card">
                <strong>{textValue(item.label)}</strong>
                <p>{textValue(item.value)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
