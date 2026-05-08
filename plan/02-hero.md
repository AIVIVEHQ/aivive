# Phase 2: Hero Section Enhancement

Most visible section — highest impact.

## File: `components/landing/hero-section.tsx`

### 2.1 Gradient halo backgrounds (spotlight style)

Add two blurred orbs as absolutely-positioned divs, BEFORE the grid lines:

```
Aqua orb:  top-left area, w-[500px] h-[500px], blur-[120px], aqua-500 at 10% opacity
Coral orb: bottom-right area, w-[300px] h-[300px], blur-[100px], coral-500 at 5% opacity
```

These create the "spotlight" atmosphere shown in the Figma design — localized warm glass feel, not a flat gradient.

### 2.2 Grain overlay

Add `grain-overlay` class to the hero `<section>` element for 4% noise texture.

### 2.3 Protocol status strip

Below the eyebrow "TESTNET COMING SOON", add a small live status strip in Geist Mono:

```
[coral dot] agent online  |  [aqua dot] policy verified  |  [amber dot] settlement ready
```

Uses `status-dot-warm` for the coral dot, normal `animate-pulse` for aqua.

### 2.4 Animated pulse line

A thin horizontal line below the headline, animated with a sweep:

```css
@keyframes pulse-sweep {
  0% { transform: translateX(-100%); opacity: 0; }
  50% { opacity: 1; }
  100% { transform: translateX(100%); opacity: 0; }
}
```

Gradient: transparent → aqua-500 → subtle coral-500/20 → transparent.
Duration: ~3s, infinite loop.

### 2.5 CTA button glow

- Primary button: add `hover:shadow-[0_0_30px_oklch(0.902_0.152_174.5/0.3)]`
- Outline button: add subtle warm border glow on hover: `hover:shadow-[0_0_20px_oklch(0.753_0.155_41.6/0.1)]`

### 2.6 Keep existing AnimatedSphere

The 3D sphere stays as-is. The gradient halos layer BEHIND it for depth.

## Visual Result

The hero should feel like looking into a warm, dark room lit by aqua and coral spotlights, with grain texture adding depth. The sphere floats in this atmosphere. Subtle warm amber appears only in the status strip indicators.
