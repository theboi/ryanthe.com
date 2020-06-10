import React from "react";
import { useRouter } from "next/router";

import Post from "../../../models/post";
import style from "./style.module.css";

export default function WorksUrlPage() {

  const query = useRouter().query.query as string;
  const post = new Post(query);
  console.log(post);

  return (
    <>
      <div className={style.main}></div>
    </>
  );
}
