import styles from './BoxDissolve.module.css'
import LoadInStage, { COVER, type LoadInPhoto } from './LoadInStage'

const COLS = 16
const ROWS = 12

const cover = Array.from({ length: COLS * ROWS }, (_, i) => (
  <span
    // biome-ignore lint/suspicious/noArrayIndexKey: static list
    key={i}
    data-cell
    className={`${styles.box} ${COVER}`}
    style={{
      left: `${((i % COLS) / COLS) * 100 - 0.1}%`,
      top: `${(Math.floor(i / COLS) / ROWS) * 100 - 0.1}%`,
      width: `${100 / COLS + 0.2}%`,
      height: `${100 / ROWS + 0.2}%`,
    }}
  />
))

// The pixel-box idea with random order: each box fades out after a random delay set by LoadInStage
// (--d). Without the script every box fades together.
export default function BoxDissolve({ photos }: { photos: LoadInPhoto[] }) {
  return <LoadInStage photos={photos} cover={cover} randomize />
}
