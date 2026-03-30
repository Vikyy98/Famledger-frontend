## FamLedger Frontend

Next.js frontend for FamLedger. It includes authentication, protected routes, dashboard modules, and income management UI.

## Getting Started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Requirements

- Node.js `>=20 <21`
- Backend API running locally (CORS already configured for `http://localhost:3000`)

## Scripts

- `npm run dev` - start local dev server
- `npm run build` - production build
- `npm run start` - run production build
- `npm run lint` - run eslint

## App Structure (high level)

- `app/(protected)` - authenticated pages
- `app/components` - reusable UI and feature components
- `app/services/api` - RTK Query API clients
- `app/services/slices` - Redux slices
- `app/types` - TypeScript contracts

## Income Module Notes

- Add Income modal supports:
  - income type (`One Time` / `Recurring`)
  - recurring frequency (`Monthly`, `Quarterly`, `Yearly`) when recurring is selected
  - date validation (no future date)
- Income table now shows:
  - member label
  - readable income type
  - frequency in same column (below type)
  - INR currency format
  - Indian date format
- Sorting is handled by backend response order (latest updated first).

## API Integration

- Base API integration uses RTK Query in `app/services/api`.
- Income endpoints currently used:
  - `GET /api/families/{familyId}/incomes`
  - `POST /api/income`
