# Portfolio Analytics Dashboard

A personal investment portfolio tracker with analytics, charts, and performance tracking.

## Stack
Next.js 14 · TypeScript · Tailwind CSS · Recharts · Vercel

---

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy

```bash
npm install -g vercel
vercel login
vercel --prod
```

---

## Claude Code Prompts (copy-paste these in order)

Use these prompts inside Claude Code to build the full site fast:

### Step 1 — Sidebar + Layout
```
Build a sidebar navigation layout for the portfolio analytics dashboard.
Sidebar should have: Dashboard, Portfolio, Watchlist, Transactions, Settings links.
Use the design system from CLAUDE.md. Make it collapsible on mobile.
Wrap the root layout with this sidebar so all pages use it.
```

### Step 2 — Dashboard Page
```
Build the main dashboard page (src/app/page.tsx).
Include:
- Net Worth card (total value + daily change with green/red indicator)
- Performance area chart with 1W/1M/3M/1Y toggle (use Recharts AreaChart)
- Asset allocation donut chart (by asset class)
- Top movers strip (top 3 gainers and losers today)
Use data from src/lib/mockData.ts. Follow the design tokens in CLAUDE.md.
```

### Step 3 — Portfolio Holdings Table
```
Build src/app/portfolio/page.tsx.
Show a sortable holdings table with columns:
Ticker | Name | Shares | Avg Cost | Current Price | Market Value | Gain/Loss | Gain % | Day Change | Weight %
Color gains green (text-emerald-400) and losses red (text-red-400).
Add a summary row at the bottom. Sort by clicking column headers.
```

### Step 4 — Watchlist Page
```
Build src/app/watchlist/page.tsx.
Show the watchlist items as cards with: ticker, name, current price, day change %.
Add an "Add to Watchlist" input with a fake submit handler.
Add a remove button on each card.
```

### Step 5 — Transactions Page
```
Build src/app/transactions/page.tsx.
Show transactions as a filterable table (filter by BUY/SELL/ALL).
Columns: Date | Ticker | Type | Shares | Price | Total | Fee
BUY badge green, SELL badge red.
```

### Step 6 — Polish + Deploy
```
Review all pages and:
1. Make sure the design is consistent with CLAUDE.md tokens
2. Add loading skeletons to the holdings table and charts
3. Make all pages fully responsive (mobile-first)
4. Run `npm run build` to check for errors
5. Fix any TypeScript errors
6. Run `vercel --prod` to deploy
```

---

## File Structure

```
src/
  app/
    layout.tsx          ← root layout (done)
    page.tsx            ← dashboard
    portfolio/page.tsx  ← holdings table
    watchlist/page.tsx  ← watchlist
    transactions/page.tsx
  lib/
    utils.ts            ← cn(), formatCurrency(), etc. (done)
    mockData.ts         ← all mock data (done)
  styles/
    globals.css         ← CSS variables + base (done)
```
