import Link from "next/link";
import style from "./style.module.scss";

export interface SocialButtonData {
  icon: string;
  link: string;
}

export function SocialButton({ data }: { data: SocialButtonData }) {
  return (
    <Link
      className={style.button}
      passHref
      href={data.link}
      target="_blank"
      rel="noreferrer"
    >
      <i className={data.icon} />
    </Link>
  );
}
