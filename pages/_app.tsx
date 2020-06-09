import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";

import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import "./reset.css";
import style from "./style.module.css";
import K from "../constants";

let matchesMedia: boolean;
let data;

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setDarkMode] = useState(true);

  useEffect(() => {
    setDarkMode(
      window.matchMedia("(prefers-color-scheme:dark)").matches ? true : false
    );
    window
      .matchMedia("(prefers-color-scheme:dark)")
      .addEventListener("change", (event) => {
        setDarkMode(event.matches);
      });
    matchesMedia = window.matchMedia("(prefers-color-scheme:dark)").matches;
  }, [matchesMedia]);

  useEffect(() => {
    if (!firebase.apps.length) firebase.initializeApp(K.firebaseConfig);
  });

  return (
    <>
      <Head>
        <title>Ryan Theodore The</title>
        <link
          rel="icon"
          href={
            isDarkMode
              ? "./favicons/favicon-dark.ico"
              : "./favicons/favicon-light.ico"
          }
        />
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
            <Link href="/about"><a>ABOUT</a></Link>
          </li>
          <li>
            <Link href="/works"><a>WORKS</a></Link>
          </li>
        </ul>
        <div className={style.content}>
          <Component {...pageProps} data={data} />
        </div>
      </div>
    </>
  );
}
