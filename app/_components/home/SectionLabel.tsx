export interface SectionLabelProps {
  title: string;
  index: string;
}

export default function SectionLabel({ title, index }: SectionLabelProps) {
  return (
    <div className="section-label" data-reveal="">
      <span className="mono">{title}</span>
      <span className="mono">{index}</span>
    </div>
  );
}
