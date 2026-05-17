# MedPobeda Group Platform

MedPobeda Group now runs as a healthcare collaboration website with a production-ready backend foundation for:

- Medical tourism
- Hospital partnerships
- International patient coordination
- Cross-border healthcare collaboration
- Student mobility enquiries

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Recharts
- Prisma ORM
- PostgreSQL
- Zod validation
- Server Actions
- Nodemailer / Resend

## Public Routes

- `/`
- `/about`
- `/blog`
- `/blog/[slug]`
- `/medical-tourism`
- `/hospital-partnerships`
- `/international-patient-services`
- `/student-mobility`
- `/contact`

## Admin Routes

- `/admin`
- `/admin/login`
- `/admin/leads`
- `/admin/medical-tourism`
- `/admin/partnerships`
- `/admin/student-mobility`
- `/admin/hospitals`
- `/admin/blog`
- `/admin/settings`

## API Routes

- `/api/health`
- `/api/blog`
- `/api/uploads`
- `/api/files/[id]`
- `/api/admin/analytics`
- `/api/admin/export`

## Core Backend Features

- Lead capture and CRM routing for contact, partnership, medical tourism, and student mobility enquiries
- Secure admin authentication with signed cookie sessions, role-based access, protected routes, and session expiry
- Analytics dashboard with Recharts visualisations, conversion metrics, country breakdowns, and activity timeline
- Unified lead CRM with status, priority, assignment, pagination, notes, and CSV export
- Hospital partnership CRM with status updates, agreement tracking, notes, documents, contacts, and meeting history
- Advanced medical tourism intake with secure document upload support and hospital assignment workflows
- Student mobility CRM workspace with dedicated pipeline handling
- Hospital registry with partner profiles and international desk contact management
- Admin settings console with user provisioning and audit log review
- Email acknowledgements and admin notifications
- Telegram notification hook for direct routing
- Dynamic blog architecture with SEO fields and cover image uploads
- Private file serving for medical documents and public access for blog media
- Rate limiting, request-origin CSRF protection, audit logging, honeypot spam protection, and server-side validation
- Dynamic metadata, OpenGraph, Twitter cards, Organization schema, sitemap, and robots support

## Project Structure

```text
app/
  admin/
  api/
  blog/
  about/
  contact/
  hospital-partnerships/
  international-patient-services/
  medical-tourism/
  student-mobility/
components/
  admin/
  blog/
  forms/
  layout/
  shared/
  ui/
lib/
  actions/
  auth/
  data/
  email/
  security/
  validators/
prisma/
storage/uploads/private/
types/
```

## Environment Variables

Copy `.env.example` and configure at minimum:

- `DATABASE_URL`
- `AUTH_SECRET`
- `ADMIN_BOOTSTRAP_NAME`
- `ADMIN_BOOTSTRAP_EMAIL`
- `ADMIN_BOOTSTRAP_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `UPLOAD_ROOT`

Optional integrations:

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `SMTP_HOST`
- `SMTP_PORT`
- `SMTP_USER`
- `SMTP_PASSWORD`
- `SMTP_FROM_EMAIL`
- `TELEGRAM_BOT_TOKEN`
- `TELEGRAM_CHAT_ID`
- `NEXT_PUBLIC_WHATSAPP_URL`
- `NEXT_PUBLIC_TELEGRAM_URL`
- `NEXT_PUBLIC_CONTACT_PHONE`

## Local Setup

```bash
npm install
npm run prisma:generate
npm run prisma:push
npm run db:seed
npm run dev
```

`db:seed` creates the bootstrap admin user from the admin environment variables.

## Production Build

```bash
npm run build
npm run start
```

## Deployment Notes

- Set a real PostgreSQL `DATABASE_URL` before using admin, blog persistence, or CRM capture in production.
- Set a long random `AUTH_SECRET`.
- Store uploads on persistent disk or replace `lib/uploads.ts` with cloud object storage for multi-instance deployments.
- The current in-memory rate limiter is suitable for a single-instance deployment baseline. Replace it with Redis or another shared store for horizontally scaled environments.
- `/api/files/[id]` keeps medical documents private and only exposes blog cover images publicly.
# medpobedagroup git init git add README.md git commit -m first commit git branch -M main git remote add origin https://github.com/medpobedauz-glitch/medpobedagroup.git git push -u origin main
