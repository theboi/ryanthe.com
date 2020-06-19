import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Post, {Genre} from "../../../models/post";
import style from "./style.module.css";

export default function WorksUrlPage() {
  const [content, setContent] = useState(
    new Post({ date: "", title: "", body: "", genre: [Genre.Error], media: [""] })
  );

  const query = useRouter().query.query as string;

  useEffect(() => {
    Post.getPosts(query ?? "title").then((post) => {
      setContent(post);
    });
  });

  return (
    <>
      <div className={style.main}>
        <h1>{content.title}</h1>
        <p>{content.body}</p>
      </div>
    </>
  );
}
