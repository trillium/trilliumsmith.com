import type { Metadata } from 'next'

// Demo pages are for comparing effects in the running site, not for search engines.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function DemosLayout({ children }: { children: React.ReactNode }) {
  return children
}
