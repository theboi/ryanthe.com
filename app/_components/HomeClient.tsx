"use client";

import { useEffect, useRef } from "react";
import "../home.scss";

export default function HomeClient() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const arrowGroupRef = useRef<SVGGElement>(null);
  const targetGroupRef = useRef<SVGGElement>(null);

  /* ─── body background ─── */
  useEffect(() => {
    const prev = {
      bg: document.body.style.background,
      color: document.body.style.color,
      overflowX: document.body.style.overflowX,
      margin: document.body.style.margin,
    };
    document.body.style.background = "#ece6da";
    document.body.style.color = "#1c1a13";
    document.body.style.overflowX = "hidden";
    document.body.style.margin = "0";
    return () => {
      document.body.style.background = prev.bg;
      document.body.style.color = prev.color;
      document.body.style.overflowX = prev.overflowX;
      document.body.style.margin = prev.margin;
    };
  }, []);

  /* ─── Hero scroll + arrow + card reveals ─── */
  useEffect(() => {
    const hero = heroRef.current as HTMLElement;
    const wrapper = wrapperRef.current as HTMLDivElement;
    const arrowGroup = arrowGroupRef.current;
    const targetGroup = targetGroupRef.current;
    if (!hero || !wrapper) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
    const ease = (t: number) => t * t * (3 - 2 * t);

    wrapper.style.setProperty("--t", "0");

    const reveals = Array.from(wrapper.querySelectorAll("[data-reveal]")) as HTMLElement[];
    for (const el of reveals) {
      el.style.opacity = "0";
      el.style.transform = "translateY(56px)";
      el.style.willChange = "opacity, transform";
    }

    // Layout values are static between resizes — caching them avoids forcing
    // a style recalc on every scroll frame (was the main jank source).
    let vw = 0, vh = 0, restTop = 0, cardH = 0, cardW = 0, restLeft = 0;
    function recomputeLayout() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      const cs = getComputedStyle(wrapper);
      const isMobile = vw <= 720;
      restTop = parseFloat(cs.getPropertyValue("--card-rest-top")) || (isMobile ? 64 : 96);
      cardH = parseFloat(cs.getPropertyValue("--card-h")) || (isMobile ? 480 : 580);
      const cardWRaw = cs.getPropertyValue("--card-w").trim();
      const fallbackGutter = isMobile ? 28 : 56;
      const parsed = parseFloat(cardWRaw);
      cardW = (!parsed || isNaN(parsed) || cardWRaw.includes("min(") || cardWRaw.includes("calc("))
        ? Math.min(960, vw - fallbackGutter)
        : parsed;
      restLeft = (vw - cardW) / 2;
    }
    recomputeLayout();

    function update() {
      const sy = window.scrollY;

      const t = clamp01(sy / vh);
      const e = ease(t);

      let top: number, left: number, width: number, height: number, radius: number;
      if (sy <= vh) {
        top = lerp(0, restTop, e);
        left = lerp(0, restLeft, e);
        width = lerp(vw, cardW, e);
        height = lerp(vh, cardH, e);
        radius = lerp(0, 24, e);
      } else {
        top = restTop - (sy - vh);
        left = restLeft;
        width = cardW;
        height = cardH;
        radius = 24;
      }

      hero.style.top = top + "px";
      hero.style.left = left + "px";
      hero.style.width = width + "px";
      hero.style.height = height + "px";
      hero.style.borderRadius = radius + "px";
      wrapper.style.setProperty("--t", e.toFixed(4));

      /* Arrow animation */
      if (arrowGroup) {
        const ap = clamp01(sy / (vh * 0.7));

        let prog: number;
        if (ap < 0.2) {
          const p = ap / 0.2;
          prog = -Math.sin(p * Math.PI) * 0.04;
        } else {
          const p = (ap - 0.2) / 0.8;
          prog = p * p * (3 - 2 * p);
        }

        const tx = prog * 360;
        const ty = prog * -360;
        let op: number;
        if (ap < 0.45) op = 1;
        else op = Math.max(0, 1 - (ap - 0.45) / 0.35);

        arrowGroup.setAttribute("transform", `translate(${tx} ${ty})`);
        arrowGroup.style.opacity = op.toFixed(3);

        if (targetGroup) {
          const reveal = clamp01((ap - 0.25) / 0.75);
          const rings = targetGroup.children;
          const N = rings.length;
          const stagger = 0.55;
          for (let i = 0; i < N; i++) {
            const start = (i / N) * stagger;
            let local = (reveal - start) / (1 - stagger * 0.6);
            if (local < 0) local = 0;
            else if (local > 1) local = 1;
            const eased = local * local * (3 - 2 * local);
            const scale = 0.55 + eased * 0.45;
            const radialFade = 0.18 + (i / (N - 1)) * 0.82;
            (rings[i] as SVGElement).setAttribute("transform", `scale(${scale.toFixed(3)})`);
            (rings[i] as SVGElement).style.opacity = (eased * radialFade).toFixed(3);
          }
        }
      }
    }

    // Two-pass to avoid layout thrashing: read all rects first, then write
    // all styles. Interleaving read/write across N elements forces N layouts.
    const revealEases = new Float32Array(reveals.length);
    function updateReveals() {
      const start = vh * 0.92;
      const end = vh * 0.55;
      const span = start - end;
      for (let i = 0; i < reveals.length; i++) {
        const top = reveals[i].getBoundingClientRect().top;
        let p = (start - top) / span;
        if (p < 0) p = 0;
        else if (p > 1) p = 1;
        revealEases[i] = p * p * (3 - 2 * p);
      }
      for (let i = 0; i < reveals.length; i++) {
        const e = revealEases[i];
        const el = reveals[i];
        el.style.opacity = String(e);
        el.style.transform = `translateY(${(1 - e) * 56}px)`;
      }
    }

    let raf = 0;
    function tick() {
      update();
      updateReveals();
    }
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        tick();
      });
    }
    function onResize() {
      recomputeLayout();
      tick();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    tick();
    const t1 = setTimeout(tick, 80);
    const t2 = setTimeout(tick, 400);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      clearTimeout(t1);
      clearTimeout(t2);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* ─── Dot-grid canvas ─── */
  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    const SPACING = 28;
    const RADIUS = 150;
    const PUSH = 14;
    const RIPPLE_SPEED = 520;
    const RIPPLE_WIDTH = 80;
    const RIPPLE_LIFE = 1.6;
    const RIPPLE_PUSH = 22;

    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mx = -9999, my = -9999;
    let dots: { x: number; y: number; ox: number; oy: number; p: number }[] = [];
    let w = 0, h = 0;
    const ripples: { x: number; y: number; t0: number }[] = [];

    function readDotRGB() {
      const el = canvas.closest(".hw") || document.documentElement;
      const v = getComputedStyle(el as Element).getPropertyValue("--dot-rgb").trim();
      return v || "28, 26, 19";
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
      dots = new Array(cols * rows);
      let idx = 0;
      for (let c = 0; c < cols; c++) {
        for (let r = 0; r < rows; r++) {
          dots[idx++] = { x: offX + c * SPACING, y: offY + r * SPACING, ox: 0, oy: 0, p: 0 };
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
        let rdx = 0, rdy = 0;
        for (let i = 0; i < ripples.length; i++) {
          const rp = ripples[i];
          const age = now - rp.t0;
          const radius = age * RIPPLE_SPEED;
          const ddx = d.x - rp.x;
          const ddy = d.y - rp.y;
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

    const onClick = (e: MouseEvent) => {
      ripples.push({ x: e.clientX, y: e.clientY, t0: performance.now() / 1000 });
    };
    const onTouch = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        ripples.push({ x: e.touches[0].clientX, y: e.touches[0].clientY, t0: performance.now() / 1000 });
      }
    };
    const onMouseMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    const onMouseLeave = () => { mx = -9999; my = -9999; };
    const onTouchMove = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) { mx = e.touches[0].clientX; my = e.touches[0].clientY; }
    };

    window.addEventListener("click", onClick, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("resize", build);

    build();
    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("click", onClick);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("resize", build);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="hw" data-tone="bone" data-card-style="bordered">
      {/* Dot-grid background */}
      <canvas ref={canvasRef} id="dot-grid" />

      {/* Hero card — position:fixed, transformed by JS */}
      <article ref={heroRef} className="hero" id="hero">
        <div className="hero-shape" aria-hidden="true">
          <svg viewBox="-200 -200 400 400" preserveAspectRatio="xMidYMid meet">
            <g ref={targetGroupRef} id="target-group">
              <circle className="target-ring"        data-i="0" cx="0" cy="0" r="180" />
              <circle className="target-ring"        data-i="1" cx="0" cy="0" r="140" />
              <circle className="target-ring accent" data-i="2" cx="0" cy="0" r="100" />
              <circle className="target-ring"        data-i="3" cx="0" cy="0" r="60" />
              <circle className="target-bullseye"    data-i="4" cx="0" cy="0" r="22" />
            </g>
            <g ref={arrowGroupRef} id="arrow-group">
              <g className="arrow">
                <line x1="-150" y1="120" x2="140" y2="-150" />
                <polyline points="50,-150 140,-150 140,-60" />
              </g>
            </g>
          </svg>
          <span className="hero-shape-mark">Forward · 26°</span>
        </div>

        <div className="hero-inner">
          <div className="hero-row">
            <div className="left">
              <span className="mono">Portfolio · 2026 · v.07</span>
            </div>
            <div className="right">
              <span className="mono">Index · 06</span>
            </div>
          </div>

          <div className="hero-headline">
            <h1 className="hero-name">Ryan The,</h1>
            <p className="hero-tagline">
              student, self-taught software developer &amp; designer based in Singapore.{" "}
              <span className="muted">
                Passionate about harnessing technology to improve society — building solutions
                across the web, native apps, and robotics.
              </span>
            </p>
          </div>

          <div className="hero-bottom">
            <div className="hero-grid">
              <div><span className="mono">Practice</span><b>Dev ↔ Design</b></div>
              <div><span className="mono">Stack</span><b>React · Swift · Python</b></div>
              <div><span className="mono">Based</span><b>Singapore</b></div>
              <div><span className="mono">Reach</span><b>ryan@ryanthe.com</b></div>
            </div>
            <div className="hero-cue">
              <span className="mono">Scroll</span>
              <span className="arrow" />
            </div>
          </div>
        </div>
      </article>

      {/* Spacer reserves scroll height for phase-1 + hero's resting slot */}
      <div className="hero-spacer" aria-hidden="true" />

      <main className="stack">

        {/* ─ Selected Work ─ */}
        <div className="section-label" data-reveal="">
          <span className="mono">Selected Work</span>
          <span className="mono">01 / 03</span>
        </div>

        {/* Card 2 — NRC 2021 */}
        <article className="card card-project" data-reveal="">
          <header>
            <h2>
              NRC 2021
              <sup style={{ fontSize: 24, color: "var(--muted)", fontWeight: 400, letterSpacing: 0, marginLeft: 6 }}>↗</sup>
            </h2>
            <p className="desc">
              National Robotics Competition — Future Engineers Category.{" "}
              <span className="muted">Programmed an autonomous robot with a computer vision pipeline to detect obstacles and navigate a track.</span>
            </p>
          </header>
          <div className="visual">
            <span className="mono label">[ robot · CV pipeline ]</span>
            <span className="mono label-c">16 : 9</span>
          </div>
          <footer>
            <div><span className="mono">Year</span><b>2021</b></div>
            <div><span className="mono">Role</span><b>Programming, CV</b></div>
            <div><span className="mono">Stack</span><b>Python, OpenCV, TF</b></div>
            <div><span className="mono">Category</span><b>Future Engineers</b></div>
          </footer>
        </article>

        {/* Card 3 — RoboCup 2021 */}
        <article className="card card-split" data-reveal="">
          <div className="visual-side">
            <span className="mono label" style={{ color: "rgba(255,255,255,0.85)" }}>[ line-tracing run · arena ]</span>
            <span className="mono label-c" style={{ color: "rgba(255,255,255,0.85)" }}>1 : 1</span>
          </div>
          <div className="text-side">
            <div>
              <span className="mono">02 / RoboCup</span>
              <h2>RoboCup 2021</h2>
              <p className="body">
                2nd Place — Robotics @APEX team.{" "}
                <span className="muted">
                  Despite a less-than-optimal line-tracing algorithm and tight timeline, our team
                  returned to school whenever possible to iterate, eventually pulling through with
                  second place by staying resilient.
                </span>
              </p>
            </div>
            <div className="meta">
              <div><span className="mono">Year</span><b>2021</b></div>
              <div><span className="mono">Role</span><b>Programmer</b></div>
              <div><span className="mono">Hardware</span><b>Lego EV3</b></div>
              <div><span className="mono">Result</span><b>2nd Place</b></div>
            </div>
          </div>
        </article>

        {/* Card 4 — Splash Awards */}
        <article className="card card-quote" data-reveal="">
          <div className="topline">
            <span className="mono">03 / Splash Awards 2021</span>
            <span className="mono">Innovation · 2021</span>
          </div>
          <blockquote>
            &ldquo;Critical &amp; creative thinking turn picked-up skills into innovative strategies.
            <span className="muted">
              {" "}Tour glasses prototype — 1st Runner-up at Splash Awards 2021, Champions at
              ChangeMakers InnoFest 2020.&rdquo;
            </span>
          </blockquote>
          <div className="bottom">
            <h2>
              Tour Glasses{" "}
              <small>— a wearable that narrates the city you&apos;re walking through.</small>
            </h2>
            <div className="specimen">
              <span className="mono">Stack</span>
              <span className="swatch" style={{ background: "var(--accent)" }} />
              <span className="swatch" style={{ background: "oklch(78% 0.04 220)" }} />
              <span className="swatch" style={{ background: "#1c1a13" }} />
            </div>
          </div>
        </article>

        {/* ─ Education & Leadership ─ */}
        <div className="section-label" data-reveal="">
          <span className="mono">Education &amp; Leadership</span>
          <span className="mono">04 timeline</span>
        </div>

        {/* Card 5 — Background */}
        <article className="card card-list" data-reveal="">
          <div className="head">
            <h2>
              Where I&apos;ve<br />
              <em style={{ fontWeight: 400 }}>grown.</em>
            </h2>
            <span className="mono">Updated · 2024</span>
          </div>
          <ul>
            <li>
              <span className="mono num">001</span>
              <div className="title-row">
                <span className="t">Eunoia Junior College</span>
                <span className="s">Singapore-Cambridge GCE A-Levels. Data Analytics &amp; Visualisation module.</span>
              </div>
              <span className="reading">2023 — 2024</span>
            </li>
            <li>
              <span className="mono num">002</span>
              <div className="title-row">
                <span className="t">President · SST Inc TDP</span>
                <span className="s">Led the ICT talent development programme — INCamp, weekly training, mentorship.</span>
              </div>
              <span className="reading">2021 — 2022</span>
            </li>
            <li>
              <span className="mono num">003</span>
              <div className="title-row">
                <span className="t">CTO (React) · SST Inc</span>
                <span className="s">Built the club&apos;s automated attendance taker; led React/React Native roadmap and lessons.</span>
              </div>
              <span className="reading">2020 — 2021</span>
            </li>
            <li>
              <span className="mono num">004</span>
              <div className="title-row">
                <span className="t">School of Science &amp; Technology, Singapore</span>
                <span className="s">Four years; Computing+ for O-Levels. Robotics @APEX CCA, EXCO.</span>
              </div>
              <span className="reading">2019 — 2022</span>
            </li>
          </ul>
        </article>

        {/* ─ Templates · Future Slides ─ */}
        <div className="section-label" data-reveal="">
          <span className="mono">Templates &middot; Future Slides</span>
          <span className="mono">T1 — T7</span>
        </div>

        {/* T1 — Stats / Metrics */}
        <article className="card card-stats" data-reveal="">
          <div className="head">
            <h2>
              By the<br />
              <em style={{ fontWeight: 400 }}>numbers.</em>
            </h2>
            <span className="mono">T1 · Stats</span>
          </div>
          <div className="grid">
            <div>
              <span className="mono">Shipped</span>
              <span className="num">12<span className="accent">+</span></span>
              <span className="lbl">Projects across web, native &amp; robotics.</span>
            </div>
            <div>
              <span className="mono">Years</span>
              <span className="num">06</span>
              <span className="lbl">Building software since 2019.</span>
            </div>
            <div>
              <span className="mono">Awards</span>
              <span className="num">04</span>
              <span className="lbl">Including 1st Runner-up, Splash Awards.</span>
            </div>
          </div>
          <footer>
            <span className="mono">Updated · 2026</span>
            <span className="mono">— stat block —</span>
          </footer>
        </article>

        {/* T2 — Gallery (2x2) */}
        <article className="card card-gallery" data-reveal="">
          <header>
            <h2>Selected<br />artefacts.</h2>
            <p className="desc">
              A grid for screenshots, photographs, or process shots. Each tile carries a
              small caption block.
            </p>
          </header>
          <div className="grid">
            <div className="tile a">
              <div className="fill" />
              <span className="mono lbl">[ image · 01 ]</span>
              <div className="cap"><b>Project A</b><span>4 : 3</span></div>
            </div>
            <div className="tile b">
              <div className="fill" />
              <span className="mono lbl">[ image · 02 ]</span>
              <div className="cap"><b>Project B</b><span>4 : 3</span></div>
            </div>
            <div className="tile c">
              <div className="fill" />
              <span className="mono lbl">[ image · 03 ]</span>
              <div className="cap"><b>Project C</b><span>4 : 3</span></div>
            </div>
            <div className="tile d">
              <div className="fill" />
              <span className="mono lbl">[ image · 04 ]</span>
              <div className="cap"><b>Project D</b><span>4 : 3</span></div>
            </div>
          </div>
        </article>

        {/* T3 — Process / Timeline */}
        <article className="card card-process" data-reveal="">
          <div className="head">
            <h2>
              How it<br />
              <em style={{ fontWeight: 400 }}>came together.</em>
            </h2>
            <span className="mono">T3 · Process</span>
          </div>
          <div className="steps">
            <div className="step active">
              <span className="dot" />
              <span className="mono num">01 · Discover</span>
              <h3>Research &amp; framing</h3>
              <p>Interviews, audits, scoping — figuring out what&apos;s actually worth building.</p>
            </div>
            <div className="step active">
              <span className="dot" />
              <span className="mono num">02 · Sketch</span>
              <h3>Low-fi exploration</h3>
              <p>Wireframes, paper, whiteboards. Diverging widely before converging.</p>
            </div>
            <div className="step">
              <span className="dot" />
              <span className="mono num">03 · Build</span>
              <h3>Prototype &amp; ship</h3>
              <p>Real code, real components, real edge cases. Shipping early and often.</p>
            </div>
            <div className="step">
              <span className="dot" />
              <span className="mono num">04 · Reflect</span>
              <h3>Measure &amp; iterate</h3>
              <p>Telemetry, retros, follow-ups. What worked, what didn&apos;t, what&apos;s next.</p>
            </div>
          </div>
          <footer>
            <span className="mono">Method · iterative</span>
            <span className="mono">— process block —</span>
          </footer>
        </article>

        {/* T4 — Featured */}
        <article className="card card-feature" data-reveal="">
          <div className="visual">
            <span className="mono badge">Now Featuring</span>
            <span className="mono corner">[ hero · 16 : 9 ]</span>
          </div>
          <div className="overlay">
            <h2>
              A featured<br />
              piece, <span className="em">in motion.</span>
            </h2>
            <div className="meta">
              <div><span className="mono">Type</span><b>Case Study</b></div>
              <div><span className="mono">Year</span><b>2026</b></div>
              <div><span className="mono">Role</span><b>Lead Designer</b></div>
              <div><span className="mono">Read</span><b>8 min</b></div>
            </div>
          </div>
        </article>

        {/* T5 — Spec sheet */}
        <article className="card card-spec" data-reveal="">
          <div className="lhs">
            <div>
              <span className="mono">T5 · Spec sheet</span>
              <h2>
                The<br />
                <span className="em">details.</span>
              </h2>
            </div>
            <p className="lead">
              For project metadata that doesn&apos;t fit neatly elsewhere — versions,
              dependencies, credits.{" "}
              <span className="muted">Long-form colophon block; mono keys, prose values.</span>
            </p>
            <span className="mono sig">— spec block —</span>
          </div>
          <div className="rhs">
            <div className="row"><span className="mono k">Version</span><span className="v"><b>v1.0.4</b></span><span className="tag">stable</span></div>
            <div className="row"><span className="mono k">Released</span><span className="v">March 2026</span><span className="tag">recent</span></div>
            <div className="row"><span className="mono k">Stack</span><span className="v">React, TypeScript, Tailwind</span><span className="tag">web</span></div>
            <div className="row"><span className="mono k">Hosted</span><span className="v">Vercel · edge runtime</span><span className="tag">live</span></div>
            <div className="row"><span className="mono k">Repo</span><span className="v">github.com/owner/repo</span><span className="tag">public</span></div>
            <div className="row"><span className="mono k">Credits</span><span className="v">Designed &amp; built solo</span><span className="tag">solo</span></div>
            <div className="row"><span className="mono k">License</span><span className="v">MIT</span><span className="tag">open</span></div>
          </div>
        </article>

        {/* T6 — Index / TOC */}
        <article className="card card-index" data-reveal="">
          <div className="head">
            <h2>
              Index<br />
              <em style={{ fontWeight: 400 }}>of chapters.</em>
            </h2>
            <span className="mono">T6 · TOC</span>
          </div>
          <ol>
            <li>
              <span className="n">01</span>
              <span className="t">The <span className="em">brief</span> — and what it didn&apos;t say.</span>
              <span className="mono pg">p. 002</span>
            </li>
            <li>
              <span className="n">02</span>
              <span className="t">Sketches, dead ends, second drafts.</span>
              <span className="mono pg">p. 014</span>
            </li>
            <li>
              <span className="n">03</span>
              <span className="t">Building the <span className="em">prototype.</span></span>
              <span className="mono pg">p. 028</span>
            </li>
            <li>
              <span className="n">04</span>
              <span className="t">Shipping &amp; what we learned.</span>
              <span className="mono pg">p. 046</span>
            </li>
          </ol>
          <span className="mono" style={{ color: "var(--muted)" }}>— index block —</span>
        </article>

        {/* T7 — Two-up comparison */}
        <article className="card card-twoup" data-reveal="">
          <div className="col">
            <div>
              <span className="mono">Before</span>
              <h3>The <span className="em">old</span> way.</h3>
            </div>
            <p className="body">
              A short narrative for the prior state.{" "}
              <span className="muted">What was clunky, slow, or invisible — written without piling on.</span>
            </p>
            <ul>
              <li>Manual handoffs across three tools.</li>
              <li>No shared source of truth.</li>
              <li>Decisions lost in chat threads.</li>
            </ul>
          </div>
          <div className="col right">
            <div>
              <span className="mono" style={{ color: "var(--accent)" }}>After</span>
              <h3>The <span className="em">new</span> way.</h3>
            </div>
            <p className="body">
              A short narrative for the redesigned state.{" "}
              <span className="muted">What changed and how it felt — concrete and quietly proud.</span>
            </p>
            <ul>
              <li>One canvas, all stakeholders.</li>
              <li>Versioning &amp; review baked in.</li>
              <li>Decisions stamped, dated, found.</li>
            </ul>
          </div>
        </article>

        {/* ─ Reach ─ */}
        <div className="section-label" data-reveal="">
          <span className="mono">Reach</span>
          <span className="mono">06 / 06 · End</span>
        </div>

        {/* Card 6 — Contact */}
        <article className="card card-contact" data-reveal="">
          <div className="lhs">
            <div>
              <span className="mono">Get in touch</span>
              <h2>Say <span className="em">hello</span>.</h2>
            </div>
            <p className="lead">
              Always open to conversations about software, robotics, leadership, or how to use
              technology to solve real-world problems.{" "}
              <span className="muted">
                I read every message — replies may be slow when school is in session.
              </span>
            </p>
            <div className="colophon">
              <span className="mono">© 2026 Ryan Theodore The</span>
              <span className="mono">Set in Helvetica &amp; JetBrains Mono</span>
              <span className="mono">v.07 · Hand-built</span>
            </div>
          </div>
          <div className="rhs">
            <div className="row">
              <i className="ico fa-solid fa-envelope" aria-hidden="true" />
              <a href="mailto:ryan@ryanthe.com">ryan@ryanthe.com</a>
            </div>
            <div className="row">
              <i className="ico fa-brands fa-github" aria-hidden="true" />
              <a href="https://github.com/theboi" target="_blank" rel="noreferrer">github.com/theboi</a>
            </div>
            <div className="row">
              <i className="ico fa-brands fa-linkedin" aria-hidden="true" />
              <a href="https://www.linkedin.com/in/ryanthe/" target="_blank" rel="noreferrer">linkedin.com/in/ryanthe</a>
            </div>
            <div className="row">
              <i className="ico fa-brands fa-medium" aria-hidden="true" />
              <a href="https://medium.com/@theboi" target="_blank" rel="noreferrer">medium.com/@theboi</a>
            </div>
            <div className="row">
              <i className="ico fa-solid fa-globe" aria-hidden="true" />
              <a href="https://www.ryanthe.com">ryanthe.com</a>
            </div>
          </div>
        </article>

      </main>
    </div>
  );
}
