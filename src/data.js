// Seed content for the CUET FitHub frontend. Static demo data; interactive
// state (logged workouts, class sign-ups, bookings) is persisted per-user in
// localStorage by the pages that use it.

export const GYM_CAPACITY = 50;

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

export const bookingRequests = [
  { name: 'Arif Siam', dept: 'CSE 22', goal: 'Bench press form check', slot: 'Thu 6:30 PM', status: 'Pending' },
  { name: 'Sabbir Ahmed', dept: 'CSE 22', goal: 'Program review', slot: 'Fri 5:00 PM', status: 'Pending' },
  { name: 'Imran Kabir', dept: 'CE 23', goal: 'Fat loss consult', slot: 'Sat 4:00 PM', status: 'Confirmed' },
];

// A small default routine trainers can assign / students can follow.
export const sampleRoutine = [
  { name: 'Barbell Bench Press', target: '4 × 6' },
  { name: 'Incline Dumbbell Press', target: '3 × 10' },
  { name: 'Lat Pulldown', target: '4 × 10' },
  { name: 'Seated Cable Row', target: '3 × 12' },
  { name: 'Overhead Press', target: '3 × 8' },
  { name: 'Plank', target: '3 × 45s' },
];
