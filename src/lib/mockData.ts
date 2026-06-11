import { generatePriceSeries } from "./utils";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Holding {
  id: string;
  ticker: string;
  name: string;
  sector: string;
  assetClass: "stock" | "crypto" | "etf" | "bond";
  shares: number;
  avgCost: number;
  currentPrice: number;
  previousClose: number;
  logoColor: string; // tailwind bg color for avatar
  alpha: number; // Alpha vs Nifty 50
  beta: number; // Beta vs Nifty 50
}

export interface Transaction {
  id: string;
  ticker: string;
  type: "BUY" | "SELL";
  shares: number;
  price: number;
  date: string;
  fee: number;
}

export interface WatchlistItem {
  ticker: string;
  name: string;
  currentPrice: number;
  previousClose: number;
  sector: string;
  week52High: number;
  week52Low: number;
}

// ─── Holdings ────────────────────────────────────────────────────────────────

export const holdings: Holding[] = [
  {
    id: "1",
    ticker: "RELIANCE",
    name: "Reliance Industries Ltd.",
    sector: "Energy",
    assetClass: "stock",
    shares: 42,
    avgCost: 2450.0,
    currentPrice: 2934.0,
    previousClose: 2910.0,
    logoColor: "bg-yellow-600",
    alpha: 1.2,
    beta: 0.95,
  },
  {
    id: "2",
    ticker: "TCS",
    name: "Tata Consultancy Services Ltd.",
    sector: "Technology",
    assetClass: "stock",
    shares: 15,
    avgCost: 3200.0,
    currentPrice: 3842.0,
    previousClose: 3810.0,
    logoColor: "bg-blue-600",
    alpha: 2.8,
    beta: 1.15,
  },
  {
    id: "3",
    ticker: "INFY",
    name: "Infosys Ltd.",
    sector: "Technology",
    assetClass: "stock",
    shares: 18,
    avgCost: 1450.0,
    currentPrice: 1685.0,
    previousClose: 1670.0,
    logoColor: "bg-green-600",
    alpha: 1.8,
    beta: 1.05,
  },
  {
    id: "4",
    ticker: "HDFC",
    name: "HDFC Bank Ltd.",
    sector: "Financial Services",
    assetClass: "stock",
    shares: 25,
    avgCost: 1520.0,
    currentPrice: 1675.0,
    previousClose: 1660.0,
    logoColor: "bg-purple-600",
    alpha: 0.8,
    beta: 1.25,
  },
  {
    id: "5",
    ticker: "ICICIBANK",
    name: "ICICI Bank Ltd.",
    sector: "Financial Services",
    assetClass: "stock",
    shares: 35,
    avgCost: 850.0,
    currentPrice: 945.0,
    previousClose: 935.0,
    logoColor: "bg-red-600",
    alpha: -0.5,
    beta: 1.35,
  },
  {
    id: "6",
    ticker: "WIPRO",
    name: "Wipro Ltd.",
    sector: "Technology",
    assetClass: "stock",
    shares: 50,
    avgCost: 420.0,
    currentPrice: 485.0,
    previousClose: 480.0,
    logoColor: "bg-indigo-600",
    alpha: 1.5,
    beta: 0.9,
  },
  {
    id: "7",
    ticker: "BAJFINANCE",
    name: "Bajaj Finance Ltd.",
    sector: "Financial Services",
    assetClass: "stock",
    shares: 12,
    avgCost: 6200.0,
    currentPrice: 6850.0,
    previousClose: 6800.0,
    logoColor: "bg-orange-600",
    alpha: 3.2,
    beta: 1.6,
  },
  {
    id: "8",
    ticker: "ADANIENT",
    name: "Adani Enterprises Ltd.",
    sector: "Metals & Mining",
    assetClass: "stock",
    shares: 20,
    avgCost: 1850.0,
    currentPrice: 2120.0,
    previousClose: 2100.0,
    logoColor: "bg-gray-800",
    alpha: -1.8,
    beta: 1.4,
  },
];

// ─── Derived helpers ──────────────────────────────────────────────────────────

export function getHoldingValue(h: Holding) {
  return h.shares * h.currentPrice;
}

export function getHoldingCost(h: Holding) {
  return h.shares * h.avgCost;
}

export function getHoldingGain(h: Holding) {
  return getHoldingValue(h) - getHoldingCost(h);
}

export function getHoldingGainPct(h: Holding) {
  return ((h.currentPrice - h.avgCost) / h.avgCost) * 100;
}

export function getDailyChange(h: Holding) {
  return (h.currentPrice - h.previousClose) * h.shares;
}

export const totalPortfolioValue = holdings.reduce(
  (sum, h) => sum + getHoldingValue(h),
  0
);

export const totalPortfolioCost = holdings.reduce(
  (sum, h) => sum + getHoldingCost(h),
  0
);

export const totalDailyChange = holdings.reduce(
  (sum, h) => sum + getDailyChange(h),
  0
);

// ─── Performance Chart Data ───────────────────────────────────────────────────

export const performanceData = {
  "1W": generatePriceSeries(totalPortfolioValue * 0.95, 7, 0.015),
  "1M": generatePriceSeries(totalPortfolioValue * 0.88, 30, 0.018),
  "3M": generatePriceSeries(totalPortfolioValue * 0.75, 90, 0.02),
  "1Y": generatePriceSeries(totalPortfolioValue * 0.55, 365, 0.022),
};

// ─── Allocation ────────────────────────────────────────────────────────────────

export function getAllocationByClass() {
  const map: Record<string, number> = {};
  for (const h of holdings) {
    map[h.assetClass] = (map[h.assetClass] ?? 0) + getHoldingValue(h);
  }
  return Object.entries(map).map(([name, value]) => ({
    name: name.toUpperCase(),
    value: Math.round(value),
  }));
}

export function getAllocationBySector() {
  const map: Record<string, number> = {};
  for (const h of holdings) {
    map[h.sector] = (map[h.sector] ?? 0) + getHoldingValue(h);
  }
  return Object.entries(map).map(([name, value]) => ({
    name,
    value: Math.round(value),
  }));
}

// ─── Watchlist ────────────────────────────────────────────────────────────────

export const watchlist: WatchlistItem[] = [
  { ticker: "MARUTI", name: "Maruti Suzuki India Ltd.", currentPrice: 10240, previousClose: 10150, sector: "Automotive", week52High: 11200, week52Low: 8900 },
  { ticker: "SUNPHARMA", name: "Sun Pharmaceutical Industries Ltd.", currentPrice: 1185, previousClose: 1175, sector: "Pharmaceuticals", week52High: 1350, week52Low: 980 },
  { ticker: "LT", name: "Larsen & Toubro Ltd.", currentPrice: 3250, previousClose: 3220, sector: "Construction", week52High: 3650, week52Low: 2750 },
  { ticker: "ASIANPAINT", name: "Asian Paints Ltd.", currentPrice: 3120, previousClose: 3100, sector: "Paints", week52High: 3500, week52Low: 2600 },
  { ticker: "NESTLEIND", name: "Nestle India Ltd.", currentPrice: 24800, previousClose: 24600, sector: "FMCG", week52High: 27000, week52Low: 20500 },
];

// ─── Transactions ──────────────────────────────────────────────────────────────
export const transactions: Transaction[] = [
  {
    id: "1",
    ticker: "RELIANCE",
    type: "BUY",
    shares: 10,
    price: 2450.0,
    date: "2026-05-15",
    fee: 25.0,
  },
  {
    id: "2",
    ticker: "TCS",
    type: "BUY",
    shares: 5,
    price: 3200.0,
    date: "2026-05-20",
    fee: 15.0,
  },
  {
    id: "3",
    ticker: "INFY",
    type: "BUY",
    shares: 8,
    price: 1450.0,
    date: "2026-06-01",
    fee: 20.0,
  },
  {
    id: "4",
    ticker: "HDFC",
    type: "BUY",
    shares: 15,
    price: 1520.0,
    date: "2026-06-05",
    fee: 30.0,
  },
  {
    id: "5",
    ticker: "RELIANCE",
    type: "SELL",
    shares: 5,
    price: 2934.0,
    date: "2026-06-10",
    fee: 25.0,
  },
  {
    id: "6",
    ticker: "BAJFINANCE",
    type: "BUY",
    shares: 2,
    price: 6200.0,
    date: "2026-05-28",
    fee: 10.0,
  },
];