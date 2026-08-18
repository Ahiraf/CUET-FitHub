// Seed content for the CUET FitHub frontend. Static demo data; mutable state
// (occupancy, plans, sign-ups, tickets, announcements…) lives in localStorage
// and is accessed through src/api.

export const GYM_CAPACITY = 50;
export const OTHERS_PRESENT = 37; // students already checked in (besides you)

export const weeklyActivity = [
  { day: 'Mon', value: 58 },
  { day: 'Tue', value: 76 },
  { day: 'Wed', value: 46 },
  { day: 'Thu', value: 88 },
  { day: 'Fri', value: 63 },
  { day: 'Sat', value: 35 },
  { day: 'Sun', value: 12 },
];

// Average occupancy by hour (used for the heatmap + peak-hour analytics).
export const hourlyOccupancy = [
  { hour: '6a', value: 14 },
  { hour: '8a', value: 22 },
  { hour: '10a', value: 18 },
  { hour: '12p', value: 27 },
  { hour: '2p', value: 20 },
  { hour: '4p', value: 34 },
  { hour: '6p', value: 48 },
  { hour: '8p', value: 41 },
  { hour: '10p', value: 16 },
];

export const equipmentInventory = [
  { name: 'Power racks', available: 3, total: 4, tone: 'green' },
  { name: 'Treadmills', available: 6, total: 8, tone: 'green' },
  { name: 'Cable machines', available: 1, total: 3, tone: 'orange' },
  { name: 'Bench press', available: 0, total: 2, tone: 'red' },
  { name: 'Dumbbell sets', available: 5, total: 6, tone: 'green' },
  { name: 'Rowing machines', available: 2, total: 3, tone: 'orange' },
];

export const upcoming = [
  { date: '18', month: 'JUN', title: 'Upper body strength', meta: 'Today · 6:30 PM', type: 'Workout', color: 'violet' },
  { date: '20', month: 'JUN', title: 'Functional fitness', meta: 'Friday · 5:00 PM', type: 'Class', color: 'blue' },
  { date: '22', month: 'JUN', title: 'Lower body + core', meta: 'Sunday · 7:00 AM', type: 'Workout', color: 'orange' },
];

export const exerciseLibrary = [
  { name: 'Barbell Bench Press', muscle: 'Chest', equipment: 'Bench press', difficulty: 'Intermediate' },
  { name: 'Back Squat', muscle: 'Legs', equipment: 'Power rack', difficulty: 'Intermediate' },
  { name: 'Deadlift', muscle: 'Back', equipment: 'Barbell', difficulty: 'Advanced' },
  { name: 'Overhead Press', muscle: 'Shoulders', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Pull-ups', muscle: 'Back', equipment: 'Pull-up bar', difficulty: 'Intermediate' },
  { name: 'Lat Pulldown', muscle: 'Back', equipment: 'Cable machine', difficulty: 'Beginner' },
  { name: 'Dumbbell Curl', muscle: 'Arms', equipment: 'Dumbbells', difficulty: 'Beginner' },
  { name: 'Tricep Pushdown', muscle: 'Arms', equipment: 'Cable machine', difficulty: 'Beginner' },
  { name: 'Leg Press', muscle: 'Legs', equipment: 'Leg press', difficulty: 'Beginner' },
  { name: 'Romanian Deadlift', muscle: 'Legs', equipment: 'Barbell', difficulty: 'Intermediate' },
  { name: 'Plank', muscle: 'Core', equipment: 'Bodyweight', difficulty: 'Beginner' },
  { name: 'Treadmill Run', muscle: 'Cardio', equipment: 'Treadmill', difficulty: 'Beginner' },
];

export const muscleGroups = ['All', 'Chest', 'Back', 'Legs', 'Shoulders', 'Arms', 'Core', 'Cardio'];

export const gymClasses = [
  { id: 'yoga-mw', title: 'Morning Yoga Flow', type: 'Yoga', coach: 'Nusrat Jahan', day: 'Mon / Wed', time: '7:00 AM', spots: 18, filled: 11, color: 'violet' },
  { id: 'cardio-hiit', title: 'HIIT Cardio Blast', type: 'Cardio', coach: 'Tanvir Ahmed', day: 'Tue / Thu', time: '6:30 PM', spots: 20, filled: 17, color: 'orange' },
  { id: 'selfdef', title: 'Self-Defense Basics', type: 'Self-defense', coach: 'Rakib Hasan', day: 'Saturday', time: '5:00 PM', spots: 16, filled: 6, color: 'blue' },
  { id: 'strength', title: 'Strength Foundations', type: 'Strength', coach: 'Tanvir Ahmed', day: 'Fri / Sun', time: '5:30 PM', spots: 14, filled: 14, color: 'blue' },
  { id: 'mobility', title: 'Mobility & Recovery', type: 'Yoga', coach: 'Nusrat Jahan', day: 'Sunday', time: '8:00 AM', spots: 18, filled: 9, color: 'violet' },
  { id: 'spin', title: 'Spin & Endurance', type: 'Cardio', coach: 'Tanvir Ahmed', day: 'Wednesday', time: '6:00 PM', spots: 20, filled: 13, color: 'orange' },
];

export const trainers = [
  { id: 't1', name: 'Tanvir Ahmed', specialty: 'Strength & Conditioning', rating: 4.9, sessions: 320, availability: 'Mon–Thu, 5–8 PM', bio: 'Powerlifting coach focused on progressive overload and safe barbell technique.', color: '#4f6ae0' },
  { id: 't2', name: 'Nusrat Jahan', specialty: 'Yoga & Mobility', rating: 4.8, sessions: 275, availability: 'Sun–Wed mornings', bio: 'Certified yoga instructor helping students improve flexibility and recover from strain.', color: '#8a6bd4' },
  { id: 't3', name: 'Rakib Hasan', specialty: 'Functional Fitness', rating: 4.7, sessions: 190, availability: 'Fri–Sat afternoons', bio: 'Functional training and self-defense specialist for all-round athletic fitness.', color: '#e0913f' },
  { id: 't4', name: 'Sadia Islam', specialty: 'Weight Loss & Cardio', rating: 4.9, sessions: 240, availability: 'Tue–Fri evenings', bio: 'Designs sustainable cardio and nutrition plans tailored to student schedules.', color: '#35a279' },
];

export const progressSeries = [
  { month: 'Jan', weight: 55, strength: 55 },
  { month: 'Feb', weight: 60, strength: 62 },
  { month: 'Mar', weight: 66, strength: 68 },
  { month: 'Apr', weight: 74, strength: 72 },
  { month: 'May', weight: 84, strength: 82 },
  { month: 'Jun', weight: 92, strength: 92 },
];

export const badges = [
  { emoji: '🔥', name: '7-Day Streak', detail: 'Trained 7 days straight', earned: true },
  { emoji: '💪', name: 'PR Breaker', detail: '5 personal records', earned: true },
  { emoji: '🏋️', name: 'Century Club', detail: '100 workouts logged', earned: true },
  { emoji: '🌅', name: 'Early Bird', detail: '10 morning sessions', earned: true },
  { emoji: '🥇', name: 'Dept. Champion', detail: 'Top of CSE board', earned: false },
  { emoji: '🎯', name: 'Consistency King', detail: '30-day streak', earned: false },
];

export const leaderboard = [
  { name: 'Tanjil Hasan', label: 'CSE 21', score: 1420 },
  { name: 'Rifat Karim', label: 'EEE 22', score: 1360 },
  { name: 'Mahin Rahman', label: 'ME 21', score: 1285 },
  { name: 'Sabbir Ahmed', label: 'CSE 22', score: 1190 },
  { name: 'Imran Kabir', label: 'CE 23', score: 1120 },
];

export const trainerMembers = [
  { name: 'Arif Siam', dept: 'CSE 22', plan: 'Upper/Lower Split', adherence: 86, status: 'On track' },
  { name: 'Rifat Karim', dept: 'EEE 22', plan: 'Push Pull Legs', adherence: 72, status: 'On track' },
  { name: 'Sabbir Ahmed', dept: 'CSE 22', plan: 'Full Body 3x', adherence: 54, status: 'Needs nudge' },
  { name: 'Mahin Rahman', dept: 'ME 21', plan: 'Strength Foundations', adherence: 91, status: 'On track' },
  { name: 'Imran Kabir', dept: 'CE 23', plan: 'Fat Loss Circuit', adherence: 38, status: 'At risk' },
];

export const seedBookingRequests = [
  { id: 'br1', name: 'Arif Siam', dept: 'CSE 22', goal: 'Bench press form check', slot: 'Thu 6:30 PM', status: 'Pending' },
  { id: 'br2', name: 'Sabbir Ahmed', dept: 'CSE 22', goal: 'Program review', slot: 'Fri 5:00 PM', status: 'Pending' },
  { id: 'br3', name: 'Imran Kabir', dept: 'CE 23', goal: 'Fat loss consult', slot: 'Sat 4:00 PM', status: 'Confirmed' },
];

// A default routine trainers assign / students follow.
export const sampleRoutine = [
  { name: 'Barbell Bench Press', target: '4 × 6' },
  { name: 'Incline Dumbbell Press', target: '3 × 10' },
  { name: 'Lat Pulldown', target: '4 × 10' },
  { name: 'Seated Cable Row', target: '3 × 12' },
  { name: 'Overhead Press', target: '3 × 8' },
  { name: 'Plank', target: '3 × 45s' },
];

// ---- Community ----
export const seedAnnouncements = [
  { id: 'a1', type: 'Maintenance', title: 'Cable machine #2 under repair', body: 'The second cable machine will be out of service until Thursday. Sorry for the inconvenience.', date: 'Aug 16' },
  { id: 'a2', type: 'Event', title: 'Inter-department lifting meet', body: 'Sign up for the CUET strength challenge on August 30. Represent your department!', date: 'Aug 14' },
  { id: 'a3', type: 'Notice', title: 'Extended evening hours', body: 'The gym now stays open until 10:30 PM during exam week.', date: 'Aug 12' },
];

export const buddies = [
  { id: 'b1', name: 'Rifat Karim', dept: 'EEE 22', goal: 'Strength', times: 'Evenings', color: '#4f6ae0' },
  { id: 'b2', name: 'Mahin Rahman', dept: 'ME 21', goal: 'Powerlifting', times: 'Mornings', color: '#8a6bd4' },
  { id: 'b3', name: 'Sabbir Ahmed', dept: 'CSE 22', goal: 'General fitness', times: 'Afternoons', color: '#e0913f' },
  { id: 'b4', name: 'Nabila Haque', dept: 'Arch 22', goal: 'Weight loss', times: 'Evenings', color: '#35a279' },
  { id: 'b5', name: 'Imran Kabir', dept: 'CE 23', goal: 'Cardio & endurance', times: 'Mornings', color: '#d4699a' },
];

export const dietTips = [
  { en: 'Have a protein source with every meal — eggs, dal, chicken or fish — to support muscle recovery.', bn: 'প্রতিটি খাবারে প্রোটিন রাখুন — ডিম, ডাল, মুরগি বা মাছ — যা পেশি পুনর্গঠনে সাহায্য করে।' },
  { en: 'Drink water before, during and after your workout. Aim for 2.5–3 litres a day.', bn: 'ব্যায়ামের আগে, চলাকালীন ও পরে পানি পান করুন। দিনে ২.৫–৩ লিটার লক্ষ্য রাখুন।' },
  { en: 'From the hall canteen, pick rice with dal, vegetables and a boiled egg over fried snacks.', bn: 'হল ক্যান্টিনে ভাজাপোড়ার বদলে ভাত, ডাল, সবজি ও সেদ্ধ ডিম বেছে নিন।' },
  { en: 'Eat a banana or some dates 30 minutes before training for quick energy.', bn: 'দ্রুত শক্তির জন্য ব্যায়ামের ৩০ মিনিট আগে একটি কলা বা কয়েকটি খেজুর খান।' },
  { en: 'Do not skip breakfast on training days — it fuels your session and prevents fatigue.', bn: 'ব্যায়ামের দিনে সকালের নাশতা বাদ দেবেন না — এটি আপনাকে শক্তি দেয় ও ক্লান্তি রোধ করে।' },
];

export const seedTickets = [
  { id: 'tk1', item: 'Bench press', issue: 'Left safety catch is loose and wobbles under load.', by: 'Arif Siam', status: 'Open', date: 'Aug 15' },
  { id: 'tk2', item: 'Treadmill #3', issue: 'Belt slips when running above 10 km/h.', by: 'Rifat Karim', status: 'In progress', date: 'Aug 13' },
];

// Demo accounts so the admin panel has members to verify on first run.
export const seedAccounts = [
  { name: 'Arif Siam', studentId: '2204077', email: 'arif.siam@cuet.ac.bd', dept: 'CSE 22', role: 'student', password: 'demo123', verified: true },
  { name: 'Rifat Karim', studentId: '2208031', email: 'rifat.karim@cuet.ac.bd', dept: 'EEE 22', role: 'student', password: 'demo123', verified: true },
  { name: 'Nabila Haque', studentId: '2201044', email: 'nabila.haque@cuet.ac.bd', dept: 'Arch 22', role: 'student', password: 'demo123', verified: false },
  { name: 'Imran Kabir', studentId: '2203099', email: 'imran.kabir@cuet.ac.bd', dept: 'CE 23', role: 'student', password: 'demo123', verified: false },
  { name: 'Tanvir Ahmed', studentId: 'TR-1002', email: 'tanvir.ahmed@cuet.ac.bd', dept: 'Trainer', role: 'trainer', password: 'demo123', verified: true },
  { name: 'Gym Admin', studentId: 'ADM-01', email: 'admin@cuet.ac.bd', dept: 'Operations', role: 'admin', password: 'admin123', verified: true },
];
