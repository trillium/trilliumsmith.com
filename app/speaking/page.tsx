import { genPageMetadata } from 'app/seo'
import Link from '@/components/Link'
import speakingData from '@/data/speakingData'

export const metadata = genPageMetadata({
  title: 'Speaking',
  description:
    'Conference talks, meetup sessions, and other community events with a record that they happened.',
})

const roleLabel = {
  speaker: 'Speaker',
  attendee: 'Attendee',
  participant: 'Participant',
} as const

function formatDate(isoDate: string) {
  return new Intl.DateTimeFormat('en-US', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(`${isoDate}T00:00:00Z`))
}

export default function SpeakingPage() {
  const events = [...speakingData].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          Speaking
        </h1>
        <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
          Conference talks, meetup sessions, and other community events. Each entry has a record
          that it happened. A recording is linked when one is public.
        </p>
      </div>
      <ul>
        {events.map((item) => (
          <li key={`${item.date}-${item.event}`} className="py-8">
            <p className="text-sm font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
              <time dateTime={item.date}>{formatDate(item.date)}</time>
              {item.where ? <span>{` · ${item.where}`}</span> : null}
            </p>
            <h2 className="mt-2 text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100">
              {item.event}
            </h2>
            <p className="mt-2 text-base font-medium text-primary-500">{roleLabel[item.role]}</p>
            {item.title ? (
              <p className="mt-3 text-lg text-gray-900 dark:text-gray-100">{item.title}</p>
            ) : null}
            {item.topic ? (
              <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                {item.topic}
              </p>
            ) : null}
            {item.note ? (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{item.note}</p>
            ) : null}
            {item.links && item.links.length > 0 ? (
              <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2">
                {item.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  )
}
