import BaseCard from "./BaseCard";

export interface ListCardItem {
  number: string;
  title: string;
  description: string;
  period: string;
}

export interface ListCardProps {
  heading: string;
  emphasizedHeading: string;
  updatedLabel: string;
  items: readonly ListCardItem[];
}

export default function ListCard({
  heading,
  emphasizedHeading,
  updatedLabel,
  items,
}: ListCardProps) {
  return (
    <BaseCard className="card-list">
      <div className="head">
        <h2>
          {heading}
          <br />
          <em style={{ fontWeight: 400 }}>{emphasizedHeading}</em>
        </h2>
        <span className="mono">{updatedLabel}</span>
      </div>
      <ul>
        {items.map((item) => (
          <li key={item.number}>
            <span className="mono num">{item.number}</span>
            <div className="title-row">
              <span className="t">{item.title}</span>
              <span className="s">{item.description}</span>
            </div>
            <span className="reading">{item.period}</span>
          </li>
        ))}
      </ul>
    </BaseCard>
  );
}
