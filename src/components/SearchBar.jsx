import { Search, X } from 'lucide-react'

/**
 * Search bar with clear button
 */
const SearchBar = ({ value, onChange, onClear, resultCount }) => {
  return (
    <div className="relative w-full max-w-md">
      {/* Search icon */}
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 pointer-events-none"
      />

      {/* Input */}
      <input
        id="crypto-search"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search coins... (e.g. Bitcoin, ETH)"
        aria-label="Search cryptocurrencies"
        className="search-input"
        autoComplete="off"
        spellCheck="false"
      />

      {/* Clear button */}
      {value && (
        <button
          id="search-clear"
          onClick={onClear}
          aria-label="Clear search"
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            w-6 h-6 flex items-center justify-center rounded-full
            bg-slate-200 dark:bg-slate-600
            hover:bg-slate-300 dark:hover:bg-slate-500
            text-slate-500 dark:text-slate-300
            transition-all duration-150
          "
        >
          <X size={12} />
        </button>
      )}

      {/* Result count badge */}
      {value && (
        <div className="absolute -bottom-7 left-0 text-xs text-slate-400 dark:text-slate-500">
          {resultCount === 0
            ? 'No coins found'
            : `${resultCount} coin${resultCount !== 1 ? 's' : ''} found`}
        </div>
      )}
    </div>
  )
}

export default SearchBar
