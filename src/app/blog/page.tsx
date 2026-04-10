import {
  formatBlogDate,
  getBlogTagSummaries,
  getReadingTimeMinutes,
  sortBlogPosts,
} from '@/lib/blog';
import { getBlogPosts } from '@/lib/content';
import { buildPageMetadata } from '@/lib/page-metadata';
import { requirePage } from '@/lib/page-data';

const page = requirePage('blog');

export const metadata = buildPageMetadata(page);

export default function BlogPage() {
  const posts = sortBlogPosts(getBlogPosts());
  const [featuredPost, ...archivePosts] = posts;
  const tagSummaries = getBlogTagSummaries(posts);

  return (
    <>
      <section className="hero container" data-reveal-group>
        <div className="hero-glow" aria-hidden="true" />
        {page.data.eyebrow && <p className="eyebrow">{page.data.eyebrow}</p>}
        <h1 className="gradient-text">{page.data.heroTitle}</h1>
        <p className="hero-subtitle">{page.data.heroSubtitle}</p>
        {tagSummaries.length > 0 && (
          <div className="tag-list" aria-label="Blog topics">
            {tagSummaries.map((summary) => (
              <span key={summary.tag}>{summary.tag}</span>
            ))}
          </div>
        )}
      </section>

      {featuredPost && (
        <section className="container section-gap blog-grid-shell" data-reveal>
          <article className="blog-featured-card" data-reveal>
            <p className="eyebrow">{page.data.blogFeaturedLabel ?? 'Featured story'}</p>
            <div className="blog-featured-meta">
              <span>{formatBlogDate(featuredPost.data.pubDate)}</span>
              <span>{featuredPost.data.author}</span>
              <span>{getReadingTimeMinutes(featuredPost.body)} min read</span>
            </div>
            <h2>
              <a href={`/blog/${featuredPost.id}`}>{featuredPost.data.title}</a>
            </h2>
            <p>{featuredPost.data.description}</p>
            {featuredPost.data.tags.length > 0 && (
              <div className="tag-list" aria-label="Featured topics">
                {featuredPost.data.tags.map((tag) => (
                  <span key={tag} className="badge badge-outline">{tag}</span>
                ))}
              </div>
            )}
            <div className="button-row">
              <a className="btn btn-primary" href={`/blog/${featuredPost.id}`}>
                {page.data.blogArticleCtaLabel ?? 'Read article'}
              </a>
            </div>
          </article>

          <aside className="blog-topics-panel card bg-base-100 shadow-xl" data-reveal data-reveal-delay="0.08" aria-labelledby="blog-topics-title">
            <div className="blog-panel-header">
              <p className="eyebrow">{page.data.blogTopicsLabel ?? 'Browse topics'}</p>
              <h2 id="blog-topics-title">A quick way into the archive.</h2>
            </div>
            <div className="blog-topic-grid">
              {tagSummaries.slice(0, 5).map((summary) => (
                <a
                  key={summary.tag}
                  className="blog-topic-chip card bg-base-200 shadow-sm"
                  href={`#topic-${summary.tag.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <strong>{summary.tag}</strong>
                  <span>
                    {summary.count} {summary.count === 1 ? 'post' : 'posts'}
                  </span>
                </a>
              ))}
            </div>
          </aside>
        </section>
      )}

      <section className="container section-gap blog-archive-shell" data-reveal>
        <div className="blog-archive-header" data-reveal>
          <div>
            <p className="eyebrow">{page.data.blogArchiveTitle ?? 'Latest from Sonicverse'}</p>
            <h2>{page.data.blogArchiveDescription ?? 'Editorial updates from the Sonicverse ecosystem.'}</h2>
          </div>
        </div>

        <div className="blog-list">
          {(archivePosts.length > 0 ? archivePosts : posts).map((post, index) => (
            <article
              key={post.id}
              className="blog-post-item blog-post-item-rich"
              data-reveal
              data-reveal-delay={index * 0.07}
            >
              <div
                className="blog-post-meta"
                id={post.data.tags[0] ? `topic-${post.data.tags[0].toLowerCase().replace(/\s+/g, '-')}` : undefined}
              >
                <p className="eyebrow">{formatBlogDate(post.data.pubDate)}</p>
                <p>{post.data.author}</p>
                <p>{getReadingTimeMinutes(post.body)} min read</p>
              </div>
              <div className="blog-post-content">
                <h3>
                  <a href={`/blog/${post.id}`}>{post.data.title}</a>
                </h3>
                <p>{post.data.description}</p>
                {post.data.tags.length > 0 && (
                  <div className="tag-list" aria-label={`Topics for ${post.data.title}`}>
                    {post.data.tags.map((tag) => (
                      <span key={tag} className="badge badge-outline">{tag}</span>
                    ))}
                  </div>
                )}
                <div className="button-row">
                  <a className="btn btn-ghost" href={`/blog/${post.id}`}>
                    {page.data.blogArticleCtaLabel ?? 'Read article'}
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
