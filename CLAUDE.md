# CLAUDE.md — CUET FitHub

Guidance for working in this repository.

## What this is

**CUET FitHub** — a Smart Gym Management and Fitness Engagement System for CUET
(Chittagong University of Engineering & Technology) students. It is a
university course project for **Software Development Project (sessional)
[CSE-300]**, supervised by **Md. Atiqul Islam Rizvi** (Assistant Professor,
Dept. of CSE, CUET).

The platform digitizes the CUET campus gym, which is currently run via manual
registers, verbal communication, and informal WhatsApp/Facebook groups. It is
**exclusively for verified CUET students** and **free of cost** (no payments,
no membership plans).

### Core problem it solves
- No way to know if the gym is crowded before going. The gym has a **hard daily
  capacity of 50 students**; the app tracks daily attendance in real time and
  flags the gym as **full / not-full** once attendance crosses 50.
- No visibility into equipment availability.
- No structured way to log workouts, plan next sessions, book trainers, join
  classes, or report broken equipment.

### User roles
- **Students** — the only end-users allowed on the platform. Check occupancy,
  log workouts, plan exercises, join classes.
- **Trainers** — assign routines, run classes, manage 1-on-1 bookings.
- **Admins / gym staff** — verify students, manage equipment inventory &
  maintenance tickets, view attendance/peak-hour analytics, manage full status.

Each role gets its own tailored dashboard.

## Feature scope (from the proposal)

**MVP (essential):**
- Auth via CUET email / student ID, restricted to verified students; role-based
  access for trainers & admins. Free — no payment flow.
- Daily attendance tracking, auto-flag when > 50 students.
- Live full / not-full occupancy status.
- Equipment availability tracking.

**Fitness & engagement:** exercise logging (sets, reps, weights, PRs);
next-workout planning; analytics dashboard (exercise history, weight, BMI,
strength trends via charts); trainer-assigned routines; diet/nutrition tips
(Bangla + English); leaderboards & badges (streaks, PRs, inter-department
challenges).

**Community & operations:** class scheduling (yoga, cardio, self-defense) with
sign-up; 1-on-1 trainer booking; announcements & events; buddy finder;
feedback & maintenance reports with admin ticket tracking.

**Nice-to-have:** live hourly occupancy heatmap; wearable/step sync.

## Tech stack

**Proposal's target stack (backend not yet built):** ASP.NET Core Web API
(.NET 8, C#) + PostgreSQL + Entity Framework Core + ASP.NET Identity/JWT +
React frontend + Chart.js/Recharts; deploy via Docker/Azure/Render.
(Note: the proposal's conclusion inconsistently also mentions "MERN" — the
detailed stack table is the authoritative one: ASP.NET Core + PostgreSQL +
React.)

**What actually exists in this repo today:** frontend only.
- **React 19** + **Vite 8** (ESM) + **react-router-dom v6**. Requires Node >= 20.19.0.
- No backend/database. All data access goes through **`src/api/`** — a mock layer
  over `localStorage` + `src/data.js` seed content. Swap the api implementation
  for HTTP when the backend lands; components never touch storage directly.
- **Auth is frontend-only:** `AuthContext` holds the session (localStorage);
  login reuses a registered account or derives a name from the email. Three
  roles — **student**, **trainer**, **admin** — each get their own dashboard.
- Charts are hand-built with divs/SVG (no chart lib). Styling is one shared CSS
  file, `src/styles/dashboard.css`, imported once by the layout.

## Project structure

```
index.html            Vite entry
src/
  main.jsx            Renders <App/>
  App.jsx             BrowserRouter + AuthProvider + ToastProvider + routes
  data.js             Seed data (exercises, classes, trainers, tickets, …)
  store.js            Low-level localStorage helpers + deriveName
  Icon.jsx            THE shared inline-SVG icon set (import everywhere)
  Navbar.jsx / Sidebar.jsx   Reusable chrome; Sidebar is config-driven
  Login.jsx / Register.jsx / LandingPage.jsx / Auth.css
  index.css
  api/index.js        Data-access layer (occupancy/check-in, plans, tickets, …)
  context/
    AuthContext.jsx   useAuth(): user, login, logout, updateUser
    ToastContext.jsx  useToast(): global showToast + toast element
  styles/dashboard.css  Shared chrome + page styles, scoped under .fithub-app
  dashboards/
    config.jsx        Per-role nav + page registry (by URL slug) + chrome
    DashboardLayout.jsx  Renders Navbar+Sidebar+page for /dashboard/:section
  components/
    ui.jsx            StatCard, QuickAction, HourBars
    Workout.jsx       "My workout" (assigned routine + charts)
    Workoutchart.jsx / Progresschart.jsx  bar charts (reuse .bars)
  pages/
    Overview, Exercises, Classes, TrainersPage, ProgressPage,
    Community, Facilities, Settings, HelpCenter    (student)
    trainer/index.jsx  TrainerOverview, Members, Routines, TrainerClasses, Bookings
    admin/index.jsx    AdminOverview, AdminMembers, Attendance, Equipment, Announcements
```

Routing model: `react-router-dom`. `/` = landing (redirects to the dashboard if
signed in), `/login`, `/register`, and `/dashboard/:section`. One
`DashboardLayout` serves all three roles — it reads `user.role`, pulls that
role's `config` (nav items + page registry keyed by URL slug) from
`dashboards/config.jsx`, and renders the matching page. To add a page: create
the component, then add a `{ label, slug, icon, component }` entry to the role's
`nav` in `config.jsx`. Reuse the shared classes (`.panel`, `.stat-card`,
`.list-row`, `.info-card`, `.btn`, `.tag`, `.content-grid.split-wide`, …); do
**not** hardcode a two-column grid inline (it won't collapse on mobile — use the
`split-wide` modifier class instead).

## Commands

```
npm run dev       # Vite dev server
npm run build     # production build (must pass before committing)
npm run preview   # preview the production build
```

## Conventions

- Styling is inline: the dashboard uses one big inline `<style>` block; the
  teammate-authored `components/` use inline `style={{}}` objects. Match the
  style of the file you are editing.
- Icons are inline SVG `<path>` data keyed by name in per-file `iconPaths` maps.
- Design language: light theme, `#f6f8fc` background, `#182338` ink, `#4968e8`
  blue accent, 12px card radius, `#e8edf5` borders. Clean, responsive,
  mobile-first (members use it on phones at the gym).

## Team & git contributors — IMPORTANT

The proposal lists **4** authors, but the GitHub repo must show **only 3**
contributors. Do not introduce a 4th git author.

| Proposal author        | Student ID | Git contributor? |
|------------------------|------------|------------------|
| Fariha Rayhan Mim      | 2204104    | Yes — commits as **Ahiraf** `<ahiraf@users.noreply.github.com>` (repo owner) |
| Mohymeen Rafio         | 2204130    | Yes — `Mohymeen <mohymeenrafio@gmail.com>` |
| Faqrul Karim Shajin    | 2204101    | Yes — `faqrulkarim101-spec <faqrulkarim101@gmail.com>` |
| Dipta Deb Nath         | 2204103    | No — not a git contributor |

When committing on this repo, **always author as Ahiraf**
(`ahiraf@users.noreply.github.com`) — the same identity as the existing owner
commits. Never commit under any other name/email (including the current machine
login), or it adds an unwanted contributor to the repo.

Repo: https://github.com/Ahiraf/CUET-FitHub
