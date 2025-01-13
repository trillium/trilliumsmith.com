import Resume from '@/components/Resume'
import siteMetadata from '@/data/siteMetadata'

import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  openGraph: {
    title: 'Resume | Trillium Smith',
    description: siteMetadata.title,
    url: './resume',
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: 'en_US',
    type: 'website',
  },
  alternates: {
    canonical: './resume',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: siteMetadata.title,
    card: 'summary_large_image',
    images: [siteMetadata.socialBanner],
  },
}

const filename = './Trillium_Smith__Fullstack_Software_Engineer.pdf'

export default async function Page() {
  return (
    <div className="relative whitespace-nowrap">
      <div className="flex w-full flex-row justify-end">
        <button className="focus:ring-ring text-primary ml-0 inline-flex max-w-full items-center rounded-tl-2xl border border-primary-500 bg-transparent px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md transition-colors duration-150 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-0 sm:text-sm md:ml-0 md:text-base">
          <a href="./Trillium_Smith__Fullstack_Software_Engineer.pdf" download>
            Download File
          </a>
        </button>
        <button className="focus:ring-ring text-primary ml-0 inline-flex max-w-full items-center rounded-tr-2xl border border-primary-500 bg-transparent px-2.5 py-0.5 text-xs font-semibold backdrop-blur-md transition-colors duration-150 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-0 sm:text-sm md:ml-0 md:text-base">
          <a href="./Trillium_Smith__Fullstack_Software_Engineer.pdf">View in Native</a>
        </button>
      </div>
      <Resume filename={filename} />
    </div>
  )
}
