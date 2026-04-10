import type { CSSProperties, ReactNode } from 'react';
import Link from 'next/link';
import type { BlogEntry } from '@/lib/content';
import { formatBlogDate, getReadingTimeMinutes, toBlogTopicId } from '@/lib/blog';
import type { ArticleShellConfig } from '@/lib/site-data/types';

type BlogArticleLayoutProps = {
  shell?: ArticleShellConfig;
  post: BlogEntry;
  newerPost?: BlogEntry;
  olderPost?: BlogEntry;
  relatedPosts: BlogEntry[];
  children: ReactNode;
};

function getEditorialImageStyle(image?: string): CSSProperties | undefined {
  if (!image) {
    return undefined;
  }

  return {
    backgroundImage: `linear-gradient(180deg, rgba(8, 13, 28, 0.12), rgba(8, 13, 28, 0.54)), url("${image}")`,
  };
}

function ArchiveLink({
  label,
  post,
}: {
  label: string;
  post: BlogEntry;
}) {
  return (
    <article className="blog-story-nav-item">
      <p className="eyebrow">{label}</p>
      <h3>
        <Link href={`/blog/${post.id}`}>{post.data.title}</Link>
      </h3>
      <p>{post.data.description}</p>
    </article>
  );
}

export default function BlogArticleLayout({
  shell,
  post,
  newerPost,
  olderPost,
  relatedPosts,
  children,
}: BlogArticleLayoutProps) {
  const readingTime = getReadingTimeMinutes(post.body);

  return (
    <article className="blog-story-page">
      <section className="blog-story-hero" data-reveal-group>
        <div className="blog-story-hero-glow" aria-hidden="true" />
        <div className="container blog-story-hero-grid">
          <div className="blog-story-copy">
            <nav className="blog-breadcrumbs" aria-label="Breadcrumb">
              <ol>
                <li>
                  <Link href="/">Home</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li aria-current="page">{post.data.title}</li>
              </ol>
            </nav>

            {shell?.mark ? <p className="blog-story-mark">{shell.mark}</p> : null}
            <p className="eyebrow">{formatBlogDate(post.data.pubDate)}</p>
            <h1>{post.data.title}</h1>
            <p className="blog-story-subtitle">{post.data.description}</p>
            <div className="blog-story-meta" aria-label="Article metadata">
              <span>{post.data.author}</span>
              <span>{readingTime} min read</span>
              <span>{post.data.tags.length || 1} tracked topics</span>
            </div>
          </div>

          <div
            className={`blog-story-visual${post.data.image ? ' has-image' : ''}`}
            style={getEditorialImageStyle(post.data.image)}
            aria-hidden="true"
          >
            <div className="blog-story-visual-noise" />
            <div className="blog-story-visual-panel">
              <span>Filed under</span>
              <strong>{post.data.tags.slice(0, 2).join(' / ')}</strong>
              <p>{readingTime} minute read</p>
            </div>
          </div>
        </div>
      </section>

      <section className="container blog-story-layout">
        <aside className="blog-story-sidebar" data-reveal>
          <Link className="blog-story-backlink" href="/blog">
            {shell?.backLabel ?? ''}
          </Link>

          <div className="blog-story-sidebar-block">
            <span>Published</span>
            <strong>{formatBlogDate(post.data.pubDate)}</strong>
          </div>
          <div className="blog-story-sidebar-block">
            <span>Author</span>
            <strong>{post.data.author}</strong>
          </div>
          <div className="blog-story-sidebar-block">
            <span>Reading time</span>
            <strong>{readingTime} minutes</strong>
          </div>

          {post.data.tags.length > 0 ? (
            <div className="blog-story-sidebar-tags">
              <span>Topics</span>
              <div className="tag-list" aria-label="Article topics">
                {post.data.tags.map((tag) => (
                  <Link key={tag} className="blog-chip" href={`/blog#${toBlogTopicId(tag)}`}>
                    {tag}
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </aside>

        <div className="blog-story-content" data-reveal data-reveal-delay="0.08">
          <div className="blog-story-paper">
            <div className="prose blog-story-prose">{children}</div>
          </div>
        </div>
      </section>

      <section className="container blog-story-footer" data-reveal>
        {(newerPost || olderPost) ? (
          <div className="blog-story-section">
            <div className="blog-story-section-head">
              <p className="eyebrow">{shell?.primarySectionEyebrow ?? ''}</p>
              <h2>{shell?.primarySectionTitle ?? ''}</h2>
            </div>
            <div className="blog-story-nav-grid">
              {newerPost ? <ArchiveLink label="Newer post" post={newerPost} /> : null}
              {olderPost ? <ArchiveLink label="Older post" post={olderPost} /> : null}
            </div>
          </div>
        ) : null}

        <div className="blog-story-section">
          <div className="blog-story-section-head">
            <p className="eyebrow">{shell?.secondarySectionEyebrow ?? ''}</p>
            <h2>{shell?.secondarySectionTitle ?? ''}</h2>
          </div>

          {relatedPosts.length > 0 ? (
            <div className="blog-story-related-list">
              {relatedPosts.slice(0, 2).map((relatedPost) => (
                <article key={relatedPost.id} className="blog-story-related-item">
                  <p className="eyebrow">{formatBlogDate(relatedPost.data.pubDate)}</p>
                  <h3>
                    <Link href={`/blog/${relatedPost.id}`}>{relatedPost.data.title}</Link>
                  </h3>
                  <p>{relatedPost.data.description}</p>
                </article>
              ))}
            </div>
          ) : (
            <div className="blog-story-empty">
              <p>No related posts yet for these topics.</p>
              <Link className="btn btn-secondary" href="/blog">
                {shell?.browseAllLabel ?? ''}
              </Link>
            </div>
          )}
        </div>
      </section>
    </article>
  );
}
