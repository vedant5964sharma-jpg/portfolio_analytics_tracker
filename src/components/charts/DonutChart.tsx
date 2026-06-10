"use client";

import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { getAllocationByClass } from "@/lib/mockData";

export default function DonutChart() {
  const allocationData = getAllocationByClass();

  const COLORS = ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6"];

  return (
    <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
      <h3 className="text-sm font-medium text-gray-400 mb-4">Asset Allocation</h3>

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
            labelLine={{ show: false }}
            label={{ show: false }}
          >
            {allocationData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => `${value}%`}
            contentStyle={{ backgroundColor: "#111827", borderColor: "#1F2937" }}
            labelStyle={{ color: "#F9FAFB" }}
            separator={": "}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ justifySelf: "center" }}
            itemStyle={{ fontSize: 12, fill: "#9CA3AF" }}
          />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}