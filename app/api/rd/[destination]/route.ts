import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { PostHog } from 'posthog-node'

const DESTINATION_MAP: Record<string, string> = {
  github: 'https://github.com/trillium',
  bluesky: 'https://bsky.app/profile/trilliumsmith.com',
  website: 'https://trilliumsmith.com',
  email: 'mailto:trillium@trilliumsmith.com',
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ destination: string }> }
) {
  const { destination } = await params
  const targetUrl = DESTINATION_MAP[destination]

  if (!targetUrl) {
    return NextResponse.json({ error: `Unknown destination: ${destination}` }, { status: 404 })
  }

  const company = request.headers.get('x-company') || 'unknown'
  const role = request.headers.get('x-role') || 'unknown'
  const forwarded = request.headers.get('x-forwarded-for') || 'unknown'
  const ip = forwarded.split(',')[0].trim()

  const posthog = new PostHog(process.env.POSTHOG_API_KEY!, {
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
