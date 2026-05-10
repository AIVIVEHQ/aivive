"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";
import { Logo } from "./logo";

const footerLinks = {
  Product: [
    { name: "Feed", href: "#product" },
    { name: "Studio", href: "#product" },
    { name: "Burn Dashboard", href: "#protocol" },
    { name: "Whitepaper", href: "#" },
    { name: "App", href: "#" },
  ],
  Resources: [
    { name: "GitBook", href: "#" },
    { name: "GitHub", href: "#" },
    { name: "Dune Analytics", href: "#" },
    { name: "BaseScan", href: "#" },
    { name: "Solscan", href: "#" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#", badge: "Hiring" },
    { name: "Brand Kit", href: "#" },
    { name: "Contact", href: "mailto:contact@aivive.ai" },
  ],
  Community: [
    { name: "X", href: "https://x.com/AIVIVEHQ" },
    { name: "Telegram", href: "https://t.me/AIVIVEHQ" },
    { name: "Discord", href: "#" },
    { name: "Medium", href: "#" },
  ],
};

const legalLinks = [
  { name: "Terms of Service", href: "#" },
  { name: "Privacy Policy", href: "#" },
  { name: "License Agreement", href: "#" },
];

export function FooterSection() {
  return (
    <footer className="relative border-t border-primary/10">
      {/* Animated wave background */}
      <div className="absolute inset-0 h-64 opacity-20 pointer-events-none overflow-hidden">
        <AnimatedWave />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Main Footer */}
        <div className="py-16 lg:py-24">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="col-span-2">
              <a href="#" className="inline-flex items-center gap-2 mb-6">
                <Logo size="lg" />
              </a>

              <p className="text-muted-foreground leading-relaxed mb-4 max-w-xs">
                The first Recursive AI Protocol. AI that gives.
              </p>
              <p className="text-sm text-muted-foreground/70 mb-8 max-w-xs">
                Alive. Warm. Sharp.
              </p>

              {/* Social Links */}
              <div className="flex gap-6">
                {footerLinks.Community.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                  >
                    {link.name}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).filter(([title]) => title !== 'Community').map(([title, links]) => (
              <div key={title}>
                <h3 className="text-sm font-medium mb-6 text-foreground">{title}</h3>
                <ul className="space-y-4">
                  {links.map((link) => (
                    <li key={link.name}>
                      <a
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
                        {"badge" in link && link.badge && (
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'oklch(0.753 0.155 41.6 / 0.15)', color: 'oklch(0.877 0.072 47.9)', border: '1px solid oklch(0.753 0.155 41.6 / 0.2)' }}>
                            {link.badge}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-8 border-t border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            2026 AIVIVE. All rights reserved.
          </p>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {legalLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-primary transition-colors">
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
