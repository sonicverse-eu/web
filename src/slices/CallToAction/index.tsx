import Link from 'next/link';
import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice } from '@/lib/site-data/types';

export default function CallToAction({ slice }: SliceRendererProps<CmsSlice>) {
  if (slice.variation === 'project_next') {
    return (
      <section className={`slice slice-cta slice-cta--${slice.variation}`} data-reveal>
        <div className="container">
          <div className="project-next-shell">
            <div className="cta-copy project-next-copy">
              <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
              <h2>{String(slice.primary.title ?? '')}</h2>
              <p>{String(slice.primary.body ?? '')}</p>
              <div className="button-row">
                {slice.primary.primaryHref && slice.primary.primaryLabel ? (
                  <Link className="btn btn-primary" href={String(slice.primary.primaryHref)}>
                    {String(slice.primary.primaryLabel)}
                  </Link>
                ) : null}
                {slice.primary.secondaryHref ? (
                  <Link className="btn btn-secondary" href={String(slice.primary.secondaryHref)}>
                    {String(slice.primary.secondaryLabel ?? '')}
                  </Link>
                ) : null}
              </div>
            </div>

            {slice.items.length ? (
              <div className="project-next-links" data-reveal-group>
                {slice.items.map((item, index) =>
                  item.href ? (
                    <Link key={`${slice.id}-${index}`} href={String(item.href)} className="project-next-link">
                      <span>{String(item.meta ?? '')}</span>
                      <strong>{String(item.label ?? '')}</strong>
                      <p>{String(item.detail ?? item.text ?? '')}</p>
                    </Link>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`slice slice-cta slice-cta--${slice.variation}`} data-reveal>
      <div className="container">
        <div className="cta-shell">
          <div className="cta-copy">
            <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
            <h2>{String(slice.primary.title ?? '')}</h2>
            <p>{String(slice.primary.body ?? '')}</p>
            {slice.items.length ? (
              <div className="cta-links">
                {slice.items.map((item, index) =>
                  item.href ? (
                    <Link key={`${slice.id}-${index}`} href={String(item.href)}>
                      {String(item.label ?? '')}
                    </Link>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
          <div className="button-row">
            {slice.primary.primaryHref && slice.primary.primaryLabel ? (
              <Link className="btn btn-primary" href={String(slice.primary.primaryHref)}>
                {String(slice.primary.primaryLabel)}
              </Link>
            ) : null}
            {slice.primary.secondaryHref ? (
              <Link className="btn btn-secondary" href={String(slice.primary.secondaryHref)}>
                {String(slice.primary.secondaryLabel ?? '')}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
