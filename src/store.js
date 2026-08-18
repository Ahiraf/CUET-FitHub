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
