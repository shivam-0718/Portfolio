# Portfolio — Build Plan

## Current State

| File | Status | Issue |
|---|---|---|
| `index.html` | Complete | None |
| `css/stylesheet.css` | Incomplete | Wrong filename + missing all styles below reset |
| `js/script.js` | Incomplete | Missing section navigation + hamburger |
| `images/profile.jpg` | Missing | Must be added manually |

---

## Dependency Chain

HTML defines the structure and class names.
CSS reads those class names to apply visual styles.
JS reads those class names and IDs to add interactivity.
Correct order: **HTML → CSS → JS → Images**

```
index.html
  └── references /css/style.css      ← must match filename exactly
  └── references /js/script.js
  └── references /images/profile.jpg

css/style.css
  └── styles .loader-wrapper         ← used by HTML + controlled by JS
  └── styles .page-layout            ← used by HTML
  └── styles .sidebar, .nav-link     ← used by HTML + JS adds .active
  └── styles section[id]             ← JS toggles .section-active on these
  └── styles .hamburger              ← JS toggles body.sidebar-open

js/script.js
  └── queries .loader-wrapper        ← hides it after 1.5s
  └── queries .nav-link              ← adds/removes .active class
  └── queries section[id]            ← adds/removes .section-active class
  └── queries #hamburgerBtn          ← toggles body.sidebar-open
```

---

## Issue 1 — CSS Filename Mismatch

`index.html` line 13 references:
```html
<link rel="stylesheet" href="/css/style.css" />
```

Current file is named `stylesheet.css`. Rename it to `style.css`.

**Fix:** Rename `css/stylesheet.css` → `css/style.css`

---

## Issue 2 — CSS Incomplete

`css/style.css` currently only has tokens and reset.
All sections below are missing and must be added in this order:

### Section 1 — Tokens + Reset (already present)
```css
:root {
    --bg:         #FAFAF8;
    --surface:    #F0EFEB;
    --text:       #1A1A1A;
    --text-muted: #888888;
    --border:     #E8E8E3;
    --link:       #4A7FA5;
    --link-hover: #1A1A1A;
    --max-width:  680px;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

body {
    font-family: 'STIX Two Text', Georgia, 'Times New Roman', serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.7;
    overflow-x: hidden;
}

h1, h2, h3, h4, h5, h6 { font-weight: 700; line-height: 1.25; color: var(--text); }

a { text-decoration: none; color: var(--link); transition: color 0.15s ease; }
a:hover { color: var(--link-hover); }

::selection { background: #C8DAEA; color: var(--text); }
```

### Section 2 — Loader (add after reset)
Controls the full-screen spinner shown on page load.
JS fades it out after 1.5s by setting `opacity: 0` then `display: none`.
```css
.loader-wrapper {
    position: fixed;
    top: 0; left: 0;
    width: 100%; height: 100%;
    background: var(--bg);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    transition: opacity 0.5s ease;
}

.loader {
    position: relative;
    width: 120px;
    height: 120px;
}

.loader-text {
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.2rem;
    font-weight: 700;
    font-family: 'STIX Two Text', Georgia, serif;
    color: var(--text);
    z-index: 2;
}

.loader-circle {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: var(--text);
    animation: spin 1.5s linear infinite;
}

.loader-circle:nth-child(2) { border-top-color: var(--text-muted); animation-duration: 2s; }
.loader-circle:nth-child(3) { border-top-color: var(--border); animation-duration: 2.5s; }

@keyframes spin {
    0%   { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
```

### Section 3 — Layout (add after loader)
Two-column grid: 150px sidebar on the left, content on the right.
Sections are hidden by default; JS adds `.section-active` to show one at a time.
```css
.page-layout {
    display: grid;
    grid-template-columns: 150px 1fr;
    max-width: 1100px;
    margin: 0 auto;
    padding: 4rem 3rem;
    min-height: 100vh;
}

.sidebar {
    position: sticky;
    top: 4rem;
    height: fit-content;
    padding-right: 2rem;
}

.main-content {
    border-left: 1px solid var(--border);
    padding-left: 4rem;
    max-width: 680px;
}

section { display: none; padding-top: 0; }
section.section-active { display: block; }

.hamburger {
    display: none;
    position: fixed;
    top: 1rem; left: 1rem;
    z-index: 1000;
    background: var(--bg);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 0.45rem 0.7rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1.1rem;
    line-height: 1;
    transition: background 0.15s ease;
}

.hamburger:hover { background: var(--surface); }
```

### Section 4 — Sidebar Nav (add after layout)
Right-aligned italic links. JS adds `.active` to the current link (bold italic).
```css
.sidebar-inner { display: flex; flex-direction: column; }

.sidebar-nav ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    text-align: right;
}

.nav-link {
    font-size: 0.88rem;
    color: var(--text-muted);
    font-weight: 400;
    font-style: italic;
    transition: color 0.15s ease;
    display: block;
    padding: 0.1rem 0;
}

.nav-link:hover { color: var(--text); }

.nav-link.active {
    color: var(--text);
    font-weight: 700;
    font-style: italic;
}
```

### Section 5 — About (add after sidebar nav)
Profile photo floated right; bio text wraps around it.
```css
.about-content { overflow: hidden; }

.profile-image {
    float: right;
    width: 140px; height: 140px;
    border-radius: 50%;
    object-fit: cover;
    margin-left: 2.5rem;
    margin-bottom: 1rem;
    background: var(--surface);
    filter: grayscale(10%);
    border: 1px solid var(--border);
}

.intro-name { font-size: 1.1rem; font-weight: 700; margin-bottom: 1rem; color: var(--text); }
.about-content p { font-size: 0.95rem; line-height: 1.7; margin-bottom: 0.85rem; }
.about-content p:last-child { margin-bottom: 0; }
```

### Section 6 — Experience (add after about)
```css
.section-heading { font-size: 1.1rem; font-weight: 700; margin-bottom: 1.25rem; }

.experience-list { display: flex; flex-direction: column; gap: 1.5rem; }

.exp-role-line { font-size: 0.95rem; margin-bottom: 0.2rem; }

.exp-company { font-size: 0.9rem; font-style: italic; margin-bottom: 0.5rem; }

.exp-desc { font-size: 0.875rem; color: #444444; line-height: 1.7; }

.exp-bullets {
    list-style: disc;
    padding-left: 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}
```

### Section 7 — Projects (add after experience)
```css
.projects-intro { font-size: 0.95rem; line-height: 1.7; margin-bottom: 1.25rem; }

.inline-link { color: var(--link); text-decoration: underline; text-underline-offset: 2px; }
.inline-link:hover { color: var(--link-hover); }

.project-list {
    list-style: disc;
    padding-left: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
}

.project-link { font-size: 0.9rem; color: var(--link); transition: color 0.15s ease; }
.project-link:hover { color: var(--link-hover); text-decoration: underline; text-underline-offset: 2px; }
```

### Section 8 — Connect (add after projects)
```css
.connect-intro { font-size: 0.95rem; line-height: 1.75; margin-bottom: 2rem; max-width: 50ch; }

.contact-list {
    display: grid;
    grid-template-columns: 5.5rem 1fr;
    gap: 0.6rem 1rem;
    align-items: baseline;
}

.contact-list dt { font-size: 0.85rem; color: var(--text-muted); font-weight: 500; }
.contact-list dd { font-size: 0.9rem; margin: 0; }
```

### Section 9 — Social Links (add after connect)
```css
.social-links { display: flex; gap: 1.5rem; margin-top: 1.75rem; }

.social-link {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 0.88rem;
    color: var(--text-muted);
    transition: color 0.15s ease;
}

.social-link svg { width: 15px; height: 15px; fill: currentColor; flex-shrink: 0; }
.social-link:hover { color: var(--text); }
```

### Section 10 — Mobile Responsive (add last)
Below 768px: single column, hamburger visible, sidebar slides in from left.
```css
@media (max-width: 768px) {
    .hamburger { display: block; }

    .page-layout {
        grid-template-columns: 1fr;
        padding: 1.5rem 1.25rem;
        padding-top: 4rem;
    }

    .sidebar {
        position: fixed;
        left: -260px;
        top: 0;
        width: 240px;
        height: 100vh;
        background: var(--bg);
        border-right: 1px solid var(--border);
        z-index: 999;
        padding: 2rem 1.5rem;
        transition: left 0.25s ease;
        overflow-y: auto;
    }

    body.sidebar-open .sidebar { left: 0; }

    body.sidebar-open::after {
        content: '';
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.2);
        z-index: 998;
    }

    .main-content { border-left: none; padding-left: 0; max-width: 100%; }

    .profile-image { float: none; display: block; margin: 0 auto 1.5rem auto; }
}
```

---

## Issue 3 — JS Incomplete

`js/script.js` currently only has the loader lifecycle.
Two more blocks must be added:

### Block 1 — Loader (already present)
```js
window.addEventListener('load', () => {
    const loaderWrapper = document.querySelector('.loader-wrapper');
    if (!loaderWrapper) return;

    setTimeout(() => {
        loaderWrapper.style.opacity = '0';
        setTimeout(() => {
            loaderWrapper.style.display = 'none';
        }, 500);
    }, 1500);
});
```

### Block 2 — Section Navigation (add after loader)
Reads `data-section` from each nav link.
On click: hides all sections, removes all `.active`, then shows the target section and marks the clicked link active.
```js
const navLinks = document.querySelectorAll('.nav-link');
const allSections = document.querySelectorAll('section[id]');

function showSection(sectionId) {
    allSections.forEach(s => s.classList.remove('section-active'));
    navLinks.forEach(l => l.classList.remove('active'));

    const target = document.getElementById(sectionId);
    if (target) target.classList.add('section-active');

    const activeLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
    if (activeLink) activeLink.classList.add('active');
}

showSection('about');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        showSection(link.dataset.section);
        document.body.classList.remove('sidebar-open');
    });
});
```

### Block 3 — Mobile Hamburger (add after section nav)
Toggles `body.sidebar-open`; CSS uses that class to slide the sidebar in.
```js
const hamburgerBtn = document.getElementById('hamburgerBtn');
if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
        document.body.classList.toggle('sidebar-open');
    });
}
```

---

## Commit Sequence

| # | Commit message | File | Action |
|---|---|---|---|
| 1 | `feat: add portfolio index page` ✅ | `index.html` | Done |
| 2 | `fix: rename stylesheet to match HTML link` | `css/stylesheet.css → css/style.css` | Rename |
| 3 | `feat: complete stylesheet with all layout and component styles` | `css/style.css` | Add sections 2–10 |
| 4 | `feat: complete script with section navigation and hamburger` | `js/script.js` | Add blocks 2–3 |
| 5 | `feat: add profile photo` | `images/profile.jpg` | Add manually |
| 6 | `fix: correct any visual issues after local review` | any file | Only if needed |

---

## Local Test (before deploy)

Run a local server — do NOT open index.html directly, paths are absolute:

```powershell
cd C:\D_Drive\ShivamV\Shivam\Portfolio
python -m http.server 8080
```

Open `http://localhost:8080` and verify:
- [ ] Loader (S.V. spinning rings) fades out after ~1.5s
- [ ] About section shows by default
- [ ] All 4 nav links switch sections correctly
- [ ] Active nav link is bold italic
- [ ] Profile image shows (or hides cleanly if not added)
- [ ] Resize to < 768px: hamburger appears, sidebar slides in/out
- [ ] Email, GitHub, LinkedIn links are correct

---

## Deploy to Vercel

1. `git push origin main`
2. Vercel → Add New Project → Import repo
3. Framework: **Other** | Build command: *(blank)* | Output directory: *(blank)*
4. Click Deploy → live in ~30s
