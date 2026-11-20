# Shivam Vyas — Portfolio

Personal portfolio website. Next.js (App Router, TypeScript), Tailwind CSS v4 and [ui-sdk](https://ui-sdk.dev) components, statically rendered and deployed on Vercel.

**Live:** [shivamvyas.in](https://www.shivamvyas.in) · **Current release:** v2.1.0 ([changelog](CHANGELOG.md))

> v1 (the hand-written HTML/CSS/JS site) is preserved on the `v1` branch.

## Pages

| Route | Description |
|---|---|
| `/` | About — intro, profile photo and skills |
| `/experience/` | Work history |
| `/thoughts/` | Articles, filtered as All / Technology / Reflections (Technology links out to Medium) |
| `/projects/` | Projects on GitHub, filtered as All / In progress / Completed, 5 per page, newest first |

## Features

- **Sticky top navbar** — nav links, resume download, socials and theme switch; on phones it collapses to a compact bar with a **Menu** drawer (ui-sdk `Drawer`)
- **Resume download** — icon in the navbar and mobile menu, confirmed through a ui-sdk `AlertDialog`
- **Skills** — capsules with brand logos, grouped by category, following light/dark mode
- **Live projects** — languages and last update fetched from the GitHub API, refreshed daily; filter tabs and pagination kept in the URL
- **Article categories** — Technology and Reflections tabs, kept in the URL
- **Page transitions** — content blur-fades between pages while the header stays still (React `ViewTransition`); instant with reduced motion
- **Dark mode** — ui-sdk `Switch` with a cross-fade; persists via `localStorage`, defaults to `prefers-color-scheme`, no flash on load
- **Share preview** — a generated card at `/og.jpg` (photo, name, role, skills), laid out so square thumbnails like WhatsApp's still show the photo and name
- **SEO, AEO and GEO** — static HTML with per-page titles, descriptions and canonical URLs; schema.org JSON-LD (Person, WebSite, ProfilePage, breadcrumbs, project and article lists); `sitemap.xml`; `robots.txt` that welcomes AI crawlers; `/llms.txt` and `/llms-full.txt` for AI answer engines
- **Privacy** — no phone number anywhere; employer names appear only on the Experience page, never in metadata; images carry no EXIF or location data
- **Agent-ready** — ui-sdk agent bridge registered over WebMCP, so browser agents can read the nav, switch the theme and open the menu
- **Accessible** — skip link, visible focus rings, `aria-current` on the active page, keyboard-friendly tabs and pagination, reduced-motion support

## Tech Stack

- Next.js 16 (App Router, static output) · React 19 · TypeScript
- Tailwind CSS v4 with CSS-variable design tokens
- `@ui-sdk/react` — NavigationMenu, Switch, Drawer, AlertDialog, Tabs, Pagination, agent bridge
- IBM Plex Sans + IBM Plex Mono via `next/font`
- `next/og` + `sharp` for the share card
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
app/            routes, root layout, template (page transitions), globals.css, sitemap/robots,
                icon, og.jpg (share card), llms.txt, llms-full.txt
components/     site-nav, mobile-menu, theme-switch, resume-download, skills, projects-table,
                thoughts-list, structured-data, json-ld, agent-bridge, icons
content/        site.ts, experience.ts, projects.ts, skills.ts, thoughts.ts (all page data)
lib/            metadata helper, GitHub fetch, llms builder, language colours, active-link helper
public/         images/ (profile), assets/ (logos), skills/ (skill logos), resume.pdf
test/           Vitest setup + agent test
```

## Updating Content

- **Experience / projects / skills / thoughts** — edit the typed arrays in `content/`. Each thought has a `category` (`technology` or `reflection`); mark unfinished projects `inProgress`.
- **Resume** — replace `public/resume.pdf` (the public copy, without a phone number).
- **About copy** — edit `app/page.tsx`.
- **Share card** — edit `app/og.jpg/route.tsx`, then bump `?v=` in `lib/metadata.ts` so apps fetch the new image.
- **New page** — add `app/<route>/page.tsx` using `pageMetadata()` from `lib/metadata.ts`, and add it to `navItems` in `content/site.ts`.

## Credits

Design inspired by [shud.in](https://shud.in) and [paco.me](https://paco.me): the calm single-column layout, the dotted article list and the blurred page transitions.

## License

**Code** — [MIT License](LICENSE)

**Written content** — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
© Shivam Vyas 2026. Free to share with attribution, not for commercial use.

**Skill logos** — [skillicons.dev](https://skillicons.dev) (MIT), [Simple Icons](https://simpleicons.org) (CC0) and the [LangChain4j](https://github.com/langchain4j/langchain4j) logo; trademarks belong to their owners.

---

<img src="public/assets/logo.svg" width="32" alt="S.V." />
