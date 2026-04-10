export interface Metric {
  value: string;
  label: string;
}

interface MetricsBandProps {
  metrics: Metric[];
}

export default function MetricsBand({ metrics }: MetricsBandProps) {
  if (!metrics.length) return null;

  return (
    <div className="metrics-band" data-reveal>
      {metrics.map((metric) => (
        <div key={metric.label} className="metric">
          <div className="metric-value">{metric.value}</div>
          <div className="metric-label">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
