import { notFound } from 'next/navigation';
import { getLibraryEntries, getLibraryEntry } from '@/lib/content';
import LibraryArticleLayout from '@/components/library/LibraryArticleLayout';
import { getRelatedLibraryEntries, sortLibraryEntries } from '@/lib/library';
import { renderMarkdoc } from '@/lib/markdoc';
import { buildArticleMetadata } from '@/lib/page-metadata';
import { getPageByUID } from '@/lib/site-data/api';

type LibraryArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getLibraryEntries().map((entry) => ({ slug: entry.id }));
}

export async function generateMetadata({ params }: LibraryArticlePageProps) {
  const { slug } = await params;
  const entry = getLibraryEntry(slug);

  if (!entry || entry.data.draft) {
    return {};
  }

  return buildArticleMetadata(entry, 'library');
}

export default async function LibraryArticlePage({ params }: LibraryArticlePageProps) {
  const { slug } = await params;
  const entry = getLibraryEntry(slug);

  if (!entry || entry.data.draft) {
    notFound();
  }

  const page = await getPageByUID('library');

  if (!page) {
    notFound();
  }

  const allEntries = sortLibraryEntries(getLibraryEntries());
  const relatedEntries = getRelatedLibraryEntries(allEntries, entry, 3);
  const recentEntries = allEntries.filter((candidate) => candidate.id !== entry.id).slice(0, 3);

  return (
    <LibraryArticleLayout
      shell={page.data.articleShell}
      entry={entry}
      relatedEntries={relatedEntries}
      recentEntries={recentEntries}
    >
      {renderMarkdoc(entry.body)}
    </LibraryArticleLayout>
  );
}
