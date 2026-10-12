'use client'

import { useState } from 'react'
import Image from '@/components/Image'
import placeholders from '@/data/image-placeholders.json'

const placeholderMap = placeholders as Record<string, string>

interface Photo {
  src: string
  alt: string
}

// Shows what the live image component does: tiny pixelated placeholder first, then a cross-fade
// to the real image. The left column is the placeholder alone; the right is the real component.
export default function ImageLoadIn({ photos }: { photos: Photo[] }) {
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
          <figure key={`${p.src}-${run}`} className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                {placeholderMap[p.src] && (
                  // biome-ignore lint/performance/noImgElement: showing the raw placeholder data URI
                  <img
                    src={placeholderMap[p.src]}
                    alt=""
                    aria-hidden="true"
                    className="h-full w-full object-cover"
                    style={{ imageRendering: 'pixelated' }}
                  />
                )}
              </div>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-800">
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width: 640px) 25vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
            <figcaption className="text-xs text-gray-500 dark:text-gray-400">
              Placeholder only (left) &middot; live component (right)
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  )
}
