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
| `app/globals.css` | Colour tokens (`:root` / `[data-theme="dark"]`), Tailwind `@theme` mapping, base styles |
| `components/site-nav.tsx` | Sticky header with a blurred background (sensory-ui style), aligned to the content column (`max-w-3xl`, same padding as `<main>`). Desktop: the name on the left (on `/` the S.V. `Monogram` from `components/icons.tsx` replaces it, because the page heading already says the name), then plain ui-sdk `NavigationMenu` links, bordered LinkedIn, GitHub and X icon buttons, and the theme switch. Below `md`: the name on the left, switch and Menu on the right. It's one element for both, so the switch and nav each exist once |
| `lib/github.ts` | Build-time GitHub fetch (language, stars, last update), revalidated daily, with fallback to `content/projects.ts`. Set `GITHUB_TOKEN` in Vercel to avoid the 60 requests/hour unauthenticated limit |
| `components/mobile-menu.tsx` | ui-sdk `Drawer` (opens from the right) with nav and socials. Its contents are `data-agent-hidden` so agents use the sidebar's copy |
| `components/theme-switch.tsx` | ui-sdk `Switch` labelled "Dark mode". Writes `data-theme` and `localStorage`, and syncs `theme-color` |
| `components/agent-bridge.tsx` | `createAgent` + `registerTools` (WebMCP), created lazily on the client |
| `content/*.ts` | Typed data: `site` / `navItems` / `socials`, `experience`, `projects`, `thoughts` |
| `lib/metadata.ts` | `pageMetadata({ title, description, path })`. Use it on every page so OG and Twitter tags stay complete |
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

- Experience, projects, thoughts: edit the arrays in `content/`. Projects need `repo` (plus `path` for a folder inside a repo), a short `description`, `stack` and `started` (the first-commit date). Mark `inProgress` for unfinished work.
- Thoughts entries are `{ kind: "external", title, date, url }` today. The `kind: "hosted"` (`slug`, `excerpt`) shape is reserved for MDX posts when the blog moves onto the site, which is planned for a separate conversation. When that happens, the portfolio becomes canonical and Medium uses "Import a story".
- OG image: `public/images/og.png` (2400×1260, served as 1200×630).
