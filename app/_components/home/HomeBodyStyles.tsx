"use client";

import { useEffect } from "react";

export function HomeBodyStyles() {
  useEffect(() => {
    const previousStyles = {
      background: document.body.style.background,
      color: document.body.style.color,
      overflowX: document.body.style.overflowX,
      margin: document.body.style.margin,
    };

    document.body.style.background = "#ece6da";
    document.body.style.color = "#1c1a13";
    document.body.style.overflowX = "hidden";
    document.body.style.margin = "0";

    return () => {
      document.body.style.background = previousStyles.background;
      document.body.style.color = previousStyles.color;
      document.body.style.overflowX = previousStyles.overflowX;
      document.body.style.margin = previousStyles.margin;
    };
  }, []);

  return null;
}
