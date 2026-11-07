"use client";

import React, { useEffect, useRef } from "react";

interface OscilloscopeProps {
  frequency?: number;
  amplitude?: number;
  color?: string;
  gridColor?: string;
  interactive?: boolean;
  className?: string;
  label?: string;
}

export default function Oscilloscope({
  frequency = 2.4,
  amplitude = 22,
  color = "#A855F7", // Electric Violet
  gridColor = "rgba(168, 85, 247, 0.15)", // Muted Violet Grid
  interactive = true,
  className = "",
  label = "CH-1 // 4.87 MHz",
}: OscilloscopeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);
  const freqRef = useRef(frequency);
  const targetFreqRef = useRef(frequency);

  useEffect(() => {
    targetFreqRef.current = frequency;
  }, [frequency]);

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

      // Smooth frequency transition
      freqRef.current += (targetFreqRef.current - freqRef.current) * 0.08;
      phaseRef.current += 0.045 * freqRef.current;

      const w = canvas.width;
      const h = canvas.height;
      const midY = h / 2;

      // Deep dark ink background with subtle persistence glow
      ctx.fillStyle = "rgba(18, 19, 26, 0.45)";
      ctx.fillRect(0, 0, w, h);

      // Draw Oscilloscope Reticle Grid
      ctx.lineWidth = 1;
      ctx.strokeStyle = gridColor;

      // Vertical divisions
      const vDivs = 8;
      for (let i = 1; i < vDivs; i++) {
        const x = (w / vDivs) * i;
        ctx.beginPath();
        ctx.setLineDash([2, 4]);
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }

      // Horizontal divisions
      const hDivs = 6;
      for (let j = 1; j < hDivs; j++) {
        const y = (h / hDivs) * j;
        ctx.beginPath();
        ctx.setLineDash([2, 4]);
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
      ctx.setLineDash([]);

      // Center crosshairs
      ctx.strokeStyle = "rgba(233, 225, 204, 0.15)";
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(w, midY);
      ctx.moveTo(w / 2, 0);
      ctx.lineTo(w / 2, h);
      ctx.stroke();

      // Draw Analog Phosphor Waveform
      ctx.lineWidth = 2;
      ctx.strokeStyle = color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = color;

      ctx.beginPath();
      const step = 2;
      for (let x = 0; x <= w; x += step) {
        const normX = x / w;
        // Dual harmonic wave with subtle noise jitter
        const primary = Math.sin(normX * Math.PI * 4 * freqRef.current + phaseRef.current);
        const harmonic = Math.sin(normX * Math.PI * 8 * freqRef.current - phaseRef.current * 1.5) * 0.25;
        const jitter = (Math.random() - 0.5) * 1.2;
        const y = midY + (primary + harmonic) * amplitude + jitter;

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      // Reset shadow for performance
      ctx.shadowBlur = 0;
    };

    render();

    return () => {
      running = false;
      cancelAnimationFrame(animId);
    };
  }, [amplitude, color, gridColor]);

  const handlePointer = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!interactive || !canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width;
    targetFreqRef.current = 0.8 + nx * 5.0;
  };

  return (
    <div className={`relative overflow-hidden rounded-sm border border-[#231A36] bg-[#0D0B14] select-none ${className}`}>
      {/* Scope Calibration Corner Labels */}
      <div className="absolute top-1.5 left-2 z-10 flex items-center gap-1.5 text-[9px] font-mono tracking-widest text-[#7A7194]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#A855F7] animate-pulse" />
        <span>{label}</span>
      </div>
      <div className="absolute top-1.5 right-2 z-10 text-[9px] font-mono tracking-widest text-[#C084FC]">
        {(frequency * 1.2).toFixed(2)} kHz
      </div>

      <canvas
        ref={canvasRef}
        width={320}
        height={130}
        onPointerMove={handlePointer}
        className="w-full h-full block cursor-crosshair"
      />

      {/* Screen Glare & Phosphor Scanline Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_50%,rgba(0,0,0,0.3)_50%)] bg-[length:100%_4px]" />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/[0.05]" />
    </div>
  );
}

