import { genPageMetadata } from 'app/seo'
import DemoShell from '@/components/demos/DemoShell'
import ImageLoadIn from '@/components/demos/ImageLoadIn'

export const metadata = genPageMetadata({ title: 'Demo: image load-in' })

const photos = [
  { src: '/static/images/canada/lake.jpg', alt: 'A lake in Canada' },
  { src: '/static/images/canada/maple.jpg', alt: 'A maple tree' },
  { src: '/static/images/canada/mountains.jpg', alt: 'Mountains in Canada' },
  { src: '/static/images/canada/toronto.jpg', alt: 'The Toronto skyline' },
]

export default function ImageLoadInDemo() {
  return (
    <DemoShell
      title="Image load-in"
      description="This effect is already live. Every image on the site (cards, avatars, blog post images) goes through components/Image.tsx, which shows a tiny pixelated placeholder instantly and cross-fades to the real image once it loads."
      notes={[
        'Press Replay to remount the images. Cached images fade quickly; use your browser devtools network throttling to watch it slowly.',
        'The left tile of each pair is the placeholder by itself, for comparison.',
      ]}
    >
      <ImageLoadIn photos={photos} />
    </DemoShell>
  )
}
