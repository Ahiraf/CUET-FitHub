// Per-role dashboard configuration: sidebar items, page registry (by URL slug),
// and chrome details. DashboardLayout renders whichever role the user has.
import Overview from '../pages/Overview';
import Workout from '../components/Workout';
import Exercises from '../pages/Exercises';
import Classes from '../pages/Classes';
import TrainersPage from '../pages/TrainersPage';
import ProgressPage from '../pages/ProgressPage';
import Community from '../pages/Community';
import Facilities from '../pages/Facilities';
import Settings from '../pages/Settings';
import HelpCenter from '../pages/HelpCenter';
import { TrainerOverview, Members, Routines, TrainerClasses, Bookings } from '../pages/trainer';
import { AdminOverview, AdminMembers, Attendance, Equipment, Announcements } from '../pages/admin';

const support = [
  { label: 'Help center', slug: 'help', icon: 'help', component: HelpCenter },
  { label: 'Settings', slug: 'settings', icon: 'settings', component: Settings },
];

export const roleConfig = {
  student: {
    subtitle: 'Student wellness',
    breadcrumbBase: 'Student dashboard',
    bottomCard: { icon: 'fire', title: 'Keep moving', subtitle: '12-day streak active' },
    nav: [
      { label: 'Overview', slug: 'overview', icon: 'grid', component: Overview },
      { label: 'My workout', slug: 'my-workout', icon: 'dumbbell', component: Workout },
      { label: 'Exercises', slug: 'exercises', icon: 'activity', component: Exercises },
      { label: 'Classes', slug: 'classes', icon: 'calendar', component: Classes },
      { label: 'Trainers', slug: 'trainers', icon: 'users', component: TrainersPage },
      { label: 'Progress', slug: 'progress', icon: 'chart', component: ProgressPage },
      { label: 'Community', slug: 'community', icon: 'megaphone', component: Community },
      { label: 'Facilities', slug: 'facilities', icon: 'wrench', component: Facilities },
    ],
    support,
  },
  trainer: {
    subtitle: 'Trainer workspace',
    breadcrumbBase: 'Trainer dashboard',
    bottomCard: { icon: 'users', title: 'Your athletes', subtitle: '5 members active' },
    nav: [
      { label: 'Overview', slug: 'overview', icon: 'grid', component: TrainerOverview },
      { label: 'Members', slug: 'members', icon: 'users', component: Members },
      { label: 'Routines', slug: 'routines', icon: 'clipboard', component: Routines },
      { label: 'Classes', slug: 'classes', icon: 'calendar', component: TrainerClasses },
      { label: 'Bookings', slug: 'bookings', icon: 'ticket', component: Bookings },
    ],
    support,
  },
  admin: {
    subtitle: 'Operations console',
    breadcrumbBase: 'Admin dashboard',
    bottomCard: { icon: 'shield', title: 'Facility health', subtitle: 'Capacity within limit' },
    nav: [
      { label: 'Overview', slug: 'overview', icon: 'grid', component: AdminOverview },
      { label: 'Members', slug: 'members', icon: 'shield', component: AdminMembers },
      { label: 'Attendance', slug: 'attendance', icon: 'activity', component: Attendance },
      { label: 'Equipment', slug: 'equipment', icon: 'wrench', component: Equipment },
      { label: 'Announcements', slug: 'announcements', icon: 'megaphone', component: Announcements },
    ],
    support,
  },
};

export function getRoleConfig(role) {
  return roleConfig[role] || roleConfig.student;
}
