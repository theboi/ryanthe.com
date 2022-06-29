import { SocialButton, SocialButtonData } from "../../buttons/social";
import Image from "next/image";
import Confetti from "react-confetti";

import style from "./style.module.scss";
import { useState } from "react";
import { useMediaQuery } from "../../../hooks/useMediaQuery";
import clsx from "clsx";

export default function HomeHeader() {
  const [confettiOn, setConfettiOn] = useState(false);
  const isTouch = useMediaQuery("(hover: none)", false);
  const [isCrowned, setIsCrowned] = useState(false);

  const handleCrowning = () => {
    setConfettiOn(true);
    setIsCrowned(true);
  };

  return (
    <header className={style.header}>
      <div
        className={clsx(style.me, isCrowned ? style.crowned : null)}
        onClick={() => {
          if (isTouch) handleCrowning();
        }}
      >
        <div
          onClick={() => {
            if (!isTouch) handleCrowning();
          }}
        />
        <Image
          src="/images/me.jpg"
          alt="Me, Ryan Theodore The"
          width={250}
          height={350}
        />
      </div>
      {confettiOn && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={571}
          recycle={false}
          onConfettiComplete={() => setConfettiOn(false)}
        />
      )}
      <div className={style.info}>
        <h1 className={style.title}>Hey, I&apos;m Ryan 👋</h1>
        <h2>
          I am a <span>student</span>, self-taught software{" "}
          <span>developer</span> and <span>designer</span> based in Singapore,
          passionate about harnessing technology to improve society through
          engineering solutions to solve real-world problems
        </h2>
        <div className={style.social}>
          {socialData.map((g, i) => (
            <SocialButton key={i} data={g} />
          ))}
        </div>
      </div>
    </header>
  );
}

const socialData: SocialButtonData[] = [
  { icon: "fab fa-github", link: "https://github.com/theboi" },
  {
    icon: "fab fa-linkedin",
    link: "https://www.linkedin.com/in/ryanthe/",
  },
  // {
  //   icon: "fab fa-instagram",
  //   link: "https://www.instagram.com/theboi_io/",
  // },
  {
    icon: "fab fa-medium-m",
    link: "https://medium.com/@theboi",
  },
  {
    icon: "fas fa-at",
    link: "mailto:ryan@ryanthe.com",
  },
];
