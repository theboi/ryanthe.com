import BaseCard from "./BaseCard";

export interface SpecCardRow {
  id: string;
  label: string;
  value: string;
  tag: string;
  boldValue?: boolean;
}

export interface SpecCardProps {
  label: string;
  title: string;
  emphasizedTitle: string;
  description: string;
  mutedDescription: string;
  signature: string;
  rows: readonly SpecCardRow[];
}

export default function SpecCard({
  label,
  title,
  emphasizedTitle,
  description,
  mutedDescription,
  signature,
  rows,
}: SpecCardProps) {
  return (
    <BaseCard className="card-spec">
      <div className="lhs">
        <div>
          <span className="mono">{label}</span>
          <h2>
            {title}
            <br />
            <span className="em">{emphasizedTitle}</span>
          </h2>
        </div>
        <p className="lead">
          {description}{" "}
          <span className="muted">{mutedDescription}</span>
        </p>
        <span className="mono sig">{signature}</span>
      </div>
      <div className="rhs">
        {rows.map((row) => (
          <div className="row" key={row.id}>
            <span className="mono k">{row.label}</span>
            <span className="v">{row.boldValue ? <b>{row.value}</b> : row.value}</span>
            <span className="tag">{row.tag}</span>
          </div>
        ))}
      </div>
    </BaseCard>
  );
}
