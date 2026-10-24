"use client";

import React, { useRef, useState } from "react";
import { Home, Compass, FolderGit2, Users } from "lucide-react";
import MagnificationDock, { DockItemData } from "./MagnificationDock";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!footerRef.current) return;
    const rect = footerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const scrollToSection = (target: string | number) => {
    const lenis = (
      window as unknown as {
        __lenis?: {
          scrollTo: (
            target: string | number,
            opts?: { duration?: number; offset?: number }
          ) => void;
        };
      }
    ).__lenis;

    if (lenis) {
      lenis.scrollTo(target, { duration: 1.5 });
    } else {
      if (typeof target === "number") {
        window.scrollTo({ top: target, behavior: "smooth" });
      } else {
        const el = document.querySelector(target);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const navDockItems: DockItemData[] = [
    {
      icon: <Home className="w-[18px] h-[18px]" />,
      label: "01 // INDEX",
      onClick: () => scrollToSection(0),
    },
    {
      icon: <Compass className="w-[18px] h-[18px]" />,
      label: "02 // STORY",
      onClick: () => scrollToSection("#about"),
    },
    {
      icon: <FolderGit2 className="w-[18px] h-[18px]" />,
      label: "03 // WORK",
      onClick: () => scrollToSection("#projects"),
    },
    {
      icon: <Users className="w-[18px] h-[18px]" />,
      label: "04 // CLIENTS",
      onClick: () => scrollToSection("#client-works"),
    },
  ];

  const socialDockItems: DockItemData[] = [
    {
      icon: <LinkedInIcon className="w-[17px] h-[17px]" />,
      label: "LINKEDIN",
      onClick: () => {
        window.open(
          "https://www.linkedin.com/in/soham-bhuniya-cyber-dev",
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
    {
      icon: <GithubIcon className="w-[17px] h-[17px]" />,
      label: "GITHUB",
      onClick: () => {
        window.open(
          "https://github.com/soham-cyber-dev",
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
    {
      icon: <InstagramIcon className="w-[17px] h-[17px]" />,
      label: "INSTAGRAM",
      onClick: () => {
        window.open(
          "https://www.instagram.com/_its_soham_?cplk=MXRnMjUwaTIzMmFoYg%3D%3D&utm_source=qr",
          "_blank",
          "noopener,noreferrer"
        );
      },
    },
  ];

  return (
    <footer
      id="contact"
      ref={footerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full min-h-screen bg-black text-white selection:bg-white selection:text-black overflow-hidden flex flex-col justify-between px-6 sm:px-10 md:px-14 lg:px-20 py-10 md:py-14 select-none border-t border-zinc-900"
    >
      {/* ── SEAMLESS TOP BLEND FROM SECTION 04 ── */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black via-black/80 to-transparent z-10" />

      {/* ── ATMOSPHERIC AMBIENT GLOW ── */}
      <div
        className="pointer-events-none absolute w-[600px] h-[340px] bg-cyan-950/20 blur-[140px] rounded-full transition-opacity duration-700 opacity-60"
        style={{
          left: mousePos.x - 300,
          top: mousePos.y - 170,
        }}
      />
      <div className="pointer-events-none absolute top-1/4 right-1/4 w-[450px] h-[250px] bg-zinc-800/10 blur-[130px] rounded-full" />

      {/* ── DESKTOP LEFT VERTICAL DOCK: NAVIGATION ── */}
      <div className="hidden md:flex absolute left-6 lg:left-12 top-1/2 -translate-y-1/2 z-30 flex-col items-center">
        <MagnificationDock
          items={navDockItems}
          orientation="vertical"
          tooltipPosition="right"
          panelSize={56}
          baseItemSize={44}
          magnification={68}
          distance={140}
        />
      </div>

      {/* ── DESKTOP RIGHT VERTICAL DOCK: SOCIAL MEDIA HANDLES ── */}
      <div className="hidden md:flex absolute right-6 lg:right-12 top-1/2 -translate-y-1/2 z-30 flex-col items-center">
        <MagnificationDock
          items={socialDockItems}
          orientation="vertical"
          tooltipPosition="left"
          panelSize={56}
          baseItemSize={44}
          magnification={68}
          distance={140}
        />
      </div>

      {/* ── TOP SPACER / MINIMAL ANCHOR ── */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex items-center justify-center pt-2" />

      {/* ── CENTER AREA: STATEMENT + MONUMENTAL TYPOGRAPHY + MOBILE DOCKS ── */}
      <div className="relative z-20 w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center text-center my-auto py-8 sm:py-12 md:px-12">
        {/* Concise Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900/80 border border-zinc-800 text-[10px] sm:text-[11px] font-mono tracking-widest text-zinc-300 mb-6 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          <span>SOFTWARE DEVELOPER // KOLKATA, INDIA</span>
        </div>

        {/* Mobile Navigation Dock */}
        <div className="flex md:hidden flex-col items-center mb-6 z-20">
          <MagnificationDock
            items={navDockItems}
            orientation="horizontal"
            tooltipPosition="bottom"
            panelSize={52}
            baseItemSize={40}
            magnification={60}
            distance={120}
          />
        </div>

        {/* Monumental Typographic Art-Book Title */}
        <h2 className="font-hero text-[15.5vw] md:text-[14vw] lg:text-[13vw] uppercase tracking-[-0.03em] leading-[0.80] select-none text-center flex flex-col items-center w-full my-auto">
          <span className="text-white drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)] transition-transform duration-700 hover:scale-[1.01] will-change-transform">
            SOHAM
          </span>
          <span className="text-stroke-editorial tracking-[-0.03em] -mt-[0.05em] drop-shadow-[0_4px_35px_rgba(0,0,0,0.9)] transition-transform duration-700 hover:scale-[1.01] will-change-transform">
            BHUNIYA
          </span>
        </h2>

        {/* Mobile Social Dock */}
        <div className="flex md:hidden flex-col items-center mt-6 z-20">
          <MagnificationDock
            items={socialDockItems}
            orientation="horizontal"
            tooltipPosition="top"
            panelSize={52}
            baseItemSize={40}
            magnification={60}
            distance={120}
          />
        </div>
      </div>

      {/* ── BOTTOM BAR: COPYRIGHT LINE ── */}
      <div className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-center pt-6 border-t border-zinc-800/60 text-xs font-mono">
        <div className="text-[11px] font-mono text-zinc-500">
          © {new Date().getFullYear()} SOHAM BHUNIYA
        </div>
      </div>
    </footer>
  );
}
