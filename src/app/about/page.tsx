import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About – Sonicverse',
  description:
    'Sonicverse is an open-source project building tools for independent media operators. Learn about our mission and the people behind the work.',
};

export default function AboutPage() {
  return (
    <div className="wide-page-shell about-page">
      {/* Hero */}
      <section className="slice slice-hero slice-hero--manifesto">
        <div className="container hero-shell">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">About Sonicverse</p>
            <h1>Built for the people who keep independent media alive</h1>
            <p className="hero-subtitle">
              We build open-source infrastructure so radio stations, podcasters, and media
              operators can focus on their content instead of their stack.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="slice slice-columns slice-columns--default">
        <div className="container columns-shell">
          <div className="columns-copy" data-reveal>
            <p className="eyebrow">Our mission</p>
            <h2>Open infrastructure for open media</h2>
            <p>
              Independent media doesn't have the engineering budgets of large broadcast networks.
              Sonicverse closes that gap with self-hostable, permissively licensed tools that
              give smaller operators the same capabilities as the big players.
            </p>
          </div>
          <div className="columns-panel" data-reveal>
            <div className="columns-panel-intro">
              <span>What we believe</span>
              <p>
                Great journalism and creative audio shouldn't depend on expensive proprietary
                infrastructure. If you can host it yourself, you own it.
              </p>
            </div>
            <div className="columns-panel-list">
              <article>
                <h3>Self-hostable by default</h3>
                <p>Every project ships with a path to full self-hosting. No lock-in, ever.</p>
              </article>
              <article>
                <h3>Permissive licensing</h3>
                <p>
                  We use open licenses so you can integrate our tools into commercial products
                  without legal friction.
                </p>
              </article>
              <article>
                <h3>Community first</h3>
                <p>
                  Roadmap decisions are driven by the people actually running stations and
                  shows, not by investor mandates.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="slice slice-cta slice-cta--default" data-reveal>
        <div className="container">
          <div className="cta-shell">
            <div className="cta-copy">
              <p className="eyebrow">Get involved</p>
              <h2>Shape what we build next</h2>
              <p>
                Open an issue, join the discussion, or get in touch if you want to collaborate.
              </p>
            </div>
            <div className="button-row">
              <Link className="btn btn-primary" href="/community">
                Community hub
              </Link>
              <Link className="btn btn-secondary" href="/contact">
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
