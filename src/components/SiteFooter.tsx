interface FooterLink {
  label: string;
  href: string;
  value?: string;
}

interface FooterData {
  description?: string;
  navHeading?: string;
  navLinks?: FooterLink[];
  connectHeading?: string;
  connectLinks?: FooterLink[];
  copyright?: string;
  bottomLinkLabel?: string;
  bottomLinkHref?: string;
}

interface SiteFooterProps {
  footerData?: FooterData;
}

export default function SiteFooter({ footerData }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <img
              className="footer-brand-icon"
              src="/assets/brand/2.svg"
              alt="Sonicverse logo"
            />
            <h2>Sonicverse</h2>
          </div>
          {footerData?.description && <p>{footerData.description}</p>}
        </div>

        {footerData?.navLinks && footerData.navLinks.length > 0 && (
          <div>
            {footerData.navHeading && <h3>{footerData.navHeading}</h3>}
            <ul>
              {footerData.navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {footerData?.connectLinks && footerData.connectLinks.length > 0 && (
          <div>
            {footerData.connectHeading && <h3>{footerData.connectHeading}</h3>}
            <ul>
              {footerData.connectLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.value ?? link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="container footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} Sonicverse
          {footerData?.copyright ? ` ${footerData.copyright}` : ''}
        </p>
        {footerData?.bottomLinkHref && footerData?.bottomLinkLabel && (
          <a href={footerData.bottomLinkHref}>{footerData.bottomLinkLabel}</a>
        )}
      </div>
    </footer>
  );
}
