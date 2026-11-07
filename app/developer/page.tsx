"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  HelpOutput,
  IdentityOutput,
  ProjectsOutput,
  ClientsOutput,
  SkillsOutput,
  ExperienceOutput,
  ContactOutput,
} from "./components/CommandOutputs";
import SignalLockGame from "./components/SignalLockGame";
import { PORTFOLIO_DATA } from "./data/portfolioData";
import { ArrowLeft, CornerDownLeft } from "lucide-react";

interface TerminalEntry {
  id: string;
  type: "command" | "response" | "system" | "error";
  command?: string;
  content: React.ReactNode;
}

const AVAILABLE_COMMANDS = [
  "help",
  "about",
  "identity",
  "projects",
  "clients",
  "skills",
  "experience",
  "work",
  "education",
  "contact",
  "github",
  "linkedin",
  "email",
  "game",
  "clear",
  "history",
  "exit",
  "whoami",
];

export default function DeveloperPage() {
  const router = useRouter();
  const [gameActive, setGameActive] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const terminalBottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const executeRef = useRef<(cmd: string) => void>(() => {});

  // Initial welcome message directly in initial state
  const [entries, setEntries] = useState<TerminalEntry[]>(() => [
    {
      id: "sys-welcome",
      type: "system",
      content: (
        <div className="space-y-1.5 pb-3 border-b border-[#231A36] text-xs">
          <p className="text-[#EDE9FE] font-bold tracking-wide">
            SB-87 TERMINAL // SOHAM BHUNIYA [KOLKATA, IN]
          </p>
          <p className="text-[#948BA8] text-[11px]">
            Full-Stack Software Developer &amp; CSE Student
          </p>
          <p className="text-[#C084FC] text-[11px] pt-1">
            Type{" "}
            <button
              onClick={() => executeRef.current("help")}
              className="underline text-[#A78BFA] hover:text-[#DDD6FE] font-semibold cursor-pointer"
            >
              help
            </button>{" "}
            to view available directives, or run{" "}
            <button
              onClick={() => executeRef.current("projects")}
              className="underline text-[#A78BFA] hover:text-[#DDD6FE] font-semibold cursor-pointer"
            >
              projects
            </button>
            .
          </p>
        </div>
      ),
    },
  ]);

  // Auto-scroll terminal output
  const scrollToBottom = useCallback(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Command Execution Handler
  const handleExecuteCommand = useCallback(
    (cmdRaw: string) => {
      const trimmed = cmdRaw.trim();
      if (!trimmed) return;

      const [command] = trimmed.toLowerCase().split(/\s+/);

      // Add to command history
      setHistory((prev) => [...prev, trimmed]);
      setHistoryIndex(-1);

      // Echo User Command
      const commandEntry: TerminalEntry = {
        id: `cmd-${Date.now()}`,
        type: "command",
        command: trimmed,
        content: null,
      };

      let responseContent: React.ReactNode = null;
      let responseType: TerminalEntry["type"] = "response";

      switch (command) {
        case "help":
          responseContent = (
            <HelpOutput onRunCommand={(cmd) => executeRef.current(cmd)} />
          );
          break;

        case "about":
        case "identity":
          responseContent = <IdentityOutput />;
          break;

        case "projects":
          responseContent = <ProjectsOutput />;
          break;

        case "clients":
          responseContent = <ClientsOutput />;
          break;

        case "skills":
          responseContent = <SkillsOutput />;
          break;

        case "experience":
        case "work":
          responseContent = <ExperienceOutput />;
          break;

        case "education":
          responseContent = (
            <div className="my-2 space-y-1 text-xs">
              <p className="text-[#EDE9FE] font-bold">{PORTFOLIO_DATA.identity.education.degree}</p>
              <p className="text-[#C084FC]">{PORTFOLIO_DATA.identity.education.institution}</p>
              <p className="text-[#948BA8] text-[11px]">
                {PORTFOLIO_DATA.identity.education.gradYear} · {PORTFOLIO_DATA.identity.education.status}
              </p>
            </div>
          );
          break;

        case "contact":
          responseContent = <ContactOutput />;
          break;

        case "github":
          window.open(PORTFOLIO_DATA.contact.github, "_blank", "noopener,noreferrer");
          responseContent = (
            <div className="text-xs text-[#A78BFA]">
              Opening GitHub: {PORTFOLIO_DATA.contact.github}
            </div>
          );
          break;

        case "linkedin":
          window.open(PORTFOLIO_DATA.contact.linkedin, "_blank", "noopener,noreferrer");
          responseContent = (
            <div className="text-xs text-[#A78BFA]">
              Opening LinkedIn: {PORTFOLIO_DATA.contact.linkedin}
            </div>
          );
          break;

        case "email":
          window.location.href = `mailto:${PORTFOLIO_DATA.contact.email}`;
          responseContent = (
            <div className="text-xs text-[#C084FC]">
              Mail client opened for: {PORTFOLIO_DATA.contact.email}
            </div>
          );
          break;

        case "game":
          setGameActive(true);
          return;

        case "clear":
          setEntries([]);
          setInputVal("");
          return;

        case "history":
          responseContent = (
            <div className="my-2 space-y-1 text-xs text-[#948BA8]">
              <p className="text-[#7A7194] text-[11px] uppercase">Command History:</p>
              {history.length > 0 ? (
                history.map((h, i) => (
                  <div key={i}>
                    <span className="text-[#A855F7] mr-2">0{i + 1}.</span> {h}
                  </div>
                ))
              ) : (
                <p>History buffer is empty.</p>
              )}
            </div>
          );
          break;

        case "exit":
          responseContent = (
            <div className="text-xs text-[#C084FC]">
              Returning to Creative Mode...
            </div>
          );
          setTimeout(() => {
            router.push("/");
          }, 400);
          break;

        case "whoami":
          responseContent = (
            <div className="text-xs text-[#C084FC]">
              GUEST_OPERATOR // SOHAM BHUNIYA PORTFOLIO SYSTEM
            </div>
          );
          break;

        default:
          responseType = "error";
          responseContent = (
            <div className="text-xs text-[#E879F9] space-y-0.5">
              <p>Command not found: &ldquo;{command}&rdquo;</p>
              <p className="text-[#948BA8] text-[11px]">
                Type{" "}
                <button
                  onClick={() => executeRef.current("help")}
                  className="underline text-[#A78BFA] hover:text-[#DDD6FE] cursor-pointer"
                >
                  help
                </button>{" "}
                for available commands.
              </p>
            </div>
          );
          break;
      }

      setEntries((prev) => [
        ...prev,
        commandEntry,
        {
          id: `res-${Date.now()}`,
          type: responseType,
          content: responseContent,
        },
      ]);

      setInputVal("");
      setTimeout(scrollToBottom, 50);
    },
    [history, router, scrollToBottom]
  );

  useEffect(() => {
    executeRef.current = handleExecuteCommand;
  }, [handleExecuteCommand]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleExecuteCommand(inputVal);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIdx = historyIndex + 1;
      if (nextIdx < history.length) {
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const current = inputVal.trim().toLowerCase();
      if (!current) return;
      const match = AVAILABLE_COMMANDS.find((c) => c.startsWith(current));
      if (match) {
        setInputVal(match);
      }
    }
  };

  const focusInput = () => {
    if (!gameActive) {
      inputRef.current?.focus();
    }
  };

  return (
    <main
      onClick={focusInput}
      className="relative min-h-screen w-full bg-[#0A0812] text-[#EDE9FE] font-mono selection:bg-[#A855F7] selection:text-black flex flex-col justify-between p-4 sm:p-8 md:p-12 select-text"
    >
      {/* ── MINIMAL TOP BAR ── */}
      <header className="relative z-10 w-full max-w-4xl mx-auto flex items-center justify-between pb-4 border-b border-[#231A36] text-xs select-none">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] shadow-[0_0_8px_rgba(168,85,247,0.8)] animate-pulse" />
          <span className="text-[#948BA8] uppercase tracking-widest text-[11px]">
            SOHAM BHUNIYA // DEVELOPER
          </span>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-[#948BA8] hover:text-[#EDE9FE] text-xs tracking-wider uppercase transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#A855F7]" />
          <span>Creative Mode</span>
        </Link>
      </header>

      {/* ── TERMINAL CONSOLE STAGE ── */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex-1 my-6 flex flex-col justify-between">
        {gameActive ? (
          <SignalLockGame onExit={() => setGameActive(false)} />
        ) : (
          <div className="flex-1 flex flex-col justify-between space-y-4">
            {/* Output Stream */}
            <div data-lenis-prevent className="space-y-4 overflow-y-auto max-h-[68vh] pr-2 overscroll-contain">
              {entries.map((entry) => (
                <div key={entry.id} className="space-y-1">
                  {entry.type === "command" && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[#A855F7] font-bold select-none">&gt;</span>
                      <span className="text-[#C084FC]">{entry.command}</span>
                    </div>
                  )}
                  {entry.content}
                </div>
              ))}
              <div ref={terminalBottomRef} />
            </div>

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-4 border-t border-[#231A36]">
              <span className="text-[#A855F7] font-bold text-xs shrink-0 select-none">&gt;</span>
              <div className="relative flex-1 flex items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                  placeholder="type command (e.g. projects, about, clients, skills)..."
                  className="w-full bg-transparent text-[#EDE9FE] font-mono text-xs focus:outline-none placeholder:text-[#584D6B]"
                  autoFocus
                />
                <span className="w-2 h-3.5 bg-[#A855F7] animate-pulse inline-block ml-0.5 pointer-events-none" />
              </div>
              <button
                type="submit"
                aria-label="Submit Command"
                className="text-[#7A7194] hover:text-[#EDE9FE] transition-colors cursor-pointer"
              >
                <CornerDownLeft className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ── QUIET MINIMAL FOOTER ── */}
      <footer className="relative z-10 w-full max-w-4xl mx-auto pt-4 border-t border-[#231A36] flex items-center justify-between text-[11px] text-[#7A7194] select-none">
        <span>KOLKATA, IN</span>
        <span>SB-87</span>
      </footer>
    </main>
  );
}
