import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import Post, { Genre } from "../../../models/post";
import style from "./style.module.css";

let willFetchImages: boolean;
let tempImages: string[];

export default function WorksUrlPage() {
  const [content, setContent] = useState(
    new Post({
      date: "",
      title: "",
      body: "",
      genre: [],
      media: [],
    })
  );

  const [images, setImages] = useState([]);
  const query = useRouter().query.query as string;

  useEffect(() => {
    if (content)
      Post.getPosts(query ?? "ERROR").then((post) => {
        console.log("fetch posts");
        setContent(post);
        if (!willFetchImages) {
          willFetchImages = true;
          tempImages = [];
        }
      });

    if (content && willFetchImages) {
      willFetchImages = false;
      content.media.forEach((value) => {
        Post.getStorage(value)
          .then((value) => {
            tempImages.push(value);
            if (tempImages.length === content.media.length) {
              console.log(tempImages);
              setImages(tempImages);
            }
          })
          .catch((err) => {
            console.error("ERROR: ", err);
          });
      });
    }
  });

  return (
    <>
      <div className={style.main}>
        <div className={style.header}>
          <div
            className={style.headerImage}
            style={{
              backgroundImage: `url(${images?.[0]})`,
            }}
          />
          <h1 className={style.title}>{content?.title}</h1>
          <div className={style.details}>
            <p className={style.genre}>{content?.genre.join(" | ")}</p>
            <h4 className={style.date}>
              {`${content?.date.split("/")[0]} ${(() => {
                switch (content?.date.split("/")[1]) {
                  case "01":
                    return "January";
                  case "02":
                    return "February";
                  case "03":
                    return "March";
                  case "04":
                    return "April";
                  case "05":
                    return "May";
                  case "06":
                    return "June";
                  case "07":
                    return "July";
                  case "08":
                    return "August";
                  case "09":
                    return "October";
                  case "10":
                    return "September";
                  case "11":
                    return "November";
                  case "12":
                    return "December";
                  default:
                    return "";
                }
              })()} 20${content?.date.split("/")[2] ?? ""}`}
            </h4>
          </div>
        </div>
        <div className={style.body}>
          <h2 className={style.subtitle}>{content?.title}</h2>
          {/* {content?.body.map(function search(value) {
            switch (value.type) {
              case "group":
                return (
                  <div className={style.group}>
                    {value.value.map((value) => search(value))}
                  </div>
                );
              case "paragraph":
                return <p className={style.paragraph}>{value.value}</p>;
              case "headline":
                return <h1 className={style.headline}>{value.value}</h1>;
              case "subhead":
                return <h2 className={style.subhead}>{value.value}</h2>;
              case "image":
                return (
                  <figure className={style.imageFig} alt={value.meta}>
                    <img
                      onClick={() => {
                        console.log("full screen");
                      }}
                      className={style.imageImg}
                      src={
                        value.value?.startsWith("http") ?? true
                          ? value.value
                          : require(`../../assets/images/Projects/${value.value}.jpg`)
                      }
                      alt={value.meta}
                    />
                    <figcaption className={style.imageCaption}>
                      {value.meta}
                    </figcaption>
                  </figure>
                );
              case "link":
                return (
                  <div>
                    <a
                      className={style.link}
                      href={value.value}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {value.meta}
                    </a>
                  </div>
                );
              case "list":
                return value.meta === "ol" ? (
                  <ol className={style.olist}>
                    {value.value.map((value) => (
                      <li>{value}</li>
                    ))}
                  </ol>
                ) : (
                  <ul className={style.ulist}>
                    {value.value.map((value) => (
                      <li>{value}</li>
                    ))}
                  </ul>
                );
              case "iframe":
                return (
                  <figure className={style.imageFig} alt={value.meta}>
                    <iframe
                      className={style.imageImg}
                      title={value.meta}
                      src={value.value}
                      frameBorder="0"
                    ></iframe>
                    <figcaption className={style.imageCaption}>
                      {value.meta}
                    </figcaption>
                  </figure>
                );
              default:
                return <p>ERROR: Invalid element name.</p>;
            }
          })} */}
        </div>
      </div>
    </>
  );
}
