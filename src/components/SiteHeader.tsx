'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ProductDocument, SettingsDocument } from '@/lib/site-data/types';
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

export default function SiteHeader({ products, settings }: SiteHeaderProps) {
  const pathname = usePathname() ?? '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

  const loginLabel = settings.data.headerLoginLabel?.trim() || 'Login';
  const loginHref = settings.data.headerLoginHref?.trim() || 'https://app.sonicverse.eu/login';
  const ctaLabel = settings.data.headerCtaLabel?.trim() || 'Book demo';
  const ctaHref = settings.data.headerCtaHref?.trim() || '/demo';
  const menuEyebrow = settings.data.productsMenuEyebrow?.trim() || 'Product suite';
  const menuTitle =
    settings.data.productsMenuTitle?.trim() ||
    'Choose the workflow layer that fits your team right now.';
  const menuDescription =
    settings.data.productsMenuDescription?.trim() ||
    'Each Sonicverse product solves a clear operational job and can be adopted on its own or as part of a broader platform rollout.';

  const primaryNav = settings.data.primaryNav.filter(
    (item) => item.label.toLowerCase() !== 'products' && item.href !== '/products'
  );

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
    setProductsOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onPointerDown(event: MouseEvent) {
      if (!productsRef.current?.contains(event.target as Node)) {
        setProductsOpen(false);
      }
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setProductsOpen(false);
        setMobileOpen(false);
      }
    }

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('mousedown', onPointerDown);
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

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="container">
        <div className="announcement-bar">
          <span>{settings.data.announcement}</span>
          <Link href={ctaHref}>Plan a walkthrough</Link>
        </div>

        <div className="site-header-shell">
          <Link href="/" className="brand-lockup brand-lockup-link" aria-label="Sonicverse home">
            <img className="brand-mark" src="/assets/brand/2.svg" alt="" />
            <div>
              <strong>Sonicverse</strong>
              <span>Multi-product audio operations platform</span>
            </div>
          </Link>

          <nav className="desktop-nav" aria-label="Primary">
            <div
              className="nav-products"
              ref={productsRef}
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                className={`nav-link nav-link-button ${pathname.startsWith('/products') ? 'active' : ''}`}
                type="button"
                onClick={() => setProductsOpen((open) => !open)}
                aria-expanded={productsOpen}
                aria-haspopup="dialog"
                aria-controls="products-menu"
              >
                <span>Products</span>
                <svg
                  className={`nav-link-chevron ${productsOpen ? 'is-open' : ''}`}
                  viewBox="0 0 20 20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <div id="products-menu" className={`products-menu ${productsOpen ? 'is-open' : ''}`}>
                <div className="products-menu-panel" role="dialog" aria-label="Products overview">
                  <div className="products-menu-intro">
                    <span className="eyebrow">{menuEyebrow}</span>
                    <h3>{menuTitle}</h3>
                    <p>{menuDescription}</p>
                    <div className="products-menu-actions">
                      <Link href="/products" className="products-menu-overview">
                        Compare all products
                      </Link>
                      <span>Scannable by use case, buyer, and operational outcome.</span>
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
            </div>

            {primaryNav.map((item) => (
              <Link
                key={`${item.label}-${item.href}`}
                href={item.href}
                className={`nav-link ${isActivePath(pathname, item.href) ? 'active' : ''}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link className="header-login" href={loginHref}>
              {loginLabel}
            </Link>
            <Link className="btn btn-primary header-primary-cta" href={ctaHref}>
              {ctaLabel}
            </Link>
            <ThemeToggle />
            <button
              className="mobile-nav-toggle"
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
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
              <Link className="btn btn-primary mobile-nav-cta" href={ctaHref}>
                {ctaLabel}
              </Link>
            </div>

            <div className="mobile-nav-group">
              <span className="mobile-nav-label">Products</span>
              {products.map((product) => (
                <Link key={product.uid} href={product.url} className="mobile-nav-product">
                  <div className="mobile-nav-product-row">
                    <span className={`products-menu-icon products-menu-icon--${product.data.accent}`} aria-hidden="true">
                      {getProductInitials(product.data.name)}
                    </span>
                    <div>
                      <strong>{product.data.name}</strong>
                      <span>{product.data.category}</span>
                    </div>
                  </div>
                  <p>{product.data.summary}</p>
                </Link>
              ))}
              <Link className="mobile-nav-all-products" href="/products">
                Compare all products
              </Link>
            </div>

            <div className="mobile-nav-group">
              <span className="mobile-nav-label">Explore</span>
              {primaryNav.map((item) => (
                <Link key={`${item.label}-${item.href}`} href={item.href} className="mobile-nav-link">
                  <strong>{item.label}</strong>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
