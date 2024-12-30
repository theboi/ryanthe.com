import type { Metadata } from "next";

import "./reset.scss";
import style from "./_app.module.scss";
import NavBar from "../src/components/theme/navbar";
import Footer from "../src/components/theme/footer";

export const metadata: Metadata = {
  title: {
    template: "%s | Ryan Theodore The",
    default: "Ryan Theodore The",
  },
  description: "Ryan Theodore The's personal portfolio website.",
  openGraph: {
    url: "https://www.ryanthe.com",
    // title: {
    //   template: '%s | Ryan Theodore The',
    //   default: "Ryan Theodore The"
    // },
    // description: "Ryan Theodore The's personal portfolio website.",
  },
  icons: {
    icon: "/favicons/favicon-light.ico",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* <Head>

        <meta name="version" content="v3.0" />
        <meta name="description" content={metaData.desc} />
        <meta name="author" content="Ryan Theodore The" />
        <link rel="icon" href="/favicons/favicon-light.ico" />
      </Head> */}
      <head>
        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
          rel="stylesheet"
        />
        {/* NextJS Font Optimisation used below https://nextjs.org/docs/basic-features/font-optimization */}
        {/* TODO: update this font import (was from previous Page router code). See https://nextjs.org/docs/pages/building-your-application/optimizing/fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <main>
          <div className={style.main}>
            <NavBar />
            <div className={style.content}>{children}</div>
            <Footer />
          </div>
        </main>
      </body>
    </html>
  );
}

//remove isDarkMode