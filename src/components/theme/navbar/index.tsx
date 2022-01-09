import Link from "next/link";
import Image from "next/image";
import style from "./style.module.scss";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { useRouter } from "next/router";
import { useState } from "react";
import { useMinWidth } from "../../../hooks/useDeviceType";

export default function NavBar() {
  const isDarkMode = useDarkMode();
  const isDesktop = useMinWidth();

  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const router = useRouter();

  return (
    <ul className={style.navbar} role="list">
      <li className={style.icon}>
        <Link href="/">
          <a>
            <Image
              src={
                isDarkMode
                  ? "/icons/logo192-dark.png"
                  : "/icons/logo192-light.png"
              }
              alt="Ryan's Icon"
              width={50}
              height={50}
            />
          </a>
        </Link>
      </li>
      <div
        className={`${style.navlinks} ${menuIsOpen ? style.open : null}`}
        onClick={() => {
          if (isDesktop) setMenuIsOpen(!menuIsOpen);
        }}
        style={{
          backgroundColor: isDarkMode
            ? "rgba(31, 31, 31, 0.7)"
            : "rgba(255, 255, 255, 0.7)",
        }}
      >
        {["ABOUT", "WORKS", "RESUME"].map((value, index) => {
          return (
            <li
              key={index}
              style={{
                color: isDarkMode ? "rgb(255, 255, 255)" : "rgb(7, 7, 7)",
              }}
            >
              <Link href={`/${value.toLowerCase()}`}>
                <a>{value}</a>
              </Link>
            </li>
          );
        })}
      </div>
      <li
        className={style.hamBox}
        onClick={() => {
          if (isDesktop) setMenuIsOpen(!menuIsOpen);
        }}
      >
        <div
          className={`${style.ham} ${menuIsOpen ? style.open : null}`}
          style={{
            backgroundColor: isDarkMode ? "rgb(255, 255, 255)" : "rgb(7, 7, 7)",
          }}
        />
      </li>
    </ul>
  );
}
