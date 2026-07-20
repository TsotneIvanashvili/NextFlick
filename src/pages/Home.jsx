import { useEffect, useState } from 'react'
import Page from '../components/Page.jsx'
import TrailerHero from '../components/TrailerHero.jsx'
import MovieRow from '../components/MovieRow.jsx'
import { tmdb } from '../lib/tmdb.js'

const sections = [
  { key: 'trending', title: 'Trending This Week', eyebrow: 'Hot right now', fetch: () => tmdb.trending() },
  { key: 'nowPlaying', title: 'In Theatres Now', eyebrow: 'On the big screen', fetch: () => tmdb.nowPlaying() },
  { key: 'topRated', title: 'Critically Adored', eyebrow: 'All-time greats', fetch: () => tmdb.topRated() },
  { key: 'upcoming', title: 'Coming Soon', eyebrow: 'Mark your calendar', fetch: () => tmdb.upcoming() },
  { key: 'action', title: 'Adrenaline Rush', eyebrow: 'Action', fetch: () => tmdb.byGenre(28) },
  { key: 'scifi', title: 'Other Worlds', eyebrow: 'Sci-fi', fetch: () => tmdb.byGenre(878) },
  { key: 'animation', title: 'Animated Wonders', eyebrow: 'Animation', fetch: () => tmdb.byGenre(16) },
  { key: 'horror', title: 'After Midnight', eyebrow: 'Horror', fetch: () => tmdb.byGenre(27) },
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

  return (
    <Page>
      <TrailerHero />
      <div className="space-y-20 py-24 md:space-y-28">
        {sections.map((s) => (
          <MovieRow key={s.key} title={s.title} eyebrow={s.eyebrow} movies={rows[s.key]} />
        ))}
      </div>
    </Page>
  )
}
