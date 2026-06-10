# FamLedger — Frontend

> A shared finance workspace for families: track income, expenses, and debts/EMIs together, with a dashboard that shows where the household's money actually goes.

![Next.js](https://img.shields.io/badge/Next.js-16-000000)
![React](https://img.shields.io/badge/React-19-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4)
![Status](https://img.shields.io/badge/status-beta-f59e0b)

🔗 **Live app:** https://famledger-frontend.vercel.app
🛠️ **Backend repo:** [FamLedger-backend](https://github.com/Vikyy98/FamLedger-backend)

> ⚠️ **Early beta.** Please don't enter real bank credentials or highly sensitive financial data yet.

---

## Why FamLedger

Most expense trackers are built for one person — but a household's money is shared. FamLedger gives a
whole family one place to track income, expenses, and debts together, instead of five apps that never talk
to each other.

## Features

- **Authentication** — register / log in, JWT stored client-side, protected routes, and global 401 handling (expired sessions auto-redirect to login).
- **Family workspaces** — create a family, invite members, manage roles.
- **Income & Expenses** — one-time and recurring entries, categories, trends, and breakdown charts.
- **Debts & EMIs** — debt summary, distribution, and an upcoming-EMI banner.
- **Dashboard** — monthly overview, recent activity, net-savings trend, and quick actions.
- **Polished UX** — skeleton loaders, branded 404 / error boundaries, responsive layout, and a PWA manifest.

## Tech Stack

Next.js 16 (App Router) · React 19 · TypeScript · Redux Toolkit + RTK Query · Tailwind CSS · Recharts · lucide-react

## Getting Started

### Prerequisites
- Node.js `>=20 <21`
- The [FamLedger backend](https://github.com/Vikyy98/FamLedger-backend) running (locally or deployed)

### Environment
Create `.env.local`:

```bash
# Backend API base URL, including the /api suffix
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
# Public site URL — used for Open Graph / link-preview metadata
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> In production, `NEXT_PUBLIC_API_BASE_URL` is **required** — the build fails fast if it's missing rather than silently calling the wrong API.

### Run

```bash
npm install
npm run dev
```

Open http://localhost:3000.

### Scripts
- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build
- `npm run lint` — run ESLint

## Project Structure

```
app/(protected)     Authenticated pages: dashboard, expense, income, debts, members, create-family
app/components      UI primitives + feature components (auth, dashboard, expense, income, debt, layout)
app/services/api    RTK Query API clients (auth, family, income, expense, debts) + baseQuery
app/services/slices Redux slices (auth)
app/types           TypeScript contracts
app/terms, /privacy Legal pages
```

### Notable patterns
- A single wrapped `baseQuery` ([app/services/api/baseAPI.ts](app/services/api/baseAPI.ts)) attaches the bearer token and, on a 401 to an authenticated request, logs the user out and redirects to `/login`.
- Currency is rendered in INR (`en-IN`); dates in Indian format.

## Deployment

Deployed on **Vercel**. Set `NEXT_PUBLIC_API_BASE_URL` and `NEXT_PUBLIC_SITE_URL` in the Vercel project's
environment variables, and ensure the backend's CORS `AllowedOrigins` includes this app's URL.

## Roadmap

Budgets · AI-assisted categorization · automatic expense capture from SMS · net-worth/assets · data export.

---

Built by [@Vikyy98](https://github.com/Vikyy98) as a learning + real-product project.
