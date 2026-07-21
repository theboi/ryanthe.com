import BaseCard from "./BaseCard";

export interface ContactCardLink {
  iconClassName: string;
  href: string;
  label: string;
  openInNewTab?: boolean;
}

export interface ContactCardProps {
  eyebrow: string;
  heading: string;
  emphasizedHeading: string;
  headingSuffix: string;
  lead: string;
  mutedLead: string;
  colophon: readonly string[];
  links: readonly ContactCardLink[];
}

export default function ContactCard({
  eyebrow,
  heading,
  emphasizedHeading,
  headingSuffix,
  lead,
  mutedLead,
  colophon,
  links,
}: ContactCardProps) {
  return (
    <BaseCard className="card-contact">
      <div className="lhs">
        <div>
          <span className="mono">{eyebrow}</span>
          <h2>
            {heading} <span className="em">{emphasizedHeading}</span>
            {headingSuffix}
          </h2>
        </div>
        <p className="lead">
          {lead} <span className="muted">{mutedLead}</span>
        </p>
        <div className="colophon">
          {colophon.map((line) => (
            <span className="mono" key={line}>
              {line}
            </span>
          ))}
        </div>
      </div>
      <div className="rhs">
        {links.map((link) => (
          <div className="row" key={link.href}>
            <i className={`ico ${link.iconClassName}`} aria-hidden="true" />
            <a
              href={link.href}
              target={link.openInNewTab ? "_blank" : undefined}
              rel={link.openInNewTab ? "noreferrer" : undefined}
            >
              {link.label}
            </a>
          </div>
        ))}
      </div>
    </BaseCard>
  );
}
