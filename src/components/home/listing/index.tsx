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
        desc: "At the School of Science and Technology, we are able to choose an O-Level Applied Subject to develop our interests in a specific field. For myself, I chose Computing+ as my Applied Subject, which allows me to develop my computational thinking skills, and also further my knowledge in the Python language.",
        period: "2019-2022",
        img: "sst.png",
      },
    ],
  },
];
