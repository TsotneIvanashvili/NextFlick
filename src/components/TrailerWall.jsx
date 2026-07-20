import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import TrailerFrame from './TrailerFrame.jsx'
import { img } from '../lib/tmdb.js'
import { useTrailerKeys } from '../hooks/useTrailerKeys.js'

const ease = [0.32, 0.72, 0, 1]

const slots = [
  'md:absolute md:left-0 md:top-0 md:w-[46%] md:-rotate-2',
  'md:absolute md:right-[1%] md:top-[14%] md:w-[44%] md:rotate-2',
  'md:absolute md:left-[7%] md:bottom-[4%] md:w-[43%] md:rotate-1',
  'md:absolute md:right-[9%] md:bottom-0 md:w-[41%] md:-rotate-1',
]

export default function TrailerWall({ movies }) {
  const pool = useMemo(
    () => (movies ?? []).filter((m) => m.backdrop_path).slice(0, 9),
    [movies],
  )
  const keys = useTrailerKeys(pool, 9)
  const playable = pool.filter((m) => keys[m.id]).slice(0, 4)

  if (playable.length < 2) return null

  return (
    <section className="px-6 md:px-12">
      <div className="mx-auto max-w-6xl">
        <Reveal className="text-center">
          <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-gold">
            Coming soon
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">
            The Wall of Trailers
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-white/40">
            Tomorrow's obsessions, all playing at once. Hover one to pull it forward.
          </p>
        </Reveal>

        <div className="relative mt-14 flex flex-col gap-6 md:mt-20 md:block md:h-[78vh] lg:h-[88vh]">
          {playable.map((m, i) => (
            <div
              key={m.id}
              style={{ zIndex: 10 + i }}
              className={`transition-all duration-700 ease-fluid hover:z-40 hover:rotate-0 hover:scale-[1.04] ${slots[i]}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 64 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: i * 0.12, ease }}
              >
                <Link
                  to={`/movie/${m.id}`}
                  className="group block overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-[0_35px_90px_rgba(0,0,0,0.65)]"
                >
                  <div className="relative aspect-video bg-onyx">
                    <img
                      src={img.backdrop(m.backdrop_path, 'w780')}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <TrailerFrame
                      trailerKey={keys[m.id]}
                      title={m.title}
                      className="absolute inset-0 h-full w-full scale-[1.4]"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/75 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-5 z-10">
                      <p className="font-display text-lg font-semibold tracking-tight md:text-xl">
                        {m.title}
                      </p>
                      <p className="text-xs text-white/45">{(m.release_date ?? '').slice(0, 4)}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
