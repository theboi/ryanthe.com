import React from "react";

import style from "./style.module.css";

export default () => {
  const content = [
    {
      header: "Skill",
      content: [
        {
          meta: "",
          title: "Front-end Dev",
          content: ["React", "React Native", "HTML \\ CSS", "AppKit", "UIKit"],
        },
        {
          meta: "",
          title: "Back-end Dev",
          content: ["Node.js"],
        },
        {
          meta: "",
          title: "Graphic Design",
          content: ["Sketch"],
        },
      ],
    },
    {
      header: "Work",
      content: [
        {
          meta: "2019",
          title: "Personal Portfolio Website",
          content: ["React", "React Native", "HTML \\ CSS", "AppKit", "UIKit"],
        },
      ],
    },
    {
      header: "Experience",
      content: [
        {
          meta: "",
          title: "School",
          content: ["School of Science and Technology, Singapore"],
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
