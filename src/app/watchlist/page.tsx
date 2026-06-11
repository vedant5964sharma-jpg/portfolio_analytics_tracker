"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { watchlist, WatchlistItem } from "@/lib/mockData";
import { generatePriceSeries } from "@/lib/utils";

export default function WatchlistPage() {
  const [search, setSearch] = useState("");
  const [newTicker, setNewTicker] = useState("");

  // Filter watchlist based on search
  const filteredWatchlist = watchlist.filter((item) =>
    item.ticker.toLowerCase().includes(search.toLowerCase()) ||
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // Calculate day change percentage
  function getDayChangePct(item: WatchlistItem) {
    return ((item.currentPrice - item.previousClose) / item.previousClose) * 100;
  }

  // Handle adding to watchlist
  const handleAddToWatchlist = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTicker.trim() !== "") {
      // In a real app, this would add to the watchlist
      alert(`Added ${newTicker.toUpperCase()} to watchlist!`);
      setNewTicker("");
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-400">
            Watchlist
          </h1>
          <Link href="/" className="text-indigo-400 hover:text-indigo-300">
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Add to Watchlist */}
      <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 mb-6">
        <form onSubmit={handleAddToWatchlist} className="flex items-center space-x-3">
          <input
            type="text"
            placeholder="Enter ticker symbol (e.g., RELIANCE)"
            value={newTicker}
            onChange={(e) => setNewTicker(e.target.value)}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors"
          >
            Add to Watchlist
          </button>
        </form>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search watchlist..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Watchlist Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredWatchlist.map((item) => {
          const dayChangePct = getDayChangePct(item);
          const isGainer = dayChangePct >= 0;
          // Generate mock sparkline data (7 days)
          const sparklineData = generatePriceSeries(item.currentPrice * 0.95, 7, 0.02);

          return (
            <div
              key={item.ticker}
              className={`relative group bg-white/5 backdrop-blur-lg border border-border rounded-xl p-6 hover:scale-105 transition-transform duration-300
                ${isGainer ? "shadow-[0_0_20px_rgba(16,185,129,0.4)]" : "shadow-[0_0_20px_rgba(255,77,109,0.4)]"}
              `}
            >
              <div className="absolute top-2 right-2 flex items-center space-x-1">
                <span className="text-xs text-white/50">{item.sector}</span>
                <button onClick={() => alert(`Removed ${item.ticker} from watchlist`)} className="text-white/50 hover:text-white transition-colors">
                  ×
                </button>
              </div>

              <div className="flex items-center justify-between mb-4">
                <div className="text-2xl font-bold text-white">
                  {item.ticker}
                </div>
                <div className={`text-lg font-semibold ${isGainer ? "text-emerald-400" : "text-red-400"}`}>
                  {formatPercent(dayChangePct)}
                </div>
              </div>

              <p className="text-white/70 mb-2 line-clamp-1">
                {item.name}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-4 text-xs">
                <div>
                  <p className="text-white/50">LTP</p>
                  <p className="text-white font-medium">{formatCurrency(item.currentPrice)}</p>
                </div>
                <div className={`text-lg font-semibold ${isGainer ? "text-emerald-400" : "text-red-400"}`}>
                  {formatCurrency(item.currentPrice)}
                </div>
                <div>
                  <p className="text-white/50">52W High</p>
                  <p className="text-white/70">{formatCurrency(item.week52High)}</p>
                </div>
                <div>
                  <p className="text-white/50">52W Low</p>
                  <p className="text-white/70">{formatCurrency(item.week52Low)}</p>
                </div>
              </div>

              {/* Mini Sparkline */}
              <div className="mt-3 h-4">
                <div className="relative h-full w-full bg-white/5 rounded overflow-hidden">
                  {sparklineData.map((point, index) => {
                    const x = (index / (sparklineData.length - 1)) * 100;
                    const yRange = Math.max(...sparklineData.map(p => p.value)) - Math.min(...sparklineData.map(p => p.value));
                    const y = yRange > 0 ?
                      100 - (((point.value - Math.min(...sparklineData.map(p => p.value))) / yRange) * 100) :
                      50;
                    return (
                      <div
                        key={index}
                        className="absolute left-[{x}%] bottom-[{y}%] w-0.5 h-0.5 bg-gradient-accent rounded-full"
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}