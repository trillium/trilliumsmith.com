import styles from './Scrollbars.module.css'

const paragraphs = Array.from(
  { length: 8 },
  (_, i) =>
    `Paragraph ${i + 1}. The scrollbar thumb and track use the site's teal in light mode and a brighter teal on a dark track in dark mode. Only colors change, never the scrollbar width, so the page layout stays put.`,
)

export default function ThemedScrollbars() {
  return (
    <>
      {/* Also theme the real page scrollbar, but only while this demo is mounted. */}
      <style>
        {
          'html:has([data-themed-page]){scrollbar-color:#14b8a6 #f0fdfa}html.dark:has([data-themed-page]){scrollbar-color:#2dd4bf #0f172a}'
        }
      </style>
      <div data-themed-page className="grid gap-8 md:grid-cols-2">
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">Vertical scroller</h2>
          <section
            className={`${styles.themed} h-64 space-y-3 overflow-y-auto rounded-lg border border-gray-200 p-4 text-gray-700 dark:border-gray-700 dark:text-gray-300`}
            // Scrollable regions must be keyboard reachable.
            // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard access to a scroll region
            tabIndex={0}
            aria-label="Vertical scroll demo"
          >
            {paragraphs.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        </section>
        <section className="space-y-2">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Thin horizontal rail
          </h2>
          <section
            className={`${styles.themed} ${styles.thin} flex gap-4 overflow-x-auto rounded-lg border border-gray-200 p-4 pb-3 dark:border-gray-700`}
            // biome-ignore lint/a11y/noNoninteractiveTabindex: keyboard access to a scroll region
            tabIndex={0}
            aria-label="Horizontal scroll demo"
          >
            {Array.from({ length: 10 }, (_, i) => (
              <div
                // biome-ignore lint/suspicious/noArrayIndexKey: static demo tiles
                key={i}
                className="flex h-32 w-40 shrink-0 items-center justify-center rounded-md bg-primary-100 font-semibold text-primary-900 dark:bg-primary-900 dark:text-primary-100"
              >
                Card {i + 1}
              </div>
            ))}
          </section>
        </section>
      </div>
    </>
  )
}
