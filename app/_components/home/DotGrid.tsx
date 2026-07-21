"use client";

import { useEffect, useRef } from "react";

interface Dot {
  x: number;
  y: number;
  ox: number;
  oy: number;
  p: number;
}

interface Ripple {
  x: number;
  y: number;
  t0: number;
}

export default function DotGrid() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const currentCanvas = canvasRef.current;
    if (!currentCanvas) return;

    const currentContext = currentCanvas.getContext("2d");
    if (!currentContext) return;

    const canvas: HTMLCanvasElement = currentCanvas;
    const ctx: CanvasRenderingContext2D = currentContext;
    const supportsPointerInteraction = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    const SPACING = 28;
    const RADIUS = 150;
    const PUSH = 14;
    const RIPPLE_SPEED = 520;
    const RIPPLE_WIDTH = 80;
    const RIPPLE_LIFE = 1.6;
    const RIPPLE_PUSH = 22;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mx = -9999;
    let my = -9999;
    let dots: Dot[] = [];
    let w = 0;
    let h = 0;
    const ripples: Ripple[] = [];

    function readDotRGB() {
      const el = canvas.closest(".hw") ?? document.documentElement;
      const value = getComputedStyle(el).getPropertyValue("--dot-rgb").trim();
      return value || "28, 26, 19";
    }

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cols = Math.ceil(w / SPACING) + 2;
      const rows = Math.ceil(h / SPACING) + 2;
      const offX = (w - (cols - 1) * SPACING) / 2;
      const offY = (h - (rows - 1) * SPACING) / 2;
      dots = new Array<Dot>(cols * rows);
      let idx = 0;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots[idx++] = {
            x: offX + c * SPACING,
            y: offY + r * SPACING,
            ox: 0,
            oy: 0,
            p: 0,
          };
        }
      }
    }

    let animId = 0;

    function frame() {
      ctx.clearRect(0, 0, w, h);
      const rgb = readDotRGB();
      const R2 = RADIUS * RADIUS;
      const now = performance.now() / 1000;
      for (let i = ripples.length - 1; i >= 0; i--) {
        if (now - ripples[i].t0 > RIPPLE_LIFE) ripples.splice(i, 1);
      }

      for (let k = 0; k < dots.length; k++) {
        const d = dots[k];
        const dx = d.x - mx;
        const dy = d.y - my;
        const dist2 = dx * dx + dy * dy;
        let inf = 0;

        if (dist2 < R2) {
          const dist = Math.sqrt(dist2) || 0.0001;
          inf = 1 - dist / RADIUS;
          inf = inf * inf;
          const tx = (dx / dist) * inf * PUSH;
          const ty = (dy / dist) * inf * PUSH;
          d.ox += (tx - d.ox) * 0.18;
          d.oy += (ty - d.oy) * 0.18;
        } else {
          d.ox *= 0.88;
          d.oy *= 0.88;
        }

        let rippleInf = 0;
        let rdx = 0;
        let rdy = 0;
        for (let i = 0; i < ripples.length; i++) {
          const ripple = ripples[i];
          const age = now - ripple.t0;
          const radius = age * RIPPLE_SPEED;
          const ddx = d.x - ripple.x;
          const ddy = d.y - ripple.y;
          const dist = Math.sqrt(ddx * ddx + ddy * ddy) || 0.0001;
          const delta = Math.abs(dist - radius);
          if (delta < RIPPLE_WIDTH) {
            const c = 1 - delta / RIPPLE_WIDTH;
            const lifeFade = 1 - age / RIPPLE_LIFE;
            const amp = c * c * lifeFade;
            rippleInf = Math.max(rippleInf, amp);
            rdx += (ddx / dist) * amp * RIPPLE_PUSH;
            rdy += (ddy / dist) * amp * RIPPLE_PUSH;
          }
        }

        d.p += (Math.max(inf, rippleInf) - d.p) * 0.16;
        const alpha = 0.1 + d.p * 0.55;
        const dotRadius = 1.2 + d.p * 1.6;
        ctx.fillStyle = `rgba(${rgb}, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(d.x + d.ox + rdx, d.y + d.oy + rdy, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }
      animId = requestAnimationFrame(frame);
    }

    const onClick = (event: MouseEvent) => {
      ripples.push({
        x: event.clientX,
        y: event.clientY,
        t0: performance.now() / 1000,
      });
    };
    const onMouseMove = (event: MouseEvent) => {
      mx = event.clientX;
      my = event.clientY;
    };
    const onMouseLeave = () => {
      mx = -9999;
      my = -9999;
    };
    if (supportsPointerInteraction) {
      window.addEventListener("click", onClick, { passive: true });
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      window.addEventListener("mouseleave", onMouseLeave);
    }
    window.addEventListener("resize", build);

    build();
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      if (supportsPointerInteraction) {
        window.removeEventListener("click", onClick);
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseleave", onMouseLeave);
      }
      window.removeEventListener("resize", build);
    };
  }, []);

  return <canvas ref={canvasRef} id="dot-grid" />;
}
