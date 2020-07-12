import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";

import "./reset.css";
import style from "./style.module.css";
import K from "../constants";

let matchesMedia: boolean;
let data;
let listening = false;

export default function App({ Component, pageProps }: AppProps) {
  const [isDarkMode, setDarkMode] = useState(true);
  const [width, setWidth] = useState(-1);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (width === -1) {
      setWidth(window.innerWidth);
    }
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

    if (!listening) {
      firebase.analytics().logEvent("page_visited");
      window.addEventListener("resize", () => {
        setWidth(window.innerWidth);
      });
      listening = true;
    }
  });

  return (
    <>
      <Head>
        <title>Ryan Theodore The</title>
        <meta property="og:title" content="Ryan Theodore The" />
        <meta
          property="og:description"
          content="Ryan Theodore The's personal portfolio website."
        />
        <meta property="og:image" content="./images/share.jpg" />
        <meta property="og:url" content="https://www.ryanthe.com" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="version" content="v2.1" />
        <meta
          name="description"
          content="Ryan Theodore The's personal portfolio website."
        />
        <meta name="subject" content="Ryan's Portfolio Website" />
        <meta
          name="keywords"
          content="Ryan, Portfolio, Personal, Coding, Programming, Designing, Student"
        />
        <link
          rel="icon"
          href={
            isDarkMode
              ? "./favicons/favicon-dark.ico"
              : "./favicons/favicon-light.ico"
          }
        />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.7.0/css/all.css"
          integrity="sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ"
          crossOrigin="anonymous"
        />
      </Head>

      <div className={style.main}>
        <ul className={style.navbar}>
          <li className={style.icon}>
            <Link href="/">
              <img
                src={
                  isDarkMode || router.pathname === "/works/[query]"
                    ? "/icons/logo192-dark.png"
                    : "/icons/logo192-light.png"
                }
                alt="Ryan's Icon"
                width={50}
                height={50}
              />
            </Link>
          </li>
          <div
            className={`${style.navlinks} ${menuIsOpen ? style.open : null}`}
            onClick={() => {
              if (width < 768) setMenuIsOpen(!menuIsOpen);
            }}
            style={{
              backgroundColor:
                isDarkMode || router.pathname === "/works/[query]"
                  ? "rgba(31, 31, 31, 0.7)"
                  : "rgba(255, 255, 255, 0.7)",
            }}
          >
            {["ABOUT", "WORKS", "RESUME"].map((value, index) => {
              return (
                <li
                  key={index}
                  style={{
                    color:
                      isDarkMode || router.pathname === "/works/[query]"
                        ? "rgb(255, 255, 255)"
                        : "rgb(7, 7, 7)",
                  }}
                >
                  <Link href={`/${value.toLowerCase()}`}>
                    <a>{value}</a>
                  </Link>
                </li>
              );
            })}
          </div>
          <li
            className={style.hamBox}
            onClick={() => {
              if (width < 768) setMenuIsOpen(!menuIsOpen);
            }}
          >
            <div
              className={`${style.ham} ${menuIsOpen ? style.open : null}`}
              style={{
                backgroundColor:
                  isDarkMode || router.pathname === "/works/[query]"
                    ? "rgb(255, 255, 255)"
                    : "rgb(7, 7, 7)",
              }}
            />
          </li>
        </ul>
        <div className={style.content}>
          <Component
            {...pageProps}
            data={data}
            width={width}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
    </>
  );
}

// >=768
