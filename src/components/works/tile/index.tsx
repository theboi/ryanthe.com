import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import works from "../../../data/works/works.json";

import style from "./style.module.scss";

export default function HomeTile({
  data,
}: {
  data: typeof works[keyof typeof works];
}) {
  // https://stackoverflow.com/questions/53662208/types-from-both-keys-and-values-of-object-in-typescript
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={clsx(style.tile, isOpen && style.open)}
      style={{
        gridColumn: `span ${data.notability === "High" ? 2 : 1}`,
        background: `linear-gradient(rgba(255, 255, 255, 0), rgba(0, 0, 0, 0) 66%, rgba(0, 0, 0, 0.6)), url(/images/works/${data.key}.jpg)`,
        backgroundSize: "cover",
      }}
    >
      <Link href={`/works/${data.key}`}>
        <a
          onClick={() => {
            setIsOpen((v) => !v);
          }}
          className={style.desc}
        >
          <h1>{data.name}</h1>
          <p>{data.discipline}</p>
          {/* <Image
            src={}
            layout="fill"
            alt={data.full_name}
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
