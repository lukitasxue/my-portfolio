# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — serve the built `dist/` locally

There is no lint script and no test runner configured.

## Stack

Vue 3 (SFC `<script setup>`) + Vite 6 + Vue Router 4 + Tailwind CSS 3. Animation/interaction libs: `@vueuse/motion` (registered globally in `main.js`) and `aos`.

## Architecture

### Routing and the `App.vue` dual role

`src/router/index.js` defines three routes: `/`, `/projects`, `/projects/:id`. The `/` route is mapped to `App.vue` itself (`import Home from '../App.vue'`), and `App.vue` *also* serves as the app shell that hosts `<router-view>`. The result is that `App.vue` renders the homepage sections (`Hero`, `SkillOverview`, `Projects`, `Contact`) inline via `v-if="route.path === '/'"`, and falls through to `<router-view>` for every other path. When adding new top-level pages, prefer adding routes + view components under `src/views/` rather than extending the inline homepage block.

`public/_redirects` (`/*  /index.html  200`) is the Netlify SPA fallback — keep it in sync if you change history mode or hosting.

### Projects + Blog content model

Project data is split across two files that must stay aligned by `id`:

- `src/data/projects.js` — the project cards (id, title, image, description, `showcase` flag). The homepage `Projects.vue` filters by `showcase: true`; `ProjectsPage.vue` shows all.
- `src/data/projectBlogs.js` — maps each project `id` to a Vue component that renders its detail page.

`views/ProjectDetail.vue` is route-driven (`/projects/:id`): it looks up the matching blog entry and renders `<component :is="blogEntry.component" />`. The blog components themselves (`BlogPostMoodPredictor`, `BlogPostLinearRegression`, `BlogPostParkLenseDDSC`, `BlogPostSkedy`) are also registered as **global components** in `src/main.js` — when adding a new blog post you need to update three places: `main.js` (global registration), `data/projectBlogs.js` (id → component map), and `data/projects.js` (card metadata).

Project card thumbnails live in `public/` and are referenced from `projects.js` as `/foo.png`. Blog-internal images have two valid conventions:

- **Few images per post (3–4):** drop in `src/assets/` and ES-import in `<script setup>` (Mood Predictor, Linear Regression).
- **Many images per post (5+) or you want to drop assets without touching code:** drop in `public/blog/<slug>/` and reference via dynamic binding (`:src="..."` with a string), the way `Projects.vue` does for `public/` thumbnails. **Do not** use static `src="/blog/..."` — Vue's SFC compiler tries to resolve absolute `src` attributes as module imports at build time and Rollup will fail. The Skedy post (`BlogPostSkedy.vue`) defines an `images = { … }` map in `<script setup>` and binds `:src="images.cover"` etc., which works because Vite leaves dynamic expressions alone.

### Styling

Tailwind config has `darkMode: 'class'` with custom `base`/`text` color tokens, but `index.html` hardcodes `<body class="dark">` — the site is dark-mode-only in practice. Theme colors are also exposed as CSS variables (`--bg-color`, `--text-color`, `--card-color`, `--border-color`) in `src/assets/main.css`, switched by the `.dark` selector. Components mix Tailwind utilities with `var(--…)` references, so changes to theme tokens should be made in both `tailwind.config.js` and `main.css` to stay consistent.
