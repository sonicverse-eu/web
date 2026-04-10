import type { SliceComponentProps } from '@prismicio/react';
import type { CmsSlice } from '@/lib/prismic/types';

export default function ContentColumns({ slice }: SliceComponentProps<CmsSlice>) {
  return (
    <section className={`slice slice-columns slice-columns--${slice.variation}`}>
      <div className="container columns-shell">
        <div className="columns-copy" data-reveal>
          <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
          <h2>{String(slice.primary.title ?? '')}</h2>
          <p>{String(slice.primary.body ?? '')}</p>
        </div>
        <div className="columns-panel" data-reveal>
          <div className="columns-panel-intro">
            <span>{String(slice.primary.panelTitle ?? '')}</span>
            <p>{String(slice.primary.panelBody ?? '')}</p>
          </div>
          <div className="columns-panel-list">
            {slice.items.map((item, index) => (
              <article key={`${slice.id}-${index}`}>
                <h3>{String(item.title ?? '')}</h3>
                <p>{String(item.text ?? '')}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
