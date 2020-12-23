import React from "react";
import style from "./style.module.css";
import {
  SocialButton,
  SocialButtonData,
} from "../../components/buttons/social";

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

type State = {
  isCrowned: boolean;
};

type Props = {
  isDarkMode: boolean;
};

export default class AboutPage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isCrowned: false,
    };
  }

  render() {
    return (
      <div className={style.main}>
        <div className={style.meWrapper}>
          <img
            className={style.me}
            src="/images/crowns/me.jpg"
            alt="Me"
            style={this.state.isCrowned ? { cursor: "pointer" } : null}
          />
          <img
            className={style.crown}
            src={`/images/crowns/${this.props.isDarkMode ? "dark" : "light"}-crown.png`}
            alt="Crown"
            hidden={!this.state.isCrowned}
          />
          <div
            className={style.meMap}
            onClick={() => this.setState({ isCrowned: true })}
            style={this.state.isCrowned ? { cursor: "pointer" } : null}
          />
        </div>
        <div className={style.intro}>
          <h1 className={style.hey}>Hey,</h1>
          <p>
            I'm Ryan — a <span>student</span>, self-taught software{" "}
            <span>developer</span> and <span>designer</span> based in Singapore.
            <br/>Coding since 2018.
          </p>
          <div className={style.contact}>
            <i className={`far fa-envelope`} />
            <a href="mailto:ryan@ryanthe.com" target="_blank">
              ryan@ryanthe.com
            </a>
          </div>
          <div className={style.social}>
            {socialData.map((group) => (
              <div className={style.socialGroup}>
                {group.map((v, i) => (
                  <SocialButton key={i} data={v} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
