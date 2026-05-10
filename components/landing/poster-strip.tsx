"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";

/**
 * Cinematic visual anchor — "The Loop" poster
 * Placed between Features (protocol explanation) and Burn Calculator (try it yourself)
 * as a narrative bridge: understand the loop → experience the loop
 */
export function LoopVisual() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = 1 - (rect.top + rect.height) / (viewH + rect.height);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -6, y: x * 6 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  // Parallax: image moves slower than scroll
  const parallaxY = (scrollProgress - 0.5) * 30;

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Ambient glow behind the card */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, oklch(0.902 0.152 174.5 / 0.06), oklch(0.753 0.155 41.6 / 0.03) 40%, transparent 70%)",
          filter: "blur(60px)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-12">
        {/* Card with 3D tilt, parallax, and glow */}
        <div
          ref={cardRef}
          className={`relative transition-all duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0 scale-100"
              : "opacity-0 translate-y-16 scale-95"
          }`}
          style={{
            perspective: "1200px",
          }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative rounded-2xl overflow-hidden transition-transform duration-300 ease-out"
            style={{
              transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            {/* Outer glow border */}
            <div
              className="absolute -inset-px rounded-2xl transition-opacity duration-500"
              style={{
                background: "linear-gradient(135deg, oklch(0.902 0.152 174.5 / 0.3), transparent 40%, transparent 60%, oklch(0.753 0.155 41.6 / 0.2))",
                opacity: isVisible ? 1 : 0,
              }}
            />

            {/* Image container */}
            <div className="relative rounded-2xl overflow-hidden border border-primary/10">
              {/* Gradient overlays — blend edges into page background */}
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-background/40 via-transparent to-background/20" />
              <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-background/15 via-transparent to-background/15" />

              {/* Mouse-following spotlight */}
              <div
                className="absolute inset-0 z-10 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle 200px at ${(tilt.y / 6 + 0.5) * 100}% ${(-tilt.x / 6 + 0.5) * 100}%, oklch(0.902 0.152 174.5 / 0.08), transparent)`,
                }}
              />

              <div
                className="relative w-full aspect-[1280/674]"
                style={{
                  transform: `translateY(${parallaxY}px) scale(1.05)`,
                  transition: "transform 0.1s linear",
                }}
              >
                <Image
                  src="/images/posters/the-loop.jpg"
                  alt="The Loop — We built the loop. Now we wait for it to be needed."
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 900px"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Caption — minimal, typographic */}
        <p
          className={`mt-6 text-center text-sm font-mono text-muted-foreground/50 transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          Revenue in. Tokens burned. Supply falls. Repeat.
        </p>
      </div>
    </section>
  );
}
