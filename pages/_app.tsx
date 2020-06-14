import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import "./reset.css";
import style from "./style.module.css";
import K from "../constants";

let matchesMedia: boolean;
let data;

export default function App({ Component, pageProps, router }: AppProps) {
  const [isDarkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setDarkMode(darkModeQuery.matches ? true : false);
    try {
      // Chrome, Firefox
      darkModeQuery.addEventListener("change", (event) => {
        setDarkMode(event.matches);
      });
    } catch {
      try {
        // Safari
        darkModeQuery.addListener((event) => {
          setDarkMode(event.matches);
        });
      } catch {
        console.error("ERROR: Media query for dark mode");
      }
    }
    matchesMedia = darkModeQuery.matches;
  }, [matchesMedia]);

  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(K.firebaseConfig);
  });

  return (
    <>
      <Head>
        <title>Ryan Theodore The</title>
        <meta name="version" content="v2.0" />
        <meta name="description" content="Ryan Theodore The's personal portfolio website" />
        <meta name="subject" content="Ryan's Portfolio Website" />
        <meta name="keywords" content="Ryan, Portfolio, Personal, Coding, Programming, Designing, Student" />
        <link
          rel="icon"
          href={
            isDarkMode
              ? "./favicons/favicon-dark.ico"
              : "./favicons/favicon-light.ico"
          }
        />
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ" crossOrigin="anonymous" />
      </Head>
      <div className={style.main}>
        <ul className={style.navbar}>
          <li className={style.icon}>
            <Link href="/">
              <img
                src={
                  isDarkMode
                    ? "/icons/logo192-dark.png"
                    : "/icons/logo192-light.png"
                }
                alt="Ryan's Icon"
                width={50}
                height={50}
              />
            </Link>
          </li>
          <li>
            <Link href="/about">
              <a>ABOUT</a>
            </Link>
          </li>
          <li>
            <Link href="/works">
              <a>WORKS</a>
            </Link>
          </li>
        </ul>
        <div className={style.content}>
          <Component {...pageProps} data={data} />
        </div>
      </div>
    </>
  );
}
