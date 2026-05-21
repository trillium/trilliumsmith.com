export const BASE_DOMAIN = 'trilliumsmith.com'

export const DESTINATION_MAP: Record<string, string> = {
  github: 'https://github.com/trillium',
  bluesky: 'https://bsky.app/profile/trillium.is',
  website: 'https://trilliumsmith.com',
  linkedin: 'https://linkedin.com/in/trilliumsmith',
  email: 'mailto:trillium@trilliumsmith.com',
}

export function parseHost(host: string): { passthrough: true } | { company: string; role: string } {
  const hostname = host.split(':')[0]

  if (
    hostname === BASE_DOMAIN ||
    hostname === `www.${BASE_DOMAIN}` ||
    !hostname.endsWith(`.${BASE_DOMAIN}`)
  ) {
    return { passthrough: true }
  }

  const subdomain = hostname.replace(`.${BASE_DOMAIN}`, '')
  const dashIndex = subdomain.indexOf('-')
  const company = dashIndex > 0 ? subdomain.slice(0, dashIndex) : subdomain
  const role = dashIndex > 0 ? subdomain.slice(dashIndex + 1) : 'unknown'

  return { company, role }
}

export function resolveDestination(destination: string): string | null {
  return DESTINATION_MAP[destination] ?? null
}
