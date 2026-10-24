"use client";

import React, { useRef, useEffect } from "react";
import CharacterModel from "./components/CharacterModel";
import StorytellingSection from "./components/StorytellingSection";
import ProjectsSection from "./components/ProjectsSection";
import WorksWheel from "./components/WorksWheel";
import Footer from "./components/Footer";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const isInside = useRef(false);
  const animFrameId = useRef<number | null>(null);

  useEffect(() => {
    const updateSpotlight = () => {
      // Easing / lerp interpolation for silky smooth movement
      const lerp = 0.14;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerp;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerp;

      if (revealRef.current) {
        if (isInside.current) {
          const x = currentPos.current.x;
          const y = currentPos.current.y;
          // Soft feathered circular spotlight mask with exact 260px radius
          const mask = `radial-gradient(circle 260px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.95) 140px, rgba(0,0,0,0.65) 195px, rgba(0,0,0,0.2) 235px, transparent 260px)`;
          revealRef.current.style.webkitMaskImage = mask;
          revealRef.current.style.maskImage = mask;
          revealRef.current.style.opacity = "1";
        } else {
          revealRef.current.style.opacity = "0";
        }
      }

      animFrameId.current = requestAnimationFrame(updateSpotlight);
    };

    animFrameId.current = requestAnimationFrame(updateSpotlight);

    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    targetPos.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
    isInside.current = true;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    targetPos.current = { x, y };
    currentPos.current = { x, y };
    isInside.current = true;
  };

  const handleMouseLeave = () => {
    isInside.current = false;
  };

  const baseImageSrc = "/bg-image-2.png";
  const revealImageSrc = "/bg-image-1.png";

  return (
    <main className="relative bg-black w-full min-h-screen">
      <div
        ref={heroRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative min-h-screen w-full bg-black text-white flex flex-col justify-between overflow-hidden selection:bg-white selection:text-black cursor-default"
      >
        {/* LAYER 0: BASE HERO BACKGROUND */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <img
            src={baseImageSrc}
            alt="Base Scene"
            className="w-full h-full object-cover object-center select-none"
          />
          {/* Subtle dark vignette to keep typography razor-sharp and editorial */}
          <div className="absolute inset-0 bg-black/45 backdrop-brightness-[0.9]" />
        </div>

        {/* LAYER 1: REVEAL IMAGE LAYER WITH 260px SOFT SPOTLIGHT MASK */}
        <div
          ref={revealRef}
          className="pointer-events-none absolute inset-0 z-[2] overflow-hidden transition-opacity duration-300"
          style={{
            opacity: 0,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
          }}
        >
          <img
            src={revealImageSrc}
            alt="Reveal Scene"
            className="w-full h-full object-cover object-center select-none"
          />
          {/* Matching subtle tone blend */}
          <div className="absolute inset-0 bg-black/30" />
        </div>

        {/* LAYER 2: "SOFTWARE DEVELOPER" HEADLINE */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[4] px-6 md:px-12 lg:px-16 pt-6 md:pt-10 w-full max-w-[1500px] mx-auto flex flex-col items-center text-center">
          <h1 className="flex flex-col items-center justify-center select-none leading-[0.88] tracking-[-0.025em] uppercase font-hero text-center w-full">
            <span className="text-[15vw] md:text-[14.5vw] lg:text-[13.5vw] text-white tracking-[-0.025em] text-center inline-block drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              SOFTWARE
            </span>
            <span className="text-[15vw] md:text-[14.5vw] lg:text-[13.5vw] text-stroke-editorial tracking-[-0.025em] -mt-[0.04em] text-center inline-block drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)]">
              DEVELOPER
            </span>
          </h1>
        </div>

        {/* LAYER 3: 3D FULL CHARACTER MODEL */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1000] flex items-end justify-center overflow-visible"
          style={{ zIndex: 1000 }}
        >
          <div className="w-[436px] h-[629px] sm:w-[557px] sm:h-[774px] md:w-[678px] md:h-[895px] lg:w-[823px] lg:h-[1016px] max-w-full flex items-center justify-center">
            <CharacterModel />
          </div>
        </div>

        {/* LAYER 4: MAIN INTERACTIVE UI CONTENT */}
        <div className="relative z-[20] flex-1 flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-6 md:pt-10 pb-10 w-full max-w-[1500px] mx-auto pointer-events-none">
          <div className="w-full invisible pointer-events-none pt-2 sm:pt-4 md:pt-6" aria-hidden="true">
            <h1 className="flex flex-col items-center justify-center leading-[0.88] tracking-[-0.025em] uppercase font-hero text-center w-full">
              <span className="text-[15vw] md:text-[14.5vw] lg:text-[13.5vw]">SOFTWARE</span>
              <span className="text-[15vw] md:text-[14.5vw] lg:text-[13.5vw] -mt-[0.04em]">DEVELOPER</span>
            </h1>
          </div>

          <div className="w-full flex justify-end mt-12 md:mt-16 pointer-events-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-4 w-full md:w-auto">
              <a
                href="#about"
                onClick={(e) => {
                  const lenis = (window as unknown as { __lenis?: { scrollTo: (target: string, opts?: { offset?: number; duration?: number }) => void } }).__lenis;
                  if (lenis) {
                    e.preventDefault();
                    lenis.scrollTo("#about", { offset: 0, duration: 1.4 });
                  }
                }}
                className="group relative inline-flex items-center justify-center px-7 py-3 rounded-md bg-black/60 backdrop-blur-sm border border-zinc-600 text-zinc-200 font-mono text-xs tracking-widest uppercase transition-all duration-300 hover:border-white hover:text-white hover:bg-black/80 active:scale-[0.98]"
              >
                <span>Explore</span>
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>

        {/* BOTTOM SEAMLESS CINEMATIC VIGNETTE */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black via-black/80 to-transparent z-[50]" />
      </div>

      {/* SECTION 02: CINEMATIC SCROLL-DRIVEN STORYTELLING SECTION */}
      <StorytellingSection />

      {/* SECTION 03: PERSPECTIVE CARD SWAP FEATURED PROJECTS */}
      <ProjectsSection />

      {/* SECTION 04: 3D WORKS WHEEL (CLIENT WORKS) */}
      <WorksWheel />

      {/* FINAL SECTION: MONUMENTAL ART-BOOK FOOTER */}
      <Footer />
    </main>
  );
}
