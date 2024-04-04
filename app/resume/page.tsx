import Resume from '@/components/Resume'

export default async function Page() {
  return (
    <div className="relative">
      <button className="focus:ring-ring text-primary absolute right-2 top-2 ml-0 inline-flex max-w-full items-center rounded-full border border-primary-500 bg-transparent px-2.5 py-0.5 font-semibold backdrop-blur-md transition-colors duration-150 hover:bg-primary-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-0 md:ml-0">
        <a href="./Trillium_Smith__Fullstack_Software_Engineer.pdf" download>
          Download Resume
        </a>
      </button>
      <Resume filename="./Trillium_Smith__Fullstack_Software_Engineer.pdf" />
    </div>
  )
}
