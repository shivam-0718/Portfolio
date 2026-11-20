# CLAUDE.md — Portfolio (v2)

Personal portfolio for Shivam Vyas, live at `https://www.shivamvyas.in`.

## Branches

- `v2`: this Next.js rewrite. All work happens here.
- `v1`: frozen copy of the original static HTML/CSS/JS site. Never commit to it.
- `main`: serves production until cutover. Never commit to it.

**Cutover (manual):** Vercel → Settings → Git → Production Branch = `v2`, then GitHub → Settings → Default branch = `v2`. To roll back, set the production branch to `main` again.

`vercel.json` sets `"framework": "nextjs"` so `v2` deploys build as Next.js, while `main` keeps deploying as plain static files.

## Stack

Next.js 16 (App Router, all routes static) · React 19 · TypeScript · Tailwind CSS v4 · `@ui-sdk/react` (beta) · IBM Plex Sans/Mono via `next/font` · Vitest.

```bash
npm run dev | build | typecheck | test
```

## Layout of the code

| Path | Role |
|---|---|
| `app/layout.tsx` | `<html>`, fonts, pre-paint theme script, header, centered `<main>` (`max-w-3xl`), centered footer credit, `<AgentBridge/>` |
| `app/page.tsx` | About page (copy lives here) |
| `app/{experience,projects,thoughts}/page.tsx` | Pages that render arrays from `content/` |
| `app/sitemap.ts`, `app/robots.ts`, `app/icon.svg`, `app/not-found.tsx` | SEO, favicon, 404 |
| `app/og.jpg/route.tsx` | The link-preview card (photo, name, role, `site.skills`), rendered at build time with `next/og` and converted to JPEG with `sharp` to keep it small (~55 KB; WhatsApp drops large previews) |
| `app/llms.txt/route.ts`, `app/llms-full.txt/route.ts`, `lib/llms.ts` | `/llms.txt` (short index) and `/llms-full.txt` (everything) for AI assistants and answer engines, generated from `content/` |
| `app/robots.ts` | Allows all crawlers, and names the AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended…) explicitly |
| `components/structured-data.tsx`, `components/json-ld.tsx` | schema.org JSON-LD. Site-wide: Person (roles with dates, skills, credentials, `sameAs`) and WebSite. Per page: ProfilePage on `/`, BreadcrumbList on the others, ItemList of `SoftwareSourceCode` on Projects and of `BlogPosting` on Thoughts. Page descriptions open with a plain factual sentence ("Shivam Vyas is…") that AI answer engines can quote |
| `app/template.tsx` | Page transitions: React `<ViewTransition>` with a shud.in-style blur fade (`.page` rules in `globals.css`). The header is named `site-header` so it stays still. Theme changes set `data-vt="theme"` on `<html>` so they use their own cross-fade |
| `components/thoughts-list.tsx` | Client side of `/thoughts/`: All / Technology / Reflections capsule tabs (from each entry's `category`), `?category=` in the URL, no pagination |
| `components/capsule-tab.ts` | The shared blue capsule tab style and a `saveParam` URL helper |
| `components/projects-table.tsx` | Client side of `/projects/`: ui-sdk `Tabs` (All / In progress / Completed, blue capsules with counts) and ui-sdk `Pagination` (5 per page). Filter and page live in `?status=` and `?page=` via `history.replaceState`; the server renders All, page 1 |
| `components/skills.tsx` + `content/skills.ts` | Skill capsules on the About page, grouped by category. Logos are skillicons.dev SVGs (MIT) saved in `public/skills/`; "themed" ones have `-light`/`-dark` files that follow the site theme. Add a skill by downloading its icon from github.com/tandpfun/skill-icons into `public/skills/`. If skillicons has none, rebuild the same tile (256px, `rx` 60, `#F4F2ED` light / `#242938` dark) from Simple Icons or the project's own logo, as for JUnit 5, SonarQube, Spring Security and LangChain4j. If no logo stays readable at 18px, leave `icon` out for a name-only capsule || `components/resume-download.tsx` | Download button plus a ui-sdk `AlertDialog` asking for confirmation, used in the navbar (icon) and the Menu drawer (full width) |
| `app/globals.css` | Colour tokens (`:root` / `[data-theme="dark"]`), Tailwind `@theme` mapping, base styles |
| `components/site-nav.tsx` | Sticky header with a blurred background (sensory-ui style), aligned to the content column (`max-w-3xl`, same padding as `<main>`). Desktop: the name on the left (on `/` the S.V. `Monogram` from `components/icons.tsx` replaces it, because the page heading already says the name), then plain ui-sdk `NavigationMenu` links, a download-resume icon button that opens a confirm dialog, bordered LinkedIn, GitHub and X icon buttons, and the theme switch. Below `md`: the name on the left, switch and Menu on the right. It's one element for both, so the switch and nav each exist once |
| `lib/github.ts` | Build-time GitHub fetch (language breakdown with percentages, last update), revalidated daily, with fallback to `content/projects.ts`. Set `GITHUB_TOKEN` in Vercel to avoid the 60 requests/hour unauthenticated limit |
| `components/mobile-menu.tsx` | ui-sdk `Drawer` (opens from the right) with nav and socials. Its contents are `data-agent-hidden` so agents use the sidebar's copy |
| `components/theme-switch.tsx` | ui-sdk `Switch` labelled "Dark mode". Writes `data-theme` and `localStorage`, and syncs `theme-color`. Theme changes cross-fade with the View Transitions API (styles at the end of `globals.css`); reduced motion and older browsers switch instantly |
| `components/agent-bridge.tsx` | `createAgent` + `registerTools` (WebMCP), created lazily on the client |
| `content/*.ts` | Typed data: `site` / `navItems` / `socials`, `experience`, `projects`, `thoughts` |
| `lib/metadata.ts` | `pageMetadata({ title, description, path })`. Use it on every page so OG and Twitter tags stay complete. Tab titles are "Page · Shivam Vyas" and the home tab is just "Shivam Vyas" |
| `test/site-nav.test.tsx` | ui-sdk agent test (names, theme switch, menu) |

## Rules

- **Colours:** shadcn-style oklch tokens in `globals.css` (`--background`, `--foreground`, `--primary`, `--muted`, `--muted-foreground`, `--border`, `--sidebar-*`, `--chart-*`, …), exposed as Tailwind colours (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-muted`, `border-border`, `bg-sidebar`, …). One extra token, `--link`, is the blue used for text, icons, focus rings and the "on" switch. It's `--primary` in light and `--sidebar-primary` in dark, because dark `--primary` is a button fill that's too dark to read on the dark background. Never hardcode colours in components. Dark mode uses `[data-theme="dark"]` on `<html>`; `.dark` also works, and Tailwind's `dark:` variant matches both.
- **Radius:** `--radius: 0`, so use `rounded-lg`/`rounded-md` (they resolve from `--radius`), not bare `rounded`. Switches stay `rounded-full`.
- **Icons:** `lucide-react` with `aria-hidden="true"` and `strokeWidth={1.75}`. Each nav item's icon lives in `navItems` (`content/site.ts`), and `PageHeading` reuses it. Brand icons (LinkedIn/GitHub/X) stay as inline SVGs in `components/icons.tsx`.
- **ui-sdk:** follow the `ui-sdk` skill (`.agents/skills/ui-sdk/SKILL.md`). Docs for the installed version are at `node_modules/@ui-sdk/react/docs/llms.txt`. Import from per-component entries, name every control, style from `data-*` state, and don't hand-roll ARIA roles. `@layer ui-sdk;` must stay first in `globals.css`.
- **Agents:** in this beta, agents can read link labels but can't press links (`NavigationMenuLink` and `Button render={<a/>}` expose no actions). Theme and menu are the actionable controls. Keep labels unique: one "Dark mode" switch and one "Main navigation" in the DOM.
- **External links:** `target="_blank" rel="noopener noreferrer"` and `aria-label="… (opens in new tab)"`.
- **Pages:** each page has one `<section aria-labelledby>` containing its `<h1>`.
- **Commits:** conventional (`feat:`, `fix:`, `chore:`, `docs:`), under the owner's name only. No co-author trailers.

## Content updates

- Experience (`content/experience.ts`) mirrors the resume: same bullets, locations and dates. Update both together. `certifications` there isn't shown on any page (the resume covers it) and only feeds `/llms.txt`.
- About copy stays generic: "software engineer", no company name and no industry (payments, fintech). Specifics belong on the Experience page.
- Employer names appear only on the visible Experience page. Never put them in page descriptions, structured data or `llms*.txt`; those use roles and dates only.
- Projects sort by last GitHub update, newest first, so the order in `content/projects.ts` only matters as a fallback.
- Experience, projects, thoughts: edit the arrays in `content/`. Projects need `repo` (plus `path` for a folder inside a repo), a short `description`, `stack` (frameworks and tools only, since languages come live from GitHub's languages API) and a fallback `language`. Mark `inProgress` for unfinished work.
- Thoughts entries are `{ kind: "external", category, title, date, url }` today, where `category` is `"technology"` (Medium posts) or `"reflection"` (personal writing). The `kind: "hosted"` (`slug`, `excerpt`) shape is reserved for MDX posts when the blog moves onto the site, which is planned for a separate conversation. When that happens, the portfolio becomes canonical and Medium uses "Import a story".
- Resume: `public/resume.pdf`, linked from the navbar and Menu drawer (`resume` in `content/site.ts`). It must be the copy **without the phone number**: everything in `public/` is publicly downloadable. Check before replacing it.
- Share card, structured data and llms.txt all read `site` in `content/site.ts` (`description`, `skills`, `photo`, `medium`). Keep the wording domain-neutral: Shivam is a software engineer, not tied to one industry. After changing the card, bump `?v=` on the image URL in `lib/metadata.ts` and re-scrape it with LinkedIn Post Inspector, since platforms cache previews. Keep the card's photo, name and role inside the centre square (x 285–915): WhatsApp shows a square crop of it.
