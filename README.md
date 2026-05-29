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

## Vercel

- Production URL: `https://medpobeda-group.vercel.app`
- Vercel project: `guptaravishankar55-7364s-projects/medpobeda-group`
- GitHub repository: `https://github.com/medpobedauz-glitch/medpobedagroup`

### Current Status

- Manual Vercel production deployment is working.
- The project is linked locally through `.vercel/project.json`.
- Automatic Git-based deployments are blocked until the Vercel account is granted access to the GitHub repository.

### One-Time Git Auto-Deploy Setup

1. Open the Vercel dashboard for `medpobeda-group`.
2. Go to `Settings -> Git`.
3. Connect GitHub if it is not already connected for this Vercel account/team.
4. Install or update the Vercel GitHub app so it has access to `medpobedauz-glitch/medpobedagroup`.
5. Select the repository `medpobedauz-glitch/medpobedagroup`.
6. Set `main` as the production branch.
7. Confirm the existing project settings and save.

After that, every push to `main` will create a production deployment, and pull requests or non-production branches can create preview deployments.

### Environment Variables

Set these in `Vercel -> Settings -> Environment Variables` before enabling production traffic:

- `DATABASE_URL`
- `AUTH_SECRET`
- `ADMIN_BOOTSTRAP_NAME`
- `ADMIN_BOOTSTRAP_EMAIL`
- `ADMIN_BOOTSTRAP_PASSWORD`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `UPLOAD_ROOT`

Optional:

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

### Build Behavior

- `npm run build` already runs `prisma generate && next build`, which is required for Vercel production builds.
- The Open Graph image route reads the logo from `public/brand/medpobeda-group-mchj-logo.png`, so it no longer depends on an external asset URL during build.

### Manual Deploy Fallback

If the Git integration is not connected yet, production can still be deployed manually with:

```bash
vercel deploy --prod
```
