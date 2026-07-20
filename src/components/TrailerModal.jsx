import { AnimatePresence, motion } from 'framer-motion'
import { CloseIcon } from './icons.jsx'

const ease = [0.32, 0.72, 0, 1]

export default function TrailerModal({ trailerKey, title, onClose }) {
  return (
    <AnimatePresence>
      {trailerKey && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease }}
          onClick={onClose}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/90 p-4 backdrop-blur-2xl"
        >
          <motion.div
            initial={{ scale: 0.92, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ duration: 0.6, ease }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-5xl rounded-4xl bg-white/5 p-2 ring-1 ring-white/10"
          >
            <div className="overflow-hidden rounded-3xl bg-black">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&rel=0`}
                  title={title}
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </div>
          </motion.div>
          <button
            onClick={onClose}
            aria-label="Close trailer"
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/70 transition-colors duration-500 ease-fluid hover:bg-white/15 hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
