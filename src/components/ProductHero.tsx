import Link from 'next/link';
import type { ProductDocument } from '@/lib/prismic/types';

interface ProductHeroProps {
  product: ProductDocument;
}

export default function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className={`product-hero product-hero--${product.data.accent}`} data-reveal-group>
      <div className="container product-hero-shell">
        <div className="product-hero-copy">
          <p className="eyebrow">{product.data.category}</p>
          <h1>{product.data.name}</h1>
          <p className="product-hero-body">{product.data.tagline}</p>
          <p className="product-hero-summary">{product.data.summary}</p>
          <div className="button-row">
            <Link className="btn btn-primary" href="/demo">
              Book a demo
            </Link>
            <Link className="btn btn-secondary" href="/products">
              Compare products
            </Link>
          </div>
        </div>

        <div className="product-hero-aside">
          <div className="product-highlight-card">
            <span>Best for</span>
            <strong>{product.data.audience}</strong>
          </div>
          <div className="product-highlight-card">
            <span>Primary outcome</span>
            <strong>{product.data.outcome}</strong>
          </div>
          <div className="product-hero-stats">
            {product.data.heroStats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
