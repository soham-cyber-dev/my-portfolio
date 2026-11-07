"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { sound } from "../utils/audio";
import { ArrowLeft, RefreshCw, Zap, Trophy, Timer } from "lucide-react";

interface SignalLockGameProps {
  onExit: () => void;
}

export default function SignalLockGame({ onExit }: SignalLockGameProps) {
  const [level, setLevel] = useState(1);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [gameOver, setGameOver] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  // Generate target wave helper
  const generateTarget = useCallback((lvl: number) => {
    const freq = parseFloat((1.2 + Math.random() * (2.0 + lvl * 0.5)).toFixed(2));
    const amp = Math.round(20 + Math.random() * 25);
    return { freq, amp };
  }, []);

  // Target wave state initialized directly
  const [target, setTarget] = useState(() => {
    const freq = parseFloat((1.2 + Math.random() * 2.5).toFixed(2));
    const amp = Math.round(20 + Math.random() * 25);
    return { freq, amp };
  });

  const targetFreq = target.freq;
  const targetAmp = target.amp;

  // User player wave parameters
  const [userFreq, setUserFreq] = useState(1.0);
  const [userAmp, setUserAmp] = useState(20);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);

  // Generate new wave target
  const nextTarget = useCallback((lvl: number) => {
    setTarget(generateTarget(lvl));
    setIsLocked(false);
  }, [generateTarget]);

  // Timer countdown
  useEffect(() => {
    if (gameOver) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          sound.playError();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameOver]);

  // Compute accuracy match (0 to 100%)
  const freqDiff = Math.abs(userFreq - targetFreq);
  const ampDiff = Math.abs(userAmp - targetAmp);
  const freqMatch = Math.max(0, 100 - freqDiff * 50);
  const ampMatch = Math.max(0, 100 - ampDiff * 2.5);
  const totalMatch = Math.round((freqMatch * 0.7 + ampMatch * 0.3));
  const isAligned = totalMatch >= 88;

  // Attempt signal lock
  const handleLockAttempt = useCallback(() => {
    if (gameOver) return;
    if (isAligned) {
      sound.playLockChime();
      setIsLocked(true);
      const points = 100 * level + totalMatch * 2 + streak * 50;
      setScore((s) => s + points);
      setStreak((st) => st + 1);
      setTimeLeft((t) => Math.min(60, t + 6)); // bonus time

      setTimeout(() => {
        const nextLvl = level + 1;
        setLevel(nextLvl);
        nextTarget(nextLvl);
      }, 700);
    } else {
      sound.playError();
      setStreak(0);
    }
  }, [gameOver, isAligned, level, totalMatch, streak, nextTarget]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameOver) return;
      if (e.key === "ArrowLeft" || e.key === "a") {
        e.preventDefault();
        setUserFreq((f) => parseFloat(Math.max(0.5, f - 0.1).toFixed(2)));
        sound.playKeyClick();
      } else if (e.key === "ArrowRight" || e.key === "d") {
        e.preventDefault();
        setUserFreq((f) => parseFloat(Math.min(5.0, f + 0.1).toFixed(2)));
        sound.playKeyClick();
      } else if (e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        setUserAmp((a) => Math.min(50, a + 2));
        sound.playKeyClick();
      } else if (e.key === "ArrowDown" || e.key === "s") {
        e.preventDefault();
        setUserAmp((a) => Math.max(10, a - 2));
        sound.playKeyClick();
      } else if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        handleLockAttempt();
      } else if (e.key === "Escape") {
        onExit();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameOver, handleLockAttempt, onExit]);

  // Render Dual Oscilloscope
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let running = true;

    const render = () => {
      if (!running) return;
      animId = requestAnimationFrame(render);
      phaseRef.current += 0.05;

      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      ctx.fillStyle = "rgba(10, 8, 18, 0.4)";
      ctx.fillRect(0, 0, w, h);

      // Grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(168, 85, 247, 0.12)";
      for (let i = 1; i < 8; i++) {
        const x = (w / 8) * i;
        ctx.beginPath();
        ctx.setLineDash([2, 4]);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let j = 1; j < 6; j++) {
        const y = (h / 6) * j;
        ctx.beginPath();
        ctx.setLineDash([2, 4]);
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Center baseline
      ctx.strokeStyle = "rgba(192, 132, 252, 0.18)";
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.stroke();

      // 1. Draw Target Wave (Soft Lilac / Lavender)
      ctx.lineWidth = 2;
      ctx.strokeStyle = isLocked ? "#DDD6FE" : "#C084FC";
      ctx.shadowBlur = 6;
      ctx.shadowColor = ctx.strokeStyle;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const nx = x / w;
        const y = midY + Math.sin(nx * Math.PI * 4 * targetFreq + phaseRef.current) * targetAmp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // 2. Draw Player Wave (Vivid Electric Violet)
      ctx.lineWidth = 2;
      ctx.strokeStyle = isAligned ? "#EDE9FE" : "#A855F7";
      ctx.shadowColor = ctx.strokeStyle;
      ctx.beginPath();
      for (let x = 0; x <= w; x += 2) {
        const nx = x / w;
        const y = midY + Math.sin(nx * Math.PI * 4 * userFreq + phaseRef.current) * userAmp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      ctx.shadowBlur = 0;
    };

    render();
    return () => {
      running = false;
      cancelAnimationFrame(animId);
    };
  }, [targetFreq, targetAmp, userFreq, userAmp, isAligned, isLocked]);

  const restartGame = () => {
    setLevel(1);
    setScore(0);
    setTimeLeft(45);
    setGameOver(false);
    setStreak(0);
    nextTarget(1);
  };

  return (
    <div className="w-full max-w-2xl mx-auto rounded-sm border border-[#231A36] bg-[#0D0B14] text-[#EDE9FE] p-4 sm:p-6 font-mono select-none shadow-2xl relative overflow-hidden">
      {/* Decorative mechanical corner rivets */}
      <div className="absolute top-2 left-2 text-[10px] text-[#584D6B]">+</div>
      <div className="absolute top-2 right-2 text-[10px] text-[#584D6B]">+</div>
      <div className="absolute bottom-2 left-2 text-[10px] text-[#584D6B]">+</div>
      <div className="absolute bottom-2 right-2 text-[10px] text-[#584D6B]">+</div>

      {/* Header bar */}
      <div className="flex items-center justify-between pb-3 border-b border-[#231A36] mb-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#A855F7]" />
          <span className="text-xs font-bold tracking-widest text-[#EDE9FE] uppercase">
            SIGNAL LOCK // ANALOG CALIBRATION
          </span>
        </div>

        <button
          onClick={onExit}
          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#161222] border border-[#2D2342] hover:border-[#A855F7] text-xs text-[#948BA8] hover:text-[#EDE9FE] transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3 h-3" />
          <span>EXIT TO CLI</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-4 gap-2 mb-4 text-center">
        <div className="p-2 rounded-sm bg-[#08060D] border border-[#231A36]">
          <span className="text-[9px] text-[#7A7194] uppercase block">LEVEL</span>
          <span className="text-base font-bold text-[#A855F7]">0{level}</span>
        </div>
        <div className="p-2 rounded-sm bg-[#08060D] border border-[#231A36]">
          <span className="text-[9px] text-[#7A7194] uppercase block flex items-center justify-center gap-1">
            <Trophy className="w-2.5 h-2.5 text-[#C084FC]" /> SCORE
          </span>
          <span className="text-base font-bold text-[#C084FC]">{score}</span>
        </div>
        <div className="p-2 rounded-sm bg-[#08060D] border border-[#231A36]">
          <span className="text-[9px] text-[#7A7194] uppercase block flex items-center justify-center gap-1">
            <Timer className="w-2.5 h-2.5 text-[#A78BFA]" /> TIME
          </span>
          <span className={`text-base font-bold ${timeLeft <= 10 ? "text-fuchsia-400 animate-pulse" : "text-[#A78BFA]"}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="p-2 rounded-sm bg-[#08060D] border border-[#231A36]">
          <span className="text-[9px] text-[#7A7194] uppercase block">MATCH</span>
          <span className={`text-base font-bold ${isAligned ? "text-[#DDD6FE]" : "text-[#7A7194]"}`}>
            {totalMatch}%
          </span>
        </div>
      </div>

      {/* Dual Waveform Canvas */}
      <div className="relative rounded-sm border border-[#231A36] overflow-hidden mb-4 bg-[#08060D]">
        <div className="absolute top-2 left-2 z-10 text-[9px] tracking-wider text-[#C084FC]">
          ■ CARRIER: {targetFreq.toFixed(2)} kHz / {targetAmp} mV
        </div>
        <div className="absolute top-2 right-2 z-10 text-[9px] tracking-wider text-[#A78BFA]">
          ▲ TUNER: {userFreq.toFixed(2)} kHz / {userAmp} mV
        </div>

        <canvas ref={canvasRef} width={600} height={180} className="w-full h-44 block" />

        {/* Status banner */}
        <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px]">
          <span className={isAligned ? "text-[#DDD6FE] font-bold animate-pulse" : "text-[#7A7194]"}>
            {isAligned ? "● HARMONIC LOCK ACHIEVED — PRESS [LOCK]" : "○ TUNING SIGNAL..."}
          </span>
          <span className="text-[#948BA8]">STREAK: x{streak}</span>
        </div>
      </div>

      {/* Interactive Controls & Key Legend */}
      {!gameOver ? (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            {/* Frequency tuning buttons */}
            <button
              onClick={() => {
                setUserFreq((f) => parseFloat(Math.max(0.5, f - 0.1).toFixed(2)));
                sound.playKeyClick();
              }}
              className="p-2 rounded-sm bg-[#161222] border border-[#231A36] hover:border-[#584D6B] active:scale-95 text-center text-[#948BA8] hover:text-[#EDE9FE]"
            >
              FREQ − [←/A]
            </button>

            <button
              onClick={() => {
                setUserFreq((f) => parseFloat(Math.min(5.0, f + 0.1).toFixed(2)));
                sound.playKeyClick();
              }}
              className="p-2 rounded-sm bg-[#161222] border border-[#231A36] hover:border-[#584D6B] active:scale-95 text-center text-[#948BA8] hover:text-[#EDE9FE]"
            >
              FREQ + [→/D]
            </button>

            {/* Amplitude tuning buttons */}
            <button
              onClick={() => {
                setUserAmp((a) => Math.max(10, a - 2));
                sound.playKeyClick();
              }}
              className="p-2 rounded-sm bg-[#161222] border border-[#231A36] hover:border-[#584D6B] active:scale-95 text-center text-[#948BA8] hover:text-[#EDE9FE]"
            >
              AMP − [↓/S]
            </button>

            <button
              onClick={() => {
                setUserAmp((a) => Math.min(50, a + 2));
                sound.playKeyClick();
              }}
              className="p-2 rounded-sm bg-[#161222] border border-[#231A36] hover:border-[#584D6B] active:scale-95 text-center text-[#948BA8] hover:text-[#EDE9FE]"
            >
              AMP + [↑/W]
            </button>
          </div>

          {/* Primary Lock Signal Button */}
          <button
            onClick={handleLockAttempt}
            disabled={!isAligned}
            className={`w-full py-3 rounded-sm font-bold text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer ${
              isAligned
                ? "bg-[#A855F7] text-black shadow-[0_0_20px_rgba(168,85,247,0.5)] active:scale-98"
                : "bg-[#161222] text-[#584D6B] border border-[#231A36] cursor-not-allowed opacity-60"
            }`}
          >
            {isAligned ? "LOCK SIGNAL [SPACE / ENTER]" : "TUNE WAVEFORM TO MATCH (≥ 88%)"}
          </button>
        </div>
      ) : (
        /* Game Over Screen */
        <div className="p-6 rounded-sm bg-[#08060D]/95 border border-[#A855F7] text-center space-y-4 animate-in fade-in">
          <p className="text-xs text-[#C084FC] tracking-widest font-bold">CARRIER SIGNAL LOST // SESSION TERMINATED</p>
          <div className="text-2xl font-bold text-[#EDE9FE]">FINAL SCORE: {score}</div>
          <p className="text-xs text-[#948BA8]">MAX LEVEL REACHED: 0{level}</p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={restartGame}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-[#A855F7] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#C084FC] cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>RESTART CALIBRATION</span>
            </button>

            <button
              onClick={onExit}
              className="px-5 py-2.5 rounded-sm bg-[#161222] border border-[#2D2342] hover:border-[#EDE9FE] text-xs text-[#EDE9FE] uppercase tracking-wider cursor-pointer"
            >
              RETURN TO TERMINAL
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

