import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import MovieCard from './MovieCard.jsx'
import { tmdb } from '../lib/tmdb.js'
import { CloseIcon, SearchIcon } from './icons.jsx'
import { useUI } from '../context/UIContext.jsx'

const ease = [0.32, 0.72, 0, 1]

export default function SearchOverlay() {
  const { searchOpen, closeSearch } = useUI()
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!searchOpen) return
    document.body.style.overflow = 'hidden'
    const timer = setTimeout(() => inputRef.current?.focus(), 350)
    const onKey = (e) => {
      if (e.key === 'Escape') closeSearch()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      clearTimeout(timer)
      window.removeEventListener('keydown', onKey)
    }
  }, [searchOpen, closeSearch])

  useEffect(() => {
    const trimmed = query.trim()
    if (!trimmed) {
      setResults([])
      setStatus('idle')
      return
    }
    setStatus('loading')
    const timer = setTimeout(() => {
      tmdb
        .search(trimmed)
        .then((d) => {
          setResults(d.results.filter((m) => m.poster_path).slice(0, 18))
          setStatus('done')
        })
        .catch(() => setStatus('error'))
    }, 350)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease }}
          className="fixed inset-0 z-70 overflow-y-auto bg-black/85 backdrop-blur-2xl"
          onClick={closeSearch}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="mx-auto w-full max-w-5xl px-6 pb-24 pt-24 md:pt-32"
          >
            <motion.div
              initial={{ y: -32, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.6, ease }}
              className="rounded-full bg-white/5 p-1.5 ring-1 ring-white/10"
            >
              <div className="flex items-center gap-3 rounded-full bg-abyss/90 px-6">
                <SearchIcon className="h-4.5 w-4.5 shrink-0 text-white/30" />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search thousands of movies…"
                  className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/25 md:text-base"
                />
                <button
                  onClick={closeSearch}
                  aria-label="Close search"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-colors duration-500 ease-fluid hover:bg-white/15 hover:text-white"
                >
                  <CloseIcon className="h-3.5 w-3.5" />
                </button>
              </div>
            </motion.div>

            <div className="mt-14">
              {status === 'idle' && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-center text-sm text-white/25"
                >
                  Type a title, a franchise, a feeling. We'll find it.
                </motion.p>
              )}
              {status === 'loading' && (
                <div className="flex justify-center">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-ember" />
                </div>
              )}
              {status === 'error' && (
                <p className="text-center text-sm text-white/40">Search failed. Try again.</p>
              )}
              {status === 'done' && results.length === 0 && (
                <p className="text-center text-sm text-white/40">Nothing found for “{query.trim()}”.</p>
              )}
              {status === 'done' && results.length > 0 && (
                <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {results.map((m, i) => (
                    <motion.div
                      key={m.id}
                      initial={{ opacity: 0, y: 28 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.55, delay: Math.min(i * 0.04, 0.4), ease }}
                      onClick={closeSearch}
                    >
                      <MovieCard movie={m} width="w-full" />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
