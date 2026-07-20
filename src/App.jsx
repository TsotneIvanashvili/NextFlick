import { motion } from 'framer-motion'

export default function App() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-128 w-240 -translate-x-1/2 rounded-full bg-ember/20 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-indigo-600/10 blur-[100px]" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 text-center"
      >
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.5em] text-white/40">
          Coming soon
        </p>
        <h1 className="text-6xl font-black tracking-tight sm:text-8xl">
          Next<span className="text-ember">Flick</span>
        </h1>
        <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/50">
          A cinematic home for every movie you'll ever love. Trailers, trending
          picks, and your personal watchlist — all in one place.
        </p>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1.2, ease: 'easeOut' }}
          className="mx-auto mt-10 h-px w-48 origin-center bg-linear-to-r from-transparent via-ember to-transparent"
        />
      </motion.div>
    </div>
  )
}
