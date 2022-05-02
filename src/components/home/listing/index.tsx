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
        desc: "In the School of Science and Technology, Singapore (SST), I learnt various technical and soft skills",
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
        desc: "As the Head of Training within my CCA's ExCo, I started and utilised a project management platform called Notion to",
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
        desc: "some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blahsome desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah",
        period: "2020",
        img: "sst.png",
      },
    ],
  },
];
