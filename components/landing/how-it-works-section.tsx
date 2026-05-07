"use client";

import { useEffect, useRef, useState } from "react";

const useCases = [
  {
    number: "01",
    title: "Agentic Payments",
    description: "Let agents pay for APIs, data, compute, subscriptions, and services without asking users to sign every transaction.",
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
  },
];

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
      className="relative py-24 lg:py-32 bg-card overflow-hidden"
    >
      {/* Subtle pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 40px,
            currentColor 40px,
            currentColor 41px
          )`
        }} />
      </div>

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
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.number}
              className={`bg-card p-8 lg:p-10 group hover:bg-primary/5 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="font-mono text-sm text-primary mb-4 block">{useCase.number}</span>
              <h3 className="text-xl lg:text-2xl font-display mb-4 group-hover:text-primary transition-colors">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
