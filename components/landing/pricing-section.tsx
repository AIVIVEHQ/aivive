"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const tokenStats = [
  {
    title: "10B total supply",
    description: "Fixed at deployment. Not mintable, not pausable. Squads 2-of-3 multisig authority.",
  },
  {
    title: "55% to community",
    description: "Ecosystem (30%) + Airdrop (25%). More than half of all tokens go to users and creators.",
  },
  {
    title: "10% team allocation",
    description: "Below industry median (15-20%). 2-month cliff + 10-month linear vesting. Aligned with holders.",
    warm: true,
  },
  {
    title: "No private round",
    description: "No IDO, no early-investor unlock cliffs. Zero sell pressure from venture capital.",
  },
  {
    title: "CertiK audited",
    description: "Smart contract security audit by CertiK. Token authority locked behind multisig.",
  },
  {
    title: "Deflationary by design",
    description: "Every dollar of platform revenue permanently destroys $AVV. More users = more burns = less supply.",
    warm: true,
  },
];

const allocation = [
  { label: "Ecosystem & Community", pct: "30%", color: "bg-primary" },
  { label: "Airdrop / Marketing", pct: "25%", color: "bg-primary/70" },
  { label: "Liquidity", pct: "18%", color: "bg-primary/50" },
  { label: "Team", pct: "10%", color: "bg-primary/35" },
  { label: "Treasury / DAO", pct: "10%", color: "bg-primary/25" },
  { label: "Market Maker", pct: "5%", color: "bg-primary/15" },
  { label: "Advisors", pct: "2%", color: "bg-primary/10" },
];

function StatCard({ item, idx, isVisible }: { item: typeof tokenStats[0]; idx: number; isVisible: boolean }) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--spotlight-x', `${x}%`);
    e.currentTarget.style.setProperty('--spotlight-y', `${y}%`);
  }, []);

  return (
    <div
      className={`relative glass-card p-8 lg:p-10 group hover:-translate-y-1 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${idx * 100}ms` }}
      onMouseMove={handleMouseMove}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
        style={{
          background: 'radial-gradient(300px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), oklch(0.902 0.152 174.5 / 0.08), transparent 60%)',
        }}
      />
      <div className="relative z-10">
        <h3 className="font-display text-xl lg:text-2xl mb-4 group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {item.description}
        </p>
        {'warm' in item && item.warm && (
          <span className="inline-block mt-4 status-dot-amber" />
        )}
      </div>
    </div>
  );
}

export function PricingSection() {
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
    <section id="tokenomics" ref={sectionRef} className="relative py-32 lg:py-40 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <span className="w-8 h-px bg-primary/30" />
            $AVV TOKEN
          </span>
          <h2
            className={`font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Token economics
            <br />
            <span className="text-muted-foreground">designed for deflation</span>
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            $AVV is not a payment token, not a staking token, and not a governance token at launch. It is the deflationary anchor — its sole utility is permanent destruction proportional to platform revenue.
          </p>
        </div>

        {/* Token Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
          {tokenStats.map((item, idx) => (
            <StatCard key={item.title} item={item} idx={idx} isVisible={isVisible} />
          ))}
        </div>

        {/* Allocation Bar */}
        <div
          className={`transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <p className="text-sm font-mono text-muted-foreground mb-4">ALLOCATION</p>
          <div className="flex h-3 rounded-full overflow-hidden gap-0.5 mb-4">
            {allocation.map((item) => (
              <div
                key={item.label}
                className={`${item.color} transition-all duration-1000`}
                style={{ width: item.pct }}
              />
            ))}
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {allocation.map((item) => (
              <span key={item.label} className="text-sm text-muted-foreground">
                <span className={`inline-block w-2 h-2 rounded-full ${item.color} mr-2`} />
                {item.label} {item.pct}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
