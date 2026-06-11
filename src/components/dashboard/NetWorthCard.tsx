"use client";

import { formatCurrency, formatPercent } from "@/lib/utils";
import { totalPortfolioValue, totalPortfolioCost, totalDailyChange } from "@/lib/mockData";
import { gainLossColor } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function NetWorthCard() {
  const totalGain = totalPortfolioValue - totalPortfolioCost;
  const totalGainPct = (totalGain / totalPortfolioCost) * 100;
  const [animatedValue, setAnimatedValue] = useState(0);

  // Animate the count-up on load
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const startTime = performance.now();

    function animateCount(timestamp: number) {
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const currentValue = Math.floor(progress * totalPortfolioValue);
      setAnimatedValue(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    }

    requestAnimationFrame(animateCount);
  }, [totalPortfolioValue]);


  return (
    <div
      className="relative group bg-white/5 backdrop-blur-lg border border-border rounded-xl p-6 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]"
    >
      {/* Animated shimmer effect on borders */}
      <div className="absolute inset-0 rounded-xl pointer-events-none">
        <div className="h-0.5 bg-gradient-accent animate-shimmer left-0 group-hover:left-full transition-all duration-200"></div>
        <div className="h-0.5 bg-gradient-accent animate-shimmer right-0 group-hover:right-full transition-all duration-200"></div>
        <div className="w-0.5 bg-gradient-accent animate-shimmer top-0 group-hover:top-full transition-all duration-200"></div>
        <div className="w-0.5 bg-gradient-accent animate-shimmer bottom-0 group-hover:bottom-full transition-all duration-200"></div>
      </div>

      <div className="relative z-10 mb-4 flex justify-between items-start">
        <h3 className="text-sm font-medium text-white/70">Net Worth</h3>
        <div className="text-sm space-y-1">
          <p className="text-white/50">Today</p>
          <p className={`text-sm font-semibold ${gainLossColor(totalDailyChange)}`}>
            {totalDailyChange >= 0 ? "↑" : "↓"} {formatCurrency(Math.abs(totalDailyChange))}
          </p>
        </div>
      </div>

      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div>
          <p className="text-4xl font-bold text-white tracking-tight">
            {formatCurrency(animatedValue)}
          </p>
          <p className="text-xs text-white/50 mt-1">
            Total invested: {formatCurrency(totalPortfolioCost)}
          </p>
        </div>
        {/* Sparkline mini chart */}
        <div className="w-24 h-12">
          {/* Simplified sparkline - in a real app would use a chart library */}
          <div className="h-full bg-gradient-accent/20 rounded-lg relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-accent/10 h-0.5" style={{ bottom: '0%' }}></div>
            <div className="absolute inset-0 bg-gradient-accent/20 h-0.5" style={{ bottom: '20%' }}></div>
            <div className="absolute inset-0 bg-gradient-accent/30 h-0.5" style={{ bottom: '40%' }}></div>
            <div className="absolute inset-0 bg-gradient-accent/40 h-0.5" style={{ bottom: '60%' }}></div>
            <div className="absolute inset-0 bg-gradient-accent/50 h-0.5" style={{ bottom: '80%' }}></div>
            <div className="absolute inset-0 bg-gradient-accent/60 h-0.5" style={{ bottom: '100%' }}></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 text-sm">
        <p className="mb-1">Total Return</p>
        <p className={`font-semibold ${gainLossColor(totalGain)}`}>
          {formatCurrency(totalGain)} ({formatPercent(totalGainPct)})
        </p>
      </div>
    </div>
  );
}