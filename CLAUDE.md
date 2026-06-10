# Portfolio Analytics Dashboard — Claude Code Instructions

## Project Overview
A personal portfolio analytics dashboard for tracking investments, performance, and financial goals.
Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Recharts.

## Tech Stack
- **Framework**: Next.js 14 (App Router, no `pages/` dir)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3 — no inline styles, use utility classes only
- **Charts**: Recharts
- **Icons**: lucide-react
- **UI Primitives**: Radix UI (@radix-ui/react-*)
- **Deployment**: Vercel (run `vercel --prod` to deploy)

## Design System
- **Background**: `#0A0F1E` (deep navy)
- **Surface**: `#111827` (cards/panels)
- **Surface-2**: `#1F2937` (hover states, borders)
- **Accent**: `#6366F1` (indigo — primary CTA, highlights)
- **Accent-2**: `#10B981` (emerald — gains, positive)
- **Danger**: `#EF4444` (red — losses, negative)
- **Text-primary**: `#F9FAFB`
- **Text-muted**: `#6B7280`

Apply these using Tailwind's arbitrary values, e.g. `bg-[#0A0F1E]` or via CSS variables in `globals.css`.

## Folder Structure
```
src/
  app/              → Next.js App Router pages
    layout.tsx      → Root layout (fonts, metadata)
    page.tsx        → Dashboard home
    portfolio/      → Portfolio detail view
    watchlist/      → Watchlist page
  components/
    ui/             → Reusable primitives (Button, Card, Badge, etc.)
    charts/         → Chart wrappers (AreaChart, PieChart, etc.)
    dashboard/      → Dashboard-specific widgets
  hooks/            → Custom React hooks
  lib/
    utils.ts        → cn(), formatCurrency(), formatPercent()
    mockData.ts     → All mock data lives here
  styles/
    globals.css     → CSS variables + base styles
```

## Key Features to Build (in order)
1. **Dashboard** — net worth card, daily P&L, allocation pie chart, performance area chart
2. **Holdings Table** — sortable table with ticker, shares, price, gain/loss, weight
3. **Watchlist** — add/remove tickers, show price + % change
4. **Performance Charts** — 1W / 1M / 3M / 1Y toggle, area chart with tooltip
5. **Asset Allocation** — donut chart by sector/asset class
6. **Transactions Log** — list of buy/sell entries with filters

## Component Conventions
- Every component is a named export, not default export (except pages)
- Use `cn()` from `lib/utils.ts` for conditional class merging
- No `any` types — define interfaces in the same file or a `types.ts`
- All monetary values formatted via `formatCurrency(value, 'USD')`
- Gains shown in emerald, losses in red, using conditional classes

## Data Layer
- All data is mock for now — import from `lib/mockData.ts`
- Mock data should look realistic: real ticker symbols (AAPL, MSFT, NVDA, BTC, ETH, etc.)
- When replacing mock data, create a `/api/` route in Next.js App Router

## Deployment
- Platform: **Vercel**
- Command: `vercel --prod` (Vercel CLI must be installed)
- Environment variables go in `.env.local` (never commit this file)
- `vercel.json` is already scaffolded

## Commands Claude Code Should Know
```bash
npm install          # install deps
npm run dev          # start dev server on :3000
npm run build        # production build
vercel --prod        # deploy to Vercel
```

## What NOT to Do
- Do not use the `pages/` directory — App Router only
- Do not use CSS modules — Tailwind only
- Do not add Redux or Zustand — React state + context is enough
- Do not use `fetch` in client components — use server components or hooks
- Do not hardcode colors outside the design system above
