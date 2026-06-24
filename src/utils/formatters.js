/**
 * Format a number as USD currency
 * @param {number} value - The number to format
 * @param {object} options - Intl.NumberFormat options
 * @returns {string}
 */
export const formatCurrency = (value, options = {}) => {
  if (value === null || value === undefined || isNaN(value)) return '$—'

  const defaults = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }

  // For very large numbers, reduce decimal places
  if (Math.abs(value) >= 1_000_000_000) {
    return new Intl.NumberFormat('en-US', {
      ...defaults,
      ...options,
      notation: 'compact',
      maximumFractionDigits: 2,
    }).format(value)
  }

  // For very small numbers (e.g. SHIB), show more decimals
  if (Math.abs(value) < 0.01 && value !== 0) {
    return new Intl.NumberFormat('en-US', {
      ...defaults,
      ...options,
      minimumFractionDigits: 4,
      maximumFractionDigits: 8,
    }).format(value)
  }

  return new Intl.NumberFormat('en-US', { ...defaults, ...options }).format(value)
}

/**
 * Format market cap with compact notation (T, B, M)
 * @param {number} value
 * @returns {string}
 */
export const formatMarketCap = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '$—'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Format a percentage with sign
 * @param {number} value
 * @returns {string}
 */
export const formatPercent = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '—'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

/**
 * Format large numbers with K, M, B suffixes
 * @param {number} value
 * @returns {string}
 */
export const formatNumber = (value) => {
  if (value === null || value === undefined || isNaN(value)) return '—'
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(value)
}

/**
 * Clamp a value between min and max
 */
export const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

/**
 * Debounce a function
 * @param {Function} fn
 * @param {number} delay
 */
export const debounce = (fn, delay) => {
  let timer
  return (...args) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
