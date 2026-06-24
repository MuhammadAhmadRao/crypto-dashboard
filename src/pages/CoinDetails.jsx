import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useCoinDetails } from '../hooks/useCoinDetails'
import { formatCurrency, formatMarketCap, formatPercent } from '../utils/formatters'
import PriceChart from '../components/PriceChart'
import CoinDetailsSkeleton from '../components/CoinDetailsSkeleton'
import ErrorState from '../components/ErrorState'

const StatBox = ({ label, value }) => (
  <div className="glass-card p-4">
    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1">{label}</p>
    <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white tabular-nums">{value || 'N/A'}</p>
  </div>
)

const CoinDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { coin, chartData, days, setDays, loading, error, refetch } = useCoinDetails(id)

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <CoinDetailsSkeleton />
      </main>
    )
  }

  if (error || !coin) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-500 hover:text-slate-800 dark:hover:text-white mb-6 transition-colors">
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <ErrorState message={error || 'Coin not found'} onRetry={refetch} />
      </main>
    )
  }

  const homepage = coin.links?.homepage?.[0]
  const description = coin.description?.en?.split('. ')[0] + '.' // Get first sentence roughly

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
      {/* Back button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400 mb-8 transition-colors"
      >
        <ArrowLeft size={16} /> Back to Dashboard
      </button>

      <div className="max-w-5xl mx-auto">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <img src={coin.image?.large} alt={coin.name} className="w-16 h-16 rounded-full ring-2 ring-white dark:ring-slate-700 shadow-md" />
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{coin.name}</h1>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300 uppercase">
                  {coin.symbol}
                </span>
                <span className="rank-badge">#{coin.market_cap_rank}</span>
              </div>
              {homepage && (
                <a href={homepage} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300">
                  <ExternalLink size={14} /> Official Website
                </a>
              )}
            </div>
          </div>
          
          <div className="text-left sm:text-right">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">Current Price</p>
            <div className="flex items-center sm:justify-end gap-3">
              <span className="text-3xl font-bold text-slate-900 dark:text-white tabular-nums">
                {formatCurrency(coin.market_data?.current_price?.usd)}
              </span>
              <span className={`px-2 py-1 rounded-full text-sm font-medium ${
                coin.market_data?.price_change_percentage_24h >= 0 
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' 
                  : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              }`}>
                {coin.market_data?.price_change_percentage_24h >= 0 ? '▲' : '▼'} {formatPercent(coin.market_data?.price_change_percentage_24h)}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatBox label="Market Cap" value={formatMarketCap(coin.market_data?.market_cap?.usd)} />
          <StatBox label="24h High" value={formatCurrency(coin.market_data?.high_24h?.usd)} />
          <StatBox label="24h Low" value={formatCurrency(coin.market_data?.low_24h?.usd)} />
          <StatBox label="All-Time High" value={formatCurrency(coin.market_data?.ath?.usd)} />
          
          <StatBox label="All-Time Low" value={formatCurrency(coin.market_data?.atl?.usd)} />
          <StatBox label="Circulating Supply" value={coin.market_data?.circulating_supply?.toLocaleString()} />
          <StatBox label="Total Supply" value={coin.market_data?.total_supply?.toLocaleString()} />
          <StatBox label="Max Supply" value={coin.market_data?.max_supply ? coin.market_data.max_supply.toLocaleString() : '∞'} />
        </div>

        {/* Chart */}
        {chartData.length > 0 && (
          <PriceChart data={chartData} days={days} setDays={setDays} />
        )}

        {/* Description */}
        {description && description !== 'undefined.' && (
          <div className="mt-8 glass-card p-6">
            <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-3">About {coin.name}</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm sm:text-base" dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
        )}
      </div>
    </main>
  )
}

export default CoinDetails
