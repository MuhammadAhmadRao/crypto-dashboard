/**
 * Skeleton placeholder for a loading CryptoCard
 */
const SkeletonCard = () => {
  return (
    <div className="glass-card p-5 animate-pulse">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="skeleton w-8 h-4 rounded" />
          <div className="skeleton w-11 h-11 rounded-full" />
          <div className="space-y-2">
            <div className="skeleton w-24 h-4" />
            <div className="skeleton w-12 h-3" />
          </div>
        </div>
        <div className="skeleton w-16 h-6 rounded-lg" />
      </div>

      {/* Price */}
      <div className="mb-4 space-y-2">
        <div className="skeleton w-36 h-8 rounded-lg" />
        <div className="skeleton w-24 h-3 rounded" />
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 dark:border-slate-700/60 my-3" />

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <div className="skeleton w-16 h-3 rounded" />
          <div className="skeleton w-20 h-4 rounded" />
        </div>
        <div className="space-y-1.5">
          <div className="skeleton w-16 h-3 rounded" />
          <div className="skeleton w-20 h-4 rounded" />
        </div>
      </div>

      {/* Bar */}
      <div className="mt-3">
        <div className="h-1 bg-slate-200 dark:bg-slate-700 rounded-full" />
      </div>
    </div>
  )
}

export default SkeletonCard
