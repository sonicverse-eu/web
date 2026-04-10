import Link from 'next/link';
import { formatBlogDate, getBlogTagSummaries, getReadingTimeMinutes, sortBlogPosts } from '@/lib/blog';
import { formatLibraryDate, getLibraryTagCount, sortLibraryEntries } from '@/lib/library';
import type { SliceRendererProps } from '@/slices/types';
import type { CmsSlice, SliceContext } from '@/lib/site-data/types';
import { linkValue, textValue } from '@/slices/utils';

type HeroItem = {
  label: string;
  title: string;
  detail: string;
  meta: string;
  href: string;
};

function mapItems(items: Record<string, unknown>[]): HeroItem[] {
  return items.map((item) => ({
    label: textValue(item.label),
    title: textValue(item.title),
    detail: textValue(item.detail),
    meta: textValue(item.meta),
    href: linkValue(item.href),
  }));
}

function hasPanelContent(items: HeroItem[], visualEyebrow: string, visualTitle: string, visualBody: string) {
  return Boolean(items.length || visualEyebrow || visualTitle || visualBody);
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

function StoryHero({
  variation,
  tone,
  eyebrow,
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  supportingLabel,
  supportingText,
  visualEyebrow,
  visualTitle,
  visualBody,
  commandLabel,
  commandValue,
  items,
  accentClassName,
}: {
  variation: string;
  tone: string;
  eyebrow: string;
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref: string;
  secondaryLabel: string;
  supportingLabel: string;
  supportingText: string;
  visualEyebrow: string;
  visualTitle: string;
  visualBody: string;
  commandLabel: string;
  commandValue: string;
  items: HeroItem[];
  accentClassName?: string;
}) {
  const hasPanel = hasPanelContent(items, visualEyebrow, visualTitle, visualBody);

  return (
    <section
      className={`slice slice-hero slice-hero--${variation} slice-hero--tone-${tone}`}
      data-reveal-group
    >
      <div className={`hero-story-full hero-story-full--${variation}`}>
        <div
          className={`container hero-story-shell hero-story-shell--${variation}${hasPanel ? '' : ' hero-story-shell--single'}`}
        >
          <div className={`hero-story-copy hero-story-copy--${variation}`}>
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

          {hasPanel ? (
            <aside className={`hero-story-aside hero-story-aside--${variation}`} data-reveal>
              <div className="hero-visual hero-visual--platform">
                <div className="hero-panel hero-panel--platform">
                  <div className="hero-panel-header--platform">
                    {visualEyebrow ? <span className="hero-kicker">{visualEyebrow}</span> : null}
                    {visualTitle ? <strong>{visualTitle}</strong> : null}
                    {visualBody ? <p>{visualBody}</p> : null}
                  </div>

                  {(commandLabel || commandValue) ? (
                    <div className="hero-command-line">
                      {commandLabel ? <span>{commandLabel}</span> : null}
                      {commandValue ? <strong>{commandValue}</strong> : null}
                    </div>
                  ) : null}

                  {items.length ? (
                    <div className="hero-platform-grid">
                      {items.map((item, index) => {
                        const card = (
                          <article
                            key={`${item.label}-${item.title}-${index}`}
                            className={`hero-signal-card ${accentClassName ?? ''}`.trim()}
                          >
                            <div className="hero-signal-card-top">
                              {item.label ? <span>{item.label}</span> : null}
                              {item.meta ? <em>{item.meta}</em> : null}
                            </div>
                            {item.title ? <strong>{item.title}</strong> : null}
                            {item.detail ? <p>{item.detail}</p> : null}
                          </article>
                        );

                        return item.href ? (
                          <Link key={`${item.label}-${item.title}-${index}`} href={item.href}>
                            {card}
                          </Link>
                        ) : (
                          card
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </div>
            </aside>
          ) : null}
        </div>
      </div>
    </section>
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
  if (!hasPanelContent(items, visualEyebrow, visualTitle, visualBody)) {
    return null;
  }

  return (
    <div className="hero-visual hero-visual--ecosystem" aria-hidden="true">
      <div className="hero-panel hero-panel--platform">
        <div className="hero-panel-header--platform">
          {visualEyebrow ? <span className="hero-kicker">{visualEyebrow}</span> : null}
          {visualTitle ? <strong>{visualTitle}</strong> : null}
          {visualBody ? <p>{visualBody}</p> : null}
        </div>

        {items.length ? (
          <div className="hero-platform-grid">
            {items.map((item, index) => (
              <article
                key={`${item.label}-${item.title}-${index}`}
                className="hero-signal-card"
              >
                <div className="hero-signal-card-top">
                  {item.label ? <span>{item.label}</span> : null}
                  {item.meta ? <em>{item.meta}</em> : null}
                </div>
                {item.title ? <strong>{item.title}</strong> : null}
                {item.detail ? <p>{item.detail}</p> : null}
              </article>
            ))}
          </div>
        ) : null}
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
                {visualEyebrow ? <span className="hero-kicker">{visualEyebrow}</span> : null}
                {visualTitle ? <strong>{visualTitle}</strong> : null}
                {visualBody ? <p>{visualBody}</p> : null}
              </div>
              <div className="projects-overview-rail-list" data-reveal-group>
                {items.map((item, index) => {
                  const rowContent = (
                    <>
                      <div className="projects-overview-rail-index">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="projects-overview-rail-copy">
                        {item.label ? <span>{item.label}</span> : null}
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

              {(supportingLabel || supportingText) ? (
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
                    <article
                      key={`${item.label}-${item.title}-${index}`}
                      className="hero-contact-strip-item"
                    >
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

  if (slice.variation === 'manifesto') {
    return (
      <StoryHero
        variation={slice.variation}
        tone={tone}
        eyebrow={eyebrow}
        title={title}
        body={body}
        primaryHref={primaryHref}
        primaryLabel={primaryLabel}
        secondaryHref={secondaryHref}
        secondaryLabel={secondaryLabel}
        supportingLabel={supportingLabel}
        supportingText={supportingText}
        visualEyebrow={visualEyebrow}
        visualTitle={visualTitle}
        visualBody={visualBody}
        commandLabel={textValue(slice.primary.commandLabel)}
        commandValue={textValue(slice.primary.commandValue)}
        items={items}
        accentClassName="hero-signal-card--emerald"
      />
    );
  }

  if (slice.variation === 'pricing_story') {
    return (
      <StoryHero
        variation={slice.variation}
        tone={tone}
        eyebrow={eyebrow}
        title={title}
        body={body}
        primaryHref={primaryHref}
        primaryLabel={primaryLabel}
        secondaryHref={secondaryHref}
        secondaryLabel={secondaryLabel}
        supportingLabel={supportingLabel}
        supportingText={supportingText}
        visualEyebrow={visualEyebrow}
        visualTitle={visualTitle}
        visualBody={visualBody}
        commandLabel={textValue(slice.primary.commandLabel)}
        commandValue={textValue(slice.primary.commandValue)}
        items={items}
        accentClassName="hero-signal-card--amber"
      />
    );
  }

  if (slice.variation === 'demo_path') {
    return (
      <StoryHero
        variation={slice.variation}
        tone={tone}
        eyebrow={eyebrow}
        title={title}
        body={body}
        primaryHref={primaryHref}
        primaryLabel={primaryLabel}
        secondaryHref={secondaryHref}
        secondaryLabel={secondaryLabel}
        supportingLabel={supportingLabel}
        supportingText={supportingText}
        visualEyebrow={visualEyebrow}
        visualTitle={visualTitle}
        visualBody={visualBody}
        commandLabel={textValue(slice.primary.commandLabel)}
        commandValue={textValue(slice.primary.commandValue)}
        items={items}
        accentClassName="hero-signal-card--violet"
      />
    );
  }

  if (slice.variation === 'community_network') {
    return (
      <StoryHero
        variation={slice.variation}
        tone={tone}
        eyebrow={eyebrow}
        title={title}
        body={body}
        primaryHref={primaryHref}
        primaryLabel={primaryLabel}
        secondaryHref={secondaryHref}
        secondaryLabel={secondaryLabel}
        supportingLabel={supportingLabel}
        supportingText={supportingText}
        visualEyebrow={visualEyebrow}
        visualTitle={visualTitle}
        visualBody={visualBody}
        commandLabel={textValue(slice.primary.commandLabel)}
        commandValue={textValue(slice.primary.commandValue)}
        items={items}
        accentClassName="hero-signal-card--emerald"
      />
    );
  }

  if (slice.variation === 'blog_journal') {
    const posts = sortBlogPosts(context?.blogPosts ?? []);
    const latestPost = posts[0];
    const trackedTopics = getBlogTagSummaries(posts).length;
    const totalReadingMinutes = posts.reduce(
      (total, post) => total + getReadingTimeMinutes(post.body),
      0
    );

    return (
      <section
        className={`slice slice-hero slice-hero--${slice.variation} slice-hero--tone-${tone}`}
        data-reveal-group
      >
        <div className="blog-journal-hero">
          <div className="blog-journal-hero-glow" aria-hidden="true" />
          <div className="container blog-journal-hero-grid">
            <div className="blog-journal-copy">
              {textValue(slice.primary.mark) ? <p className="blog-journal-mark">{textValue(slice.primary.mark)}</p> : null}
              {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
              {title ? <h1>{title}</h1> : null}
              {body ? <p className="blog-journal-subtitle">{body}</p> : null}
              <HeroActions
                primaryHref={primaryHref}
                primaryLabel={primaryLabel}
                secondaryHref={secondaryHref}
                secondaryLabel={secondaryLabel}
              />
            </div>

            <aside className="blog-journal-ledger" aria-label="Archive summary">
              {visualEyebrow ? <p className="blog-journal-ledger-label">{visualEyebrow}</p> : null}
              <div className="blog-journal-ledger-row">
                <span>Published notes</span>
                <strong>{posts.length.toString().padStart(2, '0')}</strong>
              </div>
              <div className="blog-journal-ledger-row">
                <span>Tracked topics</span>
                <strong>{trackedTopics.toString().padStart(2, '0')}</strong>
              </div>
              <div className="blog-journal-ledger-row">
                <span>Reading time</span>
                <strong>{totalReadingMinutes} min</strong>
              </div>
              {latestPost ? (
                <div className="blog-journal-ledger-feature">
                  {visualTitle ? <span>{visualTitle}</span> : null}
                  <strong>{latestPost.data.title}</strong>
                  <p>{formatBlogDate(latestPost.data.pubDate)}</p>
                </div>
              ) : (
                <div className="blog-journal-ledger-feature">
                  {visualTitle ? <span>{visualTitle}</span> : null}
                  {visualBody ? <strong>{visualBody}</strong> : null}
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>
    );
  }

  if (slice.variation === 'library_manual') {
    const entries = sortLibraryEntries(context?.libraryEntries ?? []);
    const latestEntry = entries[0];
    const tagCount = getLibraryTagCount(entries);

    return (
      <section
        className={`slice slice-hero slice-hero--${slice.variation} slice-hero--tone-${tone}`}
        data-reveal-group
      >
        <div className="library-manual-hero">
          <div className="library-manual-atmosphere" aria-hidden="true" />
          <div className="container library-manual-hero-shell">
            <div className="library-manual-copy">
              {textValue(slice.primary.mark) ? <p className="blog-journal-mark">{textValue(slice.primary.mark)}</p> : null}
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

            <aside className="library-manual-summary" data-reveal>
              <div className="library-manual-summary-card">
                {visualEyebrow ? <span>{visualEyebrow}</span> : null}
                {visualTitle ? <strong>{visualTitle}</strong> : null}
                {visualBody ? <p>{visualBody}</p> : null}
              </div>

              <dl className="library-manual-stats">
                <div>
                  <dt>Entries</dt>
                  <dd>{entries.length.toString().padStart(2, '0')}</dd>
                </div>
                <div>
                  <dt>Topics</dt>
                  <dd>{tagCount.toString().padStart(2, '0')}</dd>
                </div>
                <div>
                  <dt>Latest update</dt>
                  <dd>{formatLibraryDate(latestEntry?.data.pubDate)}</dd>
                </div>
              </dl>
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
            {(title || currentProduct.data.tagline) ? (
              <p className="project-detail-tagline">{title || currentProduct.data.tagline}</p>
            ) : null}
            {(body || currentProduct.data.summary) ? (
              <p className="hero-body">{body || currentProduct.data.summary}</p>
            ) : null}
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
              {visualEyebrow ? <span className="hero-kicker">{visualEyebrow}</span> : null}
              {visualTitle ? <strong>{visualTitle}</strong> : null}
              {visualBody ? <p>{visualBody}</p> : null}
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
                    {item.label ? <span>{item.label}</span> : null}
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

  const genericVisual = hasPanelContent(items, visualEyebrow, visualTitle, visualBody);

  return (
    <section
      className={`slice slice-hero slice-hero--${slice.variation} slice-hero--tone-${tone}`}
      data-reveal-group
    >
      <div className="container">
        <div className={`hero-layout${genericVisual ? '' : ' hero-layout--single'}`}>
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

          {genericVisual ? (
            <GenericPageVisual
              items={items}
              visualEyebrow={visualEyebrow}
              visualTitle={visualTitle}
              visualBody={visualBody}
            />
          ) : null}
        </div>
      </div>
    </section>
  );
}
