'use client'

import { useState, useEffect, ReactNode } from 'react'
import { KBarProvider, Action } from 'kbar'
import { useRouter } from 'next/navigation'
import { KBarModal } from './KBarModal'
import { formatDate } from '@/lib/utils/formatDate'

interface KBarSearchProviderProps {
  kbarConfig: {
    searchDocumentsPath?: string
    defaultActions?: Action[]
    onSearchDocumentsLoad?: (json: unknown) => Action[]
  }
  children: ReactNode
}

export const KBarSearchProvider = ({ kbarConfig, children }: KBarSearchProviderProps) => {
  const router = useRouter()
  const { searchDocumentsPath, defaultActions, onSearchDocumentsLoad } = kbarConfig
  const [searchActions, setSearchActions] = useState<Action[]>([])
  const [dataLoaded, setDataLoaded] = useState(false)

  useEffect(() => {
    const mapPosts = (posts: { path: string; title: string; summary?: string; date: string }[]) => {
      const actions: Action[] = []
      for (const post of posts) {
        actions.push({
          id: post.path,
          name: post.title,
          keywords: post?.summary || '',
          section: 'Content',
          subtitle: formatDate(post.date, 'en-US'),
          perform: () => router.push('/' + post.path),
        })
      }
      return actions
    }

    async function fetchData() {
      if (searchDocumentsPath) {
        const url =
          searchDocumentsPath.indexOf('://') > 0 || searchDocumentsPath.indexOf('//') === 0
            ? searchDocumentsPath
            : new URL(searchDocumentsPath, window.location.origin)
        const res = await fetch(url)
        const json = await res.json()
        const actions = onSearchDocumentsLoad ? onSearchDocumentsLoad(json) : mapPosts(json)
        setSearchActions(actions)
        setDataLoaded(true)
      }
    }

    if (!dataLoaded && searchDocumentsPath) {
      fetchData()
    } else {
      setDataLoaded(true)
    }
  }, [defaultActions, dataLoaded, router, searchDocumentsPath, onSearchDocumentsLoad])

  return (
    <KBarProvider actions={defaultActions}>
      <KBarModal actions={searchActions} isLoading={!dataLoaded} />
      {children}
    </KBarProvider>
  )
}
