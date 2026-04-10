import Link from 'next/link';
import type { SliceComponentProps } from '@prismicio/react';
import type { CmsSlice } from '@/lib/prismic/types';

export default function CallToAction({ slice }: SliceComponentProps<CmsSlice>) {
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
                      {String(item.label ?? 'Learn more')}
                    </Link>
                  ) : null
                )}
              </div>
            ) : null}
          </div>
          <div className="button-row">
            <Link className="btn btn-primary" href={String(slice.primary.primaryHref ?? '/contact')}>
              {String(slice.primary.primaryLabel ?? 'Contact')}
            </Link>
            {slice.primary.secondaryHref ? (
              <Link className="btn btn-secondary" href={String(slice.primary.secondaryHref)}>
                {String(slice.primary.secondaryLabel ?? 'Learn more')}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
