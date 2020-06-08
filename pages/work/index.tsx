import React from "react";

import style from "./style.module.css";
import { loadGetInitialProps } from "next/dist/next-server/lib/utils";

export default function WorkPage(props) {
  const posts = ["Hello", "Bye", "Anotherone", "hello"];

  return (
    <>
      <div className={style.main}>
        <div className={style.filter}>
          <ul>
            <li>All.</li>
            <li>Code.</li>
            <li>Design.</li>
            <li>Robot.</li>
            <li>Others.</li>
          </ul>
        </div>
        <div className={`${style.content} ${style.grid}`}>
          {posts.map((value, index) => (
            <div className={style.post} key={index}>
              {value}
            </div>
          ))}
        </div>
        
      </div>
    </>
  );
}
