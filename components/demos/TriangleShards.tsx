import LoadInStage, { COVER, type LoadInPhoto } from './LoadInStage'
import styles from './TriangleShards.module.css'

const COLS = 10
const ROWS = 8

// Each grid square is split into two triangles; the diagonal alternates in a checkerboard.
const cover = Array.from({ length: COLS * ROWS }, (_, i) => {
  const c = i % COLS
  const r = Math.floor(i / COLS)
  const pos = {
    left: `${(c / COLS) * 100 - 0.15}%`,
    top: `${(r / ROWS) * 100 - 0.15}%`,
    width: `${100 / COLS + 0.3}%`,
    height: `${100 / ROWS + 0.3}%`,
  }
  const flip = (c + r) % 2 ? styles.flip : ''
  return [
    <span
      key={`a${r}-${c}`}
      data-cell
      className={`${styles.shard} ${styles.a} ${flip} ${COVER}`}
      style={pos}
    />,
    <span
      key={`b${r}-${c}`}
      data-cell
      className={`${styles.shard} ${styles.b} ${flip} ${COVER}`}
      style={pos}
    />,
  ]
})

// Triangle mosaic whose shards flip away at random times. Random delays are set by LoadInStage
// (the only script involved) as the --d custom property.
export default function TriangleShards({ photos }: { photos: LoadInPhoto[] }) {
  return <LoadInStage photos={photos} cover={cover} randomize />
}
