# Vitto Deployment Checklist

## Backend

- Render root directory is `backend`.
- `npm install` succeeds.
- `npm run start` starts `src/server.js`.
- `DATABASE_URL` is set to Neon or Supabase PostgreSQL.
- `FRONTEND_URL` exactly matches the Vercel app URL.
- `NODE_ENV=production`.
- `GET /api/health` returns success.

## Database

- Run `migrations/001_init.sql`.
- Confirm the `applications` table exists.
- Confirm status enum supports `pending`, `approved`, and `rejected`.
- Confirm SSL is enabled by the hosted provider.

## Frontend

- Vercel root directory is `frontend`.
- Build command is `npm run build`.
- Output directory is `dist`.
- `VITE_API_BASE_URL` is set to the Render API URL ending in `/api`.
- Submit flow returns a UUID reference number.
- Dashboard loads real API data.
- Status changes update without page refresh.
- CSV export downloads successfully.
- Mobile, tablet, desktop, and dark mode layouts are checked.
