"use client";

import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { performanceData } from "@/lib/mockData";
import { formatCurrency, generatePriceSeries } from "@/lib/utils";

type TimePeriod = "1W" | "1M" | "3M" | "1Y";

interface AreaChartProps {
  timePeriod: TimePeriod;
}

export default function AreaChart({ timePeriod }: AreaChartProps) {
  const portfolioData = performanceData[timePeriod].map((point, index) => ({
    ...point,
    name: point.date,
  }));

  // Generate mock Nifty 50 data (slightly different from portfolio)
  const niftyBaseValue = portfolioData[0]?.value || 100000;
  const niftyData = generatePriceSeries(niftyBaseValue * 0.98, performanceData[timePeriod].length - 1, 0.015)
    .map((point, index) => ({
      ...point,
      name: point.date,
    }));

  const chartData = portfolioData.map((point, index) => ({
    ...point,
    nifty: niftyData[index]?.value || point.value,
  }));

  return (
    <div className="bg-[#0D1117] border border-[#1F2F3F] rounded-xl p-6 hover:scale-105 transition-transform duration-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-white/70">Performance</h3>
        <div className="flex space-x-2 text-sm">
          {[["1W", "1W"], ["1M", "1M"], ["3M", "3M"], ["1Y", "1Y"]].map(
            ([value, label]) => (
              <button
                key={value}
                className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                  timePeriod === value
                    ? "bg-indigo-500 text-white"
                    : "bg-white/5 border border-white/10 text-white/70 hover:bg-white/10 hover:text-white"
                }`}
                onClick={() => {
                  // In a real app, this would update state
                  console.log(`Switch to ${value}`);
                }}
              >
                {label}
              </button>
            )
          )}
        </div>
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <RechartsAreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.1} />
          <XAxis
            dataKey="date"
            tick={{
              fontSize: 10,
              fill: "#6B7280"
            }}
          />
          <YAxis
            tick={{
              fontSize: 10,
              fill: "#6B7280"
            }}
            tickFormatter={(value) => formatCurrency(value/100000) + "L"}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(13, 17, 23, 0.9)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)"
            }}
            labelStyle={{ color: "#F9FAFB" }}
            separator={": "}
            formatter={(value) => `₹${formatCurrency(Number(value))}`}
          />
          <Legend
            verticalAlign="top"
            height={36}
            wrapperStyle={{
              justifySelf: "center"
            }}
          />
          <Area
            type="monotone"
            dataKey="value"
            name="Portfolio Value"
            stroke="#6366F1"
            strokeWidth={2}
            fillOpacity={0.1}
            isAnimationActive={false}
            fill="url(#areaGradient)"
          >
            <defs>
              <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366F1" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>
          </Area>
          {/* Nifty 50 Line */}
          <Area
            type="monotone"
            dataKey="nifty"
            name="Nifty 50"
            stroke="#F59E0B"
            strokeWidth={2}
            fillOpacity={0}
            isAnimationActive={false}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}