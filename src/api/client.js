// Low-level HTTP client + session storage, shared by the http/mock backends.
import { loadJSON, saveJSON, removeKey } from '../store';

// When VITE_API_URL is set the app talks to the real backend; otherwise it
// falls back to the in-browser mock so it still runs standalone.
export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');
export const USE_HTTP = Boolean(API_URL);

const SESSION_KEY = 'auth'; // { token, user }
export const getStoredSession = () => loadJSON(SESSION_KEY, null);
export const setStoredSession = (s) => saveJSON(SESSION_KEY, s);
export const clearStoredSession = () => removeKey(SESSION_KEY);
export const getToken = () => getStoredSession()?.token || null;

export async function request(path, { method = 'GET', body } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  const token = getToken();
  if (token) headers.Authorization = `Bearer ${token}`;

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch {
    throw new Error('Cannot reach the server. Is the backend running?');
  }

  if (res.status === 204) return null;
  const text = await res.text();
  const data = text ? JSON.parse(text) : null;
  if (!res.ok) throw new Error(data?.message || `Request failed (${res.status}).`);
  return data;
}
