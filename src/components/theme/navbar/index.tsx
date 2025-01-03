"use client";

import clsx from "clsx";

import Link from "next/link";
import Image from "next/legacy/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useWindowSize } from "../../../hooks/useWindowSize";

import style from "./style.module.scss";

const paths = [
  {
    name: "Home",
    url: "/",
  },
  // {
  //   name: "Works",
  //   url: "/works",
  // },
];


export default function NavBar() {
  const isDesktop = useWindowSize().width > 768;
  const pathname = usePathname();

  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <ul className={style.navbar} role="list">
      <li className={style.icon}>
        <Link href="/" passHref={true}>
          <Image
            src="/icons/logo192-light.png"
            alt="Ryan's Icon"
            width={50}
            height={50}
          />
        </Link>
      </li>
      <div
        className={clsx(style.links, menuIsOpen && style.open)}
        onClick={() => {
          if (!isDesktop) setMenuIsOpen(!menuIsOpen);
        }}
      >
        {paths.map((p) => {
          return (
            <li
              key={p.name}
              className={
                pathname === p.url ? style.isCurrentPath : undefined
              }
            >
              <Link href={p.url}>{p.name.toUpperCase()}</Link>
            </li>
          );
        })}
      </div>
      <li
        className={style.hamBox}
        onClick={() => {
          if (!isDesktop) setMenuIsOpen(!menuIsOpen);
        }}
      >
        <div
          className={`${style.ham} ${menuIsOpen ? style.open : null}`}
          style={{ backgroundColor: "rgb(7, 7, 7)" }}
        />
      </li>
    </ul>
  );
}