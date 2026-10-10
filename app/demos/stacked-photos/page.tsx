import { genPageMetadata } from 'app/seo'
import DemoShell from '@/components/demos/DemoShell'
import StackedPhotos from '@/components/demos/StackedPhotos'

export const metadata = genPageMetadata({ title: 'Demo: sticky stacked photos' })

const photos = [
  { src: '/static/images/canada/lake.jpg', alt: 'A lake in Canada' },
  { src: '/static/images/canada/maple.jpg', alt: 'A maple tree' },
  { src: '/static/images/canada/mountains.jpg', alt: 'Mountains in Canada' },
  { src: '/static/images/canada/toronto.jpg', alt: 'The Toronto skyline' },
]

export default function StackedPhotosDemo() {
  return (
    <DemoShell
      title="Sticky stacked photos"
      description="Keep scrolling: the section pins and four photos slide up one at a time, each landing with a slight alternating tilt."
      notes={[
        'Pure CSS scroll-driven animation (view timeline); no GSAP. Works in Chromium and Safari 26+.',
        'Firefox, narrow screens and reduced motion show a plain vertical gallery instead.',
      ]}
    >
      <StackedPhotos photos={photos} />
      <p className="text-center text-gray-500 dark:text-gray-400">End of demo.</p>
    </DemoShell>
  )
}
