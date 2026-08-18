// In-browser mock of the API contract (localStorage + seed data). Used when
// VITE_API_URL is not set, so the app runs without a backend. Returns the same
// shapes as the real http implementation.
import { loadJSON, saveJSON } from '../store';
import { getStoredSession, USE_HTTP } from './client';
import {
  GYM_CAPACITY, OTHERS_PRESENT, gymClasses, trainers, exerciseLibrary,
  seedAnnouncements, seedTickets, seedAccounts, seedBookingRequests, sampleRoutine,
} from '../data';

const me = () => getStoredSession()?.user || null;
const email = () => (me()?.email || 'guest').toLowerCase();
const uk = (name) => `${email()}:${name}`;
const today = () => new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
const uid = (p) => `${p}-${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;
const stripPw = ({ password, ...rest }) => rest;

function seed() {
  if (loadJSON('seeded_v2', false)) return;
  const accounts = {};
  seedAccounts.forEach((a) => {
    const key = a.email.toLowerCase();
    accounts[key] = { id: key, name: a.name, email: a.email, role: a.role, studentId: a.studentId, department: a.dept, goal: null, verified: a.verified, password: a.password };
  });
  saveJSON('accounts', accounts);
  saveJSON('tickets', seedTickets);
  saveJSON('announcements', seedAnnouncements);
  saveJSON('bookingRequests', seedBookingRequests);
  saveJSON('seeded_v2', true);
}
if (!USE_HTTP) seed();

// ---- Auth ----
export async function register({ fullName, studentId, email: mail, password, role }) {
  seed();
  const accounts = loadJSON('accounts', {});
  const key = mail.toLowerCase();
  if (accounts[key]) throw new Error('An account with this email already exists.');
  const user = { id: key, name: fullName, email: mail, role: role === 'trainer' ? 'trainer' : 'student', studentId, department: null, goal: null, verified: false };
  accounts[key] = { ...user, password };
  saveJSON('accounts', accounts);
  return { token: `mock.${key}`, user };
}
export async function login({ email: mail, password }) {
  seed();
  const acc = loadJSON('accounts', {})[mail.toLowerCase()];
  if (!acc || (acc.password && acc.password !== password)) throw new Error('Invalid email or password.');
  return { token: `mock.${acc.id}`, user: stripPw(acc) };
}
export async function getMe() {
  const u = me();
  if (!u) throw new Error('Not signed in.');
  return u;
}
export async function updateMe({ fullName, studentId, department, goal }) {
  const accounts = loadJSON('accounts', {});
  const key = email();
  const cur = accounts[key] || { id: key, ...me() };
  const updated = { ...cur, name: fullName ?? cur.name, studentId: studentId ?? cur.studentId, department: department ?? cur.department, goal: goal ?? cur.goal };
  accounts[key] = updated;
  saveJSON('accounts', accounts);
  return stripPw(updated);
}

// ---- Occupancy ----
function occ() {
  const present = loadJSON('presence', []);
  const count = Math.min(GYM_CAPACITY, OTHERS_PRESENT + present.length);
  return { count, capacity: GYM_CAPACITY, full: count >= GYM_CAPACITY, checkedIn: present.includes(email()), percent: Math.round((count / GYM_CAPACITY) * 100) };
}
export async function getOccupancy() { return occ(); }
export async function checkIn() {
  let present = loadJSON('presence', []);
  if (!present.includes(email()) && OTHERS_PRESENT + present.length < GYM_CAPACITY) {
    present = [...present, email()];
    saveJSON('presence', present);
  }
  return occ();
}
export async function checkOut() {
  saveJSON('presence', loadJSON('presence', []).filter((e) => e !== email()));
  return occ();
}

// ---- Exercises / plan ----
export async function getExercises() { return exerciseLibrary.map((e, i) => ({ id: i + 1, ...e })); }
export async function getPlan() { return loadJSON(uk('plan'), []); }
export async function setPlan(names) { const list = [...new Set(names)]; saveJSON(uk('plan'), list); return list; }

// ---- Classes ----
function classDto(c, enrolledIds) {
  const enrolled = enrolledIds.includes(c.id);
  return { id: c.id, slug: c.id, title: c.title, type: c.type, coach: c.coach, day: c.day, time: c.time, spots: c.spots, filled: c.filled + (enrolled ? 1 : 0), color: c.color, enrolled };
}
export async function getClasses() {
  const ids = loadJSON(uk('classes'), []);
  return gymClasses.map((c) => classDto(c, ids));
}
export async function toggleEnroll(id) {
  const cls = gymClasses.find((c) => c.id === id);
  let ids = loadJSON(uk('classes'), []);
  const isIn = ids.includes(id);
  if (!isIn && cls.filled >= cls.spots) throw new Error('This class is full.');
  ids = isIn ? ids.filter((x) => x !== id) : [...ids, id];
  saveJSON(uk('classes'), ids);
  return classDto(cls, ids);
}

// ---- Trainers / bookings ----
export async function getTrainers() { return trainers; }
export async function getMyBookings() { return loadJSON(uk('myBookings'), []); }
export async function getAllBookings() { return loadJSON('bookingRequests', []); }
export async function createBooking({ trainerName, goal, slot }) {
  const u = me();
  const booking = { id: uid('br'), memberName: u?.name || 'A student', department: u?.department || 'CUET', trainerName, goal, slot: slot || 'To be confirmed', status: 'Pending' };
  saveJSON(uk('myBookings'), [booking, ...loadJSON(uk('myBookings'), [])]);
  saveJSON('bookingRequests', [booking, ...loadJSON('bookingRequests', [])]);
  return booking;
}
export async function setBookingStatus(id, status) {
  const upd = (list) => list.map((b) => (b.id === id ? { ...b, status } : b));
  const all = upd(loadJSON('bookingRequests', []));
  saveJSON('bookingRequests', all);
  saveJSON(uk('myBookings'), upd(loadJSON(uk('myBookings'), [])));
  return all.find((b) => b.id === id);
}

// ---- Routines ----
function defaultRoutine() {
  return { id: 1, coach: 'Coach Tanvir Ahmed', items: sampleRoutine.map((r, i) => ({ id: i + 1, name: r.name, target: r.target, done: false })) };
}
export async function getMyRoutine() { return loadJSON(uk('routine'), defaultRoutine()); }
export async function toggleRoutineItem(itemId) {
  const routine = loadJSON(uk('routine'), defaultRoutine());
  routine.items = routine.items.map((i) => (i.id === itemId ? { ...i, done: !i.done } : i));
  saveJSON(uk('routine'), routine);
  return null;
}
export async function assignRoutine({ memberEmail, coach, items }) {
  const routine = { id: Date.now(), coach: coach || 'Coach', items: items.map((it, i) => ({ id: i + 1, name: it.name, target: it.target, done: false })) };
  saveJSON(`${memberEmail.toLowerCase()}:routine`, routine);
  return routine;
}

// ---- Tickets ----
export async function getTickets() { return loadJSON('tickets', seedTickets); }
export async function createTicket({ item, issue }) {
  const ticket = { id: uid('tk'), item, issue, reportedBy: me()?.name || 'A student', status: 'Open', date: today() };
  const next = [ticket, ...loadJSON('tickets', seedTickets)];
  saveJSON('tickets', next);
  return ticket;
}
export async function setTicketStatus(id, status) {
  const next = loadJSON('tickets', seedTickets).map((t) => (t.id === id ? { ...t, status } : t));
  saveJSON('tickets', next);
  return next.find((t) => t.id === id);
}

// ---- Announcements ----
export async function getAnnouncements() { return loadJSON('announcements', seedAnnouncements); }
export async function addAnnouncement({ title, body, type }) {
  const a = { id: uid('a'), title, body, type: type || 'Notice', date: today() };
  saveJSON('announcements', [a, ...loadJSON('announcements', seedAnnouncements)]);
  return a;
}

// ---- Members (admin) ----
export async function getMembers() {
  return Object.values(loadJSON('accounts', {})).map(stripPw);
}
export async function verifyMember(id, verified) {
  const accounts = loadJSON('accounts', {});
  if (accounts[id]) { accounts[id] = { ...accounts[id], verified }; saveJSON('accounts', accounts); }
  return stripPw(accounts[id]);
}
