import type { ReactNode } from 'react';
import Link from 'next/link';
import type { LibraryEntry } from '@/lib/content';
import { formatLibraryDate } from '@/lib/library';
import type { ArticleShellConfig } from '@/lib/site-data/types';

type LibraryArticleLayoutProps = {
  shell?: ArticleShellConfig;
  entry: LibraryEntry;
  relatedEntries: LibraryEntry[];
  recentEntries: LibraryEntry[];
  children: ReactNode;
};

export default function LibraryArticleLayout({
  shell,
  entry,
  relatedEntries,
  recentEntries,
  children,
}: LibraryArticleLayoutProps) {
  return (
    <article className="library-article-page">
      <section className="library-article-hero" data-reveal-group>
        <div className="library-article-hero-glow" aria-hidden="true" />
        <div className="container library-article-hero-shell">
          <div className="library-article-copy">
            <Link className="library-article-backlink" href="/library">
              {shell?.backLabel ?? ''}
            </Link>
            {shell?.mark ? <p className="blog-story-mark">{shell.mark}</p> : null}
            <p className="eyebrow">{formatLibraryDate(entry.data.pubDate)}</p>
            <h1>{entry.data.title}</h1>
            <p className="library-article-subtitle">{entry.data.description}</p>
            <div className="library-article-meta" aria-label="Reference metadata">
              {entry.data.author ? <span>{entry.data.author}</span> : null}
              <span>{entry.data.tags.length || 1} tracked topics</span>
            </div>
          </div>

          <aside className="library-article-summary" data-reveal>
            <div className="library-article-summary-card">
              {shell?.asideEyebrow ? <span>{shell.asideEyebrow}</span> : null}
              {shell?.asideTitle ? <strong>{shell.asideTitle}</strong> : null}
              {shell?.asideBody ? <p>{shell.asideBody}</p> : null}
            </div>

            {entry.data.tags.length > 0 ? (
              <div className="tag-list" aria-label="Reference topics">
                {entry.data.tags.map((tag) => (
                  <span key={tag} className="tag-pill">
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="button-row">
              <Link className="btn btn-secondary" href="/library">
                {shell?.browseAllLabel ?? ''}
              </Link>
              {shell?.secondaryCtaLabel && shell?.secondaryCtaHref ? (
                <Link className="btn btn-ghost" href={shell.secondaryCtaHref}>
                  {shell.secondaryCtaLabel}
                </Link>
              ) : null}
            </div>
          </aside>
        </div>
      </section>

      <section className="container library-article-layout">
        <div className="library-article-paper" data-reveal>
          <div className="prose library-article-prose">{children}</div>
        </div>

        <aside className="library-article-rail" data-reveal data-reveal-delay="0.08">
          <div className="library-article-rail-card">
            <span>Updated</span>
            <strong>{formatLibraryDate(entry.data.pubDate)}</strong>
          </div>
          {entry.data.author ? (
            <div className="library-article-rail-card">
              <span>Author</span>
              <strong>{entry.data.author}</strong>
            </div>
          ) : null}
          <div className="library-article-rail-card">
            <span>Topics</span>
            <strong>{entry.data.tags.length.toString().padStart(2, '0')}</strong>
          </div>

          {recentEntries.length > 0 ? (
            <div className="library-article-recent">
              <div className="library-article-recent-head">
                <p className="eyebrow">
                    {shell?.primarySectionEyebrow ?? ''}
                </p>
                  <h2>{shell?.primarySectionTitle ?? ''}</h2>
              </div>
              <div className="library-article-recent-list">
                {recentEntries.map((recentEntry) => (
                  <Link key={recentEntry.id} href={`/library/${recentEntry.id}`}>
                    <strong>{recentEntry.data.title}</strong>
                    <span>{formatLibraryDate(recentEntry.data.pubDate)}</span>
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>
      </section>

      <section className="container library-article-footer" data-reveal>
        <div className="library-article-footer-head">
          <p className="eyebrow">{shell?.secondarySectionEyebrow ?? ''}</p>
          <h2>{shell?.secondarySectionTitle ?? ''}</h2>
        </div>

        {relatedEntries.length > 0 ? (
          <div className="library-article-footer-grid">
            {relatedEntries.map((relatedEntry) => (
              <article key={relatedEntry.id} className="library-article-related-card">
                <p className="eyebrow">{formatLibraryDate(relatedEntry.data.pubDate)}</p>
                <h3>
                  <Link href={`/library/${relatedEntry.id}`}>{relatedEntry.data.title}</Link>
                </h3>
                <p>{relatedEntry.data.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="library-article-empty">
            <p>No adjacent references yet. The manual will keep growing from here.</p>
            <Link className="btn btn-secondary" href="/library">
              {shell?.browseAllLabel ?? ''}
            </Link>
          </div>
        )}
      </section>
    </article>
  );
}
