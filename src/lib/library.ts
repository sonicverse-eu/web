import type { LibraryEntry } from './content';

const LIBRARY_DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
});

export function sortLibraryEntries(entries: LibraryEntry[]): LibraryEntry[] {
  return [...entries].sort(
    (a, b) => (b.data.pubDate?.valueOf() ?? 0) - (a.data.pubDate?.valueOf() ?? 0)
  );
}

export function formatLibraryDate(date?: Date): string {
  if (!date) {
    return 'Updated recently';
  }

  return LIBRARY_DATE_FORMATTER.format(date);
}

export function getLibraryTagCount(entries: LibraryEntry[]): number {
  return new Set(entries.flatMap((entry) => entry.data.tags)).size;
}

export function getRelatedLibraryEntries(
  entries: LibraryEntry[],
  currentEntry: LibraryEntry,
  limit = 3
): LibraryEntry[] {
  const currentTags = new Set(currentEntry.data.tags);

  return entries
    .filter((entry) => entry.id !== currentEntry.id)
    .map((entry) => ({
      entry,
      sharedTags: entry.data.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .sort((a, b) => {
      if (b.sharedTags !== a.sharedTags) return b.sharedTags - a.sharedTags;
      return (b.entry.data.pubDate?.valueOf() ?? 0) - (a.entry.data.pubDate?.valueOf() ?? 0);
    })
    .slice(0, limit)
    .map(({ entry }) => entry);
}
