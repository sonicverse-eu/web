import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice } from '@/lib/site-data/types';
import { textValue } from '@/slices/utils';

export default function ContentColumns({ slice }: SliceRendererProps<CmsSlice>) {
  if (slice.variation === 'project_paths') {
    return (
      <section className={`slice slice-columns slice-columns--${slice.variation}`}>
        <div className="container project-paths-shell">
          <div className="columns-copy project-paths-copy" data-reveal>
            <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
            <h2>{textValue(slice.primary.title)}</h2>
            <p>{textValue(slice.primary.body)}</p>
          </div>

          <div className="project-paths-panel" data-reveal-group>
            <div className="project-paths-panel-intro">
              <span>{textValue(slice.primary.panelTitle)}</span>
              <p>{textValue(slice.primary.panelBody)}</p>
            </div>
            <div className="project-paths-list">
              {slice.items.map((item, index) => (
                <article key={`${slice.id}-${index}`} className="project-path-row">
                  <span className="project-path-index">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{textValue(item.title)}</h3>
                    <p>{textValue(item.text)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === 'project_context') {
    return (
      <section className={`slice slice-columns slice-columns--${slice.variation}`}>
        <div className="container project-context-shell">
          <div className="columns-copy project-context-copy" data-reveal>
            <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
            <h2>{textValue(slice.primary.title)}</h2>
            <p>{textValue(slice.primary.body)}</p>
          </div>
          <div className="project-context-panel" data-reveal-group>
            <div className="project-context-panel-intro">
              <span>{textValue(slice.primary.panelTitle)}</span>
              <p>{textValue(slice.primary.panelBody)}</p>
            </div>
            <div className="project-context-list">
              {slice.items.map((item, index) => (
                <article key={`${slice.id}-${index}`} className="project-context-row">
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{textValue(item.title)}</h3>
                    <p>{textValue(item.text)}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`slice slice-columns slice-columns--${slice.variation}`}>
      <div className="container columns-shell">
        <div className="columns-copy" data-reveal>
          <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
          <h2>{textValue(slice.primary.title)}</h2>
          <p>{textValue(slice.primary.body)}</p>
        </div>
        <div className="columns-panel" data-reveal>
          <div className="columns-panel-intro">
            <span>{textValue(slice.primary.panelTitle)}</span>
            <p>{textValue(slice.primary.panelBody)}</p>
          </div>
          <div className="columns-panel-list">
            {slice.items.map((item, index) => (
              <article key={`${slice.id}-${index}`}>
                <h3>{textValue(item.title)}</h3>
                <p>{textValue(item.text)}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
