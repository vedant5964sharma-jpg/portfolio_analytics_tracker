import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes safely */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a number as currency */
export function formatCurrency(
  value: number,
  currency: string = "USD",
  compact: boolean = false
): string {
  if (compact && Math.abs(value) >= 1_000) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      notation: "compact",
      maximumFractionDigits: 1,
    });
    return formatter.format(value);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

/** Format a number as a percentage */
export function formatPercent(value: number, decimals: number = 2): string {
  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(decimals)}%`;
}

/** Return Tailwind color class based on positive/negative value */
export function gainLossColor(value: number): string {
  return value >= 0 ? "text-emerald-400" : "text-red-400";
}

/** Generate sparkline-style data points from a seed */
export function generatePriceSeries(
  basePrice: number,
  days: number,
  volatility: number = 0.02
): { date: string; value: number }[] {
  const series: { date: string; value: number }[] = [];
  let price = basePrice;
  const now = new Date();

  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(now.getDate() - i);
    price = price * (1 + (Math.random() - 0.48) * volatility);
    series.push({
      date: date.toISOString().split("T")[0],
      value: Math.round(price * 100) / 100,
    });
  }
  return series;
}
