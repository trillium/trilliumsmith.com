/* eslint-disable @typescript-eslint/no-explicit-any */
import { visit } from 'unist-util-visit'
import GithubSlugger from 'github-slugger'
import { remark } from 'remark'
import { toString } from 'mdast-util-to-string'

export type TocItem = {
  value: string
  url: string
  depth: number
}

export function remarkTocHeadings() {
  const slugger = new GithubSlugger()
  return (tree: any, file: any) => {
    const toc: TocItem[] = []
    visit(tree, 'heading', (node: any) => {
      const textContent = toString(node)
      toc.push({
        value: textContent,
        url: '#' + slugger.slug(textContent),
        depth: node.depth,
      })
    })
    file.data.toc = toc
  }
}

export async function extractTocHeadings(markdown: string): Promise<TocItem[]> {
  const vfile = await remark().use(remarkTocHeadings).process(markdown)
  return (vfile.data.toc as TocItem[]) || []
}
