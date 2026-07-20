import { useEffect, useMemo, useState } from 'react'
import Page from '../components/Page.jsx'
import TrailerHero from '../components/TrailerHero.jsx'
import MovieRow from '../components/MovieRow.jsx'
import Top10Row from '../components/Top10Row.jsx'
import Marquee from '../components/Marquee.jsx'
import Spotlight from '../components/Spotlight.jsx'
import { tmdb } from '../lib/tmdb.js'

const sections = [
  { key: 'trending', fetch: () => tmdb.trending() },
  { key: 'nowPlaying', fetch: () => tmdb.nowPlaying() },
  { key: 'topRated', fetch: () => tmdb.topRated() },
  { key: 'upcoming', fetch: () => tmdb.upcoming() },
  { key: 'action', fetch: () => tmdb.byGenre(28) },
  { key: 'scifi', fetch: () => tmdb.byGenre(878) },
  { key: 'animation', fetch: () => tmdb.byGenre(16) },
  { key: 'horror', fetch: () => tmdb.byGenre(27) },
]

export default function Home() {
  const [rows, setRows] = useState({})

  useEffect(() => {
    sections.forEach((s) => {
      s.fetch()
        .then((d) => setRows((prev) => ({ ...prev, [s.key]: d.results })))
        .catch(() => {})
    })
  }, [])

  const spotlight = useMemo(() => {
    const pool = rows.topRated?.filter((m) => m.backdrop_path && m.overview) ?? []
    return pool[Math.floor(Math.random() * Math.min(pool.length, 8))]
  }, [rows.topRated])

  return (
    <Page>
      <TrailerHero />
      <Marquee />
      <div className="space-y-24 py-24 md:space-y-32">
        <Top10Row movies={rows.trending} />
        <MovieRow title="In Theatres Now" eyebrow="On the big screen" movies={rows.nowPlaying} />
        <MovieRow title="Critically Adored" eyebrow="All-time greats" movies={rows.topRated} />
        <Spotlight movie={spotlight} />
        <MovieRow title="Coming Soon" eyebrow="Mark your calendar" movies={rows.upcoming} />
        <MovieRow title="Adrenaline Rush" eyebrow="Action" movies={rows.action} />
        <MovieRow title="Other Worlds" eyebrow="Sci-fi" movies={rows.scifi} />
        <MovieRow title="Animated Wonders" eyebrow="Animation" movies={rows.animation} />
        <MovieRow title="After Midnight" eyebrow="Horror" movies={rows.horror} />
      </div>
    </Page>
  )
}
