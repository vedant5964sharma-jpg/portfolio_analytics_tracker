"use client";

import { formatCurrency, formatPercent } from "@/lib/utils";
import { totalDailyChange, totalPortfolioValue } from "@/lib/mockData";
import { gainLossColor } from "@/lib/utils";

export default function TodaysPLCard() {
  // Calculate today's P&L percentage based on total portfolio value
  const todayPct = totalPortfolioValue !== 0 ? (totalDailyChange / totalPortfolioValue) * 100 : 0;

  return (
    <div className="card-glass card-glass-border-danger hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
      <div className="mb-4 flex justify-between items-start">
        <h3 className="text-sm font-medium text-white/70">Today's P&L</h3>
      </div>

      <div className="mb-4">
        <p className="text-3xl font-bold text-white tracking-tight">
          {formatCurrency(totalDailyChange)}
        </p>
        <p className={`text-lg font-semibold ${gainLossColor(totalDailyChange)} mt-1`}>
          {formatPercent(todayPct)}
        </p>
      </div>

      <div className="text-sm">
        <p className="mb-1">Today's Change</p>
        <p className={`font-semibold ${gainLossColor(totalDailyChange)}`}>
          {totalDailyChange >= 0 ? "▲" : "▼"} {formatCurrency(Math.abs(totalDailyChange))}
        </p>
      </div>
    </div>
  );
}