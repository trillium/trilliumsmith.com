'use client'

import { ReactNode } from 'react'
import { KBarSearchProvider } from './KBarSearchProvider'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SearchConfig = Record<string, any>

interface SearchProviderProps {
  searchConfig: SearchConfig
  children: ReactNode
}

export const SearchProvider = ({ searchConfig, children }: SearchProviderProps) => {
  if (searchConfig && searchConfig.provider) {
    switch (searchConfig.provider) {
      case 'kbar':
        return (
          <KBarSearchProvider kbarConfig={searchConfig.kbarConfig}>{children}</KBarSearchProvider>
        )
      default:
        console.log('No suitable provider found. Please choose from kbar.')
        return <>{children}</>
    }
  }
  return <>{children}</>
}
