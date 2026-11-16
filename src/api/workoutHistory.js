import { getWorkoutSessions, loadJSON, saveJSON, userKey } from '../store';
import { request, getStoredSession } from './client';

export async function syncWorkoutHistory(user) {
  const cacheKey = userKey(user, 'synced-workout-history-v1');
  const synced = new Set(loadJSON(cacheKey, []));
  const log = loadJSON(userKey(user, 'workout-activity'), {});
  const loggedDays = new Map(Object.entries(log).flatMap(([day, keys]) => keys.map(key => [key, day])));
  const entries = [];
  for (const session of getWorkoutSessions(user)) {
    if (!session.completedAt) continue;
    const sessionDay = new Date(session.completedAt).toLocaleDateString('sv-SE', { timeZone: 'Asia/Dhaka' });
    for (const item of session.items.filter(item => item.done)) {
      const exerciseKey = `plan:${session.id}:${item.id}`;
      if (!synced.has(exerciseKey)) entries.push({ exerciseKey, day: loggedDays.get(exerciseKey) || sessionDay });
    }
  }
  for (let index = 0; index < entries.length; index += 200) {
    if (getStoredSession()?.user?.email !== user.email) return;
    const batch = entries.slice(index, index + 200);
    await request('/api/workout-activity/history', { method: 'POST', body: batch });
    batch.forEach(entry => synced.add(entry.exerciseKey));
    saveJSON(cacheKey, [...synced]);
  }
}
