import { useEffect, useMemo, useState } from 'react'
import Page from '../components/Page.jsx'
import TrailerHero from '../components/TrailerHero.jsx'
import MovieRow from '../components/MovieRow.jsx'
import Top10Row from '../components/Top10Row.jsx'
import Marquee from '../components/Marquee.jsx'
import Spotlight from '../components/Spotlight.jsx'
import TrailerTheatre from '../components/TrailerTheatre.jsx'
import TrailerWall from '../components/TrailerWall.jsx'
import { tmdb } from '../lib/tmdb.js'

const sections = [
  { key: 'trending', fetch: () => tmdb.trending() },
  { key: 'nowPlaying', fetch: () => tmdb.nowPlaying() },
  { key: 'topRated', fetch: () => tmdb.topRated() },
  { key: 'upcoming', fetch: () => tmdb.upcoming() },
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
      <div className="space-y-28 py-24 md:space-y-40">
        <Top10Row movies={rows.trending} />
        <TrailerTheatre movies={rows.nowPlaying} />
        <TrailerWall movies={rows.upcoming} />
        <Spotlight movie={spotlight} />
        <MovieRow title="Critically Adored" eyebrow="All-time greats" movies={rows.topRated} />
      </div>
    </Page>
  )
}
