import { genPageMetadata } from 'app/seo'
import DemoShell from '@/components/demos/DemoShell'
import { loadInPhotos } from '@/components/demos/loadInPhotos'
import TriangleShards from '@/components/demos/TriangleShards'

export const metadata = genPageMetadata({ title: 'Demo: triangle shards load-in' })

export default function TriangleShardsDemo() {
  return (
    <DemoShell
      title="Triangle shards"
      description="Each square is split into two triangles that flip out at random times."
      notes={[
        'Needs a tiny client script that sets a random delay per shard; the animation itself is CSS.',
        'Each image plays when it scrolls into view. Press Replay to run it again. With reduced motion turned on, images simply appear.',
      ]}
    >
      <TriangleShards photos={loadInPhotos} />
    </DemoShell>
  )
}
