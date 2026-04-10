import { getFaqs } from '@/lib/content';
import { renderMarkdoc } from '@/lib/markdoc';
import { buildPageMetadata } from '@/lib/page-metadata';
import { requirePage } from '@/lib/page-data';

const page = requirePage('community');

export const metadata = buildPageMetadata(page);

export default function CommunityPage() {
  const faqs = getFaqs().sort((a, b) => a.data.order - b.data.order);

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

      <section className="container section-gap" data-reveal>
        <div className="section-head">
          {page.data.faqSectionEyebrow && <p className="eyebrow">{page.data.faqSectionEyebrow}</p>}
          {page.data.faqSectionTitle && <h2>{page.data.faqSectionTitle}</h2>}
        </div>
        <div className="faq-list">
          {faqs.map((item, index) => (
            <article key={item.id} className="faq-item" data-reveal data-reveal-delay={index * 0.09}>
              <h3>{item.data.question}</h3>
              <p>{item.data.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
