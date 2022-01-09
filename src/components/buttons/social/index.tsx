import React from "react";
import style from "./style.module.scss";

export interface SocialButtonData {
  icon: string;
  color: string;
  link: string;
}

export function SocialButton({ data }: { data: SocialButtonData }) {
  return (
    <a
      className={style.socialButtons}
      style={{ background: data.color }}
      href={data.link}
      target="_blank"
      rel="noreferrer"
    >
      <i className={`fab fa-${data.icon}`} />
    </a>
  );
}
