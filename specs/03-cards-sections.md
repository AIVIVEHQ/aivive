# Phase 3: Card & Section Enhancements

Apply warm glass treatment and interactive effects across all card-based sections.

## 3.1 Mouse-tracking spotlight (reusable pattern)

Create a reusable hook or inline handler for card spotlight:

```tsx
const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  e.currentTarget.style.setProperty('--spotlight-x', `${x}%`);
  e.currentTarget.style.setProperty('--spotlight-y', `${y}%`);
};
```

Uses CSS custom properties directly on DOM — no React re-renders.

## 3.2 Files to modify

### `features-section.tsx`
- Add `glass-card` + mouse-tracking spotlight to each LayerCard
- Add `shimmer-border` to card containers
- Layer "03" (Network): add coral `status-dot-warm` next to title

### `how-it-works-section.tsx`
- Replace `bg-card` with `glass-card` on each card
- Add hover-lift with `var(--ease-organic)`
- Card "01" (Payments): add `border-t-2 border-amber/20` warm accent line

### `pricing-section.tsx`
- Add `glass-card` + `card-spotlight` to differentiator cards
- Add hover: `translate-y-[-2px]` with organic easing

### `integrations-section.tsx`
- Same glass-card treatment
- "AI Infrastructure" category: subtle amber halo behind it

### `developers-section.tsx`
- Code block header: add 2px gradient top border (aqua → coral/20 → transparent)
- Add grain overlay to code block background
- Tab active indicator: gradient aqua → transparent

### `metrics-section.tsx`
- Add `glass-card` to each metric cell
- Numbers: add subtle aqua text-shadow `0 0 40px oklch(0.902 0.152 174.5 / 0.15)`
- "Live" dot: change from `bg-green-500` to coral `status-dot-warm`

### `infrastructure-section.tsx`
- Add a subtle coral spotlight halo behind problem points column (very low opacity ~3%)
- Problem point dots: mostly aqua, last one (settlement) uses coral

## Visual Result

Cards feel like "warm glass panels" — translucent with subtle internal light. Mouse movement reveals aqua spotlight inside. Shimmer borders add life. Warm accents appear sparingly at payment/settlement touchpoints.
