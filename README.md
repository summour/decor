# Decor

A mobile-first isometric home decorating game prototype built with React, Vite and TypeScript.

The current version focuses on the core decorating loop: place, drag, rotate, remove and locally save default furniture.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

The project uses relative Vite paths (`base: './'`) and a GitHub Actions Pages workflow, so it can be hosted from a repository project site without server-side routing.

After pushing to `main`, enable GitHub Pages in the repository settings and select **GitHub Actions** as the source if it is not already selected.

## Data

Room state is stored locally in the browser under `decor-room-v1`. No backend or account is required.
