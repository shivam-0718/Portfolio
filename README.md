# Shivam Vyas — Portfolio

Personal portfolio website. Next.js (App Router, TypeScript), Tailwind CSS v4 and [ui-sdk](https://ui-sdk.dev) components, statically rendered and deployed on Vercel.

**Live:** [shivamvyas.in](https://www.shivamvyas.in)

> v1 (the hand-written HTML/CSS/JS site) is preserved on the `v1` branch.

## Pages

| Route | Description |
|---|---|
| `/` | About — bio and profile photo |
| `/experience/` | Work history at Techwave and Infosys |
| `/thoughts/` | Writing (currently links out to Medium) |
| `/projects/` | Side projects on GitHub |

## Features

- **Left-sidebar layout** — italic nav, socials and theme switch; on phones it collapses to a top bar with a **Menu** drawer (ui-sdk `Drawer`)
- **Dark mode** — ui-sdk `Switch`; persists via `localStorage`, defaults to `prefers-color-scheme`, no flash on load
- **Agent-ready** — ui-sdk agent bridge registered over WebMCP, so browser agents can read the nav, switch the theme and open the menu
- **SEO** — every page is static HTML with per-page title, description, canonical URL, OG/Twitter cards, `sitemap.xml` and `robots.txt`
- **Accessible** — skip link, visible focus rings, `aria-current` on the active page, reduced-motion support

## Tech Stack

- Next.js 16 (App Router, static output) · React 19 · TypeScript
- Tailwind CSS v4 with CSS-variable design tokens
- `@ui-sdk/react` — NavigationMenu, Switch, Drawer, agent bridge
- IBM Plex Sans + IBM Plex Mono via `next/font`
- Vitest + Testing Library (agent test)

## Local Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run typecheck
npm test
```

## Project Structure

```
app/            routes, root layout, globals.css, sitemap/robots, icon
components/     site-nav, mobile-menu, theme-switch, agent-bridge, icons
content/        site.ts, experience.ts, projects.ts, thoughts.ts (all page data)
lib/            metadata helper, active-link helper
public/         images/ (profile, og.png) and assets/ (logos)
test/           Vitest setup + agent test
```

## Updating Content

- **Experience / projects / thoughts** — edit the typed arrays in `content/`.
- **About copy** — edit `app/page.tsx`.
- **New page** — add `app/<route>/page.tsx` using `pageMetadata()` from `lib/metadata.ts`, and add it to `navItems` in `content/site.ts`.

## License

**Code** — [MIT License](LICENSE)

**Written content** — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
© Shivam Vyas 2026. Free to share with attribution, not for commercial use.

---

<img src="public/assets/logo.svg" width="32" alt="S.V." />
