import Link from './Link'
import siteMetadata from '@/data/siteMetadata'
import SocialIcon from '@/components/social-icons'
import BuiltWith from './ui/BuiltWith'

export default function Footer() {
  return (
    <footer>
      <div className="mb-4 mt-4 flex h-24 flex-col items-center justify-between md:h-auto md:flex-row">
        <BuiltWith />

        <div className="flex space-x-4">
          <SocialIcon kind="mail" href={`mailto:${siteMetadata.email}`} size={6} />
          <SocialIcon kind="github" href={siteMetadata.github} size={6} />
          <SocialIcon kind="facebook" href={siteMetadata.facebook} size={6} />
          <SocialIcon kind="youtube" href={siteMetadata.youtube} size={6} />
          <SocialIcon kind="linkedin" href={siteMetadata.linkedin} size={6} />
          <SocialIcon kind="twitter" href={siteMetadata.twitter} size={6} />
          <SocialIcon kind="bluesky" href={siteMetadata.bluesky} size={6} />
          <SocialIcon kind="x" href={siteMetadata.x} size={6} />
          <SocialIcon kind="instagram" href={siteMetadata.instagram} size={6} />
          <SocialIcon kind="threads" href={siteMetadata.threads} size={6} />
          <SocialIcon kind="medium" href={siteMetadata.medium} size={6} />
          <SocialIcon kind="twitch" href={siteMetadata.twitch} size={6} />
        </div>
        <div className="flex space-x-2 text-gray-500 dark:text-gray-400">
          <div className="whitespace-nowrap">{siteMetadata.author}</div>
          <div>{` • `}</div>
          <div className="whitespace-nowrap">{`© ${new Date().getFullYear()}`}</div>
        </div>
      </div>
    </footer>
  )
}
