import ContactForm from './ContactForm';
import { buildThreadId } from '@/lib/contact';
import { renderMarkdoc } from '@/lib/markdoc';
import { buildPageMetadata } from '@/lib/page-metadata';
import { requirePage } from '@/lib/page-data';
import {
  contactCategoryDefaults,
  supportLinkDefaults,
  supportNotesDefaults,
} from '@/lib/site';

const page = requirePage('contact');

export const metadata = buildPageMetadata(page);

export default function ContactPage() {
  const categories =
    page.data.contactCategories?.length ? page.data.contactCategories : contactCategoryDefaults;
  const supportLinks = page.data.supportLinks ?? supportLinkDefaults;
  const supportNotes = page.data.supportNotes ?? supportNotesDefaults;

  return (
    <>
      <section className="hero container" data-reveal-group>
        <div className="hero-glow" aria-hidden="true" />
        {page.data.eyebrow && <p className="eyebrow">{page.data.eyebrow}</p>}
        <h1 className="gradient-text">{page.data.heroTitle}</h1>
        <p className="hero-subtitle">{page.data.heroSubtitle}</p>
      </section>

      <section className="container contact-grid section-gap" data-reveal>
        <div className="contact-main">
          <div className="prose" data-reveal>
            {renderMarkdoc(page.body)}
          </div>

          <ContactForm categories={categories} initialThreadId={buildThreadId()} />

          <aside className="feature-card contact-support-card" data-reveal>
            {page.data.supportTitle && <h2>{page.data.supportTitle}</h2>}
            {page.data.supportDescription && <p>{page.data.supportDescription}</p>}
            <ul className="contact-list">
              {supportLinks.map((link) => (
                <li key={link.label}>
                  <strong>{link.label}:</strong> <a href={link.href}>{link.value}</a>
                </li>
              ))}
            </ul>
            <ul className="contact-meta-list" aria-label="Response notes">
              {supportNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
            {page.data.ctaHref && page.data.ctaLabel && (
              <a className="button button-primary" href={page.data.ctaHref}>
                {page.data.ctaLabel}
              </a>
            )}
          </aside>
        </div>
      </section>
    </>
  );
}
