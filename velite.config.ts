import { defineConfig, defineCollection, s } from 'velite'
import { writeFileSync } from 'fs'
import readingTime from 'reading-time'
import { slug } from 'github-slugger'
import path from 'path'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import { remarkAlert } from 'remark-github-blockquote-alert'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeKatex from 'rehype-katex'
import rehypeKatexNoTranslate from 'rehype-katex-notranslate'
import rehypeCitation from 'rehype-citation'
import rehypePrismPlus from 'rehype-prism-plus'
import rehypePresetMinify from 'rehype-preset-minify'
import { fromHtmlIsomorphic } from 'hast-util-from-html-isomorphic'
import { remarkExtractFrontmatter, remarkCodeTitles, remarkImgToJsx } from './lib/mdx-plugins'
import { extractTocHeadings } from './lib/mdx-plugins/remark-toc-headings'
import siteMetadata from './data/siteMetadata'

const root = process.cwd()
const isProduction = process.env.NODE_ENV === 'production'

// heroicon mini link
const icon = fromHtmlIsomorphic(
  `
  <span class="content-header-link">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 linkicon">
  <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
  <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
  </svg>
  </span>
`,
  { fragment: true }
)

const dataDir = path.join(root, 'data') + '/'

const toRelativePath = (absPath: string) => {
  // meta.path is absolute, strip the data dir prefix
  return absPath.startsWith(dataDir) ? absPath.slice(dataDir.length) : absPath
}

const computeSlug = (filePath: string) => {
  // filePath is relative like 'blog/post-name.mdx' or 'blog/devlog/post.mdx'
  return filePath
    .replace(/^blog\//, '')
    .replace(/^authors\//, '')
    .replace(/\.mdx$/, '')
    .replace(/\/index$/, '')
}

const computePath = (filePath: string) => {
  // filePath is like 'blog/post-name.mdx'
  return filePath.replace(/\.mdx$/, '').replace(/\/index$/, '')
}

const blogs = defineCollection({
  name: 'Blog',
  pattern: 'blog/**/*.mdx',
  schema: s
    .object({
      title: s.string(),
      date: s.isodate(),
      tags: s.array(s.string()).default([]),
      lastmod: s.isodate().optional(),
      draft: s.boolean().default(false),
      summary: s.string().optional(),
      images: s.any().optional(),
      authors: s.array(s.string()).optional(),
      layout: s.string().optional(),
      bibliography: s.string().optional(),
      canonicalUrl: s.string().optional(),
      // velite built-in fields
      code: s.mdx(),
      metadata: s.metadata(),
      raw: s.raw(),
    })
    .transform(async (data, { meta }) => {
      const filePath = toRelativePath(meta.path as string)
      const slugVal = computeSlug(filePath)
      const pathVal = computePath(filePath)
      const readingTimeResult = readingTime(data.raw as string)
      const toc = await extractTocHeadings(data.raw as string)

      return {
        ...data,
        readingTime: readingTimeResult,
        slug: slugVal,
        path: pathVal,
        filePath: filePath,
        toc,
        structuredData: {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: data.title,
          datePublished: data.date,
          dateModified: data.lastmod || data.date,
          description: data.summary,
          image: data.images ? data.images[0] : siteMetadata.socialBanner,
          url: `${siteMetadata.siteUrl}/${pathVal}`,
        },
      }
    }),
})

const authors = defineCollection({
  name: 'Authors',
  pattern: 'authors/**/*.mdx',
  schema: s
    .object({
      name: s.string(),
      avatar: s.string().optional(),
      occupation: s.string().optional(),
      company: s.string().optional(),
      email: s.string().optional(),
      twitter: s.string().optional(),
      bluesky: s.string().optional(),
      linkedin: s.string().optional(),
      github: s.string().optional(),
      layout: s.string().optional(),
      // velite built-in fields
      code: s.mdx(),
      raw: s.raw(),
    })
    .transform(async (data, { meta }) => {
      const filePath = toRelativePath(meta.path as string)
      const slugVal = computeSlug(filePath)
      const pathVal = computePath(filePath)
      const readingTimeResult = readingTime(data.raw as string)
      const toc = await extractTocHeadings(data.raw as string)

      return {
        ...data,
        readingTime: readingTimeResult,
        slug: slugVal,
        path: pathVal,
        filePath: filePath,
        toc,
      }
    }),
})

// Count tags and write to JSON
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createTagCount(allBlogs: any[]) {
  const tagCount: Record<string, number> = {}
  allBlogs.forEach((file) => {
    if (file.tags && (!isProduction || file.draft !== true)) {
      file.tags.forEach((tag: string) => {
        const formattedTag = slug(tag)
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1
        } else {
          tagCount[formattedTag] = 1
        }
      })
    }
  })
  writeFileSync('./app/tag-data.json', JSON.stringify(tagCount, null, 2))
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createSearchIndex(allBlogs: any[]) {
  if (
    siteMetadata?.search?.provider === 'kbar' &&
    siteMetadata.search.kbarConfig.searchDocumentsPath
  ) {
    const sortedBlogs = allBlogs
      .filter((b) => !isProduction || !b.draft)
      .sort((a, b) => (a.date > b.date ? -1 : a.date < b.date ? 1 : 0))
      .map((b) => ({
        title: b.title,
        date: b.date,
        tags: b.tags,
        summary: b.summary,
        path: b.path,
        slug: b.slug,
      }))
    writeFileSync(
      `public/${path.basename(siteMetadata.search.kbarConfig.searchDocumentsPath)}`,
      JSON.stringify(sortedBlogs)
    )
    console.log('Local search index generated...')
  }
}

export default defineConfig({
  root: 'data',
  output: {
    data: '.velite',
    assets: 'public/static/velite',
    base: '/static/velite/',
    name: '[name]-[hash:6].[ext]',
    clean: true,
  },
  collections: { blogs, authors },
  mdx: {
    remarkPlugins: [
      remarkExtractFrontmatter,
      remarkGfm,
      remarkCodeTitles,
      remarkMath,
      remarkImgToJsx,
      remarkAlert,
    ],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'prepend',
          headingProperties: {
            className: ['content-header'],
          },
          content: icon,
        },
      ],
      rehypeKatex,
      rehypeKatexNoTranslate,
      [rehypeCitation, { path: path.join(root, 'data') }],
      [rehypePrismPlus, { defaultLanguage: 'js', ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
  prepare: ({ blogs, authors }) => {
    createTagCount(blogs)
    createSearchIndex(blogs)
  },
})
