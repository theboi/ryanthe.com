import React, { useEffect } from "react";
import { useRouter } from "next/router";

import Post from "../../../models/post";
import style from "./style.module.css";

let data;
export default function WorksUrlPage() {

  const query = useRouter().query.query as string;

  useEffect(() => {
    if (!data) Post.getWithUrl(query ?? "title").then(res => {
      data = res
      console.log(!data)
    })
  })

  return (
    <>
      <div className={style.main}></div>
    </>
  );
}
