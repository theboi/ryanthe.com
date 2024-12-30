import Link from "next/link";

import style from "./style.module.scss";

export default function Footer() {

  return (
    <div className={style.footer}>
      <p>
        Copyright © 2022 Ryan Theodore The. Open-sourced on{" "}
        <Link href="https://github.com/theboi/ryanthe.com" target="_blank">
          GitHub
        </Link>.
      </p>
    </div>
  );
}
