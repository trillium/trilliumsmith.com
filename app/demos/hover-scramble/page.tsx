import { genPageMetadata } from 'app/seo'
import DemoShell from '@/components/demos/DemoShell'
import HoverScramble from '@/components/demos/HoverScramble'

export const metadata = genPageMetadata({ title: 'Demo: hover text scramble' })

export default function HoverScrambleDemo() {
  return (
    <DemoShell
      title="Hover text scramble"
      description="Hover or keyboard-focus a button or link: its label scrambles and resolves left to right. Width never changes."
      notes={['Disabled with reduced motion. The real label stays in the DOM for screen readers.']}
    >
      <div className="flex flex-wrap items-center gap-6">
        <button
          type="button"
          className="rounded-md bg-primary-600 px-5 py-3 font-semibold text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
        >
          <HoverScramble text="Book a massage" />
        </button>
        <a
          href="#hover-scramble"
          className="font-semibold text-primary-700 underline-offset-4 hover:underline dark:text-primary-300"
        >
          <HoverScramble text="Read the latest post" />
        </a>
        <nav aria-label="Demo nav" className="flex gap-5 text-gray-900 dark:text-gray-100">
          {['Blog', 'Projects', 'Tags', 'About'].map((label) => (
            <a key={label} href="#hover-scramble" className="font-medium">
              <HoverScramble text={label} />
            </a>
          ))}
        </nav>
      </div>
    </DemoShell>
  )
}
