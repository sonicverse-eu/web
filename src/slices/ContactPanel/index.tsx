import Link from 'next/link';
import type { SliceRendererProps } from '@/slices/types';
import ContactForm from '@/app/contact/ContactForm';
import { buildThreadId } from '@/lib/contact';
import { contactCategories } from '@/lib/site-data/contact';
import type { CmsSlice } from '@/lib/site-data/types';

const contactCategoryOrder = ['technical-support', 'product-pilot', 'partnerships', 'community'] as const;
const demoCategoryOrder = ['product-pilot', 'technical-support', 'partnerships', 'community'] as const;

function orderedCategories(values: readonly string[]) {
  return values
    .map((value) => contactCategories.find((category) => category.value === value))
    .filter((category): category is (typeof contactCategories)[number] => Boolean(category));
}

export default function ContactPanel({ slice }: SliceRendererProps<CmsSlice>) {
  const formMode = String(slice.primary.formMode ?? 'contact');
  const categories =
    formMode === 'demo'
      ? orderedCategories(demoCategoryOrder)
      : orderedCategories(contactCategoryOrder);
  const guidanceNotes =
    formMode === 'demo'
      ? [
          'Start with the workflow you want to see, not a polished brief.',
          'Integration context helps, but we can still guide the first conversation without it.',
          'We usually follow up within two business days.',
        ]
      : [
          'One clear pressure point is enough to get the conversation moving.',
          'Reference links help, but they are optional.',
          'We keep the same thread ID in every follow-up so context stays intact.',
        ];
  const alternatePaths =
    formMode === 'demo'
      ? [
          { label: 'Need more background first?', value: 'Browse the project lineup', href: '/projects' },
          { label: 'Prefer written context?', value: 'Read the library', href: '/library' },
          { label: 'General questions instead?', value: 'Use the contact page', href: '/contact' },
        ]
      : [
          { label: 'Prefer a walkthrough?', value: 'Book a focused demo', href: '/contact' },
          { label: 'Need implementation context?', value: 'Browse the library', href: '/library' },
          { label: 'Exploring the stack?', value: 'See the project lineup', href: '/projects' },
        ];

  return (
    <section className={`slice slice-contact slice-contact--${slice.variation}`} id="contact-panel">
      <div className="container contact-shell">
        <div className="contact-sidebar" data-reveal-group>
          <div className="contact-copy">
            <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
            <h2>{String(slice.primary.title ?? '')}</h2>
            <p>{String(slice.primary.body ?? '')}</p>
          </div>

          <div className="contact-guidance">
            <div className="contact-copy-card">
              <span>{String(slice.primary.panelTitle ?? '')}</span>
              <p>{String(slice.primary.panelBody ?? '')}</p>
            </div>

            <ul className="contact-meta-list" aria-label="What helps us reply well">
              {guidanceNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>

          <div className="contact-link-cluster">
            <p className="contact-link-kicker">Direct paths</p>
            <div className="contact-link-list">
              {slice.items.map((item, index) => (
                <Link key={`${slice.id}-${index}`} href={String(item.href ?? '/contact')}>
                  <span>{String(item.label ?? '')}</span>
                  <strong>{String(item.value ?? '')}</strong>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="contact-main" data-reveal>
          <ContactForm categories={categories} initialThreadId={buildThreadId()} />
        </div>
      </div>

      <div className="container contact-alt-grid" data-reveal-group>
        {alternatePaths.map((path) => (
          <Link key={path.href} className="contact-alt-link" href={path.href}>
            <span>{path.label}</span>
            <strong>{path.value}</strong>
          </Link>
        ))}
      </div>
    </section>
  );
}
