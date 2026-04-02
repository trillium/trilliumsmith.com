import { genPageMetadata } from 'app/seo'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

// Force dynamic rendering so searchParams are always fresh
export const dynamic = 'force-dynamic'

interface LivePageProps {
  searchParams: Promise<{ title?: string; topic?: string }>
}

export async function generateMetadata({ searchParams }: LivePageProps) {
  const params = await searchParams
  const title = params.title || 'Live on Twitch'
  const topic = params.topic

  const description = topic
    ? `Trillium is streaming: ${title} — ${topic}`
    : `Trillium is streaming: ${title}`

  const ogImageUrl = `/live/opengraph-image${
    params.title || params.topic
      ? '?' +
        new URLSearchParams(
          Object.fromEntries(
            Object.entries({ title: params.title, topic: params.topic }).filter(
              ([, v]) => v !== undefined
            ) as [string, string][]
          )
        ).toString()
      : ''
  }`

  return genPageMetadata({
    title: 'Live on Twitch',
    description,
    image: ogImageUrl,
  })
}

export default async function LivePage({ searchParams }: LivePageProps) {
  const params = await searchParams
  const title = params.title || 'Come hang out!'
  const topic = params.topic

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      {/* Live badge */}
      <div className="mb-6 flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5">
        <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
        <span className="text-sm font-semibold uppercase tracking-widest text-red-500">Live</span>
      </div>

      {/* Main heading */}
      <h1 className="mb-2 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
        Trillium is live on Twitch
      </h1>

      {/* Stream title */}
      <p className="mb-2 mt-4 max-w-2xl text-2xl font-semibold text-teal-500">{title}</p>

      {/* Topic */}
      {topic && <p className="mb-6 max-w-xl text-lg text-gray-500 dark:text-gray-400">{topic}</p>}

      {/* Watch Live button */}
      <a
        href="https://twitch.tv/trilliumsmith"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-teal-500 px-8 py-3.5 text-lg font-bold text-white shadow-lg transition hover:bg-teal-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z" />
        </svg>
        Watch Live
      </a>

      {/* Divider */}
      <div className="mt-12 flex w-full max-w-sm items-center gap-4">
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
        <span className="text-xs text-gray-400">find me elsewhere</span>
        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
      </div>

      {/* Social handles */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
        <a
          href="https://bsky.app/profile/trillium.is"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-gray-500 transition hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400"
        >
          <SocialIcon
            kind="bluesky"
            href="https://bsky.app/profile/trillium.is"
            size={5}
            iconOnly
          />
          <span className="text-sm font-medium">@trillium.is</span>
        </a>

        <a
          href="https://github.com/trilliumsmith"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-gray-500 transition hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400"
        >
          <SocialIcon kind="github" href="https://github.com/trilliumsmith" size={5} iconOnly />
          <span className="text-sm font-medium">trilliumsmith</span>
        </a>

        <a
          href="https://twitch.tv/trilliumsmith"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2 text-gray-500 transition hover:text-teal-500 dark:text-gray-400 dark:hover:text-teal-400"
        >
          <SocialIcon kind="twitch" href="https://twitch.tv/trilliumsmith" size={5} iconOnly />
          <span className="text-sm font-medium">trilliumsmith</span>
        </a>
      </div>
    </div>
  )
}
