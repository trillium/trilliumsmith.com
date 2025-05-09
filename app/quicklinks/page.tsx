import Link from '@/components/Link'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

export default function Page() {
  return (
    <div className="place-content-center">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 sm:justify-start ">
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
    </div>
  )
}

function LinkContainer({ kind, title, link, displayLink }) {
  return (
    <div className="group flex w-72 flex-grow flex-col place-content-between items-center rounded-3xl border border-primary-500 px-16 py-4 hover:bg-slate-100 dark:hover:bg-slate-950">
      <div className="flex flex-row place-content-between items-center">
        <div>
          <Link className="flex flex-row gap-4 text-4xl group-hover:text-primary-500" href={link}>
            <SocialIcon kind={kind} href={link} size={12} iconOnly={true} />
            {title}
          </Link>
        </div>
      </div>
      <p className="text-sm">{displayLink}</p>
    </div>
  )
}
