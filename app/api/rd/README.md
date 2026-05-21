# Resume Link Redirect Tracking (`/rd/`)

Trackable short-links for resumes, email signatures, business cards, and anywhere else you share links. Every click records who clicked, which link, and where the link lived.

## How it works

```
posthog-senior_frontend_engineer.trilliumsmith.com/rd/github?src=resume-v2
│       │                                              │       │
│       └─ role (underscores for spaces)               │       └─ source tag
└─ company (before first dash)                         └─ destination key
```

1. **Wildcard DNS** — `*.trilliumsmith.com` resolves to Vercel
2. **Proxy** (`proxy.ts`) — extracts company + role from the subdomain, injects as headers, rewrites `/rd/*` → `/api/rd/*`
3. **Route handler** (`app/api/rd/[destination]/route.ts`) — resolves the destination, fires a PostHog event, returns a 302 redirect

## Destinations

Defined in `lib/rd.ts` → `DESTINATION_MAP`:

| Key | Redirects to |
|-----|-------------|
| `github` | https://github.com/trillium |
| `bluesky` | https://bsky.app/profile/trillium.is |
| `linkedin` | https://linkedin.com/in/trilliumsmith |
| `website` | https://trilliumsmith.com |
| `email` | mailto:trillium@trilliumsmith.com |

Unknown destinations return `404`.

## URL format

```
{company}-{role}.trilliumsmith.com/rd/{destination}?src={source}
```

### Subdomain

Encodes who the link was sent to:

- `posthog-senior_frontend_engineer` → company: `posthog`, role: `senior_frontend_engineer`
- `stripe-staff_eng` → company: `stripe`, role: `staff_eng`
- `posthog` (no dash) → company: `posthog`, role: `unknown`

Rules:
- Split on **first dash only** — company is before, role is after
- Use **underscores** for spaces in the role
- Company names with dashes: only the first segment becomes the company (e.g. `my-company-swe` → company: `my`, role: `company-swe`)

### Source param (`?src=`)

Tags where the link lives. Defaults to `direct` if omitted.

| Example | Meaning |
|---------|---------|
| `?src=resume-v1` | First version of resume |
| `?src=resume-v2` | Updated resume |
| `?src=blog-agentic-workflows` | CTA in a blog post |
| `?src=email-sig` | Email signature |
| `?src=qr-card` | Business card QR code |
| _(omitted)_ | Direct / untagged link |

## PostHog event

Every click fires a `resume_link_click` event with:

| Property | Source | Example |
|----------|--------|---------|
| `company` | subdomain | `posthog` |
| `role` | subdomain | `senior_frontend_engineer` |
| `destination` | URL path | `github` |
| `url` | resolved destination | `https://github.com/trillium` |
| `source` | `?src=` param | `resume-v2` |
| `user_agent` | request header | `Mozilla/5.0...` |
| `ip` | `x-forwarded-for` | `107.198.7.2` |
| `distinctId` | IP address | (same as ip) |

## Files

| File | Purpose |
|------|---------|
| `lib/rd.ts` | `parseHost()`, `resolveDestination()`, `DESTINATION_MAP` |
| `lib/rd.test.ts` | Unit tests (13 tests) |
| `proxy.ts` | Subdomain parsing + URL rewrite |
| `app/api/rd/[destination]/route.ts` | PostHog capture + 302 redirect |

## Adding a destination

1. Add the key and URL to `DESTINATION_MAP` in `lib/rd.ts`
2. Tests auto-cover it via the exhaustive map check
3. Push — Vercel deploys automatically

## Testing

```bash
# Unit tests
bun test lib/rd.test.ts

# Live test (after deploy)
curl -v https://testcompany-testrole.trilliumsmith.com/rd/github?src=test

# Health check
curl https://trilliumsmith.com/api/health
```
