import { NextResponse } from 'next/server'

export const dynamic = 'force-static'

export async function GET() {
  return NextResponse.json({ error: 'Newsletter provider not configured' }, { status: 501 })
}

export async function POST() {
  return NextResponse.json({ error: 'Newsletter provider not configured' }, { status: 501 })
}
