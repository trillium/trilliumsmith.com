import Image from './Image'
import SocialIcon from '@/components/social-icons'
import siteMetadata from '@/data/siteMetadata'

const AuthorCard = ({ content }) => {
  const { author, avatar, occupation, company, email, twitter, linkedin, github, location } =
    siteMetadata
  return (
    <div>
      <div className="flex flex-row items-center justify-center space-x-2 pb-8">
        {avatar && (
          <div className="pr-2 xl:pr-4">
            <Image
              src={avatar}
              alt="avatar"
              width={224}
              height={224}
              className="h-48 w-48 min-w-48 rounded-full border-2 border-primary-400 bg-gradient-to-b from-white to-teal-500 dark:from-slate-900 dark:to-teal-500 md:h-52 md:w-52"
            />
          </div>
        )}
        <div>
          <h3 className="pb-2 pt-4  text-2xl font-bold leading-8 tracking-tight sm:text-3xl md:text-4xl">
            {author}
          </h3>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">{occupation}</div>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">{company}</div>
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">{location}</div>
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
            Hello there! I'm Trillium, a self-taught software developer and open-source enthusiast.
            I'm originally from the 'receding hairline' of California - Humboldt County,
            Arcata/Eureka where I grew up on a hippie commune far from any tech hubs.
          </p>

          <p>
            My first foray into programming I naively thought the right way to learn to code was to
            read programming books - starting with the 1,683 page O'Reilly Python Tome.
            Spoilers:that didn't work too well.
          </p>

          <p>
            I’ve always been drawn to tech even when I didn’t have a deep understanding of how
            computers worked. Learning to bridge that gap has been one of the most exciting parts of
            my development journey. It’s that sense of discovery that keeps me hooked.
          </p>

          <p>
            In that persuit of understanding I've had the pleasure of working alongside designers
            and developers who have raised my standards for what's expected of programs and
            applcations. I've had the opportunity to create memorable products that are both
            enjoyable to use, and written in code that is maintainable and easy to understand.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AuthorCard
