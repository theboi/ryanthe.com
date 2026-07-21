import BaseCard from "./BaseCard";

export interface TwoUpCardProps {
  leftLabel: string;
  leftTitleBeforeEmphasis: string;
  leftEmphasizedTitle: string;
  leftTitleAfterEmphasis: string;
  leftDescription: string;
  leftMutedDescription: string;
  leftItems: readonly string[];
  rightLabel: string;
  rightTitleBeforeEmphasis: string;
  rightEmphasizedTitle: string;
  rightTitleAfterEmphasis: string;
  rightDescription: string;
  rightMutedDescription: string;
  rightItems: readonly string[];
}

export default function TwoUpCard({
  leftLabel,
  leftTitleBeforeEmphasis,
  leftEmphasizedTitle,
  leftTitleAfterEmphasis,
  leftDescription,
  leftMutedDescription,
  leftItems,
  rightLabel,
  rightTitleBeforeEmphasis,
  rightEmphasizedTitle,
  rightTitleAfterEmphasis,
  rightDescription,
  rightMutedDescription,
  rightItems,
}: TwoUpCardProps) {
  return (
    <BaseCard className="card-twoup">
      <div className="col">
        <div>
          <span className="mono">{leftLabel}</span>
          <h3>
            {leftTitleBeforeEmphasis}
            <span className="em">{leftEmphasizedTitle}</span>
            {leftTitleAfterEmphasis}
          </h3>
        </div>
        <p className="body">
          {leftDescription}{" "}
          <span className="muted">{leftMutedDescription}</span>
        </p>
        <ul>
          {leftItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="col right">
        <div>
          <span className="mono" style={{ color: "var(--accent)" }}>
            {rightLabel}
          </span>
          <h3>
            {rightTitleBeforeEmphasis}
            <span className="em">{rightEmphasizedTitle}</span>
            {rightTitleAfterEmphasis}
          </h3>
        </div>
        <p className="body">
          {rightDescription}{" "}
          <span className="muted">{rightMutedDescription}</span>
        </p>
        <ul>
          {rightItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </BaseCard>
  );
}
