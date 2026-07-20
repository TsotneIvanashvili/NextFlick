import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import TrailerFrame from './TrailerFrame.jsx'
import { img } from '../lib/tmdb.js'
import { useTrailerKeys } from '../hooks/useTrailerKeys.js'
import { ArrowUpRightIcon, StarIcon } from './icons.jsx'

const ease = [0.32, 0.72, 0, 1]

export default function TrailerTheatre({ movies }) {
  const pool = useMemo(
    () => (movies ?? []).filter((m) => m.backdrop_path && m.overview).slice(0, 6),
    [movies],
  )
  const keys = useTrailerKeys(pool, 6)
  const playable = pool.filter((m) => keys[m.id])
  const [index, setIndex] = useState(0)
  const movie = playable.length ? playable[index % playable.length] : null

  useEffect(() => {
    if (playable.length < 2) return
    const timer = setTimeout(() => setIndex((i) => (i + 1) % playable.length), 26000)
    return () => clearTimeout(timer)
  }, [index, playable.length])

  if (!movie) return null

  return (
    <Reveal className="px-6 md:px-12">
      <section className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <span className="inline-block rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-ember">
            Now screening
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">
            The Trailer Theatre
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/40">
            Fresh from the big screen — one trailer at a time, straight from theatres.
          </p>
        </div>

        <div className="rounded-4xl bg-white/5 p-2 ring-1 ring-white/10">
          <div className="relative aspect-video overflow-hidden rounded-3xl bg-onyx">
            <AnimatePresence>
              <motion.div
                key={movie.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2, ease }}
                className="absolute inset-0"
              >
                <img
                  src={img.backdrop(movie.backdrop_path, 'w1280')}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <TrailerFrame
                  trailerKey={keys[movie.id]}
                  title={movie.title}
                  className="absolute inset-0 h-full w-full scale-[1.4]"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/85 via-transparent to-black/20" />
              </motion.div>
            </AnimatePresence>

            <div className="absolute inset-x-0 bottom-0 z-10 flex flex-wrap items-end justify-between gap-4 p-6 md:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.7, ease }}
                >
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <span className="flex items-center gap-1 text-gold">
                      <StarIcon className="h-3 w-3" />
                      {movie.vote_average?.toFixed(1)}
                    </span>
                    <span className="text-white/20">•</span>
                    <span>{(movie.release_date ?? '').slice(0, 4)}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-semibold tracking-tight md:text-4xl">
                    {movie.title}
                  </h3>
                </motion.div>
              </AnimatePresence>
              <Link
                to={`/movie/${movie.id}`}
                className="group flex items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-fluid hover:scale-[1.03] active:scale-[0.97]"
              >
                Details
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-fluid group-hover:-translate-y-px group-hover:translate-x-1">
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        <div className="no-scrollbar mt-5 flex justify-start gap-3 overflow-x-auto pb-2 md:justify-center">
          {playable.map((m, i) => (
            <button
              key={m.id}
              onClick={() => setIndex(i)}
              aria-label={m.title}
              className={`shrink-0 overflow-hidden rounded-xl ring-1 transition-all duration-500 ease-fluid ${
                m.id === movie.id
                  ? 'w-32 ring-ember opacity-100'
                  : 'w-28 ring-white/10 opacity-45 hover:opacity-80'
              }`}
            >
              <img
                src={img.backdrop(m.backdrop_path, 'w300')}
                alt={m.title}
                loading="lazy"
                className="aspect-video w-full object-cover"
              />
            </button>
          ))}
        </div>
      </section>
    </Reveal>
  )
}
