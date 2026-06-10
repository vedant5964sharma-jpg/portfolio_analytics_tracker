"use client";

import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from "recharts";
import { performanceData } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

type TimePeriod = "1W" | "1M" | "3M" | "1Y";

interface AreaChartProps {
  timePeriod: TimePeriod;
}

export default function AreaChart({ timePeriod }: AreaChartProps) {
  const chartData = performanceData[timePeriod].map((point, index) => ({
    ...point,
    name: point.date,
  }));

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-400">Performance</h3>
        <div className="flex space-x-2 text-sm">
          {[["1W", "1W"], ["1M", "1M"], ["3M", "3M"], ["1Y", "1Y"]].map(
            ([value, label]) => (
              <button
                key={value}
                className={`px-3 py-1 rounded text-sm ${
                  timePeriod === value
                    ? "bg-indigo-500/20 text-indigo-400"
                    : "bg-[#1F2937] border border-[#374151] text-gray-400 hover:bg-[#374151] hover:text-white"
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
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
          <XAxis dataKey="date" tick={{ fontSize: 10, fill: "#6B7280" }} />
          <YAxis tick={{ fontSize: 10, fill: "#6B7280" }} />
          <Tooltip
            formatter={(value) => `$${value}`}
            contentStyle={{ backgroundColor: "#111827", borderColor: "#1F2937" }}
            labelStyle={{ color: "#F9FAFB" }}
            separator={": "}
          />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#6366F1"
            fillOpacity={0.1}
            isAnimationActive={false}
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </div>
  );
}