import React from "react";

import style from "./style.module.css";

type ButtonMouseEventHandler = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void

export const Button = (props: {onClick: ButtonMouseEventHandler}) => {
  return <button onClick={props.onClick} className={style.button}>Post</button>
};
