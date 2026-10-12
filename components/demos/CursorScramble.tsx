'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from './useReducedMotion'

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz'
const RADIUS = 60
const STEPS = 5
const STEP_MS = 150

interface Cell {
  el: HTMLSpanElement
  orig: string
  x: number
  y: number
  busy: boolean
}

// Letters within RADIUS px of the pointer swap to random glyphs for a few steps, then restore.
// Character rects are measured once (and on resize), not on every pointer move.
export default function CursorScramble({ lines }: { lines: string[] }) {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const container = root.current
    if (!container || reduced) return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const cells: Cell[] = Array.from(container.querySelectorAll<HTMLSpanElement>('[data-ch]')).map(
      (el) => ({ el, orig: el.textContent ?? '', x: 0, y: 0, busy: false }),
    )
    const timers = new Set<number>()

    const measure = () => {
      for (const c of cells) {
        const r = c.el.getBoundingClientRect()
        c.x = r.left + r.width / 2
        c.y = r.top + r.height / 2
      }
    }
    // Rects are viewport-relative, so re-measure when the page scrolls too.
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('scroll', measure, { passive: true })

    const scramble = (c: Cell) => {
      c.busy = true
      let n = 0
      const id = window.setInterval(() => {
        n += 1
        if (n >= STEPS) {
          window.clearInterval(id)
          timers.delete(id)
          c.el.textContent = c.orig
          c.busy = false
          return
        }
        c.el.textContent = GLYPHS[(Math.random() * GLYPHS.length) | 0]
      }, STEP_MS)
      timers.add(id)
    }

    let frame = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        for (const c of cells) {
          if (c.busy) continue
          if (Math.hypot(c.x - e.clientX, c.y - e.clientY) < RADIUS) scramble(c)
        }
      })
    }
    container.addEventListener('pointermove', onMove)

    return () => {
      cancelAnimationFrame(frame)
      container.removeEventListener('pointermove', onMove)
      window.removeEventListener('resize', measure)
      window.removeEventListener('scroll', measure)
      for (const id of timers) window.clearInterval(id)
      for (const c of cells) c.el.textContent = c.orig
    }
  }, [reduced])

  return (
    <div
      ref={root}
      role="img"
      aria-label={lines.join(' ')}
      className="select-none overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 p-6 font-mono text-lg leading-8 text-primary-700 dark:border-gray-700 dark:bg-gray-900 dark:text-primary-300 sm:p-10 sm:text-2xl sm:leading-10"
    >
      {lines.map((line) => (
        <div key={line} aria-hidden="true" className="whitespace-pre-wrap break-all">
          {line.split('').map((ch, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: characters are positional and static
            <span key={i} data-ch={ch === ' ' ? undefined : ''}>
              {ch}
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
