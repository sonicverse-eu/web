import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts } from '@/lib/site-data/api';

export const metadata: Metadata = {
  title: 'Sonicverse – OSS for independent media',
  description:
    'Sonicverse helps independent media with tools to build, grow, and monetize their audience. Open-source products for radiostations, podcasts, and more.',
};

export default async function HomePage() {
  const products = await getAllProducts();

  return (
    <div className="wide-page-shell home-page">
      {/* Hero */}
      <section className="slice slice-hero slice-hero--home">
        <div className="container hero-shell">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Open-source for independent media</p>
            <h1>Build the infrastructure your audience deserves</h1>
            <p className="hero-subtitle">
              Sonicverse is a suite of open-source tools for radio stations, podcasters, and
              independent media operators who want full control over their stack.
            </p>
            <div className="button-row">
              <Link className="btn btn-primary" href="/projects">
                Explore projects
              </Link>
              <Link className="btn btn-secondary" href="/contact">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Product suite */}
      {products.length > 0 && (
        <section className="slice slice-products slice-products--default" id="project-suite">
          <div className="container section-shell">
            <div className="section-heading" data-reveal>
              <p className="eyebrow">Our projects</p>
              <div className="section-heading-row">
                <div>
                  <h2>Open-source tools, built for media</h2>
                  <p>
                    Every project is self-hostable, permissively licensed, and designed to
                    integrate with your existing workflow.
                  </p>
                </div>
                <Link className="text-link" href="/projects">
                  Compare all projects
                </Link>
              </div>
            </div>

            <div className="product-suite-grid" data-reveal-group>
              {products.map((product) => (
                <article
                  key={product.uid}
                  className={`product-card product-card--${product.data.accent}`}
                >
                  <div className="product-card-top">
                    <span className="product-pill">{product.data.category}</span>
                    <span className="product-pricing-hint">
                      {product.data.heroStats[0]?.label || 'Deployment'}
                    </span>
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
      )}

      {/* CTA */}
      <section className="slice slice-cta slice-cta--default" data-reveal>
        <div className="container">
          <div className="cta-shell">
            <div className="cta-copy">
              <p className="eyebrow">Get involved</p>
              <h2>Join the community</h2>
              <p>
                Sonicverse is built in the open. Contribute, report bugs, write docs, or just
                follow along as we ship.
              </p>
            </div>
            <div className="button-row">
              <Link className="btn btn-primary" href="/community">
                Community hub
              </Link>
              <Link className="btn btn-secondary" href="/blog">
                Read the blog
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
