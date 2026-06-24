import { RefreshCw, Clock, Zap } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

/**
 * Top navigation header
 */
const Header = ({ isDark, onToggleTheme, lastUpdated, onRefresh, isRefreshing }) => {
  const formattedTime = lastUpdated
    ? lastUpdated.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : null

  return (
    <header
      id="app-header"
      className="
        sticky top-0 z-50
        bg-white/80 dark:bg-slate-900/80
        backdrop-blur-xl
        border-b border-slate-200/60 dark:border-slate-700/40
        px-4 sm:px-6
        py-3
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
            <Zap size={18} className="text-white" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-lg font-bold gradient-text leading-none">CryptoTrack</h1>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-none mt-0.5">Live Market Data</p>
          </div>
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Last updated */}
          {formattedTime && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 bg-slate-100 dark:bg-slate-800 rounded-lg px-3 py-1.5">
              <Clock size={12} />
              <span>Updated {formattedTime}</span>
            </div>
          )}

          {/* Refresh button */}
          <button
            id="refresh-button"
            onClick={onRefresh}
            disabled={isRefreshing}
            aria-label="Refresh market data"
            className="
              flex items-center justify-center w-10 h-10 rounded-xl
              bg-slate-100 dark:bg-slate-700/80
              hover:bg-slate-200 dark:hover:bg-slate-600
              border border-slate-200 dark:border-slate-600
              text-slate-600 dark:text-slate-300
              transition-all duration-200
              hover:scale-105 active:scale-95
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900
            "
          >
            <RefreshCw
              size={16}
              className={isRefreshing ? 'animate-spin-slow text-brand-500' : ''}
            />
          </button>

          {/* Theme toggle */}
          <ThemeToggle isDark={isDark} onToggle={onToggleTheme} />
        </div>
      </div>
    </header>
  )
}

export default Header
