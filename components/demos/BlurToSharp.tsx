import styles from './BlurToSharp.module.css'
import LoadInStage, { type LoadInPhoto } from './LoadInStage'

// The image starts heavily blurred and slightly enlarged, then settles sharp. Pure CSS.
export default function BlurToSharp({ photos }: { photos: LoadInPhoto[] }) {
  return <LoadInStage photos={photos} imageClass={styles.blur} />
}
