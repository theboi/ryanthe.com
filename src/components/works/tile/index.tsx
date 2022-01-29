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
        gridColumn: `span ${data.notability?.select?.name === "High" ? 2 : 1}`,
        background: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0) 66%, rgba(0, 0, 0, 0.6)))`,//, url(/images/works/${data.key.rich_text[0]?.plain_text}.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <Link href={`/works/${data.key.rich_text[0]?.plain_text}`}>
        <a
          className={style.desc}
        >
          <h1>{data.name.title.map((e) => e.plain_text).join()}</h1>
          <p>{data.discipline.multi_select.map((e) => e.name).join(", ")}</p>
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
