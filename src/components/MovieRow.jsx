import { useRef } from 'react'
import MovieCard from './MovieCard.jsx'
import Reveal from './Reveal.jsx'
import { ChevronLeftIcon, ChevronRightIcon } from './icons.jsx'

export default function MovieRow({ title, eyebrow, movies }) {
  const trackRef = useRef(null)

  const scroll = (dir) => {
    const el = trackRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: 'smooth' })
  }

  if (!movies?.length) return null

  return (
    <Reveal>
      <section>
        <div className="mb-6 flex items-end justify-between px-6 md:px-12">
          <div>
            {eyebrow && (
              <span className="mb-3 inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/50">
                {eyebrow}
              </span>
            )}
            <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">{title}</h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button
              onClick={() => scroll(-1)}
              aria-label="Scroll left"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors duration-500 ease-fluid hover:bg-white/15 hover:text-white active:scale-[0.94]"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              aria-label="Scroll right"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-colors duration-500 ease-fluid hover:bg-white/15 hover:text-white active:scale-[0.94]"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div
          ref={trackRef}
          className="no-scrollbar flex snap-x gap-4 overflow-x-auto px-6 pb-2 md:px-12"
        >
          {movies.map((m) => (
            <MovieCard key={m.id} movie={m} />
          ))}
        </div>
      </section>
    </Reveal>
  )
}
