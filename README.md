# Shivam Vyas — Portfolio

Personal portfolio website built with HTML, CSS, and vanilla JavaScript. No frameworks, no build tools — static files deployed on Vercel.

**Live:** [shivamvyas.in](https://www.shivamvyas.in)

## Sections

| Section | Description |
|---|---|
| **About** | Bio, introduction, and profile photo |
| **Experience** | Work history at Techwave and Infosys |
| **Thoughts** | Engineering blog — backend architecture, system design, distributed systems |
| **Projects** | Open-source and personal projects on GitHub |

## Features

- **Dark mode** — toggle in the sidebar footer; persists via `localStorage`, respects `prefers-color-scheme`
- **Swipe navigation** — gesture-first mobile sidebar; right-swipe from left edge to open, tap-outside to close
- **Hash routing** — active section reflected in URL (`/#experience`, `/#projects`, etc.)
- **Social links** — LinkedIn, GitHub, and X icons in the sidebar footer alongside the dark mode toggle
- **OG / Twitter cards** — pre-rendered 1200×630 image for rich social sharing previews

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts — EB Garamond (body), STIX Two Text (nav)
- Deployed on Vercel (static, no build step)

## Local Development

No install needed. Serve with any static file server:

```bash
python -m http.server 8080
# open http://localhost:8080
```

Or use the VS Code **Live Server** extension.

## Project Structure

```
Portfolio/
├── index.html              # Main SPA — About, Experience, Projects sections
├── og-image.html           # OG image template (1200×630) for social sharing
├── css/
│   └── style.css           # Design tokens, layout, components, dark mode
├── js/
│   └── script.js           # Loader, section navigation, theme toggle, swipe gestures
├── thoughts/
│   ├── index.html          # Blog post list (fetches manifest.json)
│   ├── post.html           # Individual post renderer (?slug= param)
│   ├── manifest.json       # Post index — [{title, date, slug, excerpt}]
│   └── <slug>/
│       └── content.md      # Post body in Markdown with YAML frontmatter
├── assets/
│   ├── logo.svg            # S.V. monogram
│   └── logos/              # Company logo assets (Techwave, Infosys)
└── images/
    ├── profile.jpeg        # Profile photo
    └── og.png              # Open Graph / Twitter card image
```

## Adding a Blog Post

1. Create `thoughts/<slug>/content.md` with frontmatter:
   ```yaml
   ---
   title: "Post Title"
   date: "2026-05-31"
   slug: "post-slug"
   excerpt: "One sentence summary."
   ---

   Post body in Markdown...
   ```
2. Add an entry to `thoughts/manifest.json`
3. `git push` — Vercel deploys in ~30 seconds

## License

**Code** (HTML, CSS, JS) — [MIT License](LICENSE)

**Written content** (`thoughts/`) — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
© Shivam Vyas 2026. Free to share with attribution, not for commercial use.

---

<img src="assets/logo.svg" width="32" alt="S.V." />
