'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz'
const STEPS = 8
const STEP_MS = 40

// Scrambles a visual copy of `text` into place. The real text stays in the DOM (sr-only) so
// assistive tech never reads garbage, and an invisible copy reserves the width so layout never moves.
export default function HoverScramble({ text }: { text: string }) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(text)
  const root = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    // Trigger from the surrounding link/button so hover and keyboard focus both work.
    const trigger = root.current?.closest<HTMLElement>('a, button') ?? root.current
    if (!trigger || reduced) return
    let id: number | undefined
    const stop = () => window.clearInterval(id)
    const run = () => {
      stop()
      let n = 0
      id = window.setInterval(() => {
        n += 1
        const settled = Math.floor((n / STEPS) * text.length)
        setShown(
          text
            .split('')
            .map((c, i) =>
              c === ' ' || i < settled ? c : GLYPHS[(Math.random() * GLYPHS.length) | 0],
            )
            .join(''),
        )
        if (n >= STEPS) {
          stop()
          setShown(text)
        }
      }, STEP_MS)
    }
    trigger.addEventListener('mouseenter', run)
    trigger.addEventListener('focus', run)
    return () => {
      stop()
      trigger.removeEventListener('mouseenter', run)
      trigger.removeEventListener('focus', run)
      setShown(text)
    }
  }, [reduced, text])

  return (
    <span ref={root} className="relative inline-block">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true" className="invisible whitespace-pre">
        {text}
      </span>
      <span aria-hidden="true" className="absolute inset-0 whitespace-pre">
        {shown}
      </span>
    </span>
  )
}
