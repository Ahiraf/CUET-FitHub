// Real backend implementation of the API contract (ASP.NET Core Web API).
import { request } from './client';

// ---- Auth ----
export const register = (dto) => request('/api/auth/register', { method: 'POST', body: dto });
export const login = (dto) => request('/api/auth/login', { method: 'POST', body: dto });
export const getMe = () => request('/api/auth/me');
export const updateMe = (dto) => request('/api/auth/me', { method: 'PUT', body: dto });

// ---- Occupancy ----
export const getOccupancy = () => request('/api/occupancy');
export const checkIn = () => request('/api/occupancy/checkin', { method: 'POST' });
export const checkOut = () => request('/api/occupancy/checkout', { method: 'POST' });

// ---- Exercises / plan ----
export const getExercises = () => request('/api/exercises');
export const getPlan = () => request('/api/plan').then((d) => d.exercises);
export const setPlan = (names) => request('/api/plan', { method: 'PUT', body: { exercises: names } }).then((d) => d.exercises);

// ---- Classes ----
export const getClasses = () => request('/api/classes');
export const toggleEnroll = (id) => request(`/api/classes/${id}/enroll`, { method: 'POST' });

// ---- Trainers / bookings ----
export const getTrainers = () => request('/api/trainers');
export const getMyBookings = () => request('/api/bookings/mine');
export const getAllBookings = () => request('/api/bookings');
export const createBooking = (dto) => request('/api/bookings', { method: 'POST', body: dto });
export const setBookingStatus = (id, status) => request(`/api/bookings/${id}/status`, { method: 'PATCH', body: { status } });

// ---- Routines ----
export const getMyRoutine = () => request('/api/routines/mine');
export const toggleRoutineItem = (id) => request(`/api/routines/items/${id}/toggle`, { method: 'POST' });
export const assignRoutine = (dto) => request('/api/routines/assign', { method: 'POST', body: dto });

// ---- Tickets ----
export const getTickets = () => request('/api/tickets');
export const createTicket = (dto) => request('/api/tickets', { method: 'POST', body: dto });
export const setTicketStatus = (id, status) => request(`/api/tickets/${id}/status`, { method: 'PATCH', body: { status } });

// ---- Announcements ----
export const getAnnouncements = () => request('/api/announcements');
export const addAnnouncement = (dto) => request('/api/announcements', { method: 'POST', body: dto });

// ---- Members (admin) ----
export const getMembers = () => request('/api/members');
export const verifyMember = (id, verified) => request(`/api/members/${id}/verify`, { method: 'PATCH', body: { verified } });
