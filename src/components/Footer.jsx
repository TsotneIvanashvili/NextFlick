import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-center">
        <Link to="/" className="font-display text-2xl font-semibold tracking-tight">
          Next<span className="text-ember">Flick</span>
        </Link>
        <p className="max-w-sm text-sm leading-relaxed text-white/35">
          A cinematic home for every movie you'll ever love. Trailers, trending picks, and your
          personal watchlist — all in one place.
        </p>
        <div className="flex items-center gap-6 text-xs text-white/30">
          <Link to="/search" className="transition-colors hover:text-white/70">
            Discover
          </Link>
          <Link to="/watchlist" className="transition-colors hover:text-white/70">
            Watchlist
          </Link>
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-white/70"
          >
            TMDB
          </a>
        </div>
        <p className="text-[11px] leading-relaxed text-white/20">
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </p>
      </div>
    </footer>
  )
}
