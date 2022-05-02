import { useEffect, useRef } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import style from "./style.module.scss";

export default function HockeilyPage() {
  const size = useWindowSize();
  const game = useRef(null);

  useEffect(() => {
    (async () => {
      const Phaser = await import("phaser");
      function preload() {
        this.load.setBaseURL("http://labs.phaser.io");

        this.load.image("sky", "assets/skies/space3.png");
        this.load.image("logo", "assets/sprites/phaser3-logo.png");
        this.load.image("red", "assets/particles/red.png");
      }

      function create() {
        this.add.image(400, 300, "sky");

        var particles = this.add.particles("red");

        var emitter = particles.createEmitter({
          speed: 100,
          scale: { start: 1, end: 0 },
          blendMode: "ADD",
        });

        var logo = this.physics.add.image(400, 100, "logo");

        logo.setVelocity(100, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        emitter.startFollow(logo);
      }

      const config = {
        type: Phaser.AUTO,
        width: 1920,
        height: 1080,
        physics: {
          default: "arcade",
          arcade: {
            gravity: { y: 200 },
          },
        },
        scene: {
          preload: preload,
          create: create,
        },
      };
      game.current = new Phaser.Game(config);
    })();
  }, []);

  useEffect(() => {
    if (!!game.current && !!size.width && !!size.height)
      game.current.scale.resize(size.width, size.height);
  }, [size]);

  return <div className={style.main}></div>;
}

export async function getStaticProps() {
  return {
    props: {
      noLayout: true,
    },
  };
}
