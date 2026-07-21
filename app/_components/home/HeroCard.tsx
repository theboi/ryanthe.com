import BaseCard from "./cards/BaseCard";

export interface HeroCardDetail {
  label: string;
  value: string;
}

export interface HeroCardProps {
  portfolioLabel: string;
  indexLabel: string;
  name: string;
  tagline: string;
  mutedTagline: string;
  shapeMark: string;
  details: readonly HeroCardDetail[];
  scrollLabel: string;
}

export default function HeroCard({
  portfolioLabel,
  indexLabel,
  name,
  tagline,
  mutedTagline,
  shapeMark,
  details,
  scrollLabel,
}: HeroCardProps) {
  return (
    <BaseCard
      className="hero"
      homeHero
      id="hero"
      includeBaseClass={false}
      reveal={false}
    >
      <div className="hero-shape" aria-hidden="true">
        <svg viewBox="-200 -200 400 400" preserveAspectRatio="xMidYMid meet">
          <g data-home-target="" id="target-group">
            <circle className="target-ring" data-i="0" cx="0" cy="0" r="180" />
            <circle className="target-ring" data-i="1" cx="0" cy="0" r="140" />
            <circle className="target-ring accent" data-i="2" cx="0" cy="0" r="100" />
            <circle className="target-ring" data-i="3" cx="0" cy="0" r="60" />
            <circle className="target-bullseye" data-i="4" cx="0" cy="0" r="22" />
          </g>
          <g data-home-arrow="" id="arrow-group">
            <g className="arrow">
              <line x1="-150" y1="120" x2="140" y2="-150" />
              <polyline points="50,-150 140,-150 140,-60" />
            </g>
          </g>
        </svg>
        <span className="hero-shape-mark">{shapeMark}</span>
      </div>

      <div className="hero-inner">
        <div className="hero-row">
          <div className="left">
            <span className="mono">{portfolioLabel}</span>
          </div>
          <div className="right">
            <span className="mono">{indexLabel}</span>
          </div>
        </div>

        <div className="hero-headline">
          <h1 className="hero-name">{name}</h1>
          <p className="hero-tagline">
            {tagline} <span className="muted">{mutedTagline}</span>
          </p>
        </div>

        <div className="hero-bottom">
          <div className="hero-grid">
            {details.map((detail) => (
              <div key={detail.label}>
                <span className="mono">{detail.label}</span>
                <b>{detail.value}</b>
              </div>
            ))}
          </div>
          <div className="hero-cue">
            <span className="mono">{scrollLabel}</span>
            <span className="arrow" />
          </div>
        </div>
      </div>
    </BaseCard>
  );
}
