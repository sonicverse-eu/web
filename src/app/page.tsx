import BentoGrid from '@/components/BentoGrid';
import CTABand from '@/components/CTABand';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import { getFaqs, getFeatures, getProjects } from '@/lib/content';
import { buildPageMetadata } from '@/lib/page-metadata';
import { requirePage } from '@/lib/page-data';
import { projectAudiences } from '@/lib/site';

const home = requirePage('home');

export const metadata = buildPageMetadata(home);

export default function HomePage() {
  const features = getFeatures().sort((a, b) => a.data.order - b.data.order);
  const projects = getProjects().sort((a, b) => a.data.order - b.data.order);
  const faqs = getFaqs()
    .sort((a, b) => a.data.order - b.data.order)
    .slice(0, 3);

  const bentoFeatures = features.map((feature) => ({
    title: feature.data.title,
    summary: feature.data.summary,
    eyebrow: feature.data.eyebrow,
  }));

  return (
    <>
      <section className="hero-split container" data-reveal-group>
        <div className="hero-glow" aria-hidden="true" style={{ top: '-5%', left: '-5%' }} />

        <div className="hero-split-copy">
          {home.data.eyebrow && <p className="eyebrow">{home.data.eyebrow}</p>}
          <h1 className="gradient-text">{home.data.heroTitle}</h1>
          <p className="hero-subtitle">{home.data.heroSubtitle}</p>

          <div className="button-row">
            {home.data.ctaHref && home.data.ctaLabel && (
              <a className="button button-primary" href={home.data.ctaHref}>
                {home.data.ctaLabel}
              </a>
            )}
            {home.data.secondaryCtaHref && home.data.secondaryCtaLabel && (
              <a className="button button-ghost" href={home.data.secondaryCtaHref}>
                {home.data.secondaryCtaLabel}
              </a>
            )}
          </div>
        </div>

        <div className="hero-split-visual" aria-hidden="true">
          <div className="hero-abstract">
            <div className="hero-orb hero-orb--a" />
            <div className="hero-orb hero-orb--b" />
            <div className="hero-orb hero-orb--c" />
            <div className="hero-grid" />
            <svg className="hero-abstract-svg" viewBox="0 0 400 360" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="200" cy="180" r="90" stroke="currentColor" strokeWidth="0.75" strokeDasharray="4 6" opacity="0.35" />
              <circle cx="200" cy="180" r="130" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 8" opacity="0.2" />
              <circle cx="200" cy="90" r="4" fill="currentColor" opacity="0.7" />
              <circle cx="290" cy="180" r="3" fill="currentColor" opacity="0.5" />
              <circle cx="200" cy="270" r="4" fill="currentColor" opacity="0.7" />
              <circle cx="110" cy="180" r="3" fill="currentColor" opacity="0.5" />
              <circle cx="263" cy="117" r="2.5" fill="currentColor" opacity="0.4" />
              <circle cx="263" cy="243" r="2.5" fill="currentColor" opacity="0.4" />
              <circle cx="137" cy="117" r="2.5" fill="currentColor" opacity="0.4" />
              <circle cx="137" cy="243" r="2.5" fill="currentColor" opacity="0.4" />
              <line x1="200" y1="90" x2="263" y2="117" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
              <line x1="263" y1="117" x2="290" y2="180" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
              <line x1="200" y1="90" x2="137" y2="117" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
              <line x1="137" y1="117" x2="110" y2="180" stroke="currentColor" strokeWidth="0.6" opacity="0.25" />
              <circle cx="200" cy="180" r="16" fill="currentColor" opacity="0.08" />
              <circle cx="200" cy="180" r="7" fill="currentColor" opacity="0.18" />
              <circle cx="200" cy="180" r="2.5" fill="currentColor" opacity="0.9" />
              <circle className="orbit-node" cx="200" cy="50" r="2" fill="currentColor" opacity="0.6" />
              <circle className="orbit-node-2" cx="350" cy="180" r="2" fill="currentColor" opacity="0.6" />
            </svg>
            <div className="hero-abstract-corner hero-abstract-corner--tr" />
            <div className="hero-abstract-corner hero-abstract-corner--bl" />
          </div>
        </div>
      </section>

      <section className="container section-gap" data-reveal>
        <div className="section-intro-row">
          <div className="section-intro">
            {home.data.projectSectionEyebrow && <p className="eyebrow">{home.data.projectSectionEyebrow}</p>}
            {home.data.projectSectionTitle && <h2>{home.data.projectSectionTitle}</h2>}
          </div>
          <a className="button button-ghost" href="/projects" style={{ flexShrink: 0, alignSelf: 'flex-end' }}>
            View all →
          </a>
        </div>
        <div className="product-grid" data-reveal-group>
          {projects.map((project, index) => (
            <ProductCard
              key={project.id}
              slug={project.id}
              title={project.data.title}
              summary={project.data.summary}
              status={project.data.status}
              href={`/projects/${project.id}`}
              audience={projectAudiences[project.id]}
              index={index}
            />
          ))}
        </div>
      </section>

      {bentoFeatures.length > 0 && (
        <section className="container section-gap">
          <SectionHeading
            eyebrow={home.data.featureSectionEyebrow}
            title={home.data.featureSectionTitle}
          />
          <BentoGrid features={bentoFeatures} />
        </section>
      )}

      {faqs.length > 0 && (
        <section className="container section-gap">
          <SectionHeading eyebrow={home.data.faqSectionEyebrow} title={home.data.faqSectionTitle} />
          <div className="faq-list" data-reveal-group>
            {faqs.map((item, index) => (
              <article
                key={item.id}
                className="faq-item"
                data-reveal
                data-reveal-delay={(index * 0.09).toFixed(2)}
              >
                <h3>{item.data.question}</h3>
                <p>{item.data.answer}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {home.data.ctaBand && (
        <section className="container section-gap">
          <CTABand
            eyebrow={home.data.ctaBand.eyebrow}
            title={home.data.ctaBand.title}
            subtitle={home.data.ctaBand.subtitle}
            primary={home.data.ctaBand.primary}
            secondary={home.data.ctaBand.secondary}
          />
        </section>
      )}
    </>
  );
}
