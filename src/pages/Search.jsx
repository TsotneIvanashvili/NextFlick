import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Page from '../components/Page.jsx'
import MovieCard from '../components/MovieCard.jsx'
import { tmdb } from '../lib/tmdb.js'
import { SearchIcon } from '../components/icons.jsx'

const ease = [0.32, 0.72, 0, 1]

export default function Search() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [status, setStatus] = useState('idle')

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
          setResults(d.results.filter((m) => m.poster_path))
          setStatus('done')
        })
        .catch(() => setStatus('error'))
    }, 400)
    return () => clearTimeout(timer)
  }, [query])

  return (
    <Page className="min-h-[100dvh] px-6 pb-32 pt-36 md:px-12 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-white/50">
            Discover
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Find your next obsession
          </h1>
          <div className="mt-10 rounded-full bg-white/5 p-1.5 ring-1 ring-white/10">
            <div className="flex items-center gap-3 rounded-full bg-abyss/80 px-6">
              <SearchIcon className="h-4.5 w-4.5 shrink-0 text-white/30" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search thousands of movies…"
                autoFocus
                className="w-full bg-transparent py-4 text-sm text-white outline-none placeholder:text-white/25 md:text-base"
              />
            </div>
          </div>
        </motion.div>

        <div className="mt-20">
          {status === 'idle' && (
            <p className="text-center text-sm text-white/25">
              Type a title, a franchise, a feeling. We'll find it.
            </p>
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
            <p className="text-center text-sm text-white/40">
              Nothing found for “{query.trim()}”.
            </p>
          )}
          {status === 'done' && results.length > 0 && (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {results.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 32 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: Math.min(i * 0.04, 0.5), ease }}
                >
                  <MovieCard movie={m} width="w-full" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Page>
  )
}
