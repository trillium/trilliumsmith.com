'use client'

import { useEffect, useRef } from 'react'
import styles from './ScrollProgress.module.css'

// Thin bar at the top of the viewport that fills as the page scrolls. Uses a CSS scroll()
// timeline where supported; otherwise a passive scroll listener drives the same transform.
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = bar.current
    if (!el || CSS.supports('animation-timeline: scroll()')) return
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      el.style.transform = `scaleX(${max > 0 ? Math.min(window.scrollY / max, 1) : 0})`
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div className={styles.track} aria-hidden="true">
      <div ref={bar} className={styles.bar} />
    </div>
  )
}
