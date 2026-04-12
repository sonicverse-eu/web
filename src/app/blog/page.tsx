import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/content';
import BlogOverview from '@/components/blog/BlogOverview';

export const metadata: Metadata = {
  title: 'Blog – Sonicverse',
  description:
    'Insights, tutorials, and updates from the Sonicverse team and community.',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <div className="wide-page-shell blog-overview-page blog-page">
      {/* Hero */}
      <section className="slice slice-hero slice-hero--blog_journal">
        <div className="container hero-shell">
          <div className="hero-copy" data-reveal>
            <p className="eyebrow">Blog</p>
            <h1>The Sonicverse journal</h1>
            <p className="hero-subtitle">
              Insights, tutorials, and updates from the team and community.
            </p>
          </div>
        </div>
      </section>

      {/* Blog overview component handles the post listing */}
      <BlogOverview posts={posts} />
    </div>
  );
}
