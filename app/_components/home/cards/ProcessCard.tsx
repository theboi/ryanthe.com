import BaseCard from "./BaseCard";

export interface ProcessCardStep {
  id: string;
  label: string;
  title: string;
  description: string;
  active: boolean;
}

export interface ProcessCardProps {
  title: string;
  emphasizedTitle: string;
  label: string;
  steps: readonly ProcessCardStep[];
  footerLeft: string;
  footerRight: string;
}

export default function ProcessCard({
  title,
  emphasizedTitle,
  label,
  steps,
  footerLeft,
  footerRight,
}: ProcessCardProps) {
  return (
    <BaseCard className="card-process">
      <div className="head">
        <h2>
          {title}
          <br />
          <em style={{ fontWeight: 400 }}>{emphasizedTitle}</em>
        </h2>
        <span className="mono">{label}</span>
      </div>
      <div className="steps">
        {steps.map((step) => (
          <div className={step.active ? "step active" : "step"} key={step.id}>
            <span className="dot" />
            <span className="mono num">{step.label}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
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
