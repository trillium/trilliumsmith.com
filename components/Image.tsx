'use client'

import NextImage, { type ImageProps } from 'next/image'
import { useEffect, useState } from 'react'
import placeholders from '@/data/image-placeholders.json'

const basePath = process.env.BASE_PATH
const placeholderMap = placeholders as Record<string, string>

const FADE = 'opacity 0.4s ease'

const Image = ({ src, alt, onLoad, style, fill, className, ...rest }: ImageProps) => {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(false)
  }, [src])
  const fullSrc = `${basePath || ''}${src}`
  const placeholder = typeof src === 'string' ? placeholderMap[src] : undefined

  // No placeholder generated for this src — render exactly as before.
  if (!placeholder) {
    return (
      <NextImage
        src={fullSrc}
        alt={alt}
        fill={fill}
        className={className}
        onLoad={onLoad}
        style={style}
        {...rest}
      />
    )
  }

  const handleLoad: NonNullable<ImageProps['onLoad']> = (event) => {
    setLoaded(true)
    onLoad?.(event)
  }

  if (fill) {
    return (
      <>
        {/* biome-ignore lint/performance/noImgElement: placeholder must be a raw img, not next/image */}
        <img
          src={placeholder}
          alt=""
          aria-hidden="true"
          draggable={false}
          className={className}
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
          fill
          className={className}
          onLoad={handleLoad}
          style={{ ...style, opacity: loaded ? 1 : 0, transition: FADE }}
          {...rest}
        />
      </>
    )
  }

  return (
    <span
      style={{ position: 'relative', display: 'inline-block', lineHeight: 0, overflow: 'hidden' }}
    >
      {/* biome-ignore lint/performance/noImgElement: placeholder must be a raw img, not next/image */}
      <img
        src={placeholder}
        alt=""
        aria-hidden="true"
        draggable={false}
        className={className}
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
        className={className}
        onLoad={handleLoad}
        style={{ ...style, opacity: loaded ? 1 : 0, transition: FADE }}
        {...rest}
      />
    </span>
  )
}

export default Image
