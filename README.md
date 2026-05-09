# Shivam Vyas — Portfolio

Personal portfolio website built with HTML, CSS, and vanilla JavaScript. No frameworks, no build tools — static files deployed on Vercel.

## Sections

| Section | Description |
|---|---|
| **About** | Bio, introduction, and profile photo |
| **Experience** | Job Experience at various companies |
| **Thoughts** | Engineering blog — backend architecture, system design, distributed systems + perspective take on different subjects |
| **Projects** | Open-source and personal projects on GitHub |
| **Connect** | Email, LinkedIn, and GitHub |

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- Google Fonts — STIX Two Text
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
├── index.html              # Single-page app — all sections
├── css/
│   └── style.css           # Design tokens, layout, components
├── js/
│   └── script.js           # Loader, section navigation, hamburger
├── assets/
│   └── logos/              # Company logo assets
├── thoughts/               # Blog posts (Markdown)
│   ├── index.json          # Post manifest
│   └── <slug>/
│       └── content.md
└── images/
    └── profile.jpg         # Profile photo
```

## Coming Next

- **Thoughts** — Engineering blog with Markdown-rendered posts on backend architecture, system design, and distributed systems

## License

**Code** (HTML, CSS, JS) — [MIT License](LICENSE)

**Written content** (`thoughts/`) — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
© Shivam Vyas 2026. Free to share with attribution, not for commercial use.

---

<img src="assets/logo.svg" width="32" alt="S.V." />
