# Portfolio Analytics Dashboard — Claude Code Instructions

## Project Overview
A personal portfolio analytics dashboard for tracking investments, performance, and financial goals, focused on the Indian market. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Recharts. Features a world-class fintech UI inspired by Zerodha Kite and Groww, with Indian Rupee (₹) currency, glassmorphism effects, and advanced data visualization.

## Tech Stack
- **Framework**: Next.js 14 (App Router, no `pages/` dir)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS v3 — no inline styles, use utility classes only
- **Charts**: Recharts (with custom gradients and tooltips)
- **Icons**: lucide-react
- **UI Primitives**: Radix UI (@radix-ui/react-*)
- **Deployment**: Vercel (run `vercel --prod` to deploy)

## Design System (Updated for INR & Fintech UI)
- **Background**: `#0A0F1E` (deep navy)
- **Surface**: `#111827` (cards/panels)
- **Surface-2**: `#1F2937` (hover states, borders)
- **Accent**: `#6366F1` (indigo — primary CTA, highlights)
- **Accent-2**: `#10B981` (emerald — gains, positive)
- **Danger**: `#EF4444` (red — losses, negative)
- **Text-primary**: `#F9FAFB`
- **Text-muted**: `#6B7280`
- **Chart Background**: `#0D1117` (dark chart background)
- **Glassmorphism**: `rgba(255,255,255,0.03)` background with `rgba(255,255,255,0.08)` border and `backdrop-filter: blur(20px)`
- **Gradients**: 
  - Sidebar: from `#0D0D0D` to `#1A1A2E`
  - Active nav items: indigo pill background
  - Chart fills: indigo to transparent gradient
  - Card borders: colored tops (indigo, emerald, amber)

Apply these using Tailwind's arbitrary values, e.g. `bg-[#0A0F1E]` or via CSS variables in `globals.css`.

## Folder Structure
```
src/
  app/              → Next.js App Router pages
    layout.tsx      → Root layout (fonts, metadata)
    page.tsx        → Dashboard home
    portfolio/      → Portfolio detail view
      page.tsx      → Holdings table with sorting/search
    watchlist/      → Watchlist page
      page.tsx      → Stock cards grid with add functionality
  components/
    ui/             → Reusable primitives (Button, Card, Badge, etc.)
    charts/         → Chart wrappers (AreaChart, DonutChart, etc.)
    dashboard/      → Dashboard-specific widgets
      Sidebar.tsx   → Enhanced sidebar with gradient and user card
      NetWorthCard.tsx → Glassmorphism net worth display
      HoldingsPreviewTable.tsx → Top 5 holdings preview
  hooks/            → Custom React hooks
  lib/
    utils.ts        → cn(), formatCurrency() (INR), formatPercent(), gainLossColor()
    mockData.ts     → All mock data (Indian stocks, INR values)
  styles/
    globals.css     → CSS variables + base styles (updated for fintech UI)
```

## Current Status (What's Been Built)
✅ **Dashboard** — net worth card, daily P&L, allocation pie chart, performance area chart with 1W/1M/3M/1Y toggle, holdings preview table
✅ **Holdings Table** — sortable table with ticker, shares, price, gain/loss, weight (in Portfolio page)
✅ **Watchlist** — add/remove tickers, show price + % change (in Watchlist page with stock cards)
✅ **Performance Charts** — 1W / 1M / 3M / 1Y toggle, area chart with tooltip and gradient fill
✅ **Asset Allocation** — donut chart by sector/asset class with center value display
✅ **Transactions Log** — basic structure ready (to be enhanced in future)
✅ **UI Enhancements** — Glassmorphism cards, micro-interactions, responsive design, Indian Rupee formatting

## Component Conventions
- Every component is a named export, not default export (except pages)
- Use `cn()` from `lib/utils.ts` for conditional class merging
- No `any` types — define interfaces in the same file or a `types.ts`
- All monetary values formatted via `formatCurrency(value, 'INR')` (Indian Rupees)
- Use Indian number formatting: lakhs (L) and crores (Cr) for large values
- Gains shown in emerald (`#10B981`), losses in red (`#EF4444`), using conditional classes
- Use `"use client"` directive for components that use React hooks (useState, useEffect)
- Follow glassmorphism styling: `bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl`
- Add hover effects: `hover:scale-105 transition-transform duration-300` on interactive cards
- Use proper weight hierarchy with Inter font family

## Data Layer
- All data is mock for now — import from `lib/mockData.ts`
- Mock data uses realistic Indian ticker symbols: RELIANCE, TCS, INFY, HDFC, ICICIBANK, WIPRO, BAJFINANCE, ADANIENT, etc.
- All prices in Indian Rupees (₹) with realistic values:
  - Stocks: ₹400-₹7,000 range
  - Net worth: ₹8,00,000 to ₹15,00,000 range (currently ~₹9.1L)
  - Format large numbers Indian style: ₹8.4L, ₹1.2Cr
- Mock data includes:
  - Holdings array with 8 Indian stocks
  - Performance data series for 1W, 1M, 3M, 1Y periods
  - Watchlist array with 5 Indian stocks
  - Helper functions for calculating values, gains, percentages
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
- Do not forget to use `"use client"` for components with hooks
- Do not bypass the design system — use the defined tokens and conventions
- Do not use USD currency — all values must be in INR (₹) for this project