export const dynamic = 'force-dynamic'

interface PreviewPageProps {
  searchParams: Promise<{ title?: string; topic?: string; time?: string }>
}

export default async function OgPreviewPage({ searchParams }: PreviewPageProps) {
  const params = await searchParams
  const ogParams = new URLSearchParams(
    Object.fromEntries(
      Object.entries(params).filter(([, v]) => v !== undefined) as [string, string][]
    )
  )
  const ogUrl = `/api/og/live${ogParams.toString() ? '?' + ogParams.toString() : ''}`

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-4 py-16">
      <h1 className="text-lg font-semibold text-gray-500 dark:text-gray-400">OG Image Preview</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={ogUrl}
        alt="OG image preview"
        width={1200}
        height={630}
        className="w-full max-w-4xl rounded-lg border border-gray-200 shadow-lg dark:border-gray-800"
      />
      <code className="max-w-4xl break-all text-xs text-gray-400">{ogUrl}</code>
    </div>
  )
}
