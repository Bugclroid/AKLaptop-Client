# AKLaptop Client (React + Vite)

Responsive single‑page application for AKLaptop. Public website (hero, services, testimonials, contact via WhatsApp) plus a protected admin dashboard to manage Jobs, Contacts, and Testimonials. Integrates with the AKLaptop Server API for CRUD, PDF generation/viewing, and email sending.

## Features
- Public site: hero, services, why choose us, testimonials, contact (WhatsApp)
- Admin: login (JWT), dashboard with stats, jobs (CRUD + PDF + email), contacts (CRUD), testimonials (approve/delete)
- Performance: route/lazy loading, mobile‑first, reduced motion handling, optimized images (lazy + async decode)
- Deployment ready: Hostinger (static), configurable `VITE_API_URL`

## Tech Stack
- React (Vite), React Router
- Tailwind CSS
- Axios
- Framer Motion (light use for micro‑interactions)

## Environment
Create `client-final/.env` (never commit) from this template:
```
VITE_API_URL=https://your-api.example.com/api
```

## Development
```bash
cd client-final
npm install
npm run dev
```

## Build (Hostinger)
```bash
cd client-final
npm run build
# Upload the CONTENTS of client-final/dist to your hosting root (e.g., public_html)
```

### SPA Routing (.htaccess)
Add this file to the hosting root:
```
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

## Admin Pages
- Dashboard: stats + jobs table (mobile‑friendly)
- Jobs: create/edit/delete, generate/view PDF, send PDF via email
- Contacts: create/edit/delete
- Testimonials: view all, approve/delete

## Performance Tips
- Convert large images to WebP and right‑size (hero ≤1600px, cards ≤1000px)
- Set proper cache headers on static hosting
- Ensure `VITE_API_URL` points to your production API (Railway)
- Optional dev tool: remove bundle visualizer if added
