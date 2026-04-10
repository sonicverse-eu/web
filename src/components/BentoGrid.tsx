export interface BentoFeature {
  title: string;
  summary: string;
  eyebrow?: string;
}

interface BentoGridProps {
  features: BentoFeature[];
}

const accentSteps = ['a', 'b', 'c', 'd', 'e', 'f'];

function spanFor(i: number, total: number): string {
  if (total <= 1) return 'bento-item--wide';
  if (total === 2) return 'bento-item--half';
  if (total === 3) return i === 0 ? 'bento-item--wide' : 'bento-item--half';
  if (total === 4) {
    return (
      ['bento-item--lead', 'bento-item--tall', 'bento-item--small', 'bento-item--small'][i] ??
      'bento-item--small'
    );
  }
  const pattern = [
    'bento-item--lead',
    'bento-item--tall',
    'bento-item--wide',
    'bento-item--small',
    'bento-item--small',
  ];
  return pattern[i] ?? 'bento-item--small';
}

export default function BentoGrid({ features }: BentoGridProps) {
  return (
    <div className="bento-grid" data-reveal-group>
      {features.map((feature, i) => (
        <article
          key={feature.title}
          className={`bento-item ${spanFor(i, features.length)} bento-item--accent-${accentSteps[i % accentSteps.length]}`}
          data-reveal
          data-reveal-delay={(i * 0.08).toFixed(2)}
        >
          <div className="bento-meta-row">
            <span className="bento-index" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            {feature.eyebrow && <p className="eyebrow bento-eyebrow">{feature.eyebrow}</p>}
          </div>
          <div className="bento-copy">
            <h3>{feature.title}</h3>
            <p>{feature.summary}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
