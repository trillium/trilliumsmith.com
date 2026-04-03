import { authors as allAuthors } from '@/.velite'
import type { Authors } from '@/.velite'
import { MDXLayoutRenderer } from '@/components/MDXContent'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from '@/lib/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'About' })

export default function Page() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorLayout content={mainContent}>
        <MDXLayoutRenderer code={author.code} />
      </AuthorLayout>
    </>
  )
}
