import React from "react";
import Head from "next/head";

import style from "./style.module.css";

export default function IndexPage() {
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
