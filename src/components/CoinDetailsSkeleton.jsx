import React from 'react'

const CoinDetailsSkeleton = () => {
  return (
    <div className="animate-pulse max-w-4xl mx-auto">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 rounded-full bg-slate-200 dark:bg-slate-700"></div>
        <div>
          <div className="h-8 w-48 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
        </div>
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="glass-card p-4">
            <div className="h-3 w-16 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
            <div className="h-5 w-24 bg-slate-200 dark:bg-slate-700 rounded"></div>
          </div>
        ))}
      </div>

      {/* Chart Skeleton */}
      <div className="glass-card p-6 h-80 mb-8 flex items-center justify-center">
        <div className="w-full h-full bg-slate-200/50 dark:bg-slate-700/30 rounded"></div>
      </div>

      {/* Description Skeleton */}
      <div className="space-y-3">
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded"></div>
        <div className="h-4 w-3/4 bg-slate-200 dark:bg-slate-700 rounded"></div>
      </div>
    </div>
  )
}

export default CoinDetailsSkeleton
