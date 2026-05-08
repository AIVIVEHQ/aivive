"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimatedSphere } from "./animated-sphere";

const trustItems = [
  "Solana native",
  "USDC payments",
  "Weekly burn cycle",
  "CertiK audited",
  "55% to community",
];

const statusItems = [
  { label: "feed building", color: "coral" as const },
  { label: "burn cycle designed", color: "aqua" as const },
  { label: "creators welcome", color: "amber" as const },
];

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden grain-overlay">
      {/* Gradient halo - aqua top-left */}
      <div
        className="absolute -top-32 -left-32 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.902 0.152 174.5 / 0.10), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Gradient halo - coral bottom-right (stronger) */}
      <div
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.753 0.155 41.6 / 0.12), oklch(0.805 0.117 42.7 / 0.04) 50%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* Amber warm light - center right (stronger) */}
      <div
        className="absolute top-1/3 right-1/4 w-[350px] h-[350px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.870 0.130 85 / 0.08), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Coral warm wash - left center */}
      <div
        className="absolute top-2/3 -left-16 w-[300px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.753 0.155 41.6 / 0.06), transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      {/* Animated sphere background */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] lg:w-[800px] lg:h-[800px] opacity-40">
        <AnimatedSphere />
      </div>

      {/* Subtle grid lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute h-px bg-primary/30"
            style={{
              top: `${12.5 * (i + 1)}%`,
              left: 0,
              right: 0,
            }}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute w-px bg-primary/30"
            style={{
              left: `${8.33 * (i + 1)}%`,
              top: 0,
              bottom: 0,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-32 lg:py-40">
        {/* Eyebrow */}
        <div
          className={`mb-4 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            LAUNCHING SUMMER 2026
          </span>
        </div>

        {/* Protocol status strip */}
        <div
          className={`mb-8 transition-all duration-700 delay-100 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div className="inline-flex items-center gap-4 text-xs font-mono text-muted-foreground">
            {statusItems.map((item, i) => (
              <span key={item.label} className="inline-flex items-center gap-2">
                {i > 0 && <span className="text-primary/20 mr-2">|</span>}
                <span className={
                  item.color === "coral" ? "status-dot-warm" :
                  item.color === "amber" ? "status-dot-amber" :
                  "w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                } />
                {item.label}
              </span>
            ))}
          </div>
        </div>

        {/* Main headline */}
        <div className="mb-4">
          <h1
            className={`text-[clamp(2.5rem,10vw,7rem)] font-display leading-[0.95] tracking-wider uppercase bg-clip-text text-transparent transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{
              backgroundImage: 'linear-gradient(135deg, #FFFFFF 0%, #A8FFEB 25%, #4FFFD8 50%, #FFA682 75%, #FF8A5C 100%)',
              filter: 'drop-shadow(0 0 50px oklch(0.902 0.152 174.5 / 0.35))',
            }}
          >
            <span className="block">The first</span>
            <span className="block">Recursive</span>
            <span className="block">AI Protocol</span>
          </h1>
        </div>

        {/* Animated pulse sweep line */}
        <div className="relative h-px w-full max-w-3xl mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-primary/10" />
          <div
            className="absolute inset-y-0 w-1/3 pulse-sweep"
            style={{
              background: 'linear-gradient(90deg, transparent, oklch(0.902 0.152 174.5 / 0.6), oklch(0.753 0.155 41.6 / 0.2), transparent)',
            }}
          />
        </div>

        {/* Description */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-end">
          <p
            className={`text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-xl transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            An AI image feed where every dollar of platform revenue automatically buys back and burns $AVV on Solana. Use the product. Make the asset rarer.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-start gap-4 transition-all duration-700 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
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
              className="h-14 px-8 text-base rounded-full border-primary/20 hover:bg-primary/5 hover:border-primary/40 transition-shadow hover:shadow-[0_0_20px_oklch(0.753_0.155_41.6/0.08)]"
            >
              Read Whitepaper
            </Button>
          </div>
        </div>

      </div>

      {/* Trust strip */}
      <div
        className={`relative z-10 pb-16 transition-all duration-700 delay-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <p className="text-sm font-mono mb-6">
            <span className="text-muted-foreground">AI that gives. </span>
            <span style={{ color: '#FFA682' }}>Alive</span>
            <span className="text-muted-foreground">. </span>
            <span style={{ color: '#FF8A5C' }}>Warm</span>
            <span className="text-muted-foreground">. </span>
            <span className="text-primary">Sharp</span>
            <span className="text-muted-foreground">.</span>
          </p>
          <div className="flex flex-wrap gap-4">
            {trustItems.map((item) => (
              <span
                key={item}
                className="px-4 py-2 text-sm border border-primary/15 rounded-full text-foreground/80 glass-card"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
