import {
  Mail,
  Github,
  Facebook,
  Youtube,
  Linkedin,
  Twitter,
  X,
  Mastodon,
  Threads,
  Instagram,
  Medium,
  Bluesky,
  Twitch,
} from './icons'

const components = {
  mail: Mail,
  github: Github,
  facebook: Facebook,
  youtube: Youtube,
  linkedin: Linkedin,
  twitter: Twitter,
  x: X,
  mastodon: Mastodon,
  threads: Threads,
  instagram: Instagram,
  medium: Medium,
  bluesky: Bluesky,
  twitch: Twitch,
}

type SocialIconProps = {
  kind: keyof typeof components
  href: string | undefined
  size?: number
}

const SocialIcon = ({
  kind,
  href,
  size = 8,
  iconOnly = false,
}: SocialIconProps & { iconOnly?: boolean }) => {
  if (
    !href ||
    (kind === 'mail' && !/^mailto:[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(href))
  )
    return null

  const SocialSvg = components[kind]

  if (iconOnly) {
    return (
      <div className="group text-sm text-gray-500 transition">
        <span className="sr-only">{kind}</span>
        <SocialSvg
          className={`fill-current text-gray-700 group-hover:text-primary-500 dark:text-gray-200 dark:group-hover:text-primary-400 h-${size} w-${size}`}
        />
      </div>
    )
  }

  return (
    <a
      className="group text-sm text-gray-500 transition"
      target="_blank"
      rel="noopener noreferrer"
      href={href}
    >
      <span className="sr-only">{kind}</span>
      <SocialSvg
        className={`fill-current text-gray-700 group-hover:text-primary-500 dark:text-gray-200 dark:group-hover:text-primary-400 h-${size} w-${size}`}
      />
    </a>
  )
}

export default SocialIcon
