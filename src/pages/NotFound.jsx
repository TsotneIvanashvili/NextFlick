import { Link } from 'react-router-dom'
import Page from '../components/Page.jsx'
import { ArrowUpRightIcon } from '../components/icons.jsx'

export default function NotFound() {
  return (
    <Page className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="font-display text-8xl font-semibold text-white/10">404</p>
      <h1 className="font-display text-3xl font-semibold tracking-tight">Scene not found</h1>
      <p className="max-w-sm text-sm leading-relaxed text-white/40">
        This reel seems to be missing. Let's get you back to the show.
      </p>
      <Link
        to="/"
        className="group flex items-center gap-3 rounded-full bg-white py-2 pl-6 pr-2 text-sm font-semibold text-black transition-transform duration-500 ease-fluid hover:scale-[1.03] active:scale-[0.97]"
      >
        Back home
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-black/10 transition-transform duration-500 ease-fluid group-hover:-translate-y-px group-hover:translate-x-1">
          <ArrowUpRightIcon className="h-3.5 w-3.5" />
        </span>
      </Link>
    </Page>
  )
}
