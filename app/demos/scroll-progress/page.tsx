import { genPageMetadata } from 'app/seo'
import DemoShell from '@/components/demos/DemoShell'
import ScrollProgress from '@/components/demos/ScrollProgress'

export const metadata = genPageMetadata({ title: 'Demo: scroll progress bar' })

const paragraphs = [
  'The progress bar tracks the real scroll position of the page, so it is not decorative motion that plays on its own. That is why it keeps working with reduced motion turned on.',
  'On a long blog post it tells readers how far through they are without any text or numbers. It sits above the header and ignores pointer events so nothing underneath becomes unclickable.',
  'Where CSS scroll-driven animations exist, the bar runs entirely off the main thread. Elsewhere a tiny passive scroll listener sets the same transform.',
]

export default function ScrollProgressDemo() {
  return (
    <>
      <ScrollProgress />
      <DemoShell
        title="Scroll progress bar"
        description="Scroll down: a thin teal bar at the very top of the window fills from left to right as you move through the page."
      >
        <div className="space-y-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
          {Array.from({ length: 5 }, (_, round) =>
            paragraphs.map((p, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: static filler text
              <p key={`${round}-${i}`}>{p}</p>
            )),
          )}
        </div>
      </DemoShell>
    </>
  )
}
