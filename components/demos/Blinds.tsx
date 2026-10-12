import styles from './Blinds.module.css'
import LoadInStage, { type LoadInPhoto } from './LoadInStage'

// The image itself is masked by 8 vertical strips whose open width animates. Pure CSS.
export default function Blinds({ photos }: { photos: LoadInPhoto[] }) {
  return <LoadInStage photos={photos} imageClass={styles.blinds} />
}
