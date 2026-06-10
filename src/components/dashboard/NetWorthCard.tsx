"use client";

import { formatCurrency, formatPercent } from "@/lib/utils";
import { totalPortfolioValue, totalPortfolioCost, totalDailyChange } from "@/lib/mockData";
import { gainLossColor } from "@/lib/utils";

export default function NetWorthCard() {
  const totalGain = totalPortfolioValue - totalPortfolioCost;
  const totalGainPct = (totalGain / totalPortfolioCost) * 100;

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
      <div className="mb-4 flex justify-between items-start">
        <h3 className="text-sm font-medium text-gray-400">Net Worth</h3>
        <div className="text-sm space-y-1">
          <p className="text-gray-400">Today</p>
          <p className={`text-sm font-semibold ${gainLossColor(totalDailyChange)}`}>
            {formatCurrency(totalDailyChange)}
          </p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-2xl font-bold text-white">{formatCurrency(totalPortfolioValue)}</p>
        <p className="text-xs text-gray-400 mt-1">
          Total invested: {formatCurrency(totalPortfolioCost)}
        </p>
      </div>

      <div className="text-sm">
        <p className="mb-1">Total Return</p>
        <p className={`font-semibold ${gainLossColor(totalGain)}`}>
          {formatCurrency(totalGain)} ({formatPercent(totalGainPct)})
        </p>
      </div>
    </div>
  );
}