"use client";

import { useEffect, useRef, useState } from "react";

const differentiators = [
  {
    title: "Verifiable by default",
    description: "Every agent action can be linked to identity, policy, approval, execution, and settlement.",
  },
  {
    title: "Permissioned, not custodial",
    description: "Agents operate within rules you define. Access can be limited, monitored, and revoked.",
  },
  {
    title: "Stablecoin-native",
    description: "Designed around predictable, programmable, real-world payments rather than volatile gas UX.",
  },
  {
    title: "Built for machine speed",
    description: "Low-cost transactions and fast settlement make high-frequency agent workflows practical.",
  },
  {
    title: "Human override",
    description: "Keep sensitive actions under human review while allowing routine operations to run automatically.",
  },
  {
    title: "Crypto-native interoperability",
    description: "EVM compatibility makes AIVIVE easy to connect with wallets, protocols, and existing infrastructure.",
  },
];

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
    <section id="network" ref={sectionRef} className="relative py-32 lg:py-40 border-t border-primary/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-20">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <span className="w-8 h-px bg-primary/30" />
            WHY IT MATTERS
          </span>
          <h2
            className={`font-display text-5xl md:text-6xl lg:text-7xl tracking-tight mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Trust infrastructure
            <br />
            <span className="text-muted-foreground">for autonomous value movement</span>
          </h2>
        </div>

        {/* Differentiators Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/10">
          {differentiators.map((item, idx) => (
            <div
              key={item.title}
              className={`bg-background p-8 lg:p-10 group hover:bg-primary/5 transition-all duration-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              <h3 className="font-display text-xl lg:text-2xl mb-4 group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
