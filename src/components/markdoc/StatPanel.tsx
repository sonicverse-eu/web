interface StatPanelProps {
  value: string;
  label: string;
  note?: string;
}

export function StatPanel({ value, label, note }: StatPanelProps) {
  return (
    <div className="stat-panel" data-reveal>
      <p className="stat-value">{value}</p>
      <p className="stat-label">{label}</p>
      {note && <p className="stat-note">{note}</p>}
    </div>
  );
}
