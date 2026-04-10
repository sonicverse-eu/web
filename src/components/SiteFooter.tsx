import Link from 'next/link';
import type { SettingsDocument } from '@/lib/site-data/types';

interface SiteFooterProps {
  settings: SettingsDocument | null;
}

export default function SiteFooter({ settings }: SiteFooterProps) {
  if (!settings) {
    return null;
  }

  const brandName = settings.data.footerBrandName?.trim() ?? '';
  const brandTagline = settings.data.footerBrandTagline?.trim() ?? '';
  const legalText = settings.data.footerLegalText?.trim() ?? '';
  const footerTagline = settings.data.footerTagline?.trim() ?? '';
  const bottomLinks = settings.data.footerBottomLinks;
  const footerLinks = settings.data.footerLinks;
  const footerResources = settings.data.footerResources;
  const footerContact = settings.data.footerContact;

  const hasFooterContent = Boolean(
    brandName ||
      brandTagline ||
      legalText ||
      footerTagline ||
      bottomLinks.length ||
      footerLinks.length ||
      footerResources.length ||
      footerContact.length,
  );

  if (!hasFooterContent) {
    return null;
  }

  return (
    <footer className="site-footer">
      <div className="container site-footer-grid">
        <div className="site-footer-brand">
          <div className="brand-lockup">
            <img className="brand-mark" src="/assets/brand/2.svg" alt="Sonicverse logo" />
            {brandName || brandTagline ? (
              <div>
                {brandName ? <strong>{brandName}</strong> : null}
                {brandTagline ? <span>{brandTagline}</span> : null}
              </div>
            ) : null}
          </div>
          {footerTagline ? <p>{footerTagline}</p> : null}
        </div>

        {footerLinks.length ? (
          <div>
            <h3>Company</h3>
            <ul>
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {footerResources.length ? (
          <div>
            <h3>Resources</h3>
            <ul>
              {footerResources.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {footerContact.length ? (
          <div>
            <h3>Contact</h3>
            <ul>
              {footerContact.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>
                    <strong>{link.label}</strong>
                    <span>{link.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>

      {legalText || bottomLinks.length ? (
        <div className="container site-footer-bottom">
          {legalText ? <p>&copy; {new Date().getFullYear()} {brandName}. {legalText}</p> : null}
          {bottomLinks.length ? (
            <div>
              {bottomLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </footer>
  );
}
