import Markdoc from '@markdoc/markdoc';
import React from 'react';
import { CalloutPanel } from '@/components/markdoc/CalloutPanel';
import { ChecklistSection } from '@/components/markdoc/ChecklistSection';
import { StepsSection } from '@/components/markdoc/StepsSection';
import { QuotePanel } from '@/components/markdoc/QuotePanel';
import { StatPanel } from '@/components/markdoc/StatPanel';
import { CtaInlineCard } from '@/components/markdoc/CtaInlineCard';

const markdocConfig = {
  tags: {
    callout: {
      render: 'CalloutPanel',
      attributes: {
        title: { type: String },
        eyebrow: { type: String },
        tone: { type: String },
      },
    },
    checklist: {
      render: 'ChecklistSection',
      attributes: {
        title: { type: String, required: true },
        eyebrow: { type: String },
      },
    },
    steps: {
      render: 'StepsSection',
      attributes: {
        title: { type: String, required: true },
        eyebrow: { type: String },
      },
    },
    quote: {
      render: 'QuotePanel',
      attributes: {
        text: { type: String, required: true },
        cite: { type: String },
      },
    },
    stat: {
      render: 'StatPanel',
      attributes: {
        value: { type: String, required: true },
        label: { type: String, required: true },
        note: { type: String },
      },
    },
    ctaCard: {
      render: 'CtaInlineCard',
      attributes: {
        title: { type: String, required: true },
        summary: { type: String, required: true },
        href: { type: String, required: true },
        label: { type: String },
      },
    },
  },
};

const components = {
  CalloutPanel,
  ChecklistSection,
  StepsSection,
  QuotePanel,
  StatPanel,
  CtaInlineCard,
};

export function renderMarkdoc(content: string): React.ReactNode {
  if (!content.trim()) return null;
  const ast = Markdoc.parse(content);
  const transformed = Markdoc.transform(ast, markdocConfig);
  return Markdoc.renderers.react(transformed, React, { components });
}
