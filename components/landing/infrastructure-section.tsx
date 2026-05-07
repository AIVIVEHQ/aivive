"use client";

import { useEffect, useState, useRef } from "react";

const problemPoints = [
  {
    issue: "Agents need scoped access",
    detail: "not unlimited wallet control",
  },
  {
    issue: "Users need approval once",
    detail: "not constant manual signing",
  },
  {
    issue: "Builders need payment rails",
    detail: "designed for machine-speed workflows",
  },
  {
    issue: "Protocols need verifiable intent",
    detail: "execution, and settlement records",
  },
];

export function InfrastructureSection() {
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden border-t border-primary/10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
              <span className="w-8 h-px bg-primary/30" />
              WHY AIVIVE
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Agents are ready
              <br />
              to act.
              <br />
              <span className="text-muted-foreground">Crypto rails are not.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              AI agents can search, decide, negotiate, and execute. But when value moves onchain, every action still needs identity, limits, permissions, auditability, and settlement. Existing crypto infrastructure was built for humans, traders, and apps, not for autonomous agents operating continuously across wallets, protocols, and services.
            </p>
          </div>

          {/* Right: Problem points */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="space-y-0">
              {problemPoints.map((point, index) => (
                <div
                  key={point.issue}
                  className={`py-6 border-b border-primary/10 last:border-b-0 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                    <div>
                      <span className="text-lg lg:text-xl font-medium text-foreground">{point.issue}</span>
                      <span className="text-lg lg:text-xl text-muted-foreground">, {point.detail}.</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
