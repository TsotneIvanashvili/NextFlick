import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { tmdb, img, pickTrailer } from '../lib/tmdb.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import { useUI } from '../context/UIContext.jsx'
import TrailerFrame from './TrailerFrame.jsx'
import {
  ArrowUpRightIcon,
  BookmarkIcon,
  StarIcon,
  VolumeOffIcon,
  VolumeOnIcon,
} from './icons.jsx'

const ease = [0.32, 0.72, 0, 1]

export default function TrailerHero() {
  const [movies, setMovies] = useState([])
  const [index, setIndex] = useState(0)
  const [trailers, setTrailers] = useState({})
  const { muted, setMuted } = useUI()
  const { user } = useAuth()
  const { has, toggle } = useWatchlist()
  const navigate = useNavigate()

  useEffect(() => {
    tmdb
      .trending()
      .then((d) => {
        const pool = d.results
          .filter((m) => m.backdrop_path && m.overview)
          .sort(() => Math.random() - 0.5)
          .slice(0, 7)
        setMovies(pool)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    movies.forEach((m) => {
      tmdb
        .videos(m.id)
        .then((d) => setTrailers((prev) => ({ ...prev, [m.id]: pickTrailer(d)?.key ?? null })))
        .catch(() => setTrailers((prev) => ({ ...prev, [m.id]: null })))
    })
  }, [movies])

  useEffect(() => {
    if (movies.length < 2) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % movies.length), 30000)
    return () => clearTimeout(timer)
  }, [index, movies])

  const movie = movies[index]

  if (!movie) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-ember" />
      </div>
    )
  }

  const trailerKey = trailers[movie.id]
  const saved = has(movie.id)

  const handleSave = () => {
    if (!user) {
      navigate('/login')
      return
    }
    toggle(movie)
  }

  return (
    <section className="relative min-h-dvh overflow-hidden">
      <div className="absolute inset-0">
        <AnimatePresence>
          <motion.div
            key={movie.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease }}
            className="absolute inset-0"
          >
            <img
              src={img.backdrop(movie.backdrop_path)}
              alt=""
              className="h-full w-full scale-105 object-cover"
            />
            <TrailerFrame
              trailerKey={trailerKey}
              title={movie.title}
              muted={muted}
              className="absolute left-1/2 top-1/2 h-[max(100vh,56.25vw)] w-[max(100vw,177.78vh)] -translate-x-1/2 -translate-y-1/2 scale-[1.45]"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-linear-to-r from-abyss/95 via-abyss/30 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-abyss/80 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-t from-abyss via-abyss/60 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-dvh items-end">
        <div className="w-full px-6 pb-28 md:px-12 md:pb-32">
          <AnimatePresence mode="wait">
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -20, filter: 'blur(6px)' }}
              transition={{ duration: 0.9, ease }}
              className="max-w-2xl"
            >
              <span className="inline-block rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-ember">
                Now Trending
              </span>
              <h1 className="mt-5 font-display text-5xl font-semibold leading-[1.02] tracking-tight md:text-7xl">
                {movie.title}
              </h1>
              <div className="mt-4 flex items-center gap-3 text-sm text-white/50">
                <span className="flex items-center gap-1.5 text-gold">
                  <StarIcon className="h-3.5 w-3.5" />
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-white/20">•</span>
                <span>{(movie.release_date ?? '').slice(0, 4)}</span>
                <span className="text-white/20">•</span>
                <span className="uppercase tracking-widest text-white/40">{movie.original_language}</span>
              </div>
              <p className="mt-5 line-clamp-3 max-w-xl text-sm leading-relaxed text-white/55 md:text-base">
                {movie.overview}
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Link
                  to={`/movie/${movie.id}`}
                  className="group flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-fluid hover:scale-[1.03] active:scale-[0.97]"
                >
                  View details
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-fluid group-hover:-translate-y-px group-hover:translate-x-1 group-hover:scale-105">
                    <ArrowUpRightIcon className="h-3.5 w-3.5" />
                  </span>
                </Link>
                <button
                  onClick={handleSave}
                  className={`flex items-center gap-2.5 rounded-full border px-6 py-3 text-sm font-medium transition-colors duration-500 ease-fluid active:scale-[0.97] ${
                    saved
                      ? 'border-ember/40 bg-ember/15 text-ember'
                      : 'border-white/15 bg-white/5 text-white/85 hover:bg-white/15'
                  }`}
                >
                  <BookmarkIcon filled={saved} className="h-4 w-4" />
                  {saved ? 'In your watchlist' : 'Add to watchlist'}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute inset-x-6 bottom-10 z-10 flex items-center justify-between md:inset-x-12">
        <div className="flex items-center gap-2">
          {movies.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setIndex(i)}
              aria-label={m.title}
              className={`h-1.5 rounded-full transition-all duration-700 ease-fluid ${
                i === index ? 'w-8 bg-white' : 'w-3 bg-white/25 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setMuted(!muted)}
          aria-label={muted ? 'Unmute trailer' : 'Mute trailer'}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white/80 backdrop-blur-xl transition-colors duration-500 ease-fluid hover:bg-white/15 hover:text-white active:scale-[0.94]"
        >
          {muted ? <VolumeOffIcon className="h-4.5 w-4.5" /> : <VolumeOnIcon className="h-4.5 w-4.5" />}
        </button>
      </div>
    </section>
  )
}
