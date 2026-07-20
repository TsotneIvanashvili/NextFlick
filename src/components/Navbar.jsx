import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/search', label: 'Search' },
  { to: '/watchlist', label: 'Watchlist' },
]

const ease = [0.32, 0.72, 0, 1]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
        <motion.nav
          initial={{ opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease }}
          className="pointer-events-auto flex w-full max-w-3xl items-center justify-between gap-2 rounded-full border border-white/10 bg-black/50 p-2 shadow-[0_8px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl"
        >
          <Link to="/" onClick={() => setOpen(false)} className="pl-4 font-display text-lg font-semibold tracking-tight">
            Next<span className="text-ember">Flick</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition-colors duration-500 ease-fluid ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {user ? (
              <>
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ember/90 text-sm font-semibold">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors duration-500 ease-fluid hover:bg-white/15 hover:text-white active:scale-[0.98]"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition-transform duration-500 ease-fluid hover:scale-[1.04] active:scale-[0.98]"
              >
                Sign in
              </Link>
            )}
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            className="relative mr-2 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 md:hidden"
          >
            <span
              className={`absolute h-px w-4 bg-white transition-transform duration-500 ease-fluid ${
                open ? 'rotate-45' : '-translate-y-[3px]'
              }`}
            />
            <span
              className={`absolute h-px w-4 bg-white transition-transform duration-500 ease-fluid ${
                open ? '-rotate-45' : 'translate-y-[3px]'
              }`}
            />
          </button>
        </motion.nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/85 backdrop-blur-3xl md:hidden"
          >
            {links.map((l, i) => (
              <motion.div
                key={l.to}
                initial={{ y: 48, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.7, ease }}
              >
                <NavLink
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-display text-4xl font-semibold text-white/85 transition-colors hover:text-white"
                >
                  {l.label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div
              initial={{ y: 48, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.34, duration: 0.7, ease }}
            >
              {user ? (
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-white/15 bg-white/5 px-8 py-3 text-sm text-white/70"
                >
                  Sign out
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-black"
                >
                  Sign in
                </Link>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
