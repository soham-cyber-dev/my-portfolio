"use client";

import React, { useRef, useEffect } from "react";

interface ChaosItem {
  id: string;
  exitStart: number;
  exitEnd: number;
  dx: number;
  dy: number;
  dRot: number;
  dScale: number;
  depth: number;
  baseRot: number;
  positionClass: string;
  content: React.ReactNode;
}

const CHAOS_ITEMS: ChaosItem[] = [
  {
    id: "identity-intro",
    exitStart: 0.05,
    exitEnd: 0.28,
    dx: -140,
    dy: -90,
    dRot: -14,
    dScale: 0.7,
    depth: 1.2,
    baseRot: -2.5,
    positionClass: "top-[6%] left-[4%] sm:left-[6%] md:top-[9%] md:left-[8%] lg:left-[10%]",
    content: (
      <div className="flex flex-col gap-2 max-w-[240px] sm:max-w-[280px] md:max-w-[310px]">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-700/60 text-[10px] md:text-[11px] font-mono tracking-wider text-zinc-300 backdrop-blur-md shadow-lg w-fit">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>ABOUT // SOHAM BHUNIYA</span>
        </div>
        <div>
          <h3 className="font-hero text-2xl sm:text-3xl md:text-4xl uppercase tracking-tight text-white leading-none">
            FULL-STACK
            <span className="block text-zinc-500 font-light text-xl sm:text-2xl md:text-3xl">DEVELOPER</span>
          </h3>
          <p className="mt-2 text-xs text-zinc-400 font-body leading-relaxed">
            Computer Science Engineering student from Kolkata, India — turning ideas into digital experiences.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "tech-stack",
    exitStart: 0.09,
    exitEnd: 0.32,
    dx: 150,
    dy: -80,
    dRot: 10,
    dScale: 0.75,
    depth: 1.0,
    baseRot: 1.8,
    positionClass: "top-[7%] right-[4%] sm:right-[6%] md:top-[10%] md:right-[8%] lg:right-[10%]",
    content: (
      <div className="p-3.5 rounded-xl bg-zinc-950/85 border border-zinc-800/90 backdrop-blur-md shadow-2xl max-w-[220px] sm:max-w-[260px]">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-2">
          <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">TECH STACK</span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-800/60 text-cyan-400">2026</span>
        </div>
        <div className="space-y-1 font-mono text-[11px] md:text-xs text-zinc-300">
          <div className="flex justify-between"><span className="text-zinc-500">FRONTEND:</span><span className="text-zinc-200">React · Next.js</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">BACKEND:</span><span className="text-zinc-200">Node · Express</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">DATABASE:</span><span className="text-zinc-200">PostgreSQL · MongoDB</span></div>
          <div className="flex justify-between"><span className="text-zinc-500">CLOUD:</span><span className="text-emerald-400 font-semibold">AWS · Docker</span></div>
        </div>
      </div>
    ),
  },
  {
    id: "manifesto",
    exitStart: 0.03,
    exitEnd: 0.24,
    dx: -170,
    dy: 15,
    dRot: -16,
    dScale: 0.65,
    depth: 1.4,
    baseRot: -3.8,
    positionClass: "top-[38%] sm:top-[36%] left-[3%] sm:left-[5%] md:left-[7%] lg:left-[9%]",
    content: (
      <div className="flex flex-col max-w-[200px] sm:max-w-[260px] md:max-w-[310px]">
        <div className="flex items-center gap-2 mb-1">
          <span className="w-6 h-[1px] bg-amber-400/80" />
          <span className="text-[10px] font-mono tracking-widest text-amber-400 uppercase">PHILOSOPHY // CRAFT</span>
        </div>
        <span className="font-hero text-3xl sm:text-5xl md:text-6xl text-white tracking-tighter leading-[0.88] select-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.9)]">BUILD.</span>
        <p className="mt-2 text-xs sm:text-sm text-zinc-300 font-serif italic leading-relaxed">
          &ldquo;Where engineering and creativity come together — that&apos;s where the interesting work happens.&rdquo;
        </p>
      </div>
    ),
  },
  {
    id: "proficiency-meter",
    exitStart: 0.12,
    exitEnd: 0.36,
    dx: 170,
    dy: 20,
    dRot: 12,
    dScale: 0.7,
    depth: 1.1,
    baseRot: 2.8,
    positionClass: "top-[36%] sm:top-[34%] right-[3%] sm:right-[5%] md:right-[7%] lg:right-[9%]",
    content: (
      <div className="p-3.5 rounded-xl bg-zinc-950/85 border border-zinc-800/80 backdrop-blur-md shadow-2xl max-w-[190px] sm:max-w-[230px]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-mono tracking-wider text-zinc-400">STACK DEPTH</span>
          <span className="w-2 h-2 rounded-full bg-cyan-400/90 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-baseline font-mono">
            <span className="text-xl md:text-2xl font-semibold text-white tracking-tight">FULL<span className="text-xs text-zinc-500">-STACK</span></span>
            <span className="text-[10px] text-emerald-400 tracking-wider">ACTIVE</span>
          </div>
          <div className="grid grid-cols-6 gap-1 h-1.5 w-full">
            <div className="bg-emerald-400 rounded-xs" /><div className="bg-emerald-400 rounded-xs" />
            <div className="bg-emerald-400 rounded-xs" /><div className="bg-emerald-400 rounded-xs" />
            <div className="bg-emerald-400/70 rounded-xs" /><div className="bg-zinc-700/60 rounded-xs" />
          </div>
        </div>
        <p className="mt-2.5 text-[10px] text-zinc-400 leading-snug font-mono">FRONTEND → API → DB → DEPLOY</p>
      </div>
    ),
  },
  {
    id: "community-role",
    exitStart: 0.14,
    exitEnd: 0.38,
    dx: -140,
    dy: 90,
    dRot: -10,
    dScale: 0.75,
    depth: 0.9,
    baseRot: 1.5,
    positionClass: "bottom-[8%] left-[4%] sm:left-[6%] md:bottom-[10%] md:left-[8%] lg:left-[10%]",
    content: (
      <div className="p-3 rounded-xl bg-zinc-950/80 border border-zinc-800/80 backdrop-blur-md shadow-xl max-w-[220px] sm:max-w-[260px] md:max-w-[290px]">
        <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500 uppercase tracking-widest mb-1.5">
          <span className="text-amber-400 font-bold">◆</span><span>COMMUNITY LEADERSHIP</span>
        </div>
        <div className="font-mono text-[11px] md:text-xs text-zinc-200 bg-black/70 px-2.5 py-1.5 rounded-md border border-zinc-800/70">
          <code>Tech Lead @ GDG, UEM Kolkata</code>
        </div>
        <p className="mt-2 text-[11px] text-zinc-400 font-body leading-relaxed">
          Organizing events, conducting sessions — technology is about sharing knowledge and building community.
        </p>
      </div>
    ),
  },
  {
    id: "current-focus",
    exitStart: 0.07,
    exitEnd: 0.30,
    dx: 140,
    dy: 90,
    dRot: 8,
    dScale: 0.7,
    depth: 1.3,
    baseRot: -2.0,
    positionClass: "bottom-[8%] right-[4%] sm:right-[6%] md:bottom-[10%] md:right-[8%] lg:right-[10%]",
    content: (
      <div className="flex flex-col items-end text-right max-w-[220px] sm:max-w-[250px] md:max-w-[280px]">
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">CURRENTLY EXPLORING</span>
        <h4 className="font-hero text-xl sm:text-2xl text-white tracking-tight uppercase leading-tight mt-0.5">BUILDING BETTER</h4>
        <p className="mt-1.5 text-xs text-zinc-400 font-body leading-relaxed">
          Full-stack engineering, cloud computing, and modern digital experiences.
        </p>
        <div className="mt-3 flex items-center gap-2 text-[11px] font-mono text-white/80 bg-zinc-900/80 px-3 py-1.5 rounded-full border border-zinc-700/60 shadow-lg">
          <span>SCROLL TO DISCOVER</span><span className="animate-bounce">↓</span>
        </div>
      </div>
    ),
  },
  {
    id: "flank-right",
    exitStart: 0.03,
    exitEnd: 0.22,
    dx: 80,
    dy: 0,
    dRot: 0,
    dScale: 0.8,
    depth: 0.7,
    baseRot: 0,
    positionClass: "hidden md:block top-1/2 -translate-y-1/2 right-[27%] lg:right-[29%] xl:right-[31%]",
    content: (
      <div className="flex flex-col items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-zinc-500 select-none uppercase">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-zinc-600 to-transparent" />
        <span className="[writing-mode:vertical-rl]">KOLKATA — INDIA</span>
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
      </div>
    ),
  },
  {
    id: "flank-left",
    exitStart: 0.03,
    exitEnd: 0.22,
    dx: -80,
    dy: 0,
    dRot: 0,
    dScale: 0.8,
    depth: 0.7,
    baseRot: 0,
    positionClass: "hidden md:block top-1/2 -translate-y-1/2 left-[27%] lg:left-[29%] xl:left-[31%]",
    content: (
      <div className="flex flex-col items-center gap-3 text-[10px] font-mono tracking-[0.25em] text-zinc-500 select-none uppercase">
        <span className="[writing-mode:vertical-rl]">CSE — 2026</span>
        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-zinc-600 to-transparent" />
      </div>
    ),
  },
];

export default function StorytellingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const topoImgRef = useRef<HTMLImageElement>(null);
  const cropMarksRef = useRef<HTMLDivElement>(null);
  const portraitPanelRef = useRef<HTMLDivElement>(null);
  const contentPanelRef = useRef<HTMLDivElement>(null);
  const contentItemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const chaosRefs = useRef<(HTMLDivElement | null)[]>([]);

  const targetP = useRef(0);
  const currentP = useRef(0);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMouse = (e: MouseEvent) => {
      targetMouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", onMouse, { passive: true });

    let animId: number;
    let running = true;

    const loop = () => {
      if (!running) return;

      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const sd = rect.height - window.innerHeight;
        if (sd > 0) targetP.current = Math.max(0, Math.min(1, -rect.top / sd));
      }

      currentP.current += (targetP.current - currentP.current) * 0.10;
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;

      const p = currentP.current;
      const mx = currentMouse.current.x;
      const my = currentMouse.current.y;
      const vw = window.innerWidth;
      const vh = window.innerHeight;

      // ──────────────────────────────────────────────────────
      // TIMELINE (550vh)
      //
      // ACT 1 (p 0.00 → 0.45)
      //   Topography in 9:16 → expands to full viewport
      //   Chaos items exit
      //
      // ACT 2 (p 0.45 → 0.72)
      //   Portrait slides in from the LEFT
      //   Content panel slides in from the RIGHT
      //   Dark scrim appears for readability
      //   Content items stagger in
      //
      // ACT 3 (p 0.72 → 1.00)
      //   Settled split: portrait left, text right, topo bg
      // ──────────────────────────────────────────────────────

      // === ACT 1: FRAME EXPANSION ===
      let initialW: number;
      if (vw >= 1024) initialW = 270;
      else if (vw >= 640) initialW = 210;
      else initialW = 160;
      const initialH = initialW * (16 / 9);

      const expandEnd = 0.55;
      const expandT = Math.min(1, p / expandEnd);
      const easedE = expandT < 0.5
        ? 4 * expandT * expandT * expandT
        : 1 - Math.pow(-2 * expandT + 2, 3) / 2;

      const curW = initialW + (vw - initialW) * easedE;
      const curH = initialH + (vh - initialH) * easedE;
      const curRadius = Math.max(0, 16 * (1 - easedE));
      const uiOp = Math.max(0, 1 - easedE * 2.5);

      const tiltF = 1 - easedE;
      const shiftX = mx * 8 * tiltF;
      const shiftY = my * 8 * tiltF;

      if (frameRef.current) {
        frameRef.current.style.width = `${curW}px`;
        frameRef.current.style.height = `${curH}px`;
        frameRef.current.style.borderRadius = `${curRadius}px`;
        frameRef.current.style.transform = `translate3d(${shiftX}px, ${shiftY}px, 0) rotateX(${my * -3 * tiltF}deg) rotateY(${mx * 3 * tiltF}deg)`;
        frameRef.current.style.boxShadow = `0 25px 70px rgba(0,0,0,${0.95 * (1 - easedE)}), 0 0 35px rgba(255,255,255,${0.06 * uiOp})`;
        frameRef.current.style.borderColor = `rgba(255, 255, 255, ${0.18 * uiOp})`;
      }

      if (cropMarksRef.current) {
        cropMarksRef.current.style.opacity = `${uiOp}`;
      }

      // Topography subtle zoom
      let topoScale = 1.06 - 0.06 * easedE;
      if (p > 0.7) topoScale = 1.0 + 0.03 * ((p - 0.7) / 0.3);
      if (topoImgRef.current) {
        topoImgRef.current.style.transform = `scale(${topoScale})`;
      }

      // === ACT 2: SPLIT REVEAL ===
      const slideStart = 0.15;
      const slideEnd = 0.65;
      let slideT = 0;
      if (p > slideStart) {
        slideT = Math.min(1, (p - slideStart) / (slideEnd - slideStart));
      }
      const easedS = slideT < 0.5
        ? 2 * slideT * slideT
        : 1 - Math.pow(-2 * slideT + 2, 2) / 2;

      const isMobile = vw < 768;

      // Portrait panel: slides in from the LEFT
      if (portraitPanelRef.current) {
        if (isMobile) {
          portraitPanelRef.current.style.transform = `translate3d(0, 0, 0)`;
          portraitPanelRef.current.style.opacity = `${easedS}`;
        } else {
          const panelX = -(1 - easedS) * 100;
          portraitPanelRef.current.style.transform = `translate3d(${panelX}%, 0, 0)`;
          portraitPanelRef.current.style.opacity = `${easedS}`;
        }
        portraitPanelRef.current.style.visibility = p > slideStart - 0.03 ? "visible" : "hidden";
      }

      // Content panel: slides in from the RIGHT
      if (contentPanelRef.current) {
        if (isMobile) {
          const panelY = (1 - easedS) * 100;
          contentPanelRef.current.style.transform = `translate3d(0, ${panelY}%, 0)`;
        } else {
          const panelX = (1 - easedS) * 100;
          contentPanelRef.current.style.transform = `translate3d(${panelX}%, 0, 0)`;
        }
        contentPanelRef.current.style.opacity = `${easedS}`;
        contentPanelRef.current.style.visibility = p > slideStart - 0.03 ? "visible" : "hidden";
      }

      // Content items stagger
      const cStart = 0.20;
      const cStagger = 0.035;
      contentItemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const iS = cStart + idx * cStagger;
        const iE = iS + 0.12;
        let iT = 0;
        if (p >= iE) iT = 1;
        else if (p > iS) iT = (p - iS) / (iE - iS);
        const eased = 1 - Math.pow(1 - iT, 3);
        el.style.opacity = `${eased}`;
        el.style.transform = `translate3d(${20 * (1 - eased)}px, ${10 * (1 - eased)}px, 0)`;
        el.style.filter = eased < 0.95 ? `blur(${(1 - eased) * 2}px)` : "none";
      });

      // === CHAOS ITEMS ===
      CHAOS_ITEMS.forEach((item, idx) => {
        const el = chaosRefs.current[idx];
        if (!el) return;
        let ip = 0;
        if (p >= item.exitEnd) ip = 1;
        else if (p > item.exitStart) ip = (p - item.exitStart) / (item.exitEnd - item.exitStart);
        const exitEase = Math.pow(ip, 2.0);
        const opacity = Math.max(0, 1 - exitEase * 1.12);
        if (opacity <= 0.001) {
          el.style.opacity = "0"; el.style.visibility = "hidden"; el.style.pointerEvents = "none";
          return;
        }
        el.style.visibility = "visible";
        el.style.opacity = `${opacity}`;
        el.style.pointerEvents = opacity > 0.4 ? "auto" : "none";
        el.style.transform = `translate3d(${item.dx * exitEase + mx * item.depth * 20 * (1 - exitEase)}px, ${item.dy * exitEase + my * item.depth * 20 * (1 - exitEase)}px, 0) rotate(${item.baseRot + item.dRot * exitEase}deg) scale(${1 + (item.dScale - 1) * exitEase})`;
        el.style.filter = ip > 0.05 ? `blur(${ip * 7}px)` : "none";
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => { running = false; cancelAnimationFrame(animId); window.removeEventListener("mousemove", onMouse); };
  }, []);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative w-full bg-black text-white selection:bg-white selection:text-black cursor-default"
      style={{ height: "550vh" }}
    >
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-black flex items-center justify-center select-none"
        style={{ perspective: "1000px" }}
      >
        {/* Dot grid */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />

        {/* Top header */}
        <div className="pointer-events-none absolute top-6 left-6 right-6 md:left-12 md:right-12 z-20 flex justify-between items-center text-[11px] font-mono text-zinc-500 tracking-wider">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            <span>02 // ABOUT</span>
          </div>
        </div>

        {/* Chaos items */}
        {CHAOS_ITEMS.map((item, index) => (
          <div
            key={item.id}
            className={`absolute z-30 ${item.positionClass}`}
          >
            <div
              ref={(el) => { chaosRefs.current[index] = el; }}
              style={{ willChange: "transform, opacity, filter" }}
            >
              {item.content}
            </div>
          </div>
        ))}

        {/* ═══ CENTER FRAME — Topography 9:16 → Full Screen ═══ */}
        <div
          ref={frameRef}
          className="relative z-10 overflow-hidden flex items-center justify-center bg-zinc-950 border border-white/20"
          style={{
            width: "270px", height: "480px", borderRadius: "16px",
            willChange: "width, height, border-radius, transform, box-shadow",
            transformOrigin: "center center",
          }}
        >
          {/* Subtle architectural corner crop marks */}
          <div ref={cropMarksRef} className="pointer-events-none absolute inset-0 z-20">
            <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-white/70" />
            <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-white/70" />
            <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-white/70" />
            <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-white/70" />
          </div>

          {/* Topography image — always visible */}
          <img
            ref={topoImgRef}
            src="/topography.jpg"
            alt="Topographic Contour Background"
            className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
            style={{ willChange: "transform", transformOrigin: "center center" }}
          />

          {/* Vignette */}
          <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-black/5 to-black/30 mix-blend-multiply z-[6]" />
        </div>

        {/* ═══ PORTRAIT PANEL — Slides in from LEFT ═══ */}
        <div
          ref={portraitPanelRef}
          className="absolute z-40 top-0 left-0 h-full
                     w-full md:w-[40%] lg:w-[38%]
                     hidden md:flex items-center justify-center"
          style={{ visibility: "hidden", opacity: 0, willChange: "transform, opacity" }}
        >
          {/* Dark gradient scrim so portrait is visible against topography */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* Subtle right-edge line */}
          <div className="absolute top-[8%] bottom-[8%] right-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent" />

          {/* Portrait image - Premium Glass Frame */}
          <div className="relative z-10 w-[70%] max-w-[340px] aspect-[4/5] p-2 rounded-2xl bg-zinc-900/30 border border-zinc-700/50 backdrop-blur-md shadow-2xl">
            <div className="w-full h-full rounded-xl overflow-hidden relative border border-zinc-800/80">
              <img
                src="/soham-portrait.jpg"
                alt="Soham Bhuniya"
                className="w-full h-full object-cover object-top filter contrast-110"
              />
              {/* Subtle inner shadow/gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent mix-blend-multiply" />
            </div>
          </div>
        </div>

        {/* ═══ CONTENT PANEL — Slides in from RIGHT ═══ */}
        <div
          ref={contentPanelRef}
          className="absolute z-50 top-0 right-0 h-full
                     w-full md:w-[60%] lg:w-[62%]
                     flex items-center justify-start"
          style={{ visibility: "hidden", opacity: 0, willChange: "transform, opacity" }}
        >
          {/* Dark scrim for readability */}
          <div className="absolute inset-0 bg-gradient-to-l from-black/95 via-black/85 to-black/30 md:from-black/95 md:via-black/90 md:to-black/40 backdrop-blur-[3px]" />

          {/* Left-edge accent line (desktop) */}
          <div className="hidden md:block absolute top-[8%] bottom-[8%] left-0 w-[1px] bg-gradient-to-b from-transparent via-zinc-600/50 to-transparent" />

          <div className="relative z-10 w-full max-w-2xl px-6 sm:px-8 md:pl-16 md:pr-12 lg:pl-20 py-16 sm:py-24 overflow-y-auto max-h-full">

            {/* Mobile-only portrait */}
            <div
              ref={(el) => { contentItemRefs.current[0] = el; }}
              className="md:hidden mb-8 flex items-center gap-4"
              style={{ opacity: 0 }}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden border border-zinc-700/60 shadow-xl shrink-0">
                <img src="/soham-portrait.jpg" alt="Soham Bhuniya" className="w-full h-full object-cover object-top" />
              </div>
              <div>
                <p className="font-hero text-xl text-white uppercase tracking-tight leading-none">Soham Bhuniya</p>
                <p className="text-[10px] font-mono text-zinc-500 tracking-wider uppercase mt-1">Kolkata, India</p>
              </div>
            </div>

            {/* 1. Header & Statement */}
            <div ref={(el) => { contentItemRefs.current[1] = el; }} className="mb-8" style={{ opacity: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-[1px] bg-cyan-400/80" />
                <span className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase">
                  Background
                </span>
              </div>
              <h2 className="font-hero text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-[1.04]">
                Engineering digital experiences where architectural precision meets creative craft.
              </h2>
            </div>

            {/* 2. Narrative Bio */}
            <div ref={(el) => { contentItemRefs.current[2] = el; }} className="mb-10 space-y-4 text-sm sm:text-base text-zinc-300 font-light leading-relaxed max-w-xl" style={{ opacity: 0 }}>
              <p>
                Computer Science Engineering student and full-stack software developer based in Kolkata, India. Focusing on building robust web architectures, distributed APIs, and fluid, motion-rich frontend interfaces.
              </p>
              <p>
                From normalized database schemas to fluid user interfaces, I prioritize clean architecture, performance, and maintainable software design.
              </p>
            </div>

            {/* 3. Clean Specs Columns */}
            <div ref={(el) => { contentItemRefs.current[3] = el; }} className="pt-8 border-t border-zinc-800/80 grid grid-cols-1 sm:grid-cols-2 gap-8" style={{ opacity: 0 }}>
              <div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block mb-2">
                  Core Technologies
                </span>
                <p className="text-xs sm:text-sm font-mono text-zinc-300 leading-relaxed">
                  React · Next.js · Node.js · Express · PostgreSQL · MongoDB · AWS · Docker
                </p>
              </div>

              <div>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase block mb-2">
                  Leadership & Community
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 font-body leading-relaxed">
                  Tech Lead @ Google Developer Groups, UEM Kolkata
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
