import { notFound } from 'next/navigation';
import ProjectIcon from '@/components/ProjectIcon';
import { getProject, getProjects } from '@/lib/content';
import { renderMarkdoc } from '@/lib/markdoc';
import { buildProjectMetadata } from '@/lib/page-metadata';

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return buildProjectMetadata(project);
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <section className="hero container" data-reveal-group>
        <div className="hero-glow" aria-hidden="true" />
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <p className="eyebrow">Open Source Project</p>
          <span className={`badge badge-${project.data.status}`}>{project.data.status}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <div className="project-hero-icon" aria-hidden="true">
            <ProjectIcon slug={project.id} size={26} />
          </div>
          <h1 style={{ fontSize: 'clamp(2rem,1.6rem + 2.5vw,3.4rem)', letterSpacing: '-0.04em', fontWeight: 800, background: 'linear-gradient(135deg,var(--text) 0%,var(--brand-400) 60%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {project.data.title}
          </h1>
        </div>
        <p className="hero-subtitle">{project.data.summary}</p>
        <div className="button-row">
          <a className="button button-primary" href={project.data.repoUrl} target="_blank" rel="noopener noreferrer">
            Open on GitHub →
          </a>
          <a className="button button-ghost" href="/projects">
            ← All products
          </a>
        </div>
      </section>

      <section className="container section-gap project-layout" data-reveal>
        <article className="feature-card project-article" style={{ padding: '2rem' }}>
          <div className="prose">{renderMarkdoc(project.body)}</div>
        </article>

        <aside className="project-sidebar">
          <div className="feature-card" style={{ padding: '1.4rem', display: 'grid', gap: '1rem' }}>
            <p className="eyebrow">Project snapshot</p>

            <div style={{ display: 'grid', gap: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                Status
              </span>
              <span className={`badge badge-${project.data.status}`} style={{ justifySelf: 'start' }}>
                {project.data.status}
              </span>
            </div>

            <div style={{ display: 'grid', gap: '0.4rem' }}>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)' }}>
                License
              </span>
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>MIT</span>
            </div>

            <div style={{ display: 'grid', gap: '0.5rem', paddingTop: '0.6rem', borderTop: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Repository</span>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                Browse the source, open issues, or contribute directly on GitHub.
              </p>
              <a
                href={project.data.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="button button-primary"
                style={{ marginTop: '0.25rem', justifyContent: 'center', fontSize: '0.84rem' }}
              >
                View on GitHub →
              </a>
            </div>

            <div style={{ paddingTop: '0.6rem', borderTop: '1px solid var(--border-subtle)' }}>
              <a href="/community" className="button button-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.84rem' }}>
                Join the community
              </a>
            </div>
          </div>
        </aside>
      </section>
    </>
  );
}
