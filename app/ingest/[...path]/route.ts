import { type NextRequest, NextResponse } from 'next/server'

const POSTHOG_HOST = 'https://us.i.posthog.com'

async function proxy(request: NextRequest) {
  const path = request.nextUrl.pathname.replace(/^\/ingest/, '')
  const search = request.nextUrl.search
  const url = `${POSTHOG_HOST}${path}${search}`

  const body =
    request.method !== 'GET' && request.method !== 'HEAD' ? await request.arrayBuffer() : undefined

  const headers = new Headers(request.headers)
  headers.delete('host')

  const response = await fetch(url, {
    method: request.method,
    headers,
    body,
  })

  const responseHeaders = new Headers(response.headers)
  responseHeaders.delete('content-encoding')
  responseHeaders.delete('content-length')
  responseHeaders.delete('transfer-encoding')

  return new NextResponse(response.body, {
    status: response.status,
    headers: responseHeaders,
  })
}

export const GET = proxy
export const POST = proxy
export const OPTIONS = proxy
