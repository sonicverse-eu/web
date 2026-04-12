/**
 * MDX rendering pipeline.
 *
 * Uses next-mdx-remote/rsc (React Server Components) to compile and render
 * MDX content at build/request time with zero client-side JavaScript.
 *
 * Custom components are available inside every .mdx file without explicit
 * imports — they are injected via the `components` map below.
 */
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { MDXRemoteProps } from 'next-mdx-remote/rsc';
import { CalloutPanel } from '@/components/markdoc/CalloutPanel';
import { ChecklistSection } from '@/components/markdoc/ChecklistSection';
import { StepsSection } from '@/components/markdoc/StepsSection';
import { QuotePanel } from '@/components/markdoc/QuotePanel';
import { StatPanel } from '@/components/markdoc/StatPanel';
import { CtaInlineCard } from '@/components/markdoc/CtaInlineCard';

/**
 * Global MDX component map.
 * These components are available in every .mdx content file without import.
 * Add new shared components here to make them available site-wide.
 */
export const mdxComponents: MDXRemoteProps['components'] = {
  // Custom rich blocks
  Callout: CalloutPanel,
  Checklist: ChecklistSection,
  Steps: StepsSection,
  Quote: QuotePanel,
  Stat: StatPanel,
  CtaCard: CtaInlineCard,
};

/**
 * Renders a raw MDX string as a React Server Component tree.
 * Returns null for empty content.
 */
export async function renderMDX(source: string) {
  if (!source.trim()) return null;
  return <MDXRemote source={source} components={mdxComponents} />;
}
