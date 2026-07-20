const API = 'https://api.themoviedb.org/3'
const TOKEN = import.meta.env.VITE_TMDB_TOKEN

async function get(path, params = {}) {
  const url = new URL(API + path)
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null) url.searchParams.set(k, v)
  })
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: 'application/json' },
  })
  if (!res.ok) throw new Error(`TMDB ${res.status}`)
  return res.json()
}

export const tmdb = {
  trending: () => get('/trending/movie/week'),
  popular: (page = 1) => get('/movie/popular', { page }),
  topRated: () => get('/movie/top_rated'),
  upcoming: () => get('/movie/upcoming'),
  nowPlaying: () => get('/movie/now_playing'),
  byGenre: (id) => get('/discover/movie', { with_genres: id, sort_by: 'popularity.desc', 'vote_count.gte': 200 }),
  search: (query, page = 1) => get('/search/movie', { query, page, include_adult: false }),
  movie: (id) => get(`/movie/${id}`, { append_to_response: 'videos,credits,similar' }),
  videos: (id) => get(`/movie/${id}/videos`),
}

export const img = {
  poster: (path, size = 'w500') => (path ? `https://image.tmdb.org/t/p/${size}${path}` : null),
  backdrop: (path, size = 'original') => (path ? `https://image.tmdb.org/t/p/${size}${path}` : null),
  profile: (path) => (path ? `https://image.tmdb.org/t/p/w185${path}` : null),
}

export function pickTrailer(videos) {
  const list = videos?.results?.filter((v) => v.site === 'YouTube') ?? []
  return (
    list.find((v) => v.type === 'Trailer' && v.official) ||
    list.find((v) => v.type === 'Trailer') ||
    list.find((v) => v.type === 'Teaser') ||
    null
  )
}
