import { TrendingUp, TrendingDown, DollarSign, Activity, BarChart3 } from 'lucide-react'
import { formatMarketCap, formatPercent, formatNumber } from '../utils/formatters'

/**
 * Global market stats banner shown below the header
 */
const MarketStats = ({ globalData }) => {
  if (!globalData) return null

  const btcDominance     = globalData.market_cap_percentage?.btc?.toFixed(1)
  const ethDominance     = globalData.market_cap_percentage?.eth?.toFixed(1)
  const totalMarketCap   = globalData.total_market_cap?.usd
  const marketCapChange  = globalData.market_cap_change_percentage_24h_usd
  const activeCryptos    = globalData.active_cryptocurrencies
  const totalVolume      = globalData.total_volume?.usd

  const isPositive = marketCapChange >= 0

  const stats = [
    {
      id: 'total-market-cap',
      label: 'Total Market Cap',
      value: formatMarketCap(totalMarketCap),
      icon: DollarSign,
      sub: `${isPositive ? '+' : ''}${marketCapChange?.toFixed(2)}% (24h)`,
      subColor: isPositive ? 'text-emerald-500' : 'text-red-500',
    },
    {
      id: 'total-volume',
      label: '24h Volume',
      value: formatMarketCap(totalVolume),
      icon: Activity,
      sub: 'Across all markets',
      subColor: 'text-slate-400',
    },
    {
      id: 'btc-dominance',
      label: 'BTC Dominance',
      value: `${btcDominance}%`,
      icon: BarChart3,
      sub: `ETH: ${ethDominance}%`,
      subColor: 'text-slate-400',
    },
    {
      id: 'active-cryptos',
      label: 'Active Cryptos',
      value: formatNumber(activeCryptos),
      icon: TrendingUp,
      sub: 'Listed on CoinGecko',
      subColor: 'text-slate-400',
    },
  ]

  return (
    <section
      id="market-stats"
      aria-label="Global market statistics"
      className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8 animate-fade-in"
    >
      {stats.map(({ id, label, value, icon: Icon, sub, subColor }) => (
        <div key={id} id={id} className="stat-card">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-7 h-7 rounded-lg bg-brand-100 dark:bg-brand-900/40 flex items-center justify-center flex-shrink-0">
              <Icon size={14} className="text-brand-600 dark:text-brand-400" />
            </div>
            <span className="text-xs font-medium text-slate-400 dark:text-slate-500 truncate">{label}</span>
          </div>
          <p className="text-lg font-bold text-slate-800 dark:text-white tabular-nums">{value}</p>
          <p className={`text-xs ${subColor} font-medium`}>{sub}</p>
        </div>
      ))}
    </section>
  )
}

export default MarketStats
