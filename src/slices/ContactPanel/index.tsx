import Link from 'next/link';
import type { SliceRendererProps } from '@/slices/types';
import ContactForm from '@/app/contact/ContactForm';
import { buildThreadId } from '@/lib/contact';
import { contactCategories } from '@/lib/site-data/contact';
import type { CmsSlice } from '@/lib/site-data/types';

export default function ContactPanel({ slice }: SliceRendererProps<CmsSlice>) {
  const formMode = String(slice.primary.formMode ?? 'contact');
  const categories =
    formMode === 'demo'
      ? [
          contactCategories[0],
          contactCategories[1],
          contactCategories[2],
          contactCategories[3],
        ]
      : contactCategories;

  return (
    <section className="slice slice-contact" id="contact-panel">
      <div className="container contact-shell">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
          <h2>{String(slice.primary.title ?? '')}</h2>
          <p>{String(slice.primary.body ?? '')}</p>
          <div className="contact-copy-card">
            <span>{String(slice.primary.panelTitle ?? '')}</span>
            <p>{String(slice.primary.panelBody ?? '')}</p>
          </div>
          <div className="contact-link-list">
            {slice.items.map((item, index) => (
              <Link key={`${slice.id}-${index}`} href={String(item.href ?? '/contact')}>
                <strong>{String(item.label ?? '')}</strong>
                <span>{String(item.value ?? '')}</span>
              </Link>
            ))}
          </div>
        </div>
        <div data-reveal>
          <ContactForm categories={categories} initialThreadId={buildThreadId()} />
        </div>
      </div>
    </section>
  );
}
