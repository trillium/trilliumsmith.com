import Link from 'next/link'

interface DemoShellProps {
  title: string
  description: string
  notes?: string[]
  children: React.ReactNode
}

// Page chrome shared by every demo: back link, title, and a short "how to view it" note.
export default function DemoShell({ title, description, notes, children }: DemoShellProps) {
  return (
    <div className="space-y-8 pb-12 pt-6">
      <header className="space-y-3">
        <Link
          href="/demos"
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-400"
        >
          &larr; All demos
        </Link>
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          {title}
        </h1>
        <p className="text-lg leading-7 text-gray-600 dark:text-gray-300">{description}</p>
        {notes && (
          <ul className="list-disc space-y-1 pl-5 text-sm text-gray-500 dark:text-gray-400">
            {notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        )}
      </header>
      {children}
    </div>
  )
}
