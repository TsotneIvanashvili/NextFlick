function Base({ children, className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {children}
    </svg>
  )
}

export function SearchIcon(props) {
  return (
    <Base {...props}>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </Base>
  )
}

export function ArrowUpRightIcon(props) {
  return (
    <Base {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </Base>
  )
}

export function ChevronLeftIcon(props) {
  return (
    <Base {...props}>
      <path d="m14 6-6 6 6 6" />
    </Base>
  )
}

export function ChevronRightIcon(props) {
  return (
    <Base {...props}>
      <path d="m10 6 6 6-6 6" />
    </Base>
  )
}

export function CloseIcon(props) {
  return (
    <Base {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </Base>
  )
}

export function PlayIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M8 5.5v13a.5.5 0 0 0 .77.42l10.2-6.5a.5.5 0 0 0 0-.84L8.77 5.08A.5.5 0 0 0 8 5.5Z" />
    </svg>
  )
}

export function StarIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m12 3.2 2.6 5.6 6.1.7-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.5l6.1-.7L12 3.2Z" />
    </svg>
  )
}

export function BookmarkIcon({ filled = false, className = 'h-4 w-4' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6.5 4.5h11V20l-5.5-3.8L6.5 20V4.5Z" />
    </svg>
  )
}

export function VolumeOnIcon(props) {
  return (
    <Base {...props}>
      <path d="M4.5 9.5v5h3l4.5 3.5v-12L7.5 9.5h-3Z" />
      <path d="M15.5 9.5a3.5 3.5 0 0 1 0 5" />
      <path d="M17.8 7.2a6.5 6.5 0 0 1 0 9.6" />
    </Base>
  )
}

export function VolumeOffIcon(props) {
  return (
    <Base {...props}>
      <path d="M4.5 9.5v5h3l4.5 3.5v-12L7.5 9.5h-3Z" />
      <path d="m15.5 9.5 5 5" />
      <path d="m20.5 9.5-5 5" />
    </Base>
  )
}

export function FilmIcon(props) {
  return (
    <Base {...props}>
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" />
      <path d="M8 5v14" />
      <path d="M16 5v14" />
      <path d="M3.5 12h17" />
    </Base>
  )
}
