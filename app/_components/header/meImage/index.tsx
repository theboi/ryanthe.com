"use client";

import { useState } from "react";
import style from "./style.module.scss";
import { useMediaQuery } from "../../../../src/hooks/useMediaQuery";
import clsx from "clsx";
import Image from "next/legacy/image";
import Confetti from "react-confetti-boom";

export function MeImage() {
  const isTouch = useMediaQuery("(hover: none)", false);
  const [isCrowned, setIsCrowned] = useState(false);
  const [confettiOn, setConfettiOn] = useState(false);

  const handleCrowning = () => {
    setConfettiOn(true);
    setIsCrowned(true);
    setTimeout(() => {
      setConfettiOn(false);
    }, 3000);
  };

  return (
    <>
      <div
        className={clsx(style.me, isCrowned ? style.crowned : null)}
        onClick={() => {
          if (isTouch) handleCrowning();
        }}
      >
        <div
          onClick={() => {
            if (!isTouch) handleCrowning();
          }}
        />
        <Image
          src="/images/me.jpg"
          alt="Me, Ryan Theodore The"
          width={250}
          height={350}
        />
      </div>
      <Confetti
        mode="fall"
        particleCount={confettiOn ? 400 : 0}
        colors={["#ff577f", "#ff884b", "#ffd384", "#fff9b0"]}
        shapeSize={20}
      />
    </>
  );
}
