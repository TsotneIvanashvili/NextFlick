import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { img } from '../lib/tmdb.js'
import { ArrowUpRightIcon, StarIcon } from './icons.jsx'

export default function Spotlight({ movie }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%'])

  if (!movie?.backdrop_path) return null

  return (
    <Reveal className="px-6 md:px-12">
      <section ref={ref} className="mx-auto max-w-6xl rounded-[2.5rem] bg-white/5 p-2 ring-1 ring-white/10">
        <div className="relative min-h-[70vh] overflow-hidden rounded-[calc(2.5rem-0.5rem)] md:min-h-[75vh]">
          <motion.img
            style={{ y }}
            src={img.backdrop(movie.backdrop_path)}
            alt=""
            className="absolute inset-0 h-full w-full scale-125 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-transparent to-transparent" />
          <div className="relative z-10 flex min-h-[70vh] items-end p-8 md:min-h-[75vh] md:p-14">
            <div className="max-w-xl">
              <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
                Spotlight
              </span>
              <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
                {movie.title}
              </h2>
              <div className="mt-4 flex items-center gap-3 text-sm text-white/50">
                <span className="flex items-center gap-1.5 text-gold">
                  <StarIcon className="h-3.5 w-3.5" />
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span className="text-white/20">•</span>
                <span>{(movie.release_date ?? '').slice(0, 4)}</span>
              </div>
              <p className="mt-4 line-clamp-2 text-sm leading-relaxed text-white/60 md:text-base">
                {movie.overview}
              </p>
              <Link
                to={`/movie/${movie.id}`}
                className="group mt-7 inline-flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-fluid hover:scale-[1.03] active:scale-[0.97]"
              >
                Experience it
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-fluid group-hover:-translate-y-px group-hover:translate-x-1 group-hover:scale-105">
                  <ArrowUpRightIcon className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  )
}
