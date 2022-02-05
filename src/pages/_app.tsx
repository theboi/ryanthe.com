import { AppProps } from "next/app";
import Head from "next/head";

import { useDarkMode } from "../hooks/useDarkMode";
import NavBar from "../components/theme/navbar";

import "./reset.scss";
import style from "./_app.module.scss";
import Footer from "../components/theme/footer";

export default function App({ Component, pageProps }: AppProps) {
  const isDarkMode = useDarkMode();

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

        <meta name="version" content="v3.0" />
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
          href="/favicons/favicon-light.ico"
        />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      <div className={style.main}>
        <NavBar />
        <div className={style.content}>
          <Component {...pageProps} />
        </div>
        <Footer />
      </div>
    </>
  );
}

//remove isDarkMode
