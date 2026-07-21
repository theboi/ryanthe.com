import BaseCard from "./BaseCard";

export interface StatsCardMetric {
  label: string;
  value: string;
  accent?: string;
  description: string;
}

export interface StatsCardProps {
  title: string;
  emphasizedTitle: string;
  label: string;
  metrics: readonly StatsCardMetric[];
  footerLeft: string;
  footerRight: string;
}

export default function StatsCard({
  title,
  emphasizedTitle,
  label,
  metrics,
  footerLeft,
  footerRight,
}: StatsCardProps) {
  return (
    <BaseCard className="card-stats">
      <div className="head">
        <h2>
          {title}
          <br />
          <em style={{ fontWeight: 400 }}>{emphasizedTitle}</em>
        </h2>
        <span className="mono">{label}</span>
      </div>
      <div className="grid">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <span className="mono">{metric.label}</span>
            <span className="num">
              {metric.value}
              {metric.accent ? <span className="accent">{metric.accent}</span> : null}
            </span>
            <span className="lbl">{metric.description}</span>
          </div>
        ))}
      </div>
      <footer>
        <span className="mono">{footerLeft}</span>
        <span className="mono">{footerRight}</span>
      </footer>
    </BaseCard>
  );
}
