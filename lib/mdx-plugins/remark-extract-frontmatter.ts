/* eslint-disable @typescript-eslint/no-explicit-any */
import { visit } from 'unist-util-visit'
import yaml from 'js-yaml'

export function remarkExtractFrontmatter() {
  return (tree: any, file: any) => {
    visit(tree, 'yaml', (node: any) => {
      file.data.frontmatter = yaml.load(node.value)
    })
  }
}
