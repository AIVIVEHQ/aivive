# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Aivive (AVV) landing page — a Next.js 16 single-page website for a Solana-based AI + Social protocol. The project has a companion knowledge base in `AIVEVE/` (git submodule) containing the brand wiki, design system SSOT, and project documentation.

## Commands

- `pnpm dev` — Start dev server
- `pnpm build` — Production build
- `pnpm lint` — Run ESLint

## Architecture

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS v4 (no `tailwind.config.ts` — uses `@theme inline` in `app/globals.css`)
- **UI Components**: shadcn/ui (New York style, via `components.json`)
- **3D**: Three.js + React Three Fiber (animated backgrounds)
- **Fonts**: Instrument Sans (body), Instrument Serif (display headings), JetBrains Mono (code)

### Key Directories

- `app/` — Single page (`page.tsx`) assembling landing sections, `globals.css` is the **active** stylesheet
- `components/landing/` — 16 section components composing the landing page (hero, features, pricing, etc.)
- `components/ui/` — 56 shadcn/ui primitives
- `lib/utils.ts` — `cn()` class merge utility
- `hooks/` — `use-mobile.ts`, `use-toast.ts`
- `AIVEVE/` — Git submodule: project wiki and brand documentation

### Page Composition

`app/page.tsx` renders sections in order: Navigation > Hero > Infrastructure > Features > HowItWorks > Developers > Pricing > Integrations > CTA > Footer. All sections are client components with scroll-triggered fade-in animations.

### Landing Component Pattern

Each section follows: `"use client"` directive, `isVisible` state toggled on mount via `useEffect`, Tailwind transition classes conditionally applied. Background decorations (spheres, grids) are absolutely positioned.

## Design System

The authoritative design tokens live in `app/globals.css`. Dark-mode-only, OKLCH color space.

### Color Palette

- **Aqua** (primary): aqua-200 `#A8FFEB` → aqua-500 `#4FFFD8` → aqua-900 `#06584A`
- **Coral** (accent/destructive): coral-300 `#FFC9AE` → coral-500 `#FF8A5C`
- **Ink** (neutrals, green undertone): ink-0 `#FFFFFF` → ink-900 `#0F1815`

### Token Mapping

```
--primary       → aqua-500    (buttons, links, ring, pulse-glow)
--destructive   → coral-500   (warnings, warm accents)
--background    → ink-900     (page background)
--foreground    → ink-100     (main text)
--card          → ink-800     (card/popover surfaces)
--border/input  → ink-700     (borders, input outlines)
--muted-fg      → ink-500     (secondary text)
```

### CSS Custom Properties

All color tokens defined as OKLCH variables in `:root` of `app/globals.css`. Tailwind consumes them via `@theme inline` mappings (e.g., `--color-primary: var(--primary)`).

### Custom Utilities (app/globals.css)

`font-display` (serif), `text-stroke`, `marquee`/`marquee-reverse`, `line-reveal`, `hover-lift`, `letter-spin`, `animate-char-in`, `noise-overlay`, `border-sketch`, `pulse-glow` (aqua glow animation).

### Reference

`AIVEVE/wiki/design/aivive-design.md` contains the brand wiki design spec. It may diverge from the actual code — when in conflict, **`app/globals.css` is the source of truth**.

## Conventions

- Path alias: `@/` maps to project root
- Import UI components from `@/components/ui/`
- Use `cn()` from `@/lib/utils` for conditional class merging
- Icons: Lucide React
- No separate Tailwind config file — all theme tokens live in `app/globals.css`
