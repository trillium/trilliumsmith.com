import { genPageMetadata } from 'app/seo'
import Link from 'next/link'
import { demos } from '@/components/demos/demos'

export const metadata = genPageMetadata({
  title: 'Effect demos',
  description: 'Side-by-side demos of candidate CSS and front-end effects.',
})

const groups = Array.from(new Set(demos.map((d) => d.group)))

export default function DemosIndex() {
  return (
    <div className="space-y-10 pb-12 pt-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl md:text-5xl">
          Effect demos
        </h1>
        <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">
          One page per effect so they can be compared in the running site. Try each in light and
          dark mode, and with reduced motion turned on in your OS.
        </p>
      </div>
      {groups.map((group) => (
        <section key={group} className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{group}</h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {demos
              .filter((d) => d.group === group)
              .map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/demos/${d.slug}`}
                    className="block h-full rounded-lg border border-gray-200 p-4 transition-colors hover:border-primary-500 hover:bg-primary-50 dark:border-gray-700 dark:hover:bg-gray-900"
                  >
                    <span className="block font-semibold text-gray-900 dark:text-gray-100">
                      {d.title}
                    </span>
                    <span className="mt-1 block text-sm text-gray-600 dark:text-gray-400">
                      {d.summary}
                    </span>
                  </Link>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
