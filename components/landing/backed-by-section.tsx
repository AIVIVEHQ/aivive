"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

type Investor = {
  name: string;
  logoSrc: string;
  // Native background baked into the logo file — drives the chip color so each logo stays legible.
  logoBg: "light" | "dark";
  round: "Lead" | "Follow-on";
  region: string;
  quote: string;
  website?: { label: string; href: string };
  x?: { handle: string; href: string };
};

// Data sourced from raw/VC. Internal fees intentionally excluded.
// NOTE: quotes below are drafts written for layout — replace with VC-approved copy before launch.
const investors: Investor[] = [
  {
    name: "Vega Ventures",
    logoSrc: "/images/investors/vega-ventures.jpg",
    logoBg: "dark",
    round: "Lead",
    region: "Global",
    quote:
      "Aivive turns AI from a tool you prompt into an economy you own. We're proud to lead this round.",
    website: { label: "vegaventures.org", href: "https://vegaventures.org" },
    x: { handle: "@0xVegaVentures", href: "https://x.com/0xVegaVentures" },
  },
  {
    name: "Greenwood Global Capital",
    logoSrc: "/images/investors/greenwood-global-capital.jpg",
    logoBg: "light",
    round: "Follow-on",
    region: "United Kingdom",
    quote:
      "Recursive AI plus a programmable revenue share — this is the model on-chain AI has been missing.",
    website: { label: "gwglobal.ca", href: "https://www.gwglobal.ca/" },
    x: { handle: "@gwglobal_cap", href: "https://x.com/gwglobal_cap" },
  },
  {
    name: "Echo3 Labs",
    logoSrc: "/images/investors/echo3-labs.jpg",
    logoBg: "light",
    round: "Follow-on",
    region: "Singapore",
    quote:
      "The loop between creation, distribution, and value is finally closed. Aivive built it on rails that scale.",
    website: { label: "echo3.asia", href: "https://echo3.asia/" },
    x: { handle: "@Echo3labs", href: "https://x.com/Echo3labs" },
  },
  {
    name: "UZ Capital",
    logoSrc: "/images/investors/uz-capital.png",
    logoBg: "dark",
    round: "Follow-on",
    region: "Singapore",
    quote:
      "Battle-tested infrastructure, a real product, and aligned token economics. An easy conviction bet.",
    website: { label: "uzcapital.xyz", href: "https://uzcapital.xyz" },
    x: { handle: "@UZcapitalX", href: "https://x.com/UZcapitalX" },
  },
  {
    name: "Bluemount Capital",
    logoSrc: "/images/investors/bluemount-capital.png",
    logoBg: "dark",
    round: "Follow-on",
    region: "United Kingdom",
    quote:
      "Aivive is shipping the AI-native social layer we've been waiting for. Backing the team all the way to TGE.",
    website: { label: "bluemount.xyz", href: "https://bluemount.xyz" },
    x: { handle: "@BMFxyz", href: "https://x.com/BMFxyz" },
  },
];

// Participation tier — from the official AIVIVE announcement (Series A & B).
const participants = [
  "Consensys",
  "OKX Ventures",
  "Draper Dragon",
  "No Limit Holdings",
  "Marblex",
  "Fenbushi Capital",
  "ARPA",
  "Arweave",
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InvestorCard({
  investor,
  index,
  isVisible,
}: {
  investor: Investor;
  index: number;
  isVisible: boolean;
}) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty("--spotlight-x", `${x}%`);
    e.currentTarget.style.setProperty("--spotlight-y", `${y}%`);
  }, []);

  return (
    <div
      className={`relative glass-card p-6 lg:p-8 group flex flex-col hover:-translate-y-1 transition-all duration-500 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 75}ms` }}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight gradient on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[inherit]"
        style={{
          background:
            "radial-gradient(250px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), oklch(0.902 0.152 174.5 / 0.08), transparent 60%)",
        }}
      />

      <div className="relative z-10 flex flex-col h-full">
        {/* Logo chip — tile background matches each logo's native background so it stays legible */}
        <div
          className={`rounded-lg h-24 px-6 flex items-center justify-center mb-6 ring-1 ring-inset ring-white/10 ${
            investor.logoBg === "light" ? "bg-white" : "bg-black"
          }`}
        >
          <div className="relative h-16 w-full">
            <Image
              src={investor.logoSrc}
              alt={`${investor.name} logo`}
              fill
              className="object-contain"
              sizes="320px"
            />
          </div>
        </div>

        {/* Lead investor + region */}
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono tracking-wide bg-primary/15 text-primary">
            LEAD
          </span>
          <span className="text-xs text-muted-foreground">{investor.region}</span>
        </div>

        {/* Name */}
        <h3 className="text-lg font-medium mb-3 group-hover:text-primary transition-colors">
          {investor.name}
        </h3>

        {/* Quote */}
        <p className="text-sm text-muted-foreground italic leading-relaxed mb-6">
          “{investor.quote}”
        </p>

        {/* Links */}
        <div className="mt-auto flex items-center gap-4 pt-2 text-xs font-mono">
          {investor.website && (
            <a
              href={investor.website.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              {investor.website.label}
            </a>
          )}
          {investor.x && (
            <a
              href={investor.x.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
            >
              <XIcon className="w-3 h-3" />
              {investor.x.handle}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export function BackedBySection() {
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
    <section id="backed-by" ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Ambient aqua glow */}
      <div
        className="absolute top-1/4 right-1/4 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(circle, oklch(0.902 0.152 174.5 / 0.06), transparent 70%)",
          filter: "blur(90px)",
        }}
      />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`max-w-3xl mb-16 lg:mb-24 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <span className="w-8 h-px bg-primary/30" />
            BACKED BY
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-6">
            Backed by funds
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, oklch(0.513 0.015 179), oklch(0.902 0.152 174.5))",
              }}
            >
              that ship alongside us
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            <span className="text-foreground font-medium">$8M raised across our Series A &amp; B rounds</span> —
            led by Vega Ventures, UZ Capital, Bluemount, Echo3 Labs, and Greenwood Global Capital, with
            participation from leading funds across the ecosystem.
          </p>
        </div>

        {/* Investor grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {investors.map((investor, index) => (
            <InvestorCard
              key={investor.name}
              investor={investor}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* Participation tier */}
        <div
          className={`mt-12 lg:mt-16 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-sm font-mono text-muted-foreground mb-5">
            With participation from
          </p>
          <div className="flex flex-wrap gap-2.5">
            {participants.map((name) => (
              <span
                key={name}
                className="inline-flex items-center px-4 py-2 rounded-full text-sm text-foreground/90 bg-secondary/60 border border-border hover:border-primary/40 hover:text-primary transition-colors"
              >
                {name}
              </span>
            ))}
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm text-muted-foreground italic">
              and more
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
