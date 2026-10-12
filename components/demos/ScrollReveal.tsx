import styles from './ScrollReveal.module.css'

const sections = [
  'Fade and rise',
  'Dividers that draw themselves',
  'Nothing hidden without CSS support',
  'Reduced motion stays still',
  'Built on view timelines',
  'No JavaScript at all',
]

// Server component: every reveal is a CSS view() timeline, so content is in the HTML and
// fully visible wherever the timeline (or motion) is unavailable.
export default function ScrollReveal() {
  return (
    <div className="space-y-20 pb-24 pt-8">
      {sections.map((title, i) => (
        <section key={title} className="space-y-4 text-gray-900 dark:text-gray-100">
          <div className={styles.rule} aria-hidden="true" />
          <h2 className={`${styles.reveal} text-3xl font-extrabold tracking-tight sm:text-4xl`}>
            {i + 1}. {title}
          </h2>
          <p
            className={`${styles.reveal} max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300`}
          >
            Each heading and paragraph eases in as it enters the bottom of the window, and the line
            above it draws from left to right. Scroll back up and the effect reverses.
          </p>
        </section>
      ))}
    </div>
  )
}
