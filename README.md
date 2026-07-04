Vitto Loan Application Portal
A production-quality full-stack loan application portal for Vitto, built with React, Vite, TailwindCSS, Node.js, Express, and PostgreSQL. The app supports borrower intake, operations dashboarding, application review, analytics, CSV export, dark mode, and an auditable pending-to-decision status workflow.

Features
Borrower application form with client-side and server-side validation
UUID application reference numbers
Responsive operations dashboard
Status filtering, debounced search by applicant or mobile, and pagination
Application details modal with copyable reference ID
Pending-to-approved and pending-to-rejected workflow with confirmation modal
Summary analytics cards for total applications, loan value, and status counts
Recharts pie and bar charts
Language color badges and status badges
Skeleton loaders, empty states, toast notifications, and error boundary
CSV export for the current dashboard result set
Dark mode toggle persisted in local storage
Clean backend layers: routes, controllers, services, validators, middleware, db, utils
PostgreSQL migration with UUIDs, constraints, and useful indexes
