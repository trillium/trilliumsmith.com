import { ImageResponse } from 'next/og'
import { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

const size = { width: 1200, height: 630 }

function parseTime(time: string): Date | null {
  if (/^\d+$/.test(time)) {
    const n = Number(time)
    return new Date(n < 1e10 ? n * 1000 : n)
  }
  const d = new Date(time)
  return isNaN(d.getTime()) ? null : d
}

function formatOgTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl
  const title = searchParams.get('title') || 'Come hang out!'
  const topic = searchParams.get('topic') || null
  const timeParam = searchParams.get('time')
  const targetTime = timeParam ? parseTime(timeParam) : null
  const isUpcoming = targetTime && targetTime.getTime() > Date.now() + 2 * 60 * 1000
  const timeLabel = targetTime ? formatOgTime(targetTime) : null

  // Fetch Space Grotesk from Google Fonts
  const [fontData, fontBoldData] = await Promise.all([
    fetch(
      'https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7oUUsj.ttf'
    ).then((res) => res.arrayBuffer()),
    fetch(
      'https://fonts.gstatic.com/s/spacegrotesk/v22/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj4PVksj.ttf'
    ).then((res) => res.arrayBuffer()),
  ])

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#030712',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '64px 80px',
          fontFamily: '"Space Grotesk", sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle teal glow in top-right */}
        <div
          style={{
            position: 'absolute',
            top: '-120px',
            right: '-120px',
            width: '480px',
            height: '480px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(20,184,166,0.18) 0%, transparent 70%)',
          }}
        />

        {/* Bottom-left accent line */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '0',
            width: '4px',
            height: '100%',
            background: '#14b8a6',
          }}
        />

        {/* LIVE / UPCOMING badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '28px',
          }}
        >
          <div
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              background: isUpcoming ? '#14b8a6' : '#ef4444',
              flexShrink: 0,
            }}
          />
          <div
            style={{
              background: isUpcoming ? 'rgba(20,184,166,0.15)' : 'rgba(239,68,68,0.15)',
              border: isUpcoming
                ? '1px solid rgba(20,184,166,0.4)'
                : '1px solid rgba(239,68,68,0.4)',
              borderRadius: '999px',
              padding: '4px 16px',
              color: isUpcoming ? '#14b8a6' : '#ef4444',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            {isUpcoming ? 'UPCOMING' : 'LIVE'}
          </div>
        </div>

        {/* "Trillium is live on Twitch" */}
        <div
          style={{
            fontSize: '28px',
            color: '#9ca3af',
            fontWeight: 500,
            marginBottom: '12px',
            letterSpacing: '-0.01em',
          }}
        >
          Trillium is live on Twitch
        </div>

        {/* Stream title */}
        <div
          style={{
            fontSize: title.length > 50 ? '42px' : '52px',
            color: '#ffffff',
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: topic ? '16px' : '0px',
            maxWidth: '1000px',
          }}
        >
          {title}
        </div>

        {/* Topic */}
        {topic && (
          <div
            style={{
              fontSize: '26px',
              color: '#14b8a6',
              fontWeight: 500,
              marginTop: '8px',
              letterSpacing: '-0.01em',
              maxWidth: '900px',
            }}
          >
            {topic}
          </div>
        )}

        {/* Time label */}
        {timeLabel && (
          <div
            style={{
              fontSize: '24px',
              color: '#9ca3af',
              fontWeight: 500,
              marginTop: '16px',
              letterSpacing: '-0.01em',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            {timeLabel}
          </div>
        )}

        {/* Footer row */}
        <div
          style={{
            position: 'absolute',
            bottom: '48px',
            left: '80px',
            right: '80px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              fontSize: '20px',
              color: '#6b7280',
              fontWeight: 500,
            }}
          >
            twitch.tv/trilliumsmith
          </div>
          <div
            style={{
              fontSize: '20px',
              color: '#14b8a6',
              fontWeight: 700,
              letterSpacing: '-0.01em',
            }}
          >
            trilliumsmith.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Space Grotesk',
          data: fontData,
          style: 'normal' as const,
          weight: 400 as const,
        },
        {
          name: 'Space Grotesk',
          data: fontBoldData,
          style: 'normal' as const,
          weight: 700 as const,
        },
      ],
    }
  )
}
