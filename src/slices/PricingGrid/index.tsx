import Link from 'next/link';
import type { SliceComponentProps } from '@prismicio/react';
import type { CmsSlice } from '@/lib/prismic/types';

export default function PricingGrid({ slice }: SliceComponentProps<CmsSlice>) {
  return (
    <section className="slice slice-pricing">
      <div className="container section-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
          <h2>{String(slice.primary.title ?? '')}</h2>
          <p>{String(slice.primary.body ?? '')}</p>
        </div>
        <div className="pricing-grid" data-reveal-group>
          {slice.items.map((item, index) => (
            <article key={`${slice.id}-${index}`} className={`pricing-card ${index === 1 ? 'pricing-card-featured' : ''}`}>
              <div className="pricing-card-top">
                <span className="pricing-tier">{String(item.tier ?? '')}</span>
                <strong>{String(item.price ?? '')}</strong>
                <span className="pricing-cadence">{String(item.cadence ?? '')}</span>
              </div>
              <p>{String(item.description ?? '')}</p>
              <ul>
                {[item.feature_1, item.feature_2, item.feature_3, item.feature_4]
                  .filter(Boolean)
                  .map((feature, featureIndex) => (
                    <li key={`${slice.id}-${index}-${featureIndex}`}>{String(feature)}</li>
                  ))}
              </ul>
              <Link className={index === 1 ? 'btn btn-primary' : 'btn btn-secondary'} href={String(item.cta_href ?? '/contact')}>
                {String(item.cta_label ?? 'Contact')}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
