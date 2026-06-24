import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Dashboard from './pages/Dashboard'
import CoinDetails from './pages/CoinDetails'
import { useCryptoData } from './hooks/useCryptoData'
import { useTheme } from './hooks/useTheme'

const COIN_COUNT = 20

function App() {
  const { isDark, toggleTheme } = useTheme()
  const { coins, globalData, loading, error, lastUpdated, refetch } = useCryptoData(COIN_COUNT)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await refetch()
    setTimeout(() => setIsRefreshing(false), 600)
  }

  return (
    <BrowserRouter>
      {/* Mesh gradient background */}
      <div className="mesh-bg" aria-hidden="true" />

      {/* Header */}
      <Header
        isDark={isDark}
        onToggleTheme={toggleTheme}
        lastUpdated={lastUpdated}
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing || loading}
      />

      {/* Main content */}
      <Routes>
        <Route 
          path="/" 
          element={
            <Dashboard 
              coins={coins} 
              globalData={globalData} 
              loading={loading} 
              error={error} 
              onRefresh={handleRefresh} 
            />
          } 
        />
        <Route path="/coin/:id" element={<CoinDetails />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  )
}

export default App
