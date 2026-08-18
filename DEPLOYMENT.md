# CUET FitHub — Deployment Guide

The project has two parts:

| Part | Stack | Location |
|------|-------|----------|
| **Frontend** | React 19 + Vite + react-router | repo root (`src/`) |
| **Backend** | ASP.NET Core 8 Web API + EF Core + PostgreSQL + Identity/JWT | `backend/CuetFitHub.Api` |

The frontend currently ships with a **localStorage mock** (`src/api/`) so it runs
standalone. The real backend exposes the same concepts over HTTP; see
[Connecting the frontend](#5-connecting-the-frontend-to-the-backend) to switch.

---

## 1. Prerequisites

- **Node.js ≥ 20.19** (frontend)
- **.NET SDK 8.0** (backend)
- **PostgreSQL 14+** (or Docker)
- Optional: **Docker + Docker Compose** (easiest path)

---

## 2. Run everything locally with Docker (recommended)

From the repo root:

```bash
docker compose up --build
```

This starts PostgreSQL and the API together. The API applies EF migrations and
seeds demo data on first boot.

- API: <http://localhost:8080>  · Swagger UI: <http://localhost:8080/swagger>
- Then run the frontend separately: `npm install && npm run dev` → <http://localhost:5173>

Stop with `docker compose down` (add `-v` to also wipe the database volume).

---

## 3. Run the backend without Docker

1. Start PostgreSQL and create a database `cuetfithub` (or use Docker just for the DB):
   ```bash
   docker run -d --name fithub-pg -e POSTGRES_PASSWORD=postgres \
     -e POSTGRES_DB=cuetfithub -p 5432:5432 postgres:16-alpine
   ```
2. Point the API at it (override the default connection string if needed):
   ```bash
   cd backend/CuetFitHub.Api
   export ConnectionStrings__Default="Host=localhost;Port=5432;Database=cuetfithub;Username=postgres;Password=postgres"
   dotnet run
   ```
   Migrations + seeding run automatically at startup. Swagger: <http://localhost:5099/swagger>
   (or whatever port is printed).

### EF migrations
```bash
dotnet tool install --global dotnet-ef      # once
dotnet ef migrations add <Name>             # after changing entities
dotnet ef database update                   # apply (also runs automatically on boot)
```

---

## 4. Run the frontend

```bash
npm install
npm run dev        # dev server on http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the production build
```

---

## 5. Connecting the frontend to the backend

The API base URL is read from `VITE_API_URL` (see `.env.example`):

```bash
cp .env.example .env      # then set VITE_API_URL=http://localhost:8080
```

To use the real API instead of the localStorage mock, replace the
implementations in `src/api/index.js` with `fetch` calls to the backend and send
the JWT (from `/api/auth/login`) as an `Authorization: Bearer <token>` header.
The endpoint shapes already line up with the frontend concepts:

| Frontend concern | Endpoint(s) |
|------------------|-------------|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET/PUT /api/auth/me` |
| Occupancy / check-in | `GET /api/occupancy`, `POST /api/occupancy/checkin`, `POST /api/occupancy/checkout` |
| Exercises / plan | `GET /api/exercises`, `GET/PUT /api/plan` |
| Classes | `GET /api/classes`, `POST /api/classes/{id}/enroll` |
| Trainers / bookings | `GET /api/trainers`, `GET /api/bookings[/mine]`, `POST /api/bookings`, `PATCH /api/bookings/{id}/status` |
| Routines | `GET /api/routines/mine`, `POST /api/routines/items/{id}/toggle`, `POST /api/routines/assign` |
| Facilities | `GET/POST /api/tickets`, `PATCH /api/tickets/{id}/status` |
| Community | `GET/POST /api/announcements` |
| Admin | `GET /api/members`, `PATCH /api/members/{id}/verify` |

---

## 6. Cloud deployment

### Backend — Render (Docker) + managed Postgres
1. Create a **PostgreSQL** instance on Render; copy its internal connection string.
2. New **Web Service** → "Build from a Dockerfile", root dir `backend/CuetFitHub.Api`.
3. Environment variables:
   - `ConnectionStrings__Default` = the Render Postgres connection string
     (format: `Host=...;Port=5432;Database=...;Username=...;Password=...;SSL Mode=Require;Trust Server Certificate=true`)
   - `Jwt__Key` = a long random secret (≥ 32 chars)
   - `Jwt__Issuer` = `CuetFitHub`, `Jwt__Audience` = `CuetFitHubClient`
   - `Cors__Origins__0` = your deployed frontend URL
   - `ASPNETCORE_ENVIRONMENT` = `Production`, `EnableSwagger` = `true` (optional)
   The container listens on `8080` (Render maps it automatically).

### Backend — Azure App Service + Azure Database for PostgreSQL
- Create an **Azure Database for PostgreSQL – Flexible Server** and a database.
- Deploy the container (ACR + App Service for Containers) or `dotnet publish` + Zip deploy.
- Set the same env vars under **App Service → Configuration** (use `__` for nesting).

### Frontend — Vercel / Netlify / Render Static
- Build command `npm run build`, publish directory `dist`.
- Set `VITE_API_URL` to the deployed backend URL.
- SPA routing: add a rewrite so all paths serve `index.html`
  (Netlify `_redirects`: `/*  /index.html  200`; Vercel: a catch-all rewrite).

---

## 7. Production checklist
- [ ] `Jwt__Key` set to a strong secret via env (never commit the real key).
- [ ] `Cors__Origins` limited to your real frontend origin(s).
- [ ] Connection string provided via env/secret, with SSL enabled.
- [ ] HTTPS enforced by the platform; `EnableSwagger=false` in prod if desired.
- [ ] Database backups enabled on the managed Postgres.

---

## 8. Demo accounts (seeded)
| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@cuet.ac.bd` | `admin123` |
| Trainer | `tanvir.ahmed@cuet.ac.bd` | `demo123` |
| Student | `arif.siam@cuet.ac.bd` | `demo123` |

New students/trainers can also self-register at `/api/auth/register`.
