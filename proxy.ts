import type { ProxyConfig } from 'next/dist/server/web/types'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { parseHost } from '@/lib/rd'

export function proxy(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || ''
  const result = parseHost(host)

  const requestHeaders = new Headers(request.headers)

  if (!('passthrough' in result)) {
    requestHeaders.set('x-company', result.company)
    requestHeaders.set('x-role', result.role)
  }

  const url = request.nextUrl.clone()
  url.pathname = `/api${url.pathname}`

  return NextResponse.rewrite(url, {
    request: {
      headers: requestHeaders,
    },
  })
}

export const config: ProxyConfig = {
  matcher: '/rd/:path*',
}
