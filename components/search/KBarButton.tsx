'use client'

import { useKBar } from 'kbar'
import { ReactNode, HTMLAttributes } from 'react'

interface KBarButtonProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const KBarButton = ({ children, ...rest }: KBarButtonProps) => {
  const { query } = useKBar()
  return (
    <button {...rest} onClick={() => query.toggle()}>
      {children}
    </button>
  )
}
