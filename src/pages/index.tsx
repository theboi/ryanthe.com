import style from "./style.module.scss";
import { SocialButton, SocialButtonData } from "../components/buttons/social";
import Image from "next/image";
import HomeHeader from "../components/home/header";
import { useState } from "react";
import HomeListing from "../components/home/listing";

export default function HomePage() {
  const [isCrowned, setIsCrowned] = useState(false);

  return (
    <div className={style.main}>
      <HomeHeader />
      <hr />
      <HomeListing />
      {/* <div className={style.meWrapper}>
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
        <h1 className={style.hey}>Hey, I&apos;m Ryan</h1>
        <h2>
          I am a <span>student</span>, self-taught software{" "}
          <span>developer</span> and <span>designer</span> based in Singapore.
          <br />
          <br />I am passionate about harnessing technology to improve society
          through Science, Technology, Engineering, Arts and
          Mathematics (STEAM).
        </h2>
        <div className={style.contact}>
          <i className={`far fa-envelope`} />
          <a href="mailto:ryan@ryanthe.com" target="_blank" rel="noreferrer">
            ryan@ryanthe.com
          </a>
        </div>
        <div className={style.social}>
          {socialData.map((g, i) => (
            <SocialButton key={i} data={g} />
          ))}
        </div>
      </div> */}
    </div>
  );
}
