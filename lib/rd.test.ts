import { describe, expect, test } from 'bun:test'
import { DESTINATION_MAP, parseHost, resolveDestination } from './rd'

describe('parseHost', () => {
  test('bare domain passes through', () => {
    expect(parseHost('trilliumsmith.com')).toEqual({ passthrough: true })
  })

  test('www passes through', () => {
    expect(parseHost('www.trilliumsmith.com')).toEqual({ passthrough: true })
  })

  test('unrelated domain passes through', () => {
    expect(parseHost('google.com')).toEqual({ passthrough: true })
  })

  test('empty string passes through', () => {
    expect(parseHost('')).toEqual({ passthrough: true })
  })

  test('localhost passes through', () => {
    expect(parseHost('localhost:3737')).toEqual({ passthrough: true })
  })

  test('extracts company and role from subdomain', () => {
    expect(parseHost('posthog-senior_frontend_engineer.trilliumsmith.com')).toEqual({
      company: 'posthog',
      role: 'senior_frontend_engineer',
    })
  })

  test('handles company-only subdomain (no dash)', () => {
    expect(parseHost('posthog.trilliumsmith.com')).toEqual({
      company: 'posthog',
      role: 'unknown',
    })
  })

  test('splits on first dash only', () => {
    expect(parseHost('my-company-senior-role.trilliumsmith.com')).toEqual({
      company: 'my',
      role: 'company-senior-role',
    })
  })

  test('strips port before parsing', () => {
    expect(parseHost('posthog-swe.trilliumsmith.com:3737')).toEqual({
      company: 'posthog',
      role: 'swe',
    })
  })

  test('handles underscores in role', () => {
    expect(parseHost('stripe-staff_frontend_eng.trilliumsmith.com')).toEqual({
      company: 'stripe',
      role: 'staff_frontend_eng',
    })
  })
})

describe('resolveDestination', () => {
  test('resolves known destinations', () => {
    expect(resolveDestination('github')).toBe('https://github.com/trillium')
    expect(resolveDestination('bluesky')).toBe('https://bsky.app/profile/trillium.is')
    expect(resolveDestination('website')).toBe('https://trilliumsmith.com')
    expect(resolveDestination('email')).toBe('mailto:trillium@trilliumsmith.com')
  })

  test('returns null for unknown destination', () => {
    expect(resolveDestination('nonexistent')).toBeNull()
    expect(resolveDestination('')).toBeNull()
  })

  test('all DESTINATION_MAP entries resolve', () => {
    for (const [key, url] of Object.entries(DESTINATION_MAP)) {
      expect(resolveDestination(key)).toBe(url)
    }
  })
})
