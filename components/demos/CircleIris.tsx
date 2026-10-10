import styles from './CircleIris.module.css'
import LoadInStage, { type LoadInPhoto } from './LoadInStage'

// The image is clipped to a circle that grows from the centre. Pure CSS.
export default function CircleIris({ photos }: { photos: LoadInPhoto[] }) {
  return <LoadInStage photos={photos} imageClass={styles.iris} />
}
