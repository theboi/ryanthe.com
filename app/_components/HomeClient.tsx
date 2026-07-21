"use client";

import { useEffect, useRef, type ReactNode } from "react";
import "../home.scss";

export interface HomeClientProps {
  children: ReactNode;
}

export default function HomeClient({ children }: HomeClientProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const wrapperElement: HTMLDivElement = wrapper;

    const hero = wrapperElement.querySelector<HTMLElement>("[data-home-hero]");
    const arrowGroup = wrapperElement.querySelector<SVGGElement>("[data-home-arrow]");
    const targetGroup = wrapperElement.querySelector<SVGGElement>("[data-home-target]");
    if (!hero) return;
    const heroElement: HTMLElement = hero;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp01 = (value: number) => (value < 0 ? 0 : value > 1 ? 1 : value);
    const ease = (t: number) => t * t * (3 - 2 * t);

    wrapperElement.style.setProperty("--t", "0");

    const reveals = Array.from(wrapperElement.querySelectorAll<HTMLElement>("[data-reveal]"));
    for (const element of reveals) {
      element.style.opacity = "0";
      element.style.transform = "translateY(56px)";
      element.style.willChange = "opacity, transform";
    }

    // Layout values are static between resizes, so cache them instead of
    // forcing a style recalculation on every scroll frame.
    let viewportWidth = 0;
    let viewportHeight = 0;
    let restTop = 0;
    let cardHeight = 0;
    let cardWidth = 0;
    let restLeft = 0;

    function recomputeLayout() {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;
      const styles = getComputedStyle(wrapperElement);
      const isMobile = viewportWidth <= 720;

      restTop =
        parseFloat(styles.getPropertyValue("--card-rest-top")) || (isMobile ? 64 : 96);
      cardHeight =
        parseFloat(styles.getPropertyValue("--card-h")) || (isMobile ? 480 : 580);

      const rawCardWidth = styles.getPropertyValue("--card-w").trim();
      const fallbackGutter = isMobile ? 28 : 56;
      const parsedCardWidth = parseFloat(rawCardWidth);
      cardWidth =
        !parsedCardWidth ||
        Number.isNaN(parsedCardWidth) ||
        rawCardWidth.includes("min(") ||
        rawCardWidth.includes("calc(")
          ? Math.min(960, viewportWidth - fallbackGutter)
          : parsedCardWidth;
      restLeft = (viewportWidth - cardWidth) / 2;
    }

    function updateHero() {
      const scrollY = window.scrollY;
      const progress = clamp01(scrollY / viewportHeight);
      const easedProgress = ease(progress);

      let top: number;
      let left: number;
      let width: number;
      let height: number;
      let radius: number;

      if (scrollY <= viewportHeight) {
        top = lerp(0, restTop, easedProgress);
        left = lerp(0, restLeft, easedProgress);
        width = lerp(viewportWidth, cardWidth, easedProgress);
        height = lerp(viewportHeight, cardHeight, easedProgress);
        radius = lerp(0, 24, easedProgress);
      } else {
        top = restTop - (scrollY - viewportHeight);
        left = restLeft;
        width = cardWidth;
        height = cardHeight;
        radius = 24;
      }

      heroElement.style.top = `${top}px`;
      heroElement.style.left = `${left}px`;
      heroElement.style.width = `${width}px`;
      heroElement.style.height = `${height}px`;
      heroElement.style.borderRadius = `${radius}px`;
      wrapperElement.style.setProperty("--t", easedProgress.toFixed(4));

      if (!arrowGroup) return;

      const arrowProgress = clamp01(scrollY / (viewportHeight * 0.7));
      let motionProgress: number;

      if (arrowProgress < 0.2) {
        const anticipationProgress = arrowProgress / 0.2;
        motionProgress = -Math.sin(anticipationProgress * Math.PI) * 0.04;
      } else {
        const travelProgress = (arrowProgress - 0.2) / 0.8;
        motionProgress = travelProgress * travelProgress * (3 - 2 * travelProgress);
      }

      const translateX = motionProgress * 360;
      const translateY = motionProgress * -360;
      const opacity =
        arrowProgress < 0.45
          ? 1
          : Math.max(0, 1 - (arrowProgress - 0.45) / 0.35);

      arrowGroup.setAttribute("transform", `translate(${translateX} ${translateY})`);
      arrowGroup.style.opacity = opacity.toFixed(3);

      if (!targetGroup) return;

      const revealProgress = clamp01((arrowProgress - 0.25) / 0.75);
      const rings = targetGroup.children;
      const ringCount = rings.length;
      const stagger = 0.55;

      for (let index = 0; index < ringCount; index++) {
        const start = (index / ringCount) * stagger;
        let localProgress = (revealProgress - start) / (1 - stagger * 0.6);
        localProgress = clamp01(localProgress);

        const easedLocalProgress = ease(localProgress);
        const scale = 0.55 + easedLocalProgress * 0.45;
        const radialFade = 0.18 + (index / (ringCount - 1)) * 0.82;
        const ring = rings[index] as SVGElement;

        ring.setAttribute("transform", `scale(${scale.toFixed(3)})`);
        ring.style.opacity = (easedLocalProgress * radialFade).toFixed(3);
      }
    }

    // Read all reveal positions first, then write styles in a separate pass
    // to avoid repeated synchronous layouts.
    const revealEases = new Float32Array(reveals.length);
    function updateReveals() {
      const start = viewportHeight * 0.92;
      const end = viewportHeight * 0.55;
      const span = start - end;

      for (let index = 0; index < reveals.length; index++) {
        const top = reveals[index].getBoundingClientRect().top;
        const progress = clamp01((start - top) / span);
        revealEases[index] = ease(progress);
      }

      for (let index = 0; index < reveals.length; index++) {
        const easedProgress = revealEases[index];
        const element = reveals[index];
        element.style.opacity = String(easedProgress);
        element.style.transform = `translateY(${(1 - easedProgress) * 56}px)`;
      }
    }

    let animationFrameId = 0;

    function updateScrollAnimations() {
      updateHero();
      updateReveals();
    }

    function handleScroll() {
      if (animationFrameId) return;

      animationFrameId = requestAnimationFrame(() => {
        animationFrameId = 0;
        updateScrollAnimations();
      });
    }

    function handleResize() {
      recomputeLayout();
      updateScrollAnimations();
    }

    recomputeLayout();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    updateScrollAnimations();

    const fontLayoutFrame = window.setTimeout(updateScrollAnimations, 80);
    const settledLayoutFrame = window.setTimeout(updateScrollAnimations, 400);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.clearTimeout(fontLayoutFrame);
      window.clearTimeout(settledLayoutFrame);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="hw" data-tone="bone" data-card-style="bordered">
      {children}
    </div>
  );
}
