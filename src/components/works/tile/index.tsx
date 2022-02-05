import Link from "next/link";

import style from "./style.module.scss";

export default function HomeTile({
  data,
}) {
  // https://stackoverflow.com/questions/53662208/types-from-both-keys-and-values-of-object-in-typescript
  return (
    <div
      className={style.tile}
      style={{
        gridColumn: `span ${data.notability === "High" ? 2 : 1}`,
        background: (() => {
          const url = data.media[0]?.file.url
          let img = ""
          if (!!url) {
            img = `, url(${data.media[0]?.file.url})`
          }
          return "linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0) 66%, rgba(0, 0, 0, 0.6))" + img
        })(),
      }}
    >
      <Link href={`/works/${data.id}`}>
        <a
          className={style.desc}
        >
          <h1>{data.name}</h1>
          <p>{data.discipline}</p>
          {/* <Image
            src={}
            layout="fill"
            alt={data.properties.full_name}
            className={style.img}
          /> */}
          {/* <div className={style.overlay}>
            <div>
              
            </div>
          </div> */}
        </a>
      </Link>
    </div>
  );
}
