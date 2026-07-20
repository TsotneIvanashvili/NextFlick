import { motion } from 'framer-motion'

const ease = [0.32, 0.72, 0, 1]
const word = 'NEXTFLICK'

export default function LoadingScreen() {
  return (
    <motion.div
      exit={{ y: '-100%' }}
      transition={{ duration: 0.9, ease }}
      className="fixed inset-0 z-80 flex flex-col items-center justify-center bg-abyss"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6 }}
          className="absolute left-1/2 top-1/2 h-120 w-240 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember/10 blur-[160px]"
        />
      </div>
      <div className="relative flex overflow-hidden">
        {word.split('').map((c, i) => (
          <motion.span
            key={i}
            initial={{ y: '120%', rotate: 6 }}
            animate={{ y: 0, rotate: 0 }}
            transition={{ delay: 0.15 + i * 0.06, duration: 0.9, ease }}
            className={`font-display text-5xl font-semibold tracking-tight md:text-7xl ${
              i >= 4 ? 'text-ember' : 'text-white'
            }`}
          >
            {c}
          </motion.span>
        ))}
      </div>
      <div className="relative mt-10 h-px w-56 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 1.7, ease }}
          className="h-full w-full origin-left bg-linear-to-r from-ember to-gold"
        />
      </div>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="mt-6 text-[10px] font-medium uppercase tracking-[0.4em] text-white/30"
      >
        Rolling the film
      </motion.p>
    </motion.div>
  )
}
