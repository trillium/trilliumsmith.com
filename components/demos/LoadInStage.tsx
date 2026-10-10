'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import Image from '@/components/Image'
import styles from './LoadInStage.module.css'

export interface LoadInPhoto {
  src: string
  alt: string
}

// Opaque cover colour, matching the frame background so covers blend into it in both themes.
export const COVER = 'bg-gray-200 dark:bg-gray-800'

type State = 'idle' | 'armed' | 'playing'

interface FrameProps {
  photo: LoadInPhoto
  imageClass?: string
  cover?: React.ReactNode
  randomize?: boolean
}

// idle: image shown as normal (no JS / reduced motion). armed: effect start state. playing: effect
// runs once the frame scrolls into view. Effect CSS keys off [data-state] on the frame.
function Frame({ photo, imageClass, cover, randomize }: FrameProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<State>('idle')

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    if (randomize) {
      for (const cell of el.querySelectorAll<HTMLElement>('[data-cell]')) {
        cell.style.setProperty('--d', `${(Math.random() * 1.1).toFixed(2)}s`)
      }
    }
    setState('armed')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('playing')
          io.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [randomize])

  return (
    <div
      ref={ref}
      data-state={state}
      className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800"
    >
      <div className={`absolute inset-0 ${imageClass ?? ''}`}>
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 640px) 45vw, 100vw"
          className="object-cover"
        />
      </div>
      {cover && (
        <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${styles.cover}`}>
          {cover}
        </div>
      )}
    </div>
  )
}

interface StageProps {
  photos: LoadInPhoto[]
  imageClass?: string
  cover?: React.ReactNode
  randomize?: boolean
}

// Shared grid + Replay button for every load-in demo. Replay remounts the frames, which re-arms
// each one and plays it again as soon as it is in view.
export default function LoadInStage({ photos, imageClass, cover, randomize }: StageProps) {
  const [run, setRun] = useState(0)
  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => setRun((n) => n + 1)}
        className="rounded-md bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 dark:bg-primary-500 dark:hover:bg-primary-600"
      >
        Replay
      </button>
      <div className="grid gap-6 sm:grid-cols-2">
        {photos.map((p) => (
          <Frame
            key={`${p.src}-${run}`}
            photo={p}
            imageClass={imageClass}
            cover={cover}
            randomize={randomize}
          />
        ))}
      </div>
    </div>
  )
}
