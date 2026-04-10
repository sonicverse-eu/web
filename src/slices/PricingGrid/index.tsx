import Link from 'next/link';
import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice } from '@/lib/site-data/types';
import { linkValue, textValue } from '@/slices/utils';

export default function PricingGrid({ slice }: SliceRendererProps<CmsSlice>) {
  return (
    <section className="slice slice-pricing">
      <div className="container section-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
          <h2>{textValue(slice.primary.title)}</h2>
          <p>{textValue(slice.primary.body)}</p>
        </div>
        <div className="pricing-grid" data-reveal-group>
          {slice.items.map((item, index) => (
            <article key={`${slice.id}-${index}`} className={`pricing-card ${index === 1 ? 'pricing-card-featured' : ''}`}>
              <div className="pricing-card-top">
                <span className="pricing-tier">{textValue(item.tier)}</span>
                <strong>{textValue(item.price)}</strong>
                <span className="pricing-cadence">{textValue(item.cadence)}</span>
              </div>
              <p>{textValue(item.description)}</p>
              <ul>
                {[item.feature_1, item.feature_2, item.feature_3, item.feature_4]
                  .filter(Boolean)
                  .map((feature, featureIndex) => (
                    <li key={`${slice.id}-${index}-${featureIndex}`}>{textValue(feature)}</li>
                  ))}
              </ul>
              <Link className={index === 1 ? 'btn btn-primary' : 'btn btn-secondary'} href={linkValue(item.cta_href, '/contact')}>
                {textValue(item.cta_label, 'Contact')}
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
