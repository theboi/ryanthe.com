import { SocialButton, SocialButtonData } from "../../buttons/social";
import Image from "next/image";

import style from "./style.module.scss";

export default function HomeHeader() {
  return (
    <header className={style.header}>
      <Image src="/images/crowns/me.jpg" alt="Me, Ryan Theodore The" width={250} height={350} className={style.image} />
      <div className={style.info}>
        <h1 className={style.title}>Hey, I&apos;m Ryan</h1>
        <h2>
          I am a <span>student</span>, self-taught software{" "}
          <span>developer</span> and <span>designer</span> based in Singapore,
          passionate about harnessing technology to improve society through
          Science and Technology.
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
  { icon: "github", link: "https://github.com/theboi" },
  {
    icon: "linkedin",
    link: "https://www.linkedin.com/in/ryan-the/",
  },
  // {
  //   icon: "instagram",
  //   link: "https://www.instagram.com/theboi_io/",
  // },
  {
    icon: "medium-m",
    link: "https://medium.com/@theboi",
  },
];
