"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const AVV_PRICE = 0.0025; // initial price
const TOTAL_SUPPLY = 10_000_000_000;
const SLIPPAGE = 0.01;

function formatNumber(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(2) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(0) + "K";
  return n.toFixed(0);
}

export function BurnCalculator() {
  const [weeklyRevenue, setWeeklyRevenue] = useState(10000);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

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

  // Derived calculations from whitepaper formula
  const weeklyBurn = (weeklyRevenue / AVV_PRICE) * (1 - SLIPPAGE);
  const annualBurn = weeklyBurn * 52;
  const annualDeflation = (annualBurn / TOTAL_SUPPLY) * 100;
  const remainingSupply = TOTAL_SUPPLY - annualBurn;
  const supplyPct = Math.max(0, (remainingSupply / TOTAL_SUPPLY) * 100);

  // Slider presets
  const presets = [
    { label: "$1K", value: 1000 },
    { label: "$10K", value: 10000 },
    { label: "$50K", value: 50000 },
    { label: "$200K", value: 200000 },
  ];

  // Custom slider drag handler
  const handleTrackInteraction = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    // Logarithmic scale: 1K to 200K
    const minLog = Math.log(1000);
    const maxLog = Math.log(200000);
    const value = Math.round(Math.exp(minLog + pct * (maxLog - minLog)));
    setWeeklyRevenue(value);
  }, []);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    handleTrackInteraction(e.clientX);
    const handleMove = (ev: MouseEvent) => handleTrackInteraction(ev.clientX);
    const handleUp = () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
    };
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
  }, [handleTrackInteraction]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    handleTrackInteraction(e.touches[0].clientX);
    const handleMove = (ev: TouchEvent) => handleTrackInteraction(ev.touches[0].clientX);
    const handleEnd = () => {
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleEnd);
    };
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", handleEnd);
  }, [handleTrackInteraction]);

  // Calculate slider thumb position (log scale)
  const minLog = Math.log(1000);
  const maxLog = Math.log(200000);
  const thumbPct = ((Math.log(weeklyRevenue) - minLog) / (maxLog - minLog)) * 100;

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-32 overflow-hidden">
      {/* Warm ambient */}
      <div
        className="absolute top-1/3 left-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.753 0.155 41.6 / 0.07), transparent 70%)',
          filter: 'blur(90px)',
        }}
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.870 0.130 85 / 0.05), transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12">
        {/* Header */}
        <div
          className={`mb-16 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="inline-flex items-center gap-3 text-sm font-mono text-primary mb-6">
            <span className="w-8 h-px bg-primary/30" />
            BURN CALCULATOR
          </span>
          <h2 className="text-4xl lg:text-6xl font-display tracking-tight mb-4">
            See the loop
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(90deg, oklch(0.902 0.152 174.5), oklch(0.753 0.155 41.6))' }}
            >
              in motion
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Drag the slider to simulate weekly platform revenue. Watch how the recursive loop compounds deflation over time.
          </p>
        </div>

        {/* Calculator Card */}
        <div
          className={`shimmer-border rounded-xl transition-all duration-700 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="glass-card rounded-xl p-8 lg:p-12">
            {/* Revenue Input */}
            <div className="mb-12">
              <div className="flex items-baseline justify-between mb-6">
                <label className="text-sm font-mono text-muted-foreground">WEEKLY PLATFORM REVENUE</label>
                <div className="text-4xl lg:text-5xl font-display text-primary">
                  ${weeklyRevenue.toLocaleString()}
                </div>
              </div>

              {/* Custom Slider */}
              <div
                ref={trackRef}
                className="relative h-12 cursor-pointer select-none touch-none"
                onMouseDown={handleMouseDown}
                onTouchStart={handleTouchStart}
              >
                {/* Track background */}
                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-2 rounded-full bg-ink-700/50">
                  {/* Filled track */}
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${thumbPct}%`,
                      background: 'linear-gradient(90deg, #4FFFD8, #FF8A5C)',
                    }}
                  />
                </div>
                {/* Thumb */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-2 border-primary bg-background transition-shadow hover:shadow-[0_0_20px_oklch(0.902_0.152_174.5/0.4)]"
                  style={{
                    left: `${thumbPct}%`,
                    boxShadow: '0 0 12px oklch(0.902 0.152 174.5 / 0.3)',
                  }}
                />
              </div>

              {/* Presets */}
              <div className="flex justify-between mt-4">
                {presets.map((p) => (
                  <button
                    key={p.value}
                    type="button"
                    onClick={() => setWeeklyRevenue(p.value)}
                    className={`text-sm font-mono px-3 py-1 rounded-full transition-colors ${
                      weeklyRevenue === p.value
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Weekly Burn */}
              <div className="glass-card p-6 rounded-lg">
                <div className="text-sm font-mono text-muted-foreground mb-2">Weekly burn</div>
                <div
                  className="text-2xl lg:text-3xl font-display bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #4FFFD8, #A8FFEB)' }}
                >
                  {formatNumber(weeklyBurn)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">AVV destroyed</div>
              </div>

              {/* Annual Burn */}
              <div className="glass-card p-6 rounded-lg">
                <div className="text-sm font-mono text-muted-foreground mb-2">Annual burn</div>
                <div
                  className="text-2xl lg:text-3xl font-display bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #A8FFEB, #FFA682)' }}
                >
                  {formatNumber(annualBurn)}
                </div>
                <div className="text-xs text-muted-foreground mt-1">AVV per year</div>
              </div>

              {/* Deflation Rate */}
              <div className="glass-card-warm p-6 rounded-lg">
                <div className="text-sm font-mono text-muted-foreground mb-2">Deflation rate</div>
                <div
                  className="text-2xl lg:text-3xl font-display"
                  style={{ color: '#FF8A5C', textShadow: '0 0 30px oklch(0.753 0.155 41.6 / 0.3)' }}
                >
                  {annualDeflation.toFixed(2)}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">annual supply reduction</div>
              </div>

              {/* Remaining Supply */}
              <div className="glass-card p-6 rounded-lg">
                <div className="text-sm font-mono text-muted-foreground mb-2">Remaining supply</div>
                <div className="text-2xl lg:text-3xl font-display text-foreground">
                  {supplyPct.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground mt-1">after year one</div>
              </div>
            </div>

            {/* Supply Bar Visualization */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-muted-foreground">SUPPLY REMAINING AFTER YEAR 1</span>
                <span className="text-xs font-mono text-primary">{formatNumber(remainingSupply)} AVV</span>
              </div>
              <div className="h-3 rounded-full bg-ink-700/50 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${supplyPct}%`,
                    background: `linear-gradient(90deg, #4FFFD8, ${annualDeflation > 3 ? '#FF8A5C' : '#A8FFEB'})`,
                  }}
                />
              </div>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-muted-foreground">0</span>
                <span className="text-xs text-muted-foreground">10B</span>
              </div>
            </div>

            {/* Formula footnote */}
            <p className="mt-8 text-xs font-mono text-muted-foreground/60">
              Burn(week) = Revenue_USDC(week) x (1 / Price_AVV) x (1 - slippage) &middot; Assumes ${AVV_PRICE} AVV price, {SLIPPAGE * 100}% slippage
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
