import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Reveal from './Reveal.jsx'
import { img } from '../lib/tmdb.js'

const ease = [0.32, 0.72, 0, 1]

export default function Top10Row({ movies }) {
  if (!movies?.length) return null
  const top = movies.filter((m) => m.poster_path).slice(0, 10)

  return (
    <Reveal>
      <section>
        <div className="mb-6 px-6 md:px-12">
          <span className="mb-3 inline-block rounded-full border border-ember/30 bg-ember/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-ember">
            The leaderboard
          </span>
          <h2 className="font-display text-2xl font-semibold tracking-tight md:text-3xl">
            Top 10 This Week
          </h2>
        </div>
        <div className="no-scrollbar flex snap-x gap-3 overflow-x-auto px-6 pb-2 md:px-12">
          {top.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: 48 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: Math.min(i * 0.06, 0.5), ease }}
              className="shrink-0 snap-start"
            >
              <Link
                to={`/movie/${m.id}`}
                className={`group relative flex items-end ${i === 9 ? 'pl-24 md:pl-32' : 'pl-14 md:pl-20'}`}
              >
                <span
                  aria-hidden
                  className="absolute bottom-0 left-0 z-0 select-none font-display text-[7rem] font-bold leading-[0.8] text-transparent transition-all duration-700 ease-fluid group-hover:text-ember/20 md:text-[10rem]"
                  style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.18)' }}
                >
                  {i + 1}
                </span>
                <div className="relative z-10 w-32 rounded-2xl bg-white/5 p-1.5 ring-1 ring-white/10 transition-transform duration-500 ease-fluid group-hover:-translate-y-2 md:w-40">
                  <div className="aspect-[2/3] overflow-hidden rounded-[calc(1rem-0.125rem)] bg-onyx">
                    <img
                      src={img.poster(m.poster_path)}
                      alt={m.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-fluid group-hover:scale-[1.06]"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </Reveal>
  )
}
