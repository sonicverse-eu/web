import Link from 'next/link';
import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice, SliceContext } from '@/lib/site-data/types';

type HeroItem = {
  label: string;
  title: string;
  detail: string;
  meta: string;
  href: string;
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
    href: linkValue(item.href),
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

function GenericPageVisual({
  items,
  visualEyebrow,
  visualTitle,
  visualBody,
}: {
  items: HeroItem[];
  visualEyebrow: string;
  visualTitle: string;
  visualBody: string;
}) {
  return (
    <div className="hero-visual hero-visual--ecosystem" aria-hidden="true">
      <div className="hero-panel hero-panel--ecosystem">
        <div className="hero-panel-header hero-panel-header--centered">
          <span className="hero-kicker">{visualEyebrow || 'Project ecosystem'}</span>
          <strong>{visualTitle || 'Choose the right layer to start with'}</strong>
          <p>
            {visualBody ||
              'Each Sonicverse project solves a separate workflow, but they connect into one operational system.'}
          </p>
        </div>

        <div className="hero-ecosystem-grid">
          {items.map((item, index) => (
            <article key={`${item.label}-${item.title}-${index}`} className="hero-ecosystem-card">
              <span>{item.label || `Project ${index + 1}`}</span>
              {item.title ? <strong>{item.title}</strong> : null}
              {item.detail ? <p>{item.detail}</p> : null}
              {item.meta ? <em>{item.meta}</em> : null}
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero({
  slice,
  context,
}: SliceRendererProps<CmsSlice, SliceContext>) {
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
  const currentProduct = context?.currentProduct ?? null;

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

  if (slice.variation === 'projects_overview') {
    return (
      <section
        className={`slice slice-hero slice-hero--${slice.variation} slice-hero--tone-${tone}`}
        data-reveal-group
      >
        <div className="projects-overview-hero-full">
          <div className="container projects-overview-hero-shell">
            <div className="hero-copy hero-copy--projects-overview">
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

            <div className="projects-overview-rail" aria-label="Project quick map">
              <div className="projects-overview-rail-head" data-reveal>
                <span className="hero-kicker">{visualEyebrow || 'Project quick map'}</span>
                <strong>{visualTitle || 'Compare the lineup at dossier speed.'}</strong>
                <p>
                  {visualBody ||
                    'Scan the project roster, then open the one that matches the operational bottleneck you need to resolve first.'}
                </p>
              </div>
              <div className="projects-overview-rail-list" data-reveal-group>
                {items.map((item, index) => {
                  const rowContent = (
                    <>
                      <div className="projects-overview-rail-index">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="projects-overview-rail-copy">
                        <span>{item.label || `Project ${index + 1}`}</span>
                        {item.title ? <strong>{item.title}</strong> : null}
                        {item.detail ? <p>{item.detail}</p> : null}
                      </div>
                      {item.meta ? <em>{item.meta}</em> : null}
                    </>
                  );

                  return item.href ? (
                    <Link
                      key={`${item.label}-${item.title}-${index}`}
                      href={item.href}
                      className="projects-overview-rail-row"
                    >
                      {rowContent}
                    </Link>
                  ) : (
                    <article
                      key={`${item.label}-${item.title}-${index}`}
                      className="projects-overview-rail-row"
                    >
                      {rowContent}
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === 'contact') {
    return (
      <section
        className={`slice slice-hero slice-hero--${slice.variation} slice-hero--tone-${tone}`}
        data-reveal-group
      >
        <div className="hero-contact-full">
          <div className="hero-contact-atmosphere" aria-hidden="true">
            <span className="hero-contact-glow hero-contact-glow--one" />
            <span className="hero-contact-glow hero-contact-glow--two" />
            <span className="hero-contact-grid" />
          </div>

          <div className="container hero-contact-shell">
            <div className="hero-contact-copy" data-reveal-group>
              {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
              {title ? <h1>{title}</h1> : null}
              {body ? <p className="hero-body">{body}</p> : null}
              <HeroActions
                primaryHref={primaryHref}
                primaryLabel={primaryLabel}
                secondaryHref={secondaryHref}
                secondaryLabel={secondaryLabel}
              />

              {supportingLabel || supportingText ? (
                <div className="hero-contact-proof">
                  {supportingLabel ? <span>{supportingLabel}</span> : null}
                  {supportingText ? <p>{supportingText}</p> : null}
                </div>
              ) : null}
            </div>

            <aside className="hero-contact-aside" data-reveal>
              <div className="hero-contact-panel">
                {visualEyebrow ? <p className="hero-kicker">{visualEyebrow}</p> : null}
                {visualTitle ? <strong>{visualTitle}</strong> : null}
                {visualBody ? <p>{visualBody}</p> : null}

                <div className="hero-contact-strip">
                  {items.map((item, index) => (
                    <article key={`${item.label}-${item.title}-${index}`} className="hero-contact-strip-item">
                      {item.label ? <span>{item.label}</span> : null}
                      {item.title ? <strong>{item.title}</strong> : null}
                      {item.detail ? <p>{item.detail}</p> : null}
                      {item.meta ? <small>{item.meta}</small> : null}
                    </article>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === 'project_detail' && currentProduct) {
    const accent = currentProduct.data.accent || tone;
    const projectSpecs = [
      { label: 'Category', value: currentProduct.data.category },
      { label: 'Best for', value: currentProduct.data.audience },
      { label: 'Main outcome', value: currentProduct.data.outcome },
      { label: 'Adoption model', value: currentProduct.data.pricingHint },
    ];

    return (
      <section
        className={`slice slice-hero slice-hero--${slice.variation} slice-hero--tone-${accent}`}
        data-reveal-group
      >
        <div className="container project-detail-hero-shell">
          <div className="hero-copy hero-copy--project-detail">
            <p className="eyebrow">{eyebrow || currentProduct.data.category}</p>
            <h1>{currentProduct.data.name}</h1>
            {(title || currentProduct.data.tagline) && (
              <p className="project-detail-tagline">{title || currentProduct.data.tagline}</p>
            )}
            {(body || currentProduct.data.summary) && (
              <p className="hero-body">{body || currentProduct.data.summary}</p>
            )}
            <HeroActions
              primaryHref={primaryHref}
              primaryLabel={primaryLabel}
              secondaryHref={secondaryHref}
              secondaryLabel={secondaryLabel}
            />
            <HeroProof supportingLabel={supportingLabel} supportingText={supportingText} />
          </div>

          <aside className={`project-detail-rail project-detail-rail--${accent}`}>
            <div className="project-detail-rail-head">
              <span className="hero-kicker">{visualEyebrow || 'Project dossier'}</span>
              <strong>{visualTitle || 'Read the operating shape before the sales pitch.'}</strong>
              <p>
                {visualBody ||
                  'Each project page should feel like a technical briefing: clear scope, clear fit, clear next move.'}
              </p>
            </div>

            <dl className="project-detail-spec-list">
              {projectSpecs.map((spec) => (
                <div key={spec.label}>
                  <dt>{spec.label}</dt>
                  <dd>{spec.value}</dd>
                </div>
              ))}
            </dl>

            <div className="project-detail-stat-grid">
              {currentProduct.data.heroStats.map((stat) => (
                <article key={stat.label} className="project-detail-stat-card">
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </article>
              ))}
            </div>

            {items.length ? (
              <div className="project-detail-signal-list">
                {items.map((item, index) => (
                  <article
                    key={`${item.label}-${item.title}-${index}`}
                    className="project-detail-signal-row"
                  >
                    <span>{item.label || `Signal ${index + 1}`}</span>
                    {item.title ? <strong>{item.title}</strong> : null}
                    {item.detail ? <p>{item.detail}</p> : null}
                    {item.meta ? <em>{item.meta}</em> : null}
                  </article>
                ))}
              </div>
            ) : null}
          </aside>
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

        <GenericPageVisual
          items={items}
          visualEyebrow={visualEyebrow}
          visualTitle={visualTitle}
          visualBody={visualBody}
        />
      </div>
    </section>
  );
}
