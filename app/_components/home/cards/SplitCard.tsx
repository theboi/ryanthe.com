import BaseCard from "./BaseCard";

export interface SplitCardMetadataItem {
  label: string;
  value: string;
}

export interface SplitCardProps {
  url: string;
  visualLabel: string;
  visualRatio: string;
  eyebrow: string;
  title: string;
  description: string;
  mutedDescription: string;
  metadata: readonly SplitCardMetadataItem[];
}

export default function SplitCard({
  url,
  visualLabel,
  visualRatio,
  eyebrow,
  title,
  description,
  mutedDescription,
  metadata,
}: SplitCardProps) {
  return (
    <BaseCard className="card-split" url={url}>
      <div className="visual visual-side">
        <span className="mono label" style={{ color: "rgba(255,255,255,0.85)" }}>
          {visualLabel}
        </span>
        <span className="mono label-c" style={{ color: "rgba(255,255,255,0.85)" }}>
          {visualRatio}
        </span>
      </div>
      <div className="text-side">
        <div>
          <span className="mono">{eyebrow}</span>
          <h2>{title}</h2>
          <p className="body">
            {description} <span className="muted">{mutedDescription}</span>
          </p>
        </div>
        <div className="meta">
          {metadata.map((item) => (
            <div key={item.label}>
              <span className="mono">{item.label}</span>
              <b>{item.value}</b>
            </div>
          ))}
        </div>
      </div>
    </BaseCard>
  );
}
