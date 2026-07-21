import Link from "next/link";
import type { ReactNode } from "react";

export interface BaseCardProps {
  className: string;
  children: ReactNode;
  id?: string;
  reveal?: boolean;
  includeBaseClass?: boolean;
  homeHero?: boolean;
  url?: string;
}

export default function BaseCard({
  className,
  children,
  id,
  reveal = false,
  includeBaseClass = true,
  homeHero = false,
  url,
}: BaseCardProps) {
  const cardClassName = includeBaseClass ? `card ${className}` : className;

  const card = (
    <article
      className={cardClassName}
      data-home-hero={homeHero ? "" : undefined}
      data-reveal={reveal ? "" : undefined}
      id={id}
    >
      {children}
    </article>
  );

  if (!url) return card;

  return (
    <Link className="card-link" href={url}>
      {card}
    </Link>
  );
}
