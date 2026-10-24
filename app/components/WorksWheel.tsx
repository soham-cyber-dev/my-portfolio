"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
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
    image: "/MotionMediaCircle.png",
    website: "themotionmediacircle.com",
    websiteUrl: "https://themotionmediacircle.com",
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
    image: "/ThePrimeAvenues.png",
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
    image: "/Social - a -fair.png",
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
    image: "/Tilak ranjan Dhali.png",
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

// Constants for 3D Geometry
const CARD_RATIO = 1.5;
const CARD_H_FACTOR = 0.38;
const CARD_MAX_W_FACTOR = 0.36;
const STEP_DEG = 40;
const DRUM_MULT = 2.15;
const RING_MULT = 1.12;
const BOW_MULT = 1.65;
const LENS_MULT = 2.75;
const CULL_DIST = 1.75;

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const rad = (deg: number) => (deg * Math.PI) / 180;
const bowAt = (drumDeg: number, bow: number) => -bow * (1 - Math.cos(rad(drumDeg)));

// Core 3D transformation with dynamic 3D wheel pitch & card tilts in static mode
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number
) {
  // In the static wheel view (m = 0), tilt cards on X and Y axes to produce a genuine 3D wheel/turbine aesthetic
  const ringTiltX = (1 - m) * 20;
  const ringTiltY = (1 - m) * -12;
  const ringZ = (1 - m) * -20;

  return (
    `translateX(${(m * bowAt(drumDeg, bow)).toFixed(1)}px)` +
    ` rotateZ(${((1 - m) * ringDeg).toFixed(2)}deg)` +
    ` translateY(${(-(1 - m) * ringR).toFixed(1)}px)` +
    ` rotateX(${(lerp(ringTiltX, drumDeg, m)).toFixed(2)}deg)` +
    ` rotateY(${ringTiltY.toFixed(2)}deg)` +
    ` translateZ(${(lerp(ringZ, drumR, m)).toFixed(1)}px)`
  );
}

function progressToTurn(prog: number, count: number): number {
  if (prog <= 0.04) {
    return 0; // Hold on all-clients radial showcase
  } else if (prog <= 0.20) {
    const u = (prog - 0.04) / 0.16;
    const smooth = u * u * (3 - 2 * u);
    return smooth; // 0 -> 1 morph into 3D drum reel
  } else {
    const u = (prog - 0.20) / 0.80;
    const segments = count - 1;
    const val = u * segments;
    const base = Math.min(Math.floor(val), segments - 1);
    const frac = val - base;

    let smoothFrac: number;
    if (frac <= 0.22) {
      smoothFrac = 0;
    } else if (frac >= 0.78) {
      smoothFrac = 1;
    } else {
      const p = (frac - 0.22) / 0.56;
      smoothFrac = p * p * (3 - 2 * p);
    }

    return 1 + base + smoothFrac;
  }
}

export default function WorksWheel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardFaceRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardImgRefs = useRef<(HTMLImageElement | null)[]>([]);

  const [activeItem, setActiveItem] = useState(0);
  const [isRingView, setIsRingView] = useState(true);
  const [modalClient, setModalClient] = useState<ClientWork | null>(null);

  const count = CLIENT_WORKS.length;
  const targetTurn = useRef(0);
  const currentTurn = useRef(0);
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
        __lenis?: { on: (event: string, cb: () => void) => void };
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
      // Proportional, prominent sizing: 480px on desktop
      const cardW = isMobile
        ? Math.min(w * 0.74, 290)
        : isTablet
        ? Math.min(w * 0.42, 410)
        : Math.min(h * CARD_H_FACTOR * CARD_RATIO, w * CARD_MAX_W_FACTOR, 480);
      const cardH = cardW / CARD_RATIO;
      const drumR = isMobile ? cardH * 1.85 : cardH * DRUM_MULT;
      const ringR = isMobile ? cardH * 0.96 : cardH * RING_MULT;
      const ringScale = isMobile
        ? 0.70
        : clamp(
            (((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1),
            0.62,
            0.78
          );
      const bow = cardH * BOW_MULT;
      const depth = cardH * LENS_MULT;

      return { cardW, cardH, drumR, ringR, ringScale, bow, depth };
    }

    let metrics = calculateMetrics();

    function applySizes() {
      metrics = calculateMetrics();
      if (stageEl) {
        stageEl.style.perspective = `${metrics.depth}px`;
      }
      cardRefs.current.forEach((card) => {
        if (!card) return;
        card.style.width = `${metrics.cardW}px`;
        card.style.height = `${metrics.cardH}px`;
        card.style.marginLeft = `${-metrics.cardW / 2}px`;
        card.style.marginTop = `${-metrics.cardH / 2}px`;
      });
    }

    applySizes();

    const ro = new ResizeObserver(() => {
      applySizes();
    });
    ro.observe(stageEl);

    const st = ScrollTrigger.create({
      trigger: containerEl,
      start: "top top",
      end: "+=280%",
      pin: true,
      anticipatePin: 1,
      scrub: 0.8,
      onUpdate: (self) => {
        targetTurn.current = progressToTurn(self.progress, count);
      },
    });

    const draw = () => {
      if (!isRunning) return;
      frameId = requestAnimationFrame(draw);

      currentTurn.current += (targetTurn.current - currentTurn.current) * 0.14;
      currentMouse.current.x += (targetMouse.current.x - currentMouse.current.x) * 0.08;
      currentMouse.current.y += (targetMouse.current.y - currentMouse.current.y) * 0.08;

      const t = currentTurn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      const { drumR, ringR, ringScale, bow } = metrics;

      // In static mode (m = 0), apply a gentle 3D isometric pitch (14° X-pitch, -5° Y-yaw) to give the wheel genuine depth
      if (wheelEl) {
        const basePitch = (1 - m) * 14;
        const baseYaw = (1 - m) * -5;
        const tiltX = basePitch - currentMouse.current.y * (3.5 + m * 2);
        const tiltY = baseYaw + currentMouse.current.x * (3.5 + m * 2);
        wheelEl.style.transform = `translateZ(${-m * drumR}px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      }

      for (let i = 0; i < count; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;

        const d = i - pos;
        const drumDeg = d * STEP_DEG;
        const ringDeg = (i / count) * 360;

        card.style.transform = place(ringDeg, drumDeg, ringR, drumR, bow, m);

        const absD = Math.abs(d);
        if (m > 0.6 && absD > CULL_DIST) {
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          card.style.visibility = "hidden";
        } else {
          card.style.visibility = "visible";
          card.style.pointerEvents = "auto";

          const drumOpacity = Math.max(0.2, 1 - absD * 0.45);
          const opacity = lerp(0.95, drumOpacity, m);

          const blurAmount = lerp(0, Math.min(5, absD * 3), m);
          const brightness = lerp(0.95, Math.max(0.45, 1 - absD * 0.4), m);

          card.style.opacity = opacity.toFixed(3);
          card.style.filter = `blur(${blurAmount.toFixed(1)}px) brightness(${brightness.toFixed(2)})`;
          card.style.zIndex = String(Math.round(100 - absD * 20));
        }

        const face = cardFaceRefs.current[i];
        if (face) {
          face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
        }

        const img = cardImgRefs.current[i];
        if (img) {
          const panY = -d * 10 * m;
          img.style.transform = `translateY(${panY.toFixed(1)}px) scale(${lerp(1.02, 1.05 - absD * 0.04, m).toFixed(3)})`;
        }
      }

      const near = clamp(Math.round(pos), 0, count - 1);
      setActiveItem((prev) => (prev !== near ? near : prev));
      setIsRingView(m < 0.4);
    };

    frameId = requestAnimationFrame(draw);

    return () => {
      isRunning = false;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      st.kill();
    };
  }, [count]);

  const handleCardClick = (i: number) => {
    if (isRingView) {
      scrollToCard(i);
    } else {
      if (activeItem === i) {
        setModalClient(CLIENT_WORKS[i]);
      } else {
        scrollToCard(i);
      }
    }
  };

  const scrollToCard = useCallback(
    (index: number) => {
      if (!containerRef.current) return;
      const st =
        ScrollTrigger.getAll().find((s) => s.trigger === containerRef.current);
      if (!st) {
        targetTurn.current = index + 1;
        return;
      }

      const progressFraction = 0.24 + (index / (count - 1)) * 0.74;
      const targetScroll = st.start + progressFraction * (st.end - st.start);

      const lenis = (
        window as unknown as {
          __lenis?: {
            scrollTo: (target: number, opts?: { duration?: number }) => void;
          };
        }
      ).__lenis;

      if (lenis) {
        lenis.scrollTo(targetScroll, { duration: 1.2 });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    },
    [count]
  );

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
          {/* Subtle top/bottom edge gradients to blend seamlessly with Section 3 and next section */}
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
            {isRingView ? "ALL" : `${activeClient.number} / 0${count}`}
          </div>
        </div>

        {/* ── 3D MORPHING WHEEL STAGE ── */}
        <div
          ref={stageRef}
          role="region"
          aria-label="3D Works Wheel"
          className="relative z-10 w-full flex-1 my-auto overflow-hidden outline-none flex items-center justify-center"
          style={{ perspective: "1400px", transformStyle: "preserve-3d" }}
        >
          {/* 3D Wheel Anchor */}
          <div
            ref={wheelRef}
            className="absolute top-1/2 left-1/2 pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            {CLIENT_WORKS.map((client, i) => {
              const isActive = !isRingView && activeItem === i;
              return (
                <div
                  key={client.id}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  onClick={() => handleCardClick(i)}
                  className="group absolute cursor-pointer pointer-events-auto [backface-visibility:hidden] will-change-transform"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div
                    ref={(el) => {
                      cardFaceRefs.current[i] = el;
                    }}
                    className={`relative w-full h-full overflow-hidden rounded-2xl bg-zinc-950/90 border transition-all duration-300 will-change-transform origin-center ${
                      isActive
                        ? "border-cyan-400/80 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_35px_rgba(6,182,212,0.22)]"
                        : "border-zinc-800/80 shadow-[0_15px_35px_rgba(0,0,0,0.9)] hover:border-zinc-600"
                    }`}
                  >
                    <img
                      ref={(el) => {
                        cardImgRefs.current[i] = el;
                      }}
                      src={client.image}
                      alt={client.title}
                      draggable={false}
                      className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-100 ease-out filter brightness-95"
                    />

                    {/* Gradient Overlay for Legibility */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

                    {/* Sleek Minimalist Label */}
                    <div className="pointer-events-none absolute left-4 bottom-3.5 right-4 flex items-end justify-between">
                      <div className="max-w-[85%]">
                        <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase">
                          {`${client.number} // ${client.category}`}
                        </span>
                        <h4 className="font-hero text-sm sm:text-base text-white uppercase tracking-tight truncate mt-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                          {client.title}
                        </h4>
                      </div>

                      <ArrowUpRight className="w-4 h-4 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── MINIMAL FOOTER HUD ── */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pt-4 border-t border-zinc-800/60">
          <div>
            {!isRingView && (
              <a
                href={activeClient.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-400 hover:text-cyan-400 transition-colors cursor-pointer"
              >
                <span>{activeClient.website}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          {/* Minimalist Pacing Dashes */}
          <div className="flex items-center gap-2">
            {CLIENT_WORKS.map((client, idx) => (
              <button
                key={client.id}
                onClick={() => scrollToCard(idx)}
                aria-label={client.title}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  !isRingView && activeItem === idx
                    ? "w-6 h-1 bg-white"
                    : "w-2 h-1 bg-zinc-700 hover:bg-zinc-500"
                }`}
              />
            ))}
          </div>
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

            {/* Modal Visual */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-inner">
              <img
                src={modalClient.image}
                alt={modalClient.title}
                className="w-full h-full object-cover object-top"
              />
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
