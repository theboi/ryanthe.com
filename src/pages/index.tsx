import React, { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import style from "./style.module.scss";
import { useMinWidth } from "../hooks/useDeviceType";

export default function HomePage() {
  const isDesktop = useMinWidth(950); // 950px is when number of grid columns = 1

  return (
    <div className={style.main}>
      <section>
        <div className={style.grid}>
          {content.map((e, i) => (
            <div
              className={style.tile}
              style={{ gridColumn: `span ${e.width}` }}
              key={i}
            >
              <Link href={`/works/${e.title.toLowerCase().replace(" ", "-")}`}>
                <a>
                  <Image
                    src={`/images/works/${e.title
                      .toLowerCase()
                      .replace(" ", "-")}.jpg`}
                    layout="fill"
                    alt={e.alt}
                    className={style.img}
                  />
                  <div className={style.overlay}>{e.title}</div>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* <Image src="https://picsum.photos/200" layout="fill"></Image>
        <Image src="https://picsum.photos/200" layout="fill"></Image>
        <Image src="https://picsum.photos/200" layout="fill"></Image> */}
    </div>
  );
}

const content = [
  {
    title: "Hello",
    width: 2,
  },
  {
    title: "ChangeMakers InnoFest",
    alt: "My InnoFest team holding our champion trophies.",
    width: 1,
    tags: "",
  },
  {
    title: "Hello",
    width: 1,
  },
  {
    title: "Hello",
    width: 2,
  },
  {
    title: "Hello",
    width: 1,
  },
  {
    title: "Hello",
    width: 2,
  },
  {
    title: "Hello",
    width: 2,
  },
  {
    title: "Hello",
    width: 1,
  },
];
