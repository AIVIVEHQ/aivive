"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";

const footerLinks = {
  Product: [
    { name: "Network", href: "#network" },
    { name: "Agent Passport", href: "#agent-layer" },
    { name: "Payments", href: "#payments" },
    { name: "Explorer", href: "#" },
    { name: "App", href: "#" },
  ],
  Developers: [
    { name: "Docs", href: "#developers" },
    { name: "SDK", href: "#developers" },
    { name: "GitHub", href: "#" },
    { name: "Status", href: "#" },
    { name: "Faucet", href: "#" },
  ],
  Company: [
    { name: "About", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Careers", href: "#", badge: "Hiring" },
    { name: "Brand Kit", href: "#" },
    { name: "Contact", href: "#" },
  ],
  Community: [
    { name: "X", href: "#" },
    { name: "Discord", href: "#" },
    { name: "Telegram", href: "#" },
    { name: "LinkedIn", href: "#" },
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
                <span className="text-2xl font-display text-primary">AIVIVE</span>
              </a>

              <p className="text-muted-foreground leading-relaxed mb-8 max-w-xs">
                The crypto execution layer for autonomous agents.
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
