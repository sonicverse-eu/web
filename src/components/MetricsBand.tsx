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
    <div
      className="metrics-band stats stats-vertical lg:stats-horizontal shadow-xl bg-base-100"
      data-reveal
    >
      {metrics.map((metric) => (
        <div key={metric.label} className="metric stat">
          <div className="metric-value stat-value">{metric.value}</div>
          <div className="metric-label stat-desc">{metric.label}</div>
        </div>
      ))}
    </div>
  );
}
