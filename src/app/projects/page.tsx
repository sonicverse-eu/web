import ProductCard from '@/components/ProductCard';
import { getProjects } from '@/lib/content';
import { renderMarkdoc } from '@/lib/markdoc';
import { buildPageMetadata } from '@/lib/page-metadata';
import { requirePage } from '@/lib/page-data';
import { projectAudiences } from '@/lib/site';

const page = requirePage('projects');

export const metadata = buildPageMetadata(page);

export default function ProjectsPage() {
  const projects = getProjects().sort((a, b) => a.data.order - b.data.order);

  return (
    <>
      <section className="hero container" data-reveal-group>
        <div className="hero-glow" aria-hidden="true" />
        {page.data.eyebrow && <p className="eyebrow">{page.data.eyebrow}</p>}
        <h1 className="gradient-text">{page.data.heroTitle}</h1>
        <p className="hero-subtitle">{page.data.heroSubtitle}</p>
        <div className="button-row">
          {page.data.ctaHref && page.data.ctaLabel && (
            <a className="button button-primary" href={page.data.ctaHref} target="_blank" rel="noopener noreferrer">
              {page.data.ctaLabel}
            </a>
          )}
        </div>
      </section>

      <section className="container section-gap">
        <div className="section-intro">
          {page.data.projectSectionEyebrow && <p className="eyebrow">{page.data.projectSectionEyebrow}</p>}
          {page.data.projectSectionTitle && <h2>{page.data.projectSectionTitle}</h2>}
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

      <section className="container prose section-gap" data-reveal style={{ maxWidth: '52rem' }}>
        {renderMarkdoc(page.body)}
      </section>
    </>
  );
}
