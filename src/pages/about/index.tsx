import style from "./style.module.scss";
import {
  SocialButton,
  SocialButtonData,
} from "../../components/buttons/social";
import Image from "next/image";
import { useState } from "react";
import { useDarkMode } from "../../hooks/useDarkMode";

const socialData: SocialButtonData[][] = [
  [
    { icon: "github", color: "#333333", link: "https://github.com/theboi" },
    {
      icon: "linkedin",
      color: "#0077b5",
      link: "https://www.linkedin.com/in/ryan-the/",
    },
    {
      icon: "instagram",
      color:
        "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)",
      link: "https://www.instagram.com/theboi_io/",
    },
  ],
  [
    {
      icon: "twitter",
      color: "#1da1f2",
      link: "https://twitter.com/theboi_io",
    },
    {
      icon: "medium-m",
      color: "#00ab6c",
      link: "https://medium.com/@theboi",
    },
    {
      icon: "tiktok",
      color: "#010101",
      link: "/rick",
    },
  ],
];

export default function AboutPage() {
  const isDarkMode = useDarkMode()
  const [isCrowned, setIsCrowned] = useState(false)

  return (
    <div className={style.main}>
      <div className={style.meWrapper}>
        <Image
          className={style.me}
          src="/images/crowns/me.jpg"
          alt="Me"
          layout="fill"
          // style={isCrowned ? { cursor: "pointer" } : null} TODO: fix this in css
        />
        <Image
          className={style.crown}
          src={`/images/crowns/${
            isDarkMode ? "dark" : "light"
          }-crown.png`}
          alt="Crown"
          width={100}
          height={100}
        />
        <div
          className={style.meMap}
          onClick={() => {setIsCrowned(true)}}
          style={isCrowned ? { cursor: "pointer" } : null}
        />
      </div>
      <div className={style.intro}>
        <h1 className={style.hey}>Hey,</h1>
        <p>
          I&apos;m Ryan — a <span>student</span>, self-taught software{" "}
          <span>developer</span> and <span>designer</span> based in Singapore.
          <br />
          <br />I am passionate about harnessing technology to improve society
          through STEAM (Science, Technology, Engineering, Aesthetics and
          Mathematics).
        </p>
        <div className={style.contact}>
          <i className={`far fa-envelope`} />
          <a href="mailto:ryan@ryanthe.com" target="_blank" rel="noreferrer">
            ryan@ryanthe.com
          </a>
        </div>
        <div className={style.social}>
          {socialData.map((g, i) => (
            <div className={style.socialGroup} key={i}>
              {g.map((v, i) => (
                <SocialButton key={i} data={v} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}