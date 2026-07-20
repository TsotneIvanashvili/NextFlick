import { useEffect, useRef, useState } from 'react'

export default function TrailerFrame({ trailerKey, title, muted = true, className = '' }) {
  const frameRef = useRef(null)
  const [loaded, setLoaded] = useState(false)

  const send = (func) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args: [] }),
      '*',
    )
  }

  useEffect(() => {
    if (!loaded) return
    const apply = () => {
      if (muted) {
        send('mute')
      } else {
        send('unMute')
        send('playVideo')
      }
    }
    const t1 = setTimeout(apply, 300)
    const t2 = setTimeout(apply, 1500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [muted, loaded, trailerKey])

  if (!trailerKey) return null

  return (
    <iframe
      ref={frameRef}
      onLoad={() => setLoaded(true)}
      src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&loop=1&playlist=${trailerKey}&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&disablekb=1&fs=0&cc_load_policy=0&enablejsapi=1`}
      title={title}
      allow="autoplay; encrypted-media"
      className={`pointer-events-none ${className}`}
    />
  )
}
