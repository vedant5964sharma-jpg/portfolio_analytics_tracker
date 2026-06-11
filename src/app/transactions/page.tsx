"use client";

import { useState } from "react";
import Link from "next/link";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { gainLossColor } from "@/lib/utils";
import { transactions } from "@/lib/mockData";

export default function TransactionsPage() {
  const [filter, setFilter] = useState<"ALL" | "BUY" | "SELL">("ALL");
  const [search, setSearch] = useState("");

  // Filter transactions based on search and filter
  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.ticker.toLowerCase().includes(search.toLowerCase()) ||
      (search === "");

    const matchesFilter =
      filter === "ALL" ||
      filter === tx.type;

    return matchesSearch && matchesFilter;
  });

  // Calculate summary values
  const totalInvested = transactions
    .filter(tx => tx.type === "BUY")
    .reduce((sum, tx) => sum + (tx.shares * tx.price) + tx.fee, 0);

  const totalRealised = transactions
    .filter(tx => tx.type === "SELL")
    .reduce((sum, tx) => sum + (tx.shares * tx.price) - tx.fee, 0);

  const netP_L = totalRealised - totalInvested;

  return (
    <div className="min-h-screen bg-[#050B18] text-white p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-indigo-400">
            Transactions
          </h1>
          <Link href="/" className="text-indigo-400 hover:text-indigo-300">
            ← Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="mb-4">
        <div className="flex space-x-2 rounded-lg bg-white/5">
          <button
            onClick={() => setFilter("ALL")}
            className={`px-4 py-2 text-sm font-medium flex-1 ${filter === "ALL" ? "bg-indigo-500 text-white" : "text-white/50 hover:bg-white/10"}`}
          >
            ALL
          </button>
          <button
            onClick={() => setFilter("BUY")}
            className={`px-4 py-2 text-sm font-medium flex-1 ${filter === "BUY" ? "bg-indigo-500 text-white" : "text-white/50 hover:bg-white/10"}`}
          >
            BUY
          </button>
          <button
            onClick={() => setFilter("SELL")}
            className={`px-4 py-2 text-sm font-medium flex-1 ${filter === "SELL" ? "bg-indigo-500 text-white" : "text-white/50 hover:bg-white/10"}`}
          >
            SELL
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Summary Bar */}
      <div className="bg-white/5 backdrop-blur-lg border border-border rounded-xl p-4 mb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-sm text-white/50">Total Invested</p>
            <p className="text-xl font-bold text-white">{formatCurrency(totalInvested)}</p>
          </div>
          <div>
            <p className="text-sm text-white/50">Total Realised</p>
            <p className="text-xl font-bold text-white">{formatCurrency(totalRealised)}</p>
          </div>
          <div>
            <p className="text-sm text-white/50">Net P&L</p>
            <p className={`text-xl font-bold ${gainLossColor(netP_L)}`}>
              {formatCurrency(netP_L)}
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white/5 backdrop-blur-lg border border-border rounded-xl overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-white/50">No transactions found</p>
            {filter !== "ALL" && (
              <p className="text-sm mt-2">
                Try changing the filter to see all transactions
              </p>
            )}
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-white/50 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-white/50 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white/50 uppercase tracking-wider">
                  Qty
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white/50 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-white/50 uppercase tracking-wider">
                  Total Value
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-white/50 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((tx) => (
                <tr
                  key={tx.id}
                  className={`border-t border-white/10 hover:bg-white/5 transition-colors ${tx.type === "BUY" ? "border-l-4 border-emerald-500" : "border-l-4 border-red-500"}`}
                >
                  <td className="px-6 py-4 text-white/70">
                    {tx.date}
                  </td>
                  <td className="px-6 py-4 flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium">
                      {/* Simplified logo - using first two letters */}
                      {tx.ticker.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <p className="text-white font-medium">{tx.ticker}</p>
                      <p className="text-xs text-white/50">{tx.ticker}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-2 py-0.5 text-xs font-medium ${tx.type === "BUY" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"} rounded-full`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-white">
                    {tx.shares}
                  </td>
                  <td className="px-6 py-4 text-right text-white">
                    {formatCurrency(tx.price)}
                  </td>
                  <td className="px-6 py-4 text-right text-white">
                    {formatCurrency(tx.shares * tx.price)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="px-2 py-0.5 text-xs font-medium bg-indigo-500/20 text-indigo-300 rounded-full">
                      EXECUTED
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}