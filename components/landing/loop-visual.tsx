"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/**
 * Animated infinity loop — particles flowing along a lemniscate path
 * Aqua on one lobe, coral on the other, representing the recursive buyback loop
 * Interactive: particles respond to mouse proximity
 */
export function LoopVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
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

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -9999, y: -9999 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let time = 0;
    let animating = true;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Lemniscate of Bernoulli parametric curve
    // x = a * cos(t) / (1 + sin²(t))
    // y = a * sin(t) * cos(t) / (1 + sin²(t))
    const lemniscate = (t: number, a: number) => {
      const sinT = Math.sin(t);
      const cosT = Math.cos(t);
      const denom = 1 + sinT * sinT;
      return {
        x: (a * cosT) / denom,
        y: (a * sinT * cosT) / denom,
      };
    };

    // Color interpolation
    const lerpColor = (
      r1: number, g1: number, b1: number,
      r2: number, g2: number, b2: number,
      t: number
    ) => ({
      r: r1 + (r2 - r1) * t,
      g: g1 + (g2 - g1) * t,
      b: b1 + (b2 - b1) * t,
    });

    // Aqua: #4FFFD8 = (79, 255, 216)
    // Coral: #FF8A5C = (255, 138, 92)
    const AQUA = { r: 79, g: 255, b: 216 };
    const CORAL = { r: 255, g: 138, b: 92 };
    const WHITE = { r: 255, g: 255, b: 255 };

    // Particle system
    const PARTICLE_COUNT = 180;
    const TRAIL_LENGTH = 6;

    interface Particle {
      phase: number;       // position along the curve (0 to 2PI)
      speed: number;       // base speed
      size: number;        // radius
      opacity: number;     // base opacity
      layer: number;       // depth layer (0-2)
      offset: number;      // perpendicular offset from curve
    }

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        phase: (Math.PI * 2 * i) / PARTICLE_COUNT + Math.random() * 0.3,
        speed: 0.008 + Math.random() * 0.006,
        size: 1 + Math.random() * 2.5,
        opacity: 0.3 + Math.random() * 0.7,
        layer: Math.floor(Math.random() * 3),
        offset: (Math.random() - 0.5) * 12,
      });
    }

    const render = () => {
      if (!animating) return;

      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const scale = Math.min(w * 0.38, h * 0.65);
      const mouse = mouseRef.current;

      // Draw glow background for the loop path
      ctx.save();
      ctx.globalAlpha = 0.04;
      for (let t = 0; t < Math.PI * 2; t += 0.02) {
        const p = lemniscate(t, scale);
        const colorT = (Math.sin(t) + 1) / 2; // 0-1 based on which lobe
        const col = lerpColor(AQUA.r, AQUA.g, AQUA.b, CORAL.r, CORAL.g, CORAL.b, colorT);
        ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, 0.3)`;
        ctx.beginPath();
        ctx.arc(cx + p.x, cy + p.y, 20, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Draw the faint path line
      ctx.save();
      ctx.globalAlpha = 0.08;
      ctx.strokeStyle = "#4FFFD8";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let t = 0; t <= Math.PI * 2; t += 0.01) {
        const p = lemniscate(t, scale);
        if (t === 0) ctx.moveTo(cx + p.x, cy + p.y);
        else ctx.lineTo(cx + p.x, cy + p.y);
      }
      ctx.closePath();
      ctx.stroke();
      ctx.restore();

      // Update and draw particles
      particles.forEach((particle) => {
        // Update phase (flow along curve)
        const layerSpeedMod = 1 - particle.layer * 0.15;
        particle.phase += particle.speed * layerSpeedMod;
        if (particle.phase > Math.PI * 2) particle.phase -= Math.PI * 2;

        const t = particle.phase;
        const pos = lemniscate(t, scale);

        // Perpendicular offset (normal to curve)
        const dt = 0.01;
        const posNext = lemniscate(t + dt, scale);
        const dx = posNext.x - pos.x;
        const dy = posNext.y - pos.y;
        const len = Math.sqrt(dx * dx + dy * dy) || 1;
        const nx = -dy / len;
        const ny = dx / len;

        let px = cx + pos.x + nx * particle.offset;
        let py = cy + pos.y + ny * particle.offset;

        // Mouse interaction — gentle repulsion
        const mdx = px - mouse.x;
        const mdy = py - mouse.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 80) {
          const force = (1 - mDist / 80) * 15;
          px += (mdx / mDist) * force;
          py += (mdy / mDist) * force;
        }

        // Color: aqua on right lobe (cos > 0), coral on left (cos < 0)
        // Smooth transition through white at the crossing point
        const colorPhase = Math.cos(t);
        let col;
        if (colorPhase > 0.15) {
          // Aqua region
          const blend = Math.min(1, (colorPhase - 0.15) / 0.4);
          col = lerpColor(WHITE.r, WHITE.g, WHITE.b, AQUA.r, AQUA.g, AQUA.b, blend);
        } else if (colorPhase < -0.15) {
          // Coral region
          const blend = Math.min(1, (-colorPhase - 0.15) / 0.4);
          col = lerpColor(WHITE.r, WHITE.g, WHITE.b, CORAL.r, CORAL.g, CORAL.b, blend);
        } else {
          // Crossing — white
          col = WHITE;
        }

        // Pulsing opacity
        const pulse = 0.7 + 0.3 * Math.sin(time * 2 + t * 3);
        const layerAlpha = 1 - particle.layer * 0.25;
        const alpha = particle.opacity * pulse * layerAlpha;

        // Draw glow
        const glowSize = particle.size * (3 + particle.layer);
        const gradient = ctx.createRadialGradient(px, py, 0, px, py, glowSize);
        gradient.addColorStop(0, `rgba(${Math.round(col.r)}, ${Math.round(col.g)}, ${Math.round(col.b)}, ${alpha * 0.4})`);
        gradient.addColorStop(1, `rgba(${Math.round(col.r)}, ${Math.round(col.g)}, ${Math.round(col.b)}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(px, py, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw core particle
        ctx.fillStyle = `rgba(${Math.round(col.r)}, ${Math.round(col.g)}, ${Math.round(col.b)}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // Center crossing glow pulse
      const centerPulse = 0.5 + 0.5 * Math.sin(time * 1.5);
      const centerGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      centerGrad.addColorStop(0, `rgba(255, 255, 255, ${0.15 * centerPulse})`);
      centerGrad.addColorStop(0.5, `rgba(79, 255, 216, ${0.05 * centerPulse})`);
      centerGrad.addColorStop(1, "rgba(79, 255, 216, 0)");
      ctx.fillStyle = centerGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fill();

      time += 0.016;
      frameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      animating = false;
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 overflow-hidden"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse, oklch(0.902 0.152 174.5 / 0.05), transparent 70%)",
          filter: "blur(60px)",
          opacity: isVisible ? 1 : 0,
          transition: "opacity 1.5s ease",
        }}
      />

      <div
        className={`relative z-10 max-w-[1000px] mx-auto px-6 lg:px-12 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Section label */}
        <div className="text-center mb-8">
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary/60">
            <span className="w-8 h-px bg-primary/20" />
            THE RECURSIVE LOOP
            <span className="w-8 h-px bg-primary/20" />
          </span>
        </div>

        {/* Canvas — animated infinity */}
        <div
          className="relative w-full aspect-[16/9] cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full"
            style={{ display: "block" }}
          />

          {/* Overlaid text — centered on the loop */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <h3
              className="text-4xl lg:text-6xl font-display tracking-tight bg-clip-text text-transparent mb-3"
              style={{
                backgroundImage: "linear-gradient(135deg, #4FFFD8 0%, #FFFFFF 50%, #FF8A5C 100%)",
              }}
            >
              The Loop
            </h3>
            <p className="text-sm lg:text-base text-muted-foreground/70 font-mono">
              We built it. Now we wait for it to be needed.
            </p>
          </div>
        </div>

        {/* Tagline */}
        <p
          className={`mt-8 text-center text-sm text-muted-foreground/40 font-mono transition-all duration-700 delay-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          Revenue in &middot; Tokens burned &middot; Supply falls &middot; Repeat
        </p>
      </div>
    </section>
  );
}
