# Phase 1: Foundation (CSS Tokens + Fonts)

Must complete first — all other phases depend on these tokens.

## File: `app/globals.css`

### 1.1 Add warm color tokens (in `:root`, after coral variables)

```css
--amber-300: oklch(0.900 0.100 85);
--amber-400: oklch(0.870 0.130 85);    /* #FFD36A */
--amber-500: oklch(0.840 0.115 70);
--warm-light: oklch(0.850 0.085 60);   /* #FFC48A */
```

### 1.2 Add gradient spotlight tokens

These are the "spotlight/halo" gradients per Figma design spec — localized glows, not flat fills.

```css
/* Aqua spotlight — hero top-left, card hover */
--grad-spot-aqua: radial-gradient(600px circle, oklch(0.902 0.152 174.5 / 0.12), transparent 70%);

/* Coral spotlight — hero bottom-right, subtle warm presence */
--grad-spot-coral: radial-gradient(400px circle, oklch(0.753 0.155 41.6 / 0.06), transparent 70%);

/* Amber spotlight — settlement/payment indicators */
--grad-spot-amber: radial-gradient(350px circle, oklch(0.870 0.130 85 / 0.05), transparent 70%);

/* Glass card internal gradient */
--grad-glass: linear-gradient(135deg, oklch(0.241 0.015 174.7 / 0.6), oklch(0.199 0.015 172.2 / 0.4));
```

### 1.3 Add glow box-shadow tokens

```css
--glow-aqua: 0 0 30px oklch(0.902 0.152 174.5 / 0.3);
--glow-coral: 0 0 20px oklch(0.753 0.155 41.6 / 0.15);
--glow-amber: 0 0 20px oklch(0.870 0.130 85 / 0.12);
```

### 1.4 Add motion tokens

```css
--ease-organic: cubic-bezier(0.2, 0.8, 0.2, 1);
--ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
```

### 1.5 Expose in `@theme inline`

```css
--color-coral: var(--coral-500);
--color-amber: var(--amber-400);
--color-warm-light: var(--warm-light);
```

### 1.6 Fix bounce easing

Replace `cubic-bezier(0.34, 1.56, 0.64, 1)` in `.hover-lift` and `.letter-spin` with `var(--ease-organic)`.

### 1.7 New utility classes

```css
/* Warm glass card */
.glass-card {
  background: var(--grad-glass);
  backdrop-filter: blur(12px);
  border: 1px solid oklch(0.902 0.152 174.5 / 0.1);
  transition: border-color 400ms var(--ease-organic),
              box-shadow 400ms var(--ease-organic);
}
.glass-card:hover {
  border-color: oklch(0.902 0.152 174.5 / 0.2);
  box-shadow: var(--glow-aqua);
}

/* Shimmer border — animated aqua-to-coral gradient edge */
.shimmer-border { ... }
@keyframes shimmer-sweep { ... }

/* Grain overlay (4% noise, mix-blend overlay) */
.grain-overlay { ... }

/* Status dot — warm coral pulsing indicator */
.status-dot-warm { ... }
```

### 1.8 Font swap

**File: `app/layout.tsx`**

Change from Instrument Sans + JetBrains Mono to Geist Sans + Geist Mono.
Keep Instrument Serif for `--font-display` (hero headline only).

```tsx
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Instrument_Serif } from 'next/font/google'
```

Update `@theme inline` font stacks accordingly.

## Verification

- `pnpm build` passes with no errors
- Fonts render correctly at localhost:3000
- New CSS variables accessible via DevTools
- No visual regression (tokens added but not yet consumed by components)
