import React from "react";

import style from "./style.module.css";

export default function HomePage() {
  return (
    <>
      <div className={style.main}>
        <h1>Student.</h1>
        <h1>Developer.</h1>
        <h1>Designer.</h1>
        <h1>Robotics.</h1>
      </div>
    </>
  );
}