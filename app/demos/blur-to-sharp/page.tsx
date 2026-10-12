import { genPageMetadata } from 'app/seo'
import BlurToSharp from '@/components/demos/BlurToSharp'
import DemoShell from '@/components/demos/DemoShell'
import { loadInPhotos } from '@/components/demos/loadInPhotos'

export const metadata = genPageMetadata({ title: 'Demo: blur to sharp load-in' })

export default function BlurToSharpDemo() {
  return (
    <DemoShell
      title="Blur to sharp"
      description="The photo begins heavily blurred and slightly zoomed, then focuses."
      notes={[
        'Pure CSS.',
        'Each image plays when it scrolls into view. Press Replay to run it again. With reduced motion turned on, images simply appear.',
      ]}
    >
      <BlurToSharp photos={loadInPhotos} />
    </DemoShell>
  )
}
