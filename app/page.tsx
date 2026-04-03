import { sortPosts, allCoreContent, coreContent } from '@/lib/utils/contentlayer'
import { blogs as allBlogs, authors as allAuthors } from '@/.velite'
import type { Authors } from '@/.velite'
import Main from './Main'
import AuthorCard from '@/components/AuthorCard'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <AuthorCard content={mainContent} />
      <Main posts={posts} />
    </>
  )
}
