import React, { useEffect, useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import Link from "next/link";

import * as firebase from "firebase/app";
import "firebase/auth"
import "firebase/firestore"

import "./reset.css";
import style from "./style.module.css";
import { eventNames } from "cluster";

let matchesMedia: boolean;
let data

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
    matchesMedia = window.matchMedia("(prefers-color-scheme:dark)").matches
  }, [matchesMedia]);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: process.env.GOOGLE_API_KEY,
      authDomain: "personal-website-ryan.firebaseapp.com",
      databaseURL: "https://personal-website-ryan.firebaseio.com",
      projectId: "personal-website-ryan",
      storageBucket: "personal-website-ryan.appspot.com",
      messagingSenderId: "52477415549",
      appId: "1:52477415549:web:e64b0a00ae5126384de114",
      measurementId: "G-LR4QR266XL"
    };

    if (!firebase.apps.length) firebase.initializeApp(firebaseConfig)
  }) //, [firebase.apps.length]

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
          <Link href="/">
            <li className={style.icon} onDoubleClick={() => {
              firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
                console.log("Successfully signed in")
                if (result.user.email !== "ryan.the.2006@gmail.com") {
                  firebase.auth().signOut()
                }
              }).catch(error => {
                console.error(error)
              })
            }}>
              <img
                src={
                  isDarkMode
                    ? "./icons/logo192-dark.png"
                    : "./icons/logo192-light.png"
                }
                alt="Ryan's Icon"
                width={50}
                height={50}
              />
            </li>
          </Link>
          <Link href="/about">
            <li>ABOUT</li>
          </Link>
          <Link href="/work">
            <li>WORK</li>
          </Link>
        </ul>
        <div className={style.content}>
          <Component {...pageProps} data={data} />
        </div>
      </div>
    </>
  );
}
