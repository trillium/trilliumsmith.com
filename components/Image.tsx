'use client'

import NextImage, { type ImageProps } from 'next/image'
import { useState } from 'react'
import placeholders from '@/data/image-placeholders.json'

const basePath = process.env.BASE_PATH
const placeholderMap = placeholders as Record<string, string>

const FADE = 'opacity 0.4s ease'

const Image = ({ src, alt, onLoad, style, ...rest }: ImageProps) => {
  const [loaded, setLoaded] = useState(false)
  const fullSrc = `${basePath || ''}${src}`
  const placeholder = typeof src === 'string' ? placeholderMap[src] : undefined

  // No placeholder generated for this src — render exactly as before.
  if (!placeholder) {
    return <NextImage src={fullSrc} alt={alt} onLoad={onLoad} style={style} {...rest} />
  }

  return (
    <span style={{ position: 'relative', display: 'block', overflow: 'hidden' }}>
      {/* biome-ignore lint/performance/noImgElement: placeholder must be a raw img, not next/image */}
      <img
        src={placeholder}
        alt=""
        aria-hidden="true"
        draggable={false}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          imageRendering: 'pixelated',
          opacity: loaded ? 0 : 1,
          transition: FADE,
          pointerEvents: 'none',
        }}
      />
      <NextImage
        src={fullSrc}
        alt={alt}
        onLoad={(event) => {
          setLoaded(true)
          onLoad?.(event)
        }}
        style={{ ...style, opacity: loaded ? 1 : 0, transition: FADE }}
        {...rest}
      />
    </span>
  )
}

export default Image
