import BaseCard from "./BaseCard";

export interface ProjectCardMetadataItem {
  label: string;
  value: string;
}

export interface ProjectCardProps {
  title: string;
  externalMarker: string;
  description: string;
  mutedDescription: string;
  visualLabel: string;
  visualRatio: string;
  metadata: readonly ProjectCardMetadataItem[];
}

export default function ProjectCard({
  title,
  externalMarker,
  description,
  mutedDescription,
  visualLabel,
  visualRatio,
  metadata,
}: ProjectCardProps) {
  return (
    <BaseCard className="card-project">
      <header>
        <h2>
          {title}
          <sup
            style={{
              fontSize: 24,
              color: "var(--muted)",
              fontWeight: 400,
              letterSpacing: 0,
              marginLeft: 6,
            }}
          >
            {externalMarker}
          </sup>
        </h2>
        <p className="desc">
          {description} <span className="muted">{mutedDescription}</span>
        </p>
      </header>
      <div className="visual">
        <span className="mono label">{visualLabel}</span>
        <span className="mono label-c">{visualRatio}</span>
      </div>
      <footer>
        {metadata.map((item) => (
          <div key={item.label}>
            <span className="mono">{item.label}</span>
            <b>{item.value}</b>
          </div>
        ))}
      </footer>
    </BaseCard>
  );
}
