"use client";

import { useState, useEffect, useRef } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const codeExamples = [
  {
    label: "Stack",
    code: `# Frontend
Next.js 16 (App Router) + React 19
Tailwind CSS v4 + shadcn/ui
Vercel Edge deployment

# AI Providers
fal.ai    → FLUX.1 Schnell / Dev
OpenAI    → gpt-image-2
Google    → Imagen 4 Ultra`,
  },
  {
    label: "Payments",
    code: `# User Payment Flow (Base mainnet)
Privy embedded wallet (EVM + Solana)
USDC on Base → Credit Ledger

# Cross-Chain (Circle CCTP)
Safe 2-of-3 multisig → CCTP burn
USDC destroyed on Base
USDC minted on Solana (~15 min)`,
  },
  {
    label: "Token",
    code: `# $AVV on Solana
SPL Token — 10B total supply
Squads 2-of-3 multisig authority
CertiK audited

# Weekly Burn Cycle
Jupiter swap: USDC → AVV
SPL Token Burn: permanent destruction
Dashboard: aivive.ai/burn
Dune: dune.com/aivive`,
  },
];

const features = [
  {
    title: "Privy dual-chain wallets",
    description: "Embedded EVM + Solana wallets. No seed phrases."
  },
  {
    title: "Circle CCTP bridge",
    description: "Native burn-mint. No custodial bridge risk."
  },
  {
    title: "Jupiter aggregation",
    description: "Best execution for USDC-to-AVV swaps."
  },
  {
    title: "On-chain verification",
    description: "Every flow auditable on BaseScan + Solscan."
  },
];

const codeAnimationStyles = `
  .dev-code-line {
    opacity: 0;
    transform: translateX(-8px);
    animation: devLineReveal 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes devLineReveal {
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .dev-code-char {
    opacity: 0;
    filter: blur(8px);
    animation: devCharReveal 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  @keyframes devCharReveal {
    to {
      opacity: 1;
      filter: blur(0);
    }
  }
`;

export function DevelopersSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeExamples[activeTab].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
    <section id="developers" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: codeAnimationStyles }} />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left: Content */}
          <div
            className={`transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
              <span className="w-8 h-px bg-primary/30" />
              ARCHITECTURE
            </span>
            <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-8">
              Built with the best
              <br />
              <span className="text-muted-foreground">of crypto and AI</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed">
              No new L1. No custom bridge. Aivive operates on top of Solana and Base, inheriting the security and infrastructure of two battle-tested ecosystems.
            </p>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 mb-12">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`transition-all duration-500 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: `${index * 50 + 200}ms` }}
                >
                  <h3 className="font-medium mb-1 text-foreground">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 h-14 text-base rounded-full group"
              >
                Read Whitepaper
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base rounded-full border-primary/20 hover:bg-primary/5"
              >
                View on GitHub
              </Button>
            </div>
          </div>

          {/* Right: Code block */}
          <div
            className={`lg:sticky lg:top-32 transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
            }`}
          >
            <div className="border border-primary/20 bg-card shimmer-border rounded-lg overflow-hidden">
              {/* Gradient top accent */}
              <div className="h-0.5" style={{ background: 'linear-gradient(90deg, oklch(0.902 0.152 174.5 / 0.6), oklch(0.753 0.155 41.6 / 0.2), transparent)' }} />
              {/* Tabs */}
              <div className="flex items-center border-b border-primary/10">
                {codeExamples.map((example, idx) => (
                  <button
                    key={example.label}
                    type="button"
                    onClick={() => setActiveTab(idx)}
                    className={`px-6 py-4 text-sm font-mono transition-colors relative ${
                      activeTab === idx
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {example.label}
                    {activeTab === idx && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
                    )}
                  </button>
                ))}
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-4 text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Copy code"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-primary" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Code content */}
              <div className="p-8 font-mono text-sm min-h-[280px] grain-overlay">
                <pre className="text-foreground/80">
                  {codeExamples[activeTab].code.split('\n').map((line, lineIndex) => (
                    <div
                      key={`${activeTab}-${lineIndex}`}
                      className="leading-loose dev-code-line"
                      style={{ animationDelay: `${lineIndex * 80}ms` }}
                    >
                      <span className="inline-flex">
                        {line.split('').map((char, charIndex) => (
                          <span
                            key={`${activeTab}-${lineIndex}-${charIndex}`}
                            className="dev-code-char"
                            style={{
                              animationDelay: `${lineIndex * 80 + charIndex * 15}ms`,
                            }}
                          >
                            {char === ' ' ? '\u00A0' : char}
                          </span>
                        ))}
                      </span>
                    </div>
                  ))}
                </pre>
              </div>
            </div>

            {/* Links */}
            <div className="mt-6 flex items-center gap-6 text-sm">
              <a href="#" className="text-primary hover:underline underline-offset-4">
                Whitepaper on GitBook
              </a>
              <span className="text-primary/20">|</span>
              <a href="#" className="text-muted-foreground hover:text-foreground">
                Dune Analytics
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
