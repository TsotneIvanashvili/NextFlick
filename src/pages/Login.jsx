import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Page from '../components/Page.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const ease = [0.32, 0.72, 0, 1]

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      login({ email, password })
      navigate(location.state?.from ?? '/', { replace: true })
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <Page className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden px-4 py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-120 w-240 -translate-x-1/2 rounded-full bg-ember/15 blur-[160px]" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-indigo-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.9, ease }}
        className="relative z-10 w-full max-w-md rounded-4xl bg-white/5 p-2 ring-1 ring-white/10"
      >
        <div className="rounded-3xl bg-onyx px-8 py-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
          <span className="inline-block rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.25em] text-white/50">
            Welcome back
          </span>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight">
            Sign in to Next<span className="text-ember">Flick</span>
          </h1>
          <p className="mt-2 text-sm text-white/40">Your watchlist has missed you.</p>

          <form onSubmit={handleSubmit} className="mt-10 space-y-5">
            <div>
              <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl bg-white/5 px-4 py-3.5 text-sm text-white ring-1 ring-white/10 outline-none transition-shadow duration-500 ease-fluid placeholder:text-white/20 focus:ring-2 focus:ring-ember/60"
              />
            </div>
            <div>
              <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-white/5 px-4 py-3.5 text-sm text-white ring-1 ring-white/10 outline-none transition-shadow duration-500 ease-fluid placeholder:text-white/20 focus:ring-2 focus:ring-ember/60"
              />
            </div>

            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease }}
                  className="text-sm text-ember"
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className="w-full rounded-full bg-white py-3.5 text-sm font-semibold text-black transition-transform duration-500 ease-fluid hover:scale-[1.02] active:scale-[0.98]"
            >
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-white/35">
            New to NextFlick?{' '}
            <Link to="/signup" className="font-medium text-white transition-colors hover:text-ember">
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </Page>
  )
}
