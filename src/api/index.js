// Data-access layer. Today it is a mock backed by localStorage + seed data.
// When the ASP.NET Core + PostgreSQL backend lands, swap these implementations
// for HTTP calls — components never touch storage directly.

import { loadJSON, saveJSON, removeKey, deriveName } from '../store';
import {
  GYM_CAPACITY,
  OTHERS_PRESENT,
  seedAccounts,
  seedTickets,
  seedAnnouncements,
  seedBookingRequests,
  sampleRoutine,
} from '../data';

export { GYM_CAPACITY, deriveName };

function uid(prefix) {
  return `${prefix}-${Date.now().toString(36)}${Math.floor(Math.random() * 1000)}`;
}

// Seed default rows the first time the app runs so admin/trainer views have
// content. Guarded by a flag so we never clobber user changes.
function seedOnce() {
  if (loadJSON('seeded', false)) return;
  const accounts = {};
  seedAccounts.forEach((a) => { accounts[a.email.toLowerCase()] = a; });
  saveJSON('accounts', accounts);
  saveJSON('tickets', seedTickets);
  saveJSON('announcements', seedAnnouncements);
  saveJSON('bookingRequests', seedBookingRequests);
  saveJSON('seeded', true);
}
seedOnce();

/* ----------------------------- Session & auth ---------------------------- */
export const getSession = () => loadJSON('session', null);
export const setSession = (user) => saveJSON('session', user);
export const clearSession = () => removeKey('session');

export function getAccounts() {
  return loadJSON('accounts', {});
}

export function findAccount(email) {
  return getAccounts()[(email || '').trim().toLowerCase()] || null;
}

export function upsertAccount(user) {
  const accounts = getAccounts();
  const key = user.email.toLowerCase();
  accounts[key] = { verified: false, ...accounts[key], ...user };
  saveJSON('accounts', accounts);
  return accounts[key];
}

export function setAccountVerified(email, verified) {
  const accounts = getAccounts();
  const key = email.toLowerCase();
  if (accounts[key]) {
    accounts[key] = { ...accounts[key], verified };
    saveJSON('accounts', accounts);
  }
  return accounts[key];
}

export function listMembers() {
  return Object.values(getAccounts());
}

/* ------------------------------- Occupancy ------------------------------- */
// Live count = students already present (seed) + everyone checked in here.
export function getOccupancy(user) {
  const present = loadJSON('presence', []);
  const email = (user?.email || '').toLowerCase();
  const count = Math.min(GYM_CAPACITY, OTHERS_PRESENT + present.length);
  return {
    count,
    capacity: GYM_CAPACITY,
    full: count >= GYM_CAPACITY,
    checkedIn: present.includes(email),
    percent: Math.round((count / GYM_CAPACITY) * 100),
  };
}

export function toggleCheckIn(user) {
  const email = (user?.email || '').toLowerCase();
  if (!email) return getOccupancy(user);
  let present = loadJSON('presence', []);
  const isIn = present.includes(email);
  if (isIn) {
    present = present.filter((e) => e !== email);
  } else {
    if (OTHERS_PRESENT + present.length >= GYM_CAPACITY) return getOccupancy(user); // full
    present = [...present, email];
  }
  saveJSON('presence', present);
  return getOccupancy(user);
}

/* --------------------------- Per-user resources -------------------------- */
const uKey = (user, name) => `${(user?.email || 'guest').toLowerCase()}:${name}`;

export const getPlan = (user) => loadJSON(uKey(user, 'plan'), []);
export const setPlan = (user, plan) => saveJSON(uKey(user, 'plan'), plan);

export const getSignups = (user) => loadJSON(uKey(user, 'classes'), []);
export const setSignups = (user, ids) => saveJSON(uKey(user, 'classes'), ids);

export const getBookings = (user) => loadJSON(uKey(user, 'bookings'), []);
export const setBookings = (user, ids) => saveJSON(uKey(user, 'bookings'), ids);

export const getBuddyConnections = (user) => loadJSON(uKey(user, 'buddies'), []);
export const setBuddyConnections = (user, ids) => saveJSON(uKey(user, 'buddies'), ids);

// Assigned routine the student follows and checks off. Falls back to the
// sample routine "assigned by Coach Tanvir" so the view is never empty.
export function getAssignedRoutine(user) {
  const stored = loadJSON(uKey(user, 'routine'), null);
  if (stored) return stored;
  return { coach: 'Coach Tanvir Ahmed', items: sampleRoutine.map((r) => ({ ...r, done: false })) };
}
export function toggleRoutineItem(user, name) {
  const routine = getAssignedRoutine(user);
  routine.items = routine.items.map((i) => (i.name === name ? { ...i, done: !i.done } : i));
  saveJSON(uKey(user, 'routine'), routine);
  return routine;
}
export function assignRoutine(memberName, items, coach) {
  // Demo: record the assignment log; a real backend would target the member id.
  const log = loadJSON('assignments', []);
  log.unshift({ member: memberName, count: items.length, coach, at: new Date().toISOString() });
  saveJSON('assignments', log.slice(0, 20));
}

/* ---------------------------- Booking requests --------------------------- */
export const getBookingRequests = () => loadJSON('bookingRequests', []);
export function setBookingStatus(id, status) {
  const next = getBookingRequests().map((b) => (b.id === id ? { ...b, status } : b));
  saveJSON('bookingRequests', next);
  return next;
}
export function addBookingRequest(req) {
  const next = [{ id: uid('br'), status: 'Pending', ...req }, ...getBookingRequests()];
  saveJSON('bookingRequests', next);
  return next;
}

/* --------------------------- Maintenance tickets ------------------------- */
export const getTickets = () => loadJSON('tickets', []);
export function createTicket({ item, issue, by }) {
  const ticket = { id: uid('tk'), item, issue, by, status: 'Open', date: shortDate() };
  const next = [ticket, ...getTickets()];
  saveJSON('tickets', next);
  return next;
}
export function setTicketStatus(id, status) {
  const next = getTickets().map((t) => (t.id === id ? { ...t, status } : t));
  saveJSON('tickets', next);
  return next;
}

/* ----------------------------- Announcements ----------------------------- */
export const getAnnouncements = () => loadJSON('announcements', []);
export function addAnnouncement({ title, body, type }) {
  const next = [{ id: uid('a'), title, body, type: type || 'Notice', date: shortDate() }, ...getAnnouncements()];
  saveJSON('announcements', next);
  return next;
}

function shortDate() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
