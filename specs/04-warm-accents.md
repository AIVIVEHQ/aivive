# Phase 4: Subtle Warm Accents (Polish Pass)

Final pass — add coral/amber warm touches at <15% visual weight.

## 4.1 3D Sphere warm core

**File: `animated-sphere.tsx`**

Add 3-5 points near the sphere center rendered in `rgba(255, 138, 92, 0.12)` (coral) instead of aqua. Only the deepest z-depth points get a warm tint, creating a faint warm inner glow. Very subtle — barely visible.

## 4.2 Navigation warm touches

**File: `navigation.tsx`**

- Scrolled state bg: add the faintest coral edge at 2-3% opacity to the backdrop
- "Join Waitlist" button: add `hover:shadow-[var(--glow-aqua)]`
- No other changes — nav stays clean

## 4.3 CTA section dual spotlight

**File: `cta-section.tsx`**

- Existing aqua spotlight tracks mouse — keep this
- Add a FIXED coral halo in the bottom-right corner (`w-[250px] h-[250px]` blurred, 5% opacity)
- Add `shimmer-border` to the outer container
- "COMING SOON" dot: change to `status-dot-warm` (coral)

## 4.4 Footer warm touches

**File: `footer-section.tsx`**

- "Hiring" badge: change to coral-tinted style (`bg-coral-500/15 text-coral-300 border-coral-500/20`)
- Add a subtle warm halo behind the brand column (very faint, 2% opacity)
- Wave animation stays aqua

## 4.5 Section divider accents

Between major sections, the gradient halos create natural warm/cool transitions:
- Hero → Infrastructure: aqua dominant
- Features → How It Works: aqua with tiny coral glow at intersection
- CTA: aqua + coral spotlight balance
- Footer: aqua wave + coral hiring badge

## Visual Result

Warm accents appear as:
1. Glowing orbs in the atmosphere layer (behind content)
2. Status indicator dots (coral pulsing)
3. Tiny accent lines on payment/settlement cards
4. Subtle glow on hover interactions
5. The faintest warm core in the 3D sphere

The page still reads as "aqua/green" at first glance, but has warmth and depth that makes it feel alive and premium.
