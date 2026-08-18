// Chooses the real backend (when VITE_API_URL is set) or the in-browser mock,
// and normalizes user role casing so the UI can rely on lowercase roles.
import * as http from './http';
import * as mock from './mock';
import { USE_HTTP } from './client';

export { getStoredSession, setStoredSession, clearStoredSession, USE_HTTP, API_URL } from './client';
export { deriveName } from '../store';

const impl = USE_HTTP ? http : mock;

const normUser = (u) => (u ? { ...u, role: (u.role || 'student').toLowerCase() } : u);
const normAuth = (r) => (r ? { ...r, user: normUser(r.user) } : r);

const api = {
  ...impl,
  register: (dto) => impl.register(dto).then(normAuth),
  login: (dto) => impl.login(dto).then(normAuth),
  getMe: () => impl.getMe().then(normUser),
  updateMe: (dto) => impl.updateMe(dto).then(normUser),
};

export default api;
