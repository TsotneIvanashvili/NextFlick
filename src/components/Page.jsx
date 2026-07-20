import { motion } from 'framer-motion'

export default function Page({ children, className = '' }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
      className={className}
    >
      {children}
    </motion.main>
  )
}
