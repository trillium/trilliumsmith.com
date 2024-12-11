import SocialIcon from '../social-icons'
import Image from '@/components/Image'

export default function AuthorDetails({
  author,
  name,
  occupation,
  company,
  location,
  email,
  github,
  linkedin,
  twitter,
  bluesky,
  avatar,
}) {
  return (
    <div className="flex flex-col items-center justify-center space-x-2 pt-8 xs:flex-row xl:flex-col">
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
        {location && (
          <div className="md:text-md text-base text-gray-500 dark:text-gray-400">{location}</div>
        )}
        <div className="flex space-x-3 pt-6">
          <SocialIcon kind="mail" href={`mailto:${email}`} />
          <SocialIcon kind="github" href={github} />
          <SocialIcon kind="linkedin" href={linkedin} />
          <SocialIcon kind="twitter" href={twitter} />
          <SocialIcon kind="bluesky" href={bluesky} />
        </div>
      </div>
    </div>
  )
  return (
    <div className="flex flex-col items-center justify-center space-x-2 pt-8 xs:flex-row xl:flex-col">
      {avatar && (
        <div>
          <Image
            src={avatar}
            alt="avatar"
            width={192}
            height={192}
            className="h-48 w-48 min-w-48 rounded-full border-2 border-primary-400 bg-gradient-to-b from-white to-teal-500 dark:from-slate-900 dark:to-teal-500 md:h-52 md:w-52"
          />
        </div>
      )}
      <div className="text-center">
        <h3 className="pb-2 pt-4 text-2xl font-bold leading-8 tracking-tight">{name}</h3>
        <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
        <div className="text-gray-500 dark:text-gray-400">{company}</div>
        <div className="flex flex-row space-x-3 pt-6">
          <SocialIcon kind="mail" href={`mailto:${email}`} />
          <SocialIcon kind="github" href={github} />
          <SocialIcon kind="linkedin" href={linkedin} />
          <SocialIcon kind="x" href={twitter} />
          <SocialIcon kind="bluesky" href={bluesky} />
        </div>
      </div>
    </div>
  )
}
