"use client";

import { useEffect, useRef, useState } from "react";

const segments = [
  {
    number: "01",
    title: "User Payment",
    subtitle: "USDC on Base mainnet",
    description: "Users purchase generation credits on aivive.ai using USDC on Base. Privy embedded wallets handle signing seamlessly. Every payment is verifiable on BaseScan.",
    features: [
      "Three tiers: Standard ($0.003), HD ($0.025), Ultra ($0.04+)",
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
    subtitle: "Circle CCTP burn-and-mint",
    description: "When the Base treasury reaches threshold, a Safe multisig (2-of-3) triggers Circle CCTP. USDC is destroyed on Base and minted on Solana in ~15 minutes. No custodial bridge — just native burn-mint primitives.",
    features: [
      "Safe (Gnosis Safe) 2-of-3 multisig on Base",
      "Circle CCTP — no third-party bridge risk",
      "~15 min settlement via Circle attestation",
      "Weekly automated cycle",
      "Fully auditable cross-chain flow",
    ],
    visual: "bridge",
  },
  {
    number: "03",
    title: "Buyback & Burn",
    subtitle: "Permanent on-chain destruction of $AVV",
    description: "USDC arrives on Solana. Squads multisig (2-of-3) executes a Jupiter swap USDC to AVV, then immediately burns the acquired tokens via SPL Token Burn. Supply shrinks permanently.",
    features: [
      "Squads 2-of-3 multisig on Solana",
      "Jupiter aggregator for best swap execution",
      "SPL Token Burn — irreversible destruction",
      "Verifiable on Solscan + Dune Analytics",
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
      <text x="100" y="85" textAnchor="middle" fill="currentColor" className="text-primary" fontSize="12" fontWeight="bold">AVV</text>

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

  return (
    <div
      ref={cardRef}
      className={`group relative transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 py-12 lg:py-20 border-b border-primary/10">
        {/* Number */}
        <div className="shrink-0">
          <span className="font-mono text-sm text-primary">{segment.number}</span>
        </div>

        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-sm text-primary mb-2">{segment.subtitle}</p>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {segment.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {segment.description}
            </p>
            <ul className="space-y-2">
              {segment.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2 text-sm text-foreground/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-48 h-40 text-primary">
              <AnimatedVisual type={segment.visual} />
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
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
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
            <span className="text-muted-foreground">One deflationary cycle.</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            Every dollar spent on AI image generation flows through a verifiable on-chain cycle that permanently reduces $AVV supply. More usage, more burns, more scarcity.
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
