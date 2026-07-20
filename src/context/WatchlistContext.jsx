import { createContext, useContext, useEffect, useState } from 'react'
import { useAuth } from './AuthContext.jsx'

const WatchlistContext = createContext(null)

export function WatchlistProvider({ children }) {
  const { user } = useAuth()
  const storageKey = user ? `nextflick_watchlist_${user.email}` : null
  const [items, setItems] = useState([])

  useEffect(() => {
    if (!storageKey) {
      setItems([])
      return
    }
    try {
      setItems(JSON.parse(localStorage.getItem(storageKey)) ?? [])
    } catch {
      setItems([])
    }
  }, [storageKey])

  const toggle = (movie) => {
    if (!storageKey) return false
    setItems((prev) => {
      const exists = prev.some((m) => m.id === movie.id)
      const next = exists
        ? prev.filter((m) => m.id !== movie.id)
        : [
            {
              id: movie.id,
              title: movie.title,
              poster_path: movie.poster_path,
              backdrop_path: movie.backdrop_path,
              vote_average: movie.vote_average,
              release_date: movie.release_date,
            },
            ...prev,
          ]
      localStorage.setItem(storageKey, JSON.stringify(next))
      return next
    })
    return true
  }

  const has = (id) => items.some((m) => m.id === id)

  return (
    <WatchlistContext.Provider value={{ items, toggle, has }}>
      {children}
    </WatchlistContext.Provider>
  )
}

export function useWatchlist() {
  return useContext(WatchlistContext)
}
