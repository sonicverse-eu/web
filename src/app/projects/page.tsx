import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts } from '@/lib/site-data/api';

export const metadata: Metadata = {
  title: 'Projects – Sonicverse',
  description:
    'Browse all open-source projects from Sonicverse. Self-hostable tools for independent broadcasters, podcasters, and media operators.',
};

export default async function ProjectsPage() {
  const products = await getAllProducts();

  return (
    <div className="wide-page-shell projects-page">
      {/* Hero */}
      <section className="slice slice-hero slice-hero--projects_overview">
        <div className="container hero-shell">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Open-source projects</p>
            <h1>Tools built for independent media</h1>
            <p className="hero-subtitle">
              Every project is self-hostable, permissively licensed, and maintained in the
              open. Pick what fits your stack.
            </p>
          </div>
        </div>
      </section>

      {/* Project compare list */}
      {products.length > 0 && (
        <section
          className="slice slice-projects-editorial slice-projects-editorial--editorial_compare"
          id="project-suite"
        >
          <div className="container section-shell">
            <div className="section-heading section-heading--editorial" data-reveal>
              <p className="eyebrow">All projects</p>
              <div className="section-heading-row">
                <div>
                  <h2>Compare the full lineup</h2>
                  <p>Every project ships with self-hosting guides and open governance.</p>
                </div>
              </div>
            </div>

            <div className="project-compare-list" data-reveal-group>
              {products.map((product, index) => (
                <Link
                  key={product.uid}
                  href={product.url}
                  className={`project-compare-row project-compare-row--${product.data.accent}`}
                >
                  <div className="project-compare-lead">
                    <span className="project-compare-index">
                      {String(index + 1).padStart(2, '0')}
                    </span>
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
                    <span>{product.data.heroStats[0]?.label || 'Signal'}</span>
                    <strong>
                      {product.data.heroStats[0]?.value || product.data.pricingHint}
                    </strong>
                  </div>
                  <div className="project-compare-action">
                    <span>Open project</span>
                  </div>
                </Link>
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
              <p className="eyebrow">Not sure where to start?</p>
              <h2>Talk to us first</h2>
              <p>
                We're happy to guide you through the lineup and help you find the right fit for
                your workflow.
              </p>
            </div>
            <div className="button-row">
              <Link className="btn btn-primary" href="/contact">
                Get in touch
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
