import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

type ContactCTAProps = {
  /**
   * `compact` renders a slim banner intended for the top of a page.
   * `full` renders a bordered card intended for the bottom of a page.
   */
  variant?: 'compact' | 'full'
  className?: string
}

const ContactCTA = ({ variant = 'compact', className = '' }: ContactCTAProps) => {
  const { email, github, linkedin } = siteMetadata
  const mailto = `mailto:${email}`

  if (variant === 'compact') {
    return (
      <div
        className={`flex flex-col items-center justify-between gap-3 rounded-3xl border border-primary-500 px-6 py-4 text-center sm:flex-row sm:gap-4 sm:text-left ${className}`}
      >
        <p className="text-base text-gray-600 dark:text-gray-300">
          Looking for a software engineer? Let's talk.
        </p>
        <div className="flex flex-shrink-0 items-center gap-4">
          <Link
            href={mailto}
            aria-label={`Email ${siteMetadata.author}`}
            className="inline-flex items-center whitespace-nowrap rounded-full border border-primary-500 px-4 py-1.5 text-sm font-semibold transition-colors duration-150 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            <span data-umami-event="contact-cta-top">Get in touch</span>
          </Link>
          <div className="flex items-center gap-3">
            <SocialIcon kind="linkedin" href={linkedin} size={6} />
            <SocialIcon kind="github" href={github} size={6} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col items-center gap-4 rounded-3xl border border-primary-500 px-6 py-10 text-center ${className}`}
    >
      <h2 className="text-2xl font-bold leading-8 tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
        Let's work together
      </h2>
      <p className="max-w-xl text-base leading-7 text-gray-500 dark:text-gray-400">
        I'm always happy to talk about new projects, open source, or an engineering role. The
        fastest way to reach me is email.
      </p>
      <Link
        href={mailto}
        aria-label={`Email ${siteMetadata.author} at ${email}`}
        className="inline-flex items-center whitespace-nowrap rounded-full border border-primary-500 px-6 py-2 text-base font-semibold transition-colors duration-150 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
      >
        <span data-umami-event="contact-cta-bottom">{email}</span>
      </Link>
      <div className="flex items-center gap-5 pt-2">
        <SocialIcon kind="linkedin" href={linkedin} size={6} />
        <SocialIcon kind="github" href={github} size={6} />
      </div>
    </div>
  )
}

export default ContactCTA
