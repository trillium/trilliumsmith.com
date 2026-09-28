import { type Authors, allAuthors, allBlogs } from 'contentlayer/generated'
import { allCoreContent, coreContent, sortPosts } from 'pliny/utils/contentlayer'
import AuthorCard from '@/components/AuthorCard'
import ContactCTA from '@/components/ui/ContactCTA'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const author = allAuthors.find((p) => p.slug === 'default') as Authors
  const mainContent = coreContent(author)

  return (
    <>
      <ContactCTA variant="compact" className="mt-6" />
      <AuthorCard content={mainContent} />
      <Main posts={posts} />
      <ContactCTA variant="full" className="my-12" />
    </>
  )
}
