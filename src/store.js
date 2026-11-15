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
  const daily = new Map(Object.entries(history).map(([date, exercises]) => [date, new Set(exercises)]));
  // Rebuild from saved session checkoffs as a safety net, so chart totals stay
  // aligned with the workout history even if an older activity entry is absent.
  const sessions = loadJSON(userKey(user, 'workout-sessions'), []);
  sessions.forEach((session) => {
    const date = (session.startedAt || '').slice(0, 10);
    if (!date) return;
    const exercises = daily.get(date) || new Set();
    session.items.filter((item) => item.done).forEach((item) => exercises.add(`plan:${session.id}:${item.id}`));
    if (exercises.size) daily.set(date, exercises);
  });
  return [...daily.entries()].map(([date, exercises]) => ({
    date,
    exercises: exercises.size,
    minutes: exercises.size * 12,
    sessions: exercises.size ? 1 : 0,
  }));
}

export function startWorkoutPlan(user, names) {
  const key = userKey(user, 'active-workout');
  const session = {
    id: `${Date.now()}`,
    startedAt: new Date().toISOString(),
    items: names.map((name, index) => ({ id: `${Date.now()}-${index}`, name, done: false })),
  };
  saveJSON(key, session);
  return session;
}

export function getActiveWorkout(user) {
  return loadJSON(userKey(user, 'active-workout'), null);
}

export function completeActiveWorkoutItem(user, itemId, completed) {
  const key = userKey(user, 'active-workout');
  const session = loadJSON(key, null);
  if (!session) return null;
  const next = { ...session, items: session.items.map((item) => item.id === itemId ? { ...item, done: completed } : item) };
  saveJSON(key, next);
  const sessionsKey = userKey(user, 'workout-sessions');
  const sessions = loadJSON(sessionsKey, []);
  saveJSON(sessionsKey, [next, ...sessions.filter((saved) => saved.id !== next.id)]);
  recordWorkoutExercise(user, `plan:${session.id}:${itemId}`, completed);
  return next;
}

export function getWorkoutSessions(user) {
  return loadJSON(userKey(user, 'workout-sessions'), []);
}

export function finishActiveWorkout(user) {
  const key = userKey(user, 'active-workout');
  const session = loadJSON(key, null);
  removeKey(key);
  if (!session) return null;
  const allComplete = session.items.length > 0 && session.items.every((item) => item.done);
  const finished = { ...session, completedAt: new Date().toISOString(), status: allComplete ? 'completed' : 'ended' };
  const sessionsKey = userKey(user, 'workout-sessions');
  const sessions = loadJSON(sessionsKey, []);
  saveJSON(sessionsKey, [finished, ...sessions.filter((saved) => saved.id !== finished.id)]);
  return finished;
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
