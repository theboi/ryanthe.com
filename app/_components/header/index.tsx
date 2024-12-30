import { SocialButton, SocialButtonData } from "./socialButton";
import { MeImage } from "./meImage"

import style from "./style.module.scss";

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


export function HomeHeader() {
  return (
    <header className={style.header}>
      <MeImage />
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