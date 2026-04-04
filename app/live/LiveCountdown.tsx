'use client'

import { useRef, useSyncExternalStore } from 'react'

function parseTime(time: string): Date | null {
  if (/^\d+$/.test(time)) {
    const n = Number(time)
    return new Date(n < 1e10 ? n * 1000 : n)
  }
  const d = new Date(time)
  return isNaN(d.getTime()) ? null : d
}

function formatTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

function formatDayAndTime(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  }).format(date)
}

function isToday(date: Date): boolean {
  const now = new Date()
  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  )
}

function isTomorrow(date: Date): boolean {
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  return (
    date.getFullYear() === tomorrow.getFullYear() &&
    date.getMonth() === tomorrow.getMonth() &&
    date.getDate() === tomorrow.getDate()
  )
}

function formatCountdown(diffMs: number): string {
  const totalSeconds = Math.floor(diffMs / 1000)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  if (hours > 0) {
    return `${hours}h ${minutes}m ${seconds}s`
  }
  if (minutes > 0) {
    return `${minutes}m ${seconds}s`
  }
  return `${seconds}s`
}

function useNow(): number {
  const callbackRef = useRef<(() => void) | null>(null)

  const subscribe = (cb: () => void) => {
    callbackRef.current = cb
    const id = setInterval(cb, 1000)
    return () => {
      clearInterval(id)
      callbackRef.current = null
    }
  }

  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => 0 // server snapshot: 0 signals SSR
  )
}

export default function LiveCountdown({ time }: { time: string }) {
  const nowSeconds = useNow()
  const target = parseTime(time)

  // SSR (server snapshot is 0) or invalid time: show static badge
  if (nowSeconds === 0 || !target) {
    return (
      <div className="mb-6 flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5">
        <span className="text-sm font-semibold uppercase tracking-widest text-teal-500">
          Upcoming
        </span>
      </div>
    )
  }

  const now = new Date(nowSeconds * 1000)
  const diffMs = target.getTime() - now.getTime()
  const isLive = diffMs <= 2 * 60 * 1000

  if (isLive) {
    return (
      <div className="mb-6 flex flex-col items-center gap-3">
        <div className="flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5">
          <span className="inline-block h-2.5 w-2.5 animate-pulse rounded-full bg-red-500" />
          <span className="text-sm font-semibold uppercase tracking-widest text-red-500">
            Live Now
          </span>
        </div>
      </div>
    )
  }

  let label: string
  if (isToday(target)) {
    label = `Live at ${formatTime(target)}`
  } else if (isTomorrow(target)) {
    label = `Live tomorrow at ${formatTime(target)}`
  } else {
    label = `Live ${formatDayAndTime(target)}`
  }

  return (
    <div className="mb-6 flex flex-col items-center gap-3">
      <div className="flex items-center gap-2 rounded-full border border-teal-500/30 bg-teal-500/10 px-4 py-1.5">
        <span className="text-sm font-semibold uppercase tracking-widest text-teal-500">
          Upcoming
        </span>
      </div>
      <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">{label}</p>
      <p className="font-mono text-2xl font-bold tabular-nums text-teal-500">
        {formatCountdown(diffMs)}
      </p>
    </div>
  )
}
