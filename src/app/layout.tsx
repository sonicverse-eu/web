import type { Metadata } from 'next';
import { IBM_Plex_Mono, Manrope } from 'next/font/google';
import '../styles/global.css';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import MotionProvider from '@/components/MotionProvider';
import { getAllProducts, getSettings } from '@/lib/site-data/api';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://sonicverse.eu'),
  title: {
    default: 'Sonicverse - OSS for independent media',
    template: '%s - Sonicverse',
  },
  description:
    'Sonicverse helps independent media with tools to build, grow, and monetize their audience. We offer a suite of open-source products for radiostations, podcasts, and more.',
  openGraph: {
    type: 'website',
    siteName: 'Sonicverse',
    images: [{ url: '/og-image.svg' }],
  },
  twitter: {
    card: 'summary_large_image',
  },
};

// Inline theme script to prevent FOUC — runs synchronously before paint
const themeScript = `(function(){
  var STORAGE_KEY = 'sv-theme';
  var LIGHT_THEME = 'light';
  var DARK_THEME = 'dark';
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  var resolve = function(stored) {
    return stored === LIGHT_THEME || stored === DARK_THEME ? stored : (mq.matches ? DARK_THEME : LIGHT_THEME);
  };
  var sync = function() {
    try {
      var theme = resolve(localStorage.getItem(STORAGE_KEY));
      document.documentElement.setAttribute('data-theme', theme);
      return theme;
    } catch(e) {
      document.documentElement.setAttribute('data-theme', LIGHT_THEME);
      return LIGHT_THEME;
    }
  };
  window.__sonicverseSyncTheme = sync;
  window.__sonicverseApplyTheme = function(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(STORAGE_KEY, theme); } catch(e) {}
    return theme;
  };
  if (!window.__sonicverseThemeLifecycleBound) {
    window.addEventListener('storage', function(e) {
      if (!e.key || e.key === STORAGE_KEY) sync();
    });
    mq.addEventListener('change', function() {
      try { if (!localStorage.getItem(STORAGE_KEY)) sync(); } catch(e) { sync(); }
    });
    window.__sonicverseThemeLifecycleBound = true;
  }
  sync();
})();`;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [products, settings] = await Promise.all([getAllProducts(), getSettings()]);

  return (
    <html lang="en" className={`${manrope.variable} ${ibmPlexMono.variable}`}>
      <head>
        <meta name="theme-color" content="#eef4ff" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#07111f" media="(prefers-color-scheme: dark)" />
        {/* Theme init: runs before paint to prevent FOUC */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <div className="background-atmosphere" aria-hidden="true" />
        <SiteHeader products={products} settings={settings} />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter settings={settings} />
        <MotionProvider />
      </body>
    </html>
  );
}
