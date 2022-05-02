import { useEffect, useRef, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import style from "./style.module.scss";

export default function HockeilyPage() {
  const size = useWindowSize();
  const game = useRef(null);
  const [isDoneLoading, setIsDoneLoading] = useState(false);

  // http://phaser.io/tutorials/making-your-first-phaser-3-game/part3
  useEffect(() => {
    (async () => {
      const { Phaser, preload, create, update } = await import("../../games/hockeily/game");
      const config = {
        type: Phaser.AUTO,
        width: 0,
        height: 0,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 200 },
          },
        },
        scene: {
          preload,
          create,
          update,
        },
      };
      game.current = new Phaser.Game(config);
      console.log(game.current);

      setIsDoneLoading(true);
    })();
  }, []);

  useEffect(() => {
    if (isDoneLoading) game.current.scale.resize(size.width, size.height);
  }, [size, isDoneLoading]);

  return <div className={style.main}></div>;
}

export async function getStaticProps() {
  return {
    props: {
      noLayout: true,
      meta: {
        title: "An electric field hockey game!",
        desc: "By ryan!!",
      },
    },
  };
}
