import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { PostHog } from 'posthog-node'
import { resolveDestination } from '@/lib/rd'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ destination: string }> },
) {
  const { destination } = await params
  const targetUrl = resolveDestination(destination)

  if (!targetUrl) {
    return NextResponse.json({ error: `Unknown destination: ${destination}` }, { status: 404 })
  }

  const company = request.headers.get('x-company') || 'unknown'
  const role = request.headers.get('x-role') || 'unknown'
  const forwarded = request.headers.get('x-forwarded-for') || 'unknown'
  const ip = forwarded.split(',')[0].trim()

  const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    host: 'https://us.i.posthog.com',
  })

  posthog.capture({
    distinctId: ip,
    event: 'resume_link_click',
    properties: {
      company,
      role,
      destination,
      url: targetUrl,
      ip,
    },
  })

  await posthog.shutdown()

  return NextResponse.redirect(targetUrl, 302)
}
