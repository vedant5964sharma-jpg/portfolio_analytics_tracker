"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency, formatPercent, gainLossColor } from "@/lib/utils";
import { holdings, Holding } from "@/lib/mockData";

export default function PortfolioPage() {
  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "ticker", direction: "asc" });

  // Filter holdings based on search
  const filteredHoldings = holdings.filter((holding) =>
    holding.ticker.toLowerCase().includes(search.toLowerCase()) ||
    holding.name.toLowerCase().includes(search.toLowerCase())
  );

  // Sort holdings
  const sortedHoldings = [...filteredHoldings].sort((a, b) => {
    if (sortConfig.direction === "asc") {
      if (sortConfig.key === "ticker") return a.ticker.localeCompare(b.ticker);
      if (sortConfig.key === "name") return a.name.localeCompare(b.name);
      if (sortConfig.key === "currentPrice") return a.currentPrice - b.currentPrice;
      if (sortConfig.key === "shares") return a.shares - b.shares;
      if (sortConfig.key === "avgCost") return a.avgCost - b.avgCost;
      return 0;
    } else {
      if (sortConfig.key === "ticker") return b.ticker.localeCompare(a.ticker);
      if (sortConfig.key === "name") return b.name.localeCompare(a.name);
      if (sortConfig.key === "currentPrice") return b.currentPrice - a.currentPrice;
      if (sortConfig.key === "shares") return b.shares - a.shares;
      if (sortConfig.key === "avgCost") return b.avgCost - a.avgCost;
      return 0;
    }
  });

  // Helper functions
  function getHoldingValue(h: Holding) {
    return h.shares * h.currentPrice;
  }

  function getHoldingCost(h: Holding) {
    return h.shares * h.avgCost;
  }

  function getHoldingGain(h: Holding) {
    return getHoldingValue(h) - getHoldingCost(h);
  }

  function getHoldingGainPct(h: Holding) {
    return ((h.currentPrice - h.avgCost) / h.avgCost) * 100;
  }

  function getDailyChange(h: Holding) {
    return (h.currentPrice - h.previousClose) * h.shares;
  }

  // Calculate totals
  const totalValue = holdings.reduce((sum, h) => sum + getHoldingValue(h), 0);
  const totalCost = holdings.reduce((sum, h) => sum + getHoldingCost(h), 0);
  const totalGain = totalValue - totalCost;
  const totalGainPct = (totalGain / totalCost) * 100;

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-400">
            Portfolio
          </h1>
          <Link href="/" className="text-indigo-400 hover:text-indigo-300">
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-sm text-white/50">Total Value</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalValue)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-white/50">Total Invested</p>
            <p className="text-2xl font-bold text-white">{formatCurrency(totalCost)}</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-white/50">Total P&L</p>
            <p className={`text-2xl font-bold ${gainLossColor(totalGain)}`}>
              {formatCurrency(totalGain)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-white/50">Total Return</p>
            <p className={`text-2xl font-bold ${gainLossColor(totalGain)}`}>
              {formatPercent(totalGainPct)}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Sort */}
      <div className="flex flex-col lg:flex-row items-center justify-between mb-6">
        <div className="flex items-center space-x-3 mb-4 lg:mb-0">
          <input
            type="text"
            placeholder="Search stocks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full max-w-xs"
          />
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={sortConfig.key}
            onChange={(e) => setSortConfig({ key: e.target.value, direction: sortConfig.direction })}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="ticker">Ticker</option>
            <option value="name">Company Name</option>
            <option value="currentPrice">LTP</option>
            <option value="shares">Quantity</option>
            <option value="avgCost">Avg Cost</option>
            <option value="currentPrice">Value</option>
          </select>
          <select
            value={sortConfig.direction}
            onChange={(e) => setSortConfig({ key: sortConfig.key, direction: e.target.value })}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      {/* Holdings Table */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-white/5">
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                LTP
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                Day Change
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                P&L
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                P&L%
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                Weight
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider" title="Alpha = excess return vs market">
                Alpha
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider" title="Beta = volatility vs Nifty 50">
                Beta
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedHoldings.map((holding) => (
              <tr
                key={holding.ticker}
                className="border-t border-white/10 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-4 flex items-center space-x-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium">{holding.logoColor}</div>
                  <div>
                    <p className="text-white font-medium">{holding.ticker}</p>
                    <p className="text-xs text-white/50">{holding.name}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-white">{formatCurrency(holding.currentPrice)}</td>
                <td className={`px-6 py-4 ${gainLossColor(holding.currentPrice - holding.previousClose)}`}>
                  {holding.currentPrice >= holding.previousClose ? "↑" : "↓"} {formatCurrency(Math.abs(holding.currentPrice - holding.previousClose))}
                </td>
                <td className={`px-6 py-4 ${gainLossColor(getHoldingGain(holding))}`}>
                  {formatCurrency(getHoldingGain(holding))}
                </td>
                <td className={`px-6 py-4 ${gainLossColor(getHoldingGainPct(holding))}`}>
                  {formatPercent(getHoldingGainPct(holding))}
                </td>
                <td className="px-6 py-4 text-white/70">
                  {formatPercent((getHoldingValue(holding) / totalValue) * 100)}
                </td>
                <td className={`px-6 py-4 ${holding.alpha >= 0 ? "text-emerald-400" : "text-red-400"} font-semibold`}>
                  {formatPercent(holding.alpha)}
                </td>
                <td className={`px-6 py-4 font-semibold ${
                  holding.beta < 1.0 ? "text-emerald-400" :
                  holding.beta > 1.3 ? "text-red-400" :
                  "text-amber-400"
                }`}>
                  {holding.beta.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 text-sm text-white/50">
        <p>
          <span className="font-medium">Alpha = excess return vs market</span> |
          <span className="font-medium">Beta = volatility vs Nifty 50</span>
        </p>
      </div>

      {/* 6-Month Forecast */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-white/70 mb-4">6-Month Forecast</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {/* Bear Case */}
          <div className="bg-white/5 backdrop-blur-lg border border-border rounded-xl p-4 hover:shadow-[0_0_30px_rgba(255,77,109,0.3)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-danger">BEAR CASE</span>
              <span className="text-xs font-medium text-danger">-8% to -15%</span>
            </div>
            <div className="bg-danger/20 h-2.5 rounded-full overflow-hidden">
              <div className="bg-danger h-2.5 w-[35%]"></div>
            </div>
            <p className="mt-2 text-xs text-white/50 line-clamp-2">
              Market correction likely if RBI hikes rates
            </p>
          </div>

          {/* Base Case */}
          <div className="bg-white/5 backdrop-blur-lg border border-border rounded-xl p-4 hover:shadow-[0_0_30px_rgba(255,158,74,0.3)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-amber-500">BASE CASE</span>
              <span className="text-xs font-medium text-amber-500">+8% to +12%</span>
            </div>
            <div className="bg-amber-500/20 h-2.5 rounded-full overflow-hidden">
              <div className="bg-amber-500 h-2.5 w-[50%]"></div>
            </div>
            <p className="mt-2 text-xs text-white/50 line-clamp-2">
              Steady growth expected with current allocation
            </p>
          </div>

          {/* Bull Case */}
          <div className="bg-white/5 backdrop-blur-lg border border-border rounded-xl p-4 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)]">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-medium text-accent-2">BULL CASE</span>
              <span className="text-xs font-medium text-accent-2">+18% to +28%</span>
            </div>
            <div className="bg-accent-2/20 h-2.5 rounded-full overflow-hidden">
              <div className="bg-accent-2 h-2.5 w-[65%]"></div>
            </div>
            <p className="mt-2 text-xs text-white/50 line-clamp-2">
              Strong upside if IT sector recovers
            </p>
          </div>
        </div>
        <p className="mt-4 text-xs text-white/50 text-center">
          Disclaimer: AI forecast based on historical patterns. Not financial advice.
        </p>
      </div>
    </div>
  );
}