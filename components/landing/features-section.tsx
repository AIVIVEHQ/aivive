"use client";

import { useEffect, useRef, useState } from "react";

const layers = [
  {
    number: "01",
    title: "Agent Passport",
    subtitle: "Verifiable identity for autonomous agents",
    description: "Every agent on AIVIVE can carry a programmable passport that defines who it represents, what it can access, what it can spend, and which actions require verification.",
    features: [
      "Issue verifiable agent identities",
      "Set budgets, spending windows, and action scopes",
      "Bind agents to users, teams, apps, or protocols",
      "Revoke access instantly",
      "Track every intent, approval, action, and payment",
    ],
    visual: "passport",
  },
  {
    number: "02",
    title: "Execution Controls",
    subtitle: "Rules before transactions",
    description: "AIVIVE lets users and developers define policies before agents act. Agents can execute within approved boundaries while every sensitive operation remains checkable, auditable, and reversible by design.",
    features: [
      "One-time approval for recurring workflows",
      "Policy-based transaction routing",
      "Risk checks before funds move",
      "Human approval for high-value actions",
      "Full audit trail from intent to settlement",
    ],
    visual: "controls",
  },
  {
    number: "03",
    title: "AIVIVE Network",
    subtitle: "Stablecoin-native settlement for agent transactions",
    description: "AIVIVE is designed for high-frequency, low-cost, machine-speed payments. Agents can settle fees, subscriptions, bounties, API calls, commerce flows, and service payments with stablecoin-native rails.",
    features: [
      "Fast finality for payment flows",
      "Low and predictable transaction costs",
      "Stablecoin-native gas and settlement",
      "EVM-compatible developer experience",
      "Dedicated lanes for agent and application payments",
    ],
    visual: "network",
  },
];

function PassportVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* ID Card */}
      <rect x="40" y="30" width="120" height="100" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary" />
      
      {/* Photo placeholder */}
      <rect x="55" y="50" width="40" height="50" rx="4" fill="currentColor" opacity="0.2" className="text-primary">
        <animate attributeName="opacity" values="0.2;0.4;0.2" dur="2s" repeatCount="indefinite" />
      </rect>
      
      {/* Info lines */}
      {[0, 1, 2].map((i) => (
        <rect
          key={i}
          x="105"
          y={55 + i * 15}
          width="45"
          height="8"
          rx="2"
          fill="currentColor"
          opacity="0.15"
          className="text-primary"
        >
          <animate
            attributeName="width"
            values="20;45;20"
            dur="2s"
            begin={`${i * 0.2}s`}
            repeatCount="indefinite"
          />
        </rect>
      ))}
      
      {/* Verification badge */}
      <circle cx="145" cy="115" r="10" fill="currentColor" className="text-primary">
        <animate attributeName="r" values="10;12;10" dur="1.5s" repeatCount="indefinite" />
      </circle>
      <path d="M141 115 L144 118 L149 112" stroke="currentColor" strokeWidth="2" fill="none" className="text-background" />
    </svg>
  );
}

function ControlsVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Policy gates */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect
            x={50 + i * 40}
            y="40"
            width="30"
            height="80"
            rx="4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-primary"
          />
          <circle
            cx={65 + i * 40}
            cy="80"
            r="8"
            fill="currentColor"
            className="text-primary"
          >
            <animate
              attributeName="opacity"
              values="0.3;1;0.3"
              dur="2s"
              begin={`${i * 0.3}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
      
      {/* Flow arrows */}
      <path
        d="M45 80 L50 80 M80 80 L90 80 M120 80 L130 80 M160 80 L170 80"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="4 4"
        className="text-primary"
      >
        <animate attributeName="stroke-dashoffset" values="0;-8" dur="0.5s" repeatCount="indefinite" />
      </path>
    </svg>
  );
}

function NetworkVisual() {
  return (
    <svg viewBox="0 0 200 160" className="w-full h-full">
      {/* Central payment rail */}
      <line x1="20" y1="80" x2="180" y2="80" stroke="currentColor" strokeWidth="3" className="text-primary" />
      
      {/* Pulse along rail */}
      <circle r="6" fill="currentColor" className="text-primary">
        <animateMotion dur="2.4s" repeatCount="indefinite">
          <mpath href="#railPath" />
        </animateMotion>
        <animate attributeName="opacity" values="1;0.5;1" dur="2.4s" repeatCount="indefinite" />
      </circle>
      <path id="railPath" d="M 20 80 L 180 80" fill="none" />
      
      {/* Network nodes */}
      {[40, 80, 120, 160].map((x, i) => (
        <g key={i}>
          <circle cx={x} cy="80" r="4" fill="currentColor" className="text-primary" />
          <line x1={x} y1="50" x2={x} y2="76" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.5" />
          <line x1={x} y1="84" x2={x} y2="110" stroke="currentColor" strokeWidth="1" className="text-primary" opacity="0.5" />
          <circle cx={x} cy="45" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
            <animate attributeName="r" values="6;8;6" dur="2s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <circle cx={x} cy="115" r="6" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-primary">
            <animate attributeName="r" values="6;8;6" dur="2s" begin={`${i * 0.3 + 0.15}s`} repeatCount="indefinite" />
          </circle>
        </g>
      ))}
    </svg>
  );
}

function AnimatedVisual({ type }: { type: string }) {
  switch (type) {
    case "passport":
      return <PassportVisual />;
    case "controls":
      return <ControlsVisual />;
    case "network":
      return <NetworkVisual />;
    default:
      return <PassportVisual />;
  }
}

function LayerCard({ layer, index }: { layer: typeof layers[0]; index: number }) {
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
          <span className="font-mono text-sm text-primary">{layer.number}</span>
        </div>
        
        {/* Content */}
        <div className="flex-1 grid lg:grid-cols-2 gap-8 items-start">
          <div>
            <p className="text-sm text-primary mb-2">{layer.subtitle}</p>
            <h3 className="text-3xl lg:text-4xl font-display mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {layer.title}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              {layer.description}
            </p>
            <ul className="space-y-2">
              {layer.features.map((feature) => (
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
              <AnimatedVisual type={layer.visual} />
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
      id="agent-layer"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <span className="w-8 h-px bg-primary/30" />
            HOW AIVIVE WORKS
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Three layers.
            <br />
            <span className="text-muted-foreground">One execution network.</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            AIVIVE connects agent identity, permissioned execution, and payment settlement into a single crypto-native system.
          </p>
        </div>

        {/* Layers List */}
        <div>
          {layers.map((layer, index) => (
            <LayerCard key={layer.number} layer={layer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
