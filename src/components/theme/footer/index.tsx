import Link from "next/link";
import { useDarkMode } from "../../../hooks/useDarkMode";
import { useState } from "react";
import { useMinWidth } from "../../../hooks/useDeviceType";

import style from "./style.module.scss";

export default function Footer() {

  return (
    <div className={style.footer}>
      <p>
        Copyright © 2022 Ryan Theodore The.{" "}
        <Link href="https://github.com/theboi/ryanthe.com">
          <a target="_blank">Open-sourced</a>
        </Link>{" "}
        on GitHub.
      </p>
    </div>
  );
}
