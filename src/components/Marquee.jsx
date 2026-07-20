const phrases = [
  'Blockbusters',
  'Indie Gems',
  'Cult Classics',
  'Oscar Winners',
  'Midnight Horror',
  'Sci-Fi Epics',
  'Animated Worlds',
  'True Stories',
]

export default function Marquee() {
  const loop = [...phrases, ...phrases]
  return (
    <div className="overflow-hidden border-y border-white/5 py-7">
      <div className="animate-marquee flex w-max items-center gap-12">
        {loop.map((p, i) => (
          <span key={i} className="flex items-center gap-12">
            <span className="font-display text-2xl font-medium uppercase tracking-[0.2em] text-white/12 md:text-3xl">
              {p}
            </span>
            <span className="text-lg text-ember/30">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
