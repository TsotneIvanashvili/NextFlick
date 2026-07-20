import { Link, useNavigate } from 'react-router-dom'
import { img } from '../lib/tmdb.js'
import { useAuth } from '../context/AuthContext.jsx'
import { useWatchlist } from '../context/WatchlistContext.jsx'
import { BookmarkIcon, StarIcon } from './icons.jsx'

export default function MovieCard({ movie, width = 'w-full' }) {
  const { user } = useAuth()
  const { has, toggle } = useWatchlist()
  const navigate = useNavigate()
  const saved = has(movie.id)
  const year = (movie.release_date ?? '').slice(0, 4)
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : '–'

  const handleSave = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (!user) {
      navigate('/login')
      return
    }
    toggle(movie)
  }

  return (
    <Link to={`/movie/${movie.id}`} className={`group relative block ${width}`}>
      <div className="rounded-2xl bg-white/5 p-1.5 ring-1 ring-white/10 transition-transform duration-500 ease-fluid group-hover:-translate-y-2">
        <div className="relative aspect-2/3 overflow-hidden rounded-[0.875rem] bg-onyx">
          {movie.poster_path ? (
            <img
              src={img.poster(movie.poster_path)}
              alt={movie.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-fluid group-hover:scale-[1.06]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center p-4 text-center font-display text-sm text-white/30">
              {movie.title}
            </div>
          )}
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 ease-fluid group-hover:opacity-100" />
          <button
            onClick={handleSave}
            aria-label="Toggle watchlist"
            className={`absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 backdrop-blur-xl transition-all duration-500 ease-fluid active:scale-[0.9] ${
              saved
                ? 'bg-ember text-white opacity-100'
                : 'bg-black/40 text-white opacity-0 hover:bg-black/70 group-hover:opacity-100'
            }`}
          >
            <BookmarkIcon filled={saved} className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-gold opacity-0 backdrop-blur-xl transition-opacity duration-500 ease-fluid group-hover:opacity-100">
            <StarIcon className="h-3 w-3" />
            {rating}
          </div>
        </div>
      </div>
      <p className="mt-3 truncate text-sm font-medium text-white/70 transition-colors duration-500 group-hover:text-white">
        {movie.title}
      </p>
      <p className="mt-0.5 text-xs text-white/30">{year || 'TBA'}</p>
    </Link>
  )
}
