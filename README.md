# Vitto Loan Application Portal

A production-quality full-stack loan application portal for Vitto, built with React, Vite, TailwindCSS, Node.js, Express, and PostgreSQL. The app supports borrower intake, operations dashboarding, application review, analytics, CSV export, dark mode, and an auditable pending-to-decision status workflow.

## Features

- Borrower application form with client-side and server-side validation
- UUID application reference numbers
- Responsive operations dashboard
- Status filtering, debounced search by applicant or mobile, and pagination
- Application details modal with copyable reference ID
- Pending-to-approved and pending-to-rejected workflow with confirmation modal
- Summary analytics cards for total applications, loan value, and status counts
- Recharts pie and bar charts
- Language color badges and status badges
- Skeleton loaders, empty states, toast notifications, and error boundary
- CSV export for the current dashboard result set
- Dark mode toggle persisted in local storage
- Clean backend layers: routes, controllers, services, validators, middleware, db, utils
- PostgreSQL migration with UUIDs, constraints, and useful indexes

## Architecture

```text
backend/
  src/
    controllers/
    db/
    middleware/
    routes/
    services/
    utils/
    validators/
    app.js
    server.js

frontend/
  src/
    components/
    context/
    hooks/
    layouts/
    pages/
    services/
    utils/
    main.jsx
    router.jsx

migrations/
  001_init.sql
```

## Tech Stack

- Frontend: React, Vite, React Router, Axios, TailwindCSS, Recharts, Lucide React, React Hot Toast
- Backend: Node.js, Express.js, PostgreSQL, pg, UUID-ready schema, dotenv, helmet, cors
- Database: PostgreSQL, compatible with Neon and Supabase

## Local Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create environment files:

```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env
```

3. Create a PostgreSQL database and run the migration:

```bash
psql "postgresql://user:password@localhost:5432/vitto" -f migrations/001_init.sql
```

4. Start both apps:

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Environment Variables

Backend:

```env
PORT=5000
NODE_ENV=development
DATABASE_URL=postgresql://user:password@localhost:5432/vitto
FRONTEND_URL=http://localhost:5173
```

Frontend:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

## Database Setup

Run [migrations/001_init.sql](./migrations/001_init.sql). It creates:

- `applications` table
- UUID primary key
- status enum: `pending`, `approved`, `rejected`
- language and amount constraints
- indexes for `created_at`, `status`, `name`, and `mobile`

## API Documentation

### Health Check

`GET /api/health`

### Database Health Check

`GET /api/health/db`

Returns database connectivity status and the timestamp returned by PostgreSQL.

### Create Application

`POST /api/applications`

```json
{
  "applicantName": "Aarav Sharma",
  "mobileNumber": "9876543210",
  "loanAmount": 250000,
  "loanPurpose": "Inventory purchase for retail shop",
  "preferredLanguage": "Hindi"
}
```

Returns a success message and `applicationReferenceNumber`.

### List Applications

`GET /api/applications`

Supported query params:

- `status=pending|approved|rejected`
- `search=aarav`
- `page=1`
- `limit=10`

Examples:

```text
GET /api/applications
GET /api/applications?status=pending
GET /api/applications?status=approved
GET /api/applications?status=rejected
GET /api/applications?search=98765&page=1&limit=10
```

### Update Status

`PATCH /api/applications/:id/status`

```json
{
  "status": "approved"
}
```

Only `pending -> approved` and `pending -> rejected` transitions are allowed.

### Summary

`GET /api/summary`

```json
{
  "totalApplications": 25,
  "totalLoanAmount": 1500000,
  "pendingCount": 12,
  "approvedCount": 9,
  "rejectedCount": 4
}
```

## Screenshots

Capture these after local or production deployment:

- Apply page with successful reference number
- Dashboard with analytics cards and charts
- Application details modal
- Dark mode dashboard
- Mobile responsive layout

## Live URLs

- Frontend: https://vitto-loan-portal-sigma.vercel.app
- Backend: https://vitto-loan-portal-a7de.onrender.com
- API Health: https://vitto-loan-portal-a7de.onrender.com/api/health
- Database Health: https://vitto-loan-portal-a7de.onrender.com/api/health/db
- Database: Neon PostgreSQL configured securely through `DATABASE_URL`

## Deployment

### Frontend on Vercel

1. Set project root to `frontend`.
2. Build command: `npm run build`
3. Output directory: `dist`
4. Add `VITE_API_BASE_URL=https://your-render-api.onrender.com/api`
5. Deploy.

### Backend on Render

1. Create a new Web Service.
2. Set root directory to `backend`.
3. Build command: `npm install`
4. Start command: `npm run start`
5. Add environment variables:
   - `NODE_ENV=production`
   - `DATABASE_URL=your_neon_or_supabase_connection_string`
   - `FRONTEND_URL=https://your-vercel-app.vercel.app`
6. Deploy and verify `GET /api/health`.

### Neon PostgreSQL

1. Create a Neon project.
2. Copy the pooled PostgreSQL connection string.
3. Add it to Render as `DATABASE_URL`.
4. Run `migrations/001_init.sql` in the Neon SQL editor or through `psql`.

## Production Build Checklist

- Environment variables configured for frontend and backend
- Migration executed against production database
- Render health endpoint passes
- Render database health endpoint passes
- Vercel app uses production API URL
- CORS `FRONTEND_URL` matches the deployed frontend URL
- Form submit, dashboard load, status update, CSV export, and dark mode verified

## Manual Testing Checklist

- Submit a valid application and confirm a UUID reference number appears
- Submit invalid form values and confirm field-level validation appears
- Open Dashboard and confirm the new application appears latest first
- Search by applicant name and mobile number
- Filter by pending, approved, and rejected status
- Open application details and copy the application ID
- Approve or reject a pending application from the modal
- Confirm analytics cards and charts update after a status change
- Export the current application list to CSV
- Toggle dark mode and refresh to confirm preference persists
- Test mobile layout for Apply, Dashboard, and Details modal

## Suggested Commit Sequence

```text
feat: setup full-stack vitto project structure
feat: implement express postgres loan application api
feat: build borrower application form
feat: add dashboard analytics filters and pagination
feat: implement status management workflow
feat: add deployment docs and production checklist
```

## Future Improvements

- Authentication and role-based access control
- Audit log table for every status change
- Server-side CSV export for large data sets
- Full-text search with PostgreSQL trigram indexes
- Unit and integration tests with Vitest and Supertest
- CI pipeline for lint, tests, build, and migration checks
