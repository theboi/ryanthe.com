import dynamic from "next/dynamic";

import style from "./style.module.scss";

export default function HockeilyPage() {
  const Game = dynamic(() => import("./game"), {
    ssr: false,
  });

  return (
    <div className={style.main}>
      <Game />
    </div>
  );
}

export async function getStaticProps() {
  return {
    props: {
      noLayout: true,
    },
  }
}
