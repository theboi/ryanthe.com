import React, { useEffect, useContext, useState } from "react";
import { AppProps } from "next/app";
import Head from "next/head";
import "./global.css"

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
  });

  return (
    <>
      <Head>
        <link
          rel="icon"
          href={isDarkMode ? "./favicon-dark.ico" : "./favicon-light.ico"}
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
