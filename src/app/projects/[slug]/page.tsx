import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProducts, getProductByUID } from '@/lib/site-data/api';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((product) => ({ slug: product.uid }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductByUID(slug);

  if (!product) return {};

  return {
    title: product.data.metaTitle || `${product.data.name} – Sonicverse`,
    description: product.data.metaDescription || product.data.summary,
    openGraph: {
      title: product.data.metaTitle || product.data.name,
      description: product.data.metaDescription || product.data.summary,
      url: product.url,
      siteName: 'Sonicverse',
      type: 'website',
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [product, products] = await Promise.all([getProductByUID(slug), getAllProducts()]);

  if (!product) {
    notFound();
  }

  const otherProducts = products.filter((p) => p.uid !== product.uid);

  return (
    <div className="wide-page-shell project-page">
      {/* Hero */}
      <section className={`slice slice-hero slice-hero--project_detail slice-hero--${product.data.accent}`}>
        <div className="container hero-shell">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">{product.data.category}</p>
            <h1>{product.data.name}</h1>
            <p className="hero-subtitle">{product.data.tagline || product.data.summary}</p>
            <div className="button-row">
              <Link className="btn btn-primary" href="/contact">
                Get in touch
              </Link>
              <Link className="btn btn-secondary" href="/projects">
                All projects
              </Link>
            </div>
          </div>

          {product.data.heroStats.length > 0 && (
            <div className="hero-stats" data-reveal>
              {product.data.heroStats.map((stat) => (
                <div key={stat.label} className="hero-stat">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Summary */}
      <section className="slice slice-columns slice-columns--default">
        <div className="container columns-shell">
          <div className="columns-copy" data-reveal>
            <p className="eyebrow">Overview</p>
            <h2>{product.data.summary}</h2>
          </div>
          <div className="columns-panel" data-reveal>
            <div className="columns-panel-intro">
              <span>Who it's for</span>
              <p>{product.data.audience}</p>
            </div>
            <div className="columns-panel-list">
              <article>
                <h3>Main outcome</h3>
                <p>{product.data.outcome}</p>
              </article>
              {product.data.pricingHint && (
                <article>
                  <h3>Pricing</h3>
                  <p>{product.data.pricingHint}</p>
                </article>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Next projects CTA */}
      {otherProducts.length > 0 && (
        <section className="slice slice-cta slice-cta--project_next" data-reveal>
          <div className="container">
            <div className="project-next-shell">
              <div className="cta-copy project-next-copy">
                <p className="eyebrow">Explore more</p>
                <h2>See the full project lineup</h2>
                <p>
                  Sonicverse is a suite of tools built to work independently or together.
                </p>
                <div className="button-row">
                  <Link className="btn btn-primary" href="/contact">
                    Talk to us
                  </Link>
                  <Link className="btn btn-secondary" href="/projects">
                    All projects
                  </Link>
                </div>
              </div>

              <div className="project-next-links" data-reveal-group>
                {otherProducts.slice(0, 3).map((other) => (
                  <Link
                    key={other.uid}
                    href={other.url}
                    className="project-next-link"
                  >
                    <span>{other.data.category}</span>
                    <strong>{other.data.name}</strong>
                    <p>{other.data.summary}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
