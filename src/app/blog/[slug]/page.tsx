import { notFound } from 'next/navigation';
import {
  formatBlogDate,
  getAdjacentBlogPosts,
  getReadingTimeMinutes,
  getRelatedBlogPosts,
  sortBlogPosts,
} from '@/lib/blog';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import { renderMarkdoc } from '@/lib/markdoc';
import { buildArticleMetadata } from '@/lib/page-metadata';
import { requirePage } from '@/lib/page-data';

const blogPage = requirePage('blog');

type BlogArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.id }));
}

export async function generateMetadata({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post || post.data.draft) {
    return {};
  }

  return buildArticleMetadata(post, 'blog');
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post || post.data.draft) {
    notFound();
  }

  const allPosts = sortBlogPosts(getBlogPosts());
  const { newerPost, olderPost } = getAdjacentBlogPosts(allPosts, post.id);
  const relatedPosts = getRelatedBlogPosts(allPosts, post);
  const readingTime = getReadingTimeMinutes(post.body);

  return (
    <article className="container section-gap blog-article-shell" data-reveal>
      <header className="blog-article-hero" data-reveal-group>
        <div className="breadcrumbs text-sm" aria-label="Breadcrumb">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/blog">Blog</a></li>
            <li aria-current="page">{post.data.title}</li>
          </ul>
        </div>
        <p className="eyebrow">{formatBlogDate(post.data.pubDate)}</p>
        <h1>{post.data.title}</h1>
        <p className="hero-subtitle">{post.data.description}</p>
        <div className="blog-article-meta" aria-label="Article metadata">
          <span>{post.data.author}</span>
          <span>{readingTime} min read</span>
        </div>
        {post.data.tags.length > 0 && (
          <div className="tag-list" aria-label="Article topics">
            {post.data.tags.map((tag) => (
              <a
                key={tag}
                className="badge badge-outline"
                href={`/blog#topic-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {tag}
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="blog-article-body">
        <div className="prose blog-article-prose">{renderMarkdoc(post.body)}</div>
      </div>

      {(newerPost || olderPost) && (
        <section className="blog-article-footer">
          <div className="blog-related-header">
            <p className="eyebrow">{blogPage.data.blogNavigationLabel ?? 'Continue reading'}</p>
            <h2>Next in the archive.</h2>
          </div>
          <div className="blog-continue-grid">
            {newerPost && (
              <article className="blog-related-card card bg-base-100 shadow-lg">
                <p className="eyebrow">Newer post</p>
                <h3>
                  <a href={`/blog/${newerPost.id}`}>{newerPost.data.title}</a>
                </h3>
                <p>{newerPost.data.description}</p>
              </article>
            )}
            {olderPost && (
              <article className="blog-related-card card bg-base-100 shadow-lg">
                <p className="eyebrow">Older post</p>
                <h3>
                  <a href={`/blog/${olderPost.id}`}>{olderPost.data.title}</a>
                </h3>
                <p>{olderPost.data.description}</p>
              </article>
            )}
          </div>
        </section>
      )}

      <section className="blog-related-shell">
        <div className="blog-related-header">
          <p className="eyebrow">{blogPage.data.blogRelatedTitle ?? 'Related posts'}</p>
          <h2>More on this topic.</h2>
        </div>
        {relatedPosts.length > 0 ? (
          <div className="blog-related-grid">
            {relatedPosts.slice(0, 2).map((relatedPost) => (
              <article key={relatedPost.id} className="blog-related-card card bg-base-100 shadow-lg">
                <p className="eyebrow">{formatBlogDate(relatedPost.data.pubDate)}</p>
                <h3>
                  <a href={`/blog/${relatedPost.id}`}>{relatedPost.data.title}</a>
                </h3>
                <p>{relatedPost.data.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="blog-related-empty">
            <p>No related posts yet for these topics.</p>
            <a className="btn btn-ghost" href="/blog">
              {blogPage.data.blogBrowseAllLabel ?? 'Browse all posts'}
            </a>
          </div>
        )}
      </section>
    </article>
  );
}
