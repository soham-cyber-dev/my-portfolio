"use client";

import React from "react";
import { PORTFOLIO_DATA } from "../data/portfolioData";
import { ArrowUpRight } from "lucide-react";

interface OutputProps {
  onRunCommand?: (cmd: string) => void;
}

// ─────────────────────────────────────────────────────────────
// 01 — HELP OUTPUT
// ─────────────────────────────────────────────────────────────
export function HelpOutput({ onRunCommand }: OutputProps) {
  const commands = [
    { cmd: "about", desc: "Bio, engineering manifesto & education" },
    { cmd: "projects", desc: "Featured software platforms & source code" },
    { cmd: "clients", desc: "Deployed client work & production case studies" },
    { cmd: "skills", desc: "Core technical stack & engineering domains" },
    { cmd: "experience", desc: "Work log & GDG community leadership" },
    { cmd: "contact", desc: "Email, GitHub, LinkedIn & communication links" },
    { cmd: "game", desc: "Play analog 'Signal Lock' mini-game" },
    { cmd: "clear", desc: "Clear terminal screen" },
    { cmd: "exit", desc: "Return to Creative Mode" },
  ];

  return (
    <div className="my-2 space-y-2 text-xs font-mono">
      <p className="text-[#C084FC] text-[11px] uppercase tracking-wider font-semibold">
        AVAILABLE DIRECTIVES:
      </p>

      <div className="space-y-1.5 pl-2">
        {commands.map((c) => (
          <div key={c.cmd} className="flex items-baseline gap-4">
            <button
              onClick={() => onRunCommand?.(c.cmd)}
              className="w-24 text-left text-[#A78BFA] hover:text-[#DDD6FE] font-semibold cursor-pointer shrink-0 transition-colors"
            >
              {c.cmd}
            </button>
            <span className="text-zinc-400 text-[11px]">{c.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 02 — IDENTITY / ABOUT OUTPUT
// ─────────────────────────────────────────────────────────────
export function IdentityOutput() {
  const { identity } = PORTFOLIO_DATA;

  return (
    <div className="my-2 space-y-3 font-mono text-xs leading-relaxed max-w-2xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Soham's Portrait Image */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border border-[#A855F7]/60 bg-[#120D1D] shrink-0 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
          <img
            src={identity.portrait}
            alt={identity.operator}
            className="w-full h-full object-cover object-top filter contrast-105"
          />
        </div>

        <div>
          <p className="text-white font-bold text-sm uppercase tracking-wide">
            {identity.operator}
          </p>
          <p className="text-[#C084FC] text-xs mt-0.5">{identity.title}</p>
          <p className="text-zinc-400 text-[11px]">
            {identity.location} · {identity.education.degree} ({identity.education.gradYear})
          </p>
        </div>
      </div>

      <p className="text-zinc-300 text-xs font-light">
        {identity.bio}
      </p>

      <p className="text-[#EDE9FE] text-xs italic pl-3 border-l-2 border-[#A855F7]">
        &ldquo;{identity.philosophy}&rdquo;
      </p>

      <div className="text-[11px] text-zinc-400 pt-1">
        <span className="text-[#A78BFA] font-semibold">Leadership:</span> {identity.leadership.role} @ {identity.leadership.organization}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 03 — PROJECTS OUTPUT
// ─────────────────────────────────────────────────────────────
export function ProjectsOutput() {
  const { projects } = PORTFOLIO_DATA;

  return (
    <div className="my-2 space-y-4 font-mono text-xs max-w-2xl">
      <p className="text-[#C084FC] text-[11px] uppercase tracking-wider font-semibold">
        FEATURED ARCHITECTURES:
      </p>

      <div className="space-y-4 pl-2">
        {projects.map((proj, i) => (
          <div key={proj.id} className="space-y-1">
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-[#A855F7] font-bold text-[11px]">{`0${i + 1} //`}</span>
              <span className="text-white font-bold uppercase tracking-wide">{proj.title}</span>
              <span className="text-zinc-500 text-[11px]">({proj.category})</span>
            </div>

            <p className="text-zinc-300 text-xs font-light pl-6">
              {proj.description}
            </p>

            <div className="text-[11px] text-zinc-400 pl-6">
              <span className="text-zinc-500">Stack:</span> {proj.tags.join(" · ")}
            </div>

            <div className="pl-6 pt-0.5">
              <a
                href={proj.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[#A78BFA] hover:text-[#DDD6FE] text-[11px] transition-colors"
              >
                <span>{proj.github}</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 04 — CLIENTS OUTPUT
// ─────────────────────────────────────────────────────────────
export function ClientsOutput() {
  const { clients } = PORTFOLIO_DATA;

  return (
    <div className="my-2 space-y-4 font-mono text-xs max-w-2xl">
      <p className="text-[#C084FC] text-[11px] uppercase tracking-wider font-semibold">
        DEPLOYED CLIENT WORKS:
      </p>

      <div className="space-y-4 pl-1">
        {clients.map((c) => (
          <div key={c.id} className="flex items-start gap-3.5">
            {/* Client Logo Medallion Image */}
            <div className="w-11 h-11 rounded-full border border-[#2B213D] bg-[#120E1C] p-2 flex items-center justify-center shrink-0 shadow-sm mt-0.5">
              <img
                src={c.image}
                alt={c.title}
                className="max-h-full max-w-full object-contain filter brightness-105"
              />
            </div>

            <div className="space-y-1 flex-1">
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="text-[#A855F7] font-bold text-[11px]">{`${c.number} //`}</span>
                <span className="text-white font-bold uppercase tracking-wide">{c.title}</span>
                <span className="text-zinc-500 text-[11px]">[{c.category}]</span>
              </div>

              <p className="text-zinc-300 text-xs font-light">
                {c.description}
              </p>

              <div className="pt-0.5">
                <a
                  href={c.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#A78BFA] hover:text-[#DDD6FE] text-[11px] transition-colors"
                >
                  <span>{c.website}</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 05 — SKILLS OUTPUT
// ─────────────────────────────────────────────────────────────
export function SkillsOutput() {
  const { skills } = PORTFOLIO_DATA;

  return (
    <div className="my-2 space-y-3 font-mono text-xs max-w-2xl">
      <p className="text-[#C084FC] text-[11px] uppercase tracking-wider font-semibold">
        TECHNICAL COMPETENCIES:
      </p>

      <div className="space-y-2 pl-2">
        {skills.map((s) => (
          <div key={s.domain} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
            <span className="text-zinc-400 w-36 shrink-0 text-[11px]">{s.domain}:</span>
            <span className="text-white text-xs">{s.items.join(" · ")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 06 — EXPERIENCE OUTPUT
// ─────────────────────────────────────────────────────────────
export function ExperienceOutput() {
  return (
    <div className="my-2 space-y-3 font-mono text-xs max-w-2xl">
      <p className="text-[#C084FC] text-[11px] uppercase tracking-wider font-semibold">
        EXPERIENCE & COMMUNITY:
      </p>

      <div className="space-y-3 pl-2">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold">Tech Lead</span>
            <span className="text-zinc-400">@ Google Developer Groups, UEM Kolkata</span>
            <span className="text-[#A855F7] text-[10px] ml-auto">Active</span>
          </div>
          <p className="text-zinc-300 text-xs font-light mt-0.5">
            Organizing developer summits, conducting technical workshops, and mentoring students in full-stack architecture.
          </p>
        </div>

        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-white font-bold">Full-Stack Software Architecture</span>
            <span className="text-[#A78BFA] text-[10px] ml-auto">Production</span>
          </div>
          <p className="text-zinc-300 text-xs font-light mt-0.5">
            Architected and engineered custom digital agency platforms, AI outreach pipelines, and high-reliability web infrastructure.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// 07 — CONTACT OUTPUT
// ─────────────────────────────────────────────────────────────
export function ContactOutput() {
  const { contact } = PORTFOLIO_DATA;

  return (
    <div className="my-2 space-y-2.5 font-mono text-xs max-w-xl">
      <p className="text-[#C084FC] text-[11px] uppercase tracking-wider font-semibold">
        COMMUNICATION COORDINATES:
      </p>

      <div className="space-y-1.5 pl-2">
        <div className="flex items-baseline gap-4">
          <span className="text-zinc-500 w-20 shrink-0 text-[11px]">Email:</span>
          <a
            href={`mailto:${contact.email}`}
            className="text-[#C084FC] hover:underline"
          >
            {contact.email}
          </a>
        </div>

        <div className="flex items-baseline gap-4">
          <span className="text-zinc-500 w-20 shrink-0 text-[11px]">GitHub:</span>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A78BFA] hover:underline inline-flex items-center gap-1"
          >
            <span>{contact.github}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-baseline gap-4">
          <span className="text-zinc-500 w-20 shrink-0 text-[11px]">LinkedIn:</span>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#A78BFA] hover:underline inline-flex items-center gap-1"
          >
            <span>{contact.linkedin}</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>

        <div className="flex items-baseline gap-4">
          <span className="text-zinc-500 w-20 shrink-0 text-[11px]">Instagram:</span>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:underline inline-flex items-center gap-1"
          >
            <span>@_its_soham_</span>
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
