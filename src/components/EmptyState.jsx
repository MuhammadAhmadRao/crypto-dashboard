import { Search } from 'lucide-react'

/**
 * Empty state when search returns no results
 */
const EmptyState = ({ query }) => {
  return (
    <div
      id="empty-state"
      className="flex flex-col items-center justify-center py-20 px-6 text-center col-span-full animate-fade-in"
    >
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <Search size={28} className="text-slate-400 dark:text-slate-500" />
        </div>
      </div>

      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">
        No results for &ldquo;{query}&rdquo;
      </h3>
      <p className="text-slate-400 dark:text-slate-500 text-sm max-w-xs">
        Try searching by coin name or symbol (e.g., Bitcoin, BTC, ETH).
      </p>
    </div>
  )
}

export default EmptyState
