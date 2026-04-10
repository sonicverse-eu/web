'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import type { ProjectEntry } from '@/lib/content';
import ProjectIcon from './ProjectIcon';
import ThemeToggle from './ThemeToggle';

interface SiteHeaderProps {
  projects: ProjectEntry[];
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/community', label: 'Community' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

const docsHref = 'https://docs.sonicverse.eu';
const SCROLL_THRESHOLD = 64;
const SCROLL_DELTA = 8;
const MOBILE_NAV_TRANSITION_MS = 320;

function normalizePath(p?: string | null) {
  if (!p) return '/';
  return p !== '/' ? p.replace(/\/+$/, '') : '/';
}

function isActivePath(href: string, path?: string | null) {
  const h = normalizePath(href);
  const p = normalizePath(path);
  return h === '/' ? p === '/' : p === h || p.startsWith(`${h}/`);
}

export default function SiteHeader({ projects }: SiteHeaderProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const shellRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const navListRef = useRef<HTMLUListElement>(null);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const indicatorReady = useRef(false);

  // ── Nav indicator ──────────────────────────────────────────────────────────
  const updateNavIndicator = useCallback((instant = false) => {
    const navList = navListRef.current;
    const indicator = indicatorRef.current;
    if (!navList || !indicator) return;

    if (window.getComputedStyle(navList).display === 'none') {
      indicator.style.opacity = '0';
      return;
    }

    const activeLink = navList.querySelector<HTMLAnchorElement>('a[data-desktop-nav-link].active');
    if (!activeLink) {
      indicator.style.opacity = '0';
      return;
    }

    const navRect = navList.getBoundingClientRect();
    const linkRect = activeLink.getBoundingClientRect();
    const left = linkRect.left - navRect.left;
    const width = linkRect.width;

    if (!indicatorReady.current || instant) {
      indicator.style.transition = 'none';
      indicator.style.left = `${left}px`;
      indicator.style.width = `${width}px`;
      indicator.getBoundingClientRect(); // force reflow
      indicator.style.transition = '';
      indicator.style.opacity = '1';
      indicatorReady.current = true;
    } else {
      indicator.style.left = `${left}px`;
      indicator.style.width = `${width}px`;
      indicator.style.opacity = '1';
    }
  }, []);

  // ── Scroll behaviour ───────────────────────────────────────────────────────
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    lastScrollY.current = window.scrollY;

    const header = headerRef.current;
    if (header) {
      header.dataset.navHidden = 'false';
      header.dataset.scrolled = window.scrollY > SCROLL_THRESHOLD ? 'true' : 'false';
    }

    const onScroll = () => {
      if (ticking.current) return;
      requestAnimationFrame(() => {
        const header = headerRef.current;
        if (!header) { ticking.current = false; return; }

        const currentY = window.scrollY;
        const delta = currentY - lastScrollY.current;

        header.dataset.scrolled = currentY > SCROLL_THRESHOLD ? 'true' : 'false';

        if (currentY <= SCROLL_THRESHOLD) {
          header.dataset.navHidden = 'false';
        } else if (Math.abs(delta) >= SCROLL_DELTA && !mobileOpen && !reduceMotion) {
          header.dataset.navHidden = delta > 0 ? 'true' : 'false';
        }

        lastScrollY.current = currentY;
        ticking.current = false;
      });
      ticking.current = true;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [mobileOpen]);

  // ── Active links + indicator on route change ───────────────────────────────
  useEffect(() => {
    // Close mobile nav on navigation
    if (mobileOpen) {
      closeMobileNav({ immediate: true, restoreFocus: false });
    }
    // Reset header visibility
    if (headerRef.current) {
      headerRef.current.dataset.navHidden = 'false';
    }
    setTimeout(() => updateNavIndicator(true), 50);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // ── Indicator on resize ────────────────────────────────────────────────────
  useEffect(() => {
    const onResize = () => updateNavIndicator(true);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [updateNavIndicator]);

  // ── Mobile nav helpers ─────────────────────────────────────────────────────
  const setBodyLocked = (locked: boolean) => {
    document.documentElement.toggleAttribute('data-mobile-nav-open', locked);
    document.body.style.overflow = locked ? 'hidden' : '';
    [
      headerRef.current,
      document.querySelector('main'),
      document.querySelector('.site-footer'),
    ].forEach((el) => {
      if (!el) return;
      if (locked) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
  };

  const closeMobileNav = useCallback(
    ({ immediate = false, restoreFocus = true } = {}) => {
      const shell = shellRef.current;
      const toggle = toggleRef.current;
      if (!toggle || !shell) return;

      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      shell.setAttribute('aria-hidden', 'true');
      setBodyLocked(false);

      const finish = () => {
        shell.hidden = true;
        shell.dataset.open = 'false';
      };

      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

      if (immediate) {
        finish();
      } else {
        shell.dataset.open = 'false';
        hideTimerRef.current = setTimeout(finish, MOBILE_NAV_TRANSITION_MS);
      }

      if (restoreFocus && restoreFocusRef.current) {
        restoreFocusRef.current.focus();
      }

      setMobileOpen(false);
    },
    []
  );

  const openMobileNav = useCallback(() => {
    const shell = shellRef.current;
    const toggle = toggleRef.current;
    if (!toggle || !shell || !window.matchMedia('(max-width: 700px)').matches) return;

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : toggle;

    if (headerRef.current) headerRef.current.dataset.navHidden = 'false';

    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    shell.hidden = false;
    shell.setAttribute('aria-hidden', 'false');
    shell.dataset.open = 'false';
    setBodyLocked(true);
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close navigation menu');

    requestAnimationFrame(() => {
      shell.dataset.open = 'true';
      const first = shell.querySelector<HTMLElement>(
        '[data-mobile-nav-close], a[data-mobile-nav-link]'
      );
      first?.focus();
    });

    setMobileOpen(true);
  }, []);

  // ── Keyboard trap + Escape ─────────────────────────────────────────────────
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileOpen) {
        e.preventDefault();
        closeMobileNav();
        return;
      }
      if (!mobileOpen || e.key !== 'Tab') return;
      const panel = shellRef.current?.querySelector<HTMLElement>('[data-mobile-nav-panel]');
      if (!panel) return;
      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled'));
      if (!focusable.length) { e.preventDefault(); panel.focus(); return; }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (!active || !panel.contains(active)) { e.preventDefault(); first.focus(); return; }
      if (e.shiftKey && active === first) { e.preventDefault(); last.focus(); return; }
      if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeydown);
    return () => document.removeEventListener('keydown', onKeydown);
  }, [mobileOpen, closeMobileNav]);

  // Responsive close
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 700px)');
    const onChange = (e: MediaQueryListEvent) => {
      if (!e.matches) closeMobileNav({ immediate: true, restoreFocus: false });
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [closeMobileNav]);

  const handleToggle = () => {
    if (mobileOpen) closeMobileNav();
    else openMobileNav();
  };

  const handleMobileNavLinkClick = () => {
    closeMobileNav({ restoreFocus: false });
  };

  return (
    <>
      <header className="top-nav-wrap" ref={headerRef}>
        <div className="top-nav container">
          <a className="brand" href="/" aria-label="Sonicverse home">
            <img className="brand-mark" src="/assets/brand/2.svg" alt="Sonicverse logo" />
            <span className="brand-copy">
              <strong>Sonicverse</strong>
            </span>
          </a>

          <button
            className="nav-toggle"
            type="button"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-shell"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            ref={toggleRef}
            onClick={handleToggle}
          >
            <span className="nav-toggle-box" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span className="nav-toggle-label">Menu</span>
          </button>

          <nav className="desktop-nav" aria-label="Primary">
            <span className="nav-indicator" aria-hidden="true" ref={indicatorRef} />
            <ul className="nav-list nav-list--desktop" ref={navListRef}>
              <li className="nav-has-dropdown">
                <a
                  className={`nav-link--desktop has-dropdown${isActivePath('/projects', pathname) ? ' active' : ''}`}
                  href="/projects"
                  data-nav-link
                  data-desktop-nav-link
                  aria-current={isActivePath('/projects', pathname) ? 'page' : undefined}
                >
                  Products
                </a>
                {projects.length > 0 && (
                  <div className="nav-dropdown" role="menu">
                    <div className="nav-dropdown-header">
                      <span className="nav-dropdown-header-label">Our open source projects</span>
                    </div>
                    <div className="nav-dropdown-body">
                      {projects.map((project) => (
                        <a
                          key={project.id}
                          className="nav-dropdown-item"
                          href={`/projects/${project.id}/`}
                          role="menuitem"
                        >
                          <span className="nav-dropdown-icon" aria-hidden="true">
                            <ProjectIcon slug={project.id} size={16} />
                          </span>
                          <span className="nav-dropdown-text">
                            <span className="nav-dropdown-title">{project.data.title}</span>
                            <span className="nav-dropdown-desc">
                              {project.data.summary.slice(0, 60)}
                              {project.data.summary.length > 60 ? '…' : ''}
                            </span>
                          </span>
                          <span className={`badge badge-${project.data.status}`}>
                            {project.data.status}
                          </span>
                        </a>
                      ))}
                    </div>
                    <div className="nav-dropdown-footer">
                      <span className="nav-dropdown-footer-label">
                        {projects.length} open source project{projects.length !== 1 ? 's' : ''}
                      </span>
                      <a href="/projects">View all →</a>
                    </div>
                  </div>
                )}
              </li>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className={`nav-link--desktop${isActivePath(link.href, pathname) ? ' active' : ''}`}
                    href={link.href}
                    data-nav-link
                    data-desktop-nav-link
                    aria-current={isActivePath(link.href, pathname) ? 'page' : undefined}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <a
              className="button button-primary docs-nav-button docs-nav-button--desktop"
              href={docsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Sonicverse documentation in a new tab"
            >
              Docs
            </a>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      <div
        id="mobile-nav-shell"
        className="mobile-nav-shell"
        ref={shellRef}
        aria-hidden={!mobileOpen}
        hidden
      >
        <button
          className="mobile-nav-backdrop"
          type="button"
          aria-label="Close navigation menu"
          onClick={() => closeMobileNav()}
          tabIndex={-1}
        />
        <div
          className="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-nav-title"
          tabIndex={-1}
          data-mobile-nav-panel
        >
          <div className="mobile-nav-head">
            <p id="mobile-nav-title">Menu</p>
            <button
              className="mobile-nav-close"
              type="button"
              aria-label="Close navigation menu"
              onClick={() => closeMobileNav()}
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <nav aria-label="Mobile">
            {projects.length > 0 && (
              <div className="mobile-nav-section">
                <p className="mobile-nav-section-label">Products</p>
                <ul className="mobile-nav-list mobile-nav-list--products">
                  {projects.map((project, i) => (
                    <li key={project.id} style={{ transitionDelay: `${60 + i * 40}ms` }}>
                      <a
                        className={`mobile-nav-product-item${isActivePath(`/projects/${project.id}/`, pathname) ? ' active' : ''}`}
                        href={`/projects/${project.id}/`}
                        data-nav-link
                        data-mobile-nav-link
                        aria-current={
                          isActivePath(`/projects/${project.id}/`, pathname) ? 'page' : undefined
                        }
                        onClick={handleMobileNavLinkClick}
                      >
                        <span className="mobile-nav-product-icon">
                          <ProjectIcon slug={project.id} size={15} />
                        </span>
                        <span className="mobile-nav-product-info">
                          <span className="mobile-nav-product-name">{project.data.title}</span>
                          <span className={`badge badge-${project.data.status}`}>
                            {project.data.status}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                  <li style={{ transitionDelay: `${60 + projects.length * 40}ms` }}>
                    <a
                      className={isActivePath('/projects', pathname) ? 'active' : ''}
                      href="/projects"
                      data-nav-link
                      data-mobile-nav-link
                      style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}
                      onClick={handleMobileNavLinkClick}
                    >
                      View all products →
                    </a>
                  </li>
                </ul>
              </div>
            )}
            <div className="mobile-nav-section">
              <p className="mobile-nav-section-label">Navigate</p>
              <ul className="mobile-nav-list">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      className={isActivePath(link.href, pathname) ? 'active' : ''}
                      href={link.href}
                      data-nav-link
                      data-mobile-nav-link
                      aria-current={isActivePath(link.href, pathname) ? 'page' : undefined}
                      onClick={handleMobileNavLinkClick}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <a
              className="button button-primary docs-nav-button docs-nav-button--mobile"
              href={docsHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Sonicverse documentation in a new tab"
              onClick={() => closeMobileNav({ restoreFocus: false })}
            >
              Docs
            </a>
          </nav>
        </div>
      </div>
    </>
  );
}
