# CLAUDE.md

## Project Overview

Ryan Theodore The's personal portfolio website — [ryanthe.com](https://www.ryanthe.com). A static, content-driven site built with Next.js 15 (App Router). All portfolio content (projects, bio) is stored in local TypeScript files under `data/` — no external CMS or database.

**Brand positioning:** AI-native engineer who builds. Student in Singapore, currently moving from web/scraper/bot work into ML and computer vision (object detection). Site should read as: precise, modern, future-looking, restrained — taking inspiration from Rauno Frick (bold dark editorial) and Shu Ding (quiet engineer-minimal), but landing on its own flavor.

## Tech Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.7 |
| Styling | SCSS modules (existing) + Tailwind CSS (new code) |
| UI Components | 21st.dev via Magic MCP (`uiuxpromax` skill) |
| Fonts | Merriweather, Raleway (Google Fonts CDN) |
| Icons | Font Awesome 5 (CDN) |
| Deployment | Vercel |

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build
npm run lint     # ESLint
npm run start    # serve production build
```

## Project Structure

```
app/             # App Router pages and layouts (primary)
  layout.tsx     # Root layout — navbar, footer, global metadata
  page.tsx       # Home page
  not-found.tsx  # 404 page
  _components/   # Private layout components (underscore prefix = not a route)
  projects/      # Projects page (WIP)

src/components/  # Reusable UI components
  home/          # Home-page-specific sections
  works/         # Portfolio/works tile components
  theme/         # Navbar, footer, badge (shared chrome)

src/hooks/       # Custom React hooks (useWindowSize, useMediaQuery)

src/pages/       # Legacy Pages Router — being phased out, do not add files here
  works/         # Works listing + detail pages (Notion integration, being replaced)

data/            # Static content data (TypeScript)
  project.ts     # Project interface and data

public/          # Static assets (images, fonts, icons, favicons)

src/styles/      # Global SCSS variables and font definitions
app/reset.scss   # CSS custom properties (design tokens)
```

## Design System

The redesign is locked to a single visual direction. New components must conform.

| Token | Value | Notes |
|---|---|---|
| Background | `#0A0A0A` (near-black, OLED-friendly) | Primary surface |
| Surface (raised) | `#141414` | Cards, modals |
| Text primary | `#FFFFFF` | Headlines, key body |
| Text secondary | `#A3A3A3` | De-emphasized copy |
| Accent | `#F5A623` (warm amber/gold) | Single accent — links, key CTAs, highlights only |
| Border / hairline | `rgba(255,255,255,0.08)` | Subtle dividers |

**Typography**
- **Headings:** Space Grotesk — weight 500–700, tight letter-spacing on display sizes
- **Body:** Space Grotesk 400 — fallback to system sans
- **Labels / metadata / dates / tags:** JetBrains Mono — uppercase, `tracking-wider`
- Load via `next/font/google` (not CDN `<link>`)

**Motion**
- Project cards: horizontal sliding/scrolling layout (the overarching kinetic moment of the site)
- Content within cards: fade-in on scroll/reveal
- Page transitions: subtle fade
- Avoid bouncy easings — use ease-out, 200–400ms durations
- Respect `prefers-reduced-motion`

**Layout**
- Sections: Hero → Projects (sliding cards) → About/bio
- Generous whitespace, asymmetric Swiss-style grid
- Oversized hero typography (clamp-based responsive sizing)
- No decorative gradients, no glassmorphism, no 3D

**Inspiration boundaries** (do not copy, do borrow language)
- Rauno Frick — boldness, dark editorial confidence, motion polish
- Shu Ding — quietness, monospaced accents, restraint
- Avoid: heavy 3D scenes, neon-overload, brutalist chaos

## Styling Rules

**Existing components:** leave SCSS modules untouched. Do not rewrite them unless explicitly asked.

**New components:** use Tailwind CSS utility classes. Do not create new `.module.scss` files for new work.

**CSS custom properties from `app/reset.scss` must always be used for colors and spacing in SCSS** — never hardcode color hex values or pixel values that duplicate a token. Key tokens:

```
--bg0, --bg1, --bg2       background layers
--text0, --text1, --text2 text hierarchy
--link1                   link/accent color
```

Tailwind components may use Tailwind's color system directly. If a new component needs to match the site's palette, prefer mapping via CSS variables in a wrapper class.

## TypeScript Rules

- **No `any` types** — always define proper interfaces or use `unknown` + type guards
- `strict` is `false` in tsconfig, but `strictNullChecks` is `true` — handle nulls explicitly
- Interfaces over type aliases for component props
- Enums are fine for domain models (see `WorksDiscipline`, `WorksNotability`)

## Architecture Decisions

**App Router only for new pages.** The `src/pages/` directory is a migration artifact. Do not add new routes there. All new pages go in `app/`.

**Static content data.** All displayable content (projects, works, bio blurbs) lives as typed TypeScript objects in `data/`. No runtime database calls. When adding content, edit or create files in `data/` — not hardcoded JSX strings.

**Server components by default.** Only add `"use client"` when the component needs browser APIs, event listeners, or React state/effects. Keep data fetching in server components.

## Hard Rules (Never Violate)

1. **Never commit `.env.local` or any file containing secrets.** If a secret needs to be referenced, document it in `.env.local.example` with placeholder values.
2. **Never add files to `src/pages/`.** All new routes go in `app/`.
3. **Never use TypeScript `any`.** Use proper types or `unknown`.
4. **Always use CSS custom properties for colors in SCSS** — no hardcoded hex or rgb values.

## Current Migration Status

The site is mid-migration from an older architecture:

| Area | Status |
|---|---|
| App Router adoption | In progress — `app/` is primary, `src/pages/` being retired |
| Content source | Notion → local `data/` TypeScript files (in progress) |
| Font loading | CDN `<link>` tags → should migrate to `next/font` |
| Image API | `next/legacy/image` → should migrate to `next/image` |
| UI layer | Full AI-driven rewrite planned using `uiuxpromax` + 21st.dev |

## UI Rewrite Note

A full UI rewrite is planned using the `uiuxpromax` skill (21st.dev Magic MCP). Before proposing or generating new UI for any page, ask the user about the intended content, layout, and design direction for that page. Do not guess or carry over old layout assumptions.
