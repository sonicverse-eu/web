import { component, defineMarkdocConfig } from '@astrojs/markdoc/config';

export default defineMarkdocConfig({
  tags: {
    callout: {
      render: component('./src/components/CalloutPanel.astro'),
      attributes: {
        title: { type: String },
        eyebrow: { type: String },
        tone: { type: String }
      }
    },
    checklist: {
      render: component('./src/components/ChecklistSection.astro'),
      attributes: {
        title: { type: String, required: true },
        eyebrow: { type: String }
      }
    },
    steps: {
      render: component('./src/components/StepsSection.astro'),
      attributes: {
        title: { type: String, required: true },
        eyebrow: { type: String }
      }
    },
    quote: {
      render: component('./src/components/QuotePanel.astro'),
      attributes: {
        text: { type: String, required: true },
        cite: { type: String }
      }
    },
    stat: {
      render: component('./src/components/StatPanel.astro'),
      attributes: {
        value: { type: String, required: true },
        label: { type: String, required: true },
        note: { type: String }
      }
    },
    ctaCard: {
      render: component('./src/components/CtaInlineCard.astro'),
      attributes: {
        title: { type: String, required: true },
        summary: { type: String, required: true },
        href: { type: String, required: true },
        label: { type: String }
      }
    }
  }
});
