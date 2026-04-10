import { notFound } from 'next/navigation';
import { getLibraryEntries, getLibraryEntry } from '@/lib/content';
import { renderMarkdoc } from '@/lib/markdoc';
import { buildArticleMetadata } from '@/lib/page-metadata';
import { requirePage } from '@/lib/page-data';

const libraryPage = requirePage('library');

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

  return (
    <article className="container article-shell section-gap" data-reveal>
      <a className="btn btn-ghost" href="/library">
        {libraryPage.data.blogBackLabel ?? 'Back to library'}
      </a>
      <h1>{entry.data.title}</h1>
      <p className="hero-subtitle">{entry.data.description}</p>
      <div className="tag-list">
        {entry.data.tags.map((tag) => (
          <span key={tag} className="badge badge-outline">{tag}</span>
        ))}
      </div>
      <div className="prose">{renderMarkdoc(entry.body)}</div>
    </article>
  );
}
