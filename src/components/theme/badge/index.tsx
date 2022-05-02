import Link from "next/link";

import style from "./style.module.scss";

export default function ThemeBadge({ children }: { children: React.ReactNode }) {
  return <span className={style.wrapper}>{children}</span>;
}
