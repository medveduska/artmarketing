# Copilot Instructions

## Build, test, and lint commands

- There is no package manifest or repo-defined build, test, or lint command in this repository. Treat it as a static site.
- Single-test command: not applicable; no automated test runner is configured.
- Deployment is handled by GitHub Pages in `.github/workflows/deploy.yml`, which uploads the repository root (`path: "."`) directly.

## High-level architecture

- `index.html` is the main entrypoint and contains the full landing-page experience: hero, about, services, portfolio, blog teaser, contact form, footer, lightbox, and video modal.
- `blog.html` is a separate blog listing page and `blog-post.html` is a standalone article template. Both reuse the shared CSS stack from `css/` and only load the navigation and reveal-animation scripts.
- Shared styling is layered in this order across pages: `css/reset.css` -> `css/variables.css` -> `css/animations.css` -> `css/main.css` -> `css/responsive.css`. Keep design tokens in `variables.css`, animation utilities in `animations.css`, and shared component/layout rules in `main.css`. The blog pages keep their page-specific layout rules in inline `<style>` blocks instead of moving them into the shared stylesheets.
- If a change alters page structure, shared component responsibilities, or how the JS/CSS modules interact, update this file in the same change so the architecture notes stay accurate for future Copilot sessions.
- JavaScript is split by concern and attached through DOM conventions instead of a build step:
  - `js/nav.js` expects `#navbar`, `#hamburger`, and `#nav-menu`.
  - `js/parallax.js` acts on `[data-parallax]` and is only loaded on `index.html`.
  - `js/scroll-animations.js` reveals elements marked with `.reveal` and auto-prepares children of `.reveal-stagger`.
  - `js/gallery.js` powers the portfolio filters plus the photo lightbox.
  - `js/video-modal.js` opens YouTube embeds from `data-video-id`, `data-video-title`, and `data-video-desc`.
  - `js/contact-form.js` provides client-side validation and a simulated success state for the contact form.
- The portfolio section in `index.html` mixes three content types in one grid: photo items open the custom lightbox, video items open the native `<dialog>` modal, and web items are static showcase cards.

## Key conventions

- Preserve the DOM hooks the scripts rely on. The JS files are not defensive abstractions; they assume the current IDs, classes, and nested elements exist.
- Gallery filtering depends on matching `data-filter` button values with `.gallery-item[data-category]`. Photo lightbox support also depends on photo cards carrying `data-category="photo"` and `data-caption`.
- The video modal only works when the page contains `#video-modal` with `.vm-inner`, `.vm-video-wrapper`, `.vm-close`, `.vm-title`, and `.vm-desc`.
- Contact form validation expects each field inside `.form-group`, uses `.has-error` / `.has-success`, and writes errors into `.field-error`. Keep `#form-success` and `#contact-form` intact if the form markup changes.
- Animation timing is driven by CSS classes, not JS configuration: use `.reveal`, optional directional modifiers like `.from-left`, and delay helpers such as `.delay-1` through `.delay-5`.
- Shared styling is token-driven. Reuse the CSS custom properties in `css/variables.css` before introducing one-off colors, spacing, radii, or transition values.
- Follow modern web-development best practices when changing the site: preserve semantic HTML, responsive behavior, accessibility hooks, and progressive enhancement patterns already present in the static markup and vanilla JS.
- Keep the visual direction modern and polished. Reuse the existing depth, motion, and highlight system, and extend parallax effects where they genuinely improve presentation; when adding or changing motion, keep the reduced-motion behavior aligned with the existing `prefers-reduced-motion` handling.
- Placeholder content is still part of the current templates. Many hero, blog, video-thumbnail, web-preview, and article images still use `https://picsum.photos/...`, and the portfolio video cards still use `REPLACE_VIDEO_ID_*`. Check `assets/images/README.md` before replacing those placeholders so the intended asset paths and video mappings stay consistent.
- The site already mixes real local images under `images\` with placeholder URLs in HTML. When swapping assets, update the referenced HTML directly rather than expecting a separate asset pipeline.
