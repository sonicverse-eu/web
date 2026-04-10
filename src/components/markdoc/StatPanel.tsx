interface StatPanelProps {
  value: string;
  label: string;
  note?: string;
}

export function StatPanel({ value, label, note }: StatPanelProps) {
  return (
    <div className="stat-panel stat bg-base-100 shadow-md rounded-box" data-reveal>
      <p className="stat-value stat-value">{value}</p>
      <p className="stat-label stat-desc">{label}</p>
      {note && <p className="stat-note">{note}</p>}
    </div>
  );
}
