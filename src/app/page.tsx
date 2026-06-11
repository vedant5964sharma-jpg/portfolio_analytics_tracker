"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import NetWorthCard from "@/components/dashboard/NetWorthCard";
import TodaysPLCard from "@/components/dashboard/TodaysPLCard";
import AreaChart from "@/components/charts/AreaChart";
import DonutChart from "@/components/charts/DonutChart";
import HoldingsPreviewTable from "@/components/dashboard/HoldingsPreviewTable";
import MarketNews from "@/components/dashboard/MarketNews";
import AIInsights from "@/components/dashboard/AIInsights";
import { useState, useEffect } from "react";

export default function DashboardPage() {
  const [timePeriod, setTimePeriod] = useState<"1W" | "1M" | "3M" | "1Y">("1M");
  const [greeting, setGreeting] = useState("Good Morning");
  const [isPositive, setIsPositive] = useState(true);
  const [time, setTime] = useState(new Date().toLocaleTimeString('en-IN', { hour12: false }));
  const [marketStatus, setMarketStatus] = useState<"OPEN" | "CLOSED">("OPEN");

  // Set greeting based on time of day
  // Update time every second for live clock
  // Update market status based on IST time (9:15 AM to 3:30 PM weekdays)
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Update time for live clock
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('en-IN', { hour12: false }));

      // Update market status
      const now = new Date();
      const day = now.getDay(); // 0 = Sunday, 1 = Monday, etc.
      const hour = now.getHours();
      const minute = now.getMinutes();

      // Convert to IST (UTC+5:30)
      let istHour = hour + 5;
      let istMinute = minute + 30;
      if (istMinute >= 60) {
        istMinute -= 60;
        istHour += 1;
      }
      if (istHour >= 24) {
        istHour -= 24;
      }

      // Market open: Monday-Friday (1-5), 9:15 AM to 3:30 PM IST
      const isWeekday = day >= 1 && day <= 5;
      const isMarketTime =
        (istHour > 9 || (istHour === 9 && istMinute >= 15)) &&
        (istHour < 15 || (istHour === 15 && istMinute <= 30));

      setMarketStatus(isWeekday && isMarketTime ? "OPEN" : "CLOSED");
    }, 1000);

    // Determine if portfolio is up today based on mock data
    setIsPositive(true); // From our mock data, it's positive

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar className="w-64" />

        {/* Main Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {/* Dashboard Header */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-1">
                  {greeting}, Vedant 👋
                </h1>
                <div className="flex items-center space-x-4">
                  <p className={`text-lg font-medium ${isPositive ? "text-accent-2" : "text-danger"} tracking-tight`}>
                    Your portfolio is up today
                  </p>
                  <div className={`flex items-center space-x-2 px-3 py-1 rounded-full ${marketStatus === "OPEN" ? "bg-accent-2/20 text-accent-2" : "bg-danger/20 text-danger"}`}>
                    <span className="text-xs">{marketStatus === "OPEN" ? "NSE OPEN" : "NSE CLOSED"}</span>
                  </div>
                  <div className="text-xs text-white/50">
                    {time} IST
                  </div>
                </div>
              </div>
              <div className="text-sm text-white/50">
                Wednesday, 10 June 2026
              </div>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <NetWorthCard />
            <div className="card-glass card-glass-border-emerald hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
              <h3 className="text-sm font-medium text-white/70 mb-4">
                Holdings
              </h3>
              <div className="text-2xl font-bold text-white tracking-tight">
                8
              </div>
              <p className="text-xs text-white/50 mt-1">
                Total positions
              </p>
            </div>
            <div className="card-glass card-glass-border-amber hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
              <h3 className="text-sm font-medium text-white/70 mb-4">
                Watchlist
              </h3>
              <div className="text-2xl font-bold text-white tracking-tight">
                5
              </div>
              <p className="text-xs text-white/50 mt-1">
                Symbols tracked
              </p>
            </div>
            <TodaysPLCard />
          </div>

          {/* Main Content Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column: Holdings Preview and Performance Chart */}
            <div className="space-y-6">
              <HoldingsPreviewTable />
              <AreaChart timePeriod={timePeriod} />
            </div>

            {/* Right Column: Allocation Chart and AI Insights */}
            <div className="space-y-6">
              <DonutChart />
              <AIInsights />
            </div>
          </div>

          {/* Market News Section */}
          <MarketNews />
        </div>
      </div>
    </div>
  );
}