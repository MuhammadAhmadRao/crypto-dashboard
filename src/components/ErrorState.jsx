import { AlertTriangle, RefreshCw } from 'lucide-react'

/**
 * Full-page error state with retry button
 */
const ErrorState = ({ message, onRetry }) => {
  return (
    <div
      id="error-state"
      role="alert"
      className="flex flex-col items-center justify-center py-24 px-6 text-center animate-fade-in"
    >
      {/* Icon */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-2xl bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <AlertTriangle size={36} className="text-red-500 dark:text-red-400" />
        </div>
        <div className="absolute inset-0 rounded-2xl bg-red-400/20 blur-xl" />
      </div>

      {/* Title */}
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-2">
        Failed to Load Data
      </h2>

      {/* Message */}
      <p className="text-slate-500 dark:text-slate-400 max-w-sm mb-2 text-sm leading-relaxed">
        {message || 'An unexpected error occurred while fetching cryptocurrency data.'}
      </p>

      {/* Hint */}
      <p className="text-slate-400 dark:text-slate-500 text-xs mb-8">
        CoinGecko free API has rate limits. Please wait a moment and try again.
      </p>

      {/* Retry button */}
      <button
        id="retry-button"
        onClick={onRetry}
        className="btn-primary flex items-center gap-2"
      >
        <RefreshCw size={16} />
        Try Again
      </button>
    </div>
  )
}

export default ErrorState
