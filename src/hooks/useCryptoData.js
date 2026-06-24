import { useState, useEffect, useCallback } from 'react'
import { cryptoApi } from '../utils/api'

const REFRESH_INTERVAL_MS = 60_000 // 1 minute

/**
 * Custom hook to fetch and manage crypto market data
 * @param {number} count - Number of coins to fetch
 * @returns {{ coins, globalData, loading, error, lastUpdated, refetch }}
 */
export const useCryptoData = (count = 20) => {
  const [coins, setCoins]           = useState([])
  const [globalData, setGlobalData] = useState(null)
  const [loading, setLoading]       = useState(true)
  const [error, setError]           = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)

  const fetchData = useCallback(async (silent = false) => {
    if (!silent) setLoading(true)
    setError(null)

    try {
      const [coinsRes, globalRes] = await Promise.all([
        cryptoApi.getTopCoins(count),
        cryptoApi.getGlobalData(),
      ])

      setCoins(coinsRes.data)
      setGlobalData(globalRes.data.data)
      setLastUpdated(new Date())
    } catch (err) {
      console.error('[useCryptoData] Fetch error:', err)
      setError(err.message || 'Failed to fetch cryptocurrency data.')
    } finally {
      setLoading(false)
    }
  }, [count])

  // Initial fetch
  useEffect(() => {
    fetchData()
  }, [fetchData])

  // Auto-refresh every minute
  useEffect(() => {
    const interval = setInterval(() => fetchData(true), REFRESH_INTERVAL_MS)
    return () => clearInterval(interval)
  }, [fetchData])

  return {
    coins,
    globalData,
    loading,
    error,
    lastUpdated,
    refetch: () => fetchData(false),
  }
}
