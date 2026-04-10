import { renderMarkdoc } from '@/lib/markdoc';
import { buildPageMetadata } from '@/lib/page-metadata';
import { requirePage } from '@/lib/page-data';

const page = requirePage('about');

export const metadata = buildPageMetadata(page);

export default function AboutPage() {
  return (
    <>
      <section className="hero container" data-reveal-group>
        <div className="hero-glow" aria-hidden="true" />
        {page.data.eyebrow && <p className="eyebrow">{page.data.eyebrow}</p>}
        <h1 className="gradient-text">{page.data.heroTitle}</h1>
        <p className="hero-subtitle">{page.data.heroSubtitle}</p>
        {page.data.ctaHref && page.data.ctaLabel && (
          <a className="button button-primary" href={page.data.ctaHref}>
            {page.data.ctaLabel}
          </a>
        )}
      </section>

      <section className="container prose section-gap" data-reveal>
        {renderMarkdoc(page.body)}
      </section>
    </>
  );
}
