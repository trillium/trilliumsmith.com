import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { ProxyConfig } from 'next/dist/server/web/types'

const BASE_DOMAIN = 'trilliumsmith.com'

export function proxy(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || ''
  const hostname = host.split(':')[0] // strip port for local dev

  // No subdomain — bare domain or www, pass through
  if (
    hostname === BASE_DOMAIN ||
    hostname === `www.${BASE_DOMAIN}` ||
    !hostname.endsWith(`.${BASE_DOMAIN}`)
  ) {
    return NextResponse.next()
  }

  // Extract subdomain: e.g. "posthog-senior_frontend_engineer" from "posthog-senior_frontend_engineer.trilliumsmith.com"
  const subdomain = hostname.replace(`.${BASE_DOMAIN}`, '')

  // Split on first dash: company-role_or_jd
  const dashIndex = subdomain.indexOf('-')
  const company = dashIndex > 0 ? subdomain.slice(0, dashIndex) : subdomain
  const role = dashIndex > 0 ? subdomain.slice(dashIndex + 1) : 'unknown'

  // Pass company and role downstream via request headers
  const requestHeaders = new Headers(request.headers)
  requestHeaders.set('x-company', company)
  requestHeaders.set('x-role', role)

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })
}

export const config: ProxyConfig = {
  matcher: '/rd/:path*',
}
