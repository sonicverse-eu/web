import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Community – Sonicverse',
  description:
    'Join the Sonicverse community. Contribute to our open-source projects, report bugs, write documentation, or just follow along.',
};

export default function CommunityPage() {
  return (
    <div className="wide-page-shell community-page">
      {/* Hero */}
      <section className="slice slice-hero slice-hero--community_network">
        <div className="container hero-shell">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Community</p>
            <h1>Built in the open, shaped by the community</h1>
            <p className="hero-subtitle">
              Sonicverse is an open-source project. Everyone is welcome to contribute code,
              docs, bug reports, design feedback, and ideas.
            </p>
            <div className="button-row">
              <a
                className="btn btn-primary"
                href="https://github.com/sonicverse-eu"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </a>
              <Link className="btn btn-secondary" href="/contact">
                Get in touch
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to contribute */}
      <section className="slice slice-features slice-features--default">
        <div className="container section-shell">
          <div className="section-heading" data-reveal>
            <p className="eyebrow">How to contribute</p>
            <h2>Many ways to get involved</h2>
            <p>
              You don't need to write code to contribute. There are meaningful ways to help at
              every skill level.
            </p>
          </div>

          <div className="feature-grid" data-reveal-group>
            {[
              {
                title: 'Code contributions',
                text: 'Pick up a GitHub issue, fix a bug, or implement a feature. All skill levels welcome.',
              },
              {
                title: 'Documentation',
                text: 'Improve the library, write tutorials, or clarify confusing sections.',
              },
              {
                title: 'Bug reports',
                text: 'Found something broken? Open a detailed issue and help us reproduce it.',
              },
              {
                title: 'Design feedback',
                text: 'Share UX thoughts, review prototypes, or propose UI improvements.',
              },
              {
                title: 'Community support',
                text: 'Answer questions from other community members in issues and discussions.',
              },
              {
                title: 'Spreading the word',
                text: 'Star the repo, share the blog, or tell a fellow broadcaster about Sonicverse.',
              },
            ].map((item, index) => (
              <article key={index} className="feature-card-v2">
                <span className="feature-index">{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="slice slice-cta slice-cta--default" data-reveal>
        <div className="container">
          <div className="cta-shell">
            <div className="cta-copy">
              <p className="eyebrow">Ready to contribute?</p>
              <h2>Start on GitHub</h2>
              <p>
                Browse open issues, read the contributing guide, and introduce yourself in the
                discussions tab.
              </p>
            </div>
            <div className="button-row">
              <a
                className="btn btn-primary"
                href="https://github.com/sonicverse-eu"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open GitHub
              </a>
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
