# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.

## Build and verification

- `yarn build` is the only complete check. It runs `next build --webpack` plus `scripts/postbuild.mjs` (RSS/feed generation).
- `npx tsc --noEmit` reports ~15 `Cannot find module 'contentlayer/generated'` errors until a build has run at least once. That is expected, not a regression — verify with `yarn build`.
- `yarn lint` (`biome check .`) has ~77 pre-existing errors and 43 warnings on a clean `main`. Judge lint by scoping to the files you touched (`npx biome check <paths>`), not by the repo-wide total.
- CI (`.github/workflows/spellcheck.yml`) is spellcheck-only and runs `yarn install --frozen-lockfile`. Any `package.json` change must ship an updated `yarn.lock`, or CI fails before it ever checks spelling.
- `bun.lock` is present but unused: `packageManager` pins yarn and CI installs with yarn.

## Sharp edges

- **A build dirties your working tree.** `next build` rewrites `app/tag-data.json` (tag counts, derived from blog frontmatter) and `next-env.d.ts` (quote style). Both are generated; neither should ever be committed. If you see them in `git status` after a build, `git restore` them. This has already caused one bad commit.
- **`tsconfig.tsbuildinfo` is gitignored.** It was committed by accident once; do not re-add it.
- `data/image-placeholders.json` is generated, not hand-edited. Run `yarn placeholders` after adding or replacing any image under `public/static/`, and commit the result. The generator is deterministic: re-running on unchanged images is a no-op.

## Image rendering

- `components/Image.tsx` is the single choke point for images. Cards, post banners, author cards/avatars, and MDX blog images all resolve through it, so a change there affects all of them. MDX blog images arrive via pliny's `remarkImgToJsx`, which rewrites markdown image nodes to `<Image>` and resolves through `components/MDXComponents.tsx`.
- `remarkImgToJsx` only converts images that exist under `public/`; anything else stays a plain `<img>` with no placeholder.

## Deploy

- Production is Vercel, deploying from `main` (`.vercel` is gitignored, no `vercel.json` in-repo). `netlify.toml` holds only PostHog redirect rules despite the filename.
- Product-facing changes ship through the `no-mistakes` pipeline (repo is registered `no-mistakes-prod-only`), never by pushing to `main` directly.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
