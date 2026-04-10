'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { PrimaryNavItem, ProductDocument, SettingsDocument } from '@/lib/site-data/types';
import ThemeToggle from './ThemeToggle';

interface SiteHeaderProps {
  products: ProductDocument[];
  settings: SettingsDocument;
}

function isActivePath(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

function getProductInitials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join('')
    .toUpperCase();
}

function getNavKey(item: PrimaryNavItem) {
  return `${item.label}:${item.href}`.toLowerCase();
}

function getMenuId(item: PrimaryNavItem) {
  return `nav-menu-${getNavKey(item).replace(/[^a-z0-9]+/g, '-')}`;
}

function isNavItemActive(pathname: string, item: PrimaryNavItem) {
  if (isActivePath(pathname, item.href)) {
    return true;
  }

  return item.children?.some((child) => isActivePath(pathname, child.href)) ?? false;
}

export default function SiteHeader({ products, settings }: SiteHeaderProps) {
  const pathname = usePathname() ?? '/';
  const [openMenuKey, setOpenMenuKey] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpandedKey, setMobileExpandedKey] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const desktopNavRef = useRef<HTMLElement>(null);

  const loginLabel = settings.data.headerLoginLabel?.trim() || 'Docs';
  const loginHref = settings.data.headerLoginHref?.trim() || 'https://docs.sonicverse.eu';
  const ctaLabel = settings.data.headerCtaLabel?.trim() || '';
  const ctaHref = settings.data.headerCtaHref?.trim() || '';
  const menuEyebrow = settings.data.productsMenuEyebrow?.trim() || '';
  const menuTitle = settings.data.productsMenuTitle?.trim() || '';
  const menuDescription = settings.data.productsMenuDescription?.trim() || '';
  const primaryNav = settings.data.primaryNav;

  const groupedProducts = useMemo(() => {
    const groups = new Map<string, ProductDocument[]>();

    products.forEach((product) => {
      const key = product.data.category || 'Products';
      const existing = groups.get(key) ?? [];
      existing.push(product);
      groups.set(key, existing);
    });

    return [...groups.entries()].map(([category, groupProducts]) => ({
      category,
      products: groupProducts.sort((left, right) => left.data.name.localeCompare(right.data.name)),
    }));
  }, [products]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenuKey(null);
    setMobileExpandedKey(null);
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(event: PointerEvent) {
      if (!desktopNavRef.current?.contains(event.target as Node)) {
        setOpenMenuKey(null);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpenMenuKey(null);
        setMobileOpen(false);
        setMobileExpandedKey(null);
      }
    }

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, []);

  useEffect(() => {
    function onScroll() {
      setIsScrolled(window.scrollY > 16);
    }

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleMobileToggle = () => {
    setMobileOpen((open) => {
      const next = !open;
      if (!next) {
        setMobileExpandedKey(null);
      }
      return next;
    });
  };

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container">
        <div className="site-header-shell">
          <Link href="/" className="brand-lockup brand-lockup-link" aria-label="Sonicverse home">
            <img className="brand-mark" src="/assets/brand/2.svg" alt="" />
            <div>
              <strong>Sonicverse</strong>
              <span>Audio operations platform</span>
            </div>
          </Link>

          <nav className="desktop-nav" aria-label="Primary" ref={desktopNavRef}>
            {primaryNav.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              const menuKey = getNavKey(item);
              const menuId = getMenuId(item);
              const isOpen = openMenuKey === menuKey;
              const isProjectsMenu = item.href === '/projects' || item.label.toLowerCase() === 'projects';

              if (!hasChildren) {
                return (
                  <Link
                    key={`${item.label}-${item.href}`}
                    href={item.href}
                    className={`nav-link ${isNavItemActive(pathname, item) ? 'active' : ''}`}
                  >
                    {item.label}
                  </Link>
                );
              }

              return (
                <div
                  key={`${item.label}-${item.href}`}
                  className="desktop-nav-item desktop-nav-item--children"
                  onMouseEnter={() => setOpenMenuKey(menuKey)}
                  onMouseLeave={() => setOpenMenuKey((current) => (current === menuKey ? null : current))}
                >
                  <button
                    className={`nav-link nav-link-button ${isNavItemActive(pathname, item) ? 'active' : ''}`}
                    type="button"
                    onFocus={() => setOpenMenuKey(menuKey)}
                    onClick={() => setOpenMenuKey((current) => (current === menuKey ? null : menuKey))}
                    aria-expanded={isOpen}
                    aria-haspopup="dialog"
                    aria-controls={menuId}
                  >
                    <span>{item.label}</span>
                    <svg
                      className={`nav-link-chevron ${isOpen ? 'is-open' : ''}`}
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      aria-hidden="true"
                    >
                      <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {isProjectsMenu ? (
                    <div id={menuId} className={`nav-dropdown nav-dropdown--products ${isOpen ? 'is-open' : ''}`}>
                      <div className="products-menu-panel" role="dialog" aria-label="Projects overview">
                        <div className="products-menu-intro">
                          <span className="eyebrow">{menuEyebrow}</span>
                          <h3>{menuTitle}</h3>
                          <p>{menuDescription}</p>
                          <div className="products-menu-actions">
                            <Link href="/projects" className="products-menu-overview">
                              Compare all projects
                            </Link>
                            <span>Scannable by workflow pressure, team fit, and operational outcome.</span>
                          </div>
                        </div>

                        <div className="products-menu-groups">
                          {groupedProducts.map((group) => (
                            <section key={group.category} className="products-menu-group" aria-label={group.category}>
                              <div className="products-menu-group-head">
                                <span className="products-menu-group-label">{group.category}</span>
                              </div>
                              <div className="products-menu-group-grid">
                                {group.products.map((product) => (
                                  <Link
                                    key={product.uid}
                                    href={product.url}
                                    className={`products-menu-card products-menu-card--${product.data.accent}`}
                                  >
                                    <span
                                      className={`products-menu-icon products-menu-icon--${product.data.accent}`}
                                      aria-hidden="true"
                                    >
                                      {getProductInitials(product.data.name)}
                                    </span>
                                    <div className="products-menu-card-copy">
                                      <div className="products-menu-card-top">
                                        <strong>{product.data.name}</strong>
                                        <span className="products-menu-card-arrow">View</span>
                                      </div>
                                      <p>{product.data.summary}</p>
                                      <small>{product.data.outcome}</small>
                                    </div>
                                  </Link>
                                ))}
                              </div>
                            </section>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div id={menuId} className={`nav-dropdown nav-dropdown--children ${isOpen ? 'is-open' : ''}`}>
                      <div className="child-menu-panel" role="dialog" aria-label={`${item.label} links`}>
                        <span className="child-menu-label">{item.label}</span>
                        <div className="child-menu-links">
                          {item.children?.map((child) => (
                            <Link
                              key={`${child.label}-${child.href}`}
                              href={child.href}
                              className={`child-menu-link ${isActivePath(pathname, child.href) ? 'active' : ''}`}
                            >
                              <span className="child-menu-link-top">
                                <strong>{child.label}</strong>
                                <span>Open</span>
                              </span>
                              {child.description ? <p>{child.description}</p> : null}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          <div className="header-actions">
            <Link className="header-login" href={loginHref}>
              {loginLabel}
            </Link>
            {ctaLabel && ctaHref ? (
              <Link className="btn btn-primary header-primary-cta" href={ctaHref}>
                {ctaLabel}
              </Link>
            ) : null}
            <ThemeToggle />
            <button
              className="mobile-nav-toggle"
              type="button"
              onClick={handleMobileToggle}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
              aria-label="Toggle navigation menu"
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <div id="mobile-nav-panel" className={`mobile-nav ${mobileOpen ? 'is-open' : ''}`}>
          <div className="mobile-nav-surface">
            <div className="mobile-nav-actions">
              <Link className="mobile-nav-login" href={loginHref}>
                {loginLabel}
              </Link>
              {ctaLabel && ctaHref ? (
                <Link className="btn btn-primary mobile-nav-cta" href={ctaHref}>
                  {ctaLabel}
                </Link>
              ) : null}
            </div>

            <div className="mobile-nav-list">
              {primaryNav.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const itemKey = getNavKey(item);
                const childrenId = `${getMenuId(item)}-mobile`;
                const isExpanded = mobileExpandedKey === itemKey;
                const isActive = isNavItemActive(pathname, item);

                if (!hasChildren) {
                  return (
                    <Link
                      key={`${item.label}-${item.href}`}
                      href={item.href}
                      className={`mobile-nav-parent mobile-nav-parent-link ${isActive ? 'active' : ''}`}
                    >
                      <strong>{item.label}</strong>
                    </Link>
                  );
                }

                return (
                  <section key={`${item.label}-${item.href}`} className="mobile-nav-item">
                    <button
                      type="button"
                      className={`mobile-nav-parent ${isActive ? 'active' : ''}`}
                      aria-expanded={isExpanded}
                      aria-controls={childrenId}
                      onClick={() => setMobileExpandedKey((current) => (current === itemKey ? null : itemKey))}
                    >
                      <strong>{item.label}</strong>
                      <svg
                        className={`mobile-nav-chevron ${isExpanded ? 'is-open' : ''}`}
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        aria-hidden="true"
                      >
                        <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>

                    <div id={childrenId} className={`mobile-nav-children ${isExpanded ? 'is-open' : ''}`}>
                      {item.children?.map((child) => (
                        <Link
                          key={`${child.label}-${child.href}`}
                          href={child.href}
                          className={`mobile-nav-child ${isActivePath(pathname, child.href) ? 'active' : ''}`}
                        >
                          <strong>{child.label}</strong>
                          {child.description ? <span>{child.description}</span> : null}
                        </Link>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
