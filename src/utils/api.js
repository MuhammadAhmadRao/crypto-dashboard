import axios from 'axios'

const BASE_URL = 'https://api.coingecko.com/api/v3'

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    Accept: 'application/json',
  },
})

// Request interceptor for logging
apiClient.interceptors.request.use(
  (config) => {
    config.metadata = { startTime: Date.now() }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error normalization
apiClient.interceptors.response.use(
  (response) => {
    const duration = Date.now() - response.config.metadata.startTime
    if (import.meta.env.DEV) {
      console.log(`[API] ${response.config.method?.toUpperCase()} ${response.config.url} — ${duration}ms`)
    }
    return response
  },
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.status?.error_message ||
      (error.code === 'ECONNABORTED' ? 'Request timed out. Please try again.' : null) ||
      error.message ||
      'An unexpected error occurred.'

    return Promise.reject(new Error(message))
  }
)

export const cryptoApi = {
  /**
   * Fetch top N coins by market cap
   * @param {number} count - number of coins to fetch (default 20)
   * @param {string} currency - vs_currency (default 'usd')
   */
  getTopCoins: (count = 20, currency = 'usd') =>
    apiClient.get('/coins/markets', {
      params: {
        vs_currency: currency,
        order: 'market_cap_desc',
        per_page: count,
        page: 1,
        sparkline: false,
        price_change_percentage: '24h',
        locale: 'en',
      },
    }),

  /**
   * Fetch global market data
   */
  getGlobalData: () => apiClient.get('/global'),

  /**
   * Fetch detailed data for a specific coin
   * @param {string} id - the coin id
   */
  getCoinDetails: (id) => 
    apiClient.get(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: false,
      },
    }),

  /**
   * Fetch historical market chart data
   * @param {string} id - the coin id
   * @param {string} days - '1', '7', '30', etc.
   * @param {string} currency - vs_currency (default 'usd')
   */
  getCoinMarketChart: (id, days, currency = 'usd') =>
    apiClient.get(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: currency,
        days: days,
      },
    }),

  /**
   * Ping CoinGecko API
   */
  ping: () => apiClient.get('/ping'),
}

export default cryptoApi
