import React from "react";

import style from "./style.module.css";

export default () => {
  const links = new Set([
    ["React", "https://reactjs.org/"]
  ])

  const content = [
    {
      header: "Skill",
      content: [
        {
          meta: "",
          title: "Front-end Dev",
          content: ["React", "React Native", "HTML \\ CSS", "AppKit", "UIKit", "Flutter"],
        },
        {
          meta: "",
          title: "Back-end Dev",
          content: ["Node.js", "Express"],
        },
        {
          meta: "",
          title: "Graphic Design",
          content: ["Sketch", "Figma"],
        },
        {
          meta: "",
          title: "Robotics",
          content: ["Lego EV3", "Arduino \\ Vex"],
        },
      ],
    },
    {
      header: "Work",
      content: [
        {
          meta: "2019",
          title: "Personal Portfolio Website",
          content: ["React", "HTML \\ CSS", "Redux", "Next.js"],
        },
      ],
    },
    {
      header: "Experience",
      content: [
        {
          meta: "2020",
          title: "CTO (React)",
          content: ["SST Inc."],
        },
        {
          meta: "2019 - 2022",
          title: "Secondary School",
          content: ["School of Science and Technology, Singapore"],
        },
        {
          meta: "2013 - 2018",
          title: "Primary School",
          content: ["Cantonment Primary School"],
        },
      ],
    },
  ];

  return (
    <>
      <div className={style.main}>
        {content.map((value, index) => (
          <div className={style.column} key={index}>
            <h1 className={style.header}>{value.header}</h1>

            {value.content.map((value, index) => (
              <div className={style.content} key={index}>
                <div className={style.title}>
                  <h3>{value.meta}</h3>
                  <h2>{value.title}</h2>
                </div>
                <ul>
                  {value.content.map((value, index) => (
                    <li key={index}>{value}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};
