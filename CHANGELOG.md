# Changelog

All notable changes to this project will be documented in this file.

---

## [v2.0.0] — 2026-11-13

**Previous:** v1.2.0 · v1 is frozen on the `v1` branch.

### Summary

Full rewrite on Next.js, with a new layout: a sticky top navbar over a centered content column, in place of the left sidebar. Content carries over from v1, plus a live GitHub projects table and two new posts.

### What's New

- **Next.js 16 + TypeScript + Tailwind v4** replaces the hand-written HTML/CSS/JS. The header and `<head>` are defined once in `app/layout.tsx` instead of being copied into every page.
- **Server-rendered pages.** `/thoughts/` used to render its list with client-side JS, so crawlers saw an empty page. Every route is now static HTML.
- **SEO.** Per-page titles, descriptions, canonical URLs and OG/Twitter cards, plus `sitemap.xml` and `robots.txt`.
- **Top navbar.** A sensory-ui-style sticky bar with a blurred background, aligned to the content column: name on the left (the S.V. monogram on About), plain links, bordered LinkedIn/GitHub/X buttons and the theme switch. Phones get a compact bar with a Menu drawer.
- **Design tokens.** shadcn-style oklch tokens for light and dark mode, radius 0, and lucide icons throughout.
- **Projects table.** Eight curated repos styled like GitHub's repo list. Language, stars and last update come live from the GitHub API, revalidated daily. Start dates are first-commit dates.
- **Thoughts.** Generative AI Decoded Parts 3 and 4 added, and the list sorts newest first.
- **ui-sdk components.** NavigationMenu, Switch (dark mode) and Drawer (mobile menu).
- **Agent-ready.** The ui-sdk agent bridge registers `snapshot`/`act`/`query` over WebMCP.
- **IBM Plex Sans + Mono** replace EB Garamond / STIX Two Text.
- **Footer** now reads "Inspired from shud.in and paco.me · © year".

### Removed

- Left sidebar layout
- 1.5s loading spinner
- ❯❯ swipe hint and touch-gesture sidebar, replaced by a Menu drawer
- Rule that hid the theme toggle on mobile everywhere except About

### Fixed

- "wenterprise" typo in the meta description; OG and Twitter titles now match
- Broken Striver A2Z DSA link after the repo rename
- Muted text meets 4.5:1 contrast in both themes

---

## [v1.2.0] — 2026-06-28

**Previous:** v1.1.0 · All releases

### Summary

v1.2.0 is a structural release. The portfolio moves from a single-page app (one `index.html` with JS-driven section switching) to a proper multi-page site — each route is its own HTML document served by Vercel as a directory index. This gives real, linkable URLs and removes a layer of JS that was doing the browser's job. The S.V. loader is also restored with smarter lifecycle behaviour.

---

### What's New

#### Multi-page architecture (`/`, `/experience/`, `/projects/`, `/thoughts/`)

The site is no longer a SPA. Each page is a self-contained HTML document:

| Route | File |
|---|---|
| `/` | `index.html` (About) |
| `/experience/` | `experience/index.html` |
| `/projects/` | `projects/index.html` |
| `/thoughts/` | `thoughts/index.html` |

Nav links use real `href` paths. The active link is hardcoded per page via `aria-current="page"` — no JS sets it anymore.

#### S.V. loader — session-aware, reload-aware

The spinning S.V. loader is back with smarter behaviour:

| Scenario | Loader |
|---|---|
| First open (new tab) | Shows |
| Browser refresh (any page) | Shows |
| Clicking between nav links | Skipped — fadeIn only |

Uses `sessionStorage` to track first visit and the Navigation Timing API (`performance.getEntriesByType('navigation')[0].type`) to detect reloads.

#### Page fade-in on navigation

All pages get a `fadeIn` animation (`opacity: 0 → 1` + `translateY(6px → 0)`) on `.main-content` when navigating between routes — smooth without the full loader.

---

### Bug Fixes

- **Thoughts 404** — `/thoughts/` was returning 404 when accessed directly; now served as a proper route
- **Nav links** — `href="#experience"` hash links replaced with `/experience/` paths across all pages
- **JS click guard** — nav click handler crashed on links without `data-section`; guarded with early return
- **Post typography** — post page heading sizes and dotted leader line colour corrected

---

### Under the Hood

- Removed `showSection()`, `data-section` attributes, and all section-switching JS — `js/script.js` reduced from 89 → 41 lines
- Removed dead CSS: `.loader-wrapper` + `@keyframes spin` were stripped in the SPA cleanup, then restored; `section { display: none }` and `section.section-active` rules removed permanently
- FOUC prevention inline `<script>` in `<head>` on all pages — theme set before first paint

---

### Docs

- `CLAUDE.md` updated to reflect multi-page architecture, new file map, and updated content editing instructions

---

### Upgrade Notes

No breaking changes for visitors. If you have any direct links to `/#experience` or `/#projects` (old hash routes), update them to `/experience/` and `/projects/`.

---

## [v1.1.0] — 2026-05-31

Dark mode, swipe sidebar, social links, OG meta, hash-based routing, post page styles, and accessibility improvements.

---

## [v1.0.0] — Initial release

Foundation: HTML/CSS/JS portfolio with sidebar layout, experience, projects, and thoughts sections.
