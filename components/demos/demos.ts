export interface DemoMeta {
  slug: string
  title: string
  summary: string
  group: 'Backdrop & photos' | 'Image load-in effects' | 'Scrollbar / text effect candidates'
}

export const demos: DemoMeta[] = [
  {
    slug: 'backdrop',
    title: 'Watercolor backdrop + glass cards',
    summary: 'Drifting pastel color blobs behind frosted-glass cards (Partiful style).',
    group: 'Backdrop & photos',
  },
  {
    slug: 'stacked-photos',
    title: 'Sticky stacked photos',
    summary:
      'Photos slide up and land tilted while the section stays pinned (offensiveaicon style).',
    group: 'Backdrop & photos',
  },
  {
    slug: 'spotlight',
    title: 'Cursor spotlight reveal',
    summary: 'A geometric pattern that only shows inside a soft circle around the cursor.',
    group: 'Backdrop & photos',
  },
  {
    slug: 'image-load-in',
    title: 'Image load-in',
    summary:
      'The pixelated placeholder that cross-fades to the real image. Already live on the site.',
    group: 'Backdrop & photos',
  },
  {
    slug: 'hex-reveal',
    title: 'Hexagon reveal',
    summary: 'Honeycomb cells open from the center outward.',
    group: 'Image load-in effects',
  },
  {
    slug: 'staggered-tiers',
    title: 'Staggered tiers',
    summary: 'Horizontal tiers slide off one after another, alternating sides.',
    group: 'Image load-in effects',
  },
  {
    slug: 'triangle-shards',
    title: 'Triangle shards',
    summary: 'A triangle mosaic flips away in random order.',
    group: 'Image load-in effects',
  },
  {
    slug: 'box-dissolve',
    title: 'Box dissolve',
    summary: 'The pixel boxes fade out in random order.',
    group: 'Image load-in effects',
  },
  {
    slug: 'blinds',
    title: 'Blinds',
    summary: 'Vertical strips open like window blinds.',
    group: 'Image load-in effects',
  },
  {
    slug: 'circle-iris',
    title: 'Circle iris',
    summary: 'A circle grows from the center.',
    group: 'Image load-in effects',
  },
  {
    slug: 'blur-to-sharp',
    title: 'Blur to sharp',
    summary: 'Starts blurred and slightly enlarged, then settles sharp.',
    group: 'Image load-in effects',
  },
  {
    slug: 'cursor-scramble',
    title: 'Cursor-proximity text scramble',
    summary: 'Letters near the pointer swap to random glyphs, then settle back.',
    group: 'Scrollbar / text effect candidates',
  },
  {
    slug: 'hover-scramble',
    title: 'Hover text scramble',
    summary: 'A label scrambles into place on hover or focus.',
    group: 'Scrollbar / text effect candidates',
  },
  {
    slug: 'scrollbar',
    title: 'Themed scrollbar',
    summary: 'Scrollbar colors that follow the site theme, in light and dark.',
    group: 'Scrollbar / text effect candidates',
  },
  {
    slug: 'scroll-progress',
    title: 'Scroll progress bar',
    summary: 'A thin teal bar at the top that fills as you scroll.',
    group: 'Scrollbar / text effect candidates',
  },
  {
    slug: 'scroll-reveal',
    title: 'Scroll-triggered text reveals',
    summary: 'Headings and paragraphs rise in, and divider lines grow, as they enter view.',
    group: 'Scrollbar / text effect candidates',
  },
]
