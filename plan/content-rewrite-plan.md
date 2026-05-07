# Aivive Landing Page Content Rewrite Plan

> Date: 2026-05-07
> Branch: feat/visual-enhancement
> Status: Executing

## Problem

The current landing page describes a **fake product** — "crypto execution layer for autonomous agents" (Agent Passport, Execution Controls, Stablecoin Settlement). This has nothing to do with what Aivive actually is.

**Aivive is the first Recursive AI Protocol (RAP)** — an AI image generation social feed (Civitai meets Pinterest) where platform revenue automatically buys back and burns $AVV tokens on Solana. "Use the product. Make the asset rarer."

## Source of Truth

All real content comes from `/AIVEVE/` knowledge base:
- `outputs/whitepaper/` — 12-chapter whitepaper (product, architecture, tokenomics, roadmap)
- `outputs/copy/` — Official bios, blurbs, pitch decks
- `outputs/deck/aivive-deck-outline.md` — Presentation structure
- `wiki/design/aivive-design.md` — Design system SSOT (note: uses violet primary, current code uses aqua — code wins per CLAUDE.md)

## Execution Plan

### Phase 1: Hero & Navigation
**Files:** `navigation.tsx`, `hero-section.tsx`

Navigation links: Network / Agent Layer / Payments / Ecosystem
-> Protocol / Product / Token / Ecosystem

Hero changes:
| Element | Current (fake) | New (real) |
|---|---|---|
| Badge | "AIVIVE TESTNET COMING SOON" | "LAUNCHING SUMMER 2026" |
| Status dots | agent online / policy verified / settlement ready | feed live / burn active / creators building |
| H1 | "The crypto execution layer for autonomous agents" | "The first Recursive AI Protocol" |
| Subtitle | Agent identity, permissions, stablecoin settlement | AI image feed where every dollar of revenue burns $AVV on Solana. Use the product. Make the asset rarer. |
| CTA primary | Join Waitlist | Join Waitlist (keep) |
| CTA secondary | Read the Litepaper | Read Whitepaper |
| Trust strip | Agent-native identity / Stablecoin settlement / Programmable permissions / Verifiable execution / EVM-compatible | Solana native / USDC payments / Weekly burn cycle / CertiK audited / 55% to community |

### Phase 2: Infrastructure (Problem Statement)
**File:** `infrastructure-section.tsx`

| Element | Current (fake) | New (real) |
|---|---|---|
| Label | "WHY AIVIVE" | "THE PROBLEM" |
| H2 | "Agents are ready to act. Crypto rails are not." | "AI made content infinite. Nothing stayed scarce." |
| Description | Agents need identity/permissions/audit | AI image market hits $50B by 2027, but entire surplus flows to centralized subscription platforms. Zero value accrues to creative users or open networks. |
| Problem points (4) | Agent scoped access / User approval / Builder payment rails / Protocol verifiable intent | 3 failed patterns: (1) Subscription SaaS — predictable for platforms, nothing for users (2) Token-as-fee — adds friction, forces speculation (3) Token-as-governance — mostly speculative, no price floor |
| Solution hint | (none) | "Aivive introduces a fourth pattern: a programmable share of platform revenue is automatically routed into permanent on-chain destruction of $AVV." |

### Phase 3: Features (3 Layers → 3 Segments of RAP Cycle)
**File:** `features-section.tsx`

Header: "Three layers. One execution network."
-> "Three segments. One recursive loop."
Description: Connect agent identity...
-> "Every dollar spent on AI image generation flows through a verifiable on-chain cycle that permanently reduces $AVV supply."

| Layer | Current (fake) | New (real) |
|---|---|---|
| 01 | **Agent Passport** — Verifiable identity for autonomous agents | **User Payment** — USDC on Base mainnet. Privy embedded wallet. Verifiable on BaseScan. Three tiers: Standard ($0.003), HD ($0.025), Ultra ($0.04+). |
| 02 | **Execution Controls** — Rules before transactions | **Cross-Chain Bridge** — Weekly cron. Safe multisig triggers Circle CCTP burn-mint. USDC destroyed on Base, minted on Solana in ~15 min. Zero trust bridge. |
| 03 | **AIVIVE Network** — Stablecoin-native settlement | **Buyback & Burn** — Squads multisig executes Jupiter swap USDC->AVV, then SPL Token Burn. Verifiable on Solscan. Dashboard at aivive.ai/burn. |

### Phase 4: How It Works (Use Cases → Product Surfaces)
**File:** `how-it-works-section.tsx`

Header: "Built for agentic crypto workflows"
-> "A taste-first AI creative platform"

6 use cases → 6 product features:
| # | Current (fake) | New (real) |
|---|---|---|
| 01 | Agentic Payments | **/feed** — Trending/Following/New columns of AI-generated visual content. Discover taste, not just images. |
| 02 | Autonomous Trading Operations | **/studio** — Prompt input, style presets, aspect ratio, three-tier model selection. From idea to image in seconds. |
| 03 | Onchain Commerce | **Remix** — One-click cultural transmission. See something you love, remix it with your own twist. |
| 04 | DAO & Treasury Automation | **Creator Profile** — Reputation built on creative footprint: prompts shipped, posts liked, followers earned. |
| 05 | DeFi Workflow Execution | **Wallet** — Credits balance, USDC balance, top-up flow. Transparent ledger, no hidden fees. |
| 06 | Machine-to-Machine Settlement | **Burn Dashboard** — Real-time metrics: tokens burned, USDC inflow, burn velocity. Verifiable on Solscan + Dune. |

### Phase 5: Developers (SDK → Tech Stack / Builder Entry)
**File:** `developers-section.tsx`

Header: "Give your agents a wallet they can use"
-> "Built with the best of crypto and AI"

Replace fake @aivive/sdk code examples with real tech stack showcase:
- Tab 1 "Stack": Next.js 16 + React 19 + Tailwind + Vercel
- Tab 2 "Payments": Privy embedded wallet + Safe multisig + Circle CCTP
- Tab 3 "Token": Solana SPL + Squads multisig + Jupiter + SPL Burn

Features grid:
| Current | New |
|---|---|
| SDKs for agent identity | Privy dual-chain wallets |
| Smart account modules | Circle CCTP cross-chain |
| Stablecoin primitives | Jupiter DEX aggregation |
| Webhooks & audit logs | On-chain verification |

### Phase 6: Pricing → Tokenomics
**File:** `pricing-section.tsx`

Header: "Trust infrastructure for autonomous value movement"
-> "Token economics designed for deflation"

Replace 6 differentiators with token stats + allocation:
- Key stats cards: 10B total supply / 55% community allocation / 10% team (below median) / No private round, no IDO / CertiK audited / Squads 2-of-3 multisig
- Or a mini allocation table: Team 10% / Liquidity 18% / MM 5% / Ecosystem 30% / Airdrop 25% / Treasury 10% / Advisors 2%

### Phase 7: Integrations → Real Ecosystem
**File:** `integrations-section.tsx`

Header: keep "Ecosystem" label, update heading to "Powered by battle-tested infrastructure"

| Current (generic) | New (real) |
|---|---|
| Agent Frameworks: AutoGPT, LangChain, CrewAI | AI Models: FLUX.1, gpt-image-2, Imagen 4 Ultra |
| Wallets: MetaMask, Rainbow, Safe | Wallets: Privy, Safe (Base), Squads (Solana) |
| Stablecoin Issuers: Circle, Tether, MakerDAO | Stablecoins: USDC via Circle CCTP |
| Payment Providers: Stripe, Coinbase, MoonPay | Payments: Base mainnet, USDC native |
| Data Networks: The Graph, Chainlink, Pyth | Analytics: Dune Analytics, Solscan, BaseScan |
| DeFi Protocols: Uniswap, Aave, Compound | DeFi: Jupiter, Raydium |
| AI Infrastructure: OpenAI, Anthropic, Replicate | AI Providers: fal.ai, OpenAI, Replicate |
| Developer Platforms: Vercel, Railway, Alchemy | Infrastructure: Vercel, Supabase, Cloudflare R2 |

### Phase 8: Metrics, CTA, Footer
**Files:** `metrics-section.tsx`, `cta-section.tsx`, `footer-section.tsx`

**Metrics** — Replace generic stats with product-relevant projected metrics:
- Tokens Burned (cumulative) / Weekly Burn Revenue / Active Creators / Images Generated

**CTA** — Update messaging:
- H2: "Build the agent economy with AIVIVE" -> "Join the creative economy"
- Description: -> "The AI feed that pays for itself. Launching summer 2026."
- Badge: "COMING SOON" -> "SUMMER 2026"

**Footer**:
- Tagline: "The crypto execution layer for autonomous agents" -> "The first Recursive AI Protocol. AI that gives."
- Product links: Network / Agent Passport / Payments / Explorer / App -> Feed / Studio / Burn Dashboard / Whitepaper / App
- Developer links: Docs / SDK / GitHub / Status / Faucet -> Docs / GitHub / Dune Dashboard / BaseScan / Solscan
- Social links: Add real URLs -> x.com/AIVIVEHQ, t.me/AIVIVEHQ
- Company links: Keep About / Blog / Careers / Brand Kit / Contact

### Phase 9: Build & Push
- `pnpm build` to verify
- Commit with descriptive message
- Push to remote

## Content Sources Reference

| Section | Primary Source |
|---|---|
| Hero | `outputs/copy/blurb-official.md`, `outputs/copy/bio-pack.md` |
| Problem | `outputs/whitepaper/02-vision.md`, `outputs/medium/01-where-does-the-value-go.md` |
| RAP Cycle | `outputs/whitepaper/03-network.md`, `outputs/medium/02-what-recursive-means.md` |
| Product | `outputs/whitepaper/04-product.md` |
| Tech Stack | `outputs/whitepaper/05-architecture.md` |
| Tokenomics | `outputs/whitepaper/06-tokenomics.md`, `outputs/whitepaper/07-token-utility.md` |
| Ecosystem | `outputs/whitepaper/05-architecture.md` |
| Roadmap | `outputs/whitepaper/08-roadmap.md` |
| Team | `outputs/whitepaper/09-team.md` |
| Tone | `outputs/copy/bio-pack.md` — "Alive, Warm, Sharp" |
