interface QuotePanelProps {
  text: string;
  cite?: string;
}

export function QuotePanel({ text, cite }: QuotePanelProps) {
  return (
    <figure className="quote-panel" data-reveal>
      <blockquote>{text}</blockquote>
      {cite && <figcaption>{cite}</figcaption>}
    </figure>
  );
}
