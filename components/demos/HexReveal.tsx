import styles from './HexReveal.module.css'
import LoadInStage, { COVER, type LoadInPhoto } from './LoadInStage'

// Pointy-top hexagons tiling a 4:3 frame (100 x 75 units), staggered rows, sized from COLS.
const COLS = 8
const W = 100 / COLS
const H = (W * 2) / Math.sqrt(3)
const PITCH = H * 0.75
const ROWS = Math.ceil(75 / PITCH) + 1

const cells: { key: string; style: React.CSSProperties }[] = []
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c <= COLS; c++) {
    const x = c * W - (r % 2 ? 0 : W / 2)
    const y = r * PITCH - H / 4
    const dist = Math.hypot(x + W / 2 - 50, y + H / 2 - 37.5) / 62.5
    cells.push({
      key: `${r}-${c}`,
      style: {
        left: `${x - 0.3}%`,
        top: `${((y - 0.3) / 75) * 100}%`,
        width: `${W + 0.6}%`,
        height: `${((H + 0.6) / 75) * 100}%`,
        // Cells nearest the centre open first.
        animationDelay: `${(dist * 0.9).toFixed(2)}s`,
      },
    })
  }
}

const cover = cells.map((c) => (
  <span key={c.key} className={`${styles.hex} ${COVER}`} style={c.style} />
))

// Honeycomb of cover cells that shrink away from the centre outward. Pure CSS; delays are computed
// at render time.
export default function HexReveal({ photos }: { photos: LoadInPhoto[] }) {
  return <LoadInStage photos={photos} cover={cover} />
}
