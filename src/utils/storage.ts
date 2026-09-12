import { FlashcardMastery, UserStats } from '../types';

const STORAGE_KEY = 'n5_japanese_guide_stats_v1';

const DEFAULT_USER_STATS: UserStats = {
  streakDays: 1,
  lastStudyDate: new Date().toISOString().split('T')[0],
  completedLessonIds: [],
  cardMastery: {},
  dailyDrillsCompleted: 0,
  totalXp: 0,
  preferences: {
    showRomaji: true,
    audioSpeed: 0.9,
    dailyGoalMinutes: 20
  }
};

export function loadUserStats(): UserStats {
  if (typeof window === 'undefined') return DEFAULT_USER_STATS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_USER_STATS;
    const parsed = JSON.parse(raw) as UserStats;

    // Check streak
    const today = new Date().toISOString().split('T')[0];
    if (parsed.lastStudyDate) {
      const lastDate = new Date(parsed.lastStudyDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 1) {
        // Streak broken
        parsed.streakDays = 1;
      }
    }
    return { ...DEFAULT_USER_STATS, ...parsed, preferences: { ...DEFAULT_USER_STATS.preferences, ...parsed.preferences } };
  } catch (e) {
    console.error('Failed to parse user stats from local storage', e);
    return DEFAULT_USER_STATS;
  }
}

export function saveUserStats(stats: UserStats): void {
  if (typeof window === 'undefined') return;
  try {
    stats.lastStudyDate = new Date().toISOString().split('T')[0];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save user stats', e);
  }
}

export function updateCardSRS(
  stats: UserStats,
  cardId: string,
  rating: 'again' | 'hard' | 'good' | 'easy'
): UserStats {
  const current = stats.cardMastery[cardId] || {
    interval: 1,
    easeFactor: 2.5,
    nextReview: Date.now(),
    mastery: 'new' as FlashcardMastery
  };

  let newInterval = 1;
  let newMastery: FlashcardMastery = 'learning';

  if (rating === 'again') {
    newInterval = 1;
    newMastery = 'review';
  } else if (rating === 'hard') {
    newInterval = Math.max(1, Math.round(current.interval * 1.2));
    newMastery = 'learning';
  } else if (rating === 'good') {
    newInterval = Math.max(2, Math.round(current.interval * 2.0));
    newMastery = current.mastery === 'new' ? 'learning' : 'review';
  } else if (rating === 'easy') {
    newInterval = Math.max(4, Math.round(current.interval * 2.5));
    newMastery = 'mastered';
  }

  const updatedStats = {
    ...stats,
    totalXp: stats.totalXp + (rating === 'again' ? 2 : rating === 'good' ? 5 : 8),
    cardMastery: {
      ...stats.cardMastery,
      [cardId]: {
        interval: newInterval,
        easeFactor: current.easeFactor,
        nextReview: Date.now() + newInterval * 24 * 60 * 60 * 1000,
        mastery: newMastery
      }
    }
  };

  saveUserStats(updatedStats);
  return updatedStats;
}
