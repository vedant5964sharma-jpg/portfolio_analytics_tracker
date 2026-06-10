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
}

// ─── Holdings ─────────────────────────────────────────────────────────────────

export const holdings: Holding[] = [
  {
    id: "1",
    ticker: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    assetClass: "stock",
    shares: 42,
    avgCost: 155.2,
    currentPrice: 213.49,
    previousClose: 210.15,
    logoColor: "bg-gray-700",
  },
  {
    id: "2",
    ticker: "NVDA",
    name: "NVIDIA Corp.",
    sector: "Technology",
    assetClass: "stock",
    shares: 15,
    avgCost: 420.0,
    currentPrice: 875.4,
    previousClose: 860.0,
    logoColor: "bg-green-800",
  },
  {
    id: "3",
    ticker: "MSFT",
    name: "Microsoft Corp.",
    sector: "Technology",
    assetClass: "stock",
    shares: 18,
    avgCost: 310.5,
    currentPrice: 415.23,
    previousClose: 412.8,
    logoColor: "bg-blue-700",
  },
  {
    id: "4",
    ticker: "BTC",
    name: "Bitcoin",
    sector: "Crypto",
    assetClass: "crypto",
    shares: 0.48,
    avgCost: 38000,
    currentPrice: 67420,
    previousClose: 65800,
    logoColor: "bg-orange-600",
  },
  {
    id: "5",
    ticker: "ETH",
    name: "Ethereum",
    sector: "Crypto",
    assetClass: "crypto",
    shares: 3.2,
    avgCost: 2100,
    currentPrice: 3540,
    previousClose: 3480,
    logoColor: "bg-violet-700",
  },
  {
    id: "6",
    ticker: "VOO",
    name: "Vanguard S&P 500 ETF",
    sector: "Broad Market",
    assetClass: "etf",
    shares: 25,
    avgCost: 380.0,
    currentPrice: 489.0,
    previousClose: 487.5,
    logoColor: "bg-red-700",
  },
  {
    id: "7",
    ticker: "AMZN",
    name: "Amazon.com Inc.",
    sector: "Consumer Discretionary",
    assetClass: "stock",
    shares: 12,
    avgCost: 140.0,
    currentPrice: 182.3,
    previousClose: 180.0,
    logoColor: "bg-yellow-700",
  },
  {
    id: "8",
    ticker: "GOOGL",
    name: "Alphabet Inc.",
    sector: "Technology",
    assetClass: "stock",
    shares: 20,
    avgCost: 125.0,
    currentPrice: 172.5,
    previousClose: 170.8,
    logoColor: "bg-blue-500",
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

// ─── Allocation ───────────────────────────────────────────────────────────────

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
  { ticker: "META", name: "Meta Platforms", currentPrice: 482.3, previousClose: 475.0, sector: "Technology" },
  { ticker: "TSLA", name: "Tesla Inc.", currentPrice: 178.2, previousClose: 182.5, sector: "Automotive" },
  { ticker: "SOL", name: "Solana", currentPrice: 172.4, previousClose: 168.0, sector: "Crypto" },
  { ticker: "AMD", name: "Advanced Micro Devices", currentPrice: 163.5, previousClose: 160.2, sector: "Technology" },
  { ticker: "PLTR", name: "Palantir Technologies", currentPrice: 24.8, previousClose: 23.9, sector: "Technology" },
];

// ─── Transactions ─────────────────────────────────────────────────────────────

export const transactions: Transaction[] = [
  { id: "t1", ticker: "NVDA", type: "BUY",  shares: 5,    price: 820.0,  date: "2024-05-10", fee: 0 },
  { id: "t2", ticker: "BTC",  type: "BUY",  shares: 0.1,  price: 62000,  date: "2024-05-08", fee: 2.5 },
  { id: "t3", ticker: "AAPL", type: "SELL", shares: 10,   price: 198.0,  date: "2024-05-03", fee: 0 },
  { id: "t4", ticker: "VOO",  type: "BUY",  shares: 5,    price: 480.0,  date: "2024-04-28", fee: 0 },
  { id: "t5", ticker: "ETH",  type: "BUY",  shares: 0.8,  price: 3200.0, date: "2024-04-20", fee: 1.5 },
  { id: "t6", ticker: "MSFT", type: "BUY",  shares: 6,    price: 405.0,  date: "2024-04-15", fee: 0 },
  { id: "t7", ticker: "AMZN", type: "BUY",  shares: 12,   price: 178.5,  date: "2024-04-10", fee: 0 },
  { id: "t8", ticker: "GOOGL", type: "BUY", shares: 20,   price: 160.0,  date: "2024-03-22", fee: 0 },
];
