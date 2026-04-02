import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export const dynamic = 'force-dynamic'

export default async function Image({
  searchParams,
}: {
  searchParams?: Promise<{ title?: string; topic?: string }>
}) {
  const params = searchParams ? await searchParams : {}
  const title = params.title || 'Come hang out!'
  const topic = params.topic || null

  // Fetch Space Grotesk from Google Fonts
  const fontData = await fetch(
    'https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gozwSiB.woff'
  ).then((res) => res.arrayBuffer())

  const fontBoldData = await fetch(
    'https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gozwSiB.woff'
  ).then((res) => res.arrayBuffer())

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

        {/* LIVE badge */}
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
              background: '#ef4444',
              flexShrink: 0,
            }}
          />
          <div
            style={{
              background: 'rgba(239,68,68,0.15)',
              border: '1px solid rgba(239,68,68,0.4)',
              borderRadius: '999px',
              padding: '4px 16px',
              color: '#ef4444',
              fontSize: '18px',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            LIVE
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
          style: 'normal',
          weight: 400,
        },
        {
          name: 'Space Grotesk',
          data: fontBoldData,
          style: 'normal',
          weight: 800,
        },
      ],
    }
  )
}
