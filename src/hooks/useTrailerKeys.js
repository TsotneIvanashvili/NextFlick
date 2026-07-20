import { useEffect, useState } from 'react'
import { tmdb, pickTrailer } from '../lib/tmdb.js'

export function useTrailerKeys(movies, limit = 6) {
  const [keys, setKeys] = useState({})

  useEffect(() => {
    movies?.slice(0, limit).forEach((m) => {
      tmdb
        .videos(m.id)
        .then((d) => setKeys((prev) => ({ ...prev, [m.id]: pickTrailer(d)?.key ?? null })))
        .catch(() => setKeys((prev) => ({ ...prev, [m.id]: null })))
    })
  }, [movies, limit])

  return keys
}
