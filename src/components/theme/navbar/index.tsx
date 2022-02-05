import Link from "next/link";
import Image from "next/image";
import style from "./style.module.scss";
import { useState } from "react";
import { useMinWidth } from "../../../hooks/useDeviceType";

export default function NavBar() {
  const isDesktop = useMinWidth();

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
        className={`${style.links} ${menuIsOpen ? style.open : null}`}
        onClick={() => {
          if (!isDesktop) setMenuIsOpen(!menuIsOpen);
        }}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        {["WORKS"].map((v) => {
          return (
            <li
              key={v}
              style={{ color: "rgb(7, 7, 7)" }}
            >
              <Link href={`/${v.toLowerCase()}`}>
                <a>{v}</a>
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
