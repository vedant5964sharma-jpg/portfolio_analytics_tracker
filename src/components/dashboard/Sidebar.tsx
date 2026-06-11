import Link from "next/link";
import { useState, useEffect } from "react";

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const [activePath, setActivePath] = useState("/");

  useEffect(() => {
    // Set active path based on current URL
    // In a real app, we'd use usePathname from next/navigation
    // For now, we'll simulate it
    const path = window.location.pathname;
    setActivePath(path);
  }, []);

  return (
    <aside className={`relative min-h-screen bg-[#070D1A] border-r border-border px-6 pt-10 pb-6 flex flex-col ${className || ""}`}>
      {/* Particle/dot grid background */}
      <div className="absolute inset-0 pointer-none">
        <div className="w-full h-full bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22><rect width=%2240%22 height=%2240%22 fill=%22%23070d1a%22/%3E<circle cx=%2220%22 cy=%2220%22 r=%221%22 fill=%22%233f83f8%22 opacity=%220.2%22/%3E</svg>')]"></div>
      </div>

      {/* Logo */}
      <div className="relative flex items-center space-x-3 mb-8 z-10">
        <div className="w-8 h-8 flex items-center justify-center">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 rounded-lg bg-gradient-accent animate-shimmer"></div>
            <div className="relative w-full h-full rounded-lg bg-[#070d1a] p-0.5">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {/* Lightning bolt icon */}
              <svg className="w-4 h-4 text-white/50 absolute -right-1 -bottom-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
        <h1 className="text-xl font-bold bg-gradient-accent bg-clip-text text-transparent">Folio</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 z-10">
        <Link
          href="/"
          className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-indigo-500/10 hover:text-indigo-300 ${activePath === "/" ? "border-l-4 border-acent" : ""}`}
        >
          <span className="text-indigo-400">📊</span>
          <span>Dashboard</span>
        </Link>

        <Link
          href="/portfolio"
          className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-indigo-500/10 hover:text-indigo-300 ${activePath === "/portfolio" ? "border-l-4 border-accent" : ""}`}
        >
          <span className="text-indigo-400">💼</span>
          <span>Portfolio</span>
        </Link>

        <Link
          href="/watchlist"
          className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover:bg-indigo-500/10 hover:text-indigo-300 ${activePath === "/watchlist" ? "border-l-4 border-accent" : ""}`}
        >
          <span className="text-indigo-400">👀</span>
          <span>Watchlist</span>
        </Link>
      </nav>

      {/* User Card */}
      <div className="mt-auto pt-6 border-t border-border z-10">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 flex items-center justify-center">
            <div className="relative w-full h-full">
              <div className="absolute inset-0 rounded-full bg-gradient-accent animate-shimmer"></div>
              <div className="relative w-full h-full rounded-full bg-[#070d1a] p-0.5">
                <span className="text-white font-semibold text-xs">VS</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-white font-medium">Vedant S</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="px-2 py-0.5 text-xs font-medium bg-accent/20 text-accent rounded-full">
                Pro Investor
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}