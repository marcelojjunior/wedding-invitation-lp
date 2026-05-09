# wedding-invitation-lp

Single-page wedding invitation and event microsite: passport-style intro, travel-themed hero, ceremony details, dress code, QR shortcuts, and footer — with copy driven from structured JSON.

The build prioritizes a calm, editorial feel with smooth scrolling, motion that respects reduced preferences, and lazy-loaded sections for a lighter first paint.

## Overview

This landing page includes:

- animated passport intro (3D-style cover, optional once-per-session) with Lenis scroll lock while open
- hero with gradient backdrop, flight map, GSAP plane path, couple line, and primary CTA
- story and event blocks sourced from data
- QR code strip and dress code guidance
- footer with practical links
- site content in `pt-BR`, centralized in `wedding-content.json`
- Lenis-powered smooth scroll with GSAP ScrollTrigger refresh hooks

## Tech Stack

### Core

- `React 19`
- `JavaScript` (`JSX`)
- `Vite`

### UI and motion

- `Tailwind CSS v4` (`@tailwindcss/vite`)
- `Framer Motion`
- `GSAP` + `ScrollTrigger`
- `Lenis`
- `Lucide React` (icons)
- `react-wrap-balancer` (headline balance)

### Content and utilities

- `clsx` + `tailwind-merge` (`cn()` helper)
- `react-intersection-observer`
- `react-qr-code`

## Project Structure

```text
src/
  animations/      Shared animation helpers
  components/      common (intro, map, particles), layout, ui
  constants/       Section ids and shared constants
  data/            wedding-content.json (copy and config)
  hooks/           Content, scroll, reduced motion
  providers/       Lenis smooth scroll + navigation context
  sections/        hero, story, event, qr-codes, dress-code, footer
  utils/           Class name helpers
  App.jsx          Shell, intro gate, lazy sections
  main.jsx
  index.css        Theme tokens and global styles
public/
  Static assets (map SVG, logos, favicon, OG image)
```

## Getting Started

### Requirements

- `Node.js` 18 or higher
- `npm` (lockfile: `package-lock.json`)

### Install dependencies

```bash
npm install
```

### Start development server

```bash
npm run dev
```

The app will run at `http://localhost:5173`.

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

### Run lint

```bash
npm run lint
```

## Available Scripts

| Command         | Description                         |
| --------------- | ----------------------------------- |
| `npm run dev`   | Starts the development server       |
| `npm run build` | Generates the production build      |
| `npm run preview` | Serves the production build locally |
| `npm run lint`  | Runs ESLint                         |

## License

Private project — maintained for personal wedding invitation use.
