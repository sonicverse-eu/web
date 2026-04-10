import Link from 'next/link';
import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice } from '@/lib/site-data/types';

type HeroItem = {
  label: string;
  title: string;
  detail: string;
  meta: string;
};

function textValue(value: unknown, fallback = '') {
  return typeof value === 'string' ? value : fallback;
}

function linkValue(value: unknown) {
  const href = textValue(value).trim();
  return href.length ? href : '';
}

function mapItems(items: Record<string, unknown>[]): HeroItem[] {
  return items.map((item) => ({
    label: textValue(item.label),
    title: textValue(item.title),
    detail: textValue(item.detail),
    meta: textValue(item.meta),
  }));
}

function HeroActions({
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
}) {
  return (
    <div className="button-row hero-actions">
      {primaryHref && primaryLabel ? (
        <Link className="btn btn-primary" href={primaryHref}>
          {primaryLabel}
        </Link>
      ) : null}
      {secondaryHref && secondaryLabel ? (
        <Link className="btn btn-secondary" href={secondaryHref}>
          {secondaryLabel}
        </Link>
      ) : null}
    </div>
  );
}

function HeroProof({
  supportingLabel,
  supportingText,
}: {
  supportingLabel: string;
  supportingText: string;
}) {
  if (!supportingLabel && !supportingText) {
    return null;
  }

  return (
    <div className="hero-proof">
      {supportingLabel ? <span>{supportingLabel}</span> : null}
      {supportingText ? <p>{supportingText}</p> : null}
    </div>
  );
}

export default function Hero({
  slice,
}: SliceRendererProps<CmsSlice>) {
  const eyebrow = textValue(slice.primary.eyebrow);
  const title = textValue(slice.primary.title);
  const body = textValue(slice.primary.body);
  const primaryLabel = textValue(slice.primary.primaryLabel);
  const primaryHref = linkValue(slice.primary.primaryHref);
  const secondaryLabel = textValue(slice.primary.secondaryLabel);
  const secondaryHref = linkValue(slice.primary.secondaryHref);
  const supportingLabel = textValue(slice.primary.supportingLabel);
  const supportingText = textValue(slice.primary.supportingText);
  const visualEyebrow = textValue(slice.primary.visualEyebrow);
  const visualTitle = textValue(slice.primary.visualTitle);
  const visualBody = textValue(slice.primary.visualBody);
  const tone = textValue(slice.primary.tone, 'brand');
  const items = mapItems(slice.items);

  if (slice.variation === 'home') {
    return (
      <section
        className={`slice slice-hero slice-hero--${slice.variation} slice-hero--tone-${tone}`}
        data-reveal-group
      >
        <div className="hero-home-full">
          <div className="hero-home-beams" aria-hidden="true">
            <span className="hero-home-grid" />
            <span className="hero-home-beam hero-home-beam--1" />
            <span className="hero-home-beam hero-home-beam--2" />
            <span className="hero-home-beam hero-home-beam--3" />
            <span className="hero-home-beam hero-home-beam--4" />
            <span className="hero-home-beam hero-home-beam--5" />
            <span className="hero-home-beam hero-home-beam--6" />
          </div>
          <div className="container">
            <div className="hero-copy hero-copy--home" data-reveal-group>
              {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
              {title ? <h1>{title}</h1> : null}
              {body ? <p className="hero-body">{body}</p> : null}
              <HeroActions
                primaryHref={primaryHref}
                primaryLabel={primaryLabel}
                secondaryHref={secondaryHref}
                secondaryLabel={secondaryLabel}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`slice slice-hero slice-hero--${slice.variation} slice-hero--tone-${tone}`}
      data-reveal-group
    >
      <div className="container hero-layout">
        <div className="hero-copy">
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          {title ? <h1>{title}</h1> : null}
          {body ? <p className="hero-body">{body}</p> : null}
          <HeroActions
            primaryHref={primaryHref}
            primaryLabel={primaryLabel}
            secondaryHref={secondaryHref}
            secondaryLabel={secondaryLabel}
          />
          <HeroProof supportingLabel={supportingLabel} supportingText={supportingText} />
        </div>

        {slice.variation === 'page' ? (
          <div className="hero-visual hero-visual--ecosystem" aria-hidden="true">
            <div className="hero-panel hero-panel--ecosystem">
              <div className="hero-panel-header hero-panel-header--centered">
                <span className="hero-kicker">{visualEyebrow || 'Product ecosystem'}</span>
                <strong>{visualTitle || 'Choose the right layer to start with'}</strong>
                <p>
                  {visualBody ||
                    'Each product solves a separate workflow, but they connect into one operational system.'}
                </p>
              </div>

              <div className="hero-ecosystem-grid">
                {items.map((item, index) => (
                  <article key={`${item.label}-${item.title}-${index}`} className="hero-ecosystem-card">
                    <span>{item.label || `Product ${index + 1}`}</span>
                    {item.title ? <strong>{item.title}</strong> : null}
                    {item.detail ? <p>{item.detail}</p> : null}
                    {item.meta ? <em>{item.meta}</em> : null}
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {slice.variation === 'streaming' ? (
          <div className="hero-visual hero-visual--streaming" aria-hidden="true">
            <div className="hero-panel hero-panel--streaming">
              <div className="hero-panel-header">
                <span className="hero-kicker">{visualEyebrow || 'Live delivery'}</span>
                <strong>{visualTitle || 'Operate resilient streams without babysitting the stack'}</strong>
                <p>{visualBody || 'Keep ingest, failover, and delivery visible in one operational view.'}</p>
              </div>

              <div className="hero-stream-status">
                <div>
                  <span>Input status</span>
                  <strong>Primary feed healthy</strong>
                </div>
                <div>
                  <span>Fallback policy</span>
                  <strong>Ready in 2s</strong>
                </div>
                <div>
                  <span>Output modes</span>
                  <strong>Icecast + HLS</strong>
                </div>
              </div>

              <div className="hero-stream-grid">
                {items.map((item) => (
                  <article key={`${item.label}-${item.title}`} className="hero-stream-card">
                    {item.label ? <span>{item.label}</span> : null}
                    {item.title ? <strong>{item.title}</strong> : null}
                    {item.detail ? <p>{item.detail}</p> : null}
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {slice.variation === 'metadata' ? (
          <div className="hero-visual hero-visual--metadata" aria-hidden="true">
            <div className="hero-panel hero-panel--metadata">
              <div className="hero-terminal-bar">
                <span />
                <span />
                <span />
              </div>

              <div className="hero-panel-header">
                <span className="hero-kicker">{visualEyebrow || 'Metadata layer'}</span>
                <strong>{visualTitle || 'Normalize media metadata before it becomes release debt'}</strong>
                <p>{visualBody || 'Abstract format complexity behind one shared API contract.'}</p>
              </div>

              <div className="hero-schema-list">
                {items.map((item, index) => (
                  <article key={`${item.label}-${item.title}-${index}`} className="hero-schema-row">
                    <span>{item.label || `Format ${index + 1}`}</span>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                    {item.meta ? <em>{item.meta}</em> : null}
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {slice.variation === 'operations' ? (
          <div className="hero-visual hero-visual--operations" aria-hidden="true">
            <div className="hero-panel hero-panel--operations">
              <div className="hero-panel-header">
                <span className="hero-kicker">{visualEyebrow || 'Control surface'}</span>
                <strong>{visualTitle || 'Plan schedules, overrides, and fallback logic in one place'}</strong>
                <p>{visualBody || 'Give planners and operators a clearer operational handoff.'}</p>
              </div>

              <div className="hero-schedule">
                {items.map((item, index) => (
                  <article key={`${item.label}-${item.title}-${index}`} className="hero-schedule-row">
                    <span>{item.label || `Block ${index + 1}`}</span>
                    <strong>{item.title}</strong>
                    <p>{item.detail}</p>
                    {item.meta ? <em>{item.meta}</em> : null}
                  </article>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
