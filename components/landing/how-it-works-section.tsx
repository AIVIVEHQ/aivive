"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const productFeatures = [
  {
    number: "01",
    title: "/feed",
    description: "Trending, Following, and New columns of AI-generated visual content. Discover taste, not just images. The feed is the market.",
    warm: true,
  },
  {
    number: "02",
    title: "/studio",
    description: "Prompt input, style presets, aspect ratio, three-tier model selection. From idea to image in seconds. FLUX.1, gpt-image-2, Imagen 4 Ultra.",
  },
  {
    number: "03",
    title: "Remix",
    description: "One-click cultural transmission. See something you love, remix it with your own twist. Taste spreads through creation, not just likes.",
  },
  {
    number: "04",
    title: "Creator Profile",
    description: "Reputation built on creative footprint: prompts shipped, posts liked, followers earned. Your taste becomes your identity.",
  },
  {
    number: "05",
    title: "Wallet",
    description: "Credits balance, USDC balance, on-ramp flow. Transparent double-entry ledger. No hidden fees, no volatile gas tokens.",
  },
  {
    number: "06",
    title: "Burn Dashboard",
    description: "Real-time metrics: cumulative tokens burned, weekly USDC inflow, burn velocity. Publicly verifiable on-chain.",
    warm: true,
  },
];

function FeatureCard({ feature, index, isVisible }: { feature: typeof productFeatures[0]; index: number; isVisible: boolean }) {
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
        'warm' in feature && feature.warm ? 'border-t-2 border-t-amber/20' : ''
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
          <span className="font-mono text-sm text-primary">{feature.number}</span>
          {'warm' in feature && feature.warm && (
            <span className="status-dot-amber" />
          )}
        </div>
        <h3 className="text-xl lg:text-2xl font-display mb-4 group-hover:text-primary transition-colors">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
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
      id="product"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Warm halos */}
      <div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.753 0.155 41.6 / 0.07), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      <div
        className="absolute bottom-1/3 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.870 0.130 85 / 0.06), transparent 70%)',
          filter: 'blur(70px)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <span className="w-8 h-px bg-primary/30" />
            THE PRODUCT
          </span>
          <h2
            className={`text-4xl lg:text-6xl font-display tracking-tight transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            A taste-first
            <br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(90deg, oklch(0.513 0.015 179), oklch(0.805 0.117 42.7))' }}>AI creative platform</span>
          </h2>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
            Civitai meets Pinterest. The model layer is solved — FLUX, gpt-image, Imagen all produce any image you can describe. The right shape for AI image generation is a feed.
          </p>
        </div>

        {/* Product Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {productFeatures.map((feature, index) => (
            <FeatureCard key={feature.number} feature={feature} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
