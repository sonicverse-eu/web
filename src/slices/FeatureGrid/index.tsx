import type { SliceComponentProps } from '@prismicio/react';
import type { CmsSlice } from '@/lib/prismic/types';

export default function FeatureGrid({ slice }: SliceComponentProps<CmsSlice>) {
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
