"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X, ArrowUpRight, CheckCircle2, Globe } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ClientWork {
  id: string;
  number: string;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  image: string;
  website: string;
  websiteUrl: string;
  services: string[];
  deliverables: string[];
}

const CLIENT_WORKS: ClientWork[] = [
  {
    id: "motion-media-circle",
    number: "01",
    title: "The Motion Media Circle",
    category: "DIGITAL PRODUCTION",
    subtitle: "High-End Media Production Studio",
    description:
      "A high-impact digital platform engineered for a premier creative production studio. Features responsive full-viewport video showcases, fluid transitions, and optimized high-definition streaming across devices.",
    image: "/client-logos/motion-media-circle.svg",
    website: "motionmediacircle.com",
    websiteUrl: "https://motionmediacircle.com",
    services: ["Web Development", "Responsive Design", "Frontend Architecture", "Video CDN"],
    deliverables: [
      "Custom Digital Agency Experience",
      "High-Definition Video Streaming Showcase",
      "Responsive Fluid Grid Architecture",
      "60fps Mobile Interaction System",
    ],
  },
  {
    id: "prime-avenues",
    number: "02",
    title: "The Prime Avenues",
    category: "AI WORKFLOW PLATFORM",
    subtitle: "Real Estate & Digital Workflow Intelligence",
    description:
      "Modern full-stack web application combined with automated AI intelligence workflows. Engineered for real estate lead generation, automated property indexing, and instant prospect follow-up pipelines.",
    image: "/client-logos/the-prime-avenues.jpeg",
    website: "theprimeavenues.com",
    websiteUrl: "https://theprimeavenues.com",
    services: ["Full-Stack Web", "AI Automation", "Workflow Pipeline", "REST API"],
    deliverables: [
      "Full-Stack Web Architecture",
      "Autonomous Lead Enrichment Engine",
      "Dynamic Property Catalog & Filtering",
      "Automated Email & Outreach Integration",
    ],
  },
  {
    id: "social-a-fair",
    number: "03",
    title: "Social A Fair",
    category: "INFRASTRUCTURE & RELIABILITY",
    subtitle: "Digital Infrastructure & Reliability",
    description:
      "Groundwork technical infrastructure and ongoing website reliability engineering for a premier event agency. Delivers zero-downtime reliability, server speed optimizations, and security monitoring during peak marketing traffic.",
    image: "/client-logos/social-a-fair.png",
    website: "socialafair.com",
    websiteUrl: "https://socialafair.com",
    services: ["Website Maintenance", "Technical Groundwork", "Performance Audits", "Cloud Reliability"],
    deliverables: [
      "Continuous Server & Performance Audits",
      "Zero-Downtime Event Ticket Groundwork",
      "Database Optimization & Caching",
      "24/7 Technical Reliability & Security",
    ],
  },
  {
    id: "tilak-ranjan-dhali",
    number: "04",
    title: "Tilak Ranjan Dhali",
    category: "BESPOKE ARCHITECTURE",
    subtitle: "Executive Editorial Web Presence",
    description:
      "A custom-crafted editorial digital portfolio built for distinguished executive leadership and architectural presentation. Emphasizes typography, negative space, and smooth interactive galleries.",
    image: "/client-logos/tilak-ranjan-dhali.png",
    website: "tilakranjandhali.in",
    websiteUrl: "https://tilakranjandhali.in",
    services: ["Editorial Portfolio", "Modern UI", "Frontend Engineering", "Micro-Interactions"],
    deliverables: [
      "Bespoke Editorial Web Architecture",
      "Custom Dark/Light Contrast System",
      "Interactive Project Gallery",
      "Performance-Tuned Global Hosting",
    ],
  },
];

// Constants & Utilities
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

interface CoinState {
  x: number;
  y: number;
  z: number;
  rotY: number;
  scale: number;
  opacity: number;
}

/**
 * Maps pinned scroll progress to:
 * 1. morph: Smooth transition (0 -> 1) from the static horizontal overview to 3D center stage.
 * 2. turn: Continuous client focus index [0, 3] with generous, stable resting plateaus.
 */
function progressToTurnAndMorph(prog: number): { turn: number; morph: number } {
  // Phase 0: Minimal static overview of all 4 client logos (zero noise)
  if (prog <= 0.08) {
    return { turn: 0, morph: 0 };
  }

  // Phase 1: Smooth convergence into the 3D coin stage
  if (prog <= 0.18) {
    const p = (prog - 0.08) / 0.10;
    const morph = p * p * (3 - 2 * p); // smooth Hermite ease
    return { turn: 0, morph };
  }

  // Phase 2: Sequential 3D Coin-Flip timeline with cinematic pacing
  let turn = 0;
  if (prog < 0.34) {
    // Client 0 Focus Plateau
    turn = 0;
  } else if (prog < 0.46) {
    // Coin Flip: Client 0 -> Client 1
    const p = (prog - 0.34) / 0.12;
    const s = p * p * (3 - 2 * p);
    turn = 0 + s;
  } else if (prog < 0.60) {
    // Client 1 Focus Plateau
    turn = 1;
  } else if (prog < 0.72) {
    // Coin Flip: Client 1 -> Client 2
    const p = (prog - 0.60) / 0.12;
    const s = p * p * (3 - 2 * p);
    turn = 1 + s;
  } else if (prog < 0.86) {
    // Client 2 Focus Plateau
    turn = 2;
  } else if (prog < 0.96) {
    // Coin Flip: Client 2 -> Client 3
    const p = (prog - 0.86) / 0.10;
    const s = p * p * (3 - 2 * p);
    turn = 2 + s;
  } else {
    // Client 3 Focus Plateau
    turn = 3;
  }

  return { turn, morph: 1 };
}

/**
 * Calculates 3D transformation for coin `i`:
 * - Flips forward with a 360° parabolic coin toss (never backwards/mirrored).
 * - Rests perfectly upright at 0° or 360° (geometrically identical to 0°).
 * - Smoothly morphs from the horizontal static row into center focus.
 */
function calculateCoinState(
  i: number,
  turn: number,
  morph: number,
  spacing: number,
  staticScale: number
): CoinState {
  const d = turn - i;

  // 1. Static state (morph = 0): clean horizontal logo row
  const staticX = (i - 1.5) * spacing;
  const staticY = 0;
  const staticZ = 0;
  const staticRotY = 0;
  const staticSc = staticScale;
  const staticOp = 1.0;

  // 2. 3D Coin-flip state (morph = 1):
  let rotY = 0;
  let posZ = 0;
  let posY = 0;
  let posX = 0;
  let scale = 1.0;
  let opacity = 1.0;

  // Rotation baseline: client 0 rests at 0°, clients 1..3 rest at 360° (facing front)
  const restRotY = i === 0 ? 0 : 360;

  if (d < -0.55) {
    // In queue behind current client
    rotY = 0;
    posZ = -140;
    posY = 20;
    posX = 0;
    scale = 0.80;
    opacity = 0;
  } else if (d < 0) {
    // FLIPPING IN: 0° -> 360° with parabolic coin toss arc
    const p = (d - -0.55) / 0.55; // 0 -> 1
    const s = p * p * (3 - 2 * p);
    rotY = s * restRotY;
    posZ = -140 * (1 - s) + Math.sin(p * Math.PI) * 110;
    posY = 20 * (1 - s) - Math.sin(p * Math.PI) * 25;
    posX = 0;
    scale = 0.80 + s * 0.25;
    opacity = Math.min(1.0, p * 3.0);
  } else if (d === 0) {
    // FOCUS PLATEAU: Perfectly centered, upright logo facing user
    rotY = restRotY;
    posZ = 0;
    posY = 0;
    posX = 0;
    scale = 1.05;
    opacity = 1.0;
  } else if (d <= 0.55) {
    // FLIPPING OUT: 360° exit toss into queue
    const p = d / 0.55; // 0 -> 1
    const s = p * p * (3 - 2 * p);
    rotY = restRotY + s * 360;
    posZ = -Math.sin(p * Math.PI) * 40 - s * 140;
    posY = -Math.sin(p * Math.PI) * 20 - s * 20;
    posX = 0;
    scale = 1.05 - s * 0.25;
    opacity = Math.max(0, 1.0 - s * 2.5);
  } else {
    // Exited
    rotY = restRotY + 360;
    posZ = -140;
    posY = -20;
    posX = 0;
    scale = 0.80;
    opacity = 0;
  }

  return {
    x: lerp(staticX, posX, morph),
    y: lerp(staticY, posY, morph),
    z: lerp(staticZ, posZ, morph),
    rotY: lerp(staticRotY, rotY, morph),
    scale: lerp(staticSc, scale, morph),
    opacity: lerp(staticOp, opacity, morph),
  };
}

export default function WorksWheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [activeItem, setActiveItem] = useState(0);
  const [isRingView, setIsRingView] = useState(true);
  const [modalClient, setModalClient] = useState<ClientWork | null>(null);

  const count = CLIENT_WORKS.length;
  const targetTurn = useRef(0);
  const currentTurn = useRef(0);
  const targetMorph = useRef(0);
  const currentMorph = useRef(0);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      };
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalClient(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (modalClient) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalClient]);

  useEffect(() => {
    const containerEl = containerRef.current;
    const stageEl = stageRef.current;
    const wheelEl = wheelRef.current;
    if (!containerEl || !stageEl || !wheelEl) return;

    let isRunning = true;
    let frameId = 0;

    const lenis = (
      window as unknown as {
        __lenis?: {
          on: (event: string, cb: () => void) => void;
          off?: (event: string, cb: () => void) => void;
        };
      }
    ).__lenis;

    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
    }

    function calculateMetrics() {
      const w = stageEl?.clientWidth || window.innerWidth;
      const h = stageEl?.clientHeight || window.innerHeight;

      const isMobile = w < 768;
      const isTablet = w < 1024;

      // Base coin diameter in center showcase mode
      const coinSize = isMobile
        ? Math.min(w * 0.74, 290)
        : isTablet
        ? Math.min(w * 0.44, 330)
        : Math.min(h * 0.48, w * 0.30, 360);

      // In static mode, the 4 coins in a row fit comfortably across the screen:
      const staticSize = isMobile
        ? Math.min(w * 0.20, 74)
        : isTablet
        ? Math.min(w * 0.16, 125)
        : Math.min(w * 0.13, h * 0.22, 165);

      const staticScale = staticSize / coinSize;
      const spacing = isMobile ? staticSize * 1.25 : isTablet ? staticSize * 1.4 : staticSize * 1.6;
      const depth = isMobile ? 1000 : 1300;

      return { coinSize, staticScale, spacing, depth };
    }

    let metrics = calculateMetrics();

    function applySizes() {
      metrics = calculateMetrics();
      if (stageEl) {
        stageEl.style.perspective = `${metrics.depth}px`;
      }
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.width = `${metrics.coinSize}px`;
        card.style.height = `${metrics.coinSize}px`;
        card.style.marginLeft = `${-metrics.coinSize / 2}px`;
        card.style.marginTop = `${-metrics.coinSize / 2}px`;
      });
    }

    applySizes();

    const ro = new ResizeObserver(() => {
      applySizes();
    });
    ro.observe(stageEl);

    // Scroll runway: 360% gives generous cinematic pacing across all 4 clients
    const st = ScrollTrigger.create({
      trigger: containerEl,
      start: "top top",
      end: "+=360%",
      pin: true,
      anticipatePin: 1,
      scrub: 1.0,
      onUpdate: (self) => {
        const { turn, morph } = progressToTurnAndMorph(self.progress);
        targetTurn.current = turn;
        targetMorph.current = morph;
      },
    });

    const draw = () => {
      if (!isRunning) return;
      frameId = requestAnimationFrame(draw);

      // Silky smooth interpolation for cinematic pacing
      currentTurn.current += (targetTurn.current - currentTurn.current) * 0.12;
      currentMorph.current += (targetMorph.current - currentMorph.current) * 0.12;
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;

      const t = currentTurn.current;
      const m = currentMorph.current;
      const { spacing, staticScale } = metrics;

      // Subtle mouse tilt for authentic 3D physical feel
      if (wheelEl) {
        const tiltX = m * (-currentMouse.current.y * 5);
        const tiltY = m * (currentMouse.current.x * 5);
        wheelEl.style.transform = `rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      }

      for (let i = 0; i < count; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;

        const state = calculateCoinState(i, t, m, spacing, staticScale);

        card.style.transform =
          `translateX(${state.x.toFixed(1)}px)` +
          ` translateY(${state.y.toFixed(1)}px)` +
          ` translateZ(${state.z.toFixed(1)}px)` +
          ` rotateY(${state.rotY.toFixed(2)}deg)` +
          ` scale(${state.scale.toFixed(3)})`;

        card.style.opacity = state.opacity.toFixed(3);
        const d = Math.abs(t - i);
        card.style.zIndex = String(Math.round(100 - d * 25));

        // When in coin mode, active coin is clickable; all coins clickable in static mode
        if (m > 0.4) {
          card.style.pointerEvents = d <= 0.4 ? "auto" : "none";
        } else {
          card.style.pointerEvents = "auto";
        }
      }

      // Smooth scroll-linked client title cross-fade (completely hidden in static mode)
      for (let i = 0; i < count; i++) {
        const textEl = textRefs.current[i];
        if (!textEl) continue;
        const diff = t - i;
        const absDiff = Math.abs(diff);
        const opacity = Math.max(0, 1 - absDiff * 2.2) * m;
        const translateY = -diff * 18;

        textEl.style.opacity = opacity.toFixed(3);
        textEl.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
        textEl.style.pointerEvents = opacity > 0.6 ? "auto" : "none";
        textEl.style.visibility = opacity > 0.01 ? "visible" : "hidden";
      }

      const near = clamp(Math.round(t), 0, count - 1);
      setActiveItem((prev) => (prev !== near ? near : prev));
      setIsRingView(m < 0.4);
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      isRunning = false;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      st.kill();
      if (lenis?.off) {
        lenis.off("scroll", ScrollTrigger.update);
      }
    };
  }, [count]);

  const handleCardClick = (i: number) => {
    setActiveItem(i);
    setModalClient(CLIENT_WORKS[i]);
  };

  const activeClient = CLIENT_WORKS[activeItem] || CLIENT_WORKS[0];

  return (
    <section
      id="client-works"
      ref={containerRef}
      className="relative w-full min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden"
    >
      {/* 100vh Full Viewport Stage */}
      <div className="relative h-screen w-full flex flex-col justify-between overflow-hidden px-6 sm:px-12 md:px-16 lg:px-20 py-8 md:py-10 select-none">
        {/* ── ATMOSPHERIC GENERATED BACKGROUND ── */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src="/client_works_bg.jpg"
            alt="Client Works Atmospheric Background"
            className="w-full h-full object-cover object-center select-none filter brightness-125 contrast-115 opacity-85"
          />
          {/* Subtle top/bottom edge gradients to blend seamlessly with surrounding sections */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/60 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black via-black/60 to-transparent z-10" />
        </div>

        {/* ── MINIMAL CLEAN HEADER (MATCHING "03 // FEATURED WORK" EXACTLY) ── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pb-4 border-b border-zinc-800/60">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-mono tracking-[0.25em] text-zinc-300 uppercase">
              04 // CLIENTS
            </span>
          </div>

          <div className="font-mono text-xs text-zinc-500 tracking-widest uppercase">
            {isRingView ? "" : `${activeClient.number} / 0${count}`}
          </div>
        </div>

        {/* ── 3D COIN FLIP STAGE ── */}
        <div
          ref={stageRef}
          role="region"
          aria-label="3D Client Coins"
          className="relative z-10 w-full flex-1 my-auto overflow-hidden outline-none flex items-center justify-center"
          style={{ perspective: "1300px", transformStyle: "preserve-3d" }}
        >
          {/* 3D Coin Stage Anchor */}
          <div
            ref={wheelRef}
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            {CLIENT_WORKS.map((client, i) => {
              const isActive = activeItem === i;
              return (
                <div
                  key={client.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => handleCardClick(i)}
                  className="group absolute cursor-pointer pointer-events-auto select-none"
                  style={{
                    transformStyle: "preserve-3d",
                    willChange: "transform, opacity",
                  }}
                >
                  <div
                    className={`relative w-full h-full rounded-full transition-shadow duration-300 ${
                      isActive
                        ? "shadow-[0_0_45px_rgba(34,211,238,0.3)]"
                        : "shadow-[0_15px_35px_rgba(0,0,0,0.85)] hover:shadow-[0_0_25px_rgba(34,211,238,0.2)]"
                    }`}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* 3D Physical Coin Rim / Edge */}
                    <div
                      className="absolute inset-0 rounded-full border-[3px] border-zinc-800/90 pointer-events-none"
                      style={{ transform: "translateZ(0px)" }}
                    />

                    {/* ── OBVERSE (FRONT: PURE MINIMAL LOGO MEDALLION) ── */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center p-8 sm:p-10 border transition-all duration-300 bg-zinc-950/90 ${
                        isActive
                          ? "border-cyan-400/80 shadow-[0_0_35px_rgba(34,211,238,0.25)]"
                          : "border-zinc-800 hover:border-zinc-600"
                      }`}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "translateZ(3px)",
                      }}
                    >
                      {/* Dark luxury radial backdrop */}
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(39,39,42,0.45)_0%,rgba(9,9,11,0.98)_75%)]" />

                      {/* Chamfered concentric inner ring */}
                      <div className="pointer-events-none absolute inset-2.5 rounded-full border border-white/[0.08]" />

                      {/* Pure Centered Client Logo */}
                      <img
                        src={client.image}
                        alt={client.title}
                        draggable={false}
                        className="relative z-10 max-h-[64%] max-w-[64%] object-contain select-none pointer-events-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] filter brightness-105"
                      />
                    </div>

                    {/* ── REVERSE (BACK: IDENTICAL UPRIGHT LOGO MEDALLION, NEVER MIRRORED) ── */}
                    <div
                      className={`absolute inset-0 w-full h-full rounded-full overflow-hidden flex items-center justify-center p-8 sm:p-10 border transition-all duration-300 bg-zinc-950/90 ${
                        isActive
                          ? "border-cyan-400/80 shadow-[0_0_35px_rgba(34,211,238,0.25)]"
                          : "border-zinc-800"
                      }`}
                      style={{
                        backfaceVisibility: "hidden",
                        WebkitBackfaceVisibility: "hidden",
                        transform: "rotateY(180deg) translateZ(3px)",
                      }}
                    >
                      {/* Dark luxury radial backdrop */}
                      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(39,39,42,0.45)_0%,rgba(9,9,11,0.98)_75%)]" />

                      {/* Chamfered concentric inner ring */}
                      <div className="pointer-events-none absolute inset-2.5 rounded-full border border-white/[0.08]" />

                      {/* Pure Centered Client Logo (Identical, counter-rotated so never reverted) */}
                      <img
                        src={client.image}
                        alt={client.title}
                        draggable={false}
                        className="relative z-10 max-h-[64%] max-w-[64%] object-contain select-none pointer-events-none drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] filter brightness-105"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── ULTRA-MINIMAL CLIENT TITLE & LINK (ZERO NOISE, SILENT IN STATIC VIEW) ── */}
        <div className="relative z-10 w-full max-w-xl mx-auto h-16 sm:h-20 select-none">
          {CLIENT_WORKS.map((client, idx) => (
            <div
              key={client.id}
              ref={(el) => {
                textRefs.current[idx] = el;
              }}
              className="absolute inset-0 flex flex-col items-center justify-center text-center will-change-transform"
              style={{
                opacity: 0,
                visibility: "hidden",
              }}
            >
              <h3
                onClick={() => setModalClient(client)}
                className="font-hero text-xl sm:text-2xl md:text-3xl text-white uppercase tracking-tight cursor-pointer hover:text-cyan-400 transition-colors drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
              >
                {client.title}
              </h3>
              <a
                href={client.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-white transition-colors mt-1 cursor-pointer"
              >
                <span>{client.website}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── DETAIL MODAL ── */}
      {modalClient && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setModalClient(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 text-white p-6 sm:p-8 flex flex-col gap-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-800/80 pb-4">
              <div>
                <p className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase">
                  {`${modalClient.category} // ${modalClient.number}`}
                </p>
                <h3 className="font-hero text-2xl sm:text-4xl uppercase tracking-tight text-white leading-none mt-1">
                  {modalClient.title}
                </h3>
              </div>

              <button
                onClick={() => setModalClient(null)}
                className="text-zinc-500 hover:text-white p-1.5 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Visual: Cohesive Circular Emblem Presentation */}
            <div className="relative w-full py-10 sm:py-14 rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-950/90 flex flex-col items-center justify-center shadow-inner">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,211,238,0.12)_0%,rgba(9,9,11,0.98)_75%)]" />

              {/* Circular Emblem */}
              <div className="relative z-10 w-36 h-36 sm:w-44 sm:h-44 rounded-full border-2 border-cyan-400/80 bg-zinc-900/90 p-6 flex items-center justify-center shadow-[0_0_45px_rgba(34,211,238,0.25),0_15px_35px_rgba(0,0,0,0.9)]">
                <div className="pointer-events-none absolute inset-2 rounded-full border border-white/10" />
                <img
                  src={modalClient.image}
                  alt={modalClient.title}
                  className="max-h-full max-w-[75%] object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] filter brightness-105"
                />
              </div>

              <span className="relative z-10 mt-4 text-[10px] font-mono text-cyan-400 tracking-[0.25em] uppercase">
                {`${modalClient.category} // ${modalClient.number}`}
              </span>
            </div>

            {/* Narrative & Highlights */}
            <div className="space-y-4">
              <p className="text-sm text-zinc-300 font-body leading-relaxed font-light">
                {modalClient.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {modalClient.deliverables.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Tags */}
            <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap gap-2">
              {modalClient.services.map((service) => (
                <span
                  key={service}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {service}
                </span>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between">
              <a
                href={modalClient.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 font-medium text-xs font-mono tracking-wider uppercase transition-all duration-200 active:scale-95 shadow-lg"
              >
                <Globe className="w-4 h-4" />
                <span>Visit {modalClient.website}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline-block">
                ESC TO CLOSE
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
