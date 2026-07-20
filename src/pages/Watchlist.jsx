import { Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Page from '../components/Page.jsx'
import MovieCard from '../components/MovieCard.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import { ArrowUpRightIcon, FilmIcon } from '../components/icons.jsx'

const ease = [0.32, 0.72, 0, 1]

export default function Watchlist() {
  const { user } = useAuth()
  const { items } = useWatchlist()

  if (!user) return <Navigate to="/login" replace />

  return (
    <Page className="min-h-dvh px-6 pb-32 pt-36 md:px-12 md:pt-44">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-white/50">
            {user.name.split(' ')[0]}'s collection
          </span>
          <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Your watchlist
          </h1>
          <p className="mt-4 text-sm text-white/40">
            {items.length === 0
              ? 'Nothing saved yet.'
              : `${items.length} ${items.length === 1 ? 'movie' : 'movies'} waiting for you.`}
          </p>
        </motion.div>

        {items.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="mt-16 rounded-4xl bg-white/5 p-2 ring-1 ring-white/10"
          >
            <div className="flex flex-col items-center gap-6 rounded-3xl bg-onyx px-8 py-24 text-center">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/30">
                <FilmIcon className="h-6 w-6" />
              </span>
              <div>
                <h2 className="font-display text-2xl font-semibold">An empty cinema</h2>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-white/40">
                  Tap the bookmark on any movie and it will be waiting for you here.
                </p>
              </div>
              <Link
                to="/"
                className="group flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-fluid hover:scale-[1.03] active:scale-[0.97]"
              >
                Browse movies
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-fluid group-hover:-translate-y-px group-hover:translate-x-1">
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </motion.div>
        ) : (
          <div className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {items.map((m, i) => (
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
    </Page>
  )
}
