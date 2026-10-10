import { genPageMetadata } from 'app/seo'
import DemoShell from '@/components/demos/DemoShell'
import { loadInPhotos } from '@/components/demos/loadInPhotos'
import StaggeredTiers from '@/components/demos/StaggeredTiers'

export const metadata = genPageMetadata({ title: 'Demo: staggered tiers load-in' })

export default function StaggeredTiersDemo() {
  return (
    <DemoShell
      title="Staggered tiers"
      description="Eight tiers cover the photo and slide away top to bottom, alternating left and right."
      notes={[
        'Pure CSS.',
        'Each image plays when it scrolls into view. Press Replay to run it again. With reduced motion turned on, images simply appear.',
      ]}
    >
      <StaggeredTiers photos={loadInPhotos} />
    </DemoShell>
  )
}
