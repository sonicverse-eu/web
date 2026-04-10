'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import type { ProductDocument, SettingsDocument } from '@/lib/prismic/types';
import ThemeToggle from './ThemeToggle';

interface SiteHeaderProps {
  products: ProductDocument[];
  settings: SettingsDocument;
}

export default function SiteHeader({ products, settings }: SiteHeaderProps) {
  const pathname = usePathname() ?? '/';
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);

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

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  return (
    <header className="site-header">
      <div className="container">
        <div className="announcement-bar">
          <span>{settings.data.announcement}</span>
          <Link href="/demo">Plan a walkthrough</Link>
        </div>
        <div className="site-header-shell">
          <Link href="/" className="brand-lockup brand-lockup-link" aria-label="Sonicverse home">
            <img className="brand-mark" src="/assets/brand/2.svg" alt="" />
            <div>
              <strong>Sonicverse</strong>
              <span>Audio operations platform</span>
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
              >
                Products
              </button>
              <div className={`products-menu ${productsOpen ? 'is-open' : ''}`}>
                <div className="products-menu-intro">
                  <span className="eyebrow">Product suite</span>
                  <p>Choose the workflow layer that best matches your current operational bottleneck.</p>
                </div>
                <div className="products-menu-grid">
                  {products.map((product) => (
                    <Link key={product.uid} href={product.url} className={`products-menu-card products-menu-card--${product.data.accent}`}>
                      <strong>{product.data.name}</strong>
                      <span>{product.data.category}</span>
                      <p>{product.data.summary}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            {settings.data.primaryNav
              .filter((item) => item.label !== 'Products')
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link ${pathname === item.href ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="header-actions">
            <Link className="btn btn-secondary header-demo-link" href="/demo">
              Book a demo
            </Link>
            <ThemeToggle />
            <button
              className="mobile-nav-toggle"
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-panel"
            >
              <span />
              <span />
            </button>
          </div>
        </div>

        <div id="mobile-nav-panel" className={`mobile-nav ${mobileOpen ? 'is-open' : ''}`}>
          <div className="mobile-nav-group">
            <span className="mobile-nav-label">Products</span>
            {products.map((product) => (
              <Link key={product.uid} href={product.url} className="mobile-nav-product">
                <strong>{product.data.name}</strong>
                <span>{product.data.category}</span>
              </Link>
            ))}
          </div>
          <div className="mobile-nav-group">
            {settings.data.primaryNav
              .filter((item) => item.label !== 'Products')
              .map((item) => (
                <Link key={item.href} href={item.href} className="mobile-nav-link">
                  {item.label}
                </Link>
              ))}
          </div>
          <Link className="btn btn-primary mobile-nav-cta" href="/demo">
            Book a demo
          </Link>
        </div>
      </div>
    </header>
  );
}
