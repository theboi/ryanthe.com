import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import works from "../../../../public/data/works/works.json";

import style from "./style.module.scss";

export default function HomeTile({
  entry,
}) {
  // https://stackoverflow.com/questions/53662208/types-from-both-keys-and-values-of-object-in-typescript
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(style.tile, isOpen && style.open)}
      style={{
        gridColumn: `span ${entry?.properties["Notability"]?.select?.name === "High" ? 2 : 1}`,
        background: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0) 66%, rgba(0, 0, 0, 0.6)), url(/images/works/${entry.properties["Key"]}.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <Link href={`/works/${entry?.properties["Key"]}`}>
        <a
          onClick={() => {
            setIsOpen((v) => !v);
          }}
          className={style.desc}
        >
          <h1>{entry.properties["Name"].title.map((e) => e.plain_text).join()}</h1>
          <p>{entry.properties["Discipline"].multi_select.map((e) => e.name).join(", ")}</p>
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
