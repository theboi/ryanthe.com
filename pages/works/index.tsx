import React, { useEffect, useState } from "react";

import Post from "../../models/post";
import style from "./style.module.css";
import PostCard from "../../components/cards/post";

export default function WorkPage() {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [isGrid, setIsGrid] = useState(true);

  useEffect(() => {
    Post.getPosts().then((data) => {
      if (!data.length) console.error("ERROR: No data to display");
      if (!currentPosts.length) setCurrentPosts(data);
    });
  });

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
            <button onClick={() => setIsGrid(!isGrid)}>Switch</button>
          </ul>
        </div>
        <div className={`${style.content} ${isGrid ? style.grid : style.list}`}>
          {(!currentPosts.length ? [...Array(12)] : currentPosts).map(
            (value, index) => (
              <PostCard
                key={index}
                post={value}
                currentPosts={currentPosts}
                isGrid={isGrid}
              />
            )
          )}
        </div>
      </div>
    </>
  );
}
