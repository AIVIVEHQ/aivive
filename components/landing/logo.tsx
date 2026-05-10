"use client";

import { useEffect, useRef } from "react";

/**
 * AIVIVE Logo — coded SVG mark (AV ligature with four-point star) + shiny text
 * AV mark: aqua→white→coral gradient stroke
 * Star: animated pulse glow + hover spin
 * Text: gradient with shimmer sweep animation
 */
export function Logo({ size = "default" }: { size?: "sm" | "default" | "lg" }) {
  const h = size === "sm" ? 28 : size === "lg" ? 44 : 34;
  // Unique IDs to avoid SVG gradient conflicts when multiple logos render
  const id = size;

  return (
    <span className="inline-flex items-center gap-1.5 group relative">
      {/* AV Mark with star */}
      <svg
        width={h}
        height={h}
        viewBox="0 0 40 40"
        fill="none"
        className="transition-transform duration-500 group-hover:scale-110"
      >
        <defs>
          <linearGradient id={`av-grad-${id}`} x1="0%" y1="50%" x2="100%" y2="50%">
            <stop offset="0%" stopColor="#4FFFD8" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FF8A5C" />
          </linearGradient>
          <linearGradient id={`star-grad-${id}`} x1="30%" y1="0%" x2="70%" y2="100%">
            <stop offset="0%" stopColor="#4FFFD8" />
            <stop offset="100%" stopColor="#FF8A5C" />
          </linearGradient>
          <filter id={`star-glow-${id}`}>
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* AV letterform — connected A and V */}
        <path
          d="M4 28 L12 12 L16.5 20.5 Q20 27 23.5 20.5 L28 12 L36 28"
          stroke={`url(#av-grad-${id})`}
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Four-point star — pulsing glow */}
        <path
          d="M20 13.5 Q20.8 20 26.5 20 Q20.8 20 20 26.5 Q19.2 20 13.5 20 Q19.2 20 20 13.5 Z"
          fill={`url(#star-grad-${id})`}
          filter={`url(#star-glow-${id})`}
          className="origin-center transition-transform duration-700 group-hover:rotate-90 animate-[star-pulse_3s_ease-in-out_infinite]"
        />
      </svg>
      {/* Text with shimmer sweep */}
      <span className="relative overflow-hidden">
        <span
          className="font-display tracking-tight bg-clip-text text-transparent"
          style={{
            backgroundImage: "linear-gradient(90deg, #4FFFD8 0%, #FFFFFF 40%, #FF8A5C 100%)",
            fontSize: h * 0.52,
          }}
        >
          AIVIVE
        </span>
        {/* Shimmer sweep overlay */}
        <span
          className="absolute inset-0 bg-clip-text text-transparent animate-[shimmer-sweep_4s_ease-in-out_infinite] pointer-events-none"
          style={{
            backgroundImage: "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)",
            backgroundSize: "200% 100%",
            fontSize: h * 0.52,
          }}
          aria-hidden
        >
          AIVIVE
        </span>
      </span>
    </span>
  );
}
