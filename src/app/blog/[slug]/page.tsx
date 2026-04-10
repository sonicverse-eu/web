import { notFound } from 'next/navigation';
import BlogArticleLayout from '@/components/blog/BlogArticleLayout';
import { getAdjacentBlogPosts, getRelatedBlogPosts, sortBlogPosts } from '@/lib/blog';
import { getBlogPost, getBlogPosts } from '@/lib/content';
import { renderMarkdoc } from '@/lib/markdoc';
import { buildArticleMetadata } from '@/lib/page-metadata';
import { getPageByUID } from '@/lib/site-data/api';

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

  const page = await getPageByUID('blog');

  if (!page) {
    notFound();
  }

  const allPosts = sortBlogPosts(getBlogPosts());
  const { newerPost, olderPost } = getAdjacentBlogPosts(allPosts, post.id);
  const relatedPosts = getRelatedBlogPosts(allPosts, post);

  return (
    <BlogArticleLayout
      shell={page.data.articleShell}
      post={post}
      newerPost={newerPost}
      olderPost={olderPost}
      relatedPosts={relatedPosts}
    >
      {renderMarkdoc(post.body)}
    </BlogArticleLayout>
  );
}
