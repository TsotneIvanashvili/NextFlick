import { AnimatePresence, motion } from 'framer-motion'
import { useUI } from '../context/UIContext.jsx'
import { VolumeOnIcon } from './icons.jsx'

const ease = [0.32, 0.72, 0, 1]

export default function SoundPrompt({ ready }) {
  const { soundChosen, chooseSound } = useUI()

  return (
    <AnimatePresence>
      {ready && !soundChosen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease }}
          className="fixed inset-0 z-70 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.92, y: 32, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 16, opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease }}
            className="w-full max-w-sm rounded-4xl bg-white/5 p-2 ring-1 ring-white/10"
          >
            <div className="rounded-3xl bg-onyx px-8 py-11 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.35, duration: 0.7, ease }}
                className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-ember/30 bg-ember/10 text-ember"
              >
                <VolumeOnIcon className="h-6 w-6" />
              </motion.span>
              <h2 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                Trailers with sound?
              </h2>
              <p className="mx-auto mt-3 max-w-60 text-sm leading-relaxed text-white/40">
                Background trailers can play with audio for the full cinema feel.
              </p>
              <div className="mt-8 flex flex-col gap-3">
                <button
                  onClick={() => chooseSound(true)}
                  className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-black transition-transform duration-500 ease-fluid hover:scale-[1.02] active:scale-[0.98]"
                >
                  Sound on
                </button>
                <button
                  onClick={() => chooseSound(false)}
                  className="w-full rounded-full border border-white/15 bg-white/5 py-3.5 text-sm font-medium text-white/70 transition-colors duration-500 ease-fluid hover:bg-white/10 hover:text-white active:scale-[0.98]"
                >
                  Keep it muted
                </button>
              </div>
              <p className="mt-5 text-[11px] text-white/25">You can flip this anytime from the hero.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
