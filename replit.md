# Aquí un Lugar — Espacio Creativo

A static HTML website for "Aquí un Lugar", a creative space.

## Project Structure

- `public/` — All static site files (HTML, CSS, JS, images)
  - `index.html` — Main homepage
  - `css/styles.css` — Main stylesheet
  - `js/main.js` — Main JavaScript
  - `js/cookies.js` — Cookie consent logic
  - `blog/` — Blog posts
  - `images/` — Site images

## Development

The site is served locally using Python's built-in HTTP server on port 5000.

**Workflow:** `Start application` — runs `python3 -m http.server 5000 --directory public`

## Deployment

Configured as a **Static deployment** pointing to the `public/` directory.
No build step or Node.js is required for deployment.

To deploy: click the "Publish" button in Replit. The `public/` folder is served directly.

## Optional Build Scripts

`package.json` contains optional minification scripts (CSS, JS) using Node.js tools.
These are not required for deployment — the unminified source files in `public/` are served as-is.
