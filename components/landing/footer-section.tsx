"use client";

import { ArrowUpRight } from "lucide-react";
import { AnimatedWave } from "./animated-wave";
import { Logo } from "./logo";

const footerLinks = {
  Product: [
    { name: "Feed", href: "#product" },
    { name: "Studio", href: "#product" },
    { name: "Loop Dashboard", href: "#protocol" },
    { name: "Whitepaper", href: "https://aivive.gitbook.io" },
  ],
  Connect: [
    { name: "Contact", href: "mailto:contact@aivive.ai" },
    { name: "Link3", href: "https://link3.to/aivive" },
  ],
  Community: [
    { name: "X", href: "https://x.com/AIVIVEHQ" },
    { name: "Telegram", href: "https://t.me/AIVIVEHQ" },
    { name: "Discord", href: "https://discord.gg/aivive" },
    { name: "Medium", href: "https://medium.com/@aivive" },
    { name: "YouTube", href: "https://www.youtube.com/@AIVIVEHQ" },
  ],
};

const isExternal = (href: string) => href.startsWith("http");

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
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {footerLinks.Community.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={isExternal(link.href) ? "_blank" : undefined}
                    rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
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
                        target={isExternal(link.href) ? "_blank" : undefined}
                        rel={isExternal(link.href) ? "noopener noreferrer" : undefined}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-2"
                      >
                        {link.name}
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
            © 2026 AIVIVE. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
