"use client";

import { useEffect, useState, useRef } from "react";

const failedPatterns = [
  {
    pattern: "Subscription SaaS",
    detail: "Predictable for platforms, nothing for users. All surplus captured by centralized providers.",
  },
  {
    pattern: "Token-as-fee",
    detail: "Adds friction to every interaction and forces users into price speculation just to use the product.",
  },
  {
    pattern: "Token-as-governance",
    detail: "Mostly speculative, no structural price floor. Governance without economic alignment.",
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
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden border-t border-primary/10 grain-overlay">
      {/* Coral halo - right */}
      <div
        className="absolute top-1/4 right-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.753 0.155 41.6 / 0.08), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      {/* Amber halo - bottom left */}
      <div
        className="absolute bottom-0 left-1/4 w-[300px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.870 0.130 85 / 0.05), transparent 70%)',
          filter: 'blur(70px)',
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
              <span className="w-8 h-px bg-primary/30" />
              THE PROBLEM
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              AI made content
              <br />
              infinite.
              <br />
              <span className="text-muted-foreground">Nothing stayed scarce.</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              The AI image generation market is projected to reach $50B by 2027. But the entire surplus flows to centralized subscription platforms. Zero value accrues to the creative users producing the work, or the open networks underwriting it.
            </p>
            <p className="text-lg text-foreground/90 leading-relaxed border-l-2 pl-6" style={{ borderColor: '#FF8A5C' }}>
              Aivive introduces a <span style={{ color: '#FFA682' }}>fourth pattern</span>: a programmable share of platform revenue is automatically routed into permanent on-chain deflation of the underlying network.
            </p>
          </div>

          {/* Right: Failed patterns */}
          <div
            className={`transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <p className="text-sm font-mono text-muted-foreground mb-6">THREE PATTERNS THAT FAILED</p>
            <div className="space-y-0">
              {failedPatterns.map((item, index) => (
                <div
                  key={item.pattern}
                  className={`py-6 border-b border-primary/10 last:border-b-0 transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <span className={`w-2 h-2 rounded-full shrink-0 mt-2 ${index === failedPatterns.length - 1 ? 'bg-coral' : 'bg-primary'}`} />
                    <div>
                      <span className="text-lg lg:text-xl font-medium text-foreground">{item.pattern}</span>
                      <p className="text-base text-muted-foreground mt-2">{item.detail}</p>
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
