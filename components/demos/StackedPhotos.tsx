import Image from '@/components/Image'
import styles from './StackedPhotos.module.css'

interface StackedPhotosProps {
  photos: { src: string; alt: string }[]
}

// Sticky stacked-photo scroll. The scroll choreography is a CSS view-timeline (no JS, no GSAP);
// browsers without it, narrow screens and reduced-motion users get a plain vertical gallery.
export default function StackedPhotos({ photos }: StackedPhotosProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.stage}>
        {photos.map((p, i) => (
          <div key={p.src} className={styles.photo} style={{ '--i': i } as React.CSSProperties}>
            <Image
              src={p.src}
              alt={p.alt}
              fill
              sizes="(min-width: 768px) 34rem, 100vw"
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
