import Link from 'next/link';
import type { SliceComponentProps } from '@prismicio/react';
import type { CmsSlice, ProductDocument, SliceContext } from '@/lib/prismic/types';

function accentClass(accent: string) {
  return accent ? `product-card--${accent}` : '';
}

export default function ProductSuite({
  slice,
  context,
}: SliceComponentProps<CmsSlice, SliceContext>) {
  const products = context?.products ?? [];

  return (
    <section className="slice slice-products">
      <div className="container section-shell">
        <div className="section-heading" data-reveal>
          <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
          <div className="section-heading-row">
            <div>
              <h2>{String(slice.primary.title ?? '')}</h2>
              <p>{String(slice.primary.body ?? '')}</p>
            </div>
            {slice.primary.ctaHref ? (
              <Link className="text-link" href={String(slice.primary.ctaHref)}>
                {String(slice.primary.ctaLabel ?? 'View more')}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="product-suite-grid" data-reveal-group>
          {products.map((product: ProductDocument) => (
            <article key={product.uid} className={`product-card ${accentClass(product.data.accent)}`}>
              <div className="product-card-top">
                <span className="product-pill">{product.data.category}</span>
                <span className="product-pricing-hint">{product.data.pricingHint}</span>
              </div>
              <div className="product-card-body">
                <h3>{product.data.name}</h3>
                <p className="product-card-summary">{product.data.summary}</p>
                <div className="product-card-meta">
                  <div>
                    <span>For</span>
                    <strong>{product.data.audience}</strong>
                  </div>
                  <div>
                    <span>Outcome</span>
                    <strong>{product.data.outcome}</strong>
                  </div>
                </div>
              </div>
              <div className="product-card-bottom">
                <span>{product.data.tagline}</span>
                <Link href={product.url}>Explore product</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
