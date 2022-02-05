import Link from "next/link";
import Image from "next/image";
import style from "./style.module.scss";
import { useState } from "react";
import { useMinWidth } from "../../../hooks/useDeviceType";
import clsx from "clsx";
import { useRouter } from "next/dist/client/router";

export default function NavBar() {
  const isDesktop = useMinWidth();
  const router = useRouter();
  console.log(router.pathname)
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <ul className={style.navbar} role="list">
      <li className={style.icon}>
        <Link href="/">
          <a>
            <Image
              src="/icons/logo192-light.png"
              alt="Ryan's Icon"
              width={50}
              height={50}
            />
          </a>
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
            <li key={p.name} className={router.pathname === p.url && style.isCurrentPath}>
              <Link href={p.url}>
                <a>{p.name.toUpperCase()}</a>
              </Link>
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

const paths = [
  {
    name: "Home",
    url: "/"
  },
  {
    name: "Works",
    url: "/works"
  }
]