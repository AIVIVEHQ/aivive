# Optimized Prompt for Landing Page Enhancement

Below is the refined prompt that fixes the issues with the original. Key changes:
- Removed violet/purple references entirely
- Emphasized "gradients as spotlights" (per Figma design spec)
- Added specific amber/warm-yellow tokens (#FFD36A, #FFC48A)
- Kept Instrument Serif (instead of switching to IBM Plex Serif, since it's already loaded)
- More precise gradient descriptions — radial spotlights, not linear fills
- Added specific file references for implementation

---

## Prompt

Enhance the AIVIVE landing page to feel more visually rich, premium, and alive while keeping aqua green as the dominant brand color.

### Brand rules

- Aqua (#4FFFD8) is the dominant color (~85% accent weight)
- Coral (#FF8A5C), amber (#FFD36A), warm light (#FFC48A) are subtle warm accents (~15%)
- Background: #0F1816 (dark ink-green)
- NO violet/purple. NO flat full-width gradients. NO bounce easing
- Gradients = localized spotlights, glowing orbs, glass reflections — never flat fills

### What to add

**1. CSS Foundation (`app/globals.css`)**
- Add `--amber-400: oklch(0.870 0.130 85)` and `--warm-light: oklch(0.850 0.085 60)`
- Add radial gradient spotlights: `--grad-spot-aqua`, `--grad-spot-coral`, `--grad-spot-amber`
- Add glow tokens: `--glow-aqua`, `--glow-coral`, `--glow-amber`
- Add motion: `--ease-organic: cubic-bezier(0.2, 0.8, 0.2, 1)`
- Add utility classes: `.glass-card`, `.shimmer-border`, `.grain-overlay`, `.status-dot-warm`
- Replace bounce easing in `.hover-lift` and `.letter-spin` with `var(--ease-organic)`

**2. Hero (`hero-section.tsx`)**
- Add two blurred gradient orbs behind content: large aqua spotlight top-left (10% opacity), small coral spotlight bottom-right (5% opacity)
- Add grain-overlay to the section (4% noise)
- Add protocol status strip below eyebrow: `[coral dot] agent online | [aqua dot] policy verified | [amber dot] settlement ready`
- Add horizontal pulse-sweep line below headline (aqua → faint coral → transparent)
- Primary CTA: add aqua glow on hover. Outline CTA: add faint warm glow on hover
- Keep the existing AnimatedSphere 3D canvas

**3. Cards (all card-based sections)**
- Replace `bg-card` with `.glass-card` (translucent warm glass, not flat dark)
- Add mouse-tracking spotlight using CSS custom properties (no React re-renders)
- Add `.shimmer-border` (animated aqua-to-coral gradient edge, 4s cycle)
- Add hover-lift with `var(--ease-organic)` easing
- Payment/settlement related items: add coral/amber accent (status dot or border-top)

**4. Warm accents (sparse)**
- 3D sphere: 3-5 deep-z points in coral rgba at 12% opacity (warm inner glow)
- Nav scrolled state: faintest coral edge at 2% opacity
- CTA section: fixed coral halo in bottom-right corner + shimmer border
- Footer "Hiring" badge: coral-tinted (`bg-coral-500/15 text-coral-300`)
- Metrics "Live" dot: change from green-500 to coral status-dot-warm

### Do not

- Do not make coral/amber equal to aqua in visual weight
- Do not use violet, purple, or generic blue
- Do not use full-width gradient backgrounds
- Do not add serif to body text (serif only for hero headline via `font-display`)
- Do not use bounce/overshoot easing
- Do not break existing 3D canvas animations
