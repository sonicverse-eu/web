import type { SliceComponentProps } from '@prismicio/react';
import type { CmsSlice } from '@/lib/prismic/types';

export default function ProofBand({ slice }: SliceComponentProps<CmsSlice>) {
  return (
    <section className="slice slice-proof">
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
