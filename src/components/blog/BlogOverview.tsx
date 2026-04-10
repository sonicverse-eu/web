import type { CSSProperties } from 'react';
import Link from 'next/link';
import type { BlogEntry, PageData } from '@/lib/content';
import {
  formatBlogDate,
  getReadingTimeMinutes,
  toBlogTopicId,
  type BlogTagSummary,
} from '@/lib/blog';

type BlogOverviewProps = {
  page: PageData;
  posts: BlogEntry[];
  featuredPost?: BlogEntry;
  archivePosts: BlogEntry[];
  tagSummaries: BlogTagSummary[];
};

function getEditorialImageStyle(image?: string): CSSProperties | undefined {
  if (!image) {
    return undefined;
  }

  return {
    backgroundImage: `linear-gradient(180deg, rgba(8, 13, 28, 0.08), rgba(8, 13, 28, 0.5)), url("${image}")`,
  };
}

export default function BlogOverview({
  page,
  posts,
  featuredPost,
  archivePosts,
  tagSummaries,
}: BlogOverviewProps) {
  const archiveFeed = archivePosts.length > 0 ? archivePosts : posts;
  const totalReadingMinutes = posts.reduce((total, post) => total + getReadingTimeMinutes(post.body), 0);

  return (
    <div className="wide-page-shell blog-overview-page">
      <section className="blog-journal-hero" data-reveal-group>
        <div className="blog-journal-hero-glow" aria-hidden="true" />
        <div className="container blog-journal-hero-grid">
          <div className="blog-journal-copy">
            <p className="blog-journal-mark">Sonicverse Journal</p>
            {page.eyebrow ? <p className="eyebrow">{page.eyebrow}</p> : null}
            <h1>{page.heroTitle}</h1>
            <p className="blog-journal-subtitle">{page.heroSubtitle}</p>
            <div className="button-row">
              {featuredPost ? (
                <Link className="btn btn-primary" href={`/blog/${featuredPost.id}`}>
                  Read latest note
                </Link>
              ) : null}
              <Link className="btn btn-secondary" href="#blog-archive">
                Browse archive
              </Link>
            </div>
          </div>

          <aside className="blog-journal-ledger" aria-label="Archive summary">
            <p className="blog-journal-ledger-label">Current signal</p>
            <div className="blog-journal-ledger-row">
              <span>Published notes</span>
              <strong>{posts.length.toString().padStart(2, '0')}</strong>
            </div>
            <div className="blog-journal-ledger-row">
              <span>Tracked topics</span>
              <strong>{tagSummaries.length.toString().padStart(2, '0')}</strong>
            </div>
            <div className="blog-journal-ledger-row">
              <span>Reading time</span>
              <strong>{totalReadingMinutes} min</strong>
            </div>
            {featuredPost ? (
              <div className="blog-journal-ledger-feature">
                <span>Latest note</span>
                <strong>{featuredPost.data.title}</strong>
                <p>{formatBlogDate(featuredPost.data.pubDate)}</p>
              </div>
            ) : null}
          </aside>
        </div>
      </section>

      {featuredPost ? (
        <section className="container blog-spotlight-shell" data-reveal>
          <div className="blog-spotlight-head">
            <div>
              <p className="eyebrow">{page.blogFeaturedLabel ?? 'Featured story'}</p>
              <h2>The latest note, framed like a release bulletin.</h2>
            </div>
            <p>
              A larger editorial lead gives the archive a focal point without borrowing the homepage
              hero composition.
            </p>
          </div>

          <article className="blog-spotlight-story">
            <div
              className={`blog-spotlight-visual${featuredPost.data.image ? ' has-image' : ''}`}
              style={getEditorialImageStyle(featuredPost.data.image)}
              aria-hidden="true"
            >
              <div className="blog-spotlight-noise" />
              <div className="blog-spotlight-signal">
                <span>{formatBlogDate(featuredPost.data.pubDate)}</span>
                <strong>{featuredPost.data.tags[0] ?? 'Sonicverse update'}</strong>
                <p>{getReadingTimeMinutes(featuredPost.body)} minute editorial note</p>
              </div>
            </div>

            <div className="blog-spotlight-copy">
              <div className="blog-spotlight-meta">
                <span>{featuredPost.data.author}</span>
                <span>{getReadingTimeMinutes(featuredPost.body)} min read</span>
              </div>
              <h3>
                <Link href={`/blog/${featuredPost.id}`}>{featuredPost.data.title}</Link>
              </h3>
              <p>{featuredPost.data.description}</p>
              {featuredPost.data.tags.length > 0 ? (
                <div className="tag-list" aria-label="Featured topics">
                  {featuredPost.data.tags.map((tag) => (
                    <Link key={tag} className="blog-chip" href={`#${toBlogTopicId(tag)}`}>
                      {tag}
                    </Link>
                  ))}
                </div>
              ) : null}
              <div className="button-row">
                <Link className="btn btn-primary" href={`/blog/${featuredPost.id}`}>
                  {page.blogArticleCtaLabel ?? 'Read article'}
                </Link>
              </div>
            </div>
          </article>
        </section>
      ) : null}

      <section className="container blog-archive-shell" id="blog-archive" data-reveal>
        <div className="blog-archive-frame">
          <div className="blog-archive-intro">
            <div>
              <p className="eyebrow">{page.blogArchiveTitle ?? 'Latest from Sonicverse'}</p>
              <h2>{page.blogArchiveDescription ?? 'Editorial updates from the Sonicverse ecosystem.'}</h2>
            </div>
            <p>
              The archive now reads like a journal index: topic rail on one side, reading flow on the
              other.
            </p>
          </div>

          <div className="blog-archive-grid">
            {tagSummaries.length > 0 ? (
              <aside className="blog-topic-rail" aria-labelledby="blog-topic-rail-title">
                <div className="blog-topic-rail-head">
                  <p className="eyebrow">{page.blogTopicsLabel ?? 'Browse topics'}</p>
                  <h3 id="blog-topic-rail-title">Entry points into the archive.</h3>
                </div>
                <div className="blog-topic-rail-list">
                  {tagSummaries.map((summary) => (
                    <div
                      key={summary.tag}
                      className="blog-topic-rail-item"
                      id={toBlogTopicId(summary.tag)}
                    >
                      <Link href={`#post-${summary.latestPost.id}`}>
                        <strong>{summary.tag}</strong>
                        <span>
                          {summary.count} {summary.count === 1 ? 'post' : 'posts'}
                        </span>
                        <small>{summary.latestPost.data.title}</small>
                      </Link>
                    </div>
                  ))}
                </div>
              </aside>
            ) : null}

            <div className="blog-archive-list" role="list">
              {archiveFeed.map((post, index) => (
                <article
                  key={post.id}
                  id={`post-${post.id}`}
                  className="blog-archive-row"
                  data-reveal
                  data-reveal-delay={index * 0.06}
                >
                  <div className="blog-archive-row-index" aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <div className="blog-archive-row-copy">
                    <div className="blog-archive-row-meta">
                      <span>{formatBlogDate(post.data.pubDate)}</span>
                      <span>{post.data.author}</span>
                    </div>
                    <h3>
                      <Link href={`/blog/${post.id}`}>{post.data.title}</Link>
                    </h3>
                    <p>{post.data.description}</p>
                    {post.data.tags.length > 0 ? (
                      <div className="tag-list" aria-label={`Topics for ${post.data.title}`}>
                        {post.data.tags.map((tag) => (
                          <Link key={tag} className="blog-chip" href={`#${toBlogTopicId(tag)}`}>
                            {tag}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  <div className="blog-archive-row-action">
                    <span>{getReadingTimeMinutes(post.body)} min read</span>
                    <Link href={`/blog/${post.id}`}>{page.blogArticleCtaLabel ?? 'Read article'}</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container blog-journal-cta" data-reveal>
        <p className="eyebrow">Build in public</p>
        <div className="blog-journal-cta-row">
          <div>
            <h2>Follow the notes, then step into the work behind them.</h2>
            <p>
              Sonicverse ships product changes, community progress, and contributor workflow updates in
              the open.
            </p>
          </div>
          <div className="button-row">
            <Link className="btn btn-primary" href="/projects">
              Explore projects
            </Link>
            <Link className="btn btn-secondary" href="/community">
              Join the community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
