# AGENTS.md

## Agent Model

This project uses a **single AI assistant** (Claude Code) to handle all engineering tasks — UI, content, architecture, and tooling. There are no specialized sub-agents with fixed ownership; Claude Code operates across the full stack.

## Available Skills & Tools

| Skill | Purpose |
|---|---|
| `uiuxpromax` | 21st.dev Magic MCP — generates Tailwind-based UI components. Use for all new UI work. |
| `superpowers` | Extended capabilities (to be configured) |

When generating new UI components, always invoke the `uiuxpromax` skill rather than hand-writing components from scratch. Ask the user for design direction before generating.

## Before Starting Any New Page or Feature

**Always ask the user:**
1. What content should appear on this page?
2. What is the intended layout or visual style?
3. Are there reference designs or existing components to draw from?

Do not infer content or layout from old code — the full UI is being rewritten.

## Content Management

All site content is stored as **static TypeScript files in `data/`**. There is no database or CMS.

| File | Purpose |
|---|---|
| `data/project.ts` | `Project` interface |
| `data/projects.ts` | Project list shown on the projects section |

When the user provides new content (bio text, project descriptions, links, images):
- Add it to the appropriate file in `data/`
- Define or extend interfaces in the same file if needed
- Never hardcode content strings inside JSX — it must live in `data/`

Images go in `public/images/`. Reference them with absolute paths from the public root (e.g. `/images/projects/qr-sstinc-org.jpg`).

## Design System (must follow)

See `CLAUDE.md` for the full token table. Critical rules for any new component:

- Background `#0A0A0A`, text `#FFFFFF` / `#A3A3A3`, accent `#F5A623` (amber)
- Headings/body: **Space Grotesk** via `next/font/google`
- Labels/dates/tags: **JetBrains Mono**, uppercase, `tracking-wider`
- Motion: project cards slide horizontally; content fades in; respect `prefers-reduced-motion`
- No glassmorphism, no 3D, no gradients beyond subtle fade-to-black
- A single accent color — do not introduce a second hue

When generating components via the `uiuxpromax` skill, pass these tokens explicitly so generated output matches the system rather than the skill's defaults.

## Coding Behavior

### Always

- Use **Tailwind CSS** for all new components
- Use **App Router** (`app/`) for all new routes and layouts
- Use **`next/image`** (not `next/legacy/image`) for all new image components
- Use **`next/font`** for any new font imports
- Type all props with explicit TypeScript interfaces — no `any`
- Use CSS custom properties (`--bg0`, `--text1`, etc.) when writing SCSS for existing components
- Keep data fetching in **server components** — only add `"use client"` when truly needed

### Never

- Commit `.env.local` or any file with real credentials
- Add new files to `src/pages/` — all new routes go in `app/`
- Use TypeScript `any`
- Hardcode color hex values in SCSS — use CSS custom property tokens
- Generate new UI without asking the user for design/content direction first
- Rewrite existing SCSS modules unless explicitly asked to

## Migration Tasks (Background Context)

These are known pending items — do not block on them but keep them in mind:

- **Font loading:** `app/layout.tsx` uses raw `<link>` tags for Google Fonts. Should migrate to `next/font/google`.
- **Image API:** Components using `next/legacy/image` should be updated to `next/image` when touched.
- **Works page:** Currently in `src/pages/works/` with a Notion integration. Will be replaced by a static `app/works/` page reading from `data/`.
- **Projects page:** `app/projects/` is a WIP placeholder. Content and design TBD — ask the user before building.

## Git Hygiene

- Branch from `dev`, not `main`
- `main` is the production branch — only merge reviewed, working code
- Never force-push
- Always verify `.env.local` is not staged before committing (`git status` before `git add`)

## What to Ask the User

Pause and ask before:
- Starting any new page (get content + design brief)
- Adding a new dependency (confirm it's the right choice)
- Deleting existing components or pages
- Any database, auth, or external service integration
- Pushing to `main` or creating a PR against `main`
