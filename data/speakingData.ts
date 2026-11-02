// One object per event that has a record of it happening.
// A program listing or a ticket is not enough.
// date is YYYY-MM-DD. role is speaker, attendee, or participant.
// Add a link only when the page is public. A recording is optional.

export type SpeakingRole = 'speaker' | 'attendee' | 'participant'

export interface SpeakingLink {
  label: string
  href: string
}

export interface SpeakingEvent {
  event: string
  date: string
  role: SpeakingRole
  where?: string
  title?: string
  topic?: string
  note?: string
  links?: SpeakingLink[]
}

const speakingData: SpeakingEvent[] = [
  {
    event: 'LA DevOps',
    date: '2026-10-29',
    role: 'speaker',
    where: "O'Briens Irish Pub, Santa Monica",
    title: 'Wake Wakey Returns: What Voice Coding Looks Like in 2026',
    topic: 'What voice coding looks like in 2026.',
    note: 'No public recording.',
    links: [
      {
        label: 'Event page',
        href: 'https://www.meetup.com/ladevops/events/317079372/',
      },
    ],
  },
  {
    event: 'Software Crafters Montréal',
    date: '2026-10-20',
    role: 'speaker',
    where: 'Online',
    title: 'What voice accessibility looks like in 2026',
    topic: 'How I control my computer by voice, including for coding.',
    note: 'No public recording.',
    links: [
      {
        label: 'Event page',
        href: 'https://guild.host/events/online-what-voice-accessibility-0j4bzr',
      },
    ],
  },
  {
    event: 'Nicky T Online',
    date: '2026-10-09',
    role: 'speaker',
    where: 'Online (livestream hosted by Nick Taylor)',
    title: 'Voice Driven Development',
    topic:
      'Live demo of voice-driven development with Talon Voice, Cursorless, Rango, dictation and phone-driven agents.',
    links: [
      {
        label: 'Recording',
        href: 'https://www.youtube.com/watch?v=Xg1b1NbOicI',
      },
    ],
  },
  {
    event: 'OpenClaw LA',
    date: '2026-10-14',
    role: 'speaker',
    where: 'Los Angeles',
    topic: 'Voice-driven control of the slides and the laptop during a short community talk.',
    note: 'No public recording.',
  },
  {
    event: 'Software Crafters Unconference Online Fall 2026',
    date: '2026-08-28',
    role: 'speaker',
    where: 'Online',
    topic: 'Open-space session on controlling a computer by voice.',
    note: 'No public recording.',
  },
  {
    event: 'Code & Coffee: A Virtual Coffee Conference',
    date: '2025-04-25',
    role: 'speaker',
    where: 'Online',
    title: 'Hands-free Computer Use with Talon Voice',
    topic: 'Live hands-free demo of voice-driven computer use.',
    links: [
      {
        label: 'Recording',
        href: 'https://www.youtube.com/watch?v=e3xaH1pJKsI',
      },
      {
        label: 'Schedule',
        href: 'https://cfe.dev/events/virtual-coffee-conf-2025',
      },
      {
        label: 'Write-up',
        href: '/blog/talon-voice-continued',
      },
    ],
  },
]

export default speakingData
