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
      { label: 'Community', href: '/community' },
      { label: 'Contact', href: '/contact' },
    ],
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
          eyebrow: 'Audio operations platform',
          title: 'Modern infrastructure for teams shipping live and on-demand audio.',
          body:
            'Sonicverse helps broadcasters, podcast networks, and audio platforms run delivery, metadata, and scheduling workflows on an open stack that engineers can actually extend.',
          primaryLabel: 'Explore products',
          primaryHref: '/products',
          secondaryLabel: 'Book a demo',
          secondaryHref: '/demo',
          supportingLabel: 'Trusted signals',
          supportingText: 'Open source core, modular architecture, and operational workflows designed for production teams.',
        }),
        slice('product_suite', 'overview', {
          eyebrow: 'Product suite',
          title: 'Three products that cover the operational layers most audio teams still patch together by hand.',
          body:
            'Each product solves a distinct problem, but they share the same design language, engineering principles, and deployment philosophy.',
          ctaLabel: 'Compare products',
          ctaHref: '/products',
        }),
        slice('proof_band', 'metrics', {
          eyebrow: 'Why teams trust the platform',
          title: 'High-trust building blocks for technical buyers.',
        }, [
          { label: '100% open source core', value: 'Ship on infrastructure you can inspect and extend.' },
          { label: 'Three modular products', value: 'Adopt one workflow or build a cohesive stack over time.' },
          { label: 'EU-based initiative', value: 'Built with transparent governance and long-term maintainability in mind.' },
        ]),
        slice('feature_grid', 'platform', {
          eyebrow: 'Platform capabilities',
          title: 'Built to feel product-grade, not like a loose collection of repos.',
          body:
            'The redesign makes Sonicverse easier to evaluate, easier to route through, and far more legible for technical and commercial stakeholders.',
        }, [
          {
            title: 'Clear product selection',
            text: 'Users can understand what each product does, who it serves, and what outcome it drives within a single scan.',
          },
          {
            title: 'Shared system',
            text: 'Consistent slice spacing, component behaviors, and page structure create one unified brand across every route.',
          },
          {
            title: 'Technical credibility',
            text: 'Messaging emphasizes architecture, integrations, and operational value instead of generic marketing language.',
          },
          {
            title: 'Editor ready',
            text: 'Sections map cleanly to Prismic slices so the team can evolve pages without developer intervention for routine content work.',
          },
        ]),
        slice('testimonial_rail', 'proof', {
          eyebrow: 'How Sonicverse is evaluated',
          title: 'The platform is designed for teams that need clarity before they commit.',
        }, [
          {
            quote:
              'We need a platform story that makes the whole product portfolio understandable in one pass, not a list of disconnected projects.',
            name: 'Platform buyers',
            role: 'Need architectural confidence and clear routing',
          },
          {
            quote:
              'We want open infrastructure, but we still expect the UX and information architecture of a modern SaaS company.',
            name: 'Technical leads',
            role: 'Need trust, consistency, and realistic integration paths',
          },
          {
            quote:
              'Editors and operators should be able to update product pages without rewriting the site structure every time messaging changes.',
            name: 'Content teams',
            role: 'Need modular slices, not one-off page code',
          },
        ]),
        slice('call_to_action', 'platform', {
          eyebrow: 'Choose your next step',
          title: 'Explore the platform, compare the products, or plan a focused walkthrough.',
          body:
            'Whether you are evaluating one workflow or mapping a larger modernization effort, the site now routes you to the right entry point quickly.',
          primaryLabel: 'See product fit',
          primaryHref: '/products',
          secondaryLabel: 'Start a demo request',
          secondaryHref: '/demo',
        }),
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
          title: 'Choose the workflow layer that fits your team today.',
          body:
            'Sonicverse is structured as a coherent multi-product platform. Each product has a clear job, target audience, and expansion path.',
          primaryLabel: 'Book a demo',
          primaryHref: '/demo',
          secondaryLabel: 'Talk to the team',
          secondaryHref: '/contact',
        }),
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
