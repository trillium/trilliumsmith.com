import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

const links = [
  {
    kind: 'github',
    title: 'Github',
    link: siteMetadata.github,
    displayLink: 'github.com/trillium/',
  },
  {
    kind: 'linkedin',
    title: 'LinkedIn',
    link: siteMetadata.linkedin,
    displayLink: 'linkedin.com/in/trilliumsmith/',
  },
  {
    kind: 'youtube',
    title: 'Youtube',
    link: siteMetadata.youtube,
    displayLink: 'youtube.com/@Trillium_is',
  },
  {
    kind: 'bluesky',
    title: 'Bluesky',
    link: siteMetadata.bluesky,
    displayLink: 'bsky.app/profile/trillium.is',
  },
  {
    kind: 'twitch',
    title: 'Twitch',
    link: siteMetadata.twitch,
    displayLink: 'twitch.tv/trilliumsmith',
  },
]

export default function Page() {
  return (
    <div className="place-content-center">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 sm:justify-start ">
        {links.map((props) => (
          <LinkContainer key={props.kind} {...props} />
        ))}
      </div>
    </div>
  )
}

function LinkContainer({ kind, title, link, displayLink }) {
  return (
    <div className="group relative flex w-full flex-grow flex-col place-content-between items-center rounded-3xl border border-primary-500 px-16 py-4 hover:bg-slate-100 dark:hover:bg-slate-950 sm:w-10/12 md:w-96">
      <Link
        className="absolute inset-0 z-10 rounded-3xl focus:outline-none"
        href={link}
        aria-label={title}
        tabIndex={0}
      >
        <span className="sr-only">{title}</span>
      </Link>
      <div className="pointer-events-none z-20 flex flex-row place-content-between items-center">
        <div className="flex flex-row gap-4 text-4xl group-hover:text-primary-500">
          <SocialIcon kind={kind} href={link} size={12} iconOnly={true} />
          {title}
        </div>
      </div>
      <p className="pointer-events-none z-20 text-sm">{displayLink}</p>
    </div>
  )
}
