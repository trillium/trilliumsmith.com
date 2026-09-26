/**
 * Generate pixelated LQIP (low-quality image placeholder) data for the site.
 *
 * Walks public/static, shrinks each raster image to a ~24px-wide JPEG, and
 * writes data/image-placeholders.json mapping public src -> data URI.
 *
 * components/Image.tsx renders the tiny image scaled up with
 * `image-rendering: pixelated` behind the full image, then cross-fades —
 * the pixelation load-in effect.
 *
 * Usage: node ./scripts/generate-placeholders.mjs
 * Re-run whenever images are added/changed.
 */
import { promises as fs } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const publicDir = path.join(root, 'public')
const outFile = path.join(root, 'data', 'image-placeholders.json')

const PLACEHOLDER_WIDTH = 24
const PLACEHOLDER_QUALITY = 20
const SKIP_DIRS = new Set(['favicons'])
const EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp'])

async function collect(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const entry of entries) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue
      files.push(...(await collect(full)))
    } else if (EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full)
    }
  }
  return files
}

const files = await collect(path.join(publicDir, 'static'))
const placeholders = {}

for (const file of files) {
  const publicPath = `/${path.relative(publicDir, file).split(path.sep).join('/')}`
  try {
    const buffer = await sharp(file)
      .flatten({ background: '#ffffff' })
      .resize({ width: PLACEHOLDER_WIDTH })
      .jpeg({ quality: PLACEHOLDER_QUALITY })
      .toBuffer()
    placeholders[publicPath] = `data:image/jpeg;base64,${buffer.toString('base64')}`
  } catch (error) {
    console.warn(`skip ${publicPath}: ${error.message}`)
  }
}

await fs.writeFile(outFile, `${JSON.stringify(placeholders, null, 2)}\n`)

const bytes = Buffer.byteLength(JSON.stringify(placeholders))
console.log(
  `wrote ${outFile}: ${Object.keys(placeholders).length} placeholders, ${(bytes / 1024).toFixed(1)} KB`,
)
