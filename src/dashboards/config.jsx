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
import AIChatPage from '../pages/AIChatPage';
import { TrainerOverview, Members, Routines, TrainerClasses, Bookings } from '../pages/trainer';

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
      { label: 'AI Coach', slug: 'ai-coach', icon: 'sparkles', component: AIChatPage },
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
      { label: 'AI Coach', slug: 'ai-coach', icon: 'sparkles', component: AIChatPage },
      { label: 'Members', slug: 'members', icon: 'users', component: Members },
      { label: 'Routines', slug: 'routines', icon: 'clipboard', component: Routines },
      { label: 'Classes', slug: 'classes', icon: 'calendar', component: TrainerClasses },
      { label: 'Bookings', slug: 'bookings', icon: 'ticket', component: Bookings },
    ],
    support,
  },
};

export function getRoleConfig(role) {
  return roleConfig[role] || roleConfig.student;
}
