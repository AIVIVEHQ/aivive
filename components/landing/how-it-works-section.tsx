"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const useCases = [
  {
    number: "01",
    title: "Agentic Payments",
    description: "Let agents pay for APIs, data, compute, subscriptions, and services without asking users to sign every transaction.",
    warm: true,
  },
  {
    number: "02",
    title: "Autonomous Trading Operations",
    description: "Give trading agents scoped permissions, budget limits, and verifiable execution records.",
  },
  {
    number: "03",
    title: "Onchain Commerce",
    description: "Enable AI shoppers, merchant agents, and service bots to coordinate orders, invoices, payments, and settlement.",
  },
  {
    number: "04",
    title: "DAO & Treasury Automation",
    description: "Automate recurring treasury actions while preserving governance, auditability, and spending controls.",
  },
  {
    number: "05",
    title: "DeFi Workflow Execution",
    description: "Connect agents to DeFi protocols with policy-based access, transaction previews, and risk constraints.",
  },
  {
    number: "06",
    title: "Machine-to-Machine Settlement",
    description: "Support microtransactions between agents, apps, models, infrastructure providers, and data networks.",
    warm: true,
  },
];

function UseCaseCard({ useCase, index, isVisible }: { useCase: typeof useCases[0]; index: number; isVisible: boolean }) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--spotlight-x', `${x}%`);
    e.currentTarget.style.setProperty('--spotlight-y', `${y}%`);
  }, []);

  return (
    <div
      className={`relative glass-card p-8 lg:p-10 group transition-all duration-500 hover:-translate-y-1 ${
        'warm' in useCase && useCase.warm ? 'border-t-2 border-t-amber/20' : ''
      } ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
        style={{
          background: 'radial-gradient(300px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), oklch(0.902 0.152 174.5 / 0.08), transparent 60%)',
        }}
      />
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="font-mono text-sm text-primary">{useCase.number}</span>
          {'warm' in useCase && useCase.warm && (
            <span className="status-dot-amber" />
          )}
        </div>
        <h3 className="text-xl lg:text-2xl font-display mb-4 group-hover:text-primary transition-colors">
          {useCase.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {useCase.description}
        </p>
      </div>
    </div>
  );
}

export function HowItWorksSection() {
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
      id="payments"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Subtle warm halo */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.753 0.155 41.6 / 0.03), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <span className="w-8 h-px bg-primary/30" />
            USE CASES
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Built for agentic
            <br />
            <span className="text-muted-foreground">crypto workflows</span>
          </h2>
        </div>

        {/* Use Cases Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {useCases.map((useCase, index) => (
            <UseCaseCard key={useCase.number} useCase={useCase} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
