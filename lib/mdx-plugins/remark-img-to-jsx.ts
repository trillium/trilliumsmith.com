/* eslint-disable @typescript-eslint/no-explicit-any */
import { visit } from 'unist-util-visit'
import sizeOf from 'image-size'
import fs from 'fs'

export function remarkImgToJsx() {
  return (tree: any) => {
    visit(
      tree,
      (node: any) =>
        node.type === 'paragraph' && node.children.some((n: any) => n.type === 'image'),
      (node: any) => {
        const imageNodeIndex = node.children.findIndex((n: any) => n.type === 'image')
        const imageNode = node.children[imageNodeIndex]

        if (fs.existsSync(`${process.cwd()}/public${imageNode.url}`)) {
          const dimensions = sizeOf(`${process.cwd()}/public${imageNode.url}`)
          imageNode.type = 'mdxJsxFlowElement'
          imageNode.name = 'Image'
          imageNode.attributes = [
            { type: 'mdxJsxAttribute', name: 'alt', value: imageNode.alt },
            { type: 'mdxJsxAttribute', name: 'src', value: imageNode.url },
            {
              type: 'mdxJsxAttribute',
              name: 'width',
              value: dimensions.width,
            },
            {
              type: 'mdxJsxAttribute',
              name: 'height',
              value: dimensions.height,
            },
          ]

          node.type = 'div'
          node.children[imageNodeIndex] = imageNode
        }
      }
    )
  }
}
