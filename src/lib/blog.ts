import type { BlogEntry } from './content';

const BLOG_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export function sortBlogPosts(posts: BlogEntry[]): BlogEntry[] {
  return [...posts].sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

export function formatBlogDate(date: Date): string {
  return BLOG_DATE_FORMATTER.format(date);
}

export function getReadingTimeMinutes(body: string): number {
  const normalized = body
    .replace(/---[\s\S]*?---/, ' ')
    .replace(/{%[\s\S]*?%}/g, ' ')
    .replace(/[`*_>#-]/g, ' ')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  const wordCount = normalized ? normalized.split(' ').length : 0;
  return Math.max(1, Math.ceil(wordCount / 220));
}

export function getBlogTagSummaries(
  posts: BlogEntry[]
): { tag: string; count: number; latestPost: BlogEntry }[] {
  const tagMap = new Map<string, { tag: string; count: number; latestPost: BlogEntry }>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      const existing = tagMap.get(tag);
      if (existing) {
        existing.count += 1;
        continue;
      }
      tagMap.set(tag, { tag, count: 1, latestPost: post });
    }
  }

  return Array.from(tagMap.values()).sort((a, b) => {
    if (b.count !== a.count) return b.count - a.count;
    return a.tag.localeCompare(b.tag);
  });
}

export function getAdjacentBlogPosts(
  posts: BlogEntry[],
  currentId: string
): { newerPost: BlogEntry | undefined; olderPost: BlogEntry | undefined } {
  const currentIndex = posts.findIndex((post) => post.id === currentId);
  return {
    newerPost: currentIndex > 0 ? posts[currentIndex - 1] : undefined,
    olderPost:
      currentIndex >= 0 && currentIndex < posts.length - 1
        ? posts[currentIndex + 1]
        : undefined,
  };
}

export function getRelatedBlogPosts(
  posts: BlogEntry[],
  currentPost: BlogEntry,
  limit = 3
): BlogEntry[] {
  const currentTags = new Set(currentPost.data.tags);
  return posts
    .filter((post) => post.id !== currentPost.id)
    .map((post) => ({
      post,
      sharedTags: post.data.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort((a, b) => {
      if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
      return b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf();
    })
    .slice(0, limit)
    .map(({ post }) => post);
}
