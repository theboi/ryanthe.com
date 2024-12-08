import Image from "next/legacy/image";

import style from "./style.module.scss";

export default function HomeListing() {

  return (
    <section className={style.listing}>
      {data.map((category) => (
        <div key={category.title}>
          <h1>{category.title}</h1>
          {category.entries.map((entry) => (
            <div key={entry.title}>
              <Image src={`/images/home/${entry.img}`} alt={entry.title} width={100} height={100} className={style.image} />
              <h2>{entry.title}</h2>
              <code className={style.period}>{entry.period}</code>
              <p>{entry.desc}</p>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
}

const data = [
  {
    title: "Education",
    entries: [
      {
        title: "School of Science and Technology, Singapore",
        desc: "In my four years at the School of Science and Technology, Singapore (SST), I learned various soft skills—including effective collaboration, adaptability in leadership, presentation skills—and technical skills—including design and programming. SST's self-driven learning culture taught me to overcome challenges through critical and creative thinking while staying committed and resilient. In overcoming these challenges, I also learned the value of teamwork and communicating effectively with teammates. As part of the O-Level examinations, I specialised in Computing+ for my Applied Subject, which equipped me with skills for solving problems through computational thinking.",
        period: "2019-2022",
        img: "sst.png",
      },
    ],
  },
  // {
  //   title: "Experience",
  //   entries: [
  //     {
  //       title: "",
  //       desc: "",
  //       period: "2021-2022",
  //       img: "sstinc.png",
  //     },
  //   ],
  // },
  {
    title: "Leadership",
    entries: [
      {
        title: "President, SST Inc TDP",
        desc: "As a leader in SST Inc, I led the ICT talent development programme (TDP) by coordinating bonding activities and the annual INCamp, overseeing the planning of events and weekly training lessons and managing the mentorship of SST Inc company projects. In doing so, I started and managed a Notion workspace, a team management platform, for the ExCo to keep track of the club's timeline, student list, meeting minutes and company projects. A reference copy of the Notion page I had started and passed down to my juniors can be found here.",
        period: "2021-2022",
        img: "sstinc.png",
      },
      {
        title: "ExCo, Robotics @APEX CCA",
        desc: "As a CCA leader, I started and managed a Notion workspace, a team management platform, for the ExCo and respective committees to keep track of the club's timeline, student list, meeting minutes, publicity and internal projects. I also started and helped run the club's Instagram page, including planning, designing and publishing posts. Specifically, as my CCA's head of training, I also planned the timeline for training and preparation aligned to upcoming competitions to allow our members to anticipate and be ready for events and challenges. A reference copy of the Notion page I had started and passed down to my juniors can be found here.",
        period: "2021-2022",
        img: "roboapex.png",
      },
      {
        title: "ExCo, SST Inc TDP",
        desc: "In SST Inc, I served as the Chief Technology Officer (React), helping develop SST Inc's roadmap pertaining to React and React Native, conducting React Native lessons for club members and maintaining SST Inc's software related to React and React Native, such as SST Inc's URL shortener. Seeing an area for improvement in the club's attendance taking at that time, I also took the initiative to develop SST Inc's automated attendance taker system, which uses a dynamically changing QR code or code to verify that students are present.",
        period: "2020-2021",
        img: "sstinc.png",
      },
      {
        title: "Vice-Chair, Class S201",
        desc: "I led the class in bonding and activities during allocated periods.",
        period: "2020",
        img: "sst.png",
      },
    ],
  },
  {
    title: "Service",
    entries: [
      {
        title: "",
        desc: "",
        period: "2021-2022",
        img: "",
      },
    ],
  },
];
