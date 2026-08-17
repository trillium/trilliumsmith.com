'use client'

import { useEffect, useRef } from 'react'

export default function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || typeof window === 'undefined') return
    // mermaid is loaded via CDN script in layout.tsx
    const mermaid = (window as any).mermaid
    if (!mermaid) return

    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
    mermaid.initialize({ startOnLoad: false, theme: 'default' })
    mermaid.render(id, chart).then(({ svg }: { svg: string }) => {
      if (ref.current) ref.current.innerHTML = svg
    })
  }, [chart])

  return <div ref={ref} className="my-6 overflow-x-auto" />
}
