"use client";

import React, { useState, useRef, useEffect } from "react";
import { X, ArrowUpRight } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface Project {
  id: number;
  title: string;
  category: string;
  subtitle: string;
  description: string;
  detailedDescription: string;
  features: string[];
  image: string;
  tags: string[];
  github: string;
  demoUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: 0,
    title: "Full-Stack Web App",
    category: "Full-Stack Platform",
    subtitle: "End-to-End Architecture & REST API",
    description:
      "A responsive full-stack platform featuring robust JWT authentication, Express microservices, and MongoDB data persistence.",
    detailedDescription:
      "Engineered with a focus on clean architecture and performance. Implements stateless authentication, schema validation, optimized database transactions, and an expressive, responsive interface with real-time UI state updates.",
    features: [
      "Token-based authentication & route security",
      "Normalized MongoDB schemas with indexing",
      "RESTful API endpoints with input validation",
      "Optimistic UI updates with Tailwind CSS",
    ],
    image: "/full stack app.jpg",
    tags: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    github: "https://github.com/soham-cyber-dev/fullstack-app.git",
    demoUrl: "https://github.com/soham-cyber-dev/fullstack-app.git",
  },
  {
    id: 1,
    title: "Movie Discovery",
    category: "Entertainment Platform",
    subtitle: "Cinematic Media Streaming",
    description:
      "An interactive movie browsing application with debounced search indexing, real-time TMDB API integration, and responsive media grids.",
    detailedDescription:
      "Designed for entertainment cinephiles. Connects seamlessly to the TMDB API to fetch real-time trending media, cast credits, and trailers with client-side caching and skeleton loaders.",
    features: [
      "Real-time TMDB API integration with debounced search",
      "Genre filters & curated trending collections",
      "Fluid responsive layout with skeleton loaders",
      "Interactive details modal with high-res media",
    ],
    image: "/movie_website.jpg",
    tags: ["React", "JavaScript", "TMDB API", "CSS3", "REST"],
    github: "https://github.com/soham-cyber-dev/Movie-Website.git",
    demoUrl: "https://github.com/soham-cyber-dev/Movie-Website.git",
  },
  {
    id: 2,
    title: "Nexus AI Outreach",
    category: "AI & Automation Engine",
    subtitle: "Autonomous Lead Pipeline",
    description:
      "An automated workflow engine that transforms raw prospect data into hyper-personalized email outreach at scale.",
    detailedDescription:
      "Automates repetitive outreach by combining prompt engineering, prospect enrichments, and automated delivery cadences, significantly boosting response rates while maintaining high personalization.",
    features: [
      "Automated lead data enrichment & parsing",
      "LLM prompt chaining for personalized email generation",
      "Tone customization and deliverability heuristics",
      "Pipeline status tracking & conversion analytics",
    ],
    image: "/nexus-outreach-engine ai automation.png",
    tags: ["Next.js", "TypeScript", "LLM Pipeline", "Node.js", "Automation"],
    github: "https://github.com/soham-cyber-dev/nexus-outreach-engine",
    demoUrl: "https://github.com/soham-cyber-dev/nexus-outreach-engine",
  },
];

const smoothstep = (min: number, max: number, value: number) => {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)));
  return x * x * (3 - 2 * x);
};

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cardImgRefs = useRef<(HTMLImageElement | null)[]>([]);
  const textGroupRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [cardDims, setCardDims] = useState({ width: 460, height: 295 });

  const targetProgress = useRef(0);
  const currentProgress = useRef(0);
  const targetMouse = useRef({ x: 0, y: 0 });
  const currentMouse = useRef({ x: 0, y: 0 });

  // Responsive card dimension handler
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      if (w < 480) {
        setCardDims({ width: 300, height: 210 });
      } else if (w < 768) {
        setCardDims({ width: 360, height: 240 });
      } else if (w < 1024) {
        setCardDims({ width: 400, height: 265 });
      } else {
        setCardDims({ width: 460, height: 295 });
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Mouse move listener for subtle 3D parallax
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

  // Keyboard escape listener to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setModalProject(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Body scroll lock when modal is open
  useEffect(() => {
    if (modalProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalProject]);

  // Scroll kinematics & Parallax Engine
  useEffect(() => {
    let animId: number;
    let running = true;

    const loop = () => {
      if (!running) return;

      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const scrollDistance = rect.height - window.innerHeight;
        if (scrollDistance > 0) {
          const raw = -rect.top / scrollDistance;
          targetProgress.current = Math.max(0, Math.min(1, raw));
        }
      }

      currentProgress.current +=
        (targetProgress.current - currentProgress.current) * 0.10;
      currentMouse.current.x +=
        (targetMouse.current.x - currentMouse.current.x) * 0.08;
      currentMouse.current.y +=
        (targetMouse.current.y - currentMouse.current.y) * 0.08;

      const prog = currentProgress.current;
      const mx = currentMouse.current.x;
      const my = currentMouse.current.y;

      let domain = 0;
      if (prog <= 0.20) {
        domain = 0;
      } else if (prog < 0.45) {
        domain = smoothstep(0.20, 0.45, prog);
      } else if (prog <= 0.65) {
        domain = 1.0;
      } else if (prog < 0.90) {
        domain = 1.0 + smoothstep(0.65, 0.90, prog);
      } else {
        domain = 2.0;
      }

      // Smooth scroll-linked text cross-fade
      textGroupRefs.current.forEach((el, idx) => {
        if (!el) return;
        const diff = domain - idx;
        const absDiff = Math.abs(diff);

        const opacity = Math.max(0, 1 - Math.pow(absDiff, 1.4));
        const translateY = -diff * 32;
        const blur = Math.max(0, absDiff * 6 - 0.5);

        el.style.opacity = `${opacity.toFixed(3)}`;
        el.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
        el.style.filter = blur > 0.2 ? `blur(${blur.toFixed(1)}px)` : "none";
        el.style.pointerEvents = opacity > 0.7 ? "auto" : "none";
        el.style.visibility = opacity > 0.01 ? "visible" : "hidden";
      });

      // Subtle mouse parallax on card stage
      if (stageRef.current) {
        const tiltX = -my * 5;
        const tiltY = mx * 5;
        const shiftX = mx * 10;
        const shiftY = my * 10;
        stageRef.current.style.transform = `translate3d(${shiftX.toFixed(1)}px, ${shiftY.toFixed(1)}px, 0) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg)`;
      }

      if (glowRef.current) {
        const glowX = mx * 25;
        const glowY = my * 20;
        glowRef.current.style.transform = `translate3d(${glowX.toFixed(1)}px, ${glowY.toFixed(1)}px, 0)`;
      }

      // 3D Card Kinematics
      const distX = 38;
      const distY = 34;
      const dropDistance = cardDims.height + 110;

      cardsRef.current.forEach((el, idx) => {
        if (!el) return;

        let x = 0;
        let y = 0;
        let z = 0;
        let zIndex = 10;
        let skewY = 4.5;
        let scale = 1;

        if (domain <= 1.0) {
          const t = domain;
          if (idx === 0) {
            const drop = Math.sin(t * Math.PI);
            x = distX * 2 * t;
            y = dropDistance * drop - distY * 2 * t;
            z = -distX * 3.2 * t - 35 * drop;
            zIndex = t < 0.48 ? 12 : 7;
            skewY = 4.5 + 2.5 * drop;
            scale = 1 - 0.04 * t;
          } else if (idx === 1) {
            x = distX * (1 - t);
            y = -distY * (1 - t);
            z = -distX * 1.6 * (1 - t);
            zIndex = 9 + Math.round(t);
            scale = 0.96 + 0.04 * t;
          } else if (idx === 2) {
            x = distX * 2 - distX * t;
            y = -distY * 2 + distY * t;
            z = -distX * 3.2 + distX * 1.6 * t;
            zIndex = 8;
            scale = 0.92 + 0.04 * t;
          }
        } else {
          const t = domain - 1.0;
          if (idx === 1) {
            const drop = Math.sin(t * Math.PI);
            x = distX * 2 * t;
            y = dropDistance * drop - distY * 2 * t;
            z = -distX * 3.2 * t - 35 * drop;
            zIndex = t < 0.48 ? 12 : 7;
            skewY = 4.5 + 2.5 * drop;
            scale = 1 - 0.04 * t;
          } else if (idx === 2) {
            x = distX * (1 - t);
            y = -distY * (1 - t);
            z = -distX * 1.6 * (1 - t);
            zIndex = 9 + Math.round(t);
            scale = 0.96 + 0.04 * t;
          } else if (idx === 0) {
            x = distX * 2 - distX * t;
            y = -distY * 2 + distY * t;
            z = -distX * 3.2 + distX * 1.6 * t;
            zIndex = 8;
            scale = 0.92 + 0.04 * t;
          }
        }

        el.style.transform = `translate3d(calc(-50% + ${x.toFixed(1)}px), calc(-50% + ${y.toFixed(1)}px), ${z.toFixed(1)}px) skewY(${skewY.toFixed(1)}deg) scale(${scale.toFixed(3)})`;
        el.style.zIndex = `${zIndex}`;

        const img = cardImgRefs.current[idx];
        if (img) {
          const imgX = -mx * 10;
          const imgY = -my * 8;
          img.style.transform = `translate3d(${imgX.toFixed(1)}px, ${imgY.toFixed(1)}px, 0) scale(1.06)`;
        }
      });

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => {
      running = false;
      cancelAnimationFrame(animId);
    };
  }, [cardDims.height]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative w-full bg-black text-white selection:bg-white selection:text-black cursor-default"
      style={{ height: "300vh" }}
    >
      {/* Seamless top cinematic blend */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-30" />

      {/* Subtle Ambient Radial Light Bloom */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-1/3 right-1/4 w-[540px] h-[360px] bg-cyan-950/20 blur-[130px] rounded-full will-change-transform"
      />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 w-[420px] h-[280px] bg-zinc-800/15 blur-[120px] rounded-full" />

      {/* Pinned Sticky Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-black flex flex-col justify-between px-6 sm:px-12 md:px-16 lg:px-20 py-10 md:py-14 select-none">
        {/* ── ATMOSPHERIC ARCHITECTURAL BACKGROUND ── */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src="/projects_bg.jpg"
            alt="Featured Projects Architectural Gallery Background"
            className="w-full h-full object-cover object-center select-none filter brightness-[0.70] contrast-[1.15] opacity-50"
          />
          {/* Subtle dark noir ambient wash to guarantee high contrast readability */}
          <div className="absolute inset-0 bg-black/60 backdrop-brightness-[0.9]" />
          {/* Top and bottom cinematic edge vignettes for smooth transitions */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black via-black/70 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
        </div>

        {/* Minimal Clean Header */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex items-center justify-between pb-4 border-b border-zinc-800/60">
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
            <span className="text-xs font-mono tracking-[0.25em] text-zinc-300 uppercase">
              03 // FEATURED WORK
            </span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="relative z-10 w-full max-w-6xl mx-auto flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center my-auto">
          {/* Left Column: Continuous Cross-Fade Project Information */}
          <div className="lg:col-span-5 relative min-h-[300px] flex items-center">
            {PROJECTS.map((proj, idx) => (
              <div
                key={proj.id}
                ref={(el) => {
                  textGroupRefs.current[idx] = el;
                }}
                className="absolute inset-0 flex flex-col justify-center space-y-6 will-change-transform"
                style={{
                  opacity: idx === 0 ? 1 : 0,
                  transform: idx === 0 ? "none" : "translate3d(0, 32px, 0)",
                }}
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[10px] font-mono tracking-widest text-cyan-400 uppercase mb-3">
                    <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.8)]" />
                    <span>{proj.category}</span>
                  </div>

                  <h3 className="font-hero text-4xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[0.88] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
                    {proj.title}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-body leading-relaxed max-w-md font-light">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900/80 border border-zinc-800/80 text-zinc-300 hover:border-zinc-700 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-4">
                  <button
                    onClick={() => setModalProject(proj)}
                    className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-white font-mono text-xs tracking-wider uppercase transition-all duration-200 active:scale-95 shadow-lg hover:border-zinc-500 cursor-pointer"
                  >
                    <span>Inspect Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-cyan-400" />
                  </button>

                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-transparent hover:border-zinc-800 text-zinc-400 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>Source</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: 3D Perspective Card Stack */}
          <div className="lg:col-span-7 flex items-center justify-center">
            <div
              ref={stageRef}
              className="relative select-none will-change-transform"
              style={{
                width: cardDims.width,
                height: cardDims.height,
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0"
                style={{ transformStyle: "preserve-3d" }}
              >
                {PROJECTS.map((proj, idx) => (
                  <div
                    key={proj.id}
                    ref={(el) => {
                      cardsRef.current[idx] = el;
                    }}
                    onClick={() => setModalProject(proj)}
                    style={{
                      width: cardDims.width,
                      height: cardDims.height,
                    }}
                    className="absolute top-1/2 left-1/2 rounded-2xl border border-zinc-700/80 bg-zinc-950 shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(34,211,238,0.06)] hover:border-cyan-400/70 hover:shadow-[0_25px_60px_rgba(0,0,0,0.95),0_0_40px_rgba(34,211,238,0.18)] transition-colors duration-300 cursor-pointer overflow-hidden group will-change-transform"
                  >
                    <div className="relative w-full h-full flex flex-col pointer-events-auto overflow-hidden">
                      <img
                        ref={(el) => {
                          cardImgRefs.current[idx] = el;
                        }}
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover object-top filter brightness-[0.94] contrast-[1.06] transition-transform duration-300 ease-out will-change-transform"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent pointer-events-none" />

                      <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between pointer-events-none">
                        <div>
                          <p className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase">
                            {proj.category}
                          </p>
                          <h4 className="font-hero text-xl text-white uppercase tracking-tight leading-none mt-1">
                            {proj.title}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═════════════════════════════════════════════════════════════════════ */}
      {/* POP-UP MODAL                                                         */}
      {/* ═════════════════════════════════════════════════════════════════════ */}
      {modalProject && (
        <div
          data-lenis-prevent
          className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setModalProject(null)}
        >
          <div
            className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto rounded-2xl bg-zinc-950 border border-zinc-800 text-white p-6 sm:p-8 flex flex-col gap-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-zinc-800/80 pb-4">
              <div>
                <p className="text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase">
                  {modalProject.category}
                </p>
                <h3 className="font-hero text-3xl sm:text-4xl uppercase tracking-tight text-white leading-none mt-1">
                  {modalProject.title}
                </h3>
              </div>

              <button
                onClick={() => setModalProject(null)}
                className="text-zinc-500 hover:text-white p-1.5 rounded-lg hover:bg-zinc-900 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Visual */}
            <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-zinc-800 bg-black shadow-inner">
              <img
                src={modalProject.image}
                alt={modalProject.title}
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Narrative & Highlights */}
            <div className="space-y-4">
              <p className="text-sm text-zinc-300 font-body leading-relaxed font-light">
                {modalProject.detailedDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {modalProject.features.map((feat, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 text-xs text-zinc-300 font-mono"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/80 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Tags */}
            <div className="pt-2 border-t border-zinc-800/80 flex flex-wrap gap-2">
              {modalProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <a
                  href={modalProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-black hover:bg-zinc-200 font-medium text-xs font-mono tracking-wider uppercase transition-all duration-200 active:scale-95 shadow-lg"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub Repository</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                {modalProject.demoUrl && (
                  <a
                    href={modalProject.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/80 text-zinc-300 hover:text-white font-mono text-xs tracking-wider uppercase transition-colors"
                  >
                    <span>Inspect</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

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
