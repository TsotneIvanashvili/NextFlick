import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import Page from '../components/Page.jsx'
import MovieRow from '../components/MovieRow.jsx'
import TrailerModal from '../components/TrailerModal.jsx'
import Reveal from '../components/Reveal.jsx'
import { tmdb, img, pickTrailer } from '../lib/tmdb.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import { BookmarkIcon, PlayIcon, StarIcon } from '../components/icons.jsx'

const ease = [0.32, 0.72, 0, 1]

export default function MovieDetail() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [error, setError] = useState(false)
  const [showTrailer, setShowTrailer] = useState(false)
  const { user } = useAuth()
  const { has, toggle } = useWatchlist()
  const navigate = useNavigate()

  useEffect(() => {
    setMovie(null)
    setError(false)
    setShowTrailer(false)
    tmdb
      .movie(id)
      .then(setMovie)
      .catch(() => setError(true))
  }, [id])

  if (error) {
    return (
      <Page className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6">
        <h1 className="font-display text-3xl font-semibold">Something went wrong</h1>
        <p className="text-sm text-white/40">We couldn't load this movie.</p>
      </Page>
    )
  }

  if (!movie) {
    return (
      <Page className="flex min-h-[100dvh] items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-ember" />
      </Page>
    )
  }

  const trailer = pickTrailer(movie.videos)
  const saved = has(movie.id)
  const year = (movie.release_date ?? '').slice(0, 4)
  const runtime = movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : null
  const cast = movie.credits?.cast?.slice(0, 14) ?? []
  const similar = movie.similar?.results ?? []

  const handleSave = () => {
    if (!user) {
      navigate('/login')
      return
    }
    toggle(movie)
  }

  return (
    <Page>
      <div className="relative">
        <div className="absolute inset-x-0 top-0 h-[75vh] overflow-hidden">
          {movie.backdrop_path && (
            <img
              src={img.backdrop(movie.backdrop_path)}
              alt=""
              className="h-full w-full scale-105 object-cover"
            />
          )}
          <div className="absolute inset-0 bg-abyss/40" />
          <div className="absolute inset-x-0 bottom-0 h-[50vh] bg-linear-to-t from-abyss via-abyss/80 to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-linear-to-b from-abyss/70 to-transparent" />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 pt-[38vh] md:px-12">
          <div className="flex flex-col gap-10 md:flex-row md:items-end">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="w-48 shrink-0 md:w-64"
            >
              <div className="rounded-[2rem] bg-white/5 p-2 ring-1 ring-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.6)]">
                <div className="aspect-[2/3] overflow-hidden rounded-[calc(2rem-0.5rem)] bg-onyx">
                  {movie.poster_path ? (
                    <img src={img.poster(movie.poster_path)} alt={movie.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-6 text-center font-display text-white/30">
                      {movie.title}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.12, ease }}
              className="pb-2"
            >
              <div className="flex flex-wrap gap-2">
                {movie.genres?.map((g) => (
                  <span
                    key={g.id}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-white/50"
                  >
                    {g.name}
                  </span>
                ))}
              </div>
              <h1 className="mt-5 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                {movie.title}
              </h1>
              {movie.tagline && (
                <p className="mt-3 text-sm italic text-white/35">“{movie.tagline}”</p>
              )}
              <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/50">
                <span className="flex items-center gap-1.5 text-gold">
                  <StarIcon className="h-3.5 w-3.5" />
                  {movie.vote_average?.toFixed(1)}
                  <span className="text-white/30">({movie.vote_count?.toLocaleString()})</span>
                </span>
                {year && (
                  <>
                    <span className="text-white/20">•</span>
                    <span>{year}</span>
                  </>
                )}
                {runtime && (
                  <>
                    <span className="text-white/20">•</span>
                    <span>{runtime}</span>
                  </>
                )}
              </div>
              <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/60 md:text-base">
                {movie.overview}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                {trailer && (
                  <button
                    onClick={() => setShowTrailer(true)}
                    className="group flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-fluid hover:scale-[1.03] active:scale-[0.97]"
                  >
                    Play trailer
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-fluid group-hover:scale-110">
                      <PlayIcon className="h-3.5 w-3.5" />
                    </span>
                  </button>
                )}
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
          </div>
        </div>
      </div>

      <div className="space-y-20 py-24 md:space-y-28">
        {cast.length > 0 && (
          <Reveal>
            <section>
              <div className="mb-6 px-6 md:px-12">
                <div className="mx-auto max-w-6xl">
                  <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                    The faces
                  </span>
                  <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">Cast</h2>
                </div>
              </div>
              <div className="no-scrollbar mx-auto flex max-w-6xl snap-x gap-4 overflow-x-auto px-6 pb-2 md:px-12">
                {cast.map((c) => (
                  <div key={c.id} className="w-28 shrink-0 snap-start md:w-32">
                    <div className="rounded-2xl bg-white/5 p-1.5 ring-1 ring-white/10">
                      <div className="aspect-[3/4] overflow-hidden rounded-[calc(1rem-0.125rem)] bg-onyx">
                        {c.profile_path ? (
                          <img
                            src={img.profile(c.profile_path)}
                            alt={c.name}
                            loading="lazy"
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center font-display text-2xl text-white/20">
                            {c.name.charAt(0)}
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="mt-2.5 truncate text-xs font-medium text-white/70">{c.name}</p>
                    <p className="truncate text-[11px] text-white/30">{c.character}</p>
                  </div>
                ))}
              </div>
            </section>
          </Reveal>
        )}

        {similar.length > 0 && (
          <MovieRow title="More Like This" eyebrow="Keep watching" movies={similar} />
        )}
      </div>

      <TrailerModal
        trailerKey={showTrailer ? trailer?.key : null}
        title={movie.title}
        onClose={() => setShowTrailer(false)}
      />
    </Page>
  )
}
