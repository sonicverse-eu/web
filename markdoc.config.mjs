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
    }
  }
});
