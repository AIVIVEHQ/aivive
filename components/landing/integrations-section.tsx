"use client";

import { useEffect, useState, useRef, useCallback } from "react";

const ecosystemCategories = [
  { name: "Agent Frameworks", examples: "AutoGPT, LangChain, CrewAI" },
  { name: "Wallets", examples: "MetaMask, Rainbow, Safe" },
  { name: "Stablecoin Issuers", examples: "Circle, Tether, MakerDAO" },
  { name: "Payment Providers", examples: "Stripe, Coinbase, MoonPay" },
  { name: "Data Networks", examples: "The Graph, Chainlink, Pyth" },
  { name: "DeFi Protocols", examples: "Uniswap, Aave, Compound" },
  { name: "AI Infrastructure", examples: "OpenAI, Anthropic, Replicate", warm: true },
  { name: "Developer Platforms", examples: "Vercel, Railway, Alchemy" },
];

function EcoCard({ category, index, isVisible }: { category: typeof ecosystemCategories[0]; index: number; isVisible: boolean }) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--spotlight-x', `${x}%`);
    e.currentTarget.style.setProperty('--spotlight-y', `${y}%`);
  }, []);

  return (
    <div
      className={`relative glass-card p-6 lg:p-8 group hover:-translate-y-1 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 75}ms` }}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
        style={{
          background: `radial-gradient(250px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${
            'warm' in category && category.warm
              ? 'oklch(0.870 0.130 85 / 0.06)'
              : 'oklch(0.902 0.152 174.5 / 0.08)'
          }, transparent 60%)`,
        }}
      />
      <div className="relative z-10">
        <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
          {category.name}
        </h3>
        <p className="text-sm text-muted-foreground">
          {category.examples}
        </p>
      </div>
    </div>
  );
}

export function IntegrationsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

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
    <section id="ecosystem" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`max-w-3xl mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <span className="w-8 h-px bg-primary/30" />
            ECOSYSTEM
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            For builders, agents,
            <br />
            <span className="text-muted-foreground">wallets, and payment networks</span>
          </h2>
          <p className="text-xl text-muted-foreground">
            AIVIVE is designed to become a coordination layer for the agent economy, connecting crypto applications, AI tools, payment providers, DeFi protocols, and infrastructure networks.
          </p>
        </div>

        {/* Ecosystem Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {ecosystemCategories.map((category, index) => (
            <EcoCard key={category.name} category={category} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
