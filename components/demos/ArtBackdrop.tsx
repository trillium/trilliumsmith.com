import styles from './ArtBackdrop.module.css'

// Decorative fixed backdrop of slowly drifting blurred color blobs. Pure CSS, no media asset.
// Under reduced motion the blobs stay put, leaving a static watercolor-ish gradient.
export function ArtBackdrop() {
  return (
    <>
      {/* The site header paints an opaque white/black strip; clear it only while this backdrop is mounted. */}
      <style>{'body:has([data-art-backdrop]) header{background:transparent!important}'}</style>
      <div data-art-backdrop aria-hidden="true" className={styles.base}>
        <div className={`${styles.blob} ${styles.a}`} />
        <div className={`${styles.blob} ${styles.b}`} />
        <div className={`${styles.blob} ${styles.c}`} />
        <div className={`${styles.blob} ${styles.d}`} />
      </div>
    </>
  )
}

export function GlassCard({
  className = '',
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div
      className={`${styles.glass} rounded-2xl p-6 text-gray-900 shadow-lg dark:text-gray-100 ${className}`}
    >
      {children}
    </div>
  )
}
