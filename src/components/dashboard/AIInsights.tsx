"use client";

import { useState } from "react";

const insights = [
  {
    id: 1,
    icon: "✅",
    text: "Your portfolio beat Nifty 50 by 3.2% this month",
  },
  {
    id: 2,
    icon: "⚠️",
    text: "BAJFINANCE has high concentration risk at 18.9%",
  },
  {
    id: 3,
    icon: "📈",
    text: "TCS showing bullish momentum — RSI at 62",
  },
  {
    id: 4,
    icon: "🔴",
    text: "Consider rebalancing — 94% allocation in stocks",
  },
];

export default function AIInsights() {
  const [activeInsight, setActiveInsight] = useState(0);

  // Rotate insights every 5 seconds
  // In a real app, this would fetch new insights from an API
  // For now, we'll cycle through the mock insights
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setActiveInsight((prev) => (prev + 1) % insights.length);
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="relative z-10 mb-8">
      <div className="bg-white/5 backdrop-blur-lg border border-border rounded-xl p-6 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
        <div className="flex items-center mb-4">
          <span className="text-indigo-400 mb-2">✨</span>
          <h3 className="text-lg font-bold text-white">Folio AI Insights</h3>
        </div>

        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={insight.id}
              className={`flex items-center space-x-3 p-3 rounded-lg ${index === activeInsight ? "bg-white/10" : "hover:bg-white/5 transition-colors"}`}
            >
              <span className="text-lg">{insight.icon}</span>
              <p className="text-white/90">{insight.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 pt-3 border-t border-border/50">
          <button
            onClick={() => setActiveInsight((prev) => (prev + 1) % insights.length)}
            className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-indigo-300 hover:text-indigo-200 transition-colors"
          >
            <span>Refresh Insights</span>
            <span className="text-indigo-400">🔄</span>
          </button>
        </div>
      </div>

      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-xl pointer-none -z-0">
        <div className="inset-0 bg-gradient-accent rounded-xl -mask-image:linear-gradient(-black 0 0) mask-composite:exclude mask-mode:alpha"></div>
      </div>
    </div>
  );
}