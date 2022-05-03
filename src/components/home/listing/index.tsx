import Image from "next/image";

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
  {
    title: "Leadership",
    entries: [
      {
        title: "President, SST Inc TDP",
        desc: "As a leader in SST Inc, I led the talent development programme (TDP)",
        period: "2021-2022",
        img: "sstinc.png",
      },
      {
        title: "ExCo, Robotics @APEX CCA",
        desc: "As a CCA leader, I started and managed a Notion workspace, which is a team management platform, for the ExCo and respective committees to keep track of the club's timeline, student list, meeting minutes, publicity and internal projects. I also started and helped run the club's Instagram page, including planning, designing and publishing posts. Specifically, as the Head of Training of my CCA, I also planned the timeline for training and preparation aligned to upcoming competitions to allow our members to anticipate and be ready for events and challenges. A reference copy of the Notion page I had started and passed down to my juniors can be found here.",
        period: "2021-2022",
        img: "roboapex.png",
      },
      {
        title: "ExCo, SST Inc TDP",
        desc: "some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blahsome desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah",
        period: "2020-2021",
        img: "sstinc.png",
      },
      {
        title: "Vice-Chair, Class S201",
        desc: "My first opportunity to lead as a Vice-chairperson",
        period: "2020",
        img: "sst.png",
      },
    ],
  },
];
