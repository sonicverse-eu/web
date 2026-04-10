import Link from 'next/link';
import type { SettingsDocument } from '@/lib/site-data/types';

interface SiteFooterProps {
  settings: SettingsDocument;
}

export default function SiteFooter({ settings }: SiteFooterProps) {
  const brandName = settings.data.footerBrandName?.trim() || 'Sonicverse';
  const brandTagline = settings.data.footerBrandTagline?.trim() || 'Audio operations platform';
  const legalText = settings.data.footerLegalText?.trim() || 'Open infrastructure for modern audio teams.';
  const bottomLinks = settings.data.footerBottomLinks.length
    ? settings.data.footerBottomLinks
    : [
      { label: 'Audio Streaming Stack', href: '/projects/audio-streaming-stack' },
      { label: 'Book a demo', href: '/contact' },
    ];

  return (
    <footer className="site-footer">
      <div className="container site-footer-grid">
        <div className="site-footer-brand">
          <div className="brand-lockup">
            <img className="brand-mark" src="/assets/brand/2.svg" alt="Sonicverse logo" />
            <div>
              <strong>{brandName}</strong>
              <span>{brandTagline}</span>
            </div>
          </div>
          <p>{settings.data.footerTagline}</p>
        </div>

        <div>
          <h3>Company</h3>
          <ul>
            {settings.data.footerLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Resources</h3>
          <ul>
            {settings.data.footerResources.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3>Contact</h3>
          <ul>
            {settings.data.footerContact.map((link) => (
              <li key={link.href}>
                <a href={link.href}>
                  <strong>{link.label}</strong>
                  <span>{link.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container site-footer-bottom">
        <p>&copy; {new Date().getFullYear()} {brandName}. {legalText}</p>
        <div>
          {bottomLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
