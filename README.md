# Henry Au-Yeung — portfolio

Static GitHub Pages site. All copy lives in one file so you can add a job or project without touching the layout.

**Live URL (after you push):** https://sphynx-henryay.github.io/

## Edit content

Open [`data/content.js`](data/content.js). That is the only file you need for day-to-day updates.

### Add a job

Copy a block in `experience` and paste it at the **top** of the array (newest first):

```js
{
  company: "New Co",
  title: "Role title",
  location: "Hong Kong",
  url: "https://example.com",   // optional
  start: "2026-09",
  end: null,                    // null = Present
  summary: "One-line pitch.",
  tags: ["SOAR", "AI"],
  bullets: [
    "What you shipped.",
    "Impact, with a number if you have one.",
  ],
},
```

If one company has two titles (promotion or team change), use `roles` instead of `title` / `bullets`. See the I-TRACING entry.

### Add a project

Copy a block in `projects`:

```js
{
  title: "Project name",
  category: "open",             // "work" or "open"
  featured: true,               // pins it higher
  year: "2026",
  org: "Optional org",
  description: "What it is and why it matters.",
  tags: ["Python", "SOAR"],
  links: {
    github: "https://github.com/Sphynx-HenryAY/repo",
    demo: "https://sphynx-henryay.github.io/repo/",
  },
},
```

Omit `github` or `demo` (or leave `links: {}`) if there is no public URL. The buttons stay hidden.

### Add a skill

Append a string to `skills.Dev`, `skills.Sec`, `skills.Ops`, or `skills.Data`.

## Preview locally

Any static server from the repo root:

```bash
python3 -m http.server 8080
```

Open http://localhost:8080

## Publish on GitHub Pages

This folder is meant to become the user site at `Sphynx-HenryAY.github.io`.

```bash
git init
git add .
git commit -m "Portfolio site"
git branch -M main
git remote add origin https://github.com/Sphynx-HenryAY/Sphynx-HenryAY.github.io.git
git push -u origin main
```

If that repo already has an old site on `master`, either force-push `main` after you are sure, or replace the files on `master` and push.

Then: GitHub → repo → **Settings → Pages** → Source: **Deploy from a branch** → `main` (or `master`) / `/ (root)`.

Pages can take a minute. The site is plain HTML/CSS/JS (see `.nojekyll`); there is no build step.

## Files

| Path | Role |
| --- | --- |
| `data/content.js` | Profile, jobs, projects, skills |
| `index.html` | Page shell |
| `css/style.css` | Layout and theme |
| `js/app.js` | Renders `SITE` into the page |
| `assets/favicon.svg` | Tab icon |
