const isProduction = process.env.NODE_ENV === 'production'

function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}

export function sortPosts<T extends { date: string }>(allBlogs: T[], dateKey = 'date'): T[] {
  return allBlogs.sort((a, b) => dateSortDesc(a[dateKey], b[dateKey]))
}

export type CoreContent<T> = Omit<T, 'body' | 'code' | 'raw'>

export function coreContent<T extends Record<string, unknown>>(content: T): CoreContent<T> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result = Object.assign({}, content) as any
  delete result.body
  delete result.code
  delete result.raw
  return result
}

export function allCoreContent<T extends Record<string, unknown> & { draft?: boolean }>(
  contents: T[]
): CoreContent<T>[] {
  if (isProduction)
    return contents.map((c) => coreContent(c)).filter((c) => !('draft' in c && c.draft === true))
  return contents.map((c) => coreContent(c))
}
