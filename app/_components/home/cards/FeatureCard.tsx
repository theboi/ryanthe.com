import BaseCard from "./BaseCard";

export interface FeatureCardMetaItem {
  label: string;
  value: string;
}

export interface FeatureCardProps {
  badge: string;
  cornerLabel: string;
  titleLineOne: string;
  titleLineTwo: string;
  emphasizedTitle: string;
  metadata: readonly FeatureCardMetaItem[];
}

export default function FeatureCard({
  badge,
  cornerLabel,
  titleLineOne,
  titleLineTwo,
  emphasizedTitle,
  metadata,
}: FeatureCardProps) {
  return (
    <BaseCard className="card-feature">
      <div className="visual">
        <span className="mono badge">{badge}</span>
        <span className="mono corner">{cornerLabel}</span>
      </div>
      <div className="overlay">
        <h2>
          {titleLineOne}
          <br />
          {titleLineTwo} <span className="em">{emphasizedTitle}</span>
        </h2>
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
