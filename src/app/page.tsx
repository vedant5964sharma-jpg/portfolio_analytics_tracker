"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import NetWorthCard from "@/components/dashboard/NetWorthCard";
import AreaChart from "@/components/charts/AreaChart";
import DonutChart from "@/components/charts/DonutChart";
import { useState } from "react";

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState<"1W" | "1M" | "3M" | "1Y">("1M");

  return (
    <div className="min-h-screen bg-[#0A0F1E] text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar className="w-64" />

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-indigo-400 mb-2">
              Portfolio Analytics
            </h1>
            <p className="text-gray-400">
              Your investment portfolio dashboard
            </p>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <NetWorthCard />
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">
                Holdings
              </h3>
              <div className="text-2xl font-bold text-white">
                8
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Total positions
              </p>
            </div>
            <div className="bg-[#111827] border border-[#1F2937] rounded-xl p-6">
              <h3 className="text-sm font-medium text-gray-400 mb-4">
                Watchlist
              </h3>
              <div className="text-2xl font-bold text-white">
                4
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Symbols tracked
              </p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AreaChart timePeriod={timePeriod} />
            <DonutChart />
          </div>
        </div>
      </div>
    </div>
  );
}