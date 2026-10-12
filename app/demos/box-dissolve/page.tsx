import { genPageMetadata } from 'app/seo'
import BoxDissolve from '@/components/demos/BoxDissolve'
import DemoShell from '@/components/demos/DemoShell'
import { loadInPhotos } from '@/components/demos/loadInPhotos'

export const metadata = genPageMetadata({ title: 'Demo: box dissolve load-in' })

export default function BoxDissolveDemo() {
  return (
    <DemoShell
      title="Box dissolve"
      description="A 16 by 12 grid of boxes fades away in random order, a randomized take on the existing boxes effect."
      notes={[
        'Needs a tiny client script that sets a random delay per box; the animation itself is CSS.',
        'Each image plays when it scrolls into view. Press Replay to run it again. With reduced motion turned on, images simply appear.',
      ]}
    >
      <BoxDissolve photos={loadInPhotos} />
    </DemoShell>
  )
}
