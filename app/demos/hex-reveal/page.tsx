import { genPageMetadata } from 'app/seo'
import DemoShell from '@/components/demos/DemoShell'
import HexReveal from '@/components/demos/HexReveal'
import { loadInPhotos } from '@/components/demos/loadInPhotos'

export const metadata = genPageMetadata({ title: 'Demo: hexagon reveal load-in' })

export default function HexRevealDemo() {
  return (
    <DemoShell
      title="Hexagon reveal"
      description="A honeycomb of cover cells shrinks away starting at the center, so the photo appears to bloom outward."
      notes={[
        'Pure CSS; the stagger is computed at render time.',
        'Each image plays when it scrolls into view. Press Replay to run it again. With reduced motion turned on, images simply appear.',
      ]}
    >
      <HexReveal photos={loadInPhotos} />
    </DemoShell>
  )
}
