import { formatBlogDate } from '@/lib/blog';
import { getLibraryEntries } from '@/lib/content';
import { buildPageMetadata } from '@/lib/page-metadata';
import { requirePage } from '@/lib/page-data';

const page = requirePage('library');

export const metadata = buildPageMetadata(page);

export default function LibraryPage() {
  const entries = getLibraryEntries().sort(
    (a, b) => (b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0)
  );

  return (
    <>
      <section className="hero container" data-reveal-group>
        {page.data.eyebrow && <p className="eyebrow">{page.data.eyebrow}</p>}
        <h1>{page.data.heroTitle}</h1>
        <p className="hero-subtitle">{page.data.heroSubtitle}</p>
      </section>

      <section className="container section-gap" data-reveal>
        <div className="blog-list">
          {entries.map((entry, index) => (
            <article key={entry.id} className="blog-post-item" data-reveal data-reveal-delay={index * 0.07}>
              <div className="blog-post-meta">
                {entry.data.pubDate && <p className="eyebrow">{formatBlogDate(entry.data.pubDate)}</p>}
                {entry.data.tags.length > 0 && (
                  <div className="tag-list">
                    {entry.data.tags.map((tag) => (
                      <span key={tag} className="badge badge-outline">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="blog-post-content">
                <h2>
                  <a href={`/library/${entry.id}`}>{entry.data.title}</a>
                </h2>
                <p>{entry.data.description}</p>
                <div className="button-row">
                  <a className="btn btn-ghost" href={`/library/${entry.id}`}>
                    {page.data.blogArticleCtaLabel ?? 'Read entry'}
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
