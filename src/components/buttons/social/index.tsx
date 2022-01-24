import Link from "next/link";
import style from "./style.module.scss";

export interface SocialButtonData {
  icon: string;
  link: string;
}

export function SocialButton({ data }: { data: SocialButtonData }) {
  return (
    <Link href={data.link}>
      <a className={style.button} target="_blank" rel="noreferrer">
        <i className={`fab fa-${data.icon}`} />
      </a>
    </Link>
  );
}
