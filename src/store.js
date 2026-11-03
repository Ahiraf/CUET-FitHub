// Tiny localStorage helpers so interactive state survives refreshes and the
// app "feels real" without a backend. Keys are namespaced per user email.

const NS = 'fithub';

export function loadJSON(key, fallback) {
  try {
    const raw = window.localStorage.getItem(`${NS}:${key}`);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    window.localStorage.setItem(`${NS}:${key}`, JSON.stringify(value));
  } catch {
    /* storage unavailable — ignore */
  }
}

export function removeKey(key) {
  try {
    window.localStorage.removeItem(`${NS}:${key}`);
  } catch {
    /* ignore */
  }
}

// Per-user scoped key (falls back to "guest" when no email is present).
export function userKey(user, name) {
  const who = (user?.email || 'guest').toLowerCase();
  return `${who}:${name}`;
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Progress is built from exercises checked off in My Workout. Each completed
// exercise represents an estimated 12 active minutes until timed workout logs
// are added to the backend.
export function recordWorkoutExercise(user, exerciseId, completed) {
  const key = userKey(user, 'workout-activity');
  const history = loadJSON(key, {});
  const date = localDateKey();
  const exercises = new Set(history[date] || []);

  if (completed) exercises.add(String(exerciseId));
  else exercises.delete(String(exerciseId));

  if (exercises.size) history[date] = [...exercises];
  else delete history[date];
  saveJSON(key, history);
}

export function getWorkoutActivity(user) {
  const history = loadJSON(userKey(user, 'workout-activity'), {});
  return Object.entries(history).map(([date, exercises]) => ({
    date,
    exercises: exercises.length,
    minutes: exercises.length * 12,
    sessions: exercises.length ? 1 : 0,
  }));
}

// Turn an email local-part into a friendly display name, e.g.
// "arif.siam@cuet.ac.bd" -> "Arif Siam".
export function deriveName(email = '') {
  const local = email.split('@')[0] || 'CUET Student';
  return local
    .replace(/[._-]+/g, ' ')
    .replace(/\d+/g, '')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ') || 'CUET Student';
}
