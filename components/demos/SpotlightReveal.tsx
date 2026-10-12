'use client'

import { useRef } from 'react'
import styles from './SpotlightReveal.module.css'

// Geometric line art, revealed only inside a soft circle that follows the cursor.
function Pattern() {
  return (
    <svg className="h-full w-full" aria-hidden="true">
      <defs>
        <pattern id="demo-spot-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path d="M48 0H0V48" fill="none" stroke="currentColor" strokeWidth="1" />
          <path d="M0 0L48 48M48 0L0 48" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="24" cy="24" r="10" fill="none" stroke="currentColor" strokeWidth="1" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#demo-spot-grid)" />
    </svg>
  )
}

export default function SpotlightReveal({
  className = '',
  children,
}: {
  className?: string
  children?: React.ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const frame = useRef(0)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el || e.pointerType === 'touch') return
    const { clientX, clientY } = e
    cancelAnimationFrame(frame.current)
    frame.current = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect()
      el.style.setProperty('--demo-spot-x', `${clientX - r.left}px`)
      el.style.setProperty('--demo-spot-y', `${clientY - r.top}px`)
    })
  }

  const setActive = (active: boolean) => ref.current?.setAttribute('data-active', String(active))

  return (
    <div
      ref={ref}
      className={`${styles.root} ${className}`}
      onPointerMove={onMove}
      onPointerEnter={(e) => e.pointerType !== 'touch' && setActive(true)}
      onPointerLeave={() => setActive(false)}
    >
      <div className={styles.pattern} aria-hidden="true">
        <Pattern />
      </div>
      <div className="relative">{children}</div>
    </div>
  )
}
