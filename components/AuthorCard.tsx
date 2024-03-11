import Image from './Image'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'

const AuthorCard = ({ content }) => {
  const { author, avatar, occupation, company, email, twitter, linkedin, github } = siteMetadata
  return (
    <div>
      <div className="flex flex-row items-center justify-center space-x-2 pb-8">
        {avatar && (
          <div className="pr-8">
            <Image
              src={avatar}
              alt="avatar"
              width={224}
              height={224}
              className="h-56 w-56 rounded-full"
            />
          </div>
        )}
        <div>
          <h3 className="pb-2 pt-4 text-4xl font-bold leading-8 tracking-tight">{author}</h3>
          <div className="text-lg text-gray-500 dark:text-gray-400">{occupation}</div>
          <div className="text-lg text-gray-500 dark:text-gray-400">{company}</div>
          <div className="flex space-x-3 pt-6">
            <SocialIcon kind="mail" href={`mailto:${email}`} />
            <SocialIcon kind="github" href={github} />
            <SocialIcon kind="linkedin" href={linkedin} />
            <SocialIcon kind="twitter" href={twitter} />
          </div>
        </div>
      </div>
      <div className="flex max-w-full flex-col items-center justify-center">
        <div className="prose max-w-full pb-8 pt-10 dark:prose-invert xl:text-xl">
          <p>
            Hello there! I'm Trillium, a self-taught software developer, open source contributor,
            and bootcamp gradute. I'm the lead developer of VRMS (Volunteer Relationship Management
            System), and an avid user of Talon Voice, a voice-driven user interface for hands-free
            computing. I enjoy partner dancing, making espresso drinks, and listening to
            podcasts/audio boks in my free time.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthorCard
