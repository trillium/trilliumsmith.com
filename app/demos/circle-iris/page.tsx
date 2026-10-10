import { genPageMetadata } from 'app/seo'
import CircleIris from '@/components/demos/CircleIris'
import DemoShell from '@/components/demos/DemoShell'
import { loadInPhotos } from '@/components/demos/loadInPhotos'

export const metadata = genPageMetadata({ title: 'Demo: circle iris load-in' })

export default function CircleIrisDemo() {
  return (
    <DemoShell
      title="Circle iris"
      description="The photo is revealed by an expanding circular clip-path, like a camera iris opening."
      notes={[
        'Pure CSS.',
        'Each image plays when it scrolls into view. Press Replay to run it again. With reduced motion turned on, images simply appear.',
      ]}
    >
      <CircleIris photos={loadInPhotos} />
    </DemoShell>
  )
}
