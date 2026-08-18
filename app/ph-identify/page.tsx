'use client'

import { useSearchParams } from 'next/navigation'
import { usePostHog } from 'posthog-js/react'
import { Suspense, useEffect, useState } from 'react'

function IdentifyInner() {
  const searchParams = useSearchParams()
  const posthog = usePostHog()
  const [status, setStatus] = useState<'pending' | 'ok' | 'denied'>('pending')

  useEffect(() => {
    const key = searchParams.get('key')
    const secret = process.env.NEXT_PUBLIC_PH_IDENTIFY_SECRET

    if (!secret || key !== secret) {
      setStatus('denied')
      return
    }

    posthog.identify('trillium', {
      email: 'trillium@trilliumsmith.com',
      is_admin: true,
    })
    setStatus('ok')
  }, [searchParams, posthog])

  if (status === 'pending') return null
  if (status === 'denied') return <p>Not found.</p>
  return <p>Identified as admin.</p>
}

export default function PhIdentifyPage() {
  return (
    <Suspense fallback={null}>
      <IdentifyInner />
    </Suspense>
  )
}
