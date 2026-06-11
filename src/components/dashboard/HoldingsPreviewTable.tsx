"use client";

import Link from "next/link";
import { formatCurrency, formatPercent, gainLossColor } from "@/lib/utils";
import { holdings } from "@/lib/mockData";

export default function HoldingsPreviewTable() {
  // Sort holdings by value descending and take top 5
  const topHoldings = [...holdings]
    .sort((a, b) => getHoldingValue(b) - getHoldingValue(a))
    .slice(0, 5);

  function getHoldingValue(h: any) {
    return h.shares * h.currentPrice;
  }

  function getLogoColor(colorString: string): string {
    // Extract the color from bg-XXXX format
    const colorMap: Record<string, string> = {
      'bg-yellow-600': '#F59E0B',
      'bg-blue-600': '#3B82F6',
      'bg-green-600': '#10B981',
      'bg-purple-600': '#8B5CF6',
      'bg-red-600': '#EF4444',
      'bg-indigo-600': '#6366F1',
      'bg-orange-600': '#F97316',
      'bg-gray-800': '#4B5563'
    };
    return colorMap[colorString] || '#6B7280'; // default to gray-500
  }

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 border-t-4 border-emerald-500 hover:scale-105 transition-transform duration-300">
      <div className="mb-4 flex justify-between items-start">
        <h3 className="text-sm font-medium text-white/70">Top Holdings</h3>
        <Link
          href="/portfolio"
          className="text-sm text-indigo-300 hover:text-indigo-200 font-medium"
        >
          View All
        </Link>
      </div>

      <div className="space-y-3">
        {topHoldings.map((holding) => (
          <div key={holding.ticker} className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 flex items-center justify-center rounded-lg text-xs font-medium" style={{ backgroundColor: getLogoColor(holding.logoColor) }}>
                {holding.ticker.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-white font-medium">{holding.ticker}</p>
                <p className="text-xs text-white/50">{holding.name}</p>
              </div>
            </div>
            <div className="text-right space-x-2">
              <p className="text-white/70">{formatCurrency(holding.currentPrice)}</p>
              <p className={`${gainLossColor(holding.currentPrice - holding.previousClose)} text-white/80`}>
                {holding.currentPrice >= holding.previousClose ? "↑" : "↓"} {formatPercent(Math.abs((holding.currentPrice - holding.previousClose) / holding.previousClose * 100))}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}