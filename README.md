# MyHomePageLyrinth
MyHomePageLyrinth is a monorepo web project focused on a homepage and static content with SEO-oriented routing.
<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React 19">
  <img src="https://img.shields.io/badge/Node.js-22-339933?logo=node.js&logoColor=white" alt="Node 22">
  <img src="https://img.shields.io/badge/Express-5.0-000000?logo=express&logoColor=white" alt="Express 5">
  <img src="https://img.shields.io/badge/TypeScript-Ready-3178C6?logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Deployed%20on-Fly.io-24185b?logo=fly.io&logoColor=white" alt="Fly.io">
</p>

### Live Demo
* **Main Portal:** [LYRINTH](https://lyrinth.com)


Current setup:
- `apps/web`: React + Vite + TypeScript frontend (main focus)
- `apps/api`: Express server used primarily for health checks and serving built frontend assets

## Highlights

- Multi-domain/subdomain route mapping in the frontend router (for example `smp.lyrinth.com` and `minigames.lyrinth.com`)
- SEO metadata control per route/page
- Single-server production-like mode: Express serves `apps/web/dist` after build

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite, React Router
- **Backend shell:** Node.js, Express 5
- **Tooling:** npm workspaces, ESLint, Docker

## Monorepo Structure

```text
MyHomePageLyrinth/
  apps/
    web/                    # React + Vite app
    api/                    # Express server (minimal API + static hosting)
  Dockerfile
  fly.toml
  package.json              # Workspace scripts
```

## Current API Surface

Active endpoint:
- `GET /api/health`

## Getting Started

### 1) Requirements

- Node.js 22+
- npm 10+

### 2) Install dependencies

```powershell
npm install
```

### 3) Run in development

Use two terminals:

Terminal 1 (API server):

```powershell
npm run dev:api
```

Terminal 2 (Web app):

```powershell
npm run dev:web
```

Default URLs:
- API: `http://localhost:8080`
- Web: `http://localhost:5173`

### 4) Run production-like locally

```powershell
npm run build:web
npm run dev:api
```

Then open `http://localhost:8080`.

## Workspace Scripts

- `npm run dev` - Run web app (`dev:web`)
- `npm run dev:web` - Start Vite dev server
- `npm run dev:api` - Start Express server
- `npm run build` - Build web app (`build:web`)
- `npm run build:web` - Build frontend into `apps/web/dist`
- `npm run lint` - Lint frontend
- `npm run test:api` - Run API smoke test script in `apps/api`

## Docker

Build and run image:

```powershell
docker build -t my-homepage-lyrinth .
docker run --rm -p 8080:8080 my-homepage-lyrinth
```

## Deployment

- `fly.toml` is configured for Fly.io deployment.
- Health check endpoint: `/api/health`.

## Future Improvements

- Add OG image generation for multiple page types.
- Improve SEO strategy for domain/subdomain migration.
- Integrate SSR (for example Next.js) if stronger SEO/TTFB is needed later.


