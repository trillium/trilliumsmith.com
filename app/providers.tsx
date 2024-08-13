'use client'

import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY || '', {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_API_HOST,
    //   https://www.trilliumsmith.com/ingest for netlify
    //   /ingest for vercel
    ui_host: 'https://us.posthog.com',
    person_profiles: 'always', // or 'always' to create profiles for anonymous users as well
  })
}

export function CSPostHogProvider({ children }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}
