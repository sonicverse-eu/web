import Link from 'next/link';
import type { SliceComponentProps } from '@prismicio/react';
import type { CmsSlice } from '@/lib/prismic/types';

export default function Hero({ slice }: SliceComponentProps<CmsSlice>) {
  const primaryHref = String(slice.primary.primaryHref ?? '#');
  const secondaryHref = String(slice.primary.secondaryHref ?? '#');

  return (
    <section className={`slice slice-hero slice-hero--${slice.variation}`} data-reveal-group>
      <div className="container hero-shell">
        <div className="hero-copy">
          <p className="eyebrow">{String(slice.primary.eyebrow ?? '')}</p>
          <h1>{String(slice.primary.title ?? '')}</h1>
          <p className="hero-body">{String(slice.primary.body ?? '')}</p>
          <div className="button-row">
            <Link className="btn btn-primary" href={primaryHref}>
              {String(slice.primary.primaryLabel ?? 'Learn more')}
            </Link>
            <Link className="btn btn-secondary" href={secondaryHref}>
              {String(slice.primary.secondaryLabel ?? 'Contact')}
            </Link>
          </div>
          {slice.primary.supportingLabel ? (
            <div className="hero-supporting">
              <span>{String(slice.primary.supportingLabel)}</span>
              <p>{String(slice.primary.supportingText ?? '')}</p>
            </div>
          ) : null}
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-frame hero-frame-main">
            <div className="hero-frame-top">
              <span className="hero-chip">Platform</span>
              <span className="hero-kpi">Multi-product audio operations</span>
            </div>
            <div className="hero-visual-grid">
              <div className="hero-visual-card">
                <strong>Streaming</strong>
                <span>Resilient live delivery</span>
              </div>
              <div className="hero-visual-card">
                <strong>Metadata</strong>
                <span>Normalized media workflows</span>
              </div>
              <div className="hero-visual-card hero-visual-card-wide">
                <strong>Scheduling</strong>
                <span>Operational planning and fallback control</span>
              </div>
            </div>
          </div>
          <div className="hero-orbit hero-orbit-a" />
          <div className="hero-orbit hero-orbit-b" />
        </div>
      </div>
    </section>
  );
}
