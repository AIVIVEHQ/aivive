"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const segments = [
  {
    number: "01",
    title: "User Payment",
    subtitle: "USDC on Base mainnet",
    description: "Users purchase generation credits on aivive.ai using USDC on Base. Privy embedded wallets handle signing seamlessly. Every payment is publicly verifiable on-chain.",
    features: [
      "Three tiers: Standard, HD, Ultra",
      "Pay with USDC — no volatile gas token",
      "Privy dual-chain embedded wallet",
      "Instant credit ledger (double-entry, append-only)",
      "Transparent pricing, no hidden fees",
    ],
    visual: "payment",
  },
  {
    number: "02",
    title: "Cross-Chain Bridge",
    subtitle: "Cross-chain settlement",
    description: "When the Base treasury reaches threshold, a multisig-governed treasury triggers cross-chain settlement. USDC moves from Base to Solana in ~15 minutes. No custodial bridge — just native settlement primitives.",
    features: [
      "Multisig-governed treasury on Base",
      "Native settlement — no third-party bridge risk",
      "~15 min settlement window",
      "Weekly automated cycle",
      "Fully verifiable cross-chain flow",
    ],
    visual: "bridge",
  },
  {
    number: "03",
    title: "Buyback & Burn",
    subtitle: "Permanent on-chain destruction of the network asset",
    description: "USDC arrives on Solana. The treasury executes a swap into the network's asset, then immediately burns the acquired tokens via on-chain token burn. Supply shrinks permanently.",
    features: [
      "Multisig-controlled treasury on Solana",
      "Aggregator-routed best execution",
      "On-chain token burn — irreversible destruction",
      "Verifiable on-chain at every step",
      "Public dashboard at aivive.ai/burn",
    ],
    visual: "burn",
  },
];

function PaymentVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* USDC coin */}
      <circle cx="100" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <text x="100" y="65" textAnchor="middle" fill="currentColor" className="text-primary" fontSize="16" fontWeight="bold">$</text>
      <circle cx="100" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" opacity="0.3">
        <animate attributeName="r" values="30;38;30" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.3;0;0.3" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Arrow down */}
      <line x1="100" y1="95" x2="100" y2="125" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <path d="M94 119 L100 127 L106 119" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />

      {/* Base label */}
      <rect x="70" y="130" width="60" height="20" rx="4" fill="currentColor" opacity="0.15" className="text-primary" />
      <text x="100" y="144" textAnchor="middle" fill="currentColor" className="text-primary" fontSize="10">Base</text>
    </svg>
  );
}

function BridgeVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Left chain - Base */}
      <rect x="20" y="55" width="50" height="50" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <text x="45" y="84" textAnchor="middle" fill="currentColor" className="text-primary" fontSize="10">Base</text>

      {/* Right chain - Solana */}
      <rect x="130" y="55" width="50" height="50" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      <text x="155" y="84" textAnchor="middle" fill="currentColor" className="text-primary" fontSize="10">Solana</text>

      {/* CCTP bridge arrow */}
      <path
        d="M75 80 L125 80"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="6 4"
        className="text-primary"
      >
        <animate attributeName="stroke-dashoffset" values="0;-10" dur="0.8s" repeatCount="indefinite" />
      </path>
      <path d="M119 74 L127 80 L119 86" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />

      {/* CCTP label */}
      <text x="100" y="70" textAnchor="middle" fill="currentColor" className="text-primary" fontSize="8" opacity="0.7">CCTP</text>

      {/* Burn icon on left */}
      <circle cx="45" cy="45" r="6" fill="currentColor" className="text-coral" opacity="0.6">
        <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" />
      </circle>

      {/* Mint icon on right */}
      <circle cx="155" cy="45" r="6" fill="currentColor" className="text-primary" opacity="0.6">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="2s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
}

function BurnVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Token shrinking animation */}
      <circle cx="100" cy="80" r="25" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
        <animate attributeName="r" values="25;18;25" dur="3s" repeatCount="indefinite" />
      </circle>
      <text x="100" y="85" textAnchor="middle" fill="currentColor" className="text-primary" fontSize="11" fontWeight="bold">TOKEN</text>

      {/* Burn particles flying outward */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = Math.round((100 + Math.cos(rad) * 30) * 100) / 100;
        const y1 = Math.round((80 + Math.sin(rad) * 30) * 100) / 100;
        const x2 = Math.round((100 + Math.cos(rad) * 50) * 100) / 100;
        const y2 = Math.round((80 + Math.sin(rad) * 50) * 100) / 100;
        return (
          <circle key={i} r="2" fill="currentColor" className="text-primary">
            <animate attributeName="cx" values={`${x1};${x2}`} dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="cy" values={`${y1};${y2}`} dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.8;0" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
        );
      })}

      {/* Supply shrinking label */}
      <text x="100" y="140" textAnchor="middle" fill="currentColor" className="text-primary" fontSize="9" opacity="0.5">supply shrinks</text>
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "payment":
      return <PaymentVisual />;
    case "bridge":
      return <BridgeVisual />;
    case "burn":
      return <BurnVisual />;
    default:
      return <PaymentVisual />;
  }
}

function SegmentCard({ segment, index }: { segment: typeof segments[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = innerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Spotlight position
    el.style.setProperty('--mouse-x', `${x * 100}%`);
    el.style.setProperty('--mouse-y', `${y * 100}%`);
    // 3D tilt
    const tiltX = (y - 0.5) * -8;
    const tiltY = (x - 0.5) * 8;
    el.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const el = innerRef.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  }, []);

  const accentColor = index === 2 ? 'oklch(0.753 0.155 41.6' : 'oklch(0.902 0.152 174.5';

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div
        ref={innerRef}
        className="relative rounded-xl p-8 lg:p-10 mb-4 overflow-hidden transition-all duration-300 ease-out"
        style={{
          background: 'linear-gradient(135deg, oklch(0.241 0.015 174.7 / 0.6), oklch(0.199 0.015 172.2 / 0.4))',
          backdropFilter: 'blur(12px)',
          border: `1px solid ${accentColor} / 0.1)`,
          willChange: 'transform',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Animated gradient border on hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
          style={{
            padding: '1px',
            background: `conic-gradient(from var(--border-angle, 0deg), ${accentColor} / 0.4), transparent 25%, ${accentColor} / 0.15) 50%, transparent 75%, ${accentColor} / 0.4))`,
            mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
            maskComposite: 'exclude',
            animation: 'spin-border 3s linear infinite',
          }}
        />

        {/* Mouse-tracking spotlight */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-[inherit]"
          style={{
            background: `radial-gradient(400px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${accentColor} / 0.12), transparent 50%)`,
          }}
        />

        {/* Ambient glow behind card on hover */}
        <div
          className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none -z-10 rounded-2xl"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${accentColor} / 0.08), transparent 70%)`,
            filter: 'blur(30px)',
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:gap-16">
          {/* Number — large, glowing on hover */}
          <div className="shrink-0">
            <span
              className="font-display text-4xl lg:text-5xl transition-all duration-500 group-hover:scale-110 inline-block"
              style={{
                color: `${accentColor} / 0.15)`,
                textShadow: 'none',
              }}
            >
              {segment.number}
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <p className={`text-sm mb-2 transition-colors duration-300 select-none`} style={{ color: `${accentColor})` }}>{segment.subtitle}</p>
              <h3
                className={`text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-all duration-500 select-none ${index === 2 ? 'group-hover:text-coral' : 'group-hover:text-primary'}`}
              >
                {segment.title}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6 select-none">
                {segment.description}
              </p>
              <ul className="space-y-2">
                {segment.features.map((feature, fi) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-foreground/80 transition-all duration-300 group-hover:translate-x-1"
                    style={{ transitionDelay: `${fi * 50}ms` }}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0 group-hover:scale-150 transition-transform duration-300" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Visual — scales up on hover */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-48 h-40 text-primary transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_oklch(0.902_0.152_174.5/0.3)]">
                <AnimatedVisual type={segment.visual} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="protocol"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Warm ambient glow */}
      <div
        className="absolute top-1/3 -right-20 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.753 0.155 41.6 / 0.06), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.870 0.130 85 / 0.05), transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <span className="w-8 h-px bg-primary/30" />
            THE RECURSIVE LOOP
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Three segments.
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, oklch(0.513 0.015 179), oklch(0.753 0.155 41.6))' }}>One deflationary cycle.</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            A programmable share of revenue flows through a verifiable on-chain cycle that permanently shrinks token supply. More usage, more burns, more scarcity.
          </p>
        </div>

        {/* Segments List */}
        <div>
          {segments.map((segment, index) => (
            <SegmentCard key={segment.number} segment={segment} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
