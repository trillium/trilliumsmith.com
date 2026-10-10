import { genPageMetadata } from 'app/seo'
import DemoShell from '@/components/demos/DemoShell'
import SpotlightReveal from '@/components/demos/SpotlightReveal'

export const metadata = genPageMetadata({ title: 'Demo: cursor spotlight reveal' })

export default function SpotlightDemo() {
  return (
    <DemoShell
      title="Cursor spotlight reveal"
      description="Move your cursor over the panel: a geometric pattern appears only inside a soft circle that follows it, growing on enter and shrinking on leave."
      notes={[
        'On touch screens there is no cursor, so the pattern shows faintly and statically.',
        'With reduced motion on, the circle still follows the cursor but snaps open instead of animating.',
      ]}
    >
      <SpotlightReveal className="rounded-2xl border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-900">
        <div className="flex min-h-[26rem] flex-col items-center justify-center px-6 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-5xl">
            Hello, I&apos;m Trillium
          </h2>
          <p className="mt-3 max-w-md text-lg text-gray-600 dark:text-gray-300">
            The pattern is decorative and sits behind the text, so nothing here depends on it.
          </p>
        </div>
      </SpotlightReveal>
    </DemoShell>
  )
}
