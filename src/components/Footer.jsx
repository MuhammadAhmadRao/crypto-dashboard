import { Github, ExternalLink, Heart } from 'lucide-react'

/**
 * Page footer
 */
const Footer = () => {
  return (
    <footer
      id="app-footer"
      className="mt-16 border-t border-slate-200 dark:border-slate-800 py-8 px-4"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400 dark:text-slate-500">
        {/* Left */}
        <div className="flex items-center gap-1.5">
          <span>Built with</span>
          <Heart size={13} className="text-red-400" fill="currentColor" />
          <span>using React, Vite & Tailwind CSS</span>
        </div>

        {/* Center */}
        <div className="flex items-center gap-1.5">
          <span>Data powered by</span>
          <a
            href="https://www.coingecko.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-brand-500 hover:text-brand-600 dark:hover:text-brand-400 font-medium transition-colors"
          >
            CoinGecko API
            <ExternalLink size={12} />
          </a>
        </div>

        {/* Right */}
        <a
          id="github-link"
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors font-medium"
        >
          <Github size={16} />
          View on GitHub
        </a>
      </div>
    </footer>
  )
}

export default Footer
