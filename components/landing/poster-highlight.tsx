"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export function PosterHighlight() {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
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

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const progress = -rect.top / (rect.height + window.innerHeight);
      setScrollY(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 lg:py-24 overflow-hidden">
      <div
        className={`relative max-w-[1400px] mx-auto px-6 lg:px-12 transition-all duration-700 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div
          className="relative rounded-2xl overflow-hidden border border-primary/10"
          style={{ transform: `translateY(${scrollY * 30}px)` }}
        >
          {/* Gradient overlays for blending */}
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-t from-background/60 via-transparent to-background/30" />
          <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-background/20 via-transparent to-background/20" />

          <div className="relative w-full aspect-[1280/674]">
            <Image
              src="/images/posters/ai-give.png"
              alt="AI + Give. A project that shares value through AI."
              fill
              className="object-cover"
              sizes="(max-width: 1400px) 100vw, 1400px"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
