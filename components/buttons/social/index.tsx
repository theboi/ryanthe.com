import React from "react";

import style from "./style.module.css";

export default function SocialButton(props: { icon: string, color: string, link: string }) {
  return (
    <>
      <a className={style.circle} style={{background: props.color}} href={props.link}>
        <i className={`fab fa-${props.icon}`}></i>
      </a>
    </>
  );
}
