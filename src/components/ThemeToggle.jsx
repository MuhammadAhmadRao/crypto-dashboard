import { Sun, Moon } from 'lucide-react'

/**
 * Animated dark/light mode toggle button
 */
const ThemeToggle = ({ isDark, onToggle }) => {
  return (
    <button
      id="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        relative flex items-center justify-center w-10 h-10 rounded-xl
        bg-slate-100 dark:bg-slate-700/80
        hover:bg-slate-200 dark:hover:bg-slate-600
        border border-slate-200 dark:border-slate-600
        transition-all duration-200
        hover:scale-105 active:scale-95
        text-slate-600 dark:text-slate-300
        focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900
      "
    >
      <span
        className="transition-all duration-300"
        style={{ transform: isDark ? 'rotate(0deg)' : 'rotate(180deg)' }}
      >
        {isDark ? (
          <Sun size={18} className="text-amber-400" />
        ) : (
          <Moon size={18} className="text-brand-600" />
        )}
      </span>
    </button>
  )
}

export default ThemeToggle
