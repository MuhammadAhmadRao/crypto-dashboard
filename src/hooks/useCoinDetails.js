import { useState, useEffect } from 'react'
import { cryptoApi } from '../utils/api'

export const useCoinDetails = (id) => {
  const [coin, setCoin] = useState(null)
  const [chartData, setChartData] = useState([])
  const [days, setDays] = useState('1')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [detailsRes, chartRes] = await Promise.all([
        cryptoApi.getCoinDetails(id),
        cryptoApi.getCoinMarketChart(id, days)
      ])

      setCoin(detailsRes.data)
      
      // format chart data for recharts
      const formattedChartData = chartRes.data.prices.map(([timestamp, price]) => ({
        time: timestamp,
        price: price
      }))
      
      setChartData(formattedChartData)
    } catch (err) {
      setError(err.message || 'Failed to fetch coin details')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) {
      fetchData()
    }
  }, [id, days])

  return { coin, chartData, days, setDays, loading, error, refetch: fetchData }
}
