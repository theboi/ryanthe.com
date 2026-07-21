import BaseCard from "./BaseCard";

export interface QuoteCardProps {
  url: string;
  eyebrow: string;
  category: string;
  quote: string;
  mutedQuote: string;
  title: string;
  subtitle: string;
  specimenLabel: string;
  specimenColors: readonly string[];
}

export default function QuoteCard({
  url,
  eyebrow,
  category,
  quote,
  mutedQuote,
  title,
  subtitle,
  specimenLabel,
  specimenColors,
}: QuoteCardProps) {
  return (
    <BaseCard className="card-quote" url={url}>
      <div className="topline">
        <span className="mono">{eyebrow}</span>
        <span className="mono">{category}</span>
      </div>
      <blockquote>
        {quote}
        <span className="muted"> {mutedQuote}</span>
      </blockquote>
      <div className="bottom">
        <h2>
          {title} <small>{subtitle}</small>
        </h2>
        <div className="specimen">
          <span className="mono">{specimenLabel}</span>
          {specimenColors.map((color) => (
            <span className="swatch" style={{ background: color }} key={color} />
          ))}
        </div>
      </div>
    </BaseCard>
  );
}
