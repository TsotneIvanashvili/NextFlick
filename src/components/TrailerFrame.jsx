import { useEffect, useRef, useState } from 'react'

export default function TrailerFrame({ trailerKey, title, muted = true, className = '' }) {
  const boxRef = useRef(null)
  const frameRef = useRef(null)
  const appliedRef = useRef(true)
  const [inView, setInView] = useState(false)
  const [loaded, setLoaded] = useState(false)

  const send = (func, args = []) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args }),
      '*',
    )
  }

  useEffect(() => {
    // trailerKey often arrives after mount; the box only exists once it does,
    // so the observer must re-attach when the key changes.
    const el = boxRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: '250px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [trailerKey])

  useEffect(() => {
    if (!inView) {
      appliedRef.current = true
      setLoaded(false)
    }
  }, [inView, trailerKey])

  useEffect(() => {
    if (!loaded) return
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'listening', id: trailerKey, channel: 'widget' }),
      '*',
    )
    const onMessage = (e) => {
      if (typeof e.origin !== 'string' || !e.origin.includes('youtube')) return
      if (e.source !== frameRef.current?.contentWindow) return
      try {
        const data = JSON.parse(e.data)
        if (data.event === 'onStateChange' && data.info === 0) {
          send('seekTo', [0, true])
          send('playVideo')
        }
      } catch {
        return
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [loaded, trailerKey])

  useEffect(() => {
    // autoplay=1 is not always honored for embeds; nudge playback once the
    // widget has had a moment to register the 'listening' handshake.
    if (!loaded) return
    const timer = setTimeout(() => send('playVideo'), 500)
    return () => clearTimeout(timer)
  }, [loaded])

  useEffect(() => {
    if (!loaded || muted === appliedRef.current) return
    appliedRef.current = muted
    if (muted) {
      send('mute')
    } else {
      send('unMute')
      send('setVolume', [100])
    }
  }, [muted, loaded])

  if (!trailerKey) return null

  return (
    <div ref={boxRef} className={`pointer-events-none ${className}`}>
      {inView && (
        <iframe
          ref={frameRef}
          onLoad={() => setLoaded(true)}
          src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&iv_load_policy=3&playsinline=1&disablekb=1&fs=0&cc_load_policy=0&enablejsapi=1`}
          title={title}
          allow="autoplay; encrypted-media"
          className="pointer-events-none h-full w-full"
        />
      )}
    </div>
  )
}
