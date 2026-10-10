import LoadInStage, { type LoadInPhoto } from './LoadInStage'
import { COVER } from './loadInCover'
import styles from './StaggeredTiers.module.css'

const TIERS = 8

const cover = Array.from({ length: TIERS }, (_, i) => (
  <span
    // biome-ignore lint/suspicious/noArrayIndexKey: static list
    key={i}
    className={`${styles.tier} ${i % 2 ? styles.fromRight : styles.fromLeft} ${COVER}`}
    style={{
      top: `${(i / TIERS) * 100}%`,
      height: `${100 / TIERS + 0.4}%`,
      animationDelay: `${(i * 0.12).toFixed(2)}s`,
    }}
  />
))

// Horizontal tiers that slide off alternating sides, top to bottom. Pure CSS.
export default function StaggeredTiers({ photos }: { photos: LoadInPhoto[] }) {
  return <LoadInStage photos={photos} cover={cover} />
}
