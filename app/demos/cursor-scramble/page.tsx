import { genPageMetadata } from 'app/seo'
import CursorScramble from '@/components/demos/CursorScramble'
import DemoShell from '@/components/demos/DemoShell'

export const metadata = genPageMetadata({ title: 'Demo: cursor-proximity text scramble' })

const lines = [
  'keep your cursor moving across this block',
  'letters within sixty pixels will scramble',
  'for a moment and then settle back again',
  'a decorative corner of code and tag words',
  'massage accessibility voice talon humboldt',
]

export default function CursorScrambleDemo() {
  return (
    <DemoShell
      title="Cursor-proximity text scramble"
      description="Move your mouse across the block: letters near the pointer swap to random letters for a few steps, then restore."
      notes={[
        'Needs a mouse or trackpad; on touch screens the text just stays still.',
        'Disabled with reduced motion. Screen readers get the real text via aria-label.',
      ]}
    >
      <CursorScramble lines={lines} />
    </DemoShell>
  )
}
