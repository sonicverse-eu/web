import type {
  CmsSlice,
  PageDocument,
  ProductDocument,
  SettingsDocument,
} from './types';

function slice(
  slice_type: CmsSlice['slice_type'],
  variation: string,
  primary: Record<string, unknown>,
  items: Record<string, unknown>[] = [],
): CmsSlice {
  return {
    id: `${slice_type}-${variation}-${Math.random().toString(36).slice(2, 8)}`,
    slice_type,
    variation,
    version: 'sktwi1xtmkfgx8626',
    primary,
    items,
  };
}

export const mockSettings: SettingsDocument = {
  id: 'settings',
  uid: 'settings',
  type: 'settings',
  data: {
    announcement: 'Open infrastructure for broadcasters, podcast networks, and modern audio platforms.',
    primaryNav: [
      { label: 'Products', href: '/products' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'About', href: '/about' },
      { label: 'Resources', href: '/library' },
      { label: 'Company', href: '/about' },
    ],
    headerLoginLabel: 'Login',
    headerLoginHref: 'https://app.sonicverse.eu/login',
    headerCtaLabel: 'Book demo',
    headerCtaHref: '/demo',
    productsMenuEyebrow: 'Product suite',
    productsMenuTitle: 'Choose the workflow layer that fits your team right now.',
    productsMenuDescription:
      'Each Sonicverse product solves a clear operational job and can be adopted on its own or as part of a broader platform rollout.',
    footerTagline:
      'Sonicverse is the modular audio operations platform for teams that want enterprise-grade workflows without proprietary lock-in.',
    footerLinks: [
      { label: 'Products', href: '/products' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'About', href: '/about' },
      { label: 'Book a demo', href: '/demo' },
    ],
    footerResources: [
      { label: 'Community', href: '/community' },
      { label: 'Blog', href: '/blog' },
      { label: 'Library', href: '/library' },
      { label: 'GitHub', href: 'https://github.com/sonicverse-eu' },
    ],
    footerContact: [
      { label: 'Email', href: 'mailto:oss@sonicverse.eu', value: 'oss@sonicverse.eu' },
      { label: 'Status', href: '/contact', value: 'Talk to the team' },
    ],
  },
};

export const mockProducts: ProductDocument[] = [
  {
    id: 'audio-streaming-stack',
    uid: 'audio-streaming-stack',
    url: '/products/audio-streaming-stack',
    type: 'product',
    data: {
      name: 'Audio Streaming Stack',
      metaTitle: 'Audio Streaming Stack | Sonicverse',
      metaDescription:
        'Launch resilient live audio infrastructure with failover, HLS delivery, and observability built in.',
      tagline: 'Run resilient live streaming infrastructure without rebuilding the platform layer.',
      summary:
        'A self-hostable delivery stack for broadcasters and audio products that need reliable ingest, failover, adaptive output, and operational visibility.',
      category: 'Streaming Infrastructure',
      audience: 'Broadcasters, community radio, and platform teams',
      outcome: 'Get to a production-ready streaming baseline in days instead of months.',
      accent: 'violet',
      pricingHint: 'Open source core with guided setup and support options',
      heroStats: [
        { label: 'Delivery modes', value: 'Icecast + HLS' },
        { label: 'Operational focus', value: 'Failover first' },
        { label: 'Best for', value: 'Live audio' },
      ],
      slices: [
        slice('hero', 'streaming', {
          eyebrow: 'Streaming infrastructure',
          title: 'Launch resilient live audio delivery without building the platform layer yourself.',
          body:
            'Audio Streaming Stack gives broadcast and platform teams a production-ready baseline for ingest, failover, playback, and day-two operations.',
          primaryLabel: 'Book a streaming demo',
          primaryHref: '/demo',
          secondaryLabel: 'Compare products',
          secondaryHref: '/products',
          supportingLabel: 'Best for broadcasters and platform teams',
          supportingText:
            'Go live faster, reduce operational fragility, and keep the stack inspectable from day one.',
          visualEyebrow: 'Live delivery surface',
          visualTitle: 'Keep source health, fallback behavior, and output paths in one operational view.',
          visualBody:
            'The product is built for teams that need confidence in live delivery, not another box of unmanaged streaming parts.',
          tone: 'violet',
        }, [
          {
            label: 'Source path',
            title: 'Primary ingest with relay visibility',
            detail: 'Track the health of live inputs and relay chains without guessing where delivery breaks.',
          },
          {
            label: 'Fallback',
            title: 'Silence detection and automatic switchover',
            detail: 'Protect uptime with operational controls designed for real broadcast incidents.',
          },
          {
            label: 'Playback',
            title: 'Direct streams and adaptive delivery',
            detail: 'Support modern listening surfaces with Icecast and HLS from one product baseline.',
          },
        ]),
        slice('feature_grid', 'productCapabilities', {
          eyebrow: 'What it replaces',
          title: 'From fragile broadcast plumbing to a repeatable streaming baseline.',
          body:
            'Audio Streaming Stack gives operations teams a clean path from single-server experiments to dependable, observable delivery.',
        }, [
          {
            title: 'Ingest and relay',
            text: 'Handle source ingest, relay streams, and broadcast distribution without stitching together bespoke services.',
          },
          {
            title: 'Adaptive playback',
            text: 'Deliver HLS output alongside direct stream endpoints so modern web and mobile players stay in sync.',
          },
          {
            title: 'Resilience controls',
            text: 'Use automatic fallback and silence detection to reduce operator intervention during failures.',
          },
          {
            title: 'Operational clarity',
            text: 'Get a platform that is easier to reason about, extend, and hand over to the next engineer.',
          },
        ]),
        slice('proof_band', 'workflow', {
          eyebrow: 'Why teams adopt it',
          title: 'Designed for the realities of live audio operations.',
        }, [
          { label: 'Self-hosting', value: 'Keep infrastructure and delivery logic under your control.' },
          { label: 'Composable', value: 'Fits with Liquidsoap, station tooling, and custom orchestration.' },
          { label: 'Transparent', value: 'Every moving part is inspectable, versioned, and adaptable.' },
        ]),
        slice('call_to_action', 'productNext', {
          eyebrow: 'Need a tailored rollout?',
          title: 'Plan your deployment with the Sonicverse team.',
          body:
            'We can help you scope architecture, migration risk, and the fastest route to a dependable launch.',
          primaryLabel: 'Book a streaming demo',
          primaryHref: '/demo',
          secondaryLabel: 'Contact engineering',
          secondaryHref: '/contact',
        }),
      ],
    },
  },
  {
    id: 'media-metadata-api',
    uid: 'media-metadata-api',
    url: '/products/media-metadata-api',
    type: 'product',
    data: {
      name: 'Media Metadata API',
      metaTitle: 'Media Metadata API | Sonicverse',
      metaDescription:
        'Normalize and automate metadata workflows across ID3, Vorbis, MP4, and RSS with one programmable API.',
      tagline: 'Make metadata operations consistent across audio formats, archives, and publishing pipelines.',
      summary:
        'A unified API for reading, writing, and normalizing metadata across ingest, archive, and distribution workflows.',
      category: 'Developer API',
      audience: 'Podcast platforms, archive teams, and media engineering groups',
      outcome: 'Stop maintaining one-off parsers and make metadata flows predictable.',
      accent: 'emerald',
      pricingHint: 'API-first workflow layer for ingest, validation, and publishing',
      heroStats: [
        { label: 'Formats covered', value: 'ID3, Vorbis, MP4, RSS' },
        { label: 'Teams served', value: 'Archive + platform' },
        { label: 'Core value', value: 'Normalization' },
      ],
      slices: [
        slice('hero', 'metadata', {
          eyebrow: 'Developer API',
          title: 'Normalize metadata workflows before format drift slows every release.',
          body:
            'Media Metadata API gives archive, platform, and publishing teams one programmable contract for reading, validating, and transforming media metadata.',
          primaryLabel: 'Book a metadata walkthrough',
          primaryHref: '/demo',
          secondaryLabel: 'Talk to Sonicverse',
          secondaryHref: '/contact',
          supportingLabel: 'Built for teams with real metadata sprawl',
          supportingText:
            'Replace one-off parsers, reduce field mismatches, and make publishing rules easier to maintain across systems.',
          visualEyebrow: 'Unified schema layer',
          visualTitle: 'Map multiple metadata formats into one stable operational contract.',
          visualBody:
            'The hero visual leans technical on purpose: this product wins when teams immediately see abstraction, validation, and consistency.',
          tone: 'emerald',
        }, [
          {
            label: 'Input',
            title: 'ID3 / Vorbis / MP4 / RSS',
            detail: 'Read and write multiple format families behind one shared API.',
            meta: 'Format abstraction',
          },
          {
            label: 'Validation',
            title: 'Normalize fields before they fork across systems',
            detail: 'Centralize transformation and validation rules instead of duplicating them in each tool.',
            meta: 'Batch-safe automation',
          },
          {
            label: 'Output',
            title: 'Return release-ready metadata payloads',
            detail: 'Feed archives, players, apps, and syndication systems with cleaner contracts.',
            meta: 'Publishing consistency',
          },
        ]),
        slice('feature_grid', 'productCapabilities', {
          eyebrow: 'Built for pipeline teams',
          title: 'A single interface for metadata that usually lives in four different systems.',
          body:
            'When metadata changes shape at every step of the workflow, releases slow down and quality issues multiply. This API centralizes the hard parts.',
        }, [
          {
            title: 'Format abstraction',
            text: 'Read and write multiple audio metadata formats through one normalized contract.',
          },
          {
            title: 'Batch-safe automation',
            text: 'Process large media libraries with predictable validation and transformation rules.',
          },
          {
            title: 'Podcast-aware fields',
            text: 'Handle episode type, season data, chapters, and other distribution-specific fields cleanly.',
          },
          {
            title: 'Cleaner integrations',
            text: 'Reduce edge-case logic in publishing systems, archives, and third-party platform adapters.',
          },
        ]),
        slice('content_columns', 'operatingModel', {
          eyebrow: 'Where it fits',
          title: 'Use it as a shared metadata layer across ingest, curation, and distribution.',
          body:
            'Instead of every product team maintaining its own metadata rules, you can expose one stable service and evolve it centrally.',
          panelTitle: 'Ideal teams',
          panelBody:
            'Best suited to engineering teams with multiple metadata touchpoints or legacy format fragmentation.',
        }, [
          {
            title: 'Ingest',
            text: 'Normalize incoming files before they touch storage or editorial tooling.',
          },
          {
            title: 'Archive',
            text: 'Keep long-term media libraries searchable and structurally consistent.',
          },
          {
            title: 'Publishing',
            text: 'Push release-ready payloads into feeds, players, apps, and syndication systems.',
          },
        ]),
        slice('call_to_action', 'productNext', {
          eyebrow: 'Want to remove metadata debt?',
          title: 'Let’s map your current pipeline and show where a shared API helps most.',
          body:
            'We’ll identify the biggest duplication points and outline a staged rollout that does not interrupt publishing.',
          primaryLabel: 'Book a metadata walkthrough',
          primaryHref: '/demo',
          secondaryLabel: 'Talk to Sonicverse',
          secondaryHref: '/contact',
        }),
      ],
    },
  },
  {
    id: 'broadcast-scheduler',
    uid: 'broadcast-scheduler',
    url: '/products/broadcast-scheduler',
    type: 'product',
    data: {
      name: 'Broadcast Scheduler',
      metaTitle: 'Broadcast Scheduler | Sonicverse',
      metaDescription:
        'Coordinate live, automated, and fallback programming with a modern scheduling layer built for radio and audio teams.',
      tagline: 'Plan live and automated programming in one operational control layer.',
      summary:
        'An open scheduling engine for live and automated radio playout that keeps planners, operators, and integrations aligned.',
      category: 'Planning & Operations',
      audience: 'Community stations, podcast networks, and audio operations teams',
      outcome: 'Replace brittle scheduling workflows with a system designed for modern broadcasting.',
      accent: 'amber',
      pricingHint: 'Operational planning layer for live, automated, and fallback programming',
      heroStats: [
        { label: 'Operational mode', value: 'Live + automated' },
        { label: 'Integrations', value: 'Liquidsoap / AzuraCast' },
        { label: 'Team value', value: 'Shared control' },
      ],
      slices: [
        slice('hero', 'operations', {
          eyebrow: 'Planning and operations',
          title: 'Give planners and operators one control layer for schedules, overrides, and fallback programming.',
          body:
            'Broadcast Scheduler helps radio and audio teams coordinate live and automated programming without relying on brittle spreadsheets or hidden schedule logic.',
          primaryLabel: 'Book an operations demo',
          primaryHref: '/demo',
          secondaryLabel: 'Ask a product question',
          secondaryHref: '/contact',
          supportingLabel: 'For station teams that need shared control',
          supportingText:
            'Reduce coordination drag, standardize exports, and make schedule changes easier to reason about under pressure.',
          visualEyebrow: 'Operational timeline',
          visualTitle: 'See live blocks, fallback rules, and downstream handoffs in one planning surface.',
          visualBody:
            'This layout makes the promise tangible: fewer handoffs, clearer overrides, and a schedule teams can actually trust.',
          tone: 'amber',
        }, [
          {
            label: '06:00',
            title: 'Recurring morning block',
            detail: 'Keep predictable schedule structure without rebuilding the day manually.',
            meta: 'Planned automation',
          },
          {
            label: '09:00',
            title: 'Live show override',
            detail: 'Make real-world programming changes visible to operators before they become continuity issues.',
            meta: 'Live control',
          },
          {
            label: 'Fallback',
            title: 'Continuity rules ready',
            detail: 'Trigger playlist or rule-based safety nets when live sources move or fail.',
            meta: 'Operational confidence',
          },
        ]),
        slice('feature_grid', 'productCapabilities', {
          eyebrow: 'Operational control',
          title: 'A clearer way to plan schedules, overrides, and fallback logic.',
          body:
            'Broadcast Scheduler reduces handoffs between planning and operations by putting schedule logic, integrations, and exceptions in one place.',
        }, [
          {
            title: 'Schedule builder',
            text: 'Manage recurring blocks, live shows, and override windows without rebuilding the day by hand.',
          },
          {
            title: 'Fallback logic',
            text: 'Keep continuity intact with playlist and rule-based fallback options when live sources fail.',
          },
          {
            title: 'Adapter layer',
            text: 'Connect scheduler output to the playout systems you already run rather than replacing everything at once.',
          },
          {
            title: 'Operational confidence',
            text: 'Give station teams a shared planning surface that is easier to audit and maintain.',
          },
        ]),
        slice('proof_band', 'workflow', {
          eyebrow: 'Designed for station realities',
          title: 'Built around planning clarity, not just playlist generation.',
        }, [
          { label: 'Live override', value: 'Handle schedule changes when real-world programming moves.' },
          { label: 'Standardized exports', value: 'Feed downstream systems in formats that fit existing operations.' },
          { label: 'Open architecture', value: 'Integrate deeply without buying into a closed playout stack.' },
        ]),
        slice('call_to_action', 'productNext', {
          eyebrow: 'See it in context',
          title: 'Walk through your current station workflow and map the right control points.',
          body:
            'We can show how Sonicverse products fit together for scheduling, streaming, and metadata-heavy operations.',
          primaryLabel: 'Book an operations demo',
          primaryHref: '/demo',
          secondaryLabel: 'Ask a product question',
          secondaryHref: '/contact',
        }),
      ],
    },
  },
];

export const mockPages: PageDocument[] = [
  {
    id: 'home',
    uid: 'home',
    url: '/',
    type: 'page',
    data: {
      title: 'Sonicverse',
      metaTitle: 'Sonicverse | Audio infrastructure for modern media teams',
      metaDescription:
        'Sonicverse helps broadcasters, podcast networks, and audio platforms run streaming, metadata, and scheduling workflows on an open, composable stack.',
      intro:
        'Sonicverse brings streaming, metadata, and scheduling into one coherent operating model for modern audio teams.',
      slices: [
        slice('hero', 'home', {
          eyebrow: 'Multi-product audio operations platform',
          title: 'Run streaming, metadata, and broadcast workflows from one operating layer.',
          body:
            'Sonicverse gives broadcasters, podcast networks, and media platforms three connected products for live delivery, metadata automation, and scheduling control, without locking teams into a black-box stack.',
          primaryLabel: 'Book a demo',
          primaryHref: '/demo',
          secondaryLabel: 'Explore products',
          secondaryHref: '/products',
          supportingLabel: 'Built for technical buyers',
          supportingText:
            'Open-source core, API-first building blocks, and modular rollout paths for teams that need operational credibility fast.',
          visualEyebrow: 'Platform overview',
          visualTitle: 'Start with one workflow. Grow into a shared operating system.',
          visualBody:
            'Each product solves a specific job today and fits into a broader platform architecture tomorrow.',
          tone: 'brand',
        }, [
          {
            label: 'Open core',
            title: 'Deploy on infrastructure you control',
            detail: 'Keep architecture transparent while still giving buyers a clean commercial path to support and rollout help.',
            meta: 'Self-hosted, extensible, production-minded',
          },
          {
            label: 'Multi-product clarity',
            title: 'Choose the right product in one pass',
            detail: 'Visitors can understand what each product does, who it is for, and how the products fit together before they talk to sales.',
            meta: 'Delivery, metadata, scheduling',
          },
          {
            label: 'Operational trust',
            title: 'Designed for serious evaluation',
            detail: 'The site leads with outcomes, architecture, and team fit instead of generic platform language.',
            meta: 'Clear routes to demo, exploration, and adoption',
          },
        ]),
        slice('proof_band', 'metrics', {
          eyebrow: 'Why teams trust the platform',
          title: 'Everything on the homepage is designed to reduce evaluation friction for technical and commercial stakeholders.',
        }, [
          { label: 'Open-source product core', value: 'Inspect the stack, self-host it, and adopt it on your own timeline.' },
          { label: 'Three connected products', value: 'Delivery, metadata, and scheduling live in one coherent platform story.' },
          { label: 'Designed for modern audio teams', value: 'Built for broadcasters, podcast networks, and platform engineering groups.' },
        ]),
        slice('product_suite', 'overview', {
          eyebrow: 'Product ecosystem',
          title: 'Choose the workflow layer that solves today’s bottleneck without losing the bigger platform picture.',
          body:
            'Every product has a clear buyer, a concrete operational outcome, and a direct route into a demo or product exploration.',
          ctaLabel: 'Compare products',
          ctaHref: '/products',
        }),
        slice('content_columns', 'operatingModel', {
          eyebrow: 'Problem to solution',
          title: 'Most teams are not missing ambition. They are missing a system that makes audio operations coherent.',
          body:
            'Streaming reliability, metadata quality, and programming control often live in separate tools with separate owners. Sonicverse turns those disconnected decisions into one operational model.',
          panelTitle: 'What changes with Sonicverse',
          panelBody:
            'Instead of buying another isolated tool, teams get products that solve a job today while fitting into a broader platform over time.',
        }, [
          {
            title: 'Less product confusion',
            text: 'Every product is framed around a specific workflow, team, and operational win so buyers can self-identify quickly.',
          },
          {
            title: 'Stronger technical credibility',
            text: 'The messaging emphasizes architecture, rollout paths, and extensibility rather than vague transformation language.',
          },
          {
            title: 'Cleaner conversion paths',
            text: 'Visitors can book a demo, compare products, or start with a single product page depending on where they are in the buying journey.',
          },
        ]),
        slice('feature_grid', 'platform', {
          eyebrow: 'Why the platform converts',
          title: 'The homepage now sells the platform the way the products deserve to be evaluated.',
          body:
            'Each section is built to answer a real buying question, from product fit to deployment confidence to the next logical action.',
        }, [
          {
            title: 'Value in under five seconds',
            text: 'The hero states what Sonicverse does, who it serves, and why a platform approach matters before users scroll.',
          },
          {
            title: 'Product-first storytelling',
            text: 'The ecosystem section makes the product map legible immediately instead of forcing visitors to infer how separate products connect.',
          },
          {
            title: 'Trust before hard sell',
            text: 'Open-source positioning, team fit, and deployment clarity appear early so technical buyers can keep moving with confidence.',
          },
          {
            title: 'Conversion without clutter',
            text: 'Primary and secondary CTAs repeat at the right moments, while product cards and supporting links offer lower-friction exploration paths.',
          },
        ]),
        slice('testimonial_rail', 'proof', {
          eyebrow: 'What resonates with buyers',
          title: 'Different stakeholders can all see where Sonicverse fits without reading a wall of copy.',
        }, [
          {
            quote:
              'We need to understand in one screen whether this helps live delivery, metadata automation, or scheduling control, and how those layers connect later.',
            name: 'Platform teams',
            role: 'Need a clear platform map before a technical review',
          },
          {
            quote:
              'Open infrastructure is attractive, but only if the commercial path, deployment model, and integration story all feel mature enough to trust.',
            name: 'Technical leads',
            role: 'Need architectural credibility and rollout confidence',
          },
          {
            quote:
              'We should be able to evolve messaging and section order without rebuilding the homepage every time the product story changes.',
            name: 'Marketing and product',
            role: 'Need modular sections that stay flexible in code',
          },
        ]),
        slice('content_columns', 'selectionGuide', {
          eyebrow: 'Find your path',
          title: 'Start with the product that matches your team’s immediate pressure point.',
          body:
            'Sonicverse works as a platform, but adoption does not need to happen all at once. The homepage helps each buyer recognize the right first step.',
          panelTitle: 'Common entry points',
          panelBody:
            'Use the product map to route broadcasters, podcast networks, and platform engineering teams to the right product page or demo flow.',
        }, [
          {
            title: 'Broadcasters and station operators',
            text: 'Start with Audio Streaming Stack when resilient delivery, failover, and observability are the urgent need.',
          },
          {
            title: 'Podcast networks and archive teams',
            text: 'Start with Media Metadata API when metadata consistency is slowing publishing, QA, or library management.',
          },
          {
            title: 'Operations and programming teams',
            text: 'Start with Broadcast Scheduler when schedules, overrides, and fallback logic are still being coordinated manually.',
          },
        ]),
        slice('call_to_action', 'platform', {
          eyebrow: 'Choose the right next step',
          title: 'Book a focused walkthrough, compare the products, or start with the workflow layer that fits right now.',
          body:
            'The homepage keeps the platform story clear while still giving every visitor an obvious path forward, from self-serve exploration to a sales conversation.',
          primaryLabel: 'Book a demo',
          primaryHref: '/demo',
          secondaryLabel: 'Explore products',
          secondaryHref: '/products',
        }, [
          { label: 'Talk to the team', href: '/contact' },
          { label: 'Join the community', href: '/community' },
          { label: 'View on GitHub', href: 'https://github.com/sonicverse-eu' },
        ]),
      ],
    },
  },
  {
    id: 'products',
    uid: 'products',
    url: '/products',
    type: 'page',
    data: {
      title: 'Products',
      metaTitle: 'Products | Sonicverse',
      metaDescription:
        'Explore the Sonicverse product suite and find the right workflow layer for streaming, metadata, or broadcast operations.',
      slices: [
        slice('hero', 'page', {
          eyebrow: 'Products',
          title: 'Understand the product ecosystem fast, then go deeper on the workflow layer that matters most.',
          body:
            'Sonicverse is a multi-product platform, not a pile of unrelated tools. Each product has a distinct job, buyer, and expansion path so teams can choose with confidence.',
          primaryLabel: 'Compare products',
          primaryHref: '#product-suite',
          secondaryLabel: 'Book a demo',
          secondaryHref: '/demo',
          supportingLabel: 'Three products, three clear starting points',
          supportingText:
            'Start with the operational layer creating the most drag today, then expand into a broader platform over time.',
          visualEyebrow: 'How the suite fits together',
          visualTitle: 'Products connect into one platform, but each one stands on its own.',
          visualBody:
            'The overview hero is intentionally centered and structured to reduce confusion between platform scope and product scope.',
          tone: 'brand',
        }, [
          {
            label: 'Streaming infrastructure',
            title: 'Audio Streaming Stack',
            detail: 'Best when uptime, failover, and listener delivery are the immediate risk.',
            meta: 'For broadcasters and live audio teams',
          },
          {
            label: 'Developer API',
            title: 'Media Metadata API',
            detail: 'Best when metadata complexity is slowing archives, feeds, or publishing workflows.',
            meta: 'For platform and archive teams',
          },
          {
            label: 'Planning and operations',
            title: 'Broadcast Scheduler',
            detail: 'Best when schedules, overrides, and fallback programming are hard to coordinate.',
            meta: 'For stations and operations teams',
          },
        ]),
        slice('product_suite', 'comparison', {
          eyebrow: 'Product overview',
          title: 'Compare the product suite by use case, buyer, and operational outcome.',
          body:
            'The overview page is built to reduce ambiguity quickly so teams can self-qualify before requesting a walkthrough.',
          ctaLabel: 'Need help choosing? Contact us',
          ctaHref: '/contact',
        }),
        slice('content_columns', 'selectionGuide', {
          eyebrow: 'How to choose',
          title: 'Most teams start with the workflow layer that is creating the most operational drag.',
          body:
            'You can adopt one Sonicverse product independently or combine them into a more complete operational stack over time.',
          panelTitle: 'Typical buying paths',
          panelBody:
            'Start with delivery if uptime is the risk, with metadata if publishing consistency is the bottleneck, or with scheduling if operational coordination is the problem.',
        }, [
          {
            title: 'Start with delivery',
            text: 'Choose Audio Streaming Stack when live distribution, failover, and playback reliability are the highest priorities.',
          },
          {
            title: 'Start with metadata',
            text: 'Choose Media Metadata API when multiple systems disagree on fields, formats, or publishing rules.',
          },
          {
            title: 'Start with operations',
            text: 'Choose Broadcast Scheduler when schedules, overrides, and fallback programming are hard to coordinate.',
          },
        ]),
        slice('call_to_action', 'platform', {
          eyebrow: 'Want the product map in context?',
          title: 'We can walk through your current stack and show where Sonicverse fits first.',
          body:
            'That conversation works whether you are replacing one workflow or planning a broader infrastructure refresh.',
          primaryLabel: 'Book a platform demo',
          primaryHref: '/demo',
          secondaryLabel: 'Contact sales',
          secondaryHref: '/contact',
        }),
      ],
    },
  },
  {
    id: 'pricing',
    uid: 'pricing',
    url: '/pricing',
    type: 'page',
    data: {
      title: 'Pricing',
      metaTitle: 'Pricing | Sonicverse',
      metaDescription:
        'Understand how Sonicverse supports open-source adoption, pilot planning, and deeper implementation partnerships.',
      slices: [
        slice('hero', 'page', {
          eyebrow: 'Pricing',
          title: 'Open-source by default. Commercial support when your rollout needs it.',
          body:
            'Sonicverse keeps the product core open while offering structured help for teams that need architecture guidance, implementation support, or a faster path to deployment.',
          primaryLabel: 'Book a demo',
          primaryHref: '/demo',
          secondaryLabel: 'Contact us',
          secondaryHref: '/contact',
        }),
        slice('pricing_grid', 'default', {
          eyebrow: 'Plans',
          title: 'Choose the level of support that matches your rollout.',
          body:
            'The pricing page is designed for clarity: what stays open, where support begins, and which path fits a self-serve versus guided deployment.',
        }, [
          {
            tier: 'Open Core',
            price: '€0',
            cadence: 'Forever',
            description: 'Use the products, self-host, and adapt the stack on your own schedule.',
            feature_1: 'Full source access',
            feature_2: 'Community-led adoption',
            feature_3: 'Self-serve documentation',
            feature_4: 'Best for technical teams that want maximum control',
            cta_label: 'Explore products',
            cta_href: '/products',
          },
          {
            tier: 'Pilot',
            price: 'Custom',
            cadence: 'Per rollout',
            description: 'A guided pilot for teams validating technical fit, deployment shape, and success criteria.',
            feature_1: 'Architecture discovery',
            feature_2: 'Implementation guidance',
            feature_3: 'Structured rollout checkpoints',
            feature_4: 'Best for teams evaluating one high-priority workflow',
            cta_label: 'Request a pilot',
            cta_href: '/demo',
          },
          {
            tier: 'Platform Partnership',
            price: 'Custom',
            cadence: 'Ongoing',
            description: 'Longer-term collaboration for organizations building on Sonicverse as part of their platform stack.',
            feature_1: 'Roadmap collaboration',
            feature_2: 'Priority support',
            feature_3: 'Systems integration guidance',
            feature_4: 'Best for multi-product adoption and operational change',
            cta_label: 'Talk to Sonicverse',
            cta_href: '/contact',
          },
        ]),
        slice('proof_band', 'metrics', {
          eyebrow: 'What pricing communicates',
          title: 'A simple model that keeps adoption easy and enterprise conversations clear.',
        }, [
          { label: 'Open-source first', value: 'No gated product core or artificial evaluation barrier.' },
          { label: 'Commercial help when needed', value: 'Support is tied to rollout complexity, not feature access.' },
          { label: 'Clear conversion paths', value: 'Pricing routes visitors into either self-serve adoption or a structured demo.' },
        ]),
      ],
    },
  },
  {
    id: 'about',
    uid: 'about',
    url: '/about',
    type: 'page',
    data: {
      title: 'About',
      metaTitle: 'About Sonicverse',
      metaDescription:
        'Learn how Sonicverse combines open-source values with product-grade infrastructure thinking for audio teams.',
      slices: [
        slice('hero', 'page', {
          eyebrow: 'About Sonicverse',
          title: 'An open-source company story with the discipline of a product platform.',
          body:
            'Sonicverse exists to give modern audio teams infrastructure they can trust, understand, and adapt without getting locked into brittle closed systems.',
          primaryLabel: 'Explore products',
          primaryHref: '/products',
          secondaryLabel: 'Join the community',
          secondaryHref: '/community',
        }),
        slice('content_columns', 'mission', {
          eyebrow: 'What we believe',
          title: 'Open systems work better when the product experience is as strong as the architecture.',
          body:
            'The redesign balances product clarity, editorial maintainability, and technical credibility so the company feels coherent across every customer journey.',
          panelTitle: 'Principles',
          panelBody:
            'We value composability, long-term maintainability, strong operating models, and a clear path for non-technical editors to keep the site up to date.',
        }, [
          { title: 'Composable by default', text: 'Each product can stand alone while still fitting into a broader platform story.' },
          { title: 'Editorially practical', text: 'Slices stay modular and purposeful instead of becoming giant page-builder blobs.' },
          { title: 'Technically legible', text: 'Messaging stays grounded in actual workflows, integrations, and operational outcomes.' },
        ]),
        slice('feature_grid', 'platform', {
          eyebrow: 'How we work',
          title: 'The company story now supports both community credibility and commercial clarity.',
          body:
            'That balance matters when the same website needs to speak to engineers, operators, product buyers, and contributors.',
        }, [
          { title: 'Sharper hierarchy', text: 'Every page starts with who it is for, what it solves, and the best next action.' },
          { title: 'Better product routing', text: 'Navigation and page composition make the multi-product structure obvious from the first screen.' },
          { title: 'Stronger visual trust', text: 'The new design uses cleaner surfaces, denser signal, and more confident product framing.' },
          { title: 'One cohesive system', text: 'Typography, spacing, cards, CTAs, and section rhythm all work from the same design rules.' },
        ]),
      ],
    },
  },
  {
    id: 'contact',
    uid: 'contact',
    url: '/contact',
    type: 'page',
    data: {
      title: 'Contact',
      metaTitle: 'Contact Sonicverse',
      metaDescription:
        'Reach the Sonicverse team for pilots, partnerships, implementation questions, and product support.',
      slices: [
        slice('hero', 'page', {
          eyebrow: 'Contact',
          title: 'Start the right conversation without getting bounced around.',
          body:
            'Tell us what you are evaluating, what you are building, and which workflow is under pressure. We will route it to the right team quickly.',
          primaryLabel: 'Book a demo',
          primaryHref: '/demo',
          secondaryLabel: 'Explore products',
          secondaryHref: '/products',
        }),
        slice('contact_panel', 'contact', {
          eyebrow: 'Talk to Sonicverse',
          title: 'Share context once. We’ll keep the follow-up tight and specific.',
          body:
            'The contact flow is designed for partnerships, support, architecture questions, and product-fit conversations.',
          panelTitle: 'Direct channels',
          panelBody:
            'If you already know the path you need, you can also reach us directly by email or through the community.',
          formMode: 'contact',
        }, [
          { label: 'Email', value: 'oss@sonicverse.eu', href: 'mailto:oss@sonicverse.eu' },
          { label: 'Community', value: 'Open contribution hub', href: '/community' },
          { label: 'GitHub', value: 'sonicverse-eu', href: 'https://github.com/sonicverse-eu' },
        ]),
      ],
    },
  },
  {
    id: 'demo',
    uid: 'demo',
    url: '/demo',
    type: 'page',
    data: {
      title: 'Demo',
      metaTitle: 'Book a Demo | Sonicverse',
      metaDescription:
        'Book a focused Sonicverse walkthrough and map the right product or rollout path for your team.',
      slices: [
        slice('hero', 'page', {
          eyebrow: 'Book a demo',
          title: 'Get a focused walkthrough of the product suite and the workflow that matters most.',
          body:
            'The demo path is optimized for buyers and technical teams that want product fit, implementation context, and a clear next-step recommendation.',
          primaryLabel: 'Send a demo request',
          primaryHref: '#contact-panel',
          secondaryLabel: 'See products first',
          secondaryHref: '/products',
        }),
        slice('contact_panel', 'demo', {
          eyebrow: 'Demo intake',
          title: 'Tell us which workflow you want to see and where your current stack is getting stuck.',
          body:
            'We’ll use that context to keep the session product-specific and useful for both technical and commercial stakeholders.',
          panelTitle: 'Typical demo topics',
          panelBody:
            'Platform overviews, product-fit assessments, migration planning, and architecture reviews.',
          formMode: 'demo',
        }, [
          { label: 'Best for', value: 'Pilots and product-fit evaluation', href: '/pricing' },
          { label: 'Response window', value: 'Usually within 2 business days', href: '/contact' },
          { label: 'Need docs first?', value: 'Explore the library', href: '/library' },
        ]),
      ],
    },
  },
  {
    id: 'community',
    uid: 'community',
    url: '/community',
    type: 'page',
    data: {
      title: 'Community',
      metaTitle: 'Community | Sonicverse',
      metaDescription:
        'Contribute to Sonicverse, join the open-source ecosystem, and help shape the future of audio infrastructure.',
      slices: [
        slice('hero', 'page', {
          eyebrow: 'Community',
          title: 'An open-source platform deserves a contribution experience that feels modern too.',
          body:
            'Sonicverse is still built in the open. The redesigned site makes that community story easier to discover without weakening the product narrative.',
          primaryLabel: 'View GitHub',
          primaryHref: 'https://github.com/sonicverse-eu',
          secondaryLabel: 'Contact the team',
          secondaryHref: '/contact',
        }),
        slice('feature_grid', 'platform', {
          eyebrow: 'Ways to contribute',
          title: 'There is room for engineering, documentation, integrations, and ecosystem support.',
          body:
            'We want contributor pathways to be legible and welcoming while still matching the technical maturity of the platform.',
        }, [
          { title: 'Core platform', text: 'Help shape runtime, APIs, integrations, and deployment workflows.' },
          { title: 'Docs and examples', text: 'Improve adoption with clearer guides, demos, and implementation notes.' },
          { title: 'Ecosystem adapters', text: 'Connect Sonicverse into the tools broadcasters and platform teams already use.' },
          { title: 'Community support', text: 'Make onboarding smoother for new contributors, partners, and pilot teams.' },
        ]),
      ],
    },
  },
];
