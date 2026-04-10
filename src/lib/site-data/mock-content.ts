import type {
  CmsSlice,
          },
          {
            label: 'Community',
            href: '/community',
            description: 'Join events and conversations across the Sonicverse ecosystem.',
          },
        ],
      },
      {
        label: 'Company',
        href: '/about',
        children: [
          {
            label: 'Book a demo',
            href: '/contact',
            description: 'See how Sonicverse fits your current delivery and ops stack.',
          },
          {
            label: 'Contact the team',
            href: '/contact',
            description: 'Start a direct conversation about your roadmap and constraints.',
          },
        ],
      },
    ],
    headerLoginLabel: 'Login',
    headerLoginHref: 'https://app.sonicverse.eu/login',
    headerCtaLabel: 'Book demo',
    headerCtaHref: '/contact',
    productsMenuEyebrow: 'Projects',
    productsMenuTitle: 'Choose the project that matches the workflow pressure you need to fix first.',
    productsMenuDescription:
      'Each Sonicverse project solves one operational job cleanly and can stand alone or connect into a broader platform rollout over time.',
    footerBrandName: 'Sonicverse',
    footerBrandTagline: 'Audio operations platform',
    footerTagline:
      'Sonicverse is the modular audio operations platform for teams that want enterprise-grade workflows without proprietary lock-in.',
    footerLegalText: 'Open infrastructure for modern audio teams.',
    footerLinks: [
      { label: 'Projects', href: '/projects' },
      { label: 'About', href: '/about' },
      { label: 'Book a demo', href: '/contact' },
    ],
    footerResources: [
      { label: 'Community', href: '/community' },
      { label: 'Blog', href: '/blog' },
      { label: 'GitHub', href: 'https://github.com/sonicverse-eu' },
    ],
    footerContact: [
      { label: 'Email', href: 'mailto:oss@sonicverse.eu', value: 'oss@sonicverse.eu' },
      { label: 'Status', href: '/contact', value: 'Talk to the team' },
    ],
    footerBottomLinks: [
      { label: 'Audio Streaming Stack', href: '/projects/audio-streaming-stack' },
      { label: 'Book a demo', href: '/contact' },
    ],
  },
};

export const mockProducts: ProductDocument[] = [
  {
    id: 'audio-streaming-stack',
    uid: 'audio-streaming-stack',
    url: '/projects/audio-streaming-stack',
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
        slice('hero', 'project_detail', {
          eyebrow: 'Streaming infrastructure project',
          title: 'A resilient delivery baseline for teams that already know the cost of outage triage.',
          body:
            'Audio Streaming Stack turns relay chains, failover rules, and playback outputs into one inspectable delivery surface that can ship quickly without feeling temporary.',
          primaryLabel: 'Book a streaming review',
          primaryHref: '/contact',
          secondaryLabel: 'View all projects',
          secondaryHref: '/projects',
          supportingLabel: 'Use when uptime risk is already an operator burden',
          supportingText:
            'Built for stations and platform teams that need failover, delivery visibility, and a deployment shape they can still reason about six months later.',
          visualEyebrow: 'Deployment dossier',
          visualTitle: 'What this project stabilizes first.',
          visualBody:
            'The page foregrounds failure handling, output paths, and rollout posture before it asks anyone to care about implementation detail.',
          tone: 'violet',
        }, [
          {
            label: 'Signal 01',
            title: 'Source visibility before listener impact',
            detail: 'Track ingest and relay health early enough to act before delivery problems become support tickets.',
            meta: 'Observability',
          },
          {
            label: 'Signal 02',
            title: 'Fallback logic designed for real incidents',
            detail: 'Silence detection and switchover rules stay explicit instead of hiding inside ad hoc shell scripts.',
            meta: 'Continuity',
          },
          {
            label: 'Signal 03',
            title: 'One baseline for direct and adaptive playback',
            detail: 'Support modern listening surfaces without splitting the operating model into separate stacks.',
            meta: 'Distribution',
          },
        ]),
        slice('content_columns', 'project_context', {
          eyebrow: 'Project premise',
          title: 'Move from improvised streaming plumbing to a delivery system operators can read quickly.',
          body:
            'Audio Streaming Stack is designed for teams that need a clean first implementation boundary: dependable live delivery, explicit failure handling, and enough visibility to hand the system between engineers without folklore.',
          panelTitle: 'Where it fits best',
          panelBody:
            'Use it when the streaming layer is the urgent issue today, but the architecture still needs room to connect with scheduling and metadata work later.',
        }, [
          {
            title: 'Broadcast continuity',
            text: 'Keep primary ingest, fallback behavior, and listener-facing outputs within one operational frame.',
          },
          {
            title: 'Implementation posture',
            text: 'Adopt it as a self-hosted core with guided rollout help rather than a black-box managed service.',
          },
          {
            title: 'Expansion path',
            text: 'Layer in adjacent Sonicverse projects once the delivery baseline is stable and observable.',
          },
        ]),
        slice('feature_grid', 'project_capabilities', {
          eyebrow: 'Capability depth',
          title: 'The core capabilities stay close to the incidents teams already recognize.',
          body:
            'Each capability is framed around an operational job, so the page reads like a briefing for engineers and operators instead of a generic feature list.',
        }, [
          {
            title: 'Ingest and relay control',
            text: 'Model the source path clearly enough that relay failures, silence events, and downstream breakage stop feeling mysterious.',
          },
          {
            title: 'Playback coverage',
            text: 'Serve direct streams and HLS outputs from the same delivery baseline so product and broadcast needs stay aligned.',
          },
          {
            title: 'Resilience rules',
            text: 'Treat fallback as a first-class operating concern instead of a late-stage patch on top of a fragile relay chain.',
          },
          {
            title: 'Readable operations',
            text: 'Give the next engineer a system they can inspect, extend, and reason about without reverse-engineering hidden assumptions.',
          },
        ]),
        slice('proof_band', 'project_specs', {
          eyebrow: 'Operational notes',
          title: 'The shortest technical read before the walkthrough.',
        }, [
          { label: 'Deployment style', value: 'Self-hosted core with guided rollout and support options.' },
          { label: 'Failure handling', value: 'Failover-first design with explicit continuity controls.' },
          { label: 'Playback outputs', value: 'Direct streams and HLS from one operational baseline.' },
          { label: 'Architecture posture', value: 'Composable with existing broadcast tooling and orchestration.' },
        ]),
        slice('call_to_action', 'project_next', {
          eyebrow: 'Choose the next read',
          title: 'Plan the rollout with the Sonicverse team.',
          body:
            'If live delivery is the immediate priority, we can map a phased rollout and next milestones based on your current stack.',
          primaryLabel: 'Book a streaming review',
          primaryHref: '/contact',
          secondaryLabel: 'Talk to engineering',
          secondaryHref: '/contact',
        }),
      ],
    },
  },
  {
    id: 'media-metadata-api',
    uid: 'media-metadata-api',
    url: '/projects/media-metadata-api',
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
        slice('hero', 'project_detail', {
          eyebrow: 'Metadata systems project',
          title: 'A shared contract for metadata before format drift becomes release debt.',
          body:
            'Media Metadata API gives archive, platform, and publishing teams one programmable boundary for reading, validating, and transforming metadata without maintaining a new parser for every system.',
          primaryLabel: 'Book a metadata review',
          primaryHref: '/contact',
          secondaryLabel: 'View all projects',
          secondaryHref: '/projects',
          supportingLabel: 'Use when metadata disagreements are slowing publishing',
          supportingText:
            'Built for engineering groups that need consistency across ingest, archives, feeds, and downstream app surfaces without hiding the rules inside four separate services.',
          visualEyebrow: 'Schema dossier',
          visualTitle: 'What this project simplifies first.',
          visualBody:
            'The page leads with normalization, validation, and rollout shape so teams can see exactly where the shared service boundary sits.',
          tone: 'emerald',
        }, [
          {
            label: 'Signal 01',
            title: 'One contract across format families',
            detail: 'Read and write ID3, Vorbis, MP4, and RSS through a stable interface instead of format-specific branches.',
            meta: 'Abstraction',
          },
          {
            label: 'Signal 02',
            title: 'Validation rules that live in one place',
            detail: 'Centralize transformation logic so batch processing and editorial tooling stop drifting apart.',
            meta: 'Consistency',
          },
          {
            label: 'Signal 03',
            title: 'Cleaner outputs for publishing systems',
            detail: 'Return release-ready payloads that are easier to pass into archives, players, apps, and syndication.',
            meta: 'Distribution',
          },
        ]),
        slice('content_columns', 'project_context', {
          eyebrow: 'Project premise',
          title: 'Use a shared metadata layer when the pipeline already has too many private translations.',
          body:
            'Media Metadata API is for teams that feel the tax of format drift every week: inconsistent fields, duplicated validation, and brittle publishing adapters that all evolve at different speeds.',
          panelTitle: 'Where it fits best',
          panelBody:
            'Adopt it when ingest, archive, and publishing teams all touch metadata, but no one wants another scattered rules engine.',
        }, [
          {
            title: 'Ingest normalization',
            text: 'Stabilize incoming files before they touch storage, QA, or editorial tooling.',
          },
          {
            title: 'Archive consistency',
            text: 'Keep long-lived media collections structurally searchable instead of accepting silent schema drift.',
          },
          {
            title: 'Publishing readiness',
            text: 'Expose one cleaner service boundary for feeds, apps, and distribution adapters to consume.',
          },
        ]),
        slice('feature_grid', 'project_capabilities', {
          eyebrow: 'Capability depth',
          title: 'The implementation work is framed around the metadata debt teams already feel.',
          body:
            'The page avoids generic API language and instead shows where the shared service removes repeated transformation and validation work.',
        }, [
          {
            title: 'Format abstraction',
            text: 'Collapse multiple metadata families behind one service boundary without losing the structure each workflow needs.',
          },
          {
            title: 'Batch-safe automation',
            text: 'Process large media libraries with validation rules that behave predictably across bulk ingest and ongoing edits.',
          },
          {
            title: 'Podcast-aware fields',
            text: 'Handle chapters, season metadata, episode typing, and distribution quirks without inventing another bespoke adapter.',
          },
          {
            title: 'Cleaner downstream integrations',
            text: 'Reduce the edge-case logic living inside archives, publishing systems, and third-party connectors.',
          },
        ]),
        slice('proof_band', 'project_specs', {
          eyebrow: 'Operational notes',
          title: 'The shortest technical read before the walkthrough.',
        }, [
          { label: 'Format scope', value: 'ID3, Vorbis, MP4, RSS, and related publishing payloads.' },
          { label: 'Best fit', value: 'Archive and platform teams with multiple metadata touchpoints.' },
          { label: 'Adoption shape', value: 'API-first rollout with validation and transformation rules centralized.' },
          { label: 'Primary gain', value: 'Predictable metadata flows instead of duplicated parser logic.' },
        ]),
        slice('call_to_action', 'project_next', {
          eyebrow: 'Choose the next read',
          title: 'Map the shared service or open the adjacent project.',
          body:
            'Teams that standardize metadata often next look at streaming delivery or scheduling control, depending on where the operational pressure sits.',
          primaryLabel: 'Book a metadata review',
          primaryHref: '/contact',
          secondaryLabel: 'Talk to Sonicverse',
          secondaryHref: '/contact',
        }, [
          {
            label: 'Audio Streaming Stack',
            href: '/projects/audio-streaming-stack',
            detail: 'Open the delivery project when metadata quality needs to line up with a more dependable live streaming layer.',
            meta: 'Related project',
          },
          {
            label: 'Broadcast Scheduler',
            href: '/projects/broadcast-scheduler',
            detail: 'Open the scheduling project when publishing metadata also needs to stay aligned with programming and fallback decisions.',
            meta: 'Related project',
          },
        ]),
      ],
    },
  },
  {
    id: 'broadcast-scheduler',
    uid: 'broadcast-scheduler',
    url: '/projects/broadcast-scheduler',
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
        slice('hero', 'project_detail', {
          eyebrow: 'Planning and operations project',
          title: 'A scheduling control layer for teams tired of overrides living in three different places.',
          body:
            'Broadcast Scheduler gives station planners and operators one readable surface for recurring blocks, live overrides, export logic, and fallback programming without hiding the rules inside spreadsheets.',
          primaryLabel: 'Book an operations review',
          primaryHref: '/contact',
          secondaryLabel: 'View all projects',
          secondaryHref: '/projects',
          supportingLabel: 'Use when planning and continuity are constantly crossing wires',
          supportingText:
            'Built for radio and audio teams that need schedule changes, live exceptions, and downstream handoffs to stay legible under real operating pressure.',
          visualEyebrow: 'Control dossier',
          visualTitle: 'What this project clarifies first.',
          visualBody:
            'The page centers shared control, override visibility, and rollout pragmatism before it ever drifts into generic scheduling language.',
          tone: 'amber',
        }, [
          {
            label: 'Signal 01',
            title: 'Recurring structure without spreadsheet debt',
            detail: 'Keep daily and weekly programming blocks stable without rebuilding the schedule manually every time the grid changes.',
            meta: 'Planning',
          },
          {
            label: 'Signal 02',
            title: 'Overrides that operators can actually see',
            detail: 'Make live exceptions explicit before they turn into continuity surprises downstream.',
            meta: 'Live control',
          },
          {
            label: 'Signal 03',
            title: 'Fallback logic attached to the plan',
            detail: 'Connect continuity rules to the same surface that holds the schedule instead of managing them as a separate emergency layer.',
            meta: 'Continuity',
          },
        ]),
        slice('content_columns', 'project_context', {
          eyebrow: 'Project premise',
          title: 'Treat schedule logic like an operating system, not a collection of local workarounds.',
          body:
            'Broadcast Scheduler is aimed at teams where planning, playout, and continuity all matter, but no one wants the station runbook to depend on side conversations and fragile manual exports.',
          panelTitle: 'Where it fits best',
          panelBody:
            'Adopt it when the schedule itself is the workflow bottleneck and the team needs shared control without replacing every downstream system at once.',
        }, [
          {
            title: 'Shared planning surface',
            text: 'Bring recurring blocks, live windows, and exceptions into one place so handoffs stop depending on tribal knowledge.',
          },
          {
            title: 'Continuity posture',
            text: 'Tie fallback and safety-net behavior to the schedule instead of hoping operators remember the last-minute workaround.',
          },
          {
            title: 'Integration path',
            text: 'Feed existing playout systems and adapters while improving the planning model upstream.',
          },
        ]),
        slice('feature_grid', 'project_capabilities', {
          eyebrow: 'Capability depth',
          title: 'The implementation is framed around the operational moments station teams actually feel.',
          body:
            'Each capability is described as a control problem: planning the day, handling exceptions, maintaining continuity, and exporting a schedule other systems can trust.',
        }, [
          {
            title: 'Schedule builder',
            text: 'Model recurring blocks, live shows, and override windows without rebuilding the broadcast day by hand.',
          },
          {
            title: 'Fallback logic',
            text: 'Keep continuity intact with playlist and rule-based fallback behavior that lives next to the schedule itself.',
          },
          {
            title: 'Adapter layer',
            text: 'Connect scheduler output to the playout tools you already run rather than forcing a wholesale replacement.',
          },
          {
            title: 'Operational traceability',
            text: 'Give planners and operators a shared control surface that is easier to audit, explain, and maintain.',
          },
        ]),
        slice('proof_band', 'project_specs', {
          eyebrow: 'Operational notes',
          title: 'The shortest technical read before the walkthrough.',
        }, [
          { label: 'Operating mode', value: 'Supports live, automated, and fallback programming in one model.' },
          { label: 'Integration style', value: 'Designed to feed existing playout and broadcast tooling.' },
          { label: 'Primary gain', value: 'Shared control instead of brittle scheduling handoffs.' },
          { label: 'Best fit', value: 'Stations and audio ops teams coordinating live exceptions regularly.' },
        ]),
        slice('call_to_action', 'project_next', {
          eyebrow: 'Choose the next read',
          title: 'Map the planning layer or open the adjacent project.',
          body:
            'Teams that stabilize scheduling often next connect it to delivery reliability or metadata quality, depending on where the station workflow is still leaking time.',
          primaryLabel: 'Book an operations review',
          primaryHref: '/contact',
          secondaryLabel: 'Ask a project question',
          secondaryHref: '/contact',
        }, [
          {
            label: 'Audio Streaming Stack',
            href: '/projects/audio-streaming-stack',
            detail: 'Open the delivery project when continuity planning also needs the streaming layer to fail over cleanly.',
            meta: 'Related project',
          },
          {
            label: 'Media Metadata API',
            href: '/projects/media-metadata-api',
            detail: 'Open the metadata project when schedule control needs to stay aligned with publishing and archive structure.',
            meta: 'Related project',
          },
        ]),
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
            'Sonicverse gives broadcasters, podcast networks, and media platforms three connected projects for live delivery, metadata automation, and scheduling control, without locking teams into a black-box stack.',
          primaryLabel: 'Book a demo',
          primaryHref: '/contact',
          secondaryLabel: 'Explore projects',
          secondaryHref: '/projects',
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
            label: 'Project clarity',
            title: 'Choose the right project in one pass',
            detail: 'Visitors can understand what each project does, who it is for, and how the projects connect before they talk to sales.',
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
          { label: 'Open-source project core', value: 'Inspect the stack, self-host it, and adopt it on your own timeline.' },
          { label: 'Three connected projects', value: 'Delivery, metadata, and scheduling live in one coherent platform story.' },
          { label: 'Designed for modern audio teams', value: 'Built for broadcasters, podcast networks, and platform engineering groups.' },
        ]),
        slice('product_suite', 'overview', {
          eyebrow: 'Project ecosystem',
          title: 'Choose the workflow layer that solves today’s bottleneck without losing the bigger platform picture.',
          body:
            'Every project has a clear buyer, a concrete operational outcome, and a direct route into a demo or deeper review.',
          ctaLabel: 'Compare projects',
          ctaHref: '/projects',
        }),
        slice('content_columns', 'operatingModel', {
          eyebrow: 'Problem to solution',
          title: 'Most teams are not missing ambition. They are missing a system that makes audio operations coherent.',
          body:
            'Streaming reliability, metadata quality, and programming control often live in separate tools with separate owners. Sonicverse turns those disconnected decisions into one operational model.',
          panelTitle: 'What changes with Sonicverse',
          panelBody:
            'Instead of buying another isolated tool, teams get projects that solve a job today while fitting into a broader platform over time.',
        }, [
          {
            title: 'Less project confusion',
            text: 'Every project is framed around a specific workflow, team, and operational win so buyers can self-identify quickly.',
          },
          {
            title: 'Stronger technical credibility',
            text: 'The messaging emphasizes architecture, rollout paths, and extensibility rather than vague transformation language.',
          },
          {
            title: 'Cleaner conversion paths',
            text: 'Visitors can book a demo, compare projects, or start with a single project page depending on where they are in the buying journey.',
          },
        ]),
        slice('feature_grid', 'platform', {
          eyebrow: 'Why the platform converts',
          title: 'The homepage now sells the platform the way the projects deserve to be evaluated.',
          body:
            'Each section is built to answer a real buying question, from product fit to deployment confidence to the next logical action.',
        }, [
          {
            title: 'Value in under five seconds',
            text: 'The hero states what Sonicverse does, who it serves, and why a platform approach matters before users scroll.',
          },
          {
            title: 'Project-first storytelling',
            text: 'The ecosystem section makes the project map legible immediately instead of forcing visitors to infer how separate projects connect.',
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
          title: 'Start with the project that matches your team’s immediate pressure point.',
          body:
            'Sonicverse works as a platform, but adoption does not need to happen all at once. The homepage helps each buyer recognize the right first step.',
          panelTitle: 'Common entry points',
          panelBody:
            'Use the project map to route broadcasters, podcast networks, and platform engineering teams to the right project page or demo flow.',
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
          title: 'Book a focused walkthrough, compare the projects, or start with the workflow layer that fits right now.',
          body:
            'The homepage keeps the platform story clear while still giving every visitor an obvious path forward, from self-serve exploration to a sales conversation.',
          primaryLabel: 'Book a demo',
          primaryHref: '/contact',
          secondaryLabel: 'Explore projects',
          secondaryHref: '/projects',
        }, [
          { label: 'Talk to the team', href: '/contact' },
          { label: 'Join the community', href: '/community' },
          { label: 'View on GitHub', href: 'https://github.com/sonicverse-eu' },
        ]),
      ],
    },
  },
  {
    id: 'projects',
    uid: 'projects',
    url: '/projects',
    type: 'page',
    data: {
      title: 'Projects',
      metaTitle: 'Projects | Sonicverse',
      metaDescription:
        'Read the Sonicverse project lineup and find the right workflow layer for streaming, metadata, or broadcast operations.',
      slices: [
        slice('hero', 'projects_overview', {
          eyebrow: 'Projects',
          title: 'Read the flagship Sonicverse project like a technical brief, then plan your rollout.',
          body:
            'This overview keeps buyer fit, operational outcomes, and implementation boundaries visible before anyone commits to a demo.',
          primaryLabel: 'Explore Audio Streaming Stack',
          primaryHref: '#project-suite',
          secondaryLabel: 'Book a demo',
          secondaryHref: '/contact',
          supportingLabel: 'One project. A clear first implementation path.',
          supportingText:
            'Start with live delivery reliability, then extend from a stable baseline.',
          visualEyebrow: 'Project map',
          visualTitle: 'Pick the first implementation boundary, then go deeper.',
          visualBody:
            'The overview stays wide and scannable so teams can compare audience, outcome, and technical signal in one pass.',
          tone: 'brand',
        }, [
          {
            label: 'Streaming infrastructure',
            title: 'Audio Streaming Stack',
            detail: 'Best when uptime, failover, and listener delivery are the immediate risk.',
            meta: 'For broadcasters and live audio teams',
            href: '/projects/audio-streaming-stack',
          },
        ]),
        slice('product_suite', 'editorial_compare', {
          eyebrow: 'Lineup',
          title: 'Compare the project lineup by use case, buyer, and operational outcome.',
          body:
            'Each row is meant to answer the same three questions quickly: who is it for, what operational pressure does it reduce, and what signal tells you it is the right first move?',
          ctaLabel: 'Need help choosing? Contact us',
          ctaHref: '/contact',
        }),
        slice('content_columns', 'project_paths', {
          eyebrow: 'Choosing a starting point',
          title: 'Most teams do not need the whole platform first. They need the right project first.',
          body:
            'The overview is built to route teams by the operational bottleneck they already feel, not by abstract platform ambition.',
          panelTitle: 'Typical starting paths',
          panelBody:
            'Start with delivery when uptime, failover behavior, and listener experience are under pressure.',
        }, [
          {
            title: 'If uptime is the issue',
            text: 'Start with Audio Streaming Stack when live distribution, failover, and playback reliability are the highest priorities.',
          },
        ]),
        slice('call_to_action', 'projects_cta', {
          eyebrow: 'Need the map in context?',
          title: 'We can walk through your current stack and point to the right first project.',
          body:
            'That conversation works whether you are replacing one workflow now or planning a broader infrastructure refresh over time.',
          primaryLabel: 'Book a project walkthrough',
          primaryHref: '/contact',
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
        slice('hero', 'pricing_story', {
          eyebrow: 'Pricing',
          title: 'Open-source by default. Commercial support when your rollout needs it.',
          body:
            'Sonicverse keeps the product core open while offering structured help for teams that need architecture guidance, implementation support, or a faster path to deployment.',
          primaryLabel: 'Book a demo',
          primaryHref: '/contact',
          secondaryLabel: 'Contact us',
          secondaryHref: '/contact',
          supportingLabel: 'Commercial shape',
          supportingText:
            'The route should make it obvious what stays open, when expert help matters, and what kind of engagement follows from each choice.',
          visualEyebrow: 'Engagement map',
          visualTitle: 'Three routes, one consistent operating model.',
          visualBody:
            'The pricing story stays closer to rollout posture than feature gating: self-serve adoption, a structured pilot, or a deeper partnership.',
          commandLabel: 'Business model',
          commandValue: 'Open core first',
          tone: 'amber',
        }, [
          {
            label: 'Route 01',
            title: 'Start self-serve',
            detail: 'Use the open projects directly when the team already has implementation capacity and wants full control.',
            meta: 'Open core',
          },
          {
            label: 'Route 02',
            title: 'Run a pilot',
            detail: 'Add architecture guidance and rollout checkpoints when technical fit is still being validated in a live environment.',
            meta: 'Guided evaluation',
          },
          {
            label: 'Route 03',
            title: 'Partner long term',
            detail: 'Move into roadmap collaboration and deeper systems work when adoption spans several workflows or teams.',
            meta: 'Platform partnership',
          },
        ]),
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
            description: 'Use the projects, self-host, and adapt the stack on your own schedule.',
            feature_1: 'Full source access',
            feature_2: 'Community-led adoption',
            feature_3: 'Self-serve documentation',
            feature_4: 'Best for technical teams that want maximum control',
            cta_label: 'Explore projects',
            cta_href: '/projects',
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
            cta_href: '/contact',
          },
          {
            tier: 'Platform Partnership',
            price: 'Custom',
            cadence: 'Ongoing',
            description: 'Longer-term collaboration for organizations building on Sonicverse as part of their platform stack.',
            feature_1: 'Roadmap collaboration',
            feature_2: 'Priority support',
            feature_3: 'Systems integration guidance',
            feature_4: 'Best for multi-project adoption and operational change',
            cta_label: 'Talk to Sonicverse',
            cta_href: '/contact',
          },
        ]),
        slice('proof_band', 'metrics', {
          eyebrow: 'What pricing communicates',
          title: 'A pricing model that keeps adoption easy and enterprise conversations legible.',
        }, [
          { label: 'Open-source first', value: 'No gated product core or artificial evaluation barrier.' },
          { label: 'Commercial help when needed', value: 'Support is tied to rollout complexity, not feature access.' },
          { label: 'Clear conversion paths', value: 'Pricing routes visitors into either self-serve adoption or a structured demo.' },
        ]),
        slice('call_to_action', 'pricing_cta', {
          eyebrow: 'Need a faster recommendation?',
          title: 'We can map the right path from your current workflow pressure, team shape, and rollout pace.',
          body:
            'That conversation can stay practical from the first reply: what is open, what needs support, and what the next milestone should look like.',
          primaryLabel: 'Book a pricing walkthrough',
          primaryHref: '/contact',
          secondaryLabel: 'Talk to Sonicverse',
          secondaryHref: '/contact',
        }),
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
        slice('hero', 'manifesto', {
          eyebrow: 'About Sonicverse',
          title: 'An open-source company story with the discipline of a product platform.',
          body:
            'Sonicverse exists to give modern audio teams infrastructure they can trust, understand, and adapt without getting locked into brittle closed systems.',
          primaryLabel: 'Explore projects',
          primaryHref: '/projects',
          secondaryLabel: 'Read the journal',
          secondaryHref: '/blog',
          supportingLabel: 'What stays constant',
          supportingText:
            'Open infrastructure, product-grade clarity, and workflows teams can still reason about after handoff.',
          visualEyebrow: 'Operating stance',
          visualTitle: 'A company narrative that still sounds like implementation reality.',
          visualBody:
            'The about page should explain the mission with enough operational signal that contributors, partners, and buyers all recognize the same system.',
          commandLabel: 'Company mode',
          commandValue: 'Built in public',
          tone: 'emerald',
        }, [
          {
            label: 'Principle 01',
            title: 'Open standards over closed leverage',
            detail: 'We build for teams that want portability, long-term maintainability, and systems they can keep understanding as they grow.',
            meta: 'Interoperability',
          },
          {
            label: 'Principle 02',
            title: 'Product-grade framing for infrastructure work',
            detail: 'The UX, docs, and customer journey should be as deliberate as the runtime and APIs.',
            meta: 'Clarity',
          },
          {
            label: 'Principle 03',
            title: 'A contribution path that scales with adoption',
            detail: 'Community credibility and commercial maturity should reinforce each other instead of pulling in opposite directions.',
            meta: 'Continuity',
          },
        ]),
        slice('content_columns', 'mission', {
          eyebrow: 'What we believe',
          title: 'Open systems work best when the product story is as rigorous as the architecture.',
          body:
            'The company story now has to carry contributors, operators, and buyers through the same site without forcing them into different versions of Sonicverse.',
          panelTitle: 'Principles',
          panelBody:
            'Composability, technical legibility, and editorial maintainability are all product decisions here, not just engineering preferences.',
        }, [
          { title: 'Composable by default', text: 'Each project can stand alone while still fitting into a broader platform story.' },
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
          { title: 'Better project routing', text: 'Navigation and page composition make the multi-project structure obvious from the first screen.' },
          { title: 'Stronger visual trust', text: 'The new design uses cleaner surfaces, denser signal, and more confident product framing.' },
          { title: 'One cohesive system', text: 'Typography, spacing, cards, CTAs, and section rhythm all work from the same design rules.' },
        ]),
        slice('call_to_action', 'about_cta', {
          eyebrow: 'Read the system in action',
          title: 'The clearest way to understand the company is to open the project, journal, and contribution paths built from the same rules.',
          body:
            'That continuity is the point: one brand system, several distinct page families, and a clearer path through the platform story.',
          primaryLabel: 'Explore projects',
          primaryHref: '/projects',
          secondaryLabel: 'Join the community',
          secondaryHref: '/community',
        }),
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
        slice('hero', 'contact', {
          eyebrow: 'Contact',
          title: 'Start the right conversation without getting bounced around.',
          body:
            'Tell us what is under pressure, what you are evaluating, or where the workflow is getting stuck. We will keep the first reply specific and route it quickly.',
          primaryLabel: 'Start a request',
          primaryHref: '#contact-panel',
          secondaryLabel: 'Browse the blog',
          secondaryHref: '/blog',
          supportingLabel: 'Reply window',
          supportingText:
            'Most first replies land within two business days, with the same thread reference kept across follow-up.',
          visualEyebrow: 'Reply guide',
          visualTitle: 'A faster first reply starts with a little context.',
          visualBody:
            'You do not need a polished brief. A few concrete details help us point you to the right person, docs, or next step.',
          tone: 'brand',
        }, [
          {
            label: 'Best first step',
            title: 'Name the pressure point',
            detail:
              'Tell us whether the blocker is support, product fit, implementation context, or partnerships.',
          },
          {
            label: 'Helpful, not required',
            title: 'Add a link if one exists',
            detail: 'Issue threads, docs, repositories, or rollout notes are enough.',
          },
          {
            label: 'Need a direct path?',
            title: 'Email and community links sit below',
            detail: 'Use the form when you want routing help. Use the direct channels when you already know the lane.',
          },
        ]),
        slice('contact_panel', 'contact', {
          eyebrow: 'Talk to Sonicverse',
          title: 'Share context once. We’ll keep the follow-up tight and useful.',
          body:
            'The contact flow is designed for support, partnerships, architecture questions, and product-fit conversations. If you already know the lane, the direct paths are right here.',
          panelTitle: 'Direct channels',
          panelBody:
            'Use email for specific questions, the community for open collaboration, and GitHub when the conversation belongs next to code.',
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
    url: '/contact',
    type: 'page',
    data: {
      title: 'Demo',
      metaTitle: 'Book a Demo | Sonicverse',
      metaDescription:
        'Book a focused Sonicverse walkthrough and map the right project or rollout path for your team.',
      slices: [
        slice('hero', 'demo_path', {
          eyebrow: 'Book a demo',
          title: 'Get a focused walkthrough of the project lineup and the workflow that matters most.',
          body:
            'The demo path is optimized for buyers and technical teams that want project fit, implementation context, and a clear next-step recommendation.',
          primaryLabel: 'Send a demo request',
          primaryHref: '#contact-panel',
          secondaryLabel: 'See projects first',
          secondaryHref: '/projects',
          supportingLabel: 'Best when',
          supportingText:
            'You want a product-fit conversation that stays tied to the workflow under pressure, not a broad platform tour with no recommendation at the end.',
          visualEyebrow: 'Session map',
          visualTitle: 'A productive walkthrough should feel more like triage than theater.',
          visualBody:
            'We use the request context to shape the session: project fit, current blockers, and the clearest next step after the call.',
          commandLabel: 'Session type',
          commandValue: 'Focused walkthrough',
          tone: 'violet',
        }, [
          {
            label: 'Step 01',
            title: 'Name the workflow',
            detail: 'Pick the delivery, metadata, scheduling, or contributor flow you want to understand first.',
            meta: 'Scoping',
          },
          {
            label: 'Step 02',
            title: 'Show the friction',
            detail: 'Bring the current blockers, system constraints, or rollout pressure points so we can route the conversation quickly.',
            meta: 'Context',
          },
          {
            label: 'Step 03',
            title: 'Leave with a recommendation',
            detail: 'The ideal demo ends with a clearer first project, a rollout shape, and the best next action.',
            meta: 'Decision',
          },
        ]),
        slice('proof_band', 'demo_brief', {
          eyebrow: 'What the session covers',
          title: 'A practical walkthrough, shaped around the operating question you already have.',
        }, [
          { label: 'Project fit', value: 'Which project solves the pressure point most directly right now.' },
          { label: 'Implementation context', value: 'The constraints, integrations, and rollout shape that matter most.' },
          { label: 'Next move', value: 'Whether the right follow-up is self-serve adoption, a pilot, or a broader conversation.' },
        ]),
        slice('contact_panel', 'demo', {
          eyebrow: 'Demo intake',
          title: 'Tell us which workflow you want to see and where your current stack is getting stuck.',
          body:
            'We’ll use that context to keep the session project-specific and useful for both technical and commercial stakeholders.',
          panelTitle: 'Typical demo topics',
          panelBody:
            'Platform overviews, project-fit assessments, migration planning, and architecture reviews.',
          formMode: 'demo',
        }, [
          { label: 'Best for', value: 'Pilots and product-fit evaluation', href: '/contact' },
          { label: 'Response window', value: 'Usually within 2 business days', href: '/contact' },
          { label: 'Need docs first?', value: 'Explore the blog', href: '/blog' },
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
        slice('hero', 'community_network', {
          eyebrow: 'Community',
          title: 'An open-source platform deserves a contribution experience that feels modern too.',
          body:
            'Sonicverse is still built in the open. The redesigned site makes that community story easier to discover without weakening the product narrative.',
          primaryLabel: 'View GitHub',
          primaryHref: 'https://github.com/sonicverse-eu',
          secondaryLabel: 'Contact the team',
          secondaryHref: '/contact',
          supportingLabel: 'Contribution posture',
          supportingText:
            'The goal is a path that feels welcoming, legible, and clearly connected to the real platform work underneath it.',
          visualEyebrow: 'Ecosystem lanes',
          visualTitle: 'Contribution paths should feel like part of the platform, not an afterthought around it.',
          visualBody:
            'The page now frames open-source participation with the same confidence as the product routes: clear entry points, visible signal, and better next actions.',
          commandLabel: 'Contribution model',
          commandValue: 'Open by default',
          tone: 'emerald',
        }, [
          {
            label: 'Lane 01',
            title: 'Platform work',
            detail: 'Runtime, APIs, adapters, and deployment workflows for teams working close to the core system.',
            meta: 'Engineering',
          },
          {
            label: 'Lane 02',
            title: 'Docs and examples',
            detail: 'Guides, demos, onboarding material, and implementation notes that make adoption easier to sustain.',
            meta: 'Documentation',
          },
          {
            label: 'Lane 03',
            title: 'Community support',
            detail: 'Review help, events, moderation, and contributor care that keeps the ecosystem healthy as it grows.',
            meta: 'Stewardship',
          },
        ]),
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
        slice('call_to_action', 'community_cta', {
          eyebrow: 'Choose your entry point',
          title: 'Open the code, read the field notes, or start a direct conversation about where you can plug in.',
          body:
            'The community route should work for experienced maintainers, first-time contributors, implementation partners, and teams still deciding how close they want to get.',
          primaryLabel: 'Open GitHub',
          primaryHref: 'https://github.com/sonicverse-eu',
          secondaryLabel: 'Read the journal',
          secondaryHref: '/blog',
        }),
      ],
    },
  },
  {
    id: 'blog',
    uid: 'blog',
    url: '/blog',
    type: 'page',
    data: {
      title: 'Journal',
      metaTitle: 'Blog | Sonicverse',
      metaDescription:
        'Read Sonicverse product notes, roadmap updates, and community progress in one editorial archive.',
      articleShell: {
        backLabel: 'Back to journal',
        mark: 'Sonicverse Journal',
        primarySectionEyebrow: 'Continue reading',
        primarySectionTitle: 'Next in the archive.',
        secondarySectionEyebrow: 'Related posts',
        secondarySectionTitle: 'More on this topic.',
        browseAllLabel: 'Browse all posts',
      },
      slices: [
        slice('hero', 'blog_journal', {
          mark: 'Sonicverse Journal',
          eyebrow: 'Updates',
          title: 'Product notes, roadmap, and community progress.',
          body:
            'The journal keeps launches, implementation notes, and contributor progress in one place so readers can follow what Sonicverse is building in public.',
          primaryLabel: 'Browse archive',
          primaryHref: '#blog-archive',
          secondaryLabel: 'Explore projects',
          secondaryHref: '/projects',
          visualEyebrow: 'Current signal',
          visualTitle: 'Latest note',
          tone: 'brand',
        }),
        slice('content_feed', 'journal_archive', {
          spotlightEyebrow: 'Featured bulletin',
          spotlightTitle: 'The latest note, framed like a release bulletin.',
          spotlightBody:
            'The lead story should feel editorial, but still point back to real product motion and contributor progress.',
          featuredCtaLabel: 'Read article',
          archiveEyebrow: 'Archive',
          archiveTitle: 'Read the journal like a running field report from the platform.',
          archiveBody:
            'The archive is organized for fast scanning: topic rail on one side, entries and reading time on the other.',
          archiveCtaLabel: 'Open note',
          railEyebrow: 'Tracked topics',
          railTitle: 'Jump into the archive by theme.',
          footerEyebrow: 'Archive signal',
          footerTitle: 'Follow the notes, then step into the work behind them.',
          footerBody:
            'Every note should help readers move from narrative into a project, guide, or contributor path without losing the editorial feel of the journal.',
          primaryLabel: 'Explore projects',
          primaryHref: '/projects',
          secondaryLabel: 'Join the community',
          secondaryHref: '/community',
        }),
      ],
    },
  },
];
