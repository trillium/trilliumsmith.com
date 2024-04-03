import { sortPosts, allCoreContent, coreContent } from 'pliny/utils/contentlayer'
import { Authors, allBlogs, allAuthors } from 'contentlayer/generated'
import AuthorCard from '@/components/AuthorCard'
import Resume from '@/components/Resume'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <Resume />
    </>
  )
}
