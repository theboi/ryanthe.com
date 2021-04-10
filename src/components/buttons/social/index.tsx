import React from "react";
import style from './style.module.css';

export interface SocialButtonData {
  icon: string;
  color: string;
  link: string;
}

export const SocialButton = (props: {data: SocialButtonData}) => {
  return (
    <a
      className={style.socialButtons}
      style={{ background: props.data.color }}
      href={props.data.link}
      target="_blank"
    >
      <i className={`fab fa-${props.data.icon}`} />
    </a>
  );
}


