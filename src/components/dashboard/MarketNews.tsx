"use client";

import { useState } from "react";

interface NewsItem {
  id: number;
  source: string;
  headline: string;
  timeAgo: string;
  tag: string;
  tagColor: string;
  fullArticle: string;
}

const newsItems = [
  {
    id: 1,
    source: "Economic Times",
    headline: "Reliance Industries Q2 profits beat estimates on robust refining margins",
    timeAgo: "2 hours ago",
    tag: "BULLISH",
    tagColor: "text-emerald-400 bg-emerald-500/20",
    fullArticle: "Reliance Industries Ltd. reported a strong quarterly performance with net profit rising 12.5% year-on-year to ₹15,200 crore, driven by higher refining margins and robust petrochemical demand. The company's refining segment EBITDA jumped 18% to ₹8,900 crore amid favorable cracking spreads."
  },
  {
    id: 2,
    source: "Moneycontrol",
    headline: "TCS wins $2.5B digital transformation deal from European bank",
    timeAgo: "4 hours ago",
    tag: "BULLISH",
    tagColor: "text-emerald-400 bg-emerald-500/20",
    fullArticle: "Tata Consultancy Services has secured a landmark $2.5 billion digital transformation contract from a major European banking institution. The 5-year deal involves cloud migration, AI-powered analytics, and customer experience enhancement across the bank's global operations."
  },
  {
    id: 3,
    source: "NDTV Profit",
    headline: "HDFC Bank net interest margin pressures continue in Q2",
    timeAgo: "6 hours ago",
    tag: "BEARISH",
    tagColor: "text-danger bg-danger/20",
    fullArticle: "HDFC Bank's net interest margin (NIM) compressed to 4.1% in Q2 FY26 from 4.3% in the previous quarter, reflecting the impact of higher deposit costs and subdued loan yield environment. The bank maintained steady loan growth at 14.2% YoY despite margin pressures."
  },
  {
    id: 4,
    source: "Economic Times",
    headline: "Nifty 50 crosses 22,000 mark on strong global cues",
    timeAgo: "8 hours ago",
    tag: "BULLISH",
    tagColor: "text-emerald-400 bg-emerald-500/20",
    fullArticle: "The benchmark Nifty 50 index breached the 22,000 level for the first time, driven by strong global cues, easing inflation concerns, and robust domestic institutional buying. IT and banking stocks led the rally with gains exceeding 2%."
  },
  {
    id: 5,
    source: "Moneycontrol",
    headline: "Maruti Suzuki production hits new record amid festive demand",
    timeAgo: "10 hours ago",
    tag: "BULLISH",
    tagColor: "text-emerald-400 bg-emerald-500/20",
    fullArticle: "Maruti Suzuki India achieved its highest ever monthly production of 205,000 units in October, driven by strong festive season demand and improved semiconductor supply chain. The company's utility vehicle segment showed particularly strong growth at 28% YoY."
  },
  {
    id: 6,
    source: "NDTV Profit",
    headline: "Sun Pharma US business shows sequential improvement",
    timeAgo: "12 hours ago",
    tag: "NEUTRAL",
    tagColor: "text-gray-500 bg-gray-500/20",
    fullArticle: "Sun Pharmaceutical Industries reported sequential improvement in its US business performance, with specialty drugs segment showing renewed traction. The company remains on track to achieve its FY26 guidance of 12-14% revenue growth."
  }
];

export default function MarketNews() {
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  return (
    <div className="mb-8">
      <h3 className="text-sm font-medium text-white/70 mb-4">Market News</h3>

      {/* News Scroll */}
      <div className="overflow-x-auto space-x-4">
        <div className="flex-shrink-0 flex space-x-4">
          {newsItems.map((news) => (
            <div
              key={news.id}
              onClick={() => setSelectedNews(news)}
              className="cursor-pointer flex-shrink-0 w-[280px] bg-white/5 backdrop-blur-lg border border-border rounded-xl p-4 hover:scale-105 transition-transform duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]"
            >
              <div className="flex items-center mb-2">
                <span className="text-xs font-medium text-white/70 mr-2">
                  {news.source}
                </span>
                <span className={`text-xs ${news.tagColor}`}>
                  {news.tag}
                </span>
              </div>
              <h4 className="font-semibold text-white line-clamp-2 mb-2">
                {news.headline}
              </h4>
              <p className="text-xs text-white/50">
                {news.timeAgo}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedNews && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white/5 backdrop-blur-lg border border-border rounded-xl p-6 w-[400px] max-w-full">
            <h3 className="text-lg font-bold text-white mb-4">
              {selectedNews.source}
            </h3>
            <p className="mb-2 text-xs text-white/50">
              {selectedNews.timeAgo}
            </p>
            <h2 className="text-xl font-semibold text-white mb-4">
              {selectedNews.headline}
            </h2>
            <p className="text-white/80 leading-relaxed">
              {selectedNews.fullArticle}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedNews(null)}
                className="px-4 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}