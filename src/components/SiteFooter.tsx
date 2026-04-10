import Link from 'next/link';
import type { SettingsDocument } from '@/lib/prismic/types';

interface SiteFooterProps {
  settings: SettingsDocument;
}

export default function SiteFooter({ settings }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container site-footer-grid">
        <div className="site-footer-brand">
          <div className="brand-lockup">
            <img className="brand-mark" src="/assets/brand/2.svg" alt="Sonicverse logo" />
            <div>
              <strong>Sonicverse</strong>
              <span>Audio operations platform</span>
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
        <p>&copy; {new Date().getFullYear()} Sonicverse. Open infrastructure for modern audio teams.</p>
        <div>
          <Link href="/pricing">Pricing</Link>
          <Link href="/demo">Book a demo</Link>
        </div>
      </div>
    </footer>
  );
}
