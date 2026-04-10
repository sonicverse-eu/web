import Link from 'next/link';
import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice } from '@/lib/site-data/types';
import { linkValue, textValue } from '@/slices/utils';

export default function CallToAction({ slice }: SliceRendererProps<CmsSlice>) {
  if (slice.variation === 'project_next') {
    return (
      <section className={`slice slice-cta slice-cta--${slice.variation}`} data-reveal>
        <div className="container">
          <div className="project-next-shell">
            <div className="cta-copy project-next-copy">
              <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
              <h2>{textValue(slice.primary.title)}</h2>
              <p>{textValue(slice.primary.body)}</p>
              <div className="button-row">
                {linkValue(slice.primary.primaryHref) && textValue(slice.primary.primaryLabel) ? (
                  <Link className="btn btn-primary" href={linkValue(slice.primary.primaryHref)}>
                    {textValue(slice.primary.primaryLabel)}
                  </Link>
                ) : null}
                {linkValue(slice.primary.secondaryHref) ? (
                  <Link className="btn btn-secondary" href={linkValue(slice.primary.secondaryHref)}>
                    {textValue(slice.primary.secondaryLabel)}
                  </Link>
                ) : null}
              </div>
            </div>

            {slice.items.length ? (
              <div className="project-next-links" data-reveal-group>
                {slice.items.map((item, index) =>
                  linkValue(item.href) ? (
                    <Link key={`${slice.id}-${index}`} href={linkValue(item.href)} className="project-next-link">
                      <span>{textValue(item.meta)}</span>
                      <strong>{textValue(item.label)}</strong>
                      <p>{textValue(item.detail) || textValue(item.text)}</p>
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
            <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
            <h2>{textValue(slice.primary.title)}</h2>
            <p>{textValue(slice.primary.body)}</p>
            {slice.items.length ? (
              <div className="cta-links">
                {slice.items.map((item, index) =>
                  linkValue(item.href) ? (
                    <Link key={`${slice.id}-${index}`} href={linkValue(item.href)}>
                      {textValue(item.label)}
                    </Link>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
          <div className="button-row">
            {linkValue(slice.primary.primaryHref) && textValue(slice.primary.primaryLabel) ? (
              <Link className="btn btn-primary" href={linkValue(slice.primary.primaryHref)}>
                {textValue(slice.primary.primaryLabel)}
              </Link>
            ) : null}
            {linkValue(slice.primary.secondaryHref) ? (
              <Link className="btn btn-secondary" href={linkValue(slice.primary.secondaryHref)}>
                {textValue(slice.primary.secondaryLabel)}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
