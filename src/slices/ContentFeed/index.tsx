import Link from 'next/link';
import { formatBlogDate, getBlogTagSummaries, getReadingTimeMinutes, sortBlogPosts, toBlogTopicId } from '@/lib/blog';
import { formatLibraryDate, getLibraryTagCount, sortLibraryEntries } from '@/lib/library';
import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice, SliceContext } from '@/lib/site-data/types';
import { linkValue, textValue } from '@/slices/utils';

export default function ContentFeed({
  slice,
  context,
}: SliceRendererProps<CmsSlice, SliceContext>) {
  if (slice.variation === 'journal_archive') {
    const posts = sortBlogPosts(context?.blogPosts ?? []);

    if (!posts.length) {
      return null;
    }

    const [featuredPost, ...archivePosts] = posts;
    const archiveFeed = archivePosts.length > 0 ? archivePosts : posts;
    const tagSummaries = getBlogTagSummaries(posts);
    const totalReadingMinutes = posts.reduce(
      (total, post) => total + getReadingTimeMinutes(post.body),
      0
    );

    return (
      <>
        {featuredPost ? (
          <section className="container blog-spotlight-shell" data-reveal>
            <div className="blog-spotlight-head">
              <div>
                <p className="eyebrow">
                  {textValue(slice.primary.spotlightEyebrow)}
                </p>
                <h2>
                  {textValue(slice.primary.spotlightTitle)}
                </h2>
              </div>
              <p>
                {textValue(slice.primary.spotlightBody)}
              </p>
            </div>

            <article className="blog-spotlight-story">
              <div
                className={`blog-spotlight-visual${featuredPost.data.image ? ' has-image' : ''}`}
                style={
                  featuredPost.data.image
                    ? {
                        backgroundImage: `linear-gradient(180deg, rgba(8, 13, 28, 0.08), rgba(8, 13, 28, 0.5)), url("${featuredPost.data.image}")`,
                      }
                    : undefined
                }
                aria-hidden="true"
              >
                <div className="blog-spotlight-noise" />
                <div className="blog-spotlight-signal">
                  <span>{formatBlogDate(featuredPost.data.pubDate)}</span>
                  <strong>{featuredPost.data.tags[0] ?? ''}</strong>
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
                  <Link
                    className="btn btn-primary"
                    href={`/blog/${featuredPost.id}`}
                  >
                    {textValue(slice.primary.featuredCtaLabel)}
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
                <p className="eyebrow">
                  {textValue(slice.primary.archiveEyebrow)}
                </p>
                <h2>
                  {textValue(slice.primary.archiveTitle)}
                </h2>
              </div>
              <p>
                {textValue(slice.primary.archiveBody)}
              </p>
            </div>

            <div className="blog-archive-grid">
              {tagSummaries.length > 0 ? (
                <aside className="blog-topic-rail" aria-labelledby="blog-topic-rail-title">
                  <div className="blog-topic-rail-head">
                    <p className="eyebrow">
                      {textValue(slice.primary.railEyebrow)}
                    </p>
                    <h3 id="blog-topic-rail-title">
                      {textValue(slice.primary.railTitle)}
                    </h3>
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
                      <Link href={`/blog/${post.id}`}>
                        {textValue(slice.primary.archiveCtaLabel)}
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="container blog-journal-cta" data-reveal>
          <div className="blog-journal-cta-row">
            <div>
              <p className="eyebrow">
                {textValue(slice.primary.footerEyebrow)}
              </p>
              <h2>
                {textValue(slice.primary.footerTitle)}
              </h2>
              <p>
                {textValue(slice.primary.footerBody)}
              </p>
            </div>
            <div className="button-row">
              {linkValue(slice.primary.primaryHref) && textValue(slice.primary.primaryLabel) ? (
                <Link
                  className="btn btn-primary"
                  href={linkValue(slice.primary.primaryHref)}
                >
                  {textValue(slice.primary.primaryLabel)}
                </Link>
              ) : null}
              {linkValue(slice.primary.secondaryHref) && textValue(slice.primary.secondaryLabel) ? (
                <Link
                  className="btn btn-secondary"
                  href={linkValue(slice.primary.secondaryHref)}
                >
                  {textValue(slice.primary.secondaryLabel)}
                </Link>
              ) : null}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (slice.variation === 'reference_index') {
    const entries = sortLibraryEntries(context?.libraryEntries ?? []);

    if (!entries.length) {
      return null;
    }

    const [featuredEntry, ...remainingEntries] = entries;
    const tagCount = getLibraryTagCount(entries);
    const latestUpdate = formatLibraryDate(entries[0]?.data.pubDate);

    return (
      <section className="container library-reference-shell" id="library-index" data-reveal>
        <div className="library-reference-head">
          <div>
            <p className="eyebrow">{textValue(slice.primary.eyebrow)}</p>
            <h2>
              {textValue(slice.primary.title)}
            </h2>
          </div>
          <p>
            {textValue(slice.primary.body)}
          </p>
        </div>

        <div className="library-reference-frame">
          <article className="library-reference-feature">
            <div className="library-reference-feature-top">
              <p className="eyebrow">
                {textValue(slice.primary.featureEyebrow)}
              </p>
              {featuredEntry.data.tags.length > 0 ? (
                <div className="tag-list" aria-label="Featured reference topics">
                  {featuredEntry.data.tags.map((tag) => (
                    <span key={tag} className="tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>

            <div className="library-reference-feature-copy">
              <div className="library-reference-meta">
                <span>{formatLibraryDate(featuredEntry.data.pubDate)}</span>
                {featuredEntry.data.author ? <span>{featuredEntry.data.author}</span> : null}
              </div>
              <h3>
                <Link href={`/library/${featuredEntry.id}`}>{featuredEntry.data.title}</Link>
              </h3>
              <p>{featuredEntry.data.description}</p>
              <div className="button-row">
                <Link className="btn btn-primary" href={`/library/${featuredEntry.id}`}>
                  {textValue(slice.primary.featureCtaLabel)}
                </Link>
              </div>
            </div>
          </article>

          <aside className="library-reference-summary">
            <div className="library-reference-summary-card">
              <span>{textValue(slice.primary.summaryEyebrow)}</span>
              <strong>
                {textValue(slice.primary.summaryTitle)}
              </strong>
              <p>
                {textValue(slice.primary.summaryBody)}
              </p>
            </div>

            <dl className="library-reference-stats">
              <div>
                <dt>Entries</dt>
                <dd>{entries.length.toString().padStart(2, '0')}</dd>
              </div>
              <div>
                <dt>Topics</dt>
                <dd>{tagCount.toString().padStart(2, '0')}</dd>
              </div>
              <div>
                <dt>Last update</dt>
                <dd>{latestUpdate}</dd>
              </div>
            </dl>

            <div className="button-row">
              {linkValue(slice.primary.primaryHref) && textValue(slice.primary.primaryLabel) ? (
                <Link
                  className="btn btn-secondary"
                  href={linkValue(slice.primary.primaryHref)}
                >
                  {textValue(slice.primary.primaryLabel)}
                </Link>
              ) : null}
              {linkValue(slice.primary.secondaryHref) && textValue(slice.primary.secondaryLabel) ? (
                <Link
                  className="btn btn-ghost"
                  href={linkValue(slice.primary.secondaryHref)}
                >
                  {textValue(slice.primary.secondaryLabel)}
                </Link>
              ) : null}
            </div>
          </aside>
        </div>

        <div className="library-reference-list">
          {remainingEntries.length > 0 ? (
            remainingEntries.map((entry, index) => (
              <article
                key={entry.id}
                className="library-reference-row"
                data-reveal
                data-reveal-delay={index * 0.05}
              >
                <div className="library-reference-row-meta">
                  <span>{formatLibraryDate(entry.data.pubDate)}</span>
                  {entry.data.tags.length > 0 ? (
                    <div className="tag-list" aria-label={`Topics for ${entry.data.title}`}>
                      {entry.data.tags.map((tag) => (
                        <span key={tag} className="tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
                <div className="library-reference-row-copy">
                  <h3>
                    <Link href={`/library/${entry.id}`}>{entry.data.title}</Link>
                  </h3>
                  <p>{entry.data.description}</p>
                </div>
                <Link className="library-reference-row-action" href={`/library/${entry.id}`}>
                  {textValue(slice.primary.rowCtaLabel)}
                </Link>
              </article>
            ))
          ) : (
            <article className="library-reference-row library-reference-row--solo">
              <div className="library-reference-row-copy">
                <h3>{textValue(slice.primary.emptyTitle)}</h3>
                <p>{textValue(slice.primary.emptyBody)}</p>
              </div>
            </article>
          )}
        </div>
      </section>
    );
  }

  return null;
}
