import React, { useEffect, useState } from "react";

import Post, { Genre } from "../../models/post";
import style from "./style.module.css";
import PostCard from "../../components/cards/post";

export default function WorkPage(props) {
  const mobileMinWidth = 768;
  const [currentPosts, setCurrentPosts] = useState([]);
  const [isGrid, setIsGrid] = useState(true);
  const [filter, setFilter] = useState(Genre.All);
  const [mobileFilterIsOpen, setMobileFilterIsOpen] = useState(false);
  const genreList = [
    Genre.All,
    Genre.Code,
    Genre.Design,
    Genre.Robot,
    Genre.Others,
  ];
  const filterTypes = [
    genreList[filter - 1],
    ...genreList.filter((value, index) => index !== filter - 1),
  ];

  useEffect(() => {
    Post.getPosts().then((data) => {
      if (!data.length) console.error("ERROR: No data to display");
      if (!currentPosts.length) setCurrentPosts(data);
    });
  });
  
  return (
    <>
      <div className={style.main}>
        <div>
          <div
            className={`${style.filter} ${
              mobileFilterIsOpen ? style.active : null
            }`}
            onClick={() => {
              if (!(props.width >= mobileMinWidth)) {
                setMobileFilterIsOpen(!mobileFilterIsOpen)
              };
            }}
          >
            <ul>
              {(props.width >= mobileMinWidth ? genreList : [
                genreList[filter - 1],
                ...genreList.filter((value, index) => index !== filter - 1),
              ]).map((value, index) => {
                return (
                  <FilterButton
                    title={Post.genreToString(value)}
                    key={index}
                    index={index}
                    filter={filter}
                    onClick={() => {
                      if (props.width >= mobileMinWidth) setFilter(genreList[index]);
                      else if (mobileFilterIsOpen) setFilter(filterTypes[index]);
                    }}
                  />
                );
              })}

            </ul>
          </div>
          <div onClick={() => setIsGrid(!isGrid)} className={style.switch}>
            {isGrid ? (
              <i className="fas fa-th-list"></i>
            ) : (
              <i className="fas fa-th"></i>
            )}
          </div>
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

const FilterButton = (props: {
  title: string;
  index: number;
  filter: Genre;
  onClick: () => void
}) => {
  return (
    <li
      onClick={props.onClick}
      className={props.filter === props.index + 1 ? style.isSelected : null}
    >
      {props.title}
    </li>
  );
};
