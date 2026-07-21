import BaseCard from "./BaseCard";

export interface IndexCardChapter {
  id: string;
  number: string;
  titleBeforeEmphasis: string;
  emphasizedTitle?: string;
  titleAfterEmphasis?: string;
  page: string;
}

export interface IndexCardProps {
  title: string;
  emphasizedTitle: string;
  label: string;
  chapters: readonly IndexCardChapter[];
  signature: string;
}

export default function IndexCard({
  title,
  emphasizedTitle,
  label,
  chapters,
  signature,
}: IndexCardProps) {
  return (
    <BaseCard className="card-index">
      <div className="head">
        <h2>
          {title}
          <br />
          <em style={{ fontWeight: 400 }}>{emphasizedTitle}</em>
        </h2>
        <span className="mono">{label}</span>
      </div>
      <ol>
        {chapters.map((chapter) => (
          <li key={chapter.id}>
            <span className="n">{chapter.number}</span>
            <span className="t">
              {chapter.titleBeforeEmphasis}
              {chapter.emphasizedTitle ? (
                <span className="em">{chapter.emphasizedTitle}</span>
              ) : null}
              {chapter.titleAfterEmphasis}
            </span>
            <span className="mono pg">{chapter.page}</span>
          </li>
        ))}
      </ol>
      <span className="mono" style={{ color: "var(--muted)" }}>
        {signature}
      </span>
    </BaseCard>
  );
}
