import { ReactNode } from 'react'
import type { Authors } from 'contentlayer/generated'
import SocialIcon from '@/components/social-icons'
import Image from '@/components/Image'

interface Props {
  children: ReactNode
  content: Omit<Authors, '_id' | '_raw' | 'body'>
}

export default function AuthorLayout({ children, content }: Props) {
  const { name, avatar, occupation, company, email, twitter, linkedin, github } = content

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-row items-center justify-center space-x-2 pt-8 xl:flex-col">
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
            <div>
              <h3 className="pb-2 pt-4 text-3xl font-bold leading-8 tracking-tight xl:text-2xl">
                {name}
              </h3>
              <div className="text-lg text-gray-500 dark:text-gray-400 xl:text-base">
                {occupation}
              </div>
              <div className="text-lg text-gray-500 dark:text-gray-400 xl:text-base">{company}</div>
              <div className="flex space-x-3 pt-6">
                <SocialIcon kind="mail" href={`mailto:${email}`} />
                <SocialIcon kind="github" href={github} />
                <SocialIcon kind="linkedin" href={linkedin} />
                <SocialIcon kind="twitter" href={twitter} />
              </div>
            </div>
          </div>
          <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
