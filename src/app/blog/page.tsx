import BlogOverview from '@/components/blog/BlogOverview';
import { getBlogTagSummaries, sortBlogPosts } from '@/lib/blog';
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
    <BlogOverview
      page={page.data}
      posts={posts}
      featuredPost={featuredPost}
      archivePosts={archivePosts}
      tagSummaries={tagSummaries}
    />
  );
}
