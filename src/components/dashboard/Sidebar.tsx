import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#111827] border-r border-[#1F2937] min-h-screen p-4">
      <nav className="space-y-6">
        <Link href="/" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
          <span className="text-indigo-400">📊</span>
          <span>Dashboard</span>
        </Link>

        <Link href="/portfolio" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
          <span className="text-indigo-400">💼</span>
          <span>Portfolio</span>
        </Link>

        <Link href="/watchlist" className="flex items-center space-x-3 text-gray-400 hover:text-white transition-colors">
          <span className="text-indigo-400">👀</span>
          <span>Watchlist</span>
        </Link>

        <div className="mt-8">
          <h2 className="text-sm font-medium text-gray-400 mb-2">Quick Actions</h2>
          <div className="space-y-2">
            <button className="w-full text-left bg-[#1F2937] border border-[#374151] rounded-lg px-4 py-2 hover:bg-[#374151] transition-colors text-sm">
              Add Holding
            </button>
            <button className="w-full text-left bg-[#1F2937] border border-[#374151] rounded-lg px-4 py-2 hover:bg-[#374151] transition-colors text-sm">
              Add Transaction
            </button>
          </div>
        </div>
      </nav>
    </aside>
  );
}