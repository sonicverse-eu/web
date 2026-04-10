import Link from 'next/link';
import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice, ProductDocument, SliceContext } from '@/lib/site-data/types';

function accentClass(accent: string) {
  return accent ? `product-card--${accent}` : '';
}

export default function ProductSuite({
  slice,
  context,
}: SliceRendererProps<CmsSlice, SliceContext>) {
  const products = context?.products ?? [];

  if (!products.length) {
    return null;
  }

  if (slice.variation === 'editorial_compare') {
    return (
      <section className={`slice slice-projects-editorial slice-projects-editorial--${slice.variation}`} id="project-suite">
        <div className="container section-shell">
          <div className="section-heading section-heading--editorial" data-reveal>
            <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
            <div className="section-heading-row">
              <div>
                <h2>{String(slice.primary.title ?? '')}</h2>
                <p>{String(slice.primary.body ?? '')}</p>
              </div>
              {slice.primary.ctaHref ? (
                <Link className="text-link" href={String(slice.primary.ctaHref)}>
                  {String(slice.primary.ctaLabel ?? '')}
                </Link>
              ) : null}
            </div>
          </div>

          <div className="project-compare-list" data-reveal-group>
            {products.map((product: ProductDocument, index) => (
              <Link
                key={product.uid}
                href={product.url}
                className={`project-compare-row project-compare-row--${product.data.accent}`}
              >
                <div className="project-compare-lead">
                  <span className="project-compare-index">{String(index + 1).padStart(2, '0')}</span>
                  <span className="product-pill">{product.data.category}</span>
                </div>
                <div className="project-compare-main">
                  <h3>{product.data.name}</h3>
                  <p>{product.data.summary}</p>
                </div>
                <div className="project-compare-meta">
                  <span>Best for</span>
                  <strong>{product.data.audience}</strong>
                </div>
                <div className="project-compare-meta">
                  <span>Main outcome</span>
                  <strong>{product.data.outcome}</strong>
                </div>
                <div className="project-compare-meta">
                  <span>{product.data.heroStats[0]?.label}</span>
                  <strong>{product.data.heroStats[0]?.value || product.data.pricingHint}</strong>
                </div>
                <div className="project-compare-action">
                  <span>Open project</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`slice slice-products slice-products--${slice.variation}`} id="project-suite">
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
                {String(slice.primary.ctaLabel ?? '')}
              </Link>
            ) : null}
          </div>
        </div>

        <div className="product-suite-grid" data-reveal-group>
          {products.map((product: ProductDocument) => (
            <article key={product.uid} className={`product-card ${accentClass(product.data.accent)}`}>
              <div className="product-card-top">
                <span className="product-pill">{product.data.category}</span>
                <span className="product-pricing-hint">{product.data.heroStats[0]?.label}</span>
              </div>
              <div className="product-card-body">
                <h3>{product.data.name}</h3>
                <p className="product-card-summary">{product.data.summary}</p>
                <div className="product-card-meta">
                  <div>
                    <span>Best for</span>
                    <strong>{product.data.audience}</strong>
                  </div>
                  <div>
                    <span>Main value</span>
                    <strong>{product.data.outcome}</strong>
                  </div>
                </div>
              </div>
              <div className="product-card-bottom">
                <span>{product.data.heroStats[0]?.value || product.data.pricingHint}</span>
                <Link href={product.url}>Open project</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
