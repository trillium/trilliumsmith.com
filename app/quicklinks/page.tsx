import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <LinkContainer
        kind="github"
        title="Github"
        link={siteMetadata.github}
        displayLink="github.com/trillium/"
      />

      <LinkContainer
        kind="linkedin"
        title="LinkedIn"
        link={siteMetadata.linkedin}
        displayLink="linkedin.com/in/trilliumsmith/"
      />

      <LinkContainer
        kind="youtube"
        title="Youtube"
        link={siteMetadata.youtube}
        displayLink="youtube.com/@Trillium_is"
      />

      <LinkContainer
        kind="bluesky"
        title="Bluesky"
        link={siteMetadata.bluesky}
        displayLink="bsky.app/profile/trillium.is"
      />
    </div>
  )
}

function LinkContainer({ kind, title, link, displayLink }) {
  return (
    <div className="flex w-80 flex-col place-content-between items-center rounded-3xl border border-primary-500 px-16 py-4">
      <div className="flex flex-row place-content-between items-center">
        <div className="group flex flex-row items-center gap-4 hover:text-red-500 group-hover:text-purple-500">
          <SocialIcon kind={kind} href={link} size={12} />
          <Link className="text-4xl group-hover:text-primary-500" href="/">
            {title}
          </Link>
        </div>
      </div>
      <p className="text-sm">{displayLink}</p>
    </div>
  )
}
