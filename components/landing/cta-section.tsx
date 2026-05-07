"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedTetrahedron } from "./animated-tetrahedron";

export function CtaSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    containerRef.current.style.setProperty('--mouse-x', `${x}%`);
    containerRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div
          ref={containerRef}
          className={`relative shimmer-border rounded-xl transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
          onMouseMove={handleMouseMove}
        >
          {/* Inner container with glass effect */}
          <div className="relative glass-card rounded-xl overflow-hidden">
            {/* Aqua spotlight follows mouse */}
            <div
              className="absolute inset-0 pointer-events-none transition-opacity duration-300"
              style={{
                background: 'radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), oklch(0.902 0.152 174.5 / 0.12), transparent 40%)'
              }}
            />

            {/* Fixed coral halo bottom-right */}
            <div
              className="absolute -bottom-16 -right-16 w-[250px] h-[250px] pointer-events-none"
              style={{
                background: 'radial-gradient(circle, oklch(0.753 0.155 41.6 / 0.06), transparent 70%)',
                filter: 'blur(40px)',
              }}
            />

            <div className="relative z-10 px-8 lg:px-16 py-16 lg:py-24">
              <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
                {/* Left content */}
                <div className="flex-1">
                  <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
                    <span className="status-dot-warm" />
                    COMING SOON
                  </span>

                  <h2 className="text-4xl lg:text-7xl font-display tracking-tight mb-8 leading-[0.95]">
                    Build the agent
                    <br />
                    economy with AIVIVE
                  </h2>

                  <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl">
                    Join the early network of developers, protocols, and AI builders preparing for autonomous onchain execution.
                  </p>

                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-full group transition-shadow hover:shadow-[0_0_30px_oklch(0.902_0.152_174.5/0.3)]"
                    >
                      Join Waitlist
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="h-14 px-8 text-base rounded-full border-primary/20 hover:bg-primary/5 hover:border-primary/40"
                    >
                      Contact Us
                    </Button>
                  </div>
                </div>

                {/* Right animation */}
                <div className="hidden lg:flex items-center justify-center w-[500px] h-[500px] -mr-16">
                  <AnimatedTetrahedron />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
