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
        desc: "some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blahsome desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah",
        period: "2019-2022",
        img: "sst.png",
      },
    ],
  },
  {
    title: "Leadership",
    entries: [
      {
        title: "School of Science and Technology, Singapore",
        desc: "some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blahsome desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah some desc here lorem ipsum blah blah blah",
        period: "2019-2022",
        img: "sst.png",
      },
    ],
  },
];
