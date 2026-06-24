import { useNavigate } from 'react-router-dom'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency, formatMarketCap, formatPercent } from '../utils/formatters'

/**
 * Individual cryptocurrency card
 */
const CryptoCard = ({ coin, rank }) => {
  const isPositive = coin.price_change_percentage_24h >= 0
  const navigate = useNavigate()

  return (
    <article
      id={`coin-card-${coin.id}`}
      onClick={() => navigate(`/coin/${coin.id}`)}
      className="glass-card-hover p-5 cursor-pointer animate-slide-up"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-4">
        {/* Coin identity */}
        <div className="flex items-center gap-3 min-w-0">
          {/* Rank */}
          <span className="rank-badge flex-shrink-0">#{rank}</span>

          {/* Logo */}
          <div className="relative flex-shrink-0">
            <img
              src={coin.image}
              alt={`${coin.name} logo`}
              width={44}
              height={44}
              loading="lazy"
              className="rounded-full ring-2 ring-white dark:ring-slate-700 shadow-sm"
              onError={(e) => {
                e.target.onerror = null
                e.target.src = `https://ui-avatars.com/api/?name=${coin.symbol}&background=6366f1&color=fff&size=44`
              }}
            />
            {/* Subtle glow */}
            <div className={`absolute inset-0 rounded-full blur-sm opacity-20 ${isPositive ? 'bg-emerald-400' : 'bg-red-400'}`} />
          </div>

          {/* Name & Symbol */}
          <div className="min-w-0">
            <h3 className="font-semibold text-slate-800 dark:text-slate-100 truncate text-sm leading-tight">
              {coin.name}
            </h3>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              {coin.symbol}
            </span>
          </div>
        </div>

        {/* 24h Change Badge */}
        <div className={`flex-shrink-0 ${isPositive ? 'badge-up' : 'badge-down'}`}>
          {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {formatPercent(coin.price_change_percentage_24h)}
        </div>
      </div>

      {/* Price */}
      <div className="mb-4">
        <p className="text-2xl font-bold text-slate-900 dark:text-white tabular-nums leading-none">
          {formatCurrency(coin.current_price)}
        </p>
        <p className={`text-xs mt-1 font-medium tabular-nums ${isPositive ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
          {isPositive ? '▲' : '▼'} {formatCurrency(Math.abs(coin.price_change_24h ?? 0))} today
        </p>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-100 dark:border-slate-700/60 my-3" />

      {/* Stats row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5 font-medium">Market Cap</p>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 tabular-nums">
            {formatMarketCap(coin.market_cap)}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mb-0.5 font-medium">24h Volume</p>
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 tabular-nums">
            {formatMarketCap(coin.total_volume)}
          </p>
        </div>
      </div>

      {/* Market cap bar */}
      <div className="mt-3">
        <div className="h-1 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${isPositive ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-red-400 to-red-500'}`}
            style={{
              width: `${Math.min(100, Math.abs(coin.price_change_percentage_24h ?? 0) * 5)}%`,
            }}
          />
        </div>
      </div>
    </article>
  )
}

export default CryptoCard
