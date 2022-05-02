import { AppProps } from "next/app";
import Head from "next/head";

import { useDarkMode } from "../hooks/useDarkMode";
import NavBar from "../components/theme/navbar";

import "./reset.scss";
import style from "./_app.module.scss";
import Footer from "../components/theme/footer";

export default function App({ Component, pageProps }: AppProps) {
  const metaData = {
    title: pageProps.meta?.title ?? "Ryan Theodore The",
    desc:
      pageProps.meta?.desc ?? "Ryan Theodore The's personal portfolio website.",
    img: pageProps.meta?.img ?? "./images/share.jpg",
    url: pageProps.meta?.url ?? "https://www.ryanthe.com",
  };

  return (
    <>
      <Head>
        <title>Ryan Theodore The</title>
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.desc} />
        <meta property="og:image" content={metaData.img} />
        <meta property="og:url" content={metaData.url} />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="version" content="v3.0" />
        <meta name="description" content={metaData.desc} />
        <meta name="author" content="Ryan Theodore The" />
        <link rel="icon" href="/favicons/favicon-light.ico" />
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
      </Head>

      {pageProps.noLayout ? (
        <Component {...pageProps} />
      ) : (
        <div className={style.main}>
          <NavBar />
          <div className={style.content}>
            <Component {...pageProps} />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

//remove isDarkMode
