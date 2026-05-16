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
| **Connect** | LinkedIn, GitHub, and X |

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
├── index.html              # Single-page app — all sections
├── og-image.html           # OG image template (1200×630) for social sharing
├── css/
│   └── style.css           # Design tokens, layout, components
├── js/
│   └── script.js           # Loader, section navigation, swipe gestures
├── assets/
│   ├── logo.svg            # S.V. monogram
│   └── logos/              # Company logo assets (Techwave, Infosys)
└── images/
    ├── profile.jpeg        # Profile photo
    └── og.png              # Open Graph / Twitter card image
```

## License

**Code** (HTML, CSS, JS) — [MIT License](LICENSE)

**Written content** (`thoughts/`) — [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/)
© Shivam Vyas 2026. Free to share with attribution, not for commercial use.

---

<img src="assets/logo.svg" width="32" alt="S.V." />
