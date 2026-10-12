import { genPageMetadata } from 'app/seo'
import Blinds from '@/components/demos/Blinds'
import DemoShell from '@/components/demos/DemoShell'
import { loadInPhotos } from '@/components/demos/loadInPhotos'

export const metadata = genPageMetadata({ title: 'Demo: blinds load-in' })

export default function BlindsDemo() {
  return (
    <DemoShell
      title="Blinds"
      description="The photo is revealed through eight vertical strips that widen until they meet."
      notes={[
        'Pure CSS (mask-image plus a registered custom property). Where @property is unsupported the photo simply appears.',
        'Each image plays when it scrolls into view. Press Replay to run it again. With reduced motion turned on, images simply appear.',
      ]}
    >
      <Blinds photos={loadInPhotos} />
    </DemoShell>
  )
}
