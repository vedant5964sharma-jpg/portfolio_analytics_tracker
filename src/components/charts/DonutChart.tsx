"use client";

import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAllocationBySector } from "@/lib/mockData";
import { formatCurrency } from "@/lib/utils";

export default function DonutChart() {
  const allocationData = getAllocationBySector();
  const totalValue = allocationData.reduce((sum, item) => sum + item.value, 0);

  const COLORS = {
    Energy: "#EF4444", // red
    Technology: "#3B82F6", // blue
    'Financial Services': "#10B981", // emerald
    'Metals & Mining': "#F59E0B", // amber
    Automotive: "#8B5CF6", // violet
    Pharmaceuticals: "#EC4899", // pink
    Construction: "#06B6D4", // cyan
    'Paints': "#84CC16", // lime
    'FMCG': "#6366F1" // indigo
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg border border-border rounded-xl p-6 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-medium text-white/70">Asset Allocation</h3>
        <div className="text-center">
          <p className="text-2xl font-bold text-white tracking-tight">{formatCurrency(totalValue)}</p>
          <p className="text-xs text-white/50">Total Value</p>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={260}>
        <RechartsPieChart>
          <Pie
            data={allocationData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            // labelLine={{ show: false }}
            // label={{ show: false }}
            animationBegin={500}
            animationDuration={1000}
            animationEasing="ease-out"
          >
            {allocationData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[entry.name as keyof typeof COLORS] || "#6B7280"}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "rgba(13, 17, 23, 0.9)",
              borderColor: "rgba(255, 255, 255, 0.1)",
              backdropFilter: "blur(10px)",
              padding: "8px 12px",
              borderRadius: "6px"
            }}
            labelStyle={{ color: "#F9FAFB" }}
            separator={": "}
            formatter={(value) => `${value}%`}
          />
          <Legend
            verticalAlign="bottom"
            height={40}
            wrapperStyle={{
              justifySelf: "center"
            }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>

      {/* Rebalance Suggestion */}
      <div className="mt-4 text-sm text-white/50 text-center">
        <p>
          <span className="font-medium">Rebalance Suggestion:</span> Ideal allocation: 60% Stocks, 20% MF, 20% Crypto
        </p>
      </div>
    </div>
  );
}