import React from 'react'
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'
import { formatCurrency } from '../utils/formatters'

const PriceChart = ({ data, days, setDays }) => {
  const timeFilters = [
    { label: '24H', value: '1' },
    { label: '7D', value: '7' },
    { label: '30D', value: '30' },
  ]

  // Formatter for X-axis based on selected timeframe
  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem)
    if (days === '1') {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-panel p-3 text-sm">
          <p className="text-slate-400 dark:text-slate-400 mb-1">
            {new Date(label).toLocaleString()}
          </p>
          <p className="font-semibold text-slate-800 dark:text-white">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="glass-card p-4 sm:p-6 mt-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-slate-800 dark:text-slate-100">
          Price Chart
        </h3>
        <div className="flex bg-slate-100 dark:bg-slate-800/50 rounded-lg p-1">
          {timeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setDays(filter.value)}
              className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                days === filter.value
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-64 sm:h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis
              dataKey="time"
              tickFormatter={formatXAxis}
              minTickGap={30}
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={['auto', 'auto']}
              tickFormatter={(val) => '$' + val.toLocaleString()}
              stroke="#64748b"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#6366f1"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: '#6366f1', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default PriceChart
