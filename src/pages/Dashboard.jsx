import { useState, useMemo } from 'react'
import SearchBar from '../components/SearchBar'
import CryptoCard from '../components/CryptoCard'
import SkeletonCard from '../components/SkeletonCard'
import ErrorState from '../components/ErrorState'
import EmptyState from '../components/EmptyState'
import MarketStats from '../components/MarketStats'

const COIN_COUNT = 20

const Dashboard = ({ coins, globalData, loading, error, onRefresh }) => {
  const [searchQuery, setSearchQuery] = useState('')

  /** Filtered coins based on search query */
  const filteredCoins = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return coins
    return coins.filter(
      (coin) =>
        coin.name.toLowerCase().includes(q) ||
        coin.symbol.toLowerCase().includes(q) ||
        coin.id.toLowerCase().includes(q)
    )
  }, [coins, searchQuery])

  const handleClearSearch = () => setSearchQuery('')

  return (
    <main id="main-content" className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Hero section */}
      <section id="hero" className="mb-8 animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-100 dark:bg-brand-900/40 text-brand-700 dark:text-brand-300 text-xs font-semibold mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-slow" />
              Live Market Data
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white leading-tight">
              Top {COIN_COUNT} Cryptocurrencies
            </h2>
            <p className="text-slate-400 dark:text-slate-500 mt-2 text-sm sm:text-base">
              Real-time prices, market caps & 24h changes — powered by CoinGecko
            </p>
          </div>

          {/* Search */}
          <div className="sm:min-w-[280px] pb-4 sm:pb-0">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onClear={handleClearSearch}
              resultCount={filteredCoins.length}
            />
          </div>
        </div>
      </section>

      {/* Market stats */}
      {!loading && !error && (
        <MarketStats globalData={globalData} />
      )}

      {/* ── Content area ─────────────────────────── */}

      {/* Error state */}
      {error && !loading && (
        <ErrorState message={error} onRetry={onRefresh} />
      )}

      {/* Loading skeletons */}
      {loading && !error && (
        <section
          id="loading-grid"
          aria-label="Loading cryptocurrency data"
          aria-busy="true"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {Array.from({ length: COIN_COUNT }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </section>
      )}

      {/* Coins grid */}
      {!loading && !error && (
        <section
          id="coins-grid"
          aria-label="Cryptocurrency prices"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {filteredCoins.length === 0 && searchQuery ? (
            <EmptyState query={searchQuery} />
          ) : (
            filteredCoins.map((coin, index) => (
              <CryptoCard
                key={coin.id}
                coin={coin}
                rank={coins.indexOf(coin) + 1}
              />
            ))
          )}
        </section>
      )}

      {/* Auto-refresh notice */}
      {!loading && !error && (
        <p className="text-center text-xs text-slate-300 dark:text-slate-600 mt-10">
          Data auto-refreshes every 60 seconds
        </p>
      )}
    </main>
  )
}

export default Dashboard
