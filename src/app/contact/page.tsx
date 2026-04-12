import type { Metadata } from 'next';
import Link from 'next/link';
import ContactForm from './ContactForm';
import { buildThreadId } from '@/lib/contact';
import { contactCategories } from '@/lib/site-data/contact';

export const metadata: Metadata = {
  title: 'Contact – Sonicverse',
  description:
    'Get in touch with the Sonicverse team. Ask about product pilots, technical support, partnerships, or community collaboration.',
};

const contactCategoryOrder = [
  'technical-support',
  'product-pilot',
  'partnerships',
  'community',
] as const;

function orderedCategories(values: readonly string[]) {
  return values
    .map((value) => contactCategories.find((category) => category.value === value))
    .filter((category): category is (typeof contactCategories)[number] => Boolean(category));
}

export default function ContactPage() {
  const categories = orderedCategories(contactCategoryOrder);

  return (
    <div className="wide-page-shell contact-page">
      <section className="slice slice-contact slice-contact--default" id="contact-panel">
        <div className="container contact-shell">
          <div className="contact-sidebar" data-reveal-group>
            <div className="contact-copy">
              <p className="eyebrow">Contact</p>
              <h1>Let's talk</h1>
              <p>
                Whether you're planning a deployment, exploring a partnership, or just have a
                question — reach out and we'll get back to you.
              </p>
            </div>

            <div className="contact-guidance">
              <div className="contact-copy-card">
                <span>What to include</span>
                <p>
                  A short description of your situation helps us route your message to the
                  right person and respond faster.
                </p>
              </div>
            </div>

            <div className="contact-link-cluster">
              <div className="contact-link-list">
                <a href="mailto:oss@sonicverse.eu">
                  <span>Email</span>
                  <strong>oss@sonicverse.eu</strong>
                </a>
                <a
                  href="https://github.com/sonicverse-eu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                  <strong>sonicverse-eu</strong>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-main" data-reveal>
            <ContactForm categories={categories} initialThreadId={buildThreadId()} />
          </div>
        </div>

        <div className="container contact-alt-grid" data-reveal-group>
          <Link className="contact-alt-link" href="/projects">
            <span>Prefer a walkthrough?</span>
            <strong>Browse the project lineup</strong>
          </Link>
          <Link className="contact-alt-link" href="/blog">
            <span>Need implementation context?</span>
            <strong>Browse the blog</strong>
          </Link>
          <Link className="contact-alt-link" href="/community">
            <span>Exploring the community?</span>
            <strong>Community hub</strong>
          </Link>
        </div>
      </section>
    </div>
  );
}
