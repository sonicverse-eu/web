interface QuotePanelProps {
  text: string;
  cite?: string;
}

export function QuotePanel({ text, cite }: QuotePanelProps) {
  return (
    <figure className="quote-panel card bg-base-100 shadow-lg" data-reveal>
      <blockquote>{text}</blockquote>
      {cite && <figcaption>{cite}</figcaption>}
    </figure>
  );
}
