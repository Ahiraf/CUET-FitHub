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
- **React 19** + **Vite 8** (ESM, `"type": "module"`).
- No backend, no database, no routing library, no chart library — data is
  seeded in `src/data.js` and view switching is done with `useState` in
  `src/main.jsx` and the dashboards. Charts are hand-built with divs/SVG.
- **Session & roles:** `main.jsx` holds the logged-in `user` and routes to the
  **student** or **trainer** dashboard by `user.role`. Session and accounts are
  persisted in `localStorage` (see `src/store.js`); there is no real auth —
  login derives a name from the email or reuses a registered account.
- Requires **Node >= 20.19.0**.

## Project structure

```
index.html            Vite entry
src/
  main.jsx            App root; session state + role-based routing
  store.js            localStorage helpers (session, accounts, per-user state)
  data.js             Seed data (exercises, classes, trainers, progress, etc.)
  Icon.jsx            Shared inline-SVG icon set for the dashboard pages
  dashboardStyles.js  DASHBOARD_CSS — shared chrome + page styles (.fithub-app)
  LandingPage.jsx     Marketing landing page (own inline <style>)
  Login.jsx           Login page + role selector (Auth.css)
  Register.jsx        Registration page + role selector (Auth.css)
  Auth.css            Shared styles for auth pages
  Navbar.jsx          Top bar; shows the real user + Log out (exports initials())
  Sidebar.jsx         Left nav; configurable navItems for student vs trainer
  StudentDashboard.jsx  Student shell + Overview; routes to the student pages
  TrainerDashboard.jsx  Trainer shell + Overview + Members/Routines/Classes/Bookings
  index.css           Global styles
  pages/
    Exercises.jsx     Browse library + build next-workout plan (persisted)
    Classes.jsx       Sign up for group classes (persisted)
    TrainersPage.jsx  Browse trainers + request 1-on-1 (persisted)
    ProgressPage.jsx  Analytics (SVG trend), badges, leaderboard
    Settings.jsx      Editable profile + notification prefs
    HelpCenter.jsx    FAQ + contact
  components/
    Workout.jsx       "My workout" view (embedded into the student dashboard)
    Workoutchart.jsx  Weekly-activity bar chart
    Progresschart.jsx 6-month progress bar chart
```

Routing model: `main.jsx` swaps login/register/landing when signed out and
renders the student or trainer dashboard when signed in. Each dashboard swaps
its content by the active `Sidebar` item (no router library). Both dashboards
share `DASHBOARD_CSS` from `dashboardStyles.js`, so new pages should reuse those
classes (`.panel`, `.stat-card`, `.list-row`, `.info-card`, `.btn`, `.tag`, …).

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
