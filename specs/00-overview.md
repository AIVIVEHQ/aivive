# AIVIVE Landing Page Visual Enhancement - Overview

## Context

Current landing page only uses aqua green (#4FFFD8) as accent color. Coral (#FF8A5C) and amber/warm yellow are defined in CSS but never appear in any component. The page lacks gradient halos, warm glass effects, and interactive card behaviors. Client wants a more premium, "flashy" crypto-native feel while keeping aqua as dominant color.

## Key Principle: Gradients as Spotlights

Based on the Figma design spec: gradients should appear ONLY as localized spotlights, glowing orbs, and halos in the atmosphere layer. Text and buttons stay on solid backgrounds. Never use flat full-width gradients.

## 4-Phase Plan

| Phase | Scope | Files |
|-------|-------|-------|
| [Phase 1](./01-foundation.md) | CSS tokens, gradients, glows, fonts | `app/globals.css`, `app/layout.tsx` |
| [Phase 2](./02-hero.md) | Hero section enhancement | `hero-section.tsx` |
| [Phase 3](./03-cards-sections.md) | Card effects + section enhancements | 8 component files |
| [Phase 4](./04-warm-accents.md) | Subtle warm accents on 3D, nav, footer | 4 component files |

## Color System

```
Background:    #0F1816  (--ink-900, unchanged)
Primary aqua:  #4FFFD8  (--aqua-500, dominant)
Active aqua:   #1FE6B8  (--aqua-600)
Deep aqua:     #0E9E80  (--aqua-700)
Coral accent:  #FF8A5C  (--coral-500, subtle warm accent)
Amber accent:  #FFD36A  (NEW --amber-400, warm yellow highlight)
Warm light:    #FFC48A  (NEW --warm-light, evening glow)
```

Aqua = 85% visual weight, coral/amber = 15% max.

## Constraints

- NO violet/purple
- NO full-width rainbow gradients
- NO bounce easing (use organic: cubic-bezier(0.2, 0.8, 0.2, 1))
- Background stays #0F1816
- Keep existing 3D animations (sphere, tetrahedron, wave)
- Serif font ONLY for hero display headline
