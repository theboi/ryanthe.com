import type { ReactNode } from "react";

export interface BaseCardProps {
  className: string;
  children: ReactNode;
  id?: string;
  reveal?: boolean;
  includeBaseClass?: boolean;
  homeHero?: boolean;
}

export default function BaseCard({
  className,
  children,
  id,
  reveal = true,
  includeBaseClass = true,
  homeHero = false,
}: BaseCardProps) {
  const cardClassName = includeBaseClass ? `card ${className}` : className;

  return (
    <article
      className={cardClassName}
      data-home-hero={homeHero ? "" : undefined}
      data-reveal={reveal ? "" : undefined}
      id={id}
    >
      {children}
    </article>
  );
}
